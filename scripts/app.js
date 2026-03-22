// ── UI STATE ───────────────────────────────────────────────
// ── UI STATE ───────────────────────────────────────────────
let currentMode = 'nl';
let currentResultData = null;
let currentModalTool = null;
let currentDeepeningIdea = null;
let currentFicha = null;
let _loadingTimer = null;
const _searchCache = new Map();

const AVAL_METHODS = [
  'Rubrica de processo','Portfólio digital','Autoavaliação',
  'Avaliação por pares','Observação direta','Checklist de competências',
  'Diário de aprendizagem','Registro fotográfico avaliativo'
];

// ── PROGRESSIVE COFFEE LOADING ─────────────────────────────
const _COFFEE_PHASES = [
  { cls:'',         sub:'buscando as melhores ferramentas ☕' },
  { cls:'coffee-brew', sub:'organizando as ideias pra você ✨' },
  { cls:'coffee-done', sub:'últimos retoques, quase pronto 🎯' }
];
function _coffeeHTML(cls, msg, sub) {
  return `<div class="ai-loading"><div class="coffee-wrap ${cls}"><div class="coffee-steam"><div class="steam"></div><div class="steam"></div><div class="steam"></div></div><div class="coffee-cup"><div class="coffee-liquid"></div></div></div><p>${msg}<span class="dots"></span><br/><span style="font-size:.74rem;color:var(--dim)">${sub}</span></p></div>`;
}
function showLoading(el, msg, sub0) {
  if (_loadingTimer) { clearInterval(_loadingTimer); _loadingTimer = null; }
  let phase = 0;
  const render = () => {
    const p = _COFFEE_PHASES[phase];
    el.innerHTML = _coffeeHTML(p.cls, msg, phase === 0 && sub0 ? sub0 : p.sub);
  };
  render();
  _loadingTimer = setInterval(() => {
    phase = Math.min(phase + 1, _COFFEE_PHASES.length - 1);
    render();
    if (phase === _COFFEE_PHASES.length - 1) { clearInterval(_loadingTimer); _loadingTimer = null; }
  }, 5000);
}

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
  const cacheKey = query.toLowerCase().trim();
  if (_searchCache.has(cacheKey)) return _searchCache.get(cacheKey);

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
{"query_understood":"resumo da busca","nivel":"nível/série","tools":[{"name":"nome exato","emoji":"emoji","reason":"motivo breve"}],"ideas":[{"id":1,"title":"título curto","description":"1 frase do que o professor vai fazer","tool":"nome exato da ferramenta","tool_emoji":"emoji","bncc_codes":["código BNCC alinhado"]},{"id":2,"title":"...","description":"...","tool":"...","tool_emoji":"...","bncc_codes":["..."]},{"id":3,"title":"...","description":"...","tool":"...","tool_emoji":"...","bncc_codes":["..."]},{"id":4,"title":"...","description":"...","tool":"...","tool_emoji":"...","bncc_codes":["..."]},{"id":5,"title":"...","description":"...","tool":"...","tool_emoji":"...","bncc_codes":["..."]}],"bncc":["código1","código2"]}`;

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
  if (_searchCache.size >= 15) _searchCache.delete(_searchCache.keys().next().value);
  _searchCache.set(cacheKey, jsonMatch[0]);
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
  showLoading(document.getElementById('rcont'), 'Preparando sua aula');
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
  if (window._bnccContextBadge?.code) {
    const b = window._bnccContextBadge;
    h+=`<div class="bncc-context-banner"><span class="bncc-ctx-pill">🔵 BNCC</span><span class="bncc-ctx-code">${b.code}</span>${b.title?`<span class="bncc-ctx-title">— ${b.title}</span>`:''}</div>`;
    window._bnccContextBadge = null;
  }

  if (data.ideas?.length) {
    const toolsUsed = [...new Map(data.ideas.map(i=>[i.tool, i])).values()];
    let toolChips = toolsUsed.map(i=>{
      const td = TOOLS.find(t=>t.tool.toLowerCase()===i.tool.toLowerCase());
      const href = td?.link;
      return href
        ? `<a class="itool-chip" href="${esc(href)}" target="_blank" rel="noopener" title="Abrir ${esc(i.tool)}">${i.tool_emoji||'🔧'} ${esc(i.tool)} ↗</a>`
        : `<span class="itool-chip">${i.tool_emoji||'🔧'} ${esc(i.tool)}</span>`;
    }).join('');

    h+=`<div class="ai-section">
      <h4>💡 5 Ideias pra sua aula</h4>
      <p style="font-size:.76rem;color:var(--dim);margin-bottom:14px">Clique em uma ideia para aprofundar com conexões, alertas e apps alternativos.</p>
      <div class="ideas-tools-row">${toolChips}</div>
      <div class="ideas-grid">`;
    data.ideas.forEach(idea=>{
      const bnccChips = idea.bncc_codes?.length
        ? `<div class="idea-bncc-row">${idea.bncc_codes.map(c=>`<span class="idea-bncc-chip">${esc(c)}</span>`).join('')}</div>`
        : '';
      h+=`<div class="idea-card" onclick="deepenIdea(${idea.id})">
        <div class="idea-num">${idea.id}</div>
        <div class="idea-body">
          <div class="idea-title">${esc(idea.title)}</div>
          <div class="idea-desc">${esc(idea.description)}</div>
          ${bnccChips}
          <span class="idea-tool">${idea.tool_emoji||'🔧'} ${esc(idea.tool)}</span>
        </div>
        <div class="idea-arrow">Aprofundar →</div>
      </div>`;
    });
    h+=`</div>
      <div style="text-align:center;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.07)">
        <button class="mais-ideias-btn" id="mais-ideias-btn" onclick="maisIdeias()">+ Preciso de mais ideias</button>
      </div>
    </div>`;
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
  currentDeepeningIdea = idea;
  await _runDeepening(idea);
}

async function redeepenWithTool(newToolName, newToolEmoji) {
  if (!currentDeepeningIdea || !currentResultData) return;
  const updated = { ...currentDeepeningIdea, tool: newToolName, tool_emoji: newToolEmoji || '🔧' };
  const idx = currentResultData.ideas.findIndex(i=>i.id===updated.id);
  if (idx >= 0) currentResultData.ideas[idx] = updated;
  currentDeepeningIdea = updated;
  await _runDeepening(updated);
}

async function swapToolFromSearch() {
  const input = document.getElementById('deep-swap-input');
  const desc = (input?.value||'').trim();
  if (!desc) { showNotif('Descreva o que você precisa.'); return; }
  const tools = smartLocalSearch(desc);
  const box = document.getElementById('deep-swap-results');
  if (!box) return;
  if (!tools.length) { box.innerHTML='<p style="font-size:.76rem;color:var(--dim);padding:6px 0">Nenhuma ferramenta encontrada.</p>'; return; }
  box.innerHTML = tools.slice(0,5).map(t=>`
    <div class="swap-pick-item" onclick="redeepenWithTool('${esc(t.name)}','')">
      <span class="swap-pick-emo">${ge(t.category)}</span>
      <div class="swap-pick-body"><div class="swap-pick-name">${esc(t.name)}</div><div class="swap-pick-cat">${esc(t.category)}</div></div>
      <span class="swap-pick-cta">Usar →</span>
    </div>`).join('');
}

async function _runDeepening(idea) {
  const rcont = document.getElementById('rcont');
  showLoading(rcont, `Aprofundando com ${esc(idea.tool)}`);

  const queryCtx = `${idea.title}: ${idea.description}. Ferramenta principal: ${idea.tool}. Contexto: ${currentResultData.query_understood||''} — ${currentResultData.nivel||''}`;
  const tools = smartLocalSearch(currentResultData.query_understood||'');
  const toolName = idea.tool;
  const toolsSlim = JSON.stringify(tools.slice(0,10).map(t=>({nome:t.name,cat:t.category})));

  const sys = `Você é especialista em EdTech e didática brasileira. Aprofunde a ideia com guia completo e prático.

