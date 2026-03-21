// ── LOCAL SEARCH (executa quando DeepSeek chama search_tools) ──
function runSearch(args) {
  const { subject, grade, category, keyword, limit = 10 } = args;
  let r = [...TOOLS];
  if (subject) {
    const s = subject.toLowerCase();
    r = r.filter(t => [t.subject,t.category,t.lesson,t.tool].some(x => x.toLowerCase().includes(s)));
  }
  if (grade) {
    const g = grade.toLowerCase().replace(/educação infantil|infantil|ei/gi,'EI').replace(/ensino médio|médio|medio|em$/gi,'EM');
    r = r.filter(t => {
      const tg = t.grade.toLowerCase();
      if (g.toLowerCase()==='ei') return tg.includes('ei') || /^[123]/.test(tg) || tg==='1-3';
      if (g.toLowerCase()==='em') return tg.includes('em');
      const n = parseInt(g);
      if (!isNaN(n)) {
        const parts = tg.split('-').map(x=>parseInt(x)).filter(x=>!isNaN(x));
        if (parts.length===2) return n>=parts[0]&&n<=parts[1];
        if (parts.length===1) return parts[0]===n;
      }
      return tg.includes(g.toLowerCase());
    });
  }
  if (category) {
    const c = category.toLowerCase();
    r = r.filter(t => t.category.toLowerCase().includes(c));
  }
  if (keyword) {
    const kw = keyword.toLowerCase();
    r = r.filter(t => [t.tool,t.lesson,t.method,t.subject,t.category].some(x => x.toLowerCase().includes(kw)));
  }
  return r.slice(0, Math.min(limit, 15)).map(t => ({
    name: t.tool, category: t.category, subject: t.subject,
    grade: t.grade, lesson: t.lesson, method: t.method, link: t.link, bncc: t.bncc
  }));
}

// ── SMART LOCAL PRE-FILTER ─────────────────────────────────
function smartLocalSearch(query) {
  const q = query.toLowerCase();
  let grade = null;
  if (/educa[cç][aã]o infantil|infantil|\bei\b/i.test(q)) grade = 'EI';
  else if (/ensino m[eé]dio|\bem\b/i.test(q)) grade = 'EM';
  else { const m = q.match(/\b([1-9])[oºª°]?\s*ano\b|\b([1-9])[oºª°]?\s*s[eé]rie\b/); if (m) grade = m[1]||m[2]; }

  const SUBJ_MAP = [
    [/matem[aá]tic|fra[cç][oõ]|geometr|[aá]lgebr|estatíst/i,'Matemática'],
    [/ci[eê]nci|fís|qu[ií]mic|biol|laborat|experim/i,'Ciências'],
    [/portugu[eê]s|leitura|escrita|reda[cç][aã]o|literatur/i,'Português'],
    [/hist[oó]ri/i,'História'],[/geograf|mapas?|clima/i,'Geografia'],
    [/artes?|m[uú]sic|desenho/i,'Artes'],[/ingl[eê]s|l[ií]nguas?|idiomas?/i,'Línguas'],
    [/tecnolog|computa[cç]|programa[cç]|coding/i,'Tecnologia'],
  ];
  let subject = null;
  for (const [rx,val] of SUBJ_MAP) { if (rx.test(q)) { subject=val; break; } }

  const CAT_MAP = [
    [/gamific|quiz|kahoot|quizizz|\bjogo/i,'Gamificação'],[/simula|phet|geogebra|laborat/i,'Simulação'],
    [/programa[cç]|scratch|python|coding|blocos/i,'Coding'],[/maker|rob[oó]tic|arduino/i,'Maker'],
    [/\bia\b|intelig[eê]ncia artificial/i,'AI'],[/colabora|padlet|miro/i,'Colaboração'],
    [/design|canva|infogr/i,'Design'],[/v[ií]deo|podcast|m[ií]dia/i,'Mídia'],
  ];
  let category = null;
  for (const [rx,val] of CAT_MAP) { if (rx.test(q)) { category=val; break; } }

  const stopRx = /\b(para|com|de|do|da|um|uma|que|aula|usar|sobre|no|na|os|as|em|ao|como|e|ou|é|ser|ter|eu|quero|preciso|fazer|criar|atividade|ferramenta|ferramentas|plano|disciplina|série|ano|ensino|escola|aluno|alunos|professor|turma)\b/gi;
  const keyword = q.replace(stopRx,'').replace(/\s+/g,' ').trim().split(' ').filter(w=>w.length>3).slice(0,3).join(' ') || null;

  const r1 = runSearch({ subject, grade, category, keyword, limit: 12 });
  if (r1.length < 4 && keyword) {
    const r2 = runSearch({ keyword, limit: 12 });
    const names = new Set(r1.map(r=>r.name));
    return [...r1, ...r2.filter(r=>!names.has(r.name))].slice(0, 12);
  }
  return r1;
}

// ── TOOLS PAGE FILTERS ─────────────────────────────────────
let activeSubject = 'all', activeGrade = 'all', activeCatEx = 'all';

function buildTools() { buildExploreFilters(); applyFilters(); }

