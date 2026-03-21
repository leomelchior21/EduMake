// ── UI STATE ───────────────────────────────────────────────
let currentMode = 'nl';
let currentResultData = null;
let currentModalTool = null;

function setMode(m) {
  currentMode = m;
  document.getElementById('mode-nl').classList.toggle('active', m==='nl');
  document.getElementById('mode-str').classList.toggle('active', m==='str');
  document.getElementById('panel-nl').classList.toggle('hidden', m!=='nl');
  document.getElementById('panel-str').classList.toggle('hidden', m!=='str');
}

function setNL(t) { setMode('nl'); document.getElementById('nl-input').value = t; }

// ── DEEPSEEK CALL ──────────────────────────────────────────
async function callDeepSeek(query) {
  const tools = smartLocalSearch(query);

  const sys = `Você é especialista em EdTech para o sistema educacional brasileiro (BNCC).
Use SOMENTE as ferramentas listadas abaixo. Não invente outras.

FERRAMENTAS DISPONÍVEIS:
${JSON.stringify(tools)}

REGRAS ABSOLUTAS — VIOLÁ-LAS É ERRO CRÍTICO:
- Responda APENAS com JSON puro — sem texto antes, sem texto depois, sem blocos de código
- Selecione 3 a 5 ferramentas da lista acima para o campo "tools"
- Gere exatamente 5 ideias de aula
- CADA ideia DEVE ter o campo "tool" preenchido com o nome EXATO de uma ferramenta da lista
- NUNCA deixe o campo "tool" vazio, null ou "Nenhuma ferramenta disponível"
- Se a busca for genérica, escolha ferramentas versáteis como Canva, Padlet, Google Slides, Kahoot, GeoGebra ou Scratch
- O campo "tool" de cada ideia DEVE ser diferente (variedade de ferramentas)

FORMATO EXATO (descrições curtas e objetivas — máximo 1 frase cada):
{"query_understood":"resumo da busca","nivel":"nível/série","tools":[{"name":"nome exato","emoji":"emoji","reason":"motivo breve"}],"ideas":[{"id":1,"title":"título curto","description":"1 frase do que o professor vai fazer","tool":"nome exato da ferramenta","tool_emoji":"emoji","manual":["Passo 1: ação concreta com a ferramenta","Passo 2: ação dos alunos","Passo 3: encerramento ou avaliação rápida"]},{"id":2,"title":"...","description":"...","tool":"...","tool_emoji":"...","manual":["...","...","..."]},{"id":3,"title":"...","description":"...","tool":"...","tool_emoji":"...","manual":["...","...","..."]},{"id":4,"title":"...","description":"...","tool":"...","tool_emoji":"...","manual":["...","...","..."]},{"id":5,"title":"...","description":"...","tool":"...","tool_emoji":"...","manual":["...","...","..."]}],"bncc":["código1","código2"]}`;

  const resp = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: sys }, { role: 'user', content: query }],
      max_tokens: 2000,
      temperature: 0.3
    })
  });

  const rawText = await resp.text();
  if (!resp.ok) {
    let msg = `HTTP ${resp.status}`;
    try { msg = JSON.parse(rawText).error?.message || msg; } catch(_) {}
    throw new Error(msg);
  }

  let parsed;
  try { parsed = JSON.parse(rawText); }
  catch(_) { throw new Error('Resposta inválida do servidor: ' + rawText.slice(0,120)); }

  const content = parsed.choices?.[0]?.message?.content || '';
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Modelo não retornou JSON. Resposta: ' + content.slice(0,200));
  return jsonMatch[0];
}