FERRAMENTAS DISPONÍVEIS (para alternativas — devem ser DIFERENTES de "${toolName}"):
${toolsSlim}

REGRAS ABSOLUTAS — TODAS AS SEÇÕES SÃO OBRIGATÓRIAS:
- Responda APENAS com JSON puro, sem markdown, sem backticks
- passos: EXATAMENTE 5 passos (não mais) usando ${toolName}
- interdisciplinar: EXATAMENTE 3 disciplinas com conexão concreta
- apps_alternativos: EXATAMENTE 3 ferramentas DIFERENTES de "${toolName}"
- registro: EXATAMENTE 3 dicas de como os alunos documentam o aprendizado (portfólio digital, diário, foto, etc.)
- avaliacao: OBRIGATÓRIO — método + EXATAMENTE 3 critérios objetivos focados no processo
- ficha: FICHA INVESTIGATIVA — segue obrigatoriamente o ciclo de investigação: (1) hipótese antes de começar, (2) o que investigou/observou durante, (3) conclusão + nova dúvida gerada. A questao_central deve ser uma pergunta genuinamente curiosa e provocadora que instigue o aluno a investigar — NÃO uma afirmação, sempre uma pergunta. As áreas devem ter labels e guias contextualizados ao tema específico da aula, não genéricos.
- NÃO omita nenhuma dessas chaves do JSON — todas são obrigatórias

