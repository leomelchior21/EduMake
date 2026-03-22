// ── BNCC STATE ─────────────────────────────────────────────
let currentBnccSkill = null;
let bnccInited = false;
let activePillars = new Set(['pc', 'md', 'cd']);
let expandedSkillCode = null;

// ── INIT ──────────────────────────────────────────────────
function initBncc() {
  if (bnccInited) return;
  bnccInited = true;
  // Populate theme select
  const themeSelect = document.getElementById('bncc-filter-tema');
  if (themeSelect) {
    [...new Set(BNCC_SKILLS.map(s => s.tema))].sort().forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t;
      themeSelect.appendChild(opt);
    });
  }
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
  let h = '';

  // Description
  h += `<p style="font-size:.84rem;color:var(--muted);line-height:1.6;margin-bottom:16px">${esc(skill.desc)}</p>`;

  if (res) {
    // Tools
    if (res.tools && res.tools.length) {
      h += `<div style="font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--dim);margin-bottom:8px">🛠 Ferramentas</div>`;
      h += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">`;
      res.tools.forEach(t => {
        const toolName = t.name || t;
        const td = TOOLS.find(x => x.tool.toLowerCase() === toolName.toLowerCase());
        const href = td ? td.link : (t.url || '#');
        h += `<a href="${href}" target="_blank" rel="noopener" class="bsg-tool-link" onclick="event.stopPropagation()">${esc(toolName)}</a>`;
      });
      h += `</div>`;
    }
    // Games
    if (res.games && res.games.length) {
      h += `<div style="font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--dim);margin-bottom:8px">🎮 Jogos e atividades</div>`;
      h += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">`;
      res.games.forEach(g => {
        const gameName = g.name || g;
        const td = TOOLS.find(x => x.tool.toLowerCase() === gameName.toLowerCase());
        const href = td ? td.link : (g.url || '#');
        h += `<a href="${href}" target="_blank" rel="noopener" class="bsg-tool-link" onclick="event.stopPropagation()">🎮 ${esc(gameName)}</a>`;
      });
      h += `</div>`;
    }
    // Ideas/examples
    if (skill.ex && skill.ex.length) {
      h += `<div style="font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--dim);margin-bottom:8px">💡 Ideias de atividade</div>`;
      h += `<ul style="list-style:none;display:flex;flex-direction:column;gap:5px;margin-bottom:14px">`;
      skill.ex.forEach(e => {
        h += `<li style="font-size:.81rem;color:var(--muted);line-height:1.5;padding:6px 10px;background:rgba(0,212,180,.05);border-radius:8px;border-left:2px solid rgba(0,212,180,.3)">• ${esc(e)}</li>`;
      });
      h += `</ul>`;
    }
  }

  // Mini AI panel
  h += `<div style="border-top:1px solid var(--bncc-border);padding-top:14px;margin-top:4px">
    <div style="font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--dim);margin-bottom:10px">✦ Sugestões para esta habilidade</div>
    <div style="margin-bottom:10px">
      <label style="font-size:.7rem;color:var(--dim);display:block;margin-bottom:5px">Sobre sua turma <span style="font-weight:300">(opcional)</span></label>
      <textarea id="bsg-ctx-${skill.code}" style="width:100%;background:var(--bncc-surf);border:1px solid var(--bncc-border);border-radius:8px;padding:8px 10px;color:var(--text);font-family:var(--fb);font-size:.78rem;resize:none;outline:none;min-height:52px" placeholder="Ex: 28 alunos, 6º ano, poucos computadores…" rows="2" onclick="event.stopPropagation()"></textarea>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      <button style="flex:1;min-width:120px;padding:8px 10px;border-radius:8px;background:rgba(0,212,180,.08);border:1px solid rgba(0,212,180,.2);color:var(--bncc-teal);font-family:var(--fb);font-size:.74rem;font-weight:600;cursor:pointer" onclick="event.stopPropagation();callBnccAIInline('plano','${skill.code}')">📋 Plano de aula</button>
      <button style="flex:1;min-width:120px;padding:8px 10px;border-radius:8px;background:rgba(0,212,180,.08);border:1px solid rgba(0,212,180,.2);color:var(--bncc-teal);font-family:var(--fb);font-size:.74rem;font-weight:600;cursor:pointer" onclick="event.stopPropagation();callBnccAIInline('rubrica','${skill.code}')">📊 Rubrica</button>
      <button style="flex:1;min-width:120px;padding:8px 10px;border-radius:8px;background:rgba(0,212,180,.08);border:1px solid rgba(0,212,180,.2);color:var(--bncc-teal);font-family:var(--fb);font-size:.74rem;font-weight:600;cursor:pointer" onclick="event.stopPropagation();callBnccAIInline('sequencia','${skill.code}')">🗓 Sequência didática</button>
    </div>
    <div id="bsg-ai-out-${skill.code}" style="margin-top:12px"></div>
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
