// ── BNCC STATE ─────────────────────────────────────────────
let currentBnccSkill = null;
let bnccInited = false;
let activePillars = new Set(['pc', 'md', 'cd']);
let expandedSkillCode = null;

// ── BCS: CUSTOM SELECT SYSTEM ──────────────────────────────
function bcsTog(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.bcs.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) {
    el.classList.add('open');
    const s = el.querySelector('.bcs-search');
    if (s) setTimeout(() => s.focus(), 60);
  }
}

function bcsClose() {
  document.querySelectorAll('.bcs.open').forEach(b => b.classList.remove('open'));
}

function bcsSearch(optsId, q) {
  const opts = document.getElementById(optsId);
  if (!opts) return;
  const qq = q.toLowerCase().trim();
  opts.querySelectorAll('.bcs-opt').forEach(o => {
    o.style.display = (!qq || o.textContent.toLowerCase().includes(qq)) ? '' : 'none';
  });
  opts.querySelectorAll('.bcs-group').forEach(g => {
    let next = g.nextElementSibling;
    let any = false;
    while (next && !next.classList.contains('bcs-group')) {
      if (next.style.display !== 'none') any = true;
      next = next.nextElementSibling;
    }
    g.style.display = any ? '' : 'none';
  });
}

let _bcsSelectedCode = '';

function bcsPickCode(code) {
  _bcsSelectedCode = code;
  const skill = BNCC_SKILLS.find(s => s.code === code);
  const valEl = document.getElementById('bcs-code-val');
  if (valEl && skill) {
    const short = skill.title.length > 44 ? skill.title.slice(0, 44) + '…' : skill.title;
    valEl.textContent = `${code} — ${short}`;
  }
  document.getElementById('bcs-code')?.classList.add('has-value');
  document.querySelectorAll('#bcs-code-opts .bcs-opt').forEach(o => o.classList.toggle('selected', o.dataset.code === code));
  bcsClose();
}

function bcsClearCode() {
  _bcsSelectedCode = '';
  const valEl = document.getElementById('bcs-code-val');
  if (valEl) valEl.textContent = 'Não tenho código ainda';
  document.getElementById('bcs-code')?.classList.remove('has-value');
  document.querySelectorAll('#bcs-code-opts .bcs-opt').forEach(o => o.classList.remove('selected'));
  bcsClose();
}

function bcsPickFilter(bcsId, value, label, hiddenSelectId) {
  const valEl = document.getElementById(bcsId + '-val');
  if (valEl) valEl.textContent = label;
  const bcsEl = document.getElementById(bcsId);
  if (bcsEl) {
    bcsEl.classList.toggle('has-value', !!value);
    bcsEl.querySelectorAll('.bcs-opt').forEach(o => o.classList.toggle('selected', o.dataset.val === value));
  }
  bcsClose();
  const hidSel = document.getElementById(hiddenSelectId);
  if (hidSel) { hidSel.value = value; filterSkillGrid(); }
}

// ── INIT ──────────────────────────────────────────────────
function initBncc() {
  if (bnccInited) return;
  bnccInited = true;

  // Populate code BCS (grouped by grade)
  const codeOpts = document.getElementById('bcs-code-opts');
  if (codeOpts) {
    const GRADE_ORDER = ['Educação Infantil','1º Ano','2º Ano','3º Ano','4º Ano','5º Ano','6º Ano','7º Ano','8º Ano','9º Ano','Ensino Médio'];
    const groups = {};
    BNCC_SKILLS.forEach(s => { if (!groups[s.grade]) groups[s.grade] = []; groups[s.grade].push(s); });
    let html = `<div class="bcs-opt bcs-opt-none selected" onclick="event.stopPropagation();bcsClearCode()">Não tenho código ainda</div>`;
    GRADE_ORDER.forEach(grade => {
      if (!groups[grade]) return;
      html += `<div class="bcs-group">${grade}</div>`;
      groups[grade].forEach(s => {
        const short = s.title.length > 54 ? s.title.slice(0, 54) + '…' : s.title;
        html += `<div class="bcs-opt" data-code="${s.code}" onclick="event.stopPropagation();bcsPickCode('${s.code}')">
          <span class="bcs-opt-code">${s.code}</span>
          <span class="bcs-opt-title">${esc(short)}</span>
        </div>`;
      });
    });
    codeOpts.innerHTML = html;
  }

  // Populate tema BCS (and keep hidden select in sync)
  const temaOpts = document.getElementById('bcs-tema-opts');
  const temaHidden = document.getElementById('bncc-filter-tema');
  if (temaOpts) {
    const themes = [...new Set(BNCC_SKILLS.map(s => s.tema))].sort();
    themes.forEach(t => {
      const div = document.createElement('div');
      div.className = 'bcs-opt';
      div.dataset.val = t;
      div.textContent = t;
      div.setAttribute('onclick', `event.stopPropagation();bcsPickFilter('bcs-tema','${t}','🎨 ${t}','bncc-filter-tema')`);
      temaOpts.appendChild(div);
      if (temaHidden) {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        temaHidden.appendChild(opt);
      }
    });
  }

  // Close dropdowns on outside click (once)
  document.addEventListener('click', e => { if (!e.target.closest('.bcs')) bcsClose(); });

  buildSkillGrid();
}

// ── PILLAR FILTERS (Improvement 4) ────────────────────────
function togglePillar(eixo) {
  if (activePillars.has(eixo) && activePillars.size === 1) return; // keep at least 1
  if (activePillars.has(eixo)) {
    activePillars.delete(eixo);
  } else {
    activePillars.add(eixo);
  }
  document.querySelectorAll('.bncc-pillar').forEach(el => {
    const e = el.dataset.eixo;
    el.classList.toggle('active', activePillars.has(e));
  });
  filterSkillGrid();
}

function buildPillarFilters() {
  document.querySelectorAll('.bncc-pillar').forEach(el => {
    el.classList.add('active');
  });
  // Populate theme select
  const themeSelect = document.getElementById('bncc-filter-tema');
  if (themeSelect) {
    const themes = [...new Set(BNCC_SKILLS.map(s => s.tema))].sort();
    themes.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = '🎨 ' + t;
      themeSelect.appendChild(opt);
    });
  }
}

// ── SKILL GRID ─────────────────────────────────────────────
function buildSkillGrid() {
  filterSkillGrid();
}