// ── MAIN SEARCH ────────────────────────────────────────────
async function doSearch() {
  let q = '';
  if (currentMode === 'nl') {
    q = (document.getElementById('nl-input')?.value||'').trim();
    if (!q) { showNotif('Descreva o que você precisa para sua aula.'); return; }
  } else {
    const d=(document.getElementById('inp-disc')?.value||'').trim();
    const s=(document.getElementById('inp-serie')?.value||'').trim();
    const t=(document.getElementById('inp-tema')?.value||'').trim();
    const a=(document.getElementById('inp-ativ')?.value||'').trim();
    if (!d&&!s&&!t&&!a){showNotif('Preencha ao menos um campo para buscar.');return;}
    const parts=[];
    if(d) parts.push(`disciplina de ${d}`);
    if(s) parts.push(`para ${s==='EI'||s.toLowerCase().includes('infant')?'educação infantil':s==='EM'||s.toLowerCase().includes('médio')?'ensino médio':'o '+s+'º ano'}`);
    if(t) parts.push(`com tema em ${t}`);
    if(a) parts.push(`usando ${a}`);
    q='Preciso de ferramentas e plano de aula de '+parts.join(', ')+'.';
  }
  const btn=document.getElementById('sbtn');
  btn.classList.add('loading'); btn.querySelector('span').textContent='Buscando…';
  document.getElementById('rov-title').textContent='Buscando ferramentas…';
  document.getElementById('rov-sub').textContent=q;
  document.getElementById('rov').classList.add('active');
  document.getElementById('rcont').innerHTML=`<div class="ai-loading"><div class="coffee-wrap"><div class="coffee-steam"><div class="steam"></div><div class="steam"></div><div class="steam"></div></div><div class="coffee-cup"><div class="coffee-liquid"></div></div></div><p>Preparando sua aula com carinho<span class="dots"></span><br/><span style="font-size:.74rem;color:var(--dim)">buscando ferramentas na nossa lista ☕</span></p></div>`;
  try {
    const raw=await callDeepSeek(q);
    const clean=raw.replace(/```json|```/g,'').trim();
    const data=JSON.parse(clean);
    renderResult(data);
  } catch(e) {
    console.error(e);
    document.getElementById('rcont').innerHTML=`<div class="err-card"><div class="err-ico">⚠️</div><h3>Erro ao gerar resultado</h3><p style="color:var(--muted);font-size:.83rem">${e.message}</p></div>`;
    document.getElementById('rov-sub').textContent='Erro';
  } finally {
    btn.classList.remove('loading'); btn.querySelector('span').textContent='Buscar ferramentas';
  }
}

// ── RENDER RESULT ──────────────────────────────────────────
function renderResult(data) {
  currentResultData = data;
  document.getElementById('rov-title').textContent='✦ Ideias para sua aula';
  document.getElementById('rov-sub').textContent=(data.query_understood||'')+(data.nivel?' · '+data.nivel:'');
  let h='<div class="ai-result">';

  if (data.ideas?.length) {
    const toolsUsed = [...new Map(data.ideas.map(i=>[i.tool, i])).values()];
    let toolChips = toolsUsed.map(i=>`<span class="itool-chip">${i.tool_emoji||'🔧'} ${esc(i.tool)}</span>`).join('');

    h+=`<div class="ai-section">
      <h4>💡 5 Ideias pra sua aula</h4>
      <p style="font-size:.76rem;color:var(--dim);margin-bottom:14px">Clique em uma ideia para aprofundar com conexões, alertas e apps alternativos.</p>
      <div class="ideas-tools-row">${toolChips}</div>
      <div class="ideas-grid">`;
    data.ideas.forEach(idea=>{
      const manualHtml = idea.manual?.length
        ? `<div class="idea-manual"><div class="idea-manual-lbl">📖 Manual de uso</div>${idea.manual.map((s,i)=>`<div class="idea-manual-step"><span class="idea-manual-num">${i+1}</span><span>${esc(s)}</span></div>`).join('')}</div>`
        : '';
      h+=`<div class="idea-card" onclick="deepenIdea(${idea.id})">
        <div class="idea-num">${idea.id}</div>
        <div class="idea-body">
          <div class="idea-title">${esc(idea.title)}</div>
          <div class="idea-desc">${esc(idea.description)}</div>
          ${manualHtml}
          <span class="idea-tool">${idea.tool_emoji||'🔧'} ${esc(idea.tool)}</span>
        </div>
        <div class="idea-arrow">Aprofundar →</div>
      </div>`;
    });
    h+=`</div></div>`;
  }

  if (data.bncc?.length) {
    h+=`<div class="ai-section"><h4>🎯 Códigos BNCC</h4><div class="bncc-tags">`;
    data.bncc.forEach(b=>{ h+=`<span class="bncc-tag">${esc(b)}</span>`; });
    h+=`</div></div>`;
  }

  h+='</div>';
  document.getElementById('rcont').innerHTML=h;
}

