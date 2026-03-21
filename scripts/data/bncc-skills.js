const BNCC_SKILLS = [
  // EDUCAÇÃO INFANTIL
  {code:'EI03CO01',eixo:'pc',nivel:'EI',grade:'Educação Infantil',age:'3–5 anos',tema:'Algoritmos',
   title:'Reconhecer padrão de repetição em sequência de sons, movimentos, desenhos.',
   desc:'A criança aprende a identificar o que se repete numa sequência — base para loops e algoritmos.',
   ex:['Pattern Shapes','Chicken Dance (PBS Kids)','ScratchJr']},
  {code:'EI03CO03',eixo:'pc',nivel:'EI',grade:'Educação Infantil',age:'3–5 anos',tema:'Algoritmos',
   title:'Experienciar a execução de algoritmos brincando com objetos desplugados.',
   desc:'Percursos no chão, dobraduras e sequências corporais ensinam lógica sem tela.',
   ex:['Bee-Bot','Cubetto','LightBot Jr']},
  {code:'EI03CO07',eixo:'md',nivel:'EI',grade:'Educação Infantil',age:'3–5 anos',tema:'Hardware',
   title:'Reconhecer dispositivos eletrônicos, identificando quando estão ligados ou desligados.',
   desc:'Noção de estado binário (ligado/desligado) e exploração segura de aparelhos do cotidiano.',
   ex:['Osmo','PBS Kids','Toca Boca']},
  {code:'EI03CO10',eixo:'cd',nivel:'EI',grade:'Educação Infantil',age:'3–5 anos',tema:'Cidadania Digital',
   title:'Utilizar tecnologia digital de maneira segura, consciente e respeitosa.',
   desc:'Primeiros passos de cidadania digital, tempo de tela saudável e navegação segura.',
   ex:['Be Internet Awesome','PBS Kids','Interland']},

  // 1º ANO
  {code:'EF01CO01',eixo:'pc',nivel:'EF1',grade:'1º Ano',age:'6–7 anos',tema:'Organização',
   title:'Organizar objetos físicos ou digitais considerando diferentes características, explicitando semelhanças e diferenças.',
   desc:'Base de estruturas de dados: classificar e agrupar é o primeiro passo para pensar como programador.',
   ex:['Khan Academy Kids','ScratchJr','Google AutoDraw']},
  {code:'EF01CO02',eixo:'pc',nivel:'EF1',grade:'1º Ano',age:'6–7 anos',tema:'Algoritmos',
   title:'Identificar e seguir sequências de passos aplicados no dia a dia para resolver problemas.',
   desc:'Receitas, rotinas e instruções simples como algoritmos concretos e observáveis.',
   ex:['Code.org (K-5)','LightBot','Bee-Bot']},
  {code:'EF01CO04',eixo:'md',nivel:'EF1',grade:'1º Ano',age:'6–7 anos',tema:'Dados',
   title:'Reconhecer o que é a informação, que ela pode ser armazenada e transmitida por diversos meios.',
   desc:'Conceito de informação: um mesmo dado pode ser representado como imagem, som ou texto.',
   ex:['Book Creator','ScratchJr','Nearpod (Primário)']},

  // 2º ANO
  {code:'EF02CO01',eixo:'pc',nivel:'EF1',grade:'2º Ano',age:'7–8 anos',tema:'Modelagem',
   title:'Criar e comparar modelos de objetos, identificando padrões e atributos essenciais.',
   desc:'Abstração básica: identificar o que é essencial num objeto e representá-lo.',
   ex:['Tynker Jr','Kodable','Math Playground']},
  {code:'EF02CO02',eixo:'pc',nivel:'EF1',grade:'2º Ano',age:'7–8 anos',tema:'Algoritmos',
   title:'Criar e simular algoritmos com sequências e repetições simples (iterações definidas).',
   desc:'Primeiros loops! O aluno cria instruções que se repetem um número fixo de vezes.',
   ex:['ScratchJr','Code.org','LightBot']},
  {code:'EF02CO04',eixo:'md',nivel:'EF1',grade:'2º Ano',age:'7–8 anos',tema:'Hardware/Software',
   title:'Diferenciar componentes físicos (hardware) e programas que fornecem instruções (software).',
   desc:'A distinção fundamental: o que se toca (hardware) vs. o que instrui (software).',
   ex:['Khan Academy Kids','BrainPOP Jr','ClassDojo']},

  // 3º ANO
  {code:'EF03CO01',eixo:'pc',nivel:'EF1',grade:'3º Ano',age:'8–9 anos',tema:'Lógica',
   title:'Associar os valores "verdadeiro" e "falso" a sentenças lógicas do dia a dia.',
   desc:'Lógica booleana no cotidiano: perguntas com resposta V/F são a base do pensamento computacional.',
   ex:['Scratch','Wordwall','Code.org']},
  {code:'EF03CO02',eixo:'pc',nivel:'EF1',grade:'3º Ano',age:'8–9 anos',tema:'Algoritmos',
   title:'Criar algoritmos com sequências e repetições com condição (iterações indefinidas).',
   desc:'"Enquanto não chegar, continue andando" — loops condicionais com linguagem natural.',
   ex:['Scratch','LightBot','Tynker Jr']},
  {code:'EF03CO03',eixo:'pc',nivel:'EF1',grade:'3º Ano',age:'8–9 anos',tema:'Decomposição',
   title:'Aplicar a estratégia de decomposição para resolver problemas complexos.',
   desc:'Dividir para conquistar: quebrar um problema grande em partes menores e resolvê-las.',
   ex:['Scratch','Code.org','Khan Academy Kids']},
  {code:'EF03CO07',eixo:'cd',nivel:'EF1',grade:'3º Ano',age:'8–9 anos',tema:'Pesquisa',
   title:'Utilizar diferentes navegadores e ferramentas de busca para pesquisar informações.',
   desc:'Literacia digital: filtros de busca, palavras-chave, fontes confiáveis.',
   ex:['Google','DuckDuckGo Kids','Common Sense Media']},

  // 4º ANO
  {code:'EF04CO01',eixo:'pc',nivel:'EF1',grade:'4º Ano',age:'9–10 anos',tema:'Estruturas de Dados',
   title:'Reconhecer objetos que podem ser representados por matrizes com coordenadas.',
   desc:'Planilhas, tabuleiros e imagens como matrizes — posição (linha, coluna) como dado.',
   ex:['Google Sheets','Scratch','GeoGebra']},
  {code:'EF04CO03',eixo:'pc',nivel:'EF1',grade:'4º Ano',age:'9–10 anos',tema:'Algoritmos',
   title:'Criar algoritmos com repetições simples e aninhadas (iterações definidas e indefinidas).',
   desc:'Loops dentro de loops: lavar 20 janelas em 10 andares — algoritmo aninhado.',
   ex:['Scratch','Code.org','Blockly']},
  {code:'EF04CO05',eixo:'md',nivel:'EF1',grade:'4º Ano',age:'9–10 anos',tema:'Dados',
   title:'Codificar informações para representação em computador (binária, ASCII, RGB).',
   desc:'Letras viram números, imagens viram pixels — a linguagem que o computador entende.',
   ex:['CS Unplugged','Scratch','Khan Academy']},

  // 5º ANO
  {code:'EF05CO01',eixo:'pc',nivel:'EF1',grade:'5º Ano',age:'10–11 anos',tema:'Estruturas de Dados',
   title:'Reconhecer objetos que podem ser representados por listas.',
   desc:'Filas, pilhas e listas: estruturas dinâmicas que organizam informação de forma sequencial.',
   ex:['Scratch','Snap!','Code.org']},
  {code:'EF05CO03',eixo:'pc',nivel:'EF1',grade:'5º Ano',age:'10–11 anos',tema:'Lógica',
   title:'Realizar operações de negação, conjunção e disjunção sobre sentenças lógicas.',
   desc:'NÃO, E, OU — os três operadores lógicos que controlam qualquer decisão computacional.',
   ex:['Scratch','Khan Academy','Code.org']},
  {code:'EF05CO04',eixo:'pc',nivel:'EF1',grade:'5º Ano',age:'10–11 anos',tema:'Algoritmos',
   title:'Criar algoritmos que incluam sequências, repetições e seleções condicionais.',
   desc:'SE / ENQUANTO / PARA — o aluno agora programa com as três estruturas fundamentais.',
   ex:['Scratch','Tynker','Code.org']},
  {code:'EF05CO08',eixo:'cd',nivel:'EF1',grade:'5º Ano',age:'10–11 anos',tema:'Cidadania Digital',
   title:'Acessar informações na Internet de forma crítica para distinguir conteúdos confiáveis.',
   desc:'Fake news, fontes primárias e checagem de fatos — letramento informacional digital.',
   ex:['Newsela','Common Sense Media','ReadWorks']},

  // 6º ANO
  {code:'EF06CO01',eixo:'pc',nivel:'EF2',grade:'6º Ano',age:'11–12 anos',tema:'Programação',
   title:'Classificar informações, agrupando-as em coleções e associando cada coleção a um tipo de dado.',
   desc:'Inteiros, reais, strings e booleanos — o aluno começa a pensar em tipos ao programar.',
   ex:['Scratch','Code.org','Blockly']},
  {code:'EF06CO02',eixo:'pc',nivel:'EF2',grade:'6º Ano',age:'11–12 anos',tema:'Programação',
   title:'Elaborar algoritmos com instruções sequenciais, de repetição e de seleção usando linguagem de programação.',
   desc:'Do pseudocódigo à linguagem real: o aluno transcreve sua lógica em código.',
   ex:['Scratch','Snap!','Code.org']},
  {code:'EF06CO07',eixo:'md',nivel:'EF2',grade:'6º Ano',age:'11–12 anos',tema:'Redes',
   title:'Entender como a informação é quebrada em pedaços, transmitida em pacotes e reconstruída.',
   desc:'O caminho de um e-mail: pacotes, roteadores e protocolos de forma concreta.',
   ex:['CS Unplugged','CK-12','BrainPOP']},
  {code:'EF06CO09',eixo:'cd',nivel:'EF2',grade:'6º Ano',age:'11–12 anos',tema:'Cidadania Digital',
   title:'Apresentar conduta e linguagem apropriadas ao se comunicar em ambiente digital.',
   desc:'Netiqueta, empatia online e responsabilidade em redes sociais e grupos de mensagem.',
   ex:['Common Sense Media','Digital Compass','iCivics']},

  // 7º ANO
  {code:'EF07CO01',eixo:'pc',nivel:'EF2',grade:'7º Ano',age:'12–13 anos',tema:'Programação',
   title:'Criar soluções usando registros e matrizes unidimensionais e automatizá-las.',
   desc:'Vetores e registros: organizar cadastros, placar de jogos, dados tabulares em código.',
   ex:['Scratch','Python (Replit)','Snap!']},
  {code:'EF07CO05',eixo:'pc',nivel:'EF2',grade:'7º Ano',age:'12–13 anos',tema:'Decomposição',
   title:'Criar algoritmos usando decomposição e reúso de forma colaborativa.',
   desc:'Funções e módulos: reutilizar soluções de um problema em outro de forma colaborativa.',
   ex:['Scratch','Tynker','Replit']},
  {code:'EF07CO07',eixo:'md',nivel:'EF2',grade:'7º Ano',age:'12–13 anos',tema:'Segurança',
   title:'Identificar problemas de segurança cibernética e experimentar formas de proteção.',
   desc:'Senhas fortes, phishing, malware — o aluno aprende a se proteger no ambiente digital.',
   ex:['Common Sense Media','Google Interland','Be Internet Awesome']},
  {code:'EF07CO09',eixo:'cd',nivel:'EF2',grade:'7º Ano',age:'12–13 anos',tema:'Cidadania Digital',
   title:'Reconhecer e debater sobre cyberbullying.',
   desc:'Definição, impactos e estratégias de combate ao cyberbullying com estudos de caso.',
   ex:['Digital Compass','Common Sense Media','Kialo EDU']},

  // 8º ANO
  {code:'EF08CO01',eixo:'pc',nivel:'EF2',grade:'8º Ano',age:'13–14 anos',tema:'Programação',
   title:'Construir soluções usando a técnica de recursão e automatizá-las.',
   desc:'Recursão: funções que chamam a si mesmas. Fatorial, Fibonacci, busca em árvore.',
   ex:['Python (Replit)','Scratch','Khan Academy']},
  {code:'EF08CO03',eixo:'pc',nivel:'EF2',grade:'8º Ano',age:'13–14 anos',tema:'Algoritmos',
   title:'Utilizar algoritmos clássicos de manipulação sobre listas.',
   desc:'Bubble Sort, Merge Sort, busca binária — os algoritmos que toda aplicação real usa.',
   ex:['Replit','VisuAlgo','Khan Academy']},
  {code:'EF08CO05',eixo:'md',nivel:'EF2',grade:'8º Ano',age:'13–14 anos',tema:'Sistemas Distribuídos',
   title:'Compreender os conceitos de paralelismo, concorrência e armazenamento distribuído.',
   desc:'Por que apps rodam mais rápido com múltiplos núcleos? Computação em nuvem e paralela.',
   ex:['Replit','Google Colab','Khan Academy']},
  {code:'EF08CO07',eixo:'cd',nivel:'EF2',grade:'8º Ano',age:'13–14 anos',tema:'Redes Sociais',
   title:'Compartilhar informações por meio de redes sociais de forma responsável e avaliando sua confiabilidade.',
   desc:'Algoritmos de recomendação, bolhas de filtro e responsabilidade no compartilhamento.',
   ex:['Common Sense Media','Kialo EDU','Digital Compass']},

  // 9º ANO
  {code:'EF09CO01',eixo:'pc',nivel:'EF2',grade:'9º Ano',age:'14–15 anos',tema:'Programação',
   title:'Criar soluções usando árvores e grafos para descrever informações.',
   desc:'Grafos modelam mapas, redes sociais e rotas — estruturas fundamentais da computação.',
   ex:['Replit','Python','Khan Academy']},
  {code:'EF09CO03',eixo:'pc',nivel:'EF2',grade:'9º Ano',age:'14–15 anos',tema:'Programação',
   title:'Usar autômatos para descrever comportamentos e automatizá-los com linguagem baseada em eventos.',
   desc:'Máquinas de estado: interfaces, robótica e sistemas que reagem a eventos externos.',
   ex:['MIT App Inventor','Scratch','micro:bit MakeCode']},
  {code:'EF09CO04',eixo:'md',nivel:'EF2',grade:'9º Ano',age:'14–15 anos',tema:'Segurança',
   title:'Compreender o funcionamento de malwares e outros ataques cibernéticos.',
   desc:'Vírus, ransomware, phishing e engenharia social — como os ataques funcionam e como se defender.',
   ex:['Common Sense Media','CyberDefenders','Cybersecurity Lab PBS']},
  {code:'EF09CO05',eixo:'md',nivel:'EF2',grade:'9º Ano',age:'14–15 anos',tema:'Segurança',
   title:'Analisar técnicas de criptografia para armazenamento e transmissão de dados.',
   desc:'Cifra de César, chave pública/privada, HTTPS — a matemática que protege seus dados.',
   ex:['Crypto Club','Khan Academy','CryptoHack']},

  // ENSINO MÉDIO
  {code:'EM13CO01',eixo:'pc',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Algoritmos',
   title:'Explorar e construir soluções por meio da reutilização de partes de soluções existentes.',
   desc:'Bibliotecas, APIs e código aberto: o desenvolvedor profissional não reinventa a roda.',
   ex:['GitHub','Replit','Python']},
  {code:'EM13CO03',eixo:'pc',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Algoritmos',
   title:'Identificar o comportamento dos algoritmos quanto a consumo de recursos.',
   desc:'Complexidade O(n), O(n²), O(log n) — por que alguns programas travam e outros não.',
   ex:['VisuAlgo','Khan Academy','Replit']},
  {code:'EM13CO10',eixo:'md',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Inteligência Artificial',
   title:'Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana.',
   desc:'ML, redes neurais, vieses algorítmicos e impactos éticos da IA na sociedade.',
   ex:['Teachable Machine','Elements of AI','Machine Learning for Kids']},
  {code:'EM13CO11',eixo:'md',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Modelagem',
   title:'Criar e explorar modelos computacionais simples para simular e fazer previsões.',
   desc:'Simulações de epidemias, crescimento populacional, consumo energético — ciência com código.',
   ex:['NetLogo','GeoGebra','Python (Colab)']},
  {code:'EM13CO12',eixo:'md',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Dados',
   title:'Produzir, analisar e compartilhar informações a partir de dados, utilizando princípios de ciência de dados.',
   desc:'Pandas, visualizações e storytelling com dados reais de saúde, clima e economia.',
   ex:['Google Colab','Tableau Public','Kaggle']},
  {code:'EM13CO16',eixo:'md',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Robótica',
   title:'Desenvolver projetos com robótica, utilizando artefatos físicos ou simuladores.',
   desc:'Arduino, micro:bit, Raspberry Pi — projetos que unem software e hardware.',
   ex:['Arduino','micro:bit MakeCode','Tinkercad']},
  {code:'EM13CO23',eixo:'cd',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Cidadania Digital',
   title:'Analisar criticamente as experiências em comunidades virtuais e seus impactos.',
   desc:'Bolhas de filtro, desinformação, ativismo digital e comunidades online.',
   ex:['Common Sense Media','Kialo EDU','Our World in Data']},
  {code:'EM13CO26',eixo:'cd',nivel:'EM',grade:'Ensino Médio',age:'15–18 anos',tema:'Direito Digital',
   title:'Aplicar os conceitos de direito digital na conduta e produção de artefatos.',
   desc:'LGPD, direitos autorais, licenças Creative Commons e Marco Civil da Internet.',
   ex:['Creative Commons','LGPD Fácil','Internet Archive']},
];