function filterSkillGrid() {
  const grid = document.getElementById('bncc-skill-grid');
  if (!grid) return;

  const nivel = (document.getElementById('bncc-filter-nivel') || {}).value || '';
  const tema = (document.getElementById('bncc-filter-tema') || {}).value || '';
  const search = ((document.getElementById('bncc-filter-search') || {}).value || '').toLowerCase().trim();

  const filtered = BNCC_SKILLS.filter(s => {
    if (!activePillars.has(s.eixo)) return false;
    if (nivel && s.nivel !== nivel) return false;
    if (tema && s.tema !== tema) return false;
    if (search) {
      const haystack = (s.code + ' ' + s.title + ' ' + s.tema + ' ' + s.grade).toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  // Count indicator
  let countEl = document.getElementById('bncc-grid-count');
  if (!countEl) {
    countEl = document.createElement('div');
    countEl.id = 'bncc-grid-count';
    countEl.className = 'bncc-grid-count';
    grid.parentNode.insertBefore(countEl, grid);
  }

  if (filtered.length === 0) {
    countEl.textContent = '';
    grid.innerHTML = '<div class="bsg-no-results">Nenhuma habilidade encontrada.<br><span style="font-size:.78rem">Tente ampliar os filtros.</span></div>';
    return;
  }

  const total = BNCC_SKILLS.length;
  countEl.textContent = filtered.length === total
    ? `${total} habilidades disponíveis`
    : `${filtered.length} de ${total} habilidades`;

  grid.innerHTML = filtered.map(s => buildSkillCard(s)).join('');

  // Re-expand previously expanded card if still visible
  if (expandedSkillCode) {
    const card = grid.querySelector(`[data-code="${expandedSkillCode}"]`);
    if (card) card.classList.add('expanded');
  }
}

function getSkillQuickTools(skill) {
  const res = BNCC_RES[skill.code];
  if (!res || !res.tools) return [];
  return res.tools.slice(0, 3).map(t => t.name);
}

function buildSkillCard(s) {
  const eixoLabel = {pc:'PC', md:'MD', cd:'CD'}[s.eixo] || s.eixo.toUpperCase();
  const quickTools = getSkillQuickTools(s);
  const toolLinks = quickTools.map(t => {
    const td = TOOLS.find(x => x.tool.toLowerCase() === t.toLowerCase());
    const href = td ? td.link : '#';
    const emoji = td ? (td.category === 'Jogos' ? '🎮' : '🔧') : '🔧';
    return `<a class="bsg-tool-link" href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${emoji} ${esc(t)}</a>`;
  }).join('');

  return `<div class="bsg-card" data-code="${s.code}" onclick="toggleSkillCard('${s.code}')">
    <div class="bsg-card-head">
      <span class="bsg-code">${s.code}</span>
      <span class="bsg-eixo ${s.eixo}">${eixoLabel}</span>
      <span class="bsg-grade">${s.grade || ''}</span>
      <button class="bsg-close-btn" onclick="event.stopPropagation();toggleSkillCard('${s.code}')" title="Fechar">×</button>
    </div>
    <div class="bsg-title">${esc(s.title)}</div>
    ${toolLinks ? `<div class="bsg-tools">${toolLinks}</div>` : ''}
    <button class="bsg-ver-btn">Ver ferramentas e sugestões →</button>
    <div class="bsg-inline-panel" id="bsg-panel-${s.code}"></div>
  </div>`;
}

function toggleSkillCard(code) {
  const card = document.querySelector(`.bsg-card[data-code="${code}"]`);
  if (!card) return;

  const wasExpanded = card.classList.contains('expanded');

  // Collapse all cards
  document.querySelectorAll('.bsg-card.expanded').forEach(c => c.classList.remove('expanded'));
  expandedSkillCode = null;

  if (!wasExpanded) {
    card.classList.add('expanded');
    expandedSkillCode = code;
    // Load panel content if empty
    const panel = document.getElementById('bsg-panel-' + code);
    if (panel && !panel.innerHTML) {
      const skill = BNCC_SKILLS.find(s => s.code === code);
      if (skill) {
        renderInlineSkillPanel(skill, panel);
      }
    }
    // Scroll card into view
    setTimeout(() => card.scrollIntoView({behavior:'smooth', block:'nearest'}), 50);
  }
}

function renderInlineSkillPanel(skill, panel) {
  currentBnccSkill = skill;
  const res = BNCC_RES[skill.code] || getBnccResFallback(skill.code, skill);
  const steam = (res.steam && res.steam.length) ? res.steam : getBnccSteamFallback(skill);
  let h = '';

  // Description
  h += `<p class="bsg-panel-desc">${esc(skill.desc)}</p>`;

  // Resource chips — 3 color groups
  h += `<div class="bsg-panel-chips">`;
  if (res.tools?.length) {
    h += `<div class="bsg-panel-chip-row"><span class="bsg-chip-lbl tool">🔧 Ferramentas</span>`;
    res.tools.forEach(t => {
      const toolName = t.name || t;
      const td = TOOLS.find(x => x.tool.toLowerCase() === toolName.toLowerCase());
      const href = td ? td.link : (t.url || '#');
      h += `<a class="bsg-chip tool" href="${esc(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(toolName)}</a>`;
    });
    h += `</div>`;
  }
  if (res.games?.length) {
    h += `<div class="bsg-panel-chip-row"><span class="bsg-chip-lbl game">🎮 Jogos</span>`;
    res.games.forEach(g => {
      const gameName = g.name || g;
      const href = g.url || '#';
      const tag = href !== '#' ? `<a class="bsg-chip game" href="${esc(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(gameName)}</a>`
                               : `<span class="bsg-chip game">${esc(gameName)}</span>`;
      h += tag;
    });
    h += `</div>`;
  }
  if (steam?.length) {
    h += `<div class="bsg-panel-chip-row"><span class="bsg-chip-lbl steam">🌱 STEAM</span>`;
    steam.forEach(s => {
      const href = s.url || '#';
      const tag = href !== '#' ? `<a class="bsg-chip steam" href="${esc(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(s.name)}</a>`
                               : `<span class="bsg-chip steam">${esc(s.name)}</span>`;
      h += tag;
    });
    h += `</div>`;
  }
  h += `</div>`;

  // "Que tal ideias?" CTA
  h += `<div class="bsg-ideas-section">
    <div class="bsg-ideas-heading">💡 Que tal ideias pra esse código?</div>
    <div class="bsg-ideas-sub">Conte sobre sua aula — tema, turma, recursos disponíveis. A IA gera 5 ideias completas com manual de uso.</div>
    <textarea class="bsg-ideas-textarea" id="bsg-ctx-${skill.code}"
      placeholder="Ex: tema de frações, 28 alunos, 5º ano, poucos computadores, turma animada…"
      onclick="event.stopPropagation()" rows="2"></textarea>
    <button class="bsg-ideas-btn" onclick="event.stopPropagation();generateIdeasFromCard('${skill.code}')">Vamos lá! →</button>
  </div>`;

  panel.innerHTML = h;
}

async function callBnccAIInline(mode, code) {
  const skill = BNCC_SKILLS.find(s => s.code === code);
  if (!skill) return;
  const ctxEl = document.getElementById('bsg-ctx-' + code);
  const ctx = ctxEl ? ctxEl.value.trim() : '';
  const outEl = document.getElementById('bsg-ai-out-' + code);
  if (!outEl) return;

  currentBnccSkill = skill;

  const fakeCtx = document.getElementById('bncc-ai-ctx');
  if (fakeCtx) fakeCtx.value = ctx;

  outEl.innerHTML = `<div class="ai-loading" style="padding:16px 0"><div class="coffee-wrap" style="margin:0 auto 10px"><div class="coffee-steam"><div class="steam"></div><div class="steam"></div><div class="steam"></div></div><div class="coffee-cup"><div class="coffee-liquid"></div></div></div><p style="text-align:center;color:var(--muted);font-size:.82rem">Preparando sugestões…</p></div>`;

  try {
    const modeLabels = {plano:'plano de aula',rubrica:'rubrica de avaliação',sequencia:'sequência didática'};
    const modeLabel = modeLabels[mode] || mode;

    const sysPrompt = `Você é um especialista em educação básica brasileira e BNCC de Computação. Crie um ${modeLabel} completo para a habilidade ${skill.code}: "${skill.title}". ${ctx ? `Contexto da turma: ${ctx}.` : ''} Responda em português, de forma prática e aplicável em sala de aula real. Estruture com seções claras usando markdown.`;

    const resp = await fetch('https://api.deepseek.com/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+DEEPSEEK_KEY},
      body:JSON.stringify({model:'deepseek-chat',messages:[{role:'system',content:sysPrompt},{role:'user',content:`Crie o ${modeLabel} para ${skill.code}.`}],temperature:0.7,max_tokens:1800})
    });
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';

    const html = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/^### (.+)$/gm,'<h4 style="color:var(--bncc-teal);margin:12px 0 6px;font-size:.84rem">$1</h4>')
      .replace(/^## (.+)$/gm,'<h3 style="color:var(--bncc-teal);margin:14px 0 7px;font-size:.9rem">$1</h3>')
      .replace(/^# (.+)$/gm,'<h2 style="color:var(--bncc-teal);margin:14px 0 7px">$1</h2>')
      .replace(/^[-•] (.+)$/gm,'<li style="margin-left:12px;margin-bottom:3px">$1</li>')
      .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');

    outEl.innerHTML = `<div style="background:var(--bncc-surf);border:1px solid var(--bncc-border);border-radius:10px;padding:14px;font-size:.8rem;line-height:1.6;color:var(--muted)">${html}</div>`;
  } catch(e) {
    outEl.innerHTML = `<div style="color:#e86fa0;font-size:.78rem;padding:8px">Erro ao conectar. Verifique sua conexão.</div>`;
  }
}

// ── EXAMPLE CARD ───────────────────────────────────────────
function buildBnccExample() {
  const examples=[
    {code:'EF03CO01',title:'Associar "verdadeiro" e "falso" a sentenças lógicas do dia a dia.',
     ex:['Scratch ↗','Code.org ↗','Wordwall ↗'],links:['https://scratch.mit.edu','https://code.org','https://wordwall.net']},
    {code:'EF06CO02',title:'Elaborar algoritmos com instruções sequenciais, de repetição e de seleção usando linguagem de programação.',
     ex:['Scratch ↗','Snap! ↗','Blockly Games ↗'],links:['https://scratch.mit.edu','https://snap.berkeley.edu','https://blockly.games']},
    {code:'EM13CO10',title:'Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana.',
     ex:['Teachable Machine ↗','Elements of AI ↗','ML for Kids ↗'],links:['https://teachablemachine.withgoogle.com','https://elementsofai.com/br','https://machinelearningforkids.co.uk']},
    {code:'EF07CO07',title:'Identificar problemas de segurança cibernética e experimentar formas de proteção.',
     ex:['Google Interland ↗','Common Sense ↗','Digital Compass ↗'],links:['https://beinternetawesome.withgoogle.com/interland','https://commonsense.org/education','https://digitalcompass.org']},
  ];
  const r = examples[Math.floor(Math.random()*examples.length)];
  document.getElementById('ex-code').textContent = r.code;
  document.getElementById('ex-title').textContent = r.title;
  const inspo = document.getElementById('ex-inspo');
  inspo.innerHTML = r.ex.map((e,i)=>`<a class="bncc-example-inspo-item" href="${r.links[i]}" target="_blank"><span>🔗</span>${e}</a>`).join('');
}

// ── AGE / GRADE / THEME GRIDS ──────────────────────────────
function buildAgeGrid() {
  const g = document.getElementById('bncc-age-grid');
  if (!g) return;
  g.innerHTML = BNCC_AGES.map(a=>`
    <div class="bncc-age-card" onclick="bnccFilterBy('age','${a.nivel}','${a.label}')">
      <div class="bncc-age-label">${a.age}</div>
      <div class="bncc-age-sub">${a.label}</div>
      <div class="bncc-age-sub" style="margin-top:2px;font-size:.67rem">${a.sub}</div>
      <div class="bncc-age-eixos">${a.eixos.map(e=>`<span class="bncc-eixo-tag">${e}</span>`).join('')}</div>
    </div>`).join('');
}

function buildGradeGrid() {
  const g = document.getElementById('bncc-grade-grid');
  if (!g) return;
  g.innerHTML = BNCC_GRADES.map(gr=>`
    <div class="bncc-age-card" onclick="bnccFilterBy('grade','${gr.filterVal}','${gr.grade}')">
      <div class="bncc-age-label">${gr.grade}</div>
      <div class="bncc-age-sub">${gr.sub}</div>
      <div class="bncc-age-eixos">${gr.eixos.map(e=>`<span class="bncc-eixo-tag">${e}</span>`).join('')}</div>
    </div>`).join('');
}

function buildThemeGrid() {
  const g = document.getElementById('bncc-theme-grid');
  if (!g) return;
  g.innerHTML = BNCC_THEMES.map(t=>{
    const cnt = BNCC_SKILLS.filter(s=>s.tema===t.tema).length;
    return `<div class="bncc-theme-card" onclick="bnccFilterBy('theme','${t.tema}','${t.tema}')">
      <div class="bncc-theme-icon">${t.icon}</div>
      <div class="bncc-theme-name">${t.tema}</div>
      <div class="bncc-theme-count">${cnt} habilidade${cnt!==1?'s':''}</div>
      <div class="bncc-theme-count" style="margin-top:2px">${t.desc}</div>
    </div>`;
  }).join('');
}

// ── TABS ──────────────────────────────────────────────────
function switchBnccTab(tab) {
  document.querySelectorAll('.bncc-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  document.querySelectorAll('.bncc-panel').forEach(p=>p.classList.remove('active'));
  const panel = document.getElementById('bncc-panel-'+tab);
  if (panel) panel.classList.add('active');
  document.getElementById('bncc-results').classList.add('hidden');
}

// ── SEARCH ────────────────────────────────────────────────
function bnccQuick(code) {
  document.getElementById('bncc-code-input').value = code;
  bnccSearch();
}

function bnccSearch() {
  const raw = document.getElementById('bncc-code-input').value.trim().toUpperCase();
  if (!raw) return;
  const skill = BNCC_SKILLS.find(s=>s.code.toUpperCase()===raw);
  if (skill) { renderBnccSkill(skill); }
  else { showNotif('Código não encontrado. Tente: EF03CO01, EF06CO02, EM13CO10…'); }
}

function bnccFilterBy(type, value, label) {
  let matches;
  if (type==='theme') matches = BNCC_SKILLS.filter(s=>s.tema===value);
  else if (type==='age') matches = BNCC_SKILLS.filter(s=>s.nivel===value);
  else if (type==='grade') matches = BNCC_SKILLS.filter(s=>s.grade===value);

  if (!matches||!matches.length) { showNotif('Nenhuma habilidade encontrada.'); return; }

  const res = document.getElementById('bncc-results');
  const title = document.getElementById('bncc-results-title');
  const codeEl = document.getElementById('bncc-results-code');
  title.textContent = label;
  codeEl.textContent = `${matches.length} habilidade${matches.length!==1?'s':''}`;
  res.classList.remove('hidden');

  document.getElementById('bncc-skill-area').innerHTML = matches.map(s=>`
    <div class="bncc-skill-card" onclick="renderBnccSkill(BNCC_SKILLS.find(x=>x.code==='${s.code}'))" style="cursor:pointer">
      <div class="bncc-skill-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span class="bncc-skill-code-badge">${s.code}</span>
            <span class="bncc-skill-eixo ${s.eixo}">${s.eixo==='pc'?'Pensamento Computacional':s.eixo==='md'?'Mundo Digital':'Cultura Digital'}</span>
          </div>
          <div class="bncc-skill-title">${s.grade} · ${s.tema}</div>
        </div>
        <div style="color:var(--bncc-teal);font-size:1.2rem;opacity:.6">→</div>
      </div>
      <div class="bncc-skill-desc">${s.title}</div>
    </div>`).join('');

  document.getElementById('bncc-res-area').innerHTML = '';
  res.scrollIntoView({behavior:'smooth',block:'start'});
}

// ── RENDER SKILL ──────────────────────────────────────────
function renderBnccSkill(skill) {
  if (!skill) return;
  currentBnccSkill = skill;
  const res = document.getElementById('bncc-results');
  const title = document.getElementById('bncc-results-title');
  const codeEl = document.getElementById('bncc-results-code');
  const aiOut = document.getElementById('bncc-ai-output');
  if (aiOut) { aiOut.innerHTML=''; aiOut.classList.add('hidden'); }

  title.textContent = skill.grade + ' · ' + skill.tema;
  codeEl.textContent = skill.code;
  res.classList.remove('hidden');

  const eixoLabel = skill.eixo==='pc'?'Pensamento Computacional':skill.eixo==='md'?'Mundo Digital':'Cultura Digital';

  document.getElementById('bncc-skill-area').innerHTML = `
    <div class="bncc-skill-card">
      <div class="bncc-skill-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span class="bncc-skill-code-badge">${esc(skill.code)}</span>
            <span class="bncc-skill-eixo ${skill.eixo}">${eixoLabel}</span>
            <span style="font-size:.72rem;color:var(--muted)">${skill.age}</span>
          </div>
          <div class="bncc-skill-title">${esc(skill.title)}</div>
        </div>
      </div>
      <div class="bncc-skill-desc" style="margin-top:6px">${esc(skill.desc)}</div>
    </div>`;

  document.getElementById('bncc-res-area').innerHTML = `
    <div class="bncc-loading"><div class="bncc-spinner"></div>Preparando ferramentas e jogos para esta habilidade…</div>`;

  res.scrollIntoView({behavior:'smooth',block:'start'});

  setTimeout(()=>{
    const resData = BNCC_RES[skill.code] || getBnccResFallback(skill.code, skill);
    renderBnccResources(resData);
  }, 600);
}

function renderBnccResources(data) {
  const area = document.getElementById('bncc-res-area');
  if (!data) { area.innerHTML = ''; return; }

  const steam = data.steam && data.steam.length ? data.steam : getBnccSteamFallback(currentBnccSkill);

  const renderCol = (items, colClass, icon, label) => {
    const itemsHtml = (items || []).map(item => {
      const href = item.url || '#';
      const linkHtml = href !== '#' ? `<a class="bncc-col-item-link" href="${esc(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Acessar ↗</a>` : '';
      return `<div class="bncc-col-item">
        <div class="bncc-col-item-name">${esc(item.name)}${linkHtml}</div>
        <div class="bncc-col-item-how"><strong>Como usar:</strong> ${item.how}</div>
      </div>`;
    }).join('');
    return `<div class="bncc-res-col ${colClass}">
      <div class="bncc-col-hd"><span class="bncc-col-hd-icon">${icon}</span>${label}</div>
      <div class="bncc-col-body">${itemsHtml}</div>
    </div>`;
  };

  area.innerHTML = `<div class="bncc-3col">
    ${renderCol(data.tools, 'bncc-col-tool', '🔧', 'Ferramenta digital')}
    ${renderCol(data.games, 'bncc-col-game', '🎮', 'Jogo / atividade')}
    ${renderCol(steam,      'bncc-col-steam', '🌱', 'STEAM · mão na massa')}
  </div>`;
}

function getBnccSteamFallback(skill) {
  const tema = skill ? (skill.tema || 'Computação') : 'Computação';
  const nivel = skill ? skill.nivel : 'EF2';

  const STEAM_BY_TEMA = {
    'Algoritmos': [
      {name:'Dança algorítmica',icon:'💃',url:'',how:`Alunos "programam" colegas com cartões de setas para chegar a um destino. Quem chegou errado? Tem bug no algoritmo — hora de debugar!`},
      {name:'Mapa de fita no chão',icon:'🗺',url:'',how:`Cole fita colorida no chão formando um percurso. Alunos escrevem o algoritmo em papel <em>antes</em> de executar — descobrem erros de lógica de forma física.`},
      {name:'Bee-Bot / robô de papel',icon:'🐝',url:'https://bee-bot.us',how:`Com Bee-Bot real ou um robô de papel dobrado, criar mapas temáticos e programar sequências de movimentos sem tela.`}
    ],
    'Decomposição': [
      {name:'Quebra-cabeça de processos',icon:'🧩',url:'',how:`Escrever etapas de uma tarefa (fritar ovo, escovar dentes) em cartões separados. Grupos colocam na ordem certa — entendem decomposição na prática.`},
      {name:'Construção em etapas',icon:'🏗',url:'',how:`Dar a cada grupo uma tarefa complexa (montar uma ponte de palito). Primeiro decompor em subtarefas, depois executar. Refletir sobre o que facilitou.`},
      {name:'Jogo de receitas',icon:'📜',url:'',how:`Cada grupo cria a "receita" (algoritmo) para um processo cotidiano. Outro grupo segue a receita à risca — se travar, a receita tem um bug.`}
    ],
    'Lógica': [
      {name:'Jogo de verdade/falso com corpo',icon:'🙋',url:'',how:`Professor faz afirmações. Alunos ficam de pé (verdadeiro) ou sentados (falso). Adicionar negações — "não é verdade que…" — eleva o nível.`},
      {name:'CS Unplugged — Lógica',icon:'🎲',url:'https://csunplugged.org',how:`Atividades físicas do CS Unplugged sobre circuitos lógicos com papel e cartas. Alunos constroem portas AND/OR com materiais simples.`},
      {name:'Debate de sentenças lógicas',icon:'🗣',url:'',how:`Criar frases ambíguas do cotidiano e debater: são verdadeiras ou falsas? Conectar com como computadores tomam decisões com 0 e 1.`}
    ],
    'Programação': [
      {name:'Micro:bit',icon:'💡',url:'https://microbit.org',how:`Criar projetos físicos: termômetro, dado eletrônico, mensagem luminosa. Código em blocos visível + resultado imediato no hardware.`},
      {name:'Arduino + LED',icon:'⚡',url:'https://arduino.cc',how:`Acender LEDs em sequência com código. Alunos veem cada linha de código virar uma luz piscando — abstrato vira concreto.`},
      {name:'Cartões de código desplugado',icon:'🃏',url:'',how:`Escrever algoritmos em cartões físicos. Trocar com colega para "executar na mão" — erros de lógica ficam evidentes sem computador.`}
    ],
    'Dados': [
      {name:'Infográfico físico com post-its',icon:'📊',url:'',how:`Pesquisa de campo com a turma (filme favorito, esporte…). Montar gráfico físico na lousa com post-its coloridos. Discutir o que os dados mostram.`},
      {name:'Binário com cartões',icon:'🃏',url:'',how:`Representar números em binário com cartões brancos/pretos. Alunos descobrem como letras viram números — base do funcionamento de computadores.`},
      {name:'CS Unplugged — Dados',icon:'🧩',url:'https://csunplugged.org',how:`Atividades físicas sobre codificação e compressão de dados. Compactar imagens "à mão" com sequências de cores — sem computador.`}
    ],
    'Cidadania Digital': [
      {name:'Teatro de situações digitais',icon:'🎭',url:'',how:`Grupos dramatizam situações: receber fake news, cyberbullying, senha vazada. Classe discute o que fazer — mais memorável que slides.`},
      {name:'Zine digital x analógico',icon:'📔',url:'',how:`Criar um zine (mini-revista dobrada) com dicas de segurança digital. Processo analógico para comunicar tema digital — reflexão dupla.`},
      {name:'Mapa de pegada digital',icon:'🗺',url:'',how:`Em papel, alunos listam tudo que fizeram online na semana e avaliam: o que fica gravado? O que pode ser visto por outros? Torna o abstrato tangível.`}
    ],
  };

  const byTema = STEAM_BY_TEMA[tema];
  if (byTema) return byTema;

  // Generic fallback by nivel
  if (nivel === 'EI' || nivel === 'EF1') return [
    {name:'Dança algorítmica',icon:'💃',url:'',how:`Alunos programam colegas com cartões de setas. Ótima forma de trabalhar ${tema} sem tela.`},
    {name:'Mapa no chão com fita',icon:'🗺',url:'',how:`Labirinto de fita no chão. Escrever o caminho no papel antes de caminhar — conecta lógica ao corpo.`},
    {name:'Bee-Bot',icon:'🐝',url:'https://bee-bot.us',how:`Robô físico programado com botões. Criar mapas temáticos de ${tema} para navegar.`}
  ];
  if (nivel === 'EF2') return [
    {name:'Micro:bit',icon:'💡',url:'https://microbit.org',how:`Projetos físicos ligados a ${tema}: sensores, LED, mensagens. Código em blocos com resultado imediato.`},
    {name:'Jogo de tabuleiro criado pelos alunos',icon:'🎲',url:'',how:`Grupos criam um jogo físico que ensina ${tema}. Processo de design já desenvolve a habilidade.`},
    {name:'CS Unplugged',icon:'🃏',url:'https://csunplugged.org',how:`Atividades físicas sem computador sobre ${tema}. Ótimo para turmas com poucos dispositivos.`}
  ];
  return [
    {name:'Arduino',icon:'⚡',url:'https://arduino.cc',how:`Protótipos físicos ligados a ${tema}. Alunos constroem algo que funciona de verdade.`},
    {name:'Hackathon de ideias',icon:'🚀',url:'',how:`Desafio de 1 aula: resolver um problema real usando ${tema}. Equipes pitchiam soluções.`},
    {name:'CS Unplugged (avançado)',icon:'🧩',url:'https://csunplugged.org',how:`Atividades físicas avançadas para EM sobre ${tema}. Sem computador, alto engajamento.`}
  ];
}

// ── FALLBACK RESOURCES ────────────────────────────────────
function getBnccResFallback(code, skill) {
  const tema = skill.tema || 'Computação';
  const nivel = skill.nivel;
  let tools, games;

  if (nivel==='EI'||nivel==='EF1') {
    tools=[
      {name:'ScratchJr',cat:'Programação Visual',icon:'💻',url:'https://scratchjr.org',
       how:`Use o ScratchJr para criar uma atividade visual relacionada a <strong>${tema}</strong>. Peça que os alunos construam uma sequência que demonstre o conceito.`},
      {name:'Khan Academy Kids',cat:'Plataforma Adaptativa',icon:'📚',url:'https://khanacademy.org/kids',
       how:`Encontre atividades de <strong>${tema}</strong> no Khan Academy Kids. Use em estações de trabalho rotativas.`},
      {name:'Nearpod',cat:'Aula Interativa',icon:'📡',url:'https://nearpod.com',
       how:`Crie uma aula com slides interativos sobre <strong>${tema}</strong>. Use "Draw It" para que os alunos representem visualmente.`}
    ];
    games=[
      {name:'Code.org',cat:'Plataforma',icon:'💻',url:'https://code.org',
       how:`Use os cursos A ou B do Code.org. Atividades desplugadas sobre <strong>${tema}</strong> na seção de professores.`},
      {name:'Kahoot',cat:'Quiz',icon:'🎮',url:'https://kahoot.com',
       how:`Monte um quiz de 5 perguntas sobre <strong>${tema}</strong>. Use imagens como respostas para quem ainda não lê.`},
      {name:'Wordwall',cat:'Atividades',icon:'🃏',url:'https://wordwall.net',
       how:`Crie um jogo de correspondência visual para os conceitos de <strong>${tema}</strong>.`}
    ];
  } else if (nivel==='EF2') {
    tools=[
      {name:'Scratch',cat:'Programação',icon:'🐱',url:'https://scratch.mit.edu',
       how:`Crie um projeto Scratch que demonstre <strong>${tema}</strong>. Desafie os alunos a modificar e melhorar.`},
      {name:'Replit',cat:'Programação Online',icon:'🔁',url:'https://replit.com',
       how:`Use Python no Replit para um pequeno projeto de <strong>${tema}</strong>. Comece com 10-15 linhas.`},
      {name:'Khan Academy (Computação)',cat:'Plataforma',icon:'📐',url:'https://khanacademy.org/computing',
       how:`Módulo de computação relacionado a <strong>${tema}</strong>. Atribua como lição de casa com quiz.`}
    ];
    games=[
      {name:'Code Combat',cat:'RPG de Programação',icon:'⚔️',url:'https://codecombat.com',
       how:`Nível temático de <strong>${tema}</strong>. O aluno escreve código real para avançar no jogo.`},
      {name:'Tynker',cat:'Plataforma Game',icon:'🧩',url:'https://tynker.com',
       how:`Missão relacionada a <strong>${tema}</strong>. Complete em duplas com explicação em voz alta.`},
      {name:'CK-12',cat:'Recursos Interativos',icon:'📖',url:'https://ck12.org',
       how:`Simulações e exercícios sobre <strong>${tema}</strong>. Use como pré-leitura para a aula seguinte.`}
    ];
  } else {
    tools=[
      {name:'Python (Google Colab)',cat:'Programação',icon:'🐍',url:'https://colab.research.google.com',
       how:`Notebook Python sobre <strong>${tema}</strong>. Alunos exploram e documentam descobertas.`},
      {name:'Replit (Equipes)',cat:'Programação Colaborativa',icon:'🔁',url:'https://replit.com',
       how:`Projeto em equipe sobre <strong>${tema}</strong>. Use o histórico de commits como avaliação de processo.`},
      {name:'Khan Academy (EM)',cat:'Plataforma',icon:'📐',url:'https://khanacademy.org',
       how:`Unidade avançada de <strong>${tema}</strong>. Faça os exercícios e apresente um projeto final.`}
    ];
    games=[
      {name:'CS50 Harvard',cat:'Curso/Jogo',icon:'🎓',url:'https://cs50.harvard.edu/x',
       how:`Problem Set de <strong>${tema}</strong> do CS50. Gratuito e desafiador — perfeito para EM.`},
      {name:'HackerRank',cat:'Desafios',icon:'💻',url:'https://hackerrank.com',
       how:`Desafios de código sobre <strong>${tema}</strong>. Use em maratonas de programação na escola.`},
      {name:'Brilliant.org',cat:'Plataforma Interativa',icon:'🔆',url:'https://brilliant.org',
       how:`Lições interativas de <strong>${tema}</strong>. Ideal para alunos que querem ir além do currículo.`}
    ];
  }
  return {tools, games};
}

// ── UNIFIED GUIADA SEARCH ──────────────────────────────────
async function bnccGuiadaSearch() {
  if (_bcsSelectedCode) {
    await bnccQuick(_bcsSelectedCode);
    return;
  }
  const disc  = document.getElementById('bncc-g-disc')?.value.trim()  || '';
  const serie = document.getElementById('bncc-g-serie')?.value.trim() || '';
  const tema  = document.getElementById('bncc-g-tema')?.value.trim()  || '';
  if (!disc && !serie && !tema) return;
  const parts = [];
  if (disc)  parts.push(disc);
  if (tema)  parts.push(tema);
  if (serie) parts.push(`para ${serie}`);
  const q = parts.join(', ');
  const inp = document.getElementById('bncc-nl-input');
  if (inp) inp.value = q;
  await bnccNLSearch();
}

// ── VAMOS APLICAR! ─────────────────────────────────────────
let _aplicarData = null;

async function bnccAplicar() {
  const disc   = document.getElementById('bncc-g-disc')?.value.trim()  || '';
  const serie  = document.getElementById('bncc-g-serie')?.value.trim() || '';
  const tema   = document.getElementById('bncc-g-tema')?.value.trim()  || '';
  const code   = _bcsSelectedCode || '';
  if (!disc && !serie && !tema && !code) return;

  const area = document.getElementById('bncc-aplicar-area');
  const btn  = document.getElementById('bncc-aplicar-btn');
  area.classList.remove('hidden');
  showLoading(area, 'Criando 3 ideias para sua aula', 'analisando o contexto da turma…');
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }

  const ctxParts = [];
  if (disc)  ctxParts.push(`Disciplina: ${disc}`);
  if (serie) ctxParts.push(`Série/Nível: ${serie}`);
  if (tema)  ctxParts.push(`Tema: ${tema}`);
  if (code)  ctxParts.push(`Código BNCC: ${code}`);
  const ctx = ctxParts.join(' | ');

  const tools = typeof smartLocalSearch === 'function'
    ? smartLocalSearch(`${disc} ${tema} ${serie}`.trim()).slice(0, 20).map(t => ({ nome: t.name, cat: t.category }))
    : [];

  // Limit BNCC list to relevant nivel to keep prompt short
  let relevantSkills = BNCC_SKILLS;
  if (serie) {
    const sn = serie.toLowerCase();
    if (sn.includes('infantil') || sn === 'ei') relevantSkills = BNCC_SKILLS.filter(s => s.nivel === 'EI');
    else if (/[1-5]/.test(sn) && !sn.includes('6') && !sn.includes('7') && !sn.includes('8') && !sn.includes('9')) relevantSkills = BNCC_SKILLS.filter(s => s.nivel === 'EF1');
    else if (/[6-9]/.test(sn)) relevantSkills = BNCC_SKILLS.filter(s => s.nivel === 'EF2');
    else if (sn.includes('médio') || sn.includes('medio') || sn.includes('em')) relevantSkills = BNCC_SKILLS.filter(s => s.nivel === 'EM');
  }
  if (code) {
    const matchedSkill = BNCC_SKILLS.find(s => s.code === code);
    if (matchedSkill) relevantSkills = BNCC_SKILLS.filter(s => s.nivel === matchedSkill.nivel);
  }
  const bnccList = relevantSkills.slice(0, 25).map(s => `${s.code}: ${s.title}`).join('\n');

  const sys = `Você é especialista em educação brasileira e BNCC Computação.
Gere 3 ideias de aula práticas para o contexto fornecido. Cada ideia usa uma abordagem diferente.
Use ferramentas reais e acessíveis para professores brasileiros.

REGRA ABSOLUTA — BNCC COMPUTAÇÃO É OBRIGATÓRIO:
- TODA ideia DEVE referenciar ao menos 1 código da lista de BNCC Computação abaixo
- O código escolhido deve ser REAL (da lista) e a ideia deve ser DESENHADA para cumprir aquela habilidade
- NÃO invente códigos — use APENAS os da lista

CÓDIGOS BNCC COMPUTAÇÃO DISPONÍVEIS:
${bnccList}

Ferramentas disponíveis no catálogo: ${JSON.stringify(tools)}

Responda APENAS com JSON válido. Sem texto fora do JSON. Sem blocos de código.
FORMATO EXATO (mantenha todos os campos, textos curtos):
{"ferramenta":{"titulo":"título curto","descricao":"1 frase","ferramenta":"nome da ferramenta","bncc":"código da lista"},"jogo":{"titulo":"título curto","descricao":"1 frase","jogo":"nome do jogo","bncc":"código da lista"},"steam":{"titulo":"título curto","descricao":"1 frase","atividade":"nome da atividade","bncc":"código da lista"}}`;

  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: sys }, { role: 'user', content: ctx }],
        max_tokens: 800,
        temperature: 0.4,
        response_format: { type: 'json_object' }
      })
    });
    const raw = await resp.text();
    const parsed = JSON.parse(raw);
    const content = parsed.choices?.[0]?.message?.content || '';
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('JSON não encontrado');
    const cleaned = match[0].replace(/,\s*([}\]])/g, '$1');
    _aplicarData = JSON.parse(cleaned);
    stopLoading();
    renderAplicarCards(_aplicarData, ctx);
  } catch(e) {
    area.innerHTML = `<div class="bap-error">❌ Erro ao gerar ideias: ${e.message}</div>`;
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
  }
}