FORMATO EXATO (copie esta estrutura exatamente):
{"passos":[{"num":1,"titulo":"titulo curto","instrucao":"instrucao usando ${toolName}"},{"num":2,"titulo":"...","instrucao":"..."},{"num":3,"titulo":"...","instrucao":"..."},{"num":4,"titulo":"...","instrucao":"..."},{"num":5,"titulo":"...","instrucao":"..."}],"atencao":"dificuldade principal em 1 frase","interdisciplinar":[{"disciplina":"nome","emoji":"emoji","conexao":"conexao concreta"},{"disciplina":"...","emoji":"...","conexao":"..."},{"disciplina":"...","emoji":"...","conexao":"..."}],"apps_alternativos":[{"nome":"nome exato","emoji":"emoji","diferencial":"diferencial em 1 frase"},{"nome":"...","emoji":"...","diferencial":"..."},{"nome":"...","emoji":"...","diferencial":"..."}],"registro":["dica 1 de como o aluno documenta o aprendizado","dica 2","dica 3"],"avaliacao":{"metodo":"nome do método","criterios":["critério 1 com descritor","critério 2 com descritor","critério 3 com descritor"]},"ficha":{"titulo":"título curto da ficha investigativa contextualizado ao tema","questao_central":"Pergunta investigativa provocadora e genuína sobre o tema específico?","areas":[{"label":"🔍 Minha hipótese","guia":"Antes de começar: o que você acha que vai descobrir sobre [tema específico]? Escreva sua previsão."},{"label":"🧪 O que investigui","guia":"Durante a atividade: o que você fez, observou ou descobriu usando ${toolName}? Descreva com detalhes."},{"label":"💡 O que aprendi — e o que ainda quero descobrir","guia":"Conclusão: o que ficou claro para você? Que nova dúvida ou curiosidade surgiu?"}]}}`;

  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'system', content: sys }, { role: 'user', content: queryCtx }], max_tokens: 2900, temperature: 0.4 })
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

// ── RENDER DEEPENING ────────────────────────────────────────
function renderDeepening(idea, deep) {
  currentDeepeningIdea = idea;
  currentFicha = deep.ficha || null;
  const toolData = TOOLS.find(t=>t.tool.toLowerCase()===idea.tool.toLowerCase());
  let h='<div class="ai-result">';

  // ── BACK + PDF
  h+=`<div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap"><div class="deep-back" onclick="renderResult(currentResultData)">← Voltar às 5 ideias</div><button class="deep-print-btn" onclick="exportToPDF()">⬇ Exportar PDF</button></div>`;

  // ── HERO
  h+=`<div class="deep-hero">
    <div class="deep-hero-num">${idea.id}</div>
    <h2 class="deep-hero-title">${esc(idea.title)}</h2>
    <p class="deep-hero-desc">${esc(idea.description)}</p>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="deep-hero-tool">${idea.tool_emoji||'🔧'} ${esc(idea.tool)}</span>
      ${toolData?`<a href="${esc(toolData.link)}" target="_blank" rel="noopener" class="deep-hero-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Abrir ${esc(idea.tool)}</a>`:''}
    </div>
  </div>`;

  // ── PASSO A PASSO
  if (deep.passos?.length) {
    h+=`<div class="deep-section"><h4>📋 Sequência didática passo a passo</h4><div class="steps-list">`;
    deep.passos.forEach(p=>{
      h+=`<div class="step-item"><div class="step-num">${p.num}</div><div class="step-body"><div class="step-title">${esc(p.titulo)}</div><div class="step-inst">${esc(p.instrucao)}</div></div></div>`;
    });
    h+=`</div></div>`;
  }

  // ── FICHA IMPRESSA
  if (deep.ficha) {
    const f = deep.ficha;
    h+=`<div class="deep-section deep-ficha">
      <h4>🔬 Ficha investigativa para imprimir</h4>
      <div class="ficha-preview">
        <div class="ficha-preview-eyebrow">Ciclo de investigação</div>
        <div class="ficha-preview-title">${esc(f.titulo)}</div>
        ${f.questao_central?`<div class="ficha-questao"><span class="ficha-questao-lbl">Questão norteadora</span><span class="ficha-questao-text">${esc(f.questao_central)}</span></div>`:''}
        <div class="ficha-preview-areas">${(f.areas||[]).slice(0,3).map((a,i)=>`
          <div class="ficha-area-preview ficha-phase-${i+1}">
            <div class="ficha-area-label">${esc(a.label)}</div>
            <div class="ficha-area-guia">${esc(a.guia)}</div>
            <div class="ficha-area-lines"></div>
          </div>`).join('')}
        </div>
      </div>
      <button class="ficha-print-btn" onclick="printFicha()">🖨 Use esta ficha em sala de aula!</button>
    </div>`;
  }

  // ── REGISTRO DOS ALUNOS
  if (deep.registro?.length) {
    h+=`<div class="deep-section deep-registro">
      <h4>📓 Dicas de registro para os alunos</h4>
      <div class="registro-list">`;
    deep.registro.forEach((r,i)=>{
      h+=`<div class="registro-item"><span class="registro-num">${i+1}</span><span class="registro-text">${esc(r)}</span></div>`;
    });
    h+=`</div></div>`;
  }

  // ── AVALIAÇÃO
  if (deep.avaliacao) {
    const av = deep.avaliacao;
    const currentMethod = av.metodo || '';
    const methodOpts = AVAL_METHODS.map(m=>`<option value="${esc(m)}"${m===currentMethod?' selected':''}>${esc(m)}</option>`).join('');
    const extraOpt = !AVAL_METHODS.includes(currentMethod) && currentMethod
      ? `<option value="${esc(currentMethod)}" selected>${esc(currentMethod)}</option>` : '';
    h+=`<div class="deep-section deep-avaliacao">
      <h4>📊 Avaliação</h4>
      <div class="aval-metodo">
        <span class="aval-metodo-lbl">Método</span>
        <select class="aval-select" onchange="changeAvalMethod(this.value)">${extraOpt}${methodOpts}</select>
      </div>
      <div class="aval-criterios" id="aval-criterios-area">`;
    (av.criterios||[]).forEach((c,i)=>{
      h+=`<div class="aval-crit-item"><span class="aval-crit-num">${i+1}</span><span class="aval-crit-text">${esc(c)}</span></div>`;
    });
    h+=`</div></div>`;
  }

  // ── PONTO DE ATENÇÃO
  if (deep.atencao) {
    h+=`<div class="deep-section"><h4>⚠️ Ponto de atenção</h4><div class="attention-box"><div class="attention-ico">⚠️</div><div class="attention-text">${esc(deep.atencao)}</div></div></div>`;
  }

  // ── CONEXÕES INTERDISCIPLINARES
  if (deep.interdisciplinar?.length) {
    h+=`<div class="deep-section"><h4>🔗 Conexões interdisciplinares</h4>`;
    deep.interdisciplinar.slice(0,3).forEach(c=>{
      h+=`<div class="inter-item"><div class="inter-ico">${c.emoji||'📚'}</div><div class="inter-body"><div class="inter-disc">${esc(c.disciplina)}</div><div class="inter-conexao">${esc(c.conexao)}</div></div></div>`;
    });
    h+=`</div>`;
  }

  // ── APPS ALTERNATIVOS (com botão de troca)
  if (deep.apps_alternativos?.length) {
    h+=`<div class="deep-section"><h4>🔄 Trocar ferramenta</h4><p style="font-size:.76rem;color:var(--dim);margin-bottom:12px">Não curtiu ${esc(idea.tool)}? Experimente uma alternativa — o aprofundamento será refeito com ela.</p><div class="alt-apps">`;
    deep.apps_alternativos.slice(0,3).forEach(app=>{
      const found = TOOLS.find(t=>t.tool.toLowerCase()===app.nome.toLowerCase());
      const nameHtml = found
        ? `<span class="alt-app-name-link" onclick="openModalByName('${esc(app.nome)}')">${esc(app.nome)}</span>`
        : `<span>${esc(app.nome)}</span>`;
      h+=`<div class="alt-app">
        <div class="alt-app-ico">${app.emoji||'📌'}</div>
        <div class="alt-app-info">
          <div class="alt-app-name">${nameHtml}</div>
          <div class="alt-app-desc">${esc(app.diferencial)}</div>
        </div>
        <button class="alt-swap-btn" onclick="redeepenWithTool('${esc(app.nome)}','${esc(app.emoji||'🔧')}')">Usar esta →</button>
      </div>`;
    });
    h+=`</div>
    <div class="deep-swap-search">
      <div class="deep-swap-label">Ou descreva o que você precisa:</div>
      <div class="deep-swap-row">
        <input id="deep-swap-input" class="deep-swap-inp" placeholder="Ex: algo mais visual, funciona offline, para celular…" onkeydown="if(event.key==='Enter')swapToolFromSearch()"/>
        <button class="deep-swap-btn" onclick="swapToolFromSearch()">Buscar →</button>
      </div>
      <div id="deep-swap-results" class="deep-swap-results"></div>
    </div>
    </div>`;
  }

  h+='</div>';
  document.getElementById('rcont').innerHTML=h;
  document.getElementById('rov-title').textContent='✦ Aprofundamento';
  document.getElementById('rov-sub').textContent=`${idea.tool} · ${idea.title}`;
}

// ── FICHA INVESTIGATIVA IMPRESSA ──────────────────────────
function printFicha() {
  const f = currentFicha;
  if (!f) return;
  const ideaTitle = currentDeepeningIdea?.title || 'Aula';
  const nivel = currentResultData?.nivel || '';
  const PHASE_COLORS = ['#5c4ef0','#d4426b','#0a8f7a'];
  const PHASE_LIGHT  = ['#ede9ff','#fce8ef','#e0f7f3'];
  const areasHtml = (f.areas||[]).slice(0,3).map((a,i)=>`
    <div class="area" style="border-color:${PHASE_COLORS[i]}30;--ph:${PHASE_COLORS[i]};--phl:${PHASE_LIGHT[i]}">
      <div class="area-header">
        <div class="area-step">Etapa ${i+1}</div>
        <div class="area-label">${a.label||''}</div>
      </div>
      <div class="area-guide">${a.guia||''}</div>
      <div class="area-lines"></div>
    </div>`).join('');
  w = window.open('','_blank','width=820,height=760');
  w.document.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>${f.titulo}</title><style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;max-width:700px;margin:24px auto;color:#18182a;padding:0 22px;font-size:14px}
  /* HEADER */
  .header{margin-bottom:18px;padding-bottom:14px;border-bottom:2px solid #18182a}
  .header-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
  .eyebrow{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#5c4ef0}
  .id-fields{display:flex;gap:20px}
  .id-field{font-size:10px;color:#888;border-bottom:1px solid #ccc;padding-bottom:2px;min-width:110px}
  h1{font-size:17px;font-weight:900;color:#18182a;line-height:1.2;margin-bottom:4px}
  .meta{font-size:10px;color:#888}
  /* QUESTÃO */
  .questao{background:#f0edff;border:1.5px solid #5c4ef0;border-radius:8px;padding:11px 14px;margin-bottom:16px}
  .questao-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#5c4ef0;margin-bottom:4px}
  .questao-text{font-size:13px;font-weight:700;color:#18182a;line-height:1.45}
  /* AREAS */
  .area{border:1.5px solid #ddd;border-radius:10px;margin-bottom:12px;overflow:hidden}
  .area-header{background:var(--phl,#f5f5ff);padding:8px 13px;border-bottom:1.5px solid var(--ph,#5c4ef0)30}
  .area-step{font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--ph,#5c4ef0);margin-bottom:2px}
  .area-label{font-size:11.5px;font-weight:800;color:#18182a}
  .area-guide{font-size:10.5px;color:#666;font-style:italic;padding:8px 13px 6px;line-height:1.5}
  .area-lines{padding:0 13px 10px;height:108px;background:repeating-linear-gradient(transparent,transparent 26px,#e5e5e5 26px,#e5e5e5 27px);margin:0 13px 10px}
  /* FOOTER */
  .footer{margin-top:18px;font-size:9px;color:#bbb;text-align:center;border-top:1px solid #eee;padding-top:8px;display:flex;justify-content:space-between}
  @media print{body{margin:8mm 14mm}@page{margin:10mm}}
  </style></head><body>
  <div class="header">
    <div class="header-top">
      <div class="eyebrow">🔬 EduMake · Ficha investigativa${nivel?' · '+nivel:''}</div>
      <div class="id-fields">
        <div class="id-field">Nome: ___________________</div>
        <div class="id-field">Data: __________</div>
      </div>
    </div>
    <h1>${f.titulo}</h1>
    <div class="meta">Atividade: ${ideaTitle}</div>
  </div>
  ${f.questao_central?`<div class="questao"><div class="questao-lbl">🔍 Questão norteadora</div><div class="questao-text">${f.questao_central}</div></div>`:''}
  ${areasHtml}
  <div class="footer">
    <span>Gerado pelo EduMake — edumake para professores</span>
    <span>Ciclo investigativo: Hipótese → Investigação → Conclusão</span>
  </div>
  <script>setTimeout(()=>window.print(),420)</script>
  </body></html>`);
  w.document.close();
}

