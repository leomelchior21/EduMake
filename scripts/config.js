const DEEPSEEK_KEY = 'sk-3866cbd27cd0431da743a89a8cc7adc6';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

// ── TOOL DEFINITIONS (just-in-time retrieval) ──────────────
const TOOL_DEFS = [{
  type: 'function',
  function: {
    name: 'search_tools',
    description: 'Busca no catálogo de ferramentas EdTech. Chame SEMPRE antes de responder.',
    parameters: {
      type: 'object',
      properties: {
        subject: { type: 'string', description: 'Disciplina: Matemática, Ciências, Português, Artes, Geografia, História, Línguas, Tecnologia, Educação Infantil, Interdisciplinar' },
        grade: { type: 'string', description: 'Série/nível: EI (educação infantil), 1-5 (anos iniciais), 6-9 (anos finais), EM (ensino médio), ou número específico' },
        category: { type: 'string', description: 'Categoria: Gamificação, Simulação, Coding, Maker, AI, Colaboração, Design, Mídia, Dados, Plataforma, Línguas, AR, VR, Avaliação, Leitura, Interação' },
        keyword: { type: 'string', description: 'Palavra-chave sobre o tema, método ou ferramenta' },
        limit: { type: 'number', description: 'Máximo de resultados (padrão 10, máximo 15)' }
      }
    }
  }
}];

const BNCC_MAP = {
  'EF08CI01':'Investigação em ciências naturais — 8º ano',
  'EF07CI05':'Tecnologia e recursos naturais — 7º ano',
  'EM13CNT301':'Modelagem científica e tecnológica — EM',
  'EF06MA05':'Lógica e pensamento computacional — 6º ano',
  'EF02MA03':'Lógica e sequências — 2º ano',
  'EM13MAT401':'Análise de dados e modelagem — EM',
  'EF09CI06':'Tecnologia e inovação — 9º ano',
  'EM13CNT303':'Programação e inovação digital — EM',
  'EF69LP07':'Produção de textos digitais — EF',
  'EF69LP08':'Oralidade e apresentação — EF',
  'EF69AR05':'Artes visuais e design — EF',
  'EF69AR35':'Produção com linguagens digitais — EF',
  'EM13AR02':'Criação artística com tecnologia — EM',
  'EF69LP30':'Letramento digital — EF',
  'EM13LGG303':'Linguagem e tecnologias digitais — EM',
  'EM13LGG703':'Competências digitais — EM',
  'EF69LP11':'Colaboração digital — EF',
  'EF69LP21':'Debate e argumentação — EF',
  'EM13MAT302':'Modelagem matemática — EM',
  'EM13LGG101':'Leitura crítica — EM',
  'EM13LGG401':'Língua estrangeira — EM',
  'EF06LI01':'Língua inglesa — 6º ano',
  'EM13LGG701':'Pesquisa científica — EM',
  'EM13CNT306':'Sustentabilidade — EM',
  'EF08CI07':'Biologia humana e saúde — 8º ano',
  'EF01LP01':'Linguagem oral e escrita — 1º ano',
  'EF01LP03':'Consciência fonológica — 1º ano',
  'EF01MA01':'Números naturais — 1º ano',
  'DCNEI':'Diretrizes Curriculares da Educação Infantil',
  'EM13CHS301':'Educação financeira — EM',
  'EF09LP35':'Língua de sinais — EF'
};

const TIPS_MAP = {
  Coding:['Inicie com projeto simples que resolva problema real da turma.','Use programação em par — acelera e aprofunda o aprendizado.','Reserve 10 min finais para apresentação e feedback.','Trate bugs como oportunidade de aprendizado.'],
  AI:['Discuta criticamente como a tecnologia funciona e seus vieses.','Peça que alunos verifiquem resultados com fontes confiáveis.','Use para gerar rascunhos que a turma irá refinar.','Crie com os alunos um protocolo de uso responsável.'],
  Gamif:['Use no início ou fim como revisão dinâmica.','Crie equipes para estimular colaboração.','Exiba ranking em tempo real para engajar.','Personalize perguntas com o conteúdo da semana.'],
  Simul:['Peça hipóteses antes da simulação.','Registre resultados em tabela para análise.','Compare com experimentos físicos quando possível.','Use como ponto de partida para debate.'],
  Design:['Apresente referências visuais antes de pedir criação.','Proponha restrições criativas (paleta, tamanho, mensagem).','Faça sessões de critique ao estilo design.','Conecte o projeto a problema real da escola.'],
  Dados:['Inicie com pergunta investigativa que os dados irão responder.','Ensine a questionar a origem dos dados.','Conecte os dados a situações reais dos alunos.','Crie visualizações para comunicar resultados.'],
  Mídia:['Analise referências do gênero antes de produzir.','Defina critérios claros: roteiro, qualidade, conteúdo.','Crie momento de "estreia" para projetos finais.','Discuta direitos autorais e Creative Commons.'],
  Maker:['Comece com protótipo simples antes do projeto final.','Documente o processo com fotos para reflexão.','Conecte ao problema real da comunidade escolar.','Estimule iteração — errar e melhorar é parte do processo.']
};

const INTER = [
  {sub:'Matemática',ico:'📐'},
  {sub:'Língua Portuguesa',ico:'📝'},
  {sub:'Ciências',ico:'🔬'},
  {sub:'Geografia',ico:'🌍'},
  {sub:'História',ico:'📜'},
  {sub:'Artes',ico:'🎨'},
  {sub:'Ed. Física',ico:'🏃'}
];

function gc(c) {
  const m = {
    Coding:'#6366f1',AI:'#8b5cf6','Gamificação':'#f59e0b',Gamification:'#f59e0b',
    'Simulação':'#06b6d4',Maker:'#10b981',Design:'#ec4899','Design 3D':'#f97316',
    Dados:'#3b82f6','Mídia':'#e11d48',Media:'#e11d48','Colaboração':'#0ea5e9',
    AR:'#8b5cf6',VR:'#7c3aed','Línguas':'#14b8a6',Leitura:'#84cc16',
    'Organização':'#6b7280',Plataforma:'#60a5fa','Interação':'#f472b6',
    Pesquisa:'#a78bfa','Avaliação':'#f59e0b','Música':'#ec4899',
    'Automação':'#64748b','No-Code':'#06b6d4',Diagramas:'#94a3b8',
    GameDev:'#f97316','Game Design':'#f97316',Lousa:'#10b981',
    'Edição':'#e11d48','Apresentação':'#f59e0b','Cálculo':'#3b82f6'
  };
  return m[c] || '#7c6ff7';
}

function ge(c) {
  const m = {
    Coding:'👾',AI:'🤖','Gamificação':'🎮',Gamification:'🎮','Simulação':'🧪',
    Maker:'🔧',Design:'🎨','Design 3D':'🧊',Dados:'📊','Mídia':'🎬',
    Media:'🎬','Colaboração':'🤝',AR:'🥽',VR:'🌐','Línguas':'🌐',
    Leitura:'📖','Organização':'📋',Plataforma:'🖥','Interação':'⚡',
    Pesquisa:'🔍','Avaliação':'📝','Música':'🎵','Automação':'⚙️',
    'No-Code':'🔮',Diagramas:'📐',GameDev:'🕹','Game Design':'🕹',
    Lousa:'✏️','Edição':'✂️','Apresentação':'📊','Cálculo':'🧮'
  };
  return m[c] || '📌';
}