function renderAplicarCards(data, ctx) {
  const area = document.getElementById('bncc-aplicar-area');
  const cats = [
    { key: 'ferramenta', label: 'Ferramenta Digital', icon: '🛠️', cls: 'bap-tool',  nameKey: 'ferramenta' },
    { key: 'jogo',       label: 'Jogo / Gamificação', icon: '🎮', cls: 'bap-game',  nameKey: 'jogo' },
    { key: 'steam',      label: 'STEAM / Prática',    icon: '⚗️', cls: 'bap-steam', nameKey: 'atividade' }
  ];

  const cards = cats.map((cat, i) => {
    const d = data[cat.key];
    if (!d) return '';
    const name = d[cat.nameKey] || '';
    const deepQuery = `${d.titulo} usando ${name}${ctx ? ' — contexto: ' + ctx : ''}`;
    return `<div class="bap-card ${cat.cls}" id="bap-card-${i}">
      <div class="bap-card-top">
        <span class="bap-badge">${cat.icon} ${cat.label}</span>
        ${d.bncc ? `<span class="bap-bncc-code">${d.bncc}</span>` : ''}
      </div>
      <div class="bap-title">${d.titulo}</div>
      <div class="bap-desc">${d.descricao}</div>
      <div class="bap-resource">
        <span class="bap-resource-lbl">${cat.nameKey === 'atividade' ? 'Atividade' : cat.nameKey === 'jogo' ? 'Jogo' : 'Ferramenta'}:</span>
        <span class="bap-resource-name">${name}</span>
      </div>
      <button class="bap-choose-btn ${cat.cls}-choose" onclick="event.stopPropagation();bnccChooseIdea(${i})">
        Escolher esta ideia →
      </button>
    </div>`;
  }).join('');

  area.innerHTML = `
    <div class="bap-header">
      <div class="bap-header-title">✦ 3 ideias prontas para aplicar</div>
      <div class="bap-header-sub">Escolha uma para aprofundar — ou peça mais 3 ideias</div>
      <button class="bap-mais-btn" onclick="bnccAplicar()">↺ Mais 3 ideias</button>
    </div>
    <div class="bap-grid" id="bap-ideas-grid">${cards}</div>
    <div class="bap-deep-view hidden" id="bap-deep-view"></div>`;
}