// ── DEEPEN IDEA ────────────────────────────────────────────
async function deepenIdea(ideaId) {
  if (!currentResultData) return;
  const idea = currentResultData.ideas.find(i=>i.id===ideaId);
  if (!idea) return;

  const rcont = document.getElementById('rcont');
  rcont.innerHTML=`<div class="ai-loading"><div class="coffee-wrap"><div class="coffee-steam"><div class="steam"></div><div class="steam"></div><div class="steam"></div></div><div class="coffee-cup"><div class="coffee-liquid"></div></div></div><p>Aprofundando a ideia<span class="dots"></span><br/><span style="font-size:.74rem;color:var(--dim)">o café ainda está quente ☕</span></p></div>`;

  const queryCtx = `${idea.title}: ${idea.description}. Ferramenta: ${idea.tool}. Contexto: ${currentResultData.query_understood||''} — ${currentResultData.nivel||''}`;
  const tools = smartLocalSearch(currentResultData.query_understood||'');
  const toolName = idea.tool;

  const sys = `Você é especialista em EdTech e didática brasileira. Aprofunde a ideia de aula com um guia prático completo.

FERRAMENTAS DISPONÍVEIS (para sugerir alternativas — devem ser DIFERENTES de ${toolName}):
${JSON.stringify(tools.slice(0,40))}

REGRAS CRÍTICAS:
- Responda APENAS com JSON puro, sem markdown, sem texto extra, sem backticks
- apps_alternativos: 3 ferramentas DIFERENTES de "${toolName}", preferencialmente da lista acima
- interdisciplinar: 3 disciplinas REAIS com atividades concretas — SEM mencionar IA, apenas conexões didáticas humanas
- passos: entre 5 e 7 passos práticos, cada passo com titulo curto e instrucao clara de como usar ${toolName} nesse momento

FORMATO EXATO:
{"passos":[{"num":1,"titulo":"titulo curto do passo","instrucao":"o que o professor faz nesse momento e como usa ${toolName} especificamente"},{"num":2,"titulo":"...","instrucao":"..."}],"atencao":"Um parágrafo curto e direto sobre a principal dificuldade real ao aplicar essa atividade.","interdisciplinar":[{"disciplina":"nome da disciplina","emoji":"emoji relevante","conexao":"atividade ou tema concreto que conecta as duas disciplinas"},{"disciplina":"...","emoji":"...","conexao":"..."},{"disciplina":"...","emoji":"...","conexao":"..."}],"apps_alternativos":[{"nome":"nome exato da ferramenta","emoji":"emoji","diferencial":"o que essa ferramenta faz de unico que o professor provavelmente nao conhece"},{"nome":"...","emoji":"...","diferencial":"..."},{"nome":"...","emoji":"...","diferencial":"..."}]}`;

  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: sys }, { role: 'user', content: queryCtx }],
        max_tokens: 1200,
        temperature: 0.4
      })
    });
    const rawText = await resp.text();
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const parsed = JSON.parse(rawText);
    const content = parsed.choices?.[0]?.message?.content || '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Sem JSON na resposta');
    renderDeepening(idea, JSON.parse(jsonMatch[0]));
  } catch(e) {
    rcont.innerHTML=`<div class="err-card"><div class="err-ico">⚠️</div><h3>Erro ao aprofundar</h3><p>${e.message}</p><div style="text-align:center;margin-top:16px"><button class="mclose" style="width:auto;padding:9px 20px" onclick="renderResult(currentResultData)">← Voltar</button></div></div>`;
  }
}