function buildExploreFilters() {
  const subjects = ['all',...new Set(TOOLS.map(t=>t.subject).filter(Boolean))].sort((a,b)=>a==='all'?-1:b==='all'?1:a.localeCompare(b,'pt'));
  const GRADE_LABELS = [
    {key:'all',label:'Todos os níveis'},
    {key:'EI',label:'Educação Infantil'},
    {key:'1',label:'1º ano'},{key:'2',label:'2º ano'},{key:'3',label:'3º ano'},
    {key:'4',label:'4º ano'},{key:'5',label:'5º ano'},
    {key:'6',label:'6º ano'},{key:'7',label:'7º ano'},{key:'8',label:'8º ano'},{key:'9',label:'9º ano'},
    {key:'EM',label:'Ensino Médio'}
  ];
  const cats = ['all',...new Set(TOOLS.map(t=>t.category).filter(Boolean))].sort((a,b)=>a==='all'?-1:b==='all'?1:a.localeCompare(b,'pt'));

  const efSubj = document.getElementById('ef-subject');
  if (efSubj) { efSubj.innerHTML = subjects.map(s=>`<option value="${esc(s)}"${s===activeSubject?' selected':''}>${s==='all'?'Todas as disciplinas':esc(s)}</option>`).join(''); }

  const efGrade = document.getElementById('ef-grade');
  if (efGrade) { efGrade.innerHTML = GRADE_LABELS.map(g=>`<option value="${g.key}"${g.key===activeGrade?' selected':''}>${g.label}</option>`).join(''); }

  const efCat = document.getElementById('ef-category');
  if (efCat) { efCat.innerHTML = cats.map(c=>`<option value="${esc(c)}"${c===activeCatEx?' selected':''}>${c==='all'?'Todos os tipos':esc(c)}</option>`).join(''); }
}

function setExFilter(type, val) {
  if (type==='subject') activeSubject = val;
  else if (type==='grade') activeGrade = val;
  else activeCatEx = val;
  applyFilters();
}

function applyFilters() {
  const q = (document.getElementById('ts-search')?.value||'').toLowerCase();
  const f = TOOLS.filter(t => {
    const subOk = activeSubject==='all' || t.subject===activeSubject;
    const grOk = activeGrade==='all' || t.grade===activeGrade ||
      (activeGrade==='EI' && /infantil|EI/i.test(t.grade)) ||
      (activeGrade==='EM' && /médio|EM/i.test(t.grade)) ||
      t.grade.includes(activeGrade);
    const catOk = activeCatEx==='all' || t.category===activeCatEx;
    const qok = !q || [t.tool,t.subject,t.category,t.lesson,t.method].some(s=>s.toLowerCase().includes(q));
    return subOk && grOk && catOk && qok;
  });
  const grid = document.getElementById('tgrid');
  if (f.length === 0) {
    grid.innerHTML = `<div class="tgrid-empty">
      <div class="tgrid-empty-ico">🔍</div>
      <div class="tgrid-empty-title">Nenhuma ferramenta encontrada</div>
      <div class="tgrid-empty-sub">Tente outros filtros ou limpe a busca.</div>
      <button class="tgrid-empty-btn" onclick="clearToolFilters()">Limpar filtros</button>
    </div>`;
  } else {
    grid.innerHTML = f.map(t=>`
      <div class="tcard" style="--cc:${gc(t.category)}" onclick='openModal(${JSON.stringify(t)})'>
        <div class="tc-top">
          <span class="tc-emo filt-tag" onclick="event.stopPropagation();goToToolsWithFilter('cat','${esc(t.category)}')" title="Ver tudo: ${esc(t.category)}">${ge(t.category)}</span>
          <span class="tc-badge filt-tag" onclick="event.stopPropagation();goToToolsWithFilter('grade','${esc(t.grade)}')" title="Ver tudo: ${esc(t.grade)}">${esc(t.grade)}</span>
        </div>
        <div class="tc-name">${esc(t.tool)}</div>
        <div class="tc-desc">${esc(t.lesson)}</div>
        <div class="tc-tags">
          <span class="tag ts filt-tag" onclick="event.stopPropagation();goToToolsWithFilter('subject','${esc(t.subject)}')" title="Ver tudo: ${esc(t.subject)}">${esc(t.subject)}</span>
          <span class="tag tm">${esc(t.method)}</span>
        </div>
      </div>`).join('');
  }
  const cnt = document.getElementById('ts-cnt');
  if (cnt) cnt.textContent = f.length + ' ferramenta' + (f.length!==1?'s':'');
  const clearBtn = document.getElementById('ts-clear');
  if (clearBtn) {
    const hasFilter = activeSubject!=='all' || activeGrade!=='all' || activeCatEx!=='all' || (document.getElementById('ts-search')?.value||'');
    clearBtn.style.display = hasFilter ? 'inline-flex' : 'none';
  }
}

function clearToolFilters() {
  activeSubject = 'all'; activeGrade = 'all'; activeCatEx = 'all';
  const s = document.getElementById('ts-search'); if (s) s.value = '';
  const selects = ['ef-subject','ef-grade','ef-category'];
  selects.forEach(id => { const el = document.getElementById(id); if (el) el.value = 'all'; });
  applyFilters();
}

function goToToolsWithFilter(type, value) {
  activeSubject = 'all'; activeGrade = 'all'; activeCatEx = 'all';
  if (type === 'subject') activeSubject = value;
  else if (type === 'grade') {
    if (/^EI$/i.test(value)) activeGrade = 'EI';
    else if (/^EM$/i.test(value)) activeGrade = 'EM';
    else { const m = value.match(/^(\d)/); if (m) activeGrade = m[1]; }
  }
  else if (type === 'cat') activeCatEx = value;
  closeModal();
  showPage('tools');
}