const _BAP_CATS = [
  { key:'ferramenta', nameKey:'ferramenta', emoji:'🛠️', label:'Ferramenta Digital', cls:'bap-tool' },
  { key:'jogo',       nameKey:'jogo',       emoji:'🎮', label:'Jogo / Gamificação', cls:'bap-game' },
  { key:'steam',      nameKey:'atividade',  emoji:'⚗️', label:'STEAM / Prática',   cls:'bap-steam' }
];

function bnccChooseIdea(idx) {
  const cat = _BAP_CATS[idx];
  const d   = _aplicarData?.[cat.key];
  if (!d) return;

  const grid     = document.getElementById('bap-ideas-grid');
  const deepView = document.getElementById('bap-deep-view');
  if (!grid || !deepView) return;

  grid.classList.add('hidden');
  deepView.classList.remove('hidden');
  deepView.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const bnccSkill = d.bncc ? BNCC_SKILLS.find(s => s.code === d.bncc) : null;
  const resourceName = d[cat.nameKey] || '';

  deepView.innerHTML = `
    <div class="bncc-cfg-wrap">
      <button class="bncc-cfg-back" onclick="bnccShowGrid()">← Voltar às 3 ideias</button>

      <div class="bncc-cfg-idea-preview ${cat.cls}">
        <div class="bncc-cfg-idea-top">
          <span class="bap-badge">${cat.emoji} ${cat.label}</span>
          ${d.bncc ? `<span class="bap-bncc-code">${d.bncc}</span>` : ''}
        </div>
        <div class="bncc-cfg-idea-title">${d.titulo}</div>
        <div class="bncc-cfg-idea-desc">${d.descricao}</div>
        <div class="bap-resource"><span class="bap-resource-lbl">${cat.nameKey==='atividade'?'Atividade':cat.nameKey==='jogo'?'Jogo':'Ferramenta'}:</span> <span class="bap-resource-name">${resourceName}</span></div>
        ${bnccSkill ? `<div class="bncc-cfg-bncc-line">🔵 ${bnccSkill.title}</div>` : ''}
      </div>

      <div class="bncc-cfg-section-title">Configure sua aula</div>

      <div class="bncc-cfg-grid">
        <div class="bncc-cfg-field">
          <label class="bncc-cfg-lbl">📊 Método avaliativo</label>
          <select id="cfg-avaliacao" class="bncc-cfg-select">
            <option value="">Escolha...</option>
            <option>Rubrica de processo</option>
            <option>Portfólio digital</option>
            <option>Autoavaliação</option>
            <option>Avaliação por pares</option>
            <option>Observação direta</option>
            <option>Apresentação oral</option>
            <option>Prova prática</option>
          </select>
        </div>

        <div class="bncc-cfg-field">
          <label class="bncc-cfg-lbl">📅 Número de aulas</label>
          <div class="bncc-cfg-pills" data-group="aulas">
            ${['1 aula','2 aulas','3 aulas','4+ aulas'].map(v=>`<button class="bncc-cfg-pill" data-group="aulas" data-val="${v}" onclick="bnccCfgPill(this,'aulas')">${v}</button>`).join('')}
          </div>
        </div>

        <div class="bncc-cfg-field">
          <label class="bncc-cfg-lbl">👥 Alunos</label>
          <div class="bncc-cfg-pills" data-group="alunos">
            ${['menos de 20','20 a 30','30 a 40','mais de 40'].map(v=>`<button class="bncc-cfg-pill" data-group="alunos" data-val="${v} alunos" onclick="bnccCfgPill(this,'alunos')">${v}</button>`).join('')}
          </div>
        </div>

        <div class="bncc-cfg-field">
          <label class="bncc-cfg-lbl">💻 Recursos disponíveis</label>
          <div class="bncc-cfg-checks">
            ${[['computadores ou tablets','💻 Computadores/tablets'],['celulares dos alunos','📱 Celulares'],['projetor','📽️ Projetor'],['kit maker e materiais','🔧 Kit maker'],['sem tecnologia (desplugado)','✋ Sem tecnologia']].map(([v,l])=>`<label class="bncc-cfg-check"><input type="checkbox" value="${v}"/> ${l}</label>`).join('')}
          </div>
        </div>
      </div>

      <div class="bncc-cfg-field bncc-cfg-livre-wrap">
        <label class="bncc-cfg-lbl">✏️ Escreva o que quiser</label>
        <textarea id="cfg-livre" class="bncc-cfg-textarea" rows="3" placeholder="Objetivos específicos, dificuldades da turma, projetos em andamento, datas, contexto cultural…"></textarea>
      </div>

      <button class="bncc-cfg-go" onclick="bnccRunFromConfig(${idx})">
        ✦ Aprofundar esta aula →
      </button>
    </div>`;
}