// ── RENDER DEEPENING (with PDF button — Improvement 3) ─────
function renderDeepening(idea, deep) {
  const toolData = TOOLS.find(t=>t.tool.toLowerCase()===idea.tool.toLowerCase());
  let h='<div class="ai-result">';

  // ── BACK BUTTON + PDF EXPORT BUTTON
  h+=`<div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;"><div class="deep-back" onclick="renderResult(currentResultData)">← Voltar às 5 ideias</div><button class="deep-print-btn" onclick="exportToPDF()">⬇ Exportar PDF</button></div>`;

  // ── BIG TITLE HERO
  h+=`<div class="deep-hero">
    <div class="deep-hero-num">${idea.id}</div>
    <h2 class="deep-hero-title">${esc(idea.title)}</h2>
    <p class="deep-hero-desc">${esc(idea.description)}</p>
    <span class="deep-hero-tool">${idea.tool_emoji||'🔧'} ${esc(idea.tool)}</span>
    ${toolData?`<a href="${esc(toolData.link)}" target="_blank" rel="noopener" class="deep-hero-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Abrir ${esc(idea.tool)}</a>`:''}
  </div>`;

  // ── PASSO A PASSO
  if (deep.passos?.length) {
    h+=`<div class="deep-section">
      <h4>📋 Sequência didática passo a passo</h4>
      <div class="steps-list">`;
    deep.passos.forEach(p=>{
      h+=`<div class="step-item">
        <div class="step-num">${p.num}</div>
        <div class="step-body">
          <div class="step-title">${esc(p.titulo)}</div>
          <div class="step-inst">${esc(p.instrucao)}</div>
        </div>
      </div>`;
    });
    h+=`</div></div>`;
  }

  // ── PONTO DE ATENÇÃO
  if (deep.atencao) {
    h+=`<div class="deep-section">
      <h4>⚠️ Ponto de atenção</h4>
      <div class="attention-box">
        <div class="attention-ico">⚠️</div>
        <div class="attention-text">${esc(deep.atencao)}</div>
      </div>
    </div>`;
  }

  // ── CONEXÕES INTERDISCIPLINARES
  if (deep.interdisciplinar?.length) {
    h+=`<div class="deep-section"><h4>🔗 Conexões interdisciplinares</h4>`;
    deep.interdisciplinar.slice(0,3).forEach(c=>{
      h+=`<div class="inter-item">
        <div class="inter-ico">${c.emoji||'📚'}</div>
        <div class="inter-body">
          <div class="inter-disc">${esc(c.disciplina)}</div>
          <div class="inter-conexao">${esc(c.conexao)}</div>
        </div>
      </div>`;
    });
    h+=`</div>`;
  }

  // ── APPS ALTERNATIVOS
  if (deep.apps_alternativos?.length) {
    h+=`<div class="deep-section"><h4>🔍 Ferramentas parecidas que você provavelmente não conhece</h4><div class="alt-apps">`;
    deep.apps_alternativos.slice(0,3).forEach(app=>{
      const found = TOOLS.find(t=>t.tool.toLowerCase()===app.nome.toLowerCase());
      h+=`<div class="alt-app">
        <div class="alt-app-ico">${app.emoji||'📌'}</div>
        <div>
          <div class="alt-app-name">${found?`<span onclick="openModalByName('${esc(app.nome)}')" style="cursor:pointer;text-decoration:underline;text-decoration-style:dashed;text-underline-offset:3px">${esc(app.nome)}</span>`:esc(app.nome)}</div>
          <div class="alt-app-desc">${esc(app.diferencial)}</div>
        </div>
      </div>`;
    });
    h+=`</div></div>`;
  }

  h+='</div>';
  document.getElementById('rcont').innerHTML=h;
  document.getElementById('rov-title').textContent='✦ Aprofundamento';
  document.getElementById('rov-sub').textContent=idea.title;
}

// ── MODAL ─────────────────────────────────────────────────
function getTips(t) {
  for (const [k,v] of Object.entries(TIPS_MAP)) if (t.category.toLowerCase().includes(k.toLowerCase())) return v;
  return ['Apresente a ferramenta com exemplo prático.','Permita exploração livre no início.','Conecte a atividade ao cotidiano dos alunos.','Promova reflexão sobre o processo ao final.'];
}

function getInter(t) {
  return INTER.filter(c=>!c.sub.toLowerCase().includes(t.subject.toLowerCase())&&!t.subject.toLowerCase().includes(c.sub.toLowerCase())).slice(0,3).map(c=>({...c,tip:`Usar ${t.tool} para explorar conexões com ${c.sub}`}));
}

function openModal(t) {
  if (!t) return;
  currentModalTool = t;
  const tips=getTips(t), inter=getInter(t), bd=BNCC_MAP[t.bncc]||t.bncc;
  const didaticDesc = `${esc(t.tool)} é uma ferramenta de <strong>${esc(t.category)}</strong> voltada para ${esc(t.subject)}. Permite ${esc(t.lesson).charAt(0).toLowerCase()+esc(t.lesson).slice(1)} Seu método pedagógico principal é <em>${esc(t.method)}</em>, ideal para ${esc(t.grade)==='EM'?'o Ensino Médio':esc(t.grade)==='EI'?'a Educação Infantil':'o '+esc(t.grade)+'º ano'}.`;
  document.getElementById('mcont').innerHTML=`
    <div class="mhdr">
      <div class="memo">${ge(t.category)}</div>
      <div class="mtg"><h2>${esc(t.tool)}</h2><div class="mbdgs"><span class="bcat">${esc(t.category)}</span><span class="bsub">${esc(t.subject)}</span><span class="bgr">${esc(t.grade)}</span></div></div>
      <a href="${esc(t.link)}" target="_blank" rel="noopener" class="mlnk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Acessar</a>
    </div>
    <div class="msec mtg-desc-sec"><h4>🔍 O que é</h4><p>${didaticDesc}</p></div>
    <div class="msec"><h4>📚 Atividade sugerida</h4><p>${esc(t.lesson)}</p></div>
    <div class="msec"><h4>🎯 Método</h4><p>${esc(t.method)}</p></div>
    <div class="msec"><h4>📌 BNCC</h4><p><strong>${esc(t.bncc)}</strong> — ${esc(bd)}</p></div>
    <div class="msec"><h4>💡 Como aplicar em aula</h4><div class="tips-list">${tips.map(tp=>`<div class="tip-item"><span>${esc(tp)}</span></div>`).join('')}</div></div>
    <div class="msec mtool-ideas-sec">
      <h4>✦ Gerar ideias com esta ferramenta</h4>
      <p class="mtool-ideas-desc">Qual tema você quer explorar com <strong>${esc(t.tool)}</strong>?</p>
      <div class="mtool-ideas-row">
        <input type="text" id="mtool-theme-input" class="mtool-theme-inp" placeholder="Ex: frações, sustentabilidade, algoritmos…" onkeydown="if(event.key==='Enter')generateIdeasForTool()"/>
        <button class="mtool-ideas-btn" onclick="generateIdeasForTool()">Gerar ideias →</button>
      </div>
    </div>`;
  document.getElementById('modal-wrap').classList.add('open');
}

async function generateIdeasForTool() {
  const t = currentModalTool;
  if (!t) return;
  const themeInput = document.getElementById('mtool-theme-input');
  const theme = (themeInput?.value||'').trim();
  if (!theme) { showNotif('Digite um tema para gerar ideias.'); return; }
  const query = `Quero 5 ideias de aula usando ${t.tool} com tema: ${theme}. Disciplina: ${t.subject}. Use ${t.tool} em pelo menos 3 das 5 ideias — nas outras pode variar com ferramentas similares.`;
  closeModal();
  document.getElementById('rov-title').textContent = 'Gerando ideias…';
  document.getElementById('rov-sub').textContent = `${t.tool} · ${theme}`;
  document.getElementById('rov').classList.add('active');
  document.getElementById('rcont').innerHTML=`<div class="ai-loading"><div class="coffee-wrap"><div class="coffee-steam"><div class="steam"></div><div class="steam"></div><div class="steam"></div></div><div class="coffee-cup"><div class="coffee-liquid"></div></div></div><p>Gerando ideias com ${esc(t.tool)}<span class="dots"></span><br/><span style="font-size:.74rem;color:var(--dim)">café no forno ☕</span></p></div>`;
  try {
    const raw = await callDeepSeek(query);
    const clean = raw.replace(/```json|```/g,'').trim();
    const data = JSON.parse(clean);
    renderResult(data);
  } catch(e) {
    document.getElementById('rcont').innerHTML=`<div class="err-card"><div class="err-ico">⚠️</div><h3>Erro ao gerar ideias</h3><p>${e.message}</p></div>`;
  }
}

function openModalByName(n) {
  const t = TOOLS.find(x=>x.tool.toLowerCase()===n.toLowerCase());
  if (t) openModal(t);
}

function closeModal() {
  document.getElementById('modal-wrap').classList.remove('open');
}

// ── NAV ─────────────────────────────────────────────────
function showPage(p) {
  document.getElementById('home-page').classList.toggle('hidden', p!=='home');
  document.getElementById('tools-page').classList.toggle('hidden', p!=='tools');
  document.getElementById('bncc-page').classList.toggle('hidden', p!=='bncc');
  document.getElementById('nb-home').classList.toggle('active', p==='home');
  document.getElementById('nb-bncc').classList.toggle('active', p==='bncc');
  if (p==='tools') buildTools();
  if (p==='bncc') initBncc();
  window.scrollTo(0,0);
}

function openR() { document.getElementById('rov').classList.add('active'); }
function closeR() { document.getElementById('rov').classList.remove('active'); }
function toggleMob() { document.getElementById('mobnav').classList.toggle('open'); }

function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'), 2800);
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ── HERO TYPEWRITER ─────────────────────────────────────────────────────────
const HERO_WORDS = ['ferramenta','atividade','dinâmica','sequência','estratégia','ideia','abordagem','proposta','experiência','prática'];
let heroIdx = 0;
let heroTyping = false;

function typeWord(el, word, cb) {
  let i = 0;
  el.textContent = '';
  function type() {
    if (i<=word.length) {
      el.textContent = word.slice(0,i);
      i++;
      setTimeout(type, 68 + Math.random()*38);
    } else { cb && setTimeout(cb, 1800); }
  }
  type();
}

function eraseWord(el, cb) {
  let txt = el.textContent;
  function erase() {
    if (txt.length>0) {
      txt = txt.slice(0,-1);
      el.textContent = txt;
      setTimeout(erase, 42 + Math.random()*22);
    } else { cb && setTimeout(cb, 180); }
  }
  erase();
}

function runHero() {
  const el = document.getElementById('hero-word');
  if (!el||heroTyping) return;
  heroTyping = true;
  eraseWord(el, ()=>{
    heroIdx = (heroIdx+1)%HERO_WORDS.length;
    typeWord(el, HERO_WORDS[heroIdx], ()=>{ heroTyping = false; });
  });
}

// ── INIT ──────────────────────────────────────────────────
(function() {
  const el = document.getElementById('hero-word');
  if (el) {
    heroIdx = Math.floor(Math.random()*HERO_WORDS.length);
    typeWord(el, HERO_WORDS[heroIdx], ()=>{ setInterval(runHero, 3200); });
  }

  // Timeline — animate steps in on scroll
  document.querySelectorAll('.tl-step').forEach(step => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        step.classList.add('visible');
        obs.disconnect();
      });
    }, { threshold: 0.25 });
    obs.observe(step);
  });

  // Stats counter animation
  const statsEl = document.getElementById('stats-section');
  if (statsEl) {
    statsEl.querySelectorAll('.stat').forEach(statEl => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          statEl.classList.add('visible');
          const numEl = statEl.querySelector('.stat-n');
          if (!numEl) return;
          const target = parseInt(numEl.dataset.target||'0');
          const suffix = numEl.dataset.suffix||'';
          const text = numEl.dataset.text;
          if (text) { numEl.textContent=text; return; }
          let cur = 0; const dur = 900; const step = 16;
          const inc = target/(dur/step);
          const timer = setInterval(()=>{
            cur += inc;
            if (cur>=target) { numEl.textContent=target+suffix; clearInterval(timer); return; }
            numEl.textContent = Math.floor(cur)+suffix;
          }, step);
          obs.disconnect();
        });
      }, {threshold:0.3});
      obs.observe(statEl);
    });
  }
})();

document.addEventListener('keydown', e=>{
  if (e.key==='Escape') { closeModal(); closeR(); }
  if (e.key==='Enter' && e.target.id==='nl-input' && !e.shiftKey) { e.preventDefault(); doSearch(); }
});
