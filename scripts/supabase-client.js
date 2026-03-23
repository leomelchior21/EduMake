// ── SUPABASE CONFIG ──────────────────────────────────────────
// ⚠️  Substitua pelos valores do seu projeto em supabase.com
const SUPABASE_URL  = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON = 'SUA_ANON_KEY';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
let _sbUser = null;

// ── AUTH STATE ────────────────────────────────────────────────
_sb.auth.onAuthStateChange((event, session) => {
  _sbUser = session?.user ?? null;
  _updateAuthUI();
  if (event === 'SIGNED_IN') closeAuthModal();
  _rankCache = null; // invalidate rankings cache on auth change
});

(async () => {
  const { data } = await _sb.auth.getSession();
  _sbUser = data.session?.user ?? null;
  _updateAuthUI();
  renderRankingWidget('ranking-home');
})();

// ── NAV / AUTH UI ─────────────────────────────────────────────
function _updateAuthUI() {
  const loggedIn = !!_sbUser;
  document.getElementById('nav-login-btn')?.classList.toggle('hidden', loggedIn);
  document.getElementById('nav-user-wrap')?.classList.toggle('hidden', !loggedIn);
  const lbl = document.getElementById('nav-user-label');
  if (lbl && _sbUser) {
    const name = _sbUser.user_metadata?.name || _sbUser.email?.split('@')[0] || 'Professor';
    lbl.textContent = name.length > 16 ? name.slice(0, 16) + '…' : name;
  }
}

function toggleUserMenu() {
  document.getElementById('nav-user-dd')?.classList.toggle('hidden');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#nav-user-wrap')) {
    document.getElementById('nav-user-dd')?.classList.add('hidden');
  }
});

// ── AUTH MODAL ────────────────────────────────────────────────
function openAuthModal(tab = 'login') {
  document.getElementById('auth-overlay').classList.remove('hidden');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('auth-overlay')?.classList.add('hidden');
  document.getElementById('auth-err').textContent = '';
}

function switchAuthTab(t) {
  ['login', 'signup'].forEach(k => {
    document.getElementById(`auth-tab-${k}`)?.classList.toggle('active', k === t);
    document.getElementById(`auth-pnl-${k}`)?.classList.toggle('hidden', k !== t);
  });
  document.getElementById('auth-err').textContent = '';
}

async function authLogin() {
  const email = document.getElementById('auth-login-email').value.trim();
  const pass  = document.getElementById('auth-login-pass').value;
  const btn   = document.getElementById('auth-login-btn');
  const errEl = document.getElementById('auth-err');
  btn.disabled = true; btn.textContent = 'Entrando…';
  const { error } = await _sb.auth.signInWithPassword({ email, password: pass });
  btn.disabled = false; btn.textContent = 'Entrar';
  if (error) { errEl.textContent = _authErrPt(error.message); errEl.style.color = '#f87171'; }
}

async function authSignup() {
  const name  = document.getElementById('auth-su-name').value.trim();
  const email = document.getElementById('auth-su-email').value.trim();
  const pass  = document.getElementById('auth-su-pass').value;
  const btn   = document.getElementById('auth-signup-btn');
  const errEl = document.getElementById('auth-err');
  btn.disabled = true; btn.textContent = 'Criando conta…';
  const { error } = await _sb.auth.signUp({ email, password: pass, options: { data: { name } } });
  btn.disabled = false; btn.textContent = 'Criar conta';
  if (error) {
    errEl.textContent = _authErrPt(error.message); errEl.style.color = '#f87171';
  } else {
    errEl.textContent = '✓ Conta criada! Verifique seu e-mail para confirmar.';
    errEl.style.color = '#4ade80';
  }
}

async function authSignOut() {
  await _sb.auth.signOut();
  _sbUser = null;
  _updateAuthUI();
  document.getElementById('nav-user-dd')?.classList.add('hidden');
  if (typeof showNotif === 'function') showNotif('Até logo! 👋');
}

function _authErrPt(msg) {
  if (msg.includes('Invalid login')) return 'E-mail ou senha incorretos.';
  if (msg.includes('already registered')) return 'Este e-mail já tem uma conta.';
  if (msg.includes('Password should be')) return 'Senha deve ter ao menos 6 caracteres.';
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.';
  return msg;
}

// ── SAVE PLAN ─────────────────────────────────────────────────
async function savePlan(idea, deep, bnccCode = '') {
  if (!_sbUser) { openAuthModal('login'); return; }
  const btn = document.getElementById('deep-save-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando…'; }
  const { error } = await _sb.from('plans').insert({
    user_id:        _sbUser.id,
    title:          idea.title,
    tool:           idea.tool,
    tool_emoji:     idea.tool_emoji || '🔧',
    bncc_code:      bnccCode || '',
    idea_json:      idea,
    deepening_json: deep,
  });
  if (btn) { btn.disabled = false; }
  if (error) {
    if (typeof showNotif === 'function') showNotif('Erro ao salvar: ' + error.message);
  } else {
    if (btn) { btn.textContent = '✓ Salvo!'; btn.classList.add('saved'); }
    if (typeof showNotif === 'function') showNotif('✓ Plano salvo com sucesso!');
  }
}