function bnccCfgPill(el, group) {
  document.querySelectorAll(`.bncc-cfg-pill[data-group="${group}"]`).forEach(p => p.classList.remove('active'));
  el.classList.toggle('active');
}

async function bnccRunFromConfig(idx) {
  const cat = _BAP_CATS[idx];
  const d   = _aplicarData?.[cat.key];
  if (!d) return;

  const avaliacao = document.getElementById('cfg-avaliacao')?.value || '';
  const aulas     = document.querySelector(`.bncc-cfg-pill.active[data-group="aulas"]`)?.dataset.val || '';
  const alunos    = document.querySelector(`.bncc-cfg-pill.active[data-group="alunos"]`)?.dataset.val || '';
  const recursos  = [...document.querySelectorAll('.bncc-cfg-check input:checked')].map(c => c.value).join(', ');
  const livre     = document.getElementById('cfg-livre')?.value.trim() || '';

  const disc  = document.getElementById('bncc-g-disc')?.value.trim()  || '';
  const serie = document.getElementById('bncc-g-serie')?.value.trim() || '';
  const tema  = document.getElementById('bncc-g-tema')?.value.trim()  || '';

  const ctxParts = [disc, tema, serie ? `para ${serie}` : ''].filter(Boolean);
  if (aulas)     ctxParts.push(aulas);
  if (alunos)    ctxParts.push(alunos);
  if (avaliacao) ctxParts.push(`avaliação por ${avaliacao}`);
  if (recursos)  ctxParts.push(`recursos disponíveis: ${recursos}`);
  if (livre)     ctxParts.push(`observações do professor: ${livre}`);

  const idea = {
    id: idx + 1,
    title: d.titulo,
    description: d.descricao,
    tool: d[cat.nameKey] || '',
    tool_emoji: cat.emoji,
    bncc_codes: d.bncc ? [d.bncc] : []
  };

  const deepView = document.getElementById('bap-deep-view');
  const opts = {
    targetEl:         deepView,
    backFn:           `bnccChooseIdea(${idx})`,
    backLabel:        '← Voltar à configuração',
    bnccCode:         d.bncc || '',
    queryCtx:         ctxParts.join('. '),
    showFinalizeArea: true
  };

  await _runDeepening(idea, opts);
}