// ── TROCAR MÉTODO DE AVALIAÇÃO ────────────────────────────
async function changeAvalMethod(method) {
  if (!currentDeepeningIdea) return;
  const el = document.getElementById('aval-criterios-area');
  if (!el) return;
  el.innerHTML = '<div style="font-size:.76rem;color:var(--dim);padding:8px 0">Gerando critérios<span class="dots"></span></div>';
  const ctx = `Atividade: ${currentDeepeningIdea.title}. Ferramenta: ${currentDeepeningIdea.tool}. Nível: ${currentResultData?.nivel||''}`;
  const sys = `Especialista em avaliação educacional. Para o método "${method}" aplicado à atividade, gere EXATAMENTE 3 critérios objetivos e específicos. JSON puro apenas: {"criterios":["critério 1 com descritor","critério 2","critério 3"]}`;
  try {
    const resp = await fetch(DEEPSEEK_URL, {
      method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${DEEPSEEK_KEY}`},
      body: JSON.stringify({model:'deepseek-chat',messages:[{role:'system',content:sys},{role:'user',content:ctx}],max_tokens:300,temperature:0.3})
    });
    const raw = await resp.text();
    const content = JSON.parse(raw).choices?.[0]?.message?.content||'';
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('no json');
    const data = JSON.parse(match[0]);
    el.innerHTML = (data.criterios||[]).map((c,i)=>`<div class="aval-crit-item"><span class="aval-crit-num">${i+1}</span><span class="aval-crit-text">${esc(c)}</span></div>`).join('');
  } catch(_) {
    el.innerHTML = '<div style="font-size:.74rem;color:var(--dim);padding:8px 0">Não foi possível gerar critérios. Tente outro método.</div>';
  }
}

// ── MAIS IDEIAS ───────────────────────────────────────────
async function maisIdeias() {
  if (!currentResultData) return;
  const btn = document.getElementById('mais-ideias-btn');
  if (btn) { btn.textContent = 'Buscando mais ideias…'; btn.disabled = true; }
  const alreadyTools = [...new Set(currentResultData.ideas.map(i=>i.tool))].join(', ');
  const nextId = currentResultData.ideas.length + 1;
  const q = `${currentResultData.query_understood||''} — nível: ${currentResultData.nivel||''}. Gere 5 ideias NOVAS E DIFERENTES das anteriores. Ferramentas já usadas (não repita): ${alreadyTools}.`;
  try {
    const raw = await callDeepSeek(q);
    const data = JSON.parse(raw.replace(/```json|```/g,'').trim());
    data.ideas.forEach((idea,i) => { idea.id = nextId + i; });
    currentResultData.ideas.push(...data.ideas);
    renderResult(currentResultData);
  } catch(e) {
    if (btn) { btn.textContent = '+ Preciso de mais ideias'; btn.disabled = false; }
    showNotif('Erro ao buscar mais ideias. Tente novamente.');
  }
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
      <div class="mtg"><h2>${esc(t.tool)}</h2><div class="mbdgs">
        <span class="bcat filt-tag" onclick="goToToolsWithFilter('cat','${esc(t.category)}')" title="Ver todas: ${esc(t.category)}">${esc(t.category)}</span>
        <span class="bsub filt-tag" onclick="goToToolsWithFilter('subject','${esc(t.subject)}')" title="Ver todas: ${esc(t.subject)}">${esc(t.subject)}</span>
        <span class="bgr filt-tag" onclick="goToToolsWithFilter('grade','${esc(t.grade)}')" title="Ver todas: ${esc(t.grade)}">${esc(t.grade)}</span>
      </div></div>
      <a href="${esc(t.link)}" target="_blank" rel="noopener" class="mlnk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Acessar</a>
    </div>
    <button class="mtool-cta-btn" onclick="document.getElementById('mtool-theme-input')?.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>document.getElementById('mtool-theme-input')?.focus(),320)">✦ Quero usar essa ferramenta!</button>
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
  showLoading(document.getElementById('rcont'), `Gerando ideias com ${esc(t.tool)}`);
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