// ── MY PLANS ──────────────────────────────────────────────────
let _plansData = [];

async function openPlansModal() {
  if (!_sbUser) { openAuthModal('login'); return; }
  document.getElementById('nav-user-dd')?.classList.add('hidden');
  document.getElementById('plans-overlay').classList.remove('hidden');
  const body = document.getElementById('plans-body');
  body.innerHTML = '<div class="plans-loading">Carregando seus planos…</div>';

  const { data, error } = await _sb.from('plans')
    .select('id,title,tool,tool_emoji,bncc_code,saved_at')
    .eq('user_id', _sbUser.id)
    .order('saved_at', { ascending: false });

  if (error || !data?.length) {
    body.innerHTML = '<p class="plans-empty">Você ainda não salvou nenhum plano.<br>Gere uma aula e clique em <strong>Salvar plano</strong>!</p>';
    return;
  }
  _plansData = data;
  body.innerHTML = data.map(p => `
    <div class="plan-card" id="plancard-${p.id}">
      <div class="plan-card-top">
        ${p.bncc_code ? `<span class="plan-bncc-chip">${p.bncc_code}</span>` : ''}
        <span class="plan-date">${new Date(p.saved_at).toLocaleDateString('pt-BR')}</span>
      </div>
      <div class="plan-card-body">
        <span class="plan-emoji">${p.tool_emoji || '🔧'}</span>
        <div class="plan-info">
          <div class="plan-title">${esc(p.title)}</div>
          <div class="plan-tool">${esc(p.tool || '')}</div>
        </div>
      </div>
      <div class="plan-card-actions">
        <button class="plan-open-btn" onclick="reopenPlan('${p.id}')">Abrir plano →</button>
        <button class="plan-del-btn" onclick="deletePlanUI('${p.id}')">🗑</button>
      </div>
    </div>`).join('');
}

function closePlansModal() {
  document.getElementById('plans-overlay')?.classList.add('hidden');
}

async function reopenPlan(id) {
  const btn = document.querySelector(`#plancard-${id} .plan-open-btn`);
  if (btn) { btn.textContent = 'Abrindo…'; btn.disabled = true; }
  const { data, error } = await _sb.from('plans')
    .select('idea_json,deepening_json,bncc_code')
    .eq('id', id).single();
  if (error || !data) {
    if (typeof showNotif === 'function') showNotif('Erro ao abrir plano.');
    if (btn) { btn.textContent = 'Abrir plano →'; btn.disabled = false; }
    return;
  }
  closePlansModal();
  // Store globals and navigate
  window.currentDeepeningIdea = data.idea_json;
  window.currentDeepeningDeep = data.deepening_json;
  const cont = document.getElementById('deep-page-cont');
  showPage('deep');
  if (typeof renderDeepening === 'function') {
    renderDeepening(data.idea_json, data.deepening_json, {
      targetEl:  cont,
      backFn:    "showPage('home')",
      backLabel: '← Início',
      bnccCode:  data.bncc_code || '',
    });
  }
}

async function deletePlanUI(id) {
  const card = document.getElementById('plancard-' + id);
  if (!card) return;
  card.style.opacity = '.4';
  const { error } = await _sb.from('plans').delete().eq('id', id).eq('user_id', _sbUser.id);
  if (error) { card.style.opacity = '1'; if (typeof showNotif === 'function') showNotif('Erro ao excluir.'); }
  else { card.remove(); if (typeof showNotif === 'function') showNotif('Plano excluído.'); }
}

// ── TOOL TRACKING ─────────────────────────────────────────────
async function trackTool(toolName) {
  if (!toolName) return;
  try { await _sb.rpc('increment_tool_count', { p_tool_name: toolName }); } catch (_) {}
}

// ── RANKINGS ──────────────────────────────────────────────────
let _rankCache = null;
let _rankCacheTs = 0;

async function fetchTopTools(limit = 6) {
  const now = Date.now();
  if (_rankCache && now - _rankCacheTs < 60000) return _rankCache;
  const { data } = await _sb.from('tool_rankings')
    .select('tool_name,use_count')
    .order('use_count', { ascending: false })
    .limit(limit);
  _rankCache = data || [];
  _rankCacheTs = now;
  return _rankCache;
}

async function renderRankingWidget(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const tools = await fetchTopTools(6);
  if (!tools.length) { el.innerHTML = ''; return; }
  const maxCount = tools[0].use_count || 1;
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = `
    <div class="rank-inner">
      <div class="rank-lbl">🔥 Ferramentas em alta na EduMake</div>
      <div class="rank-list">
        ${tools.map((t, i) => `
          <div class="rank-item">
            <span class="rank-pos">${medals[i] || i + 1}</span>
            <span class="rank-name">${esc(t.tool_name)}</span>
            <div class="rank-bar-wrap"><div class="rank-bar" style="width:${Math.round(t.use_count / maxCount * 100)}%"></div></div>
            <span class="rank-count">${t.use_count}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