function bnccShowGrid() {
  const grid     = document.getElementById('bap-ideas-grid');
  const deepView = document.getElementById('bap-deep-view');
  if (grid)     grid.classList.remove('hidden');
  if (deepView) deepView.classList.add('hidden');
}

// ── NL SEARCH ─────────────────────────────────────────────
function bnccNLFill(text) {
  const inp = document.getElementById('bncc-nl-input');
  if (inp) { inp.value = text; bnccNLSearch(); }
}

async function bnccNLSearch() {
  const q = (document.getElementById('bncc-nl-input')?.value || '').trim();
  if (!q) return;
  const resultEl = document.getElementById('bncc-nl-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<div class="bncc-loading"><div class="bncc-spinner"></div>Buscando habilidades BNCC relevantes…</div>`;

  const skillsSummary = BNCC_SKILLS.map(s=>`${s.code}: ${s.title} (${s.age})`).join('\n');

  const systemPrompt = `Você é um assistente especialista em educação brasileira e na BNCC — especificamente no Complemento de Computação à BNCC.
Sua tarefa: dado um pedido em linguagem natural de um professor, identificar as habilidades BNCC de Computação mais relevantes.

Lista de habilidades disponíveis:
${skillsSummary}

Responda SOMENTE em JSON válido, sem markdown, sem texto extra. Formato:
{"resultados":[{"code":"CODIGO","motivo":"Por que é relevante em 1 frase curta"}],"dica":"Uma dica pedagógica curta e prática (máx 2 frases)"}
Retorne no máximo 4 habilidades, ordenadas por relevância.`;

  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${DEEPSEEK_KEY}`},
      body: JSON.stringify({
        model:'deepseek-chat',
        max_tokens:600,
        temperature:0.3,
        messages:[{role:'user',content:`Pedido do professor: "${q}"\n\n${systemPrompt}`}]
      })
    });
    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    const clean = raw.replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(clean);
    const resultados = parsed.resultados || [];
    const dica = parsed.dica || '';

    if (!resultados.length) {
      resultEl.innerHTML = `<div style="color:var(--muted);font-size:.84rem">Nenhuma habilidade encontrada. Tente reformular sua busca.</div>`;
      return;
    }

    let h = `<h4>Habilidades encontradas para: <em style="color:var(--fg)">${esc(q)}</em></h4>`;
    h += `<div class="bncc-nl-result-codes">`;
    resultados.forEach(r => {
      const skill = BNCC_SKILLS.find(s=>s.code===r.code);
      if (!skill) return;
      h += `<div class="bncc-nl-code-chip" onclick="bnccQuick('${esc(r.code)}')">
        <strong>${esc(r.code)}</strong>
        <span>${esc(r.motivo)}</span>
      </div>`;
    });
    h += `</div>`;
    if (dica) h += `<div style="margin-top:12px;font-size:.79rem;color:var(--muted);border-top:1px solid rgba(255,255,255,.06);padding-top:10px">💡 ${esc(dica)}</div>`;
    resultEl.innerHTML = h;
  } catch(e) {
    resultEl.innerHTML = `<div style="color:var(--muted);font-size:.84rem">Erro ao conectar. Verifique sua conexão.</div>`;
  }
}

// ── BNCC AI PLAN / RUBRICA / SEQUENCIA / CHAT ─────────────────
async function callBnccAI(mode) {
  if (!currentBnccSkill) {
    showNotif('Selecione uma habilidade BNCC primeiro');
    return;
  }

  const ctx = (document.getElementById('bncc-ai-ctx')?.value || '').trim();
  const chatQ = mode==='chat' ? (document.getElementById('bncc-ai-chat-input')?.value||'').trim() : '';
  if (mode==='chat' && !chatQ) return;

  const out = document.getElementById('bncc-ai-output');
  out.classList.remove('hidden');
  out.innerHTML = `<div class="ai-loading"><div class="bncc-spinner"></div>${
    mode==='plano'?'Gerando plano de aula personalizado…':
    mode==='rubrica'?'Elaborando rubrica de avaliação…':
    mode==='sequencia'?'Planejando sequência didática…':
    'Pensando na sua pergunta…'
  }</div>`;
  out.scrollIntoView({behavior:'smooth', block:'nearest'});

  const skill = currentBnccSkill;
  const eixoLabel = skill.eixo==='pc'?'Pensamento Computacional':skill.eixo==='md'?'Mundo Digital':'Cultura Digital';
  const ctxBlock = ctx ? `\nContexto da turma: ${ctx}` : '';

  let systemPrompt = '';
  let userMsg = '';

  if (mode === 'plano') {
    systemPrompt = `Você é um especialista em educação computacional e na BNCC do Brasil. Crie planos de aula práticos, criativos e aplicáveis.
Responda em HTML simples usando apenas: <h3>, <h4>, <p>, <ul>, <li>. Sem markdown. Seja direto e prático.`;
    userMsg = `Crie um plano de aula completo para a habilidade BNCC:
Código: ${skill.code}
Eixo: ${eixoLabel}
Título: ${skill.title}
Descrição: ${skill.desc}
Nível: ${skill.age} (${skill.grade})${ctxBlock}

Estruture assim:
- 🎯 Objetivos de aprendizagem (2–3 itens)
- ⏱ Duração e organização sugerida
- 🔧 Recursos e materiais necessários
- 📋 Sequência de atividades (passo a passo com tempo estimado)
- 💡 Dicas para engajamento e diferenciação
- 📊 Como avaliar o aprendizado
- ♿ Adaptações para alunos com dificuldade`;
  } else if (mode === 'rubrica') {
    systemPrompt = `Você é especialista em avaliação educacional alinhada à BNCC. Crie rubricas claras e práticas para professores brasileiros.
Responda em HTML simples usando apenas: <h3>, <h4>, <p>, <ul>, <li>, <table>, <tr>, <th>, <td>. Sem markdown.`;
    userMsg = `Crie uma rubrica de avaliação para a habilidade BNCC:
Código: ${skill.code}
Eixo: ${eixoLabel}
Título: ${skill.title}
Descrição: ${skill.desc}
Nível: ${skill.age} (${skill.grade})${ctxBlock}

A rubrica deve ter:
- 3 critérios de avaliação específicos para esta habilidade
- 4 níveis de desempenho: Não atingido / Em desenvolvimento / Atingido / Além do esperado
- Descritores claros e observáveis para cada nível
- Uma dica de como usar a rubrica em sala`;
  } else if (mode === 'sequencia') {
    systemPrompt = `Você é especialista em currículo e planejamento didático alinhado à BNCC brasileira. Crie sequências didáticas progressivas e coerentes.
Responda em HTML simples usando apenas: <h3>, <h4>, <p>, <ul>, <li>. Sem markdown.`;
    userMsg = `Crie uma sequência didática de 4 a 5 aulas para desenvolver a habilidade BNCC:
Código: ${skill.code}
Eixo: ${eixoLabel}
Título: ${skill.title}
Descrição: ${skill.desc}
Nível: ${skill.age} (${skill.grade})${ctxBlock}

Para cada aula inclua:
- Número e título da aula
- Objetivo específico desta aula
- Atividade principal (com duração estimada)
- Recurso digital ou físico sugerido
- Como conecta com a aula anterior/seguinte

Inclua no final uma sugestão de projeto integrador opcional.`;
  } else if (mode === 'chat') {
    systemPrompt = `Você é um assistente pedagógico especialista na BNCC de Computação do Brasil. Responda perguntas práticas de professores de forma clara, direta e útil.
Responda em HTML simples usando apenas: <h3>, <h4>, <p>, <ul>, <li>. Sem markdown. Máximo 300 palavras.`;
    userMsg = `Habilidade BNCC em foco:
Código: ${skill.code} — ${eixoLabel}
${skill.title}
Nível: ${skill.age} (${skill.grade})${ctxBlock}

Pergunta do professor: ${chatQ}`;
  }

  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${DEEPSEEK_KEY}`},
      body: JSON.stringify({
        model:'deepseek-chat',
        max_tokens:1200,
        temperature:0.5,
        messages:[
          {role:'system',content:systemPrompt},
          {role:'user',content:userMsg}
        ]
      })
    });
    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || '';
    if (!content) throw new Error('empty');

    const modeLabel = mode==='plano'?'Plano de Aula':mode==='rubrica'?'Rubrica de Avaliação':mode==='sequencia'?'Sequência Didática':'Resposta';
    out.innerHTML = `
      <div style="font-size:.73rem;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:6px">
        <span style="color:var(--accent)">✦</span> ${esc(modeLabel)} · ${esc(skill.code)}
      </div>
      ${content}
      <button class="bncc-ai-copy-btn" onclick="copyAIOutput(this)">📋 Copiar tudo</button>`;

    if (mode==='chat') {
      const inp = document.getElementById('bncc-ai-chat-input');
      if (inp) inp.value = '';
    }
  } catch(e) {
    out.innerHTML = `<div style="color:var(--muted);font-size:.84rem">❌ Erro ao gerar resposta. Tente novamente.</div>`;
  }
}