const BNCC_RES = {
  // === EDUCAÇÃO INFANTIL ===
  'EI03CO01': {
    tools:[
      {name:'ScratchJr',cat:'Programação Visual',icon:'💻',url:'https://scratchjr.org',
       how:'Peça às crianças que criem uma sequência de 3 blocos que se repita. Ex: <strong>pular → girar → mover</strong>. Mostre que o botão de repetição (loop) é como o padrão que elas identificaram.'},
      {name:'Pattern Shapes',cat:'Matemática Visual',icon:'🔷',url:'https://apps.mathlearningcenter.org/pattern-shapes',
       how:'Use as peças coloridas para criar uma sequência AB (vermelho-azul) e pergunte: <strong>"O que vem depois?"</strong>. Depois passe para ABC.'},
      {name:'Canva (Kids)',cat:'Design',icon:'🎨',url:'https://canva.com',
       how:'Crie cartões com formas para que as crianças montem <strong>sequências no quadro</strong>, explicando o padrão oralmente.'}
    ],
    games:[
      {name:'Chicken Dance (PBS)',cat:'Jogo Online',icon:'🐔',url:'https://pbskids.org',
       how:'Jogue junto com a turma no projetor. A cada rodada, pergunte: <strong>"Qual foi o padrão de movimentos?"</strong>'},
      {name:'Lightbot Jr',cat:'Puzzle',icon:'🤖',url:'https://lightbot.com',
       how:'Ative os primeiros 3 níveis. Mostre que a sequência de comandos <strong>é um algoritmo</strong>.'},
      {name:'Shape Patterns (Topmarks)',cat:'Jogo Online',icon:'⭐',url:'https://topmarks.co.uk',
       how:'Complete as sequências de figuras. <strong>Antes de clicar, o aluno fala a resposta</strong> — reforça a antecipação de padrões.'}
    ]
  },
  'EI03CO03': {
    tools:[
      {name:'Bee-Bot',cat:'Robótica Educacional',icon:'🐝',url:'https://bee-bot.us',
       how:'Crie um tapete com figuras no chão. O aluno programa o Bee-Bot apertando <strong>↑ ↑ → ↑</strong> antes de ligar — planejamento antes da execução.'},
      {name:'Cubetto',cat:'Robótica Tátil',icon:'🟦',url:'https://primotoys.com',
       how:'Sem tela! A criança coloca blocos físicos numa placa para <strong>criar o algoritmo</strong>. Ótimo para 3-4 anos.'},
      {name:'ScratchJr',cat:'Programação',icon:'💻',url:'https://scratchjr.org',
       how:'Crie um personagem que <strong>siga um labirinto simples</strong>. A criança define a sequência de blocos.'}
    ],
    games:[
      {name:'Follow the Code (Math Playground)',cat:'Jogo Online',icon:'🎯',url:'https://mathplayground.com',
       how:'O jogo pede que o aluno <strong>execute a sequência</strong> mostrada. Ótimo para decodificar um algoritmo dado.'},
      {name:'LightBot Jr',cat:'Puzzle',icon:'🤖',url:'https://lightbot.com',
       how:'Versão simplificada para até 5 anos. <strong>3 níveis iniciais</strong> introduzem sequência sem complexidade.'},
      {name:'Code.org (Curso A)',cat:'Plataforma',icon:'📚',url:'https://studio.code.org/s/coursea',
       how:'Atividades desplugadas e plugadas. <strong>Lição 1-3</strong> são ideais para Educação Infantil.'}
    ]
  },
  'EF01CO02': {
    tools:[
      {name:'Code.org (K-5)',cat:'Programação',icon:'💻',url:'https://code.org',
       how:'Use o <strong>Curso B, Lição 2</strong>: o aluno deve ordenar cartões de sequência antes de executar.'},
      {name:'ScratchJr',cat:'Programação Visual',icon:'🐱',url:'https://scratchjr.org',
       how:'Crie a atividade: <strong>"Como o gato vai até o peixe?"</strong>. O aluno arranja os blocos na ordem certa.'},
      {name:'Nearpod',cat:'Aula Interativa',icon:'📡',url:'https://nearpod.com',
       how:'Crie um slide com imagens embaralhadas de uma rotina. Alunos arrastam para ordenar <strong>em tempo real</strong>.'}
    ],
    games:[
      {name:'LightBot',cat:'Puzzle',icon:'🤖',url:'https://lightbot.com',
       how:'Fase 1 é perfeita: o robô só se move se a <strong>sequência estiver correta</strong>. Erro imediato = aprendizagem.'},
      {name:'Kodable',cat:'Jogo',icon:'🔵',url:'https://kodable.com',
       how:'O personagem "Fuzz" percorre labirintos com a sequência que o aluno define. <strong>Começa sem código</strong>.'},
      {name:'Follow the Code',cat:'Jogo Online',icon:'🎮',url:'https://mathplayground.com/followthecode.html',
       how:'O aluno interpreta um algoritmo dado e <strong>prevê o resultado</strong> antes de ver.'}
    ]
  },
  'EF03CO01': {
    tools:[
      {name:'Scratch',cat:'Programação',icon:'🐱',url:'https://scratch.mit.edu',
       how:'Crie um projeto simples: <strong>Se o sprite toca na cor vermelha → diz "FALSO" / se toca azul → diz "VERDADEIRO"</strong>. O aluno programa as condições.'},
      {name:'Wordwall',cat:'Atividades Interativas',icon:'🃏',url:'https://wordwall.net',
       how:'Crie um quiz "Verdadeiro ou Falso" com afirmações do cotidiano. <strong>Use afirmações simples</strong> como "O cachorro é um peixe (F)".'},
      {name:'Genially',cat:'Apresentação Interativa',icon:'✨',url:'https://genially.com',
       how:'Monte um <strong>escape room digital</strong> onde cada porta só abre se o aluno responder V/F corretamente.'}
    ],
    games:[
      {name:'Kahoot',cat:'Quiz',icon:'🎮',url:'https://kahoot.com',
       how:'Crie um Kahoot de Verdadeiro/Falso com frases lógicas e frases negadas. <strong>Discuta cada acerto/erro</strong> em voz alta.'},
      {name:'Blooket',cat:'Game',icon:'🟡',url:'https://blooket.com',
       how:'Modo "Gold Quest" com perguntas V/F. O aluno não só responde certo, mas <strong>explica o porquê</strong>.'},
      {name:'Code.org (Curso C)',cat:'Plataforma',icon:'💻',url:'https://studio.code.org/s/coursec',
       how:'Lição de condicionais: <strong>"Se há uma pedra, vire à esquerda"</strong>. Liga a lógica booleana ao algoritmo.'}
    ]
  },
  'EF05CO03': {
    tools:[
      {name:'Scratch',cat:'Programação',icon:'🐱',url:'https://scratch.mit.edu',
       how:'Crie um detector: <strong>SE (tecla A E tecla B) apertadas → som</strong>. O aluno testa as combinações AND, OR, NOT.'},
      {name:'Khan Academy',cat:'Plataforma',icon:'📐',url:'https://khanacademy.org',
       how:'Módulo "Lógica Booleana". <strong>Faça os exercícios em duplas</strong>: um propõe a sentença, o outro avalia.'},
      {name:'GeoGebra',cat:'Matemática',icon:'📊',url:'https://geogebra.org',
       how:'Use tabelas de verdade interativas. <strong>Construa com a turma</strong> a tabela AND, OR, NOT visualmente.'}
    ],
    games:[
      {name:'Code.org (Minecraft)',cat:'Game',icon:'⛏️',url:'https://code.org/minecraft',
       how:'Fase de condicionais: <strong>"SE há madeira E há pedra → construa"</strong>. Operador AND em ação.'},
      {name:'Lightbot',cat:'Puzzle',icon:'🤖',url:'https://lightbot.com',
       how:'Fases avançadas pedem <strong>condições compostas</strong>. Desafie a turma a explicar: é AND ou OR?'},
      {name:'Tynker',cat:'Plataforma',icon:'🧩',url:'https://tynker.com',
       how:'Módulo de lógica booleana com <strong>projetos de jogo</strong> onde o aluno define condições múltiplas.'}
    ]
  },
  'EF06CO02': {
    tools:[
      {name:'Scratch',cat:'Programação',icon:'🐱',url:'https://scratch.mit.edu',
       how:'Projeto guiado: <strong>criar um jogo de plataforma simples</strong> com loop principal (sempre verificando), condicional (SE tocou → game over) e sequência de animação.'},
      {name:'Snap!',cat:'Programação em Blocos',icon:'🔗',url:'https://snap.berkeley.edu',
       how:'Versão mais avançada do Scratch com <strong>listas e funções de primeira classe</strong>. Ideal para 6º ano avançado.'},
      {name:'Blockly Games',cat:'Programação',icon:'🟦',url:'https://blockly.games',
       how:'Sequência de puzzles que introduzem <strong>loops e condicionais de forma progressiva</strong>, sem código texto ainda.'}
    ],
    games:[
      {name:'Code.org (Acelerado)',cat:'Curso',icon:'💻',url:'https://studio.code.org/s/20-hour',
       how:'Curso de 20h com Angry Birds e Flappy Bird. <strong>Foco nas lições 5-12</strong> para loops e condicionais.'},
      {name:'Tynker (Intermediário)',cat:'Game',icon:'🧩',url:'https://tynker.com',
       how:'Missão "Ninja Runner": o aluno programa <strong>movimentos, pulos e colisões</strong> com as 3 estruturas.'},
      {name:'Minecraft Education (Hora do Código)',cat:'Game',icon:'⛏️',url:'https://education.minecraft.net',
       how:'Programar o Alex para construir estruturas com <strong>repetições e condicionais visuais</strong>.'}
    ]
  },
  'EF07CO07': {
    tools:[
      {name:'Common Sense Media',cat:'Currículo Digital',icon:'🛡️',url:'https://commonsense.org/education',
       how:'Módulo "Privacidade e Segurança". <strong>Atividade "Compartilhar ou não compartilhar?"</strong>: alunos classificam dados em público/privado.'},
      {name:'Google Interland',cat:'Plataforma',icon:'🌐',url:'https://beinternetawesome.withgoogle.com/interland',
       how:'<strong>"Torre dos Tesouros"</strong>: defende o castelo de ataques de phishing. Prático e imersivo.'},
      {name:'Canva',cat:'Design',icon:'🎨',url:'https://canva.com',
       how:'Alunos criam um <strong>infográfico "Como criar uma senha forte"</strong> para compartilhar com a escola.'}
    ],
    games:[
      {name:'Interland (Google)',cat:'Game',icon:'🌐',url:'https://beinternetawesome.withgoogle.com/interland',
       how:'<strong>Todos os 4 mundos</strong>: Kindkingdom (respeito), Reality River (fake news), Kind Kingdom e Tower of Treasure (segurança).'},
      {name:'Digital Compass',cat:'Game de Escolhas',icon:'🧭',url:'https://digitalcompass.org',
       how:'Game de <strong>dilemas éticos digitais</strong>. Cada decisão tem consequências. Use em duplas com debate posterior.'},
      {name:'Cybersecurity Lab (PBS)',cat:'Simulação',icon:'🔐',url:'https://pbslearningmedia.org',
       how:'Simulação de <strong>defesa de rede empresarial</strong>. O aluno é o especialista de segurança.'}
    ]
  },
  'EF08CO03': {
    tools:[
      {name:'Python (Replit)',cat:'Programação',icon:'🐍',url:'https://replit.com',
       how:'Implemente <strong>Bubble Sort em 10 linhas</strong> e visualize a ordenação passo a passo com prints. Depois compare com sorted().'},
      {name:'VisuAlgo',cat:'Visualização',icon:'📊',url:'https://visualgo.net',
       how:'Site que anima os algoritmos em tempo real. <strong>Mostre no projetor</strong> e peça que o aluno preveja cada passo.'},
      {name:'Khan Academy',cat:'Plataforma',icon:'📐',url:'https://khanacademy.org/computing',
       how:'Módulo "Algoritmos de ordenação". <strong>Faça o quiz de complexidade</strong> ao final de cada algoritmo.'}
    ],
    games:[
      {name:'AlgoVis (Sorting)',cat:'Visualizador',icon:'🔢',url:'https://www.cs.usfca.edu/~galles/visualization',
       how:'Alunos controlam <strong>cada passo do Merge Sort</strong> e registram quantas comparações são feitas para N elementos.'},
      {name:'Sorting Robot (CS Unplugged)',cat:'Atividade Desplugada',icon:'🤖',url:'https://csunplugged.org',
       how:'Atividade física: alunos são os elementos a ordenar. <strong>Comparem o número de trocas</strong> entre Bubble e Selection Sort.'},
      {name:'Tynker (Avançado)',cat:'Game',icon:'🧩',url:'https://tynker.com',
       how:'Missão de ordenação de cartas em Tynker: o aluno <strong>programa o algoritmo escolhido</strong> e testa com decks de tamanhos diferentes.'}
    ]
  },
  'EF09CO05': {
    tools:[
      {name:'CryptoHack',cat:'Plataforma',icon:'🔐',url:'https://cryptohack.org',
       how:'Puzzles progressivos de criptografia. <strong>Comece pelo módulo "Introdução"</strong> com cifra de César e XOR.'},
      {name:'Python (Replit)',cat:'Programação',icon:'🐍',url:'https://replit.com',
       how:'Implemente a <strong>Cifra de César em Python</strong>: 15 linhas que cifram e decifram qualquer mensagem.'},
      {name:'Canva',cat:'Design',icon:'🎨',url:'https://canva.com',
       how:'Alunos criam um <strong>infográfico "Como funciona o HTTPS"</strong>: chave pública, privada e certificado digital.'}
    ],
    games:[
      {name:'Crypto Club',cat:'Plataforma',icon:'🔑',url:'https://cryptoclub.org',
       how:'Missões de descriptografar mensagens históricas. <strong>Nível 1-3</strong> cobrem substituição e transposição.'},
      {name:'Cipher Challenge (GCHQ)',cat:'Game',icon:'🕵️',url:'https://cipherchallenge.org',
       how:'Competição anual de criptografia para jovens. Use como <strong>projeto de equipe ao longo do semestre</strong>.'},
      {name:'Code.org (Criptografia)',cat:'Módulo',icon:'💻',url:'https://studio.code.org/s/csd5',
       how:'Unidade "Dados e Análise": módulo específico de <strong>criptografia simétrica e assimétrica</strong>.'}
    ]
  },
  'EM13CO10': {
    tools:[
      {name:'Teachable Machine',cat:'IA sem Código',icon:'🤖',url:'https://teachablemachine.withgoogle.com',
       how:'Em 20 min: <strong>treine um modelo com fotos da turma</strong> (thumbs up/down). Depois: "Quem decidiu? Como? Isso é inteligência?"'},
      {name:'Elements of AI',cat:'Curso Online',icon:'🧠',url:'https://elementsofai.com/br',
       how:'Curso gratuito em português. <strong>Capítulo 1 e 2</strong> introduzem IA, ML e ética sem código.'},
      {name:'Google Colab',cat:'Programação',icon:'📓',url:'https://colab.research.google.com',
       how:'Notebook pronto: <strong>reconhecimento de imagens com 5 linhas de Python</strong>. O aluno testa com fotos próprias.'}
    ],
    games:[
      {name:'Machine Learning for Kids',cat:'Plataforma',icon:'🤖',url:'https://machinelearningforkids.co.uk',
       how:'Treine um modelo e use no Scratch. <strong>Projeto: chatbot que detecta sentimentos</strong> em frases dos alunos.'},
      {name:'AI Dungeon',cat:'Game Gerado por IA',icon:'🎲',url:'https://aidungeon.com',
       how:'Use como estudo de caso: <strong>"O que a IA entende vs. o que ela alucina?"</strong>. Análise crítica de outputs.'},
      {name:'Quick Draw (Google)',cat:'Jogo',icon:'✏️',url:'https://quickdraw.withgoogle.com',
       how:'Depois de jogar: <strong>"Como a IA reconheceu seu desenho?"</strong>. Explique redes neurais com o dataset público.'}
    ]
  },
  'EM13CO12': {
    tools:[
      {name:'Google Colab',cat:'Ciência de Dados',icon:'📓',url:'https://colab.research.google.com',
       how:'Notebook com dados do IBGE sobre educação. <strong>Alunos calculam médias, criam gráficos e identificam padrões</strong> em 3 municípios.'},
      {name:'Tableau Public',cat:'Visualização',icon:'📊',url:'https://public.tableau.com',
       how:'Conecte um CSV de dados climáticos históricos. <strong>Cada grupo cria um dashboard</strong> e apresenta sua hipótese.'},
      {name:'Kaggle',cat:'Datasets',icon:'🏆',url:'https://kaggle.com',
       how:'Use datasets curados de saúde ou esporte. <strong>Projeto "Notebook de 30 dias"</strong>: análise exploratória em equipes.'}
    ],
    games:[
      {name:'Our World in Data',cat:'Exploração de Dados',icon:'🌍',url:'https://ourworldindata.org',
       how:'Desafio: <strong>"Prove ou refute uma afirmação com dados"</strong>. Ex: "Países mais ricos têm mais internet?".'},
      {name:'Gapminder Tools',cat:'Visualização Interativa',icon:'💹',url:'https://gapminder.org/tools',
       how:'O gráfico animado de Rosling. <strong>Alunos reproduzem a análise</strong> com dados que escolhem.'},
      {name:'DataUSA / IBGE Sidra',cat:'Portal de Dados',icon:'📈',url:'https://sidra.ibge.gov.br',
       how:'Dados reais do Brasil. <strong>Projeto "Nossa cidade em números"</strong>: cada turma analisa sua região.'}
    ]
  },
  'EM13CO16': {
    tools:[
      {name:'Tinkercad Circuits',cat:'Simulador',icon:'🔌',url:'https://tinkercad.com',
       how:'Simule um <strong>semáforo com Arduino</strong> sem hardware físico. O aluno programa e testa antes de montar.'},
      {name:'micro:bit MakeCode',cat:'Programação',icon:'🔲',url:'https://makecode.microbit.org',
       how:'Projeto: <strong>estação meteorológica</strong> com sensor de temperatura e display de LED. Código em blocos ou JavaScript.'},
      {name:'Arduino IDE',cat:'Programação Embarcada',icon:'⚡',url:'https://arduino.cc',
       how:'<strong>Projeto em 3 aulas</strong>: LED piscando → sensor de presença → alarme sonoro. Progressão natural.'}
    ],
    games:[
      {name:'Kerbal Space Program EDU',cat:'Simulação',icon:'🚀',url:'https://kerbalspaceprogram.com',
       how:'Construa um foguete que chegue à órbita. <strong>Liga física (empuxo, arrasto) à programação</strong> de trajetória.'},
      {name:'SpaceCraft 3D (NASA)',cat:'Simulação',icon:'🛸',url:'https://eyes.nasa.gov',
       how:'Visualize satélites reais. <strong>Desafio: "Programe uma sonda para chegar a Marte"</strong> com restrições físicas.'},
      {name:'VEX Code (Robótica)',cat:'Plataforma',icon:'🤖',url:'https://vexcode.vex.com',
       how:'Simule um robô VEX completando <strong>obstáculos e missões</strong> com código por blocos ou texto.'}
    ]
  }
};