function copyAIOutput(btn) {
  const out = document.getElementById('bncc-ai-output');
  const text = out?.innerText || '';
  navigator.clipboard.writeText(text).then(()=>{
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    setTimeout(()=>btn.textContent=orig, 2000);
  });
}

function bnccCodeHint() {
  // Could add autocomplete in future
}

// ── GENERATE IDEAS FROM CARD ────────────────────────────
async function generateIdeasFromCard(code) {
  const skill = BNCC_SKILLS.find(s => s.code === code);
  if (!skill) return;
  const ctx = (document.getElementById('bsg-ctx-' + code)?.value || '').trim();
  const query = `${skill.title} para ${skill.grade}${ctx ? ' — ' + ctx : ''}. Habilidade BNCC de Computação: ${skill.code}`;
  showPage('home');
  setNL(query);
  await doSearch();
}

// ── HIDE RESULT (back to entry) ──────────────────────────
function hideBnccResult() {
  document.getElementById('bncc-results').classList.add('hidden');
  const page = document.getElementById('bncc-page');
  if (page) window.scrollTo({top: page.offsetTop - 80, behavior: 'smooth'});
}

// ── GENERATE IDEAS FOR BNCC SKILL ───────────────────────
async function generateIdeasForBncc() {
  if (!currentBnccSkill) return;
  const skill = currentBnccSkill;
  const ctx = (document.getElementById('bncc-ai-ctx')?.value || '').trim();
  const query = `${skill.title} para ${skill.grade}${ctx ? ' — ' + ctx : ''}. Habilidade BNCC de Computação: ${skill.code}`;
  showPage('home');
  setNL(query);
  await doSearch();
}