const BNCC_AGES = [
  {age:'3–5 anos',label:'Educação Infantil',sub:'Berçário, Maternal, Pré',eixos:['PC','CD'],nivel:'EI'},
  {age:'6–7 anos',label:'1º e 2º Ano',sub:'Anos Iniciais',eixos:['PC','MD'],nivel:'EF1'},
  {age:'7–9 anos',label:'2º e 3º Ano',sub:'Anos Iniciais',eixos:['PC','MD','CD'],nivel:'EF1'},
  {age:'9–11 anos',label:'4º e 5º Ano',sub:'Anos Iniciais',eixos:['PC','MD','CD'],nivel:'EF1'},
  {age:'11–13 anos',label:'6º e 7º Ano',sub:'Anos Finais',eixos:['PC','MD','CD'],nivel:'EF2'},
  {age:'13–15 anos',label:'8º e 9º Ano',sub:'Anos Finais',eixos:['PC','MD','CD'],nivel:'EF2'},
  {age:'15–18 anos',label:'Ensino Médio',sub:'1ª a 3ª série',eixos:['PC','MD','CD'],nivel:'EM'},
];

const BNCC_GRADES = [
  {grade:'Educação Infantil',sub:'EI03CO01 – EI03CO11',eixos:['PC','CD'],filterVal:'Educação Infantil'},
  {grade:'1º Ano',sub:'EF01CO01 – EF01CO07',eixos:['PC','MD','CD'],filterVal:'1º Ano'},
  {grade:'2º Ano',sub:'EF02CO01 – EF02CO06',eixos:['PC','MD','CD'],filterVal:'2º Ano'},
  {grade:'3º Ano',sub:'EF03CO01 – EF03CO09',eixos:['PC','MD','CD'],filterVal:'3º Ano'},
  {grade:'4º Ano',sub:'EF04CO01 – EF04CO08',eixos:['PC','MD','CD'],filterVal:'4º Ano'},
  {grade:'5º Ano',sub:'EF05CO01 – EF05CO11',eixos:['PC','MD','CD'],filterVal:'5º Ano'},
  {grade:'6º Ano',sub:'EF06CO01 – EF06CO10',eixos:['PC','MD','CD'],filterVal:'6º Ano'},
  {grade:'7º Ano',sub:'EF07CO01 – EF07CO11',eixos:['PC','MD','CD'],filterVal:'7º Ano'},
  {grade:'8º Ano',sub:'EF08CO01 – EF08CO11',eixos:['PC','MD','CD'],filterVal:'8º Ano'},
  {grade:'9º Ano',sub:'EF09CO01 – EF09CO10',eixos:['PC','MD','CD'],filterVal:'9º Ano'},
  {grade:'Ensino Médio',sub:'EM13CO01 – EM13CO26',eixos:['PC','MD','CD'],filterVal:'Ensino Médio'},
];

const BNCC_THEMES = [
  {tema:'Algoritmos',icon:'🔄',desc:'Sequências, loops, condicionais'},
  {tema:'Lógica',icon:'🧠',desc:'Booleanos, V/F, operadores'},
  {tema:'Decomposição',icon:'🧩',desc:'Dividir para resolver'},
  {tema:'Programação',icon:'💻',desc:'Linguagens, variáveis, funções'},
  {tema:'Dados',icon:'📊',desc:'Estruturas, tipos, codificação'},
  {tema:'Redes',icon:'🌐',desc:'Internet, protocolos, pacotes'},
  {tema:'Segurança',icon:'🔐',desc:'Criptografia, privacidade, ataques'},
  {tema:'Cidadania Digital',icon:'🤝',desc:'Ética, direitos, responsabilidade'},
  {tema:'Hardware',icon:'🖥️',desc:'Dispositivos, componentes'},
  {tema:'Inteligência Artificial',icon:'🤖',desc:'ML, IA generativa, ética'},
  {tema:'Robótica',icon:'⚙️',desc:'Automação, sensores, atuadores'},
  {tema:'Modelagem',icon:'🗺️',desc:'Simulação, sistemas, abstração'},
];
