const TOOLS = [
  {
    "tool": "Arduino",
    "category": "Maker",
    "subject": "Ciências",
    "grade": "8-9",
    "lesson": "Construir sensor de umidade para estudar irrigação",
    "method": "STEAM",
    "link": "https://arduino.cc",
    "bncc": "EF08CI01"
  },
  {
    "tool": "Micro:bit",
    "category": "Maker",
    "subject": "Ciências",
    "grade": "6-9",
    "lesson": "Criar estação meteorológica simples",
    "method": "Aprendizagem baseada em projetos",
    "link": "https://microbit.org",
    "bncc": "EF07CI05"
  },
  {
    "tool": "Raspberry Pi",
    "category": "Maker",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Construir protótipo de casa inteligente",
    "method": "Cultura Maker",
    "link": "https://raspberrypi.org",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Scratch",
    "category": "Coding",
    "subject": "Matemática",
    "grade": "6-8",
    "lesson": "Criar jogo sobre frações",
    "method": "Pensamento computacional",
    "link": "https://scratch.mit.edu",
    "bncc": "EF06MA05"
  },
  {
    "tool": "Scratch Jr",
    "category": "Coding",
    "subject": "Fundamental",
    "grade": "1-3",
    "lesson": "Introdução à lógica de programação",
    "method": "Pensamento computacional",
    "link": "https://scratchjr.org",
    "bncc": "EF02MA03"
  },
  {
    "tool": "Python",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Análise de grandes conjuntos de dados",
    "method": "Ciência de Dados",
    "link": "https://python.org",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Swift Playgrounds",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "7-9",
    "lesson": "Criar app educativo simples",
    "method": "Programação criativa",
    "link": "https://developer.apple.com/swift-playgrounds",
    "bncc": "EF09CI06"
  },
  {
    "tool": "MIT App Inventor",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Criar app para reciclagem escolar",
    "method": "Aprendizagem baseada em projetos",
    "link": "https://appinventor.mit.edu",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Thunkable",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Desenvolver apps mobile",
    "method": "Programação visual",
    "link": "https://thunkable.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Glide Apps",
    "category": "No-Code",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Criar apps para serviços comunitários",
    "method": "Design Thinking",
    "link": "https://glideapps.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Tinkercad",
    "category": "Design 3D",
    "subject": "STEAM",
    "grade": "7-9",
    "lesson": "Projetar cidade sustentável em 3D",
    "method": "Design thinking",
    "link": "https://tinkercad.com",
    "bncc": "EF09CI13"
  },
  {
    "tool": "Fusion 360",
    "category": "Design 3D",
    "subject": "Engenharia",
    "grade": "9-EM",
    "lesson": "Modelagem de peças mecânicas",
    "method": "STEAM",
    "link": "https://autodesk.com/fusion-360",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "SketchUp",
    "category": "Design 3D",
    "subject": "Geografia",
    "grade": "8-EM",
    "lesson": "Projetar bairro sustentável",
    "method": "Urbanismo educativo",
    "link": "https://sketchup.com",
    "bncc": "EF09GE18"
  },
  {
    "tool": "Blender",
    "category": "Design 3D",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Modelagem 3D artística",
    "method": "Arte digital",
    "link": "https://blender.org",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Onshape",
    "category": "Design 3D",
    "subject": "Engenharia",
    "grade": "9-EM",
    "lesson": "Design de produto colaborativo",
    "method": "Engenharia",
    "link": "https://onshape.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "GeoGebra",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "7-9",
    "lesson": "Explorar transformações geométricas",
    "method": "Modelagem matemática",
    "link": "https://geogebra.org",
    "bncc": "EF08MA18"
  },
  {
    "tool": "Desmos",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "8-9",
    "lesson": "Investigar funções e gráficos",
    "method": "Exploração matemática",
    "link": "https://desmos.com",
    "bncc": "EF09MA06"
  },
  {
    "tool": "Wolfram Alpha",
    "category": "Cálculo",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Resolver equações simbólicas complexas",
    "method": "Investigação Matemática",
    "link": "https://wolframalpha.com",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "PhET",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "6-9",
    "lesson": "Simular forças e movimento",
    "method": "Investigação científica",
    "link": "https://phet.colorado.edu",
    "bncc": "EF08CI05"
  },
  {
    "tool": "Algodoo",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "7-9",
    "lesson": "Testar experimentos de gravidade",
    "method": "Física Experimental",
    "link": "https://algodoo.com",
    "bncc": "EF09CI06"
  },
  {
    "tool": "Padlet",
    "category": "Colaboração",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Debate digital sobre tema social",
    "method": "Aprendizagem colaborativa",
    "link": "https://padlet.com",
    "bncc": "EF69LP21"
  },
  {
    "tool": "Miro",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "7-9",
    "lesson": "Mapa mental sobre mudanças climáticas",
    "method": "Aprendizagem colaborativa",
    "link": "https://miro.com",
    "bncc": "EF09GE02"
  },
  {
    "tool": "Mural",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Brainstorming de soluções urbanas",
    "method": "Design Thinking",
    "link": "https://mural.co",
    "bncc": "EM13CHS603"
  },
  {
    "tool": "Notion",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "8-9",
    "lesson": "Diário digital de projeto científico",
    "method": "Gestão de projetos",
    "link": "https://notion.so",
    "bncc": "EF08CI08"
  },
  {
    "tool": "Google Docs",
    "category": "Colaboração",
    "subject": "Português",
    "grade": "6-EM",
    "lesson": "Redação colaborativa de ensaios",
    "method": "Escrita Processual",
    "link": "https://docs.google.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Google Slides",
    "category": "Apresentação",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Apresentação de projetos de pesquisa",
    "method": "Comunicação Multimodal",
    "link": "https://slides.google.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "Google Sheets",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "7-9",
    "lesson": "Analisar dados ambientais",
    "method": "Data literacy",
    "link": "https://sheets.google.com",
    "bncc": "EF08MA23"
  },
  {
    "tool": "Microsoft Excel",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "7-EM",
    "lesson": "Investigações estatísticas",
    "method": "Tratamento de Dados",
    "link": "https://microsoft.com/excel",
    "bncc": "EM13MAT402"
  },
  {
    "tool": "Tableau Public",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Criar visualização de dados sociais",
    "method": "Data storytelling",
    "link": "https://public.tableau.com",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "Power BI",
    "category": "Dados",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Construção de dashboards de indicadores",
    "method": "Business Intelligence",
    "link": "https://powerbi.microsoft.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Canva",
    "category": "Design",
    "subject": "Artes",
    "grade": "6-9",
    "lesson": "Criar campanha visual ambiental",
    "method": "Aprendizagem criativa",
    "link": "https://canva.com",
    "bncc": "EF69AR05"
  },
  {
    "tool": "Figma",
    "category": "Design",
    "subject": "Tecnologia",
    "grade": "8-9",
    "lesson": "Projetar app para mobilidade urbana",
    "method": "Design thinking",
    "link": "https://figma.com",
    "bncc": "EF09CI06"
  },
  {
    "tool": "Adobe Express",
    "category": "Design",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Criar infográficos e cartazes",
    "method": "Design Gráfico",
    "link": "https://adobe.com/express",
    "bncc": "EF69AR35"
  },
  {
    "tool": "Pixlr",
    "category": "Edição",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Projetos de edição de imagem digital",
    "method": "Alfabetização Visual",
    "link": "https://pixlr.com",
    "bncc": "EF69AR35"
  },
  {
    "tool": "GIMP",
    "category": "Edição",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Manipulação avançada de imagens",
    "method": "Arte Digital",
    "link": "https://gimp.org",
    "bncc": "EM13AR02"
  },
  {
    "tool": "iMovie",
    "category": "Mídia",
    "subject": "História",
    "grade": "7-9",
    "lesson": "Produzir mini documentário histórico",
    "method": "Aprendizagem baseada em projetos",
    "link": "https://apple.com/imovie",
    "bncc": "EF08HI04"
  },
  {
    "tool": "CapCut",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "7-EM",
    "lesson": "Criar vídeos educativos curtos",
    "method": "Produção Audiovisual",
    "link": "https://capcut.com",
    "bncc": "EF69AR35"
  },
  {
    "tool": "DaVinci Resolve",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "9-EM",
    "lesson": "Produção de vídeo profissional",
    "method": "Audiovisual",
    "link": "https://blackmagicdesign.com",
    "bncc": "EM13AR02"
  },
  {
    "tool": "WeVideo",
    "category": "Mídia",
    "subject": "Educação",
    "grade": "6-EM",
    "lesson": "Projetos de storytelling em grupo",
    "method": "Narrativa Digital",
    "link": "https://wevideo.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Flip",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Debates em vídeo",
    "method": "Aprendizagem ativa",
    "link": "https://flip.com",
    "bncc": "EF69LP25"
  },
  {
    "tool": "Kahoot",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Quiz de revisão de conteúdo",
    "method": "Gamificação",
    "link": "https://kahoot.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Quizizz",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Quiz competitivo",
    "method": "Gamificação",
    "link": "https://quizizz.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Blooket",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Jogos de revisão",
    "method": "Gamificação",
    "link": "https://blooket.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Gimkit",
    "category": "Gamificação",
    "subject": "Matemática",
    "grade": "7-EM",
    "lesson": "Quizzes de simulação econômica",
    "method": "Economia Comportamental",
    "link": "https://gimkit.com",
    "bncc": "EM13MAT301"
  },
  {
    "tool": "Classcraft",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Sistema de RPG para gestão de sala",
    "method": "Gamificação",
    "link": "https://classcraft.com",
    "bncc": "EF69LP12"
  },
  {
    "tool": "Minecraft Education",
    "category": "Gamification",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Construir cidade sustentável",
    "method": "Gamificação",
    "link": "https://education.minecraft.net",
    "bncc": "EF09GE18"
  },
  {
    "tool": "Roblox Studio",
    "category": "Game Design",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Criar jogos educativos 3D",
    "method": "Desenvolvimento de Jogos",
    "link": "https://roblox.com/create",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Unity",
    "category": "GameDev",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Criar jogos educativos",
    "method": "Game design",
    "link": "https://unity.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Unreal Engine",
    "category": "GameDev",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Ambientes interativos complexos",
    "method": "Simulação 3D",
    "link": "https://unrealengine.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Godot",
    "category": "GameDev",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Programar jogos simples",
    "method": "Game development",
    "link": "https://godotengine.org",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Google Earth",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "6-9",
    "lesson": "Explorar crescimento urbano",
    "method": "Investigação geográfica",
    "link": "https://earth.google.com",
    "bncc": "EF07GE07"
  },
  {
    "tool": "Google Maps",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "6-EM",
    "lesson": "Mapear infraestrutura local",
    "method": "Cartografia Digital",
    "link": "https://maps.google.com",
    "bncc": "EF07GE08"
  },
  {
    "tool": "ArcGIS Online",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "8-EM",
    "lesson": "Criar mapas temáticos digitais",
    "method": "Geotecnologia",
    "link": "https://arcgis.com",
    "bncc": "EM13CHS302"
  },
  {
    "tool": "OpenStreetMap",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "7-EM",
    "lesson": "Mapear infraestrutura local",
    "method": "Cidadania digital",
    "link": "https://openstreetmap.org",
    "bncc": "EF09GE10"
  },
  {
    "tool": "ThingLink",
    "category": "Mídia",
    "subject": "História",
    "grade": "7-9",
    "lesson": "Mapa histórico interativo",
    "method": "Narrativa digital",
    "link": "https://thinglink.com",
    "bncc": "EF08HI01"
  },
  {
    "tool": "Nearpod",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Aula interativa sobre clima",
    "method": "Aula invertida",
    "link": "https://nearpod.com",
    "bncc": "EF08CI16"
  },
  {
    "tool": "Pear Deck",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Enquetes ao vivo com alunos",
    "method": "Instrução por Pares",
    "link": "https://peardeck.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Mentimeter",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-9",
    "lesson": "Enquete sobre problemas urbanos",
    "method": "Aprendizagem ativa",
    "link": "https://mentimeter.com",
    "bncc": "EF09GE11"
  },
  {
    "tool": "Slido",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Sessões de Q&A em palestras",
    "method": "Engajamento Audiência",
    "link": "https://sli.do",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Poll Everywhere",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Atividades de pesquisa ao vivo",
    "method": "Coleta de Dados",
    "link": "https://polleverywhere.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Soundtrap",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-9",
    "lesson": "Criar podcast educativo",
    "method": "Produção midiática",
    "link": "https://soundtrap.com",
    "bncc": "EF69AR10"
  },
  {
    "tool": "Audacity",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "7-EM",
    "lesson": "Edição de áudio e narração",
    "method": "Podcasting",
    "link": "https://audacityteam.org",
    "bncc": "EF69AR35"
  },
  {
    "tool": "BandLab",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Composição musical colaborativa",
    "method": "Educação Musical",
    "link": "https://bandlab.com",
    "bncc": "EF69AR23"
  },
  {
    "tool": "GarageBand",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Produção de música digital",
    "method": "Criação Musical",
    "link": "https://apple.com/garageband",
    "bncc": "EF69AR21"
  },
  {
    "tool": "Flat.io",
    "category": "Música",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Composição de partituras digitais",
    "method": "Notação Musical",
    "link": "https://flat.io",
    "bncc": "EF69AR19"
  },
  {
    "tool": "Code.org",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "6-9",
    "lesson": "Introdução à programação",
    "method": "Pensamento computacional",
    "link": "https://code.org",
    "bncc": "EF06CI03"
  },
  {
    "tool": "Replit",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Desenvolver projetos de programação",
    "method": "Aprendizagem baseada em projetos",
    "link": "https://replit.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "GitHub",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Controle de versão e colaboração",
    "method": "DevOps Educativo",
    "link": "https://github.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Kaggle",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Exploração de datasets reais",
    "method": "Ciência de Dados",
    "link": "https://kaggle.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Jupyter Notebook",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Análise de dados com Python",
    "method": "Data Science",
    "link": "https://jupyter.org",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Observable",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Visualizar dados interativos",
    "method": "Data science",
    "link": "https://observablehq.com",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "Looker Studio",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "8-EM",
    "lesson": "Criar dashboards de dados",
    "method": "Visualização de Informação",
    "link": "https://lookerstudio.google.com",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "ChatGPT",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Gerar hipóteses para debate científico",
    "method": "Pensamento crítico",
    "link": "https://openai.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Claude",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Gerar planos de aula automatizados",
    "method": "IA generativa",
    "link": "https://claude.ai",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Gemini",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Explorar pesquisa assistida por IA",
    "method": "Investigação digital",
    "link": "https://gemini.google.com",
    "bncc": "EM13CNT304"
  },
  {
    "tool": "Perplexity",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Pesquisa científica guiada por IA",
    "method": "Investigação científica",
    "link": "https://perplexity.ai",
    "bncc": "EM13CNT304"
  },
  {
    "tool": "Midjourney",
    "category": "AI",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Geração de arte digital com prompts",
    "method": "Arte digital",
    "link": "https://midjourney.com",
    "bncc": "EM13AR02"
  },
  {
    "tool": "DALL·E",
    "category": "AI",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Criar ilustrações conceituais",
    "method": "Arte generativa",
    "link": "https://openai.com",
    "bncc": "EM13AR02"
  },
  {
    "tool": "RunwayML",
    "category": "AI",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Criar vídeos com IA",
    "method": "Produção criativa",
    "link": "https://runwayml.com",
    "bncc": "EM13LGG103"
  },
  {
    "tool": "Synthesia",
    "category": "AI",
    "subject": "Mídia",
    "grade": "9-EM",
    "lesson": "Criar apresentadores com IA",
    "method": "Comunicação Digital",
    "link": "https://synthesia.io",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "ElevenLabs",
    "category": "AI",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Projetos de narração de voz",
    "method": "Acessibilidade",
    "link": "https://elevenlabs.io",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Otter AI",
    "category": "AI",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Transcrição automática de reuniões",
    "method": "Produtividade",
    "link": "https://otter.ai",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Noteflight",
    "category": "Música",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Composição musical em nuvem",
    "method": "Teoria Musical",
    "link": "https://noteflight.com",
    "bncc": "EF69AR19"
  },
  {
    "tool": "H5P",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Criar quizzes e vídeos interativos",
    "method": "Conteúdo Rico",
    "link": "https://h5p.org",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Edpuzzle",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Adicionar perguntas em vídeos",
    "method": "Aula invertida",
    "link": "https://edpuzzle.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "SchoolAI",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Suporte de tutor de IA personalizado",
    "method": "Aprendizado Adaptativo",
    "link": "https://schoolai.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "MagicSchool AI",
    "category": "AI",
    "subject": "Professores",
    "grade": "EM",
    "lesson": "Geração de planos de aula e rubricas",
    "method": "Produtividade Docente",
    "link": "https://magicschool.ai",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Curipod",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Slides interativos gerados por IA",
    "method": "Aprendizagem Ativa",
    "link": "https://curipod.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Brisk Teaching",
    "category": "AI",
    "subject": "Professores",
    "grade": "EM",
    "lesson": "Geração de feedback automatizado",
    "method": "Avaliação",
    "link": "https://briskteaching.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "ClassPoint",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Quizzes integrados ao PowerPoint",
    "method": "Engajamento",
    "link": "https://classpoint.io",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Explain Everything",
    "category": "Lousa",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Explicações em vídeo e lousa digital",
    "method": "Pensamento Visível",
    "link": "https://explaineverything.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "Jamboard",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Brainstorm coletivo",
    "method": "Colaboração digital",
    "link": "https://jamboard.google.com",
    "bncc": "EF69LP11"
  },
  {
    "tool": "FigJam",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Colaboração visual e diagramação",
    "method": "Design Thinking",
    "link": "https://figma.com/figjam",
    "bncc": "EF69LP11"
  },
  {
    "tool": "Lucidchart",
    "category": "Diagramas",
    "subject": "Tecnologia",
    "grade": "7-EM",
    "lesson": "Criação de fluxogramas de processos",
    "method": "Lógica de Sistemas",
    "link": "https://lucidchart.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Draw.io",
    "category": "Diagramas",
    "subject": "Tecnologia",
    "grade": "7-EM",
    "lesson": "Diagramação de sistemas",
    "method": "Pensamento Sistêmico",
    "link": "https://draw.io",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Prezi",
    "category": "Mídia",
    "subject": "Português",
    "grade": "7-9",
    "lesson": "Apresentação narrativa de pesquisa",
    "method": "Storytelling",
    "link": "https://prezi.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Genially",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Apresentações interativas",
    "method": "Storytelling digital",
    "link": "https://genially.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Book Creator",
    "category": "Mídia",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Criar livro digital colaborativo",
    "method": "Produção textual",
    "link": "https://bookcreator.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "StoryJumper",
    "category": "Mídia",
    "subject": "Português",
    "grade": "4-8",
    "lesson": "Criar e publicar histórias digitais",
    "method": "Escrita Criativa",
    "link": "https://storyjumper.com",
    "bncc": "EF35LP25"
  },
  {
    "tool": "StoryboardThat",
    "category": "Mídia",
    "subject": "Português",
    "grade": "6-EM",
    "lesson": "Criação de storyboards e roteiros",
    "method": "Narrativa Visual",
    "link": "https://storyboardthat.com",
    "bncc": "EF69LP06"
  },
  {
    "tool": "Pixton",
    "category": "Mídia",
    "subject": "Português",
    "grade": "6-EM",
    "lesson": "Criar histórias em quadrinhos",
    "method": "Multimodalidade",
    "link": "https://pixton.com",
    "bncc": "EF69LP06"
  },
  {
    "tool": "Wakelet",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Coleção de recursos de pesquisa",
    "method": "Curadoria digital",
    "link": "https://wakelet.com",
    "bncc": "EF69LP23"
  },
  {
    "tool": "Pocket",
    "category": "Leitura",
    "subject": "Português",
    "grade": "7-EM",
    "lesson": "Salvar artigos para pesquisa",
    "method": "Curadoria de Conteúdo",
    "link": "https://getpocket.com",
    "bncc": "EF69LP01"
  },
  {
    "tool": "Hypothes.is",
    "category": "Leitura",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Anotação colaborativa de textos",
    "method": "Leitura Crítica",
    "link": "https://web.hypothes.is",
    "bncc": "EM13LGG101"
  },
  {
    "tool": "Diigo",
    "category": "Organização",
    "subject": "Línguas",
    "grade": "7-EM",
    "lesson": "Marcação de recursos de pesquisa",
    "method": "Gestão do Conhecimento",
    "link": "https://diigo.com",
    "bncc": "EF69LP01"
  },
  {
    "tool": "Zotero",
    "category": "Pesquisa",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Treinamento de citação acadêmica",
    "method": "Metodologia Científica",
    "link": "https://zotero.org",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Mendeley",
    "category": "Pesquisa",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Gestão de referências bibliográficas",
    "method": "Pesquisa Acadêmica",
    "link": "https://mendeley.com",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Trello",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Gestão de projetos de grupo",
    "method": "Metodologia Ágil",
    "link": "https://trello.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Asana",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "9-EM",
    "lesson": "Planejamento de tarefas complexas",
    "method": "Gestão de Equipes",
    "link": "https://asana.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Monday.com",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "9-EM",
    "lesson": "Colaboração e fluxo de trabalho",
    "method": "Gestão de Projetos",
    "link": "https://monday.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Airtable",
    "category": "Dados",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Organizar banco de dados de pesquisa",
    "method": "Gestão de dados",
    "link": "https://airtable.com",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "Supabase",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Criação de back-end para web apps",
    "method": "Desenvolvimento Web",
    "link": "https://supabase.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Firebase",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Back-end para aplicativos móveis",
    "method": "Programação",
    "link": "https://firebase.google.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Netlify",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Hospedagem de sites de estudantes",
    "method": "Web Dev",
    "link": "https://netlify.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Glitch",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Criar apps web colaborativos",
    "method": "Aprendizagem maker",
    "link": "https://glitch.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "CodePen",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Experimentos de front-end",
    "method": "Web Design",
    "link": "https://codepen.io",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "JSFiddle",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Testes rápidos de JavaScript",
    "method": "Programação",
    "link": "https://jsfiddle.net",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Blockly",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "6-8",
    "lesson": "Lições de programação em blocos",
    "method": "Pensamento Computacional",
    "link": "https://developers.google.com/blockly",
    "bncc": "EF06MA05"
  },
  {
    "tool": "Thunkable X",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Criação avançada de apps móveis",
    "method": "Mobile Dev",
    "link": "https://thunkable.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Scratch Lab",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "6-8",
    "lesson": "Experimentos de codificação avançada",
    "method": "Inovação Computacional",
    "link": "https://lab.scratch.mit.edu",
    "bncc": "EF08MA11"
  },
  {
    "tool": "Machine Learning for Kids",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "7-9",
    "lesson": "Ensinar IA com Scratch",
    "method": "Pensamento computacional",
    "link": "https://machinelearningforkids.co.uk",
    "bncc": "EF09CI06"
  },
  {
    "tool": "Teachable Machine",
    "category": "AI",
    "subject": "Ciências",
    "grade": "7-9",
    "lesson": "Criar modelo simples de IA",
    "method": "Aprendizagem experimental",
    "link": "https://teachablemachine.withgoogle.com",
    "bncc": "EF09CI06"
  },
  {
    "tool": "Edge Impulse",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Treinar sensores com IA (TinyML)",
    "method": "Internet das Coisas",
    "link": "https://edgeimpulse.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Arduino IoT Cloud",
    "category": "Maker",
    "subject": "STEAM",
    "grade": "9-EM",
    "lesson": "Monitorar qualidade do ar",
    "method": "IoT educacional",
    "link": "https://arduino.cc",
    "bncc": "EM13CNT207"
  },
  {
    "tool": "Blynk IoT",
    "category": "Maker",
    "subject": "STEAM",
    "grade": "9-EM",
    "lesson": "Controle remoto de dispositivos",
    "method": "IoT",
    "link": "https://blynk.io",
    "bncc": "EM13CNT207"
  },
  {
    "tool": "IFTTT",
    "category": "Automação",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Automação de casas inteligentes",
    "method": "Lógica de Programação",
    "link": "https://ifttt.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Zapier",
    "category": "Automação",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Integração de fluxos de trabalho",
    "method": "Produtividade",
    "link": "https://zapier.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Make (Integromat)",
    "category": "Automação",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Sistemas complexos de automação",
    "method": "Lógica Sistêmica",
    "link": "https://make.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "OBS Studio",
    "category": "Mídia",
    "subject": "Mídia",
    "grade": "8-EM",
    "lesson": "Gravação de tutoriais e streaming",
    "method": "Comunicação Digital",
    "link": "https://obsproject.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Loom",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Explicações em vídeo de alunos",
    "method": "Comunicação Assíncrona",
    "link": "https://loom.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "Screencastify",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Gravação de telas para lições",
    "method": "Educação Digital",
    "link": "https://screencastify.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "ExplainPaper AI",
    "category": "AI",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Simplificar artigos acadêmicos",
    "method": "Leitura Científica",
    "link": "https://explainpaper.com",
    "bncc": "EM13LGG101"
  },
  {
    "tool": "Consensus AI",
    "category": "AI",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Encontrar evidências científicas",
    "method": "Pesquisa Baseada em Evidências",
    "link": "https://consensus.app",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Elicit AI",
    "category": "AI",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Gerar perguntas de pesquisa",
    "method": "Investigação Acadêmica",
    "link": "https://elicit.org",
    "bncc": "EM13CNT304"
  },
  {
    "tool": "Scholarcy",
    "category": "AI",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Resumir artigos de pesquisa",
    "method": "Estudo Dirigido",
    "link": "https://scholarcy.com",
    "bncc": "EM13LGG101"
  },
  {
    "tool": "Connected Papers",
    "category": "Pesquisa",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Explorar redes de pesquisa",
    "method": "Mapeamento de Ciência",
    "link": "https://connectedpapers.com",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Padcaster",
    "category": "Mídia",
    "subject": "Mídia",
    "grade": "8-EM",
    "lesson": "Produção de vídeo profissional móvel",
    "method": "Jornalismo Escolar",
    "link": "https://padcaster.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Stop Motion Studio",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Criar animações stop motion",
    "method": "Animação",
    "link": "https://stopmotionstudio.com",
    "bncc": "EF69AR35"
  },
  {
    "tool": "Toontastic",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "4-7",
    "lesson": "Storytelling animado em 3D",
    "method": "Narrativa Digital",
    "link": "https://toontastic.withgoogle.com",
    "bncc": "EF35LP25"
  },
  {
    "tool": "Animaker",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Vídeos explicativos animados",
    "method": "Educação Visual",
    "link": "https://animaker.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Powtoon",
    "category": "Media",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Animações explicativas",
    "method": "Aprendizagem criativa",
    "link": "https://powtoon.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Voki",
    "category": "Mídia",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Avatares falantes para idiomas",
    "method": "Comunicação Oral",
    "link": "https://voki.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "Ready Player Me",
    "category": "Mídia",
    "subject": "Tecnologia",
    "grade": "7-EM",
    "lesson": "Criar personagens virtuais",
    "method": "Identidade Digital",
    "link": "https://readyplayer.me",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "CoSpaces Edu",
    "category": "VR",
    "subject": "STEAM",
    "grade": "6-9",
    "lesson": "Criar experiências VR educativas",
    "method": "Aprendizagem imersiva",
    "link": "https://cospaces.io",
    "bncc": "EF09CI06"
  },
  {
    "tool": "Merge Cube",
    "category": "AR",
    "subject": "STEAM",
    "grade": "6-9",
    "lesson": "Explorar modelos 3D em AR",
    "method": "Realidade aumentada",
    "link": "https://mergeedu.com",
    "bncc": "EF08CI05"
  },
  {
    "tool": "AR Makr",
    "category": "AR",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Criar desenhos em realidade aumentada",
    "method": "Arte Imersiva",
    "link": "https://armakr.app",
    "bncc": "EF69AR35"
  },
  {
    "tool": "Assemblr EDU",
    "category": "AR",
    "subject": "STEAM",
    "grade": "7-EM",
    "lesson": "Modelos AR interativos",
    "method": "Visualização 3D",
    "link": "https://assemblrworld.com",
    "bncc": "EF09CI13"
  },
  {
    "tool": "SketchAR",
    "category": "AR",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Desenho guiado por AR",
    "method": "Artes Visuais",
    "link": "https://sketchar.io",
    "bncc": "EF69AR35"
  },
  {
    "tool": "Google Expeditions",
    "category": "VR",
    "subject": "Geografia",
    "grade": "6-EM",
    "lesson": "Viagens de campo virtuais",
    "method": "Geografia Imersiva",
    "link": "https://artsandculture.google.com",
    "bncc": "EF07GE07"
  },
  {
    "tool": "National Geographic MapMaker",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "6-EM",
    "lesson": "Exploração de dados geográficos",
    "method": "Geografia Crítica",
    "link": "https://mapmaker.nationalgeographic.org",
    "bncc": "EF07GE08"
  },
  {
    "tool": "Gapminder",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "7-EM",
    "lesson": "Análise de dados globais (saúde/renda)",
    "method": "Estatística Social",
    "link": "https://gapminder.org",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Our World in Data",
    "category": "Dados",
    "subject": "Interdisciplinar",
    "grade": "8-EM",
    "lesson": "Analisar tendências globais",
    "method": "Alfabetização de Dados",
    "link": "https://ourworldindata.org",
    "bncc": "EM13MAT402"
  },
  {
    "tool": "Climate Interactive",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Simulação de políticas climáticas",
    "method": "Sustentabilidade",
    "link": "https://climateinteractive.org",
    "bncc": "EM13CNT306"
  },
  {
    "tool": "NetLogo",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "9-EM",
    "lesson": "Modelagem de sistemas complexos",
    "method": "Ciência da Computação",
    "link": "https://ccl.northwestern.edu/netlogo",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Stella Architect",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "9-EM",
    "lesson": "Simulação de pensamento sistêmico",
    "method": "Dinâmica de Sistemas",
    "link": "https://iseesystems.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "AnyLogic",
    "category": "Simulação",
    "subject": "Engenharia",
    "grade": "EM",
    "lesson": "Modelagem de sistemas complexos",
    "method": "Engenharia de Sistemas",
    "link": "https://anylogic.com",
    "bncc": "EM13MAT402"
  },
  {
    "tool": "SimCity EDU",
    "category": "Simulação",
    "subject": "Geografia",
    "grade": "7-EM",
    "lesson": "Planejamento urbano simulado",
    "method": "Urbanismo",
    "link": "https://simcity.com",
    "bncc": "EF09GE18"
  },
  {
    "tool": "Civilization VI EDU",
    "category": "Simulação",
    "subject": "História",
    "grade": "8-EM",
    "lesson": "Tomada de decisão histórica",
    "method": "Estratégia",
    "link": "https://civilization.com",
    "bncc": "EM13CHS201"
  },
  {
    "tool": "Kerbal Space Program EDU",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Engenharia de foguetes e física",
    "method": "Astronáutica",
    "link": "https://kerbalspaceprogram.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Space Engine",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Exploração do universo em 3D",
    "method": "Astronomia",
    "link": "https://spaceengine.org",
    "bncc": "EF09CI14"
  },
  {
    "tool": "Universe Sandbox",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Simulações de gravidade planetária",
    "method": "Astronomia",
    "link": "https://universesandbox.com",
    "bncc": "EF09CI14"
  },
  {
    "tool": "Labster",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "9-EM",
    "lesson": "Laboratórios de ciências virtuais",
    "method": "Ciência Experimental",
    "link": "https://labster.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "LabXchange",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Simulações de biologia e química",
    "method": "Educação Científica",
    "link": "https://labxchange.org",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "BioDigital Human",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Exploração do corpo humano em 3D",
    "method": "Anatomia",
    "link": "https://biodigital.com",
    "bncc": "EF08CI07"
  },
  {
    "tool": "Visible Body",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Modelos de anatomia 3D",
    "method": "Anatomia Humana",
    "link": "https://visiblebody.com",
    "bncc": "EF08CI07"
  },
  {
    "tool": "Anki",
    "category": "Organização",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Flashcards de repetição espaçada",
    "method": "Memorização Ativa",
    "link": "https://apps.ankiweb.net",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "Quizlet",
    "category": "Organização",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Estudo de vocabulário com flashcards",
    "method": "Aprendizagem de Idiomas",
    "link": "https://quizlet.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Memrise",
    "category": "Organização",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Prática de vocabulário nativo",
    "method": "Língua Estrangeira",
    "link": "https://memrise.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Duolingo",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Prática gamificada de idiomas",
    "method": "Língua Inglesa",
    "link": "https://duolingo.com",
    "bncc": "EF06LI01"
  },
  {
    "tool": "Babbel",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Prática de conversação em idiomas",
    "method": "Linguagem Oral",
    "link": "https://babbel.com",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "Grammarly",
    "category": "Leitura",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Melhoria da escrita e gramática",
    "method": "Escrita Acadêmica",
    "link": "https://grammarly.com",
    "bncc": "EM13LGG102"
  },
  {
    "tool": "Hemingway Editor",
    "category": "Leitura",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Melhorar clareza de textos",
    "method": "Redação",
    "link": "https://hemingwayapp.com",
    "bncc": "EM13LGG102"
  },
  {
    "tool": "Sudowrite",
    "category": "AI",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Suporte à escrita criativa com IA",
    "method": "Literatura Digital",
    "link": "https://sudowrite.com",
    "bncc": "EM13LGG104"
  },
  {
    "tool": "Quillbot",
    "category": "AI",
    "subject": "Línguas",
    "grade": "8-EM",
    "lesson": "Prática de paráfrase e resumo",
    "method": "Escrita",
    "link": "https://quillbot.com",
    "bncc": "EM13LGG102"
  },
  {
    "tool": "Turnitin",
    "category": "Pesquisa",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Detecção de plágio e integridade",
    "method": "Ética na Pesquisa",
    "link": "https://turnitin.com",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Perusall",
    "category": "Leitura",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Anotação colaborativa de textos",
    "method": "Leitura Dialógica",
    "link": "https://perusall.com",
    "bncc": "EM13LGG101"
  },
  {
    "tool": "Edmodo",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Discussões de classe e tarefas",
    "method": "LMS",
    "link": "https://edmodo.com",
    "bncc": "EF69LP11"
  },
  {
    "tool": "Google Classroom",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Gestão de tarefas e materiais",
    "method": "LMS",
    "link": "https://classroom.google.com",
    "bncc": "EF69LP11"
  },
  {
    "tool": "Moodle",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Gestão de cursos online",
    "method": "EAD",
    "link": "https://moodle.org",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Canvas LMS",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Cursos online e avaliações",
    "method": "Gestão de Aprendizagem",
    "link": "https://instructure.com/canvas",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Schoology",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Salas de aula digitais integradas",
    "method": "LMS",
    "link": "https://schoology.com",
    "bncc": "EF69LP11"
  },
  {
    "tool": "Seesaw",
    "category": "Plataforma",
    "subject": "Fundamental",
    "grade": "3-6",
    "lesson": "Documentação de aprendizagem",
    "method": "Portfólio Digital",
    "link": "https://web.seesaw.me",
    "bncc": "EF15AR26"
  },
  {
    "tool": "Bulb Digital Portfolios",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Portfólios de estudantes",
    "method": "Avaliação Somativa",
    "link": "https://bulbapp.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Portfolium",
    "category": "Organização",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Vitrine de projetos acadêmicos",
    "method": "Carreira",
    "link": "https://portfolium.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Behance",
    "category": "Design",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Exibição de trabalhos criativos",
    "method": "Portfólio de Arte",
    "link": "https://behance.net",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Dribbble",
    "category": "Design",
    "subject": "Design",
    "grade": "8-EM",
    "lesson": "Compartilhamento de designs de interface",
    "method": "UX Design",
    "link": "https://dribbble.com",
    "bncc": "EM13AR02"
  },
  {
    "tool": "CodeSandbox",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Experimentos de código web online",
    "method": "Desenvolvimento Software",
    "link": "https://codesandbox.io",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "StackBlitz",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Ambiente de desenvolvimento online",
    "method": "Web Dev",
    "link": "https://stackblitz.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Observable Plot",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Gráficos interativos para web",
    "method": "Data Viz",
    "link": "https://observablehq.com/plot",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "RAWGraphs",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Criação de gráficos complexos",
    "method": "Visualização de Dados",
    "link": "https://rawgraphs.io",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "Flourish Studio",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "9-EM",
    "lesson": "Storytelling com visualização de dados",
    "method": "Comunicação de Dados",
    "link": "https://flourish.studio",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "StoryMapJS",
    "category": "Mídia",
    "subject": "História",
    "grade": "7-9",
    "lesson": "Narrativa geográfica interativa",
    "method": "Storytelling digital",
    "link": "https://storymap.knightlab.com",
    "bncc": "EF08HI02"
  },
  {
    "tool": "TimelineJS",
    "category": "Mídia",
    "subject": "História",
    "grade": "7-EM",
    "lesson": "Linhas do tempo interativas",
    "method": "História Visual",
    "link": "https://timeline.knightlab.com",
    "bncc": "EF08HI01"
  },
  {
    "tool": "Kumu",
    "category": "Diagramas",
    "subject": "Interdisciplinar",
    "grade": "9-EM",
    "lesson": "Mapas de pensamento sistêmico",
    "method": "Análise de Sistemas",
    "link": "https://kumu.io",
    "bncc": "EM13CHS603"
  },
  {
    "tool": "Obsidian",
    "category": "Organização",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Bases de conhecimento pessoal",
    "method": "Gestão do Conhecimento",
    "link": "https://obsidian.md",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Roam Research",
    "category": "Organização",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Notas em rede para pesquisa",
    "method": "Pensamento Conectado",
    "link": "https://roamresearch.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Logseq",
    "category": "Organização",
    "subject": "EM",
    "grade": "EM",
    "lesson": "Cadernos de pesquisa de código aberto",
    "method": "Privacidade de Dados",
    "link": "https://logseq.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Superblocks",
    "category": "No-Code",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Construção de dashboards internos",
    "method": "App Dev",
    "link": "https://superblocks.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Bubble",
    "category": "No-Code",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Criação de web apps completos",
    "method": "Desenvolvimento No-Code",
    "link": "https://bubble.io",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Webflow",
    "category": "No-Code",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Design e desenvolvimento web visual",
    "method": "Web Design",
    "link": "https://webflow.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Framer",
    "category": "No-Code",
    "subject": "Tecnologia",
    "grade": "9-EM",
    "lesson": "Sites interativos e protótipos",
    "method": "Design de Interface",
    "link": "https://framer.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Socrative",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Avaliação rápida digital",
    "method": "Avaliação formativa",
    "link": "https://socrative.com",
    "bncc": "EF69LP30"
  },
  {
    "tool": "Luma AI",
    "category": "AI",
    "subject": "Artes",
    "grade": "8-EM",
    "lesson": "Criar modelos 3D com IA",
    "method": "Exploração criativa",
    "link": "https://lumalabs.ai",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Polycam",
    "category": "Maker",
    "subject": "STEAM",
    "grade": "7-EM",
    "lesson": "Escaneamento 3D de objetos",
    "method": "Exploração tecnológica",
    "link": "https://polycam.ai",
    "bncc": "EM13CNT207"
  },
  {
    "tool": "Zappar",
    "category": "AR",
    "subject": "Interdisciplinar",
    "grade": "7-9",
    "lesson": "Experiências AR educativas",
    "method": "Aprendizagem imersiva",
    "link": "https://zappar.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Storybird",
    "category": "Media",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Escrita criativa com ilustrações",
    "method": "Storytelling",
    "link": "https://storybird.com",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Twine",
    "category": "Media",
    "subject": "Português",
    "grade": "7-9",
    "lesson": "Criar histórias interativas",
    "method": "Narrativa não linear",
    "link": "https://twinery.org",
    "bncc": "EF69LP07"
  },
  {
    "tool": "Code.org (K-5)",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "1-5",
    "lesson": "Atividades de programação em blocos temáticos",
    "method": "Pensamento computacional",
    "link": "https://code.org",
    "bncc": "EF01MA01"
  },
  {
    "tool": "Lightbot",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "1-4",
    "lesson": "Resolver puzzles com comandos de programação",
    "method": "Gamificação",
    "link": "https://lightbot.com",
    "bncc": "EF02MA03"
  },
  {
    "tool": "Kodable",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "1-5",
    "lesson": "Programação visual para crianças",
    "method": "Jogos educativos",
    "link": "https://kodable.com",
    "bncc": "EF03MA01"
  },
  {
    "tool": "Tynker Jr",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "2-5",
    "lesson": "Aprender lógica de programação por jogos",
    "method": "Pensamento computacional",
    "link": "https://tynker.com",
    "bncc": "EF03MA01"
  },
  {
    "tool": "Cubetto",
    "category": "Maker",
    "subject": "Tecnologia",
    "grade": "1-3",
    "lesson": "Robótica tátil sem tela para primeiros passos",
    "method": "Aprendizagem lúdica",
    "link": "https://primotoys.com",
    "bncc": "EF01MA03"
  },
  {
    "tool": "Bee-Bot",
    "category": "Maker",
    "subject": "Tecnologia",
    "grade": "1-3",
    "lesson": "Robô de chão para sequências e direções",
    "method": "Pensamento computacional",
    "link": "https://bee-bot.us",
    "bncc": "EF02MA12"
  },
  {
    "tool": "Dash Robot",
    "category": "Maker",
    "subject": "Tecnologia",
    "grade": "3-6",
    "lesson": "Programar robô físico com blocos ou Scratch",
    "method": "STEAM",
    "link": "https://makewonder.com",
    "bncc": "EF05CI01"
  },
  {
    "tool": "Ozobot",
    "category": "Maker",
    "subject": "Ciências",
    "grade": "3-6",
    "lesson": "Robô de linha programado com marcadores",
    "method": "Aprendizagem maker",
    "link": "https://ozobot.com",
    "bncc": "EF05CI01"
  },
  {
    "tool": "Starfall",
    "category": "Leitura",
    "subject": "Português",
    "grade": "1-3",
    "lesson": "Praticar leitura e fonética interativa",
    "method": "Aprendizagem lúdica",
    "link": "https://starfall.com",
    "bncc": "EF01LP03"
  },
  {
    "tool": "Learning A-Z",
    "category": "Leitura",
    "subject": "Português",
    "grade": "1-5",
    "lesson": "Leitura por níveis com livros digitais",
    "method": "Diferenciação pedagógica",
    "link": "https://learninga-z.com",
    "bncc": "EF03LP01"
  },
  {
    "tool": "Epic! Books",
    "category": "Leitura",
    "subject": "Português",
    "grade": "1-5",
    "lesson": "Biblioteca digital gamificada para crianças",
    "method": "Letramento Digital",
    "link": "https://getepic.com",
    "bncc": "EF02LP01"
  },
  {
    "tool": "ReadWorks",
    "category": "Leitura",
    "subject": "Português",
    "grade": "3-6",
    "lesson": "Textos graduados com questões de compreensão",
    "method": "Leitura Crítica",
    "link": "https://readworks.org",
    "bncc": "EF04LP06"
  },
  {
    "tool": "Raz-Kids",
    "category": "Leitura",
    "subject": "Português",
    "grade": "1-5",
    "lesson": "Leitura adaptativa com gravação de voz",
    "method": "Avaliação formativa",
    "link": "https://raz-kids.com",
    "bncc": "EF02LP04"
  },
  {
    "tool": "Book Creator (Primário)",
    "category": "Mídia",
    "subject": "Português",
    "grade": "2-5",
    "lesson": "Criar livros digitais ilustrados",
    "method": "Escrita Criativa",
    "link": "https://bookcreator.com",
    "bncc": "EF03LP15"
  },
  {
    "tool": "Story Bird Jr",
    "category": "Mídia",
    "subject": "Português",
    "grade": "2-5",
    "lesson": "Escrever histórias com ilustrações digitais",
    "method": "Narrativa Digital",
    "link": "https://storybird.com",
    "bncc": "EF04LP13"
  },
  {
    "tool": "Khan Academy Kids",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "1-5",
    "lesson": "Atividades adaptativas de matemática e leitura",
    "method": "Aprendizagem adaptativa",
    "link": "https://khanacademy.org/kids",
    "bncc": "EF01MA01"
  },
  {
    "tool": "Prodigy Math",
    "category": "Gamificação",
    "subject": "Matemática",
    "grade": "1-8",
    "lesson": "RPG matemático adaptativo",
    "method": "Gamificação",
    "link": "https://prodigygame.com",
    "bncc": "EF03MA01"
  },
  {
    "tool": "IXL Math",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "1-9",
    "lesson": "Exercícios adaptativos por série e habilidade",
    "method": "Prática deliberada",
    "link": "https://ixl.com",
    "bncc": "EF04MA01"
  },
  {
    "tool": "DreamBox",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "1-8",
    "lesson": "Ensino adaptativo de matemática com IA",
    "method": "Aprendizagem adaptativa",
    "link": "https://dreambox.com",
    "bncc": "EF03MA02"
  },
  {
    "tool": "ST Math",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "1-8",
    "lesson": "Matemática visual sem linguagem",
    "method": "Gamificação",
    "link": "https://stmath.com",
    "bncc": "EF05MA01"
  },
  {
    "tool": "Math Playground",
    "category": "Gamificação",
    "subject": "Matemática",
    "grade": "1-6",
    "lesson": "Jogos de lógica e raciocínio matemático",
    "method": "Aprendizagem lúdica",
    "link": "https://mathplayground.com",
    "bncc": "EF04MA12"
  },
  {
    "tool": "Number Pieces",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "1-5",
    "lesson": "Manipulação virtual de blocos de valor posicional",
    "method": "Concretização",
    "link": "https://apps.mathlearningcenter.org",
    "bncc": "EF02MA03"
  },
  {
    "tool": "Geoboard",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "2-5",
    "lesson": "Explorar geometria com elásticos virtuais",
    "method": "Exploração matemática",
    "link": "https://apps.mathlearningcenter.org",
    "bncc": "EF03MA14"
  },
  {
    "tool": "Fraction Bars",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "3-6",
    "lesson": "Visualizar e comparar frações",
    "method": "Representação Concreta",
    "link": "https://mathlearningcenter.org",
    "bncc": "EF04MA07"
  },
  {
    "tool": "Mystery Science",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "3-6",
    "lesson": "Investigações científicas guiadas e fenômenos",
    "method": "Inquiry-based learning",
    "link": "https://mysteryscience.com",
    "bncc": "EF05CI05"
  },
  {
    "tool": "BrainPOP Jr",
    "category": "Plataforma",
    "subject": "Ciências",
    "grade": "1-5",
    "lesson": "Vídeos e quiz sobre ciências e natureza",
    "method": "Aprendizagem ativa",
    "link": "https://jr.brainpop.com",
    "bncc": "EF03CI01"
  },
  {
    "tool": "iNaturalist",
    "category": "Dados",
    "subject": "Ciências",
    "grade": "4-9",
    "lesson": "Identificar e catalogar seres vivos da natureza",
    "method": "Ciência Cidadã",
    "link": "https://inaturalist.org",
    "bncc": "EF05CI07"
  },
  {
    "tool": "NASA Kids Club",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "3-6",
    "lesson": "Jogos e exploração espacial para crianças",
    "method": "Aprendizagem lúdica",
    "link": "https://nasa.gov/kids",
    "bncc": "EF04CI01"
  },
  {
    "tool": "Wonderopolis",
    "category": "Leitura",
    "subject": "Ciências",
    "grade": "3-7",
    "lesson": "Investigar curiosidades científicas do cotidiano",
    "method": "Inquiry-based learning",
    "link": "https://wonderopolis.org",
    "bncc": "EF05CI01"
  },
  {
    "tool": "Canva for Education (Kids)",
    "category": "Design",
    "subject": "Artes",
    "grade": "3-6",
    "lesson": "Criar cartazes, colagens e projetos visuais",
    "method": "Expressão criativa",
    "link": "https://canva.com",
    "bncc": "EF15AR01"
  },
  {
    "tool": "Drawastic",
    "category": "Design",
    "subject": "Artes",
    "grade": "1-5",
    "lesson": "Desenho colaborativo em tempo real",
    "method": "Arte digital",
    "link": "https://drawastic.com",
    "bncc": "EF01AR01"
  },
  {
    "tool": "Tux Paint",
    "category": "Design",
    "subject": "Artes",
    "grade": "1-4",
    "lesson": "Programa de pintura digital infantil",
    "method": "Arte digital",
    "link": "https://tuxpaint.org",
    "bncc": "EF02AR01"
  },
  {
    "tool": "Google AutoDraw",
    "category": "Design",
    "subject": "Artes",
    "grade": "1-5",
    "lesson": "Desenho assistido por IA para crianças",
    "method": "Expressão criativa",
    "link": "https://autodraw.com",
    "bncc": "EF03AR01"
  },
  {
    "tool": "Chrome Music Lab",
    "category": "Música",
    "subject": "Artes",
    "grade": "1-6",
    "lesson": "Explorar sons, ritmo e melodia de forma visual",
    "method": "Educação musical",
    "link": "https://musiclab.chromeexperiments.com",
    "bncc": "EF01AR11"
  },
  {
    "tool": "Incredibox",
    "category": "Música",
    "subject": "Artes",
    "grade": "3-7",
    "lesson": "Criar beatbox e música com arraste e solte",
    "method": "Educação musical",
    "link": "https://incredibox.com",
    "bncc": "EF03AR17"
  },
  {
    "tool": "Scratch (Animações)",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "4-7",
    "lesson": "Criar animações e histórias interativas",
    "method": "Narrativa digital",
    "link": "https://scratch.mit.edu",
    "bncc": "EF05AR04"
  },
  {
    "tool": "Stop Motion Studio (Kids)",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "3-6",
    "lesson": "Criar animações stop motion com fotos",
    "method": "Arte Audiovisual",
    "link": "https://stopmotionstudio.com",
    "bncc": "EF05AR35"
  },
  {
    "tool": "Nearpod (Primário)",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "1-5",
    "lesson": "Aulas interativas com atividades e enquetes",
    "method": "Instrução ativa",
    "link": "https://nearpod.com",
    "bncc": "EF05LP30"
  },
  {
    "tool": "Kahoot (Primário)",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "2-5",
    "lesson": "Quiz e revisão de conteúdos de forma lúdica",
    "method": "Gamificação",
    "link": "https://kahoot.com",
    "bncc": "EF04LP30"
  },
  {
    "tool": "Classcraft (Primário)",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "3-6",
    "lesson": "Sistema de pontos e missões para engajamento",
    "method": "Gamificação",
    "link": "https://classcraft.com",
    "bncc": "EF05LP12"
  },
  {
    "tool": "Flipgrid (Primário)",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "3-6",
    "lesson": "Gravação de vídeos curtos e respostas em vídeo",
    "method": "Comunicação oral",
    "link": "https://flip.com",
    "bncc": "EF05LP08"
  },
  {
    "tool": "Padlet (Primário)",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "3-6",
    "lesson": "Mural colaborativo digital para projetos",
    "method": "Aprendizagem colaborativa",
    "link": "https://padlet.com",
    "bncc": "EF05LP11"
  },
  {
    "tool": "Jamboard (Primário)",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "3-5",
    "lesson": "Brainstorm coletivo com post-its digitais",
    "method": "Colaboração digital",
    "link": "https://jamboard.google.com",
    "bncc": "EF05LP11"
  },
  {
    "tool": "Google Slides (Primário)",
    "category": "Apresentação",
    "subject": "Interdisciplinar",
    "grade": "3-6",
    "lesson": "Apresentações simples de projetos e pesquisas",
    "method": "Comunicação Multimodal",
    "link": "https://slides.google.com",
    "bncc": "EF05LP08"
  },
  {
    "tool": "ClassDojo",
    "category": "Plataforma",
    "subject": "Gestão",
    "grade": "1-6",
    "lesson": "Gestão de comportamento e comunicação com famílias",
    "method": "Gestão de sala",
    "link": "https://classdojo.com",
    "bncc": "EF05LP11"
  },
  {
    "tool": "Tynker",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "6-9",
    "lesson": "Criar jogos, apps e mods de Minecraft",
    "method": "Pensamento computacional",
    "link": "https://tynker.com",
    "bncc": "EF07CI06"
  },
  {
    "tool": "p5.js",
    "category": "Coding",
    "subject": "Artes",
    "grade": "7-9",
    "lesson": "Programação criativa e arte generativa",
    "method": "Arte digital",
    "link": "https://p5js.org",
    "bncc": "EF07AR35"
  },
  {
    "tool": "Processing",
    "category": "Coding",
    "subject": "Artes",
    "grade": "8-9",
    "lesson": "Criar arte e visualizações com programação",
    "method": "Arte generativa",
    "link": "https://processing.org",
    "bncc": "EF08AR35"
  },
  {
    "tool": "micro:bit MakeCode",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "6-9",
    "lesson": "Programar microcontrolador com blocos visuais",
    "method": "STEAM",
    "link": "https://makecode.microbit.org",
    "bncc": "EF07CI05"
  },
  {
    "tool": "Snap!",
    "category": "Coding",
    "subject": "Matemática",
    "grade": "7-9",
    "lesson": "Programação em blocos avançada com listas",
    "method": "Pensamento computacional",
    "link": "https://snap.berkeley.edu",
    "bncc": "EF08MA11"
  },
  {
    "tool": "Khan Academy (Fund.)",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "6-9",
    "lesson": "Exercícios adaptativos de todas as disciplinas",
    "method": "Aprendizagem adaptativa",
    "link": "https://khanacademy.org",
    "bncc": "EF06MA01"
  },
  {
    "tool": "Brilliant.org",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "7-EM",
    "lesson": "Raciocínio matemático e lógico interativo",
    "method": "Resolução de problemas",
    "link": "https://brilliant.org",
    "bncc": "EF08MA01"
  },
  {
    "tool": "Photomath",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "7-9",
    "lesson": "Resolução passo a passo de equações com câmera",
    "method": "Instrução direta",
    "link": "https://photomath.com",
    "bncc": "EF07MA08"
  },
  {
    "tool": "Mathway",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "8-9",
    "lesson": "Solucionador avançado de problemas matemáticos",
    "method": "Suporte ao estudo",
    "link": "https://mathway.com",
    "bncc": "EF09MA01"
  },
  {
    "tool": "CK-12",
    "category": "Plataforma",
    "subject": "Ciências",
    "grade": "6-9",
    "lesson": "Livros didáticos digitais flexíveis e simulações",
    "method": "Recursos abertos",
    "link": "https://ck12.org",
    "bncc": "EF08CI01"
  },
  {
    "tool": "BrainPOP",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Vídeos animados e quizzes multidisciplinares",
    "method": "Aprendizagem ativa",
    "link": "https://brainpop.com",
    "bncc": "EF07GE01"
  },
  {
    "tool": "National Geographic Kids",
    "category": "Leitura",
    "subject": "Ciências",
    "grade": "4-8",
    "lesson": "Artigos e vídeos sobre natureza e ciência",
    "method": "Letramento científico",
    "link": "https://kids.nationalgeographic.com",
    "bncc": "EF07CI01"
  },
  {
    "tool": "Minecraft Education (STEM)",
    "category": "Gamification",
    "subject": "Ciências",
    "grade": "6-9",
    "lesson": "Explorar biomas e biodiversidade em mundo virtual",
    "method": "Aprendizagem baseada em jogos",
    "link": "https://education.minecraft.net",
    "bncc": "EF07CI03"
  },
  {
    "tool": "Socratic by Google",
    "category": "AI",
    "subject": "Interdisciplinar",
    "grade": "7-9",
    "lesson": "Tirar dúvidas de qualquer disciplina com IA",
    "method": "Tutor IA",
    "link": "https://socratic.org",
    "bncc": "EF08MA01"
  },
  {
    "tool": "Quizlet Live",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Jogo colaborativo com flashcards",
    "method": "Aprendizagem colaborativa",
    "link": "https://quizlet.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "Formative",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Avaliação formativa em tempo real",
    "method": "Avaliação para aprendizagem",
    "link": "https://goformative.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "Classkick",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Feedback individual em tempo real",
    "method": "Avaliação formativa",
    "link": "https://classkick.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "Newsela",
    "category": "Leitura",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Artigos jornalísticos em níveis de leitura",
    "method": "Letramento crítico",
    "link": "https://newsela.com",
    "bncc": "EF06LP01"
  },
  {
    "tool": "CommonLit",
    "category": "Leitura",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Leitura literária com questões guiadas",
    "method": "Literatura",
    "link": "https://commonlit.org",
    "bncc": "EF06LP14"
  },
  {
    "tool": "Storyboard That (Fund.)",
    "category": "Mídia",
    "subject": "Português",
    "grade": "6-8",
    "lesson": "Criar quadrinhos e narrativas visuais",
    "method": "Narrativa Visual",
    "link": "https://storyboardthat.com",
    "bncc": "EF06LP06"
  },
  {
    "tool": "Sketchnoting",
    "category": "Design",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Anotações visuais para síntese de conteúdo",
    "method": "Visual thinking",
    "link": "https://sketchnotinglesson.com",
    "bncc": "EF06LP23"
  },
  {
    "tool": "Google Arts & Culture",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-EM",
    "lesson": "Explorar museus e obras de arte virtualmente",
    "method": "Patrimônio Cultural",
    "link": "https://artsandculture.google.com",
    "bncc": "EF69AR25"
  },
  {
    "tool": "Artsteps",
    "category": "VR",
    "subject": "Artes",
    "grade": "7-EM",
    "lesson": "Criar exposições virtuais 3D",
    "method": "Arte Imersiva",
    "link": "https://artsteps.com",
    "bncc": "EF07AR35"
  },
  {
    "tool": "Flat for Education",
    "category": "Música",
    "subject": "Artes",
    "grade": "6-9",
    "lesson": "Partitura colaborativa em tempo real",
    "method": "Composição musical",
    "link": "https://flat.io",
    "bncc": "EF06AR19"
  },
  {
    "tool": "Chrome Music Lab (Fund.)",
    "category": "Música",
    "subject": "Artes",
    "grade": "5-8",
    "lesson": "Explorar harmonia, espectro e ritmo interativo",
    "method": "Educação musical",
    "link": "https://musiclab.chromeexperiments.com",
    "bncc": "EF06AR17"
  },
  {
    "tool": "WeVideo (Fund.)",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "6-9",
    "lesson": "Edição de vídeo colaborativa na nuvem",
    "method": "Produção audiovisual",
    "link": "https://wevideo.com",
    "bncc": "EF06LP07"
  },
  {
    "tool": "Adobe Spark Video",
    "category": "Mídia",
    "subject": "Português",
    "grade": "6-9",
    "lesson": "Vídeos explicativos e narrativas digitais",
    "method": "Storytelling",
    "link": "https://adobe.com/express",
    "bncc": "EF07LP07"
  },
  {
    "tool": "Piktochart",
    "category": "Design",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Infográficos e visualizações de dados",
    "method": "Data literacy",
    "link": "https://piktochart.com",
    "bncc": "EF07LP23"
  },
  {
    "tool": "Visme",
    "category": "Design",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Infográficos e apresentações interativas",
    "method": "Comunicação visual",
    "link": "https://visme.co",
    "bncc": "EF08LP23"
  },
  {
    "tool": "Sutori",
    "category": "Mídia",
    "subject": "História",
    "grade": "7-9",
    "lesson": "Criar linhas do tempo e histórias interativas",
    "method": "Narrativa histórica",
    "link": "https://sutori.com",
    "bncc": "EF07HI01"
  },
  {
    "tool": "Maps of the World",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "6-9",
    "lesson": "Explorar dados geopolíticos e demográficos",
    "method": "Cartografia digital",
    "link": "https://maps-of-world.com",
    "bncc": "EF07GE07"
  },
  {
    "tool": "Seterra",
    "category": "Gamificação",
    "subject": "Geografia",
    "grade": "6-9",
    "lesson": "Jogos de geografia: países, capitais e mapas",
    "method": "Aprendizagem lúdica",
    "link": "https://seterra.com",
    "bncc": "EF07GE01"
  },
  {
    "tool": "World Geographic Quiz",
    "category": "Gamificação",
    "subject": "Geografia",
    "grade": "6-9",
    "lesson": "Quizzes interativos de localização no mapa",
    "method": "Gamificação",
    "link": "https://worldgeographicquiz.com",
    "bncc": "EF07GE01"
  },
  {
    "tool": "Econedlink",
    "category": "Simulação",
    "subject": "Ciências Humanas",
    "grade": "7-9",
    "lesson": "Simulações de economia e finanças pessoais",
    "method": "Educação financeira",
    "link": "https://econedlink.org",
    "bncc": "EF09CH01"
  },
  {
    "tool": "iCivics",
    "category": "Gamificação",
    "subject": "Ciências Humanas",
    "grade": "7-9",
    "lesson": "Jogos sobre democracia, governo e cidadania",
    "method": "Cidadania digital",
    "link": "https://icivics.org",
    "bncc": "EF09CH07"
  },
  {
    "tool": "Wolfram Mathematica",
    "category": "Cálculo",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Cálculo, álgebra simbólica e estatística avançada",
    "method": "Investigação Matemática",
    "link": "https://wolfram.com/mathematica",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "GeoGebra 3D",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Explorar geometria espacial e cálculo gráfico",
    "method": "Modelagem matemática",
    "link": "https://geogebra.org",
    "bncc": "EM13MAT106"
  },
  {
    "tool": "Symbolab",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Resolução passo a passo de cálculo e álgebra",
    "method": "Estudo autônomo",
    "link": "https://symbolab.com",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Casio ClassPad.net",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Calculadora científica e CAS online gratuita",
    "method": "Investigação matemática",
    "link": "https://classpad.net",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Overleaf",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Edição colaborativa de documentos científicos LaTeX",
    "method": "Metodologia científica",
    "link": "https://overleaf.com",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Observable HQ",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Notebooks de análise de dados interativos",
    "method": "Data Science",
    "link": "https://observablehq.com",
    "bncc": "EM13MAT405"
  },
  {
    "tool": "RStudio",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Análise estatística e visualização de dados com R",
    "method": "Estatística Aplicada",
    "link": "https://posit.co",
    "bncc": "EM13MAT402"
  },
  {
    "tool": "SPSS (versão estudante)",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Análise estatística aplicada à pesquisa",
    "method": "Metodologia Científica",
    "link": "https://ibm.com/spss",
    "bncc": "EM13MAT402"
  },
  {
    "tool": "Google Colab",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Notebooks Python no navegador para ciência de dados",
    "method": "Ciência de Dados",
    "link": "https://colab.research.google.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Pandas Tutor",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Visualizar passo a passo de operações Pandas",
    "method": "Ensino de programação",
    "link": "https://pandastutor.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "PASCO Scientific",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Sensores e coleta de dados experimentais",
    "method": "Laboratório digital",
    "link": "https://pasco.com",
    "bncc": "EM13CNT101"
  },
  {
    "tool": "Vernier Graphical Analysis",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Coleta e análise de dados de laboratório",
    "method": "Ciência Experimental",
    "link": "https://vernier.com",
    "bncc": "EM13CNT101"
  },
  {
    "tool": "Stellarium",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Planetário virtual e observação astronômica",
    "method": "Astronomia",
    "link": "https://stellarium.org",
    "bncc": "EM13CNT104"
  },
  {
    "tool": "CHEMIX",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Montar e simular experimentos de química",
    "method": "Química experimental",
    "link": "https://chemix.org",
    "bncc": "EM13CNT201"
  },
  {
    "tool": "Molview",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Visualizar moléculas 3D e estruturas químicas",
    "method": "Química",
    "link": "https://molview.org",
    "bncc": "EM13CNT201"
  },
  {
    "tool": "PhET (EM)",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Simular circuitos, ondas, eletricidade e termodinâmica",
    "method": "Física experimental",
    "link": "https://phet.colorado.edu",
    "bncc": "EM13CNT101"
  },
  {
    "tool": "OEIS",
    "category": "Dados",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Explorar sequências numéricas para investigação matemática",
    "method": "Pensamento matemático",
    "link": "https://oeis.org",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Grok Academy",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Aprender programação Python e web com projetos",
    "method": "Programação",
    "link": "https://grokacademy.org",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "CS50 Harvard",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Ciência da computação para iniciantes",
    "method": "Pensamento computacional",
    "link": "https://cs50.harvard.edu",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Coursera for Students",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "MOOCs de universidades para aprendizagem autônoma",
    "method": "Aprendizagem autônoma",
    "link": "https://coursera.org",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "edX",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Cursos universitários abertos e gratuitos",
    "method": "Aprendizagem autônoma",
    "link": "https://edx.org",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "MIT OpenCourseWare",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Materiais gratuitos de cursos do MIT",
    "method": "Estudo dirigido",
    "link": "https://ocw.mit.edu",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Khan Academy (EM)",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Preparação para vestibular e ENEM adaptativa",
    "method": "Aprendizagem adaptativa",
    "link": "https://khanacademy.org",
    "bncc": "EM13MAT301"
  },
  {
    "tool": "Descomplica",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Aulas gamificadas para vestibular e ENEM",
    "method": "Preparação vestibular",
    "link": "https://descomplica.com.br",
    "bncc": "EM13MAT301"
  },
  {
    "tool": "Stoodi",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Plataforma adaptativa para ENEM e vestibulares",
    "method": "Estudo adaptativo",
    "link": "https://stoodi.com.br",
    "bncc": "EM13MAT301"
  },
  {
    "tool": "Redação Online",
    "category": "Plataforma",
    "subject": "Português",
    "grade": "EM",
    "lesson": "Prática de redação com correção automatizada",
    "method": "Escrita Acadêmica",
    "link": "https://redacaoonline.com.br",
    "bncc": "EM13LP01"
  },
  {
    "tool": "Pensador",
    "category": "Leitura",
    "subject": "Português",
    "grade": "EM",
    "lesson": "Frases, citações e obras literárias para estudo",
    "method": "Literatura",
    "link": "https://pensador.com",
    "bncc": "EM13LP14"
  },
  {
    "tool": "Domínio Público",
    "category": "Leitura",
    "subject": "Português",
    "grade": "EM",
    "lesson": "Biblioteca digital gratuita de obras clássicas",
    "method": "Letramento literário",
    "link": "https://dominiopublico.gov.br",
    "bncc": "EM13LP14"
  },
  {
    "tool": "Skoob",
    "category": "Leitura",
    "subject": "Português",
    "grade": "EM",
    "lesson": "Rede social de leitura e clube do livro virtual",
    "method": "Incentivo à leitura",
    "link": "https://skoob.com.br",
    "bncc": "EM13LP14"
  },
  {
    "tool": "Miro (EM)",
    "category": "Colaboração",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Mapeamento de sistemas e projetos complexos",
    "method": "Design Thinking",
    "link": "https://miro.com",
    "bncc": "EM13CHS603"
  },
  {
    "tool": "Notion (EM)",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Wiki e base de conhecimento para projetos de pesquisa",
    "method": "Gestão do conhecimento",
    "link": "https://notion.so",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Scrintal",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Mapas mentais e notas conectadas para pesquisa",
    "method": "Pensamento sistêmico",
    "link": "https://scrintal.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Zettelkasten.de",
    "category": "Organização",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Método de notas atômicas para pesquisa acadêmica",
    "method": "Gestão do conhecimento",
    "link": "https://zettelkasten.de",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Figma (EM)",
    "category": "Design",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Prototipagem e design de interfaces digitais",
    "method": "Design centrado no usuário",
    "link": "https://figma.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Adobe XD",
    "category": "Design",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Prototipagem de interfaces e UX design",
    "method": "Design de produto",
    "link": "https://adobe.com/xd",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Autodesk Inventor",
    "category": "Design 3D",
    "subject": "Engenharia",
    "grade": "EM",
    "lesson": "Modelagem mecânica avançada e simulação",
    "method": "Engenharia",
    "link": "https://autodesk.com/inventor",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Solidworks (Estudante)",
    "category": "Design 3D",
    "subject": "Engenharia",
    "grade": "EM",
    "lesson": "CAD paramétrico para projetos de engenharia",
    "method": "Engenharia mecânica",
    "link": "https://solidworks.com",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Grasshopper",
    "category": "Coding",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Aprender JavaScript com puzzles no celular",
    "method": "Programação",
    "link": "https://grasshopper.app",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Mimo",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Aprender Python, HTML e SQL com microaulas",
    "method": "Programação",
    "link": "https://getmimo.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Codecademy",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Cursos de programação interativos e projetos",
    "method": "Desenvolvimento de software",
    "link": "https://codecademy.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Rosetta Stone",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "EM",
    "lesson": "Imersão em idiomas com reconhecimento de voz",
    "method": "Língua estrangeira",
    "link": "https://rosettastone.com",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "Italki",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "EM",
    "lesson": "Conversação com falantes nativos online",
    "method": "Prática oral de idioma",
    "link": "https://italki.com",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "Yabla",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "EM",
    "lesson": "Aprender idiomas com vídeos autênticos e legendas",
    "method": "Aprendizagem contextual",
    "link": "https://yabla.com",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "LangCorrect",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "EM",
    "lesson": "Praticar escrita em idioma estrangeiro com falantes nativos",
    "method": "Escrita em idiomas",
    "link": "https://langcorrect.com",
    "bncc": "EM13LGG401"
  },
  {
    "tool": "Podcast.co",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Criar e distribuir podcasts escolares",
    "method": "Comunicação digital",
    "link": "https://podcast.co",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Anchor FM",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Criar podcasts com distribuição gratuita",
    "method": "Produção midiática",
    "link": "https://anchor.fm",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Canva Video",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "EM",
    "lesson": "Edição de vídeo e reels para projetos escolares",
    "method": "Produção criativa",
    "link": "https://canva.com",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Adobe Premiere Rush",
    "category": "Mídia",
    "subject": "Artes",
    "grade": "EM",
    "lesson": "Edição de vídeo profissional simplificada",
    "method": "Audiovisual",
    "link": "https://adobe.com/premiere-rush",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Artificial Intelligence 4K12",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Currículo de IA para estudantes do EM",
    "method": "Pensamento computacional",
    "link": "https://ai4k12.org",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Elements of AI",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Curso introdutório gratuito sobre IA e machine learning",
    "method": "Literacia em IA",
    "link": "https://elementsofai.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Teachable Machine (EM)",
    "category": "AI",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Treinar modelos de IA com imagens e sons",
    "method": "Ciência de dados",
    "link": "https://teachablemachine.withgoogle.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Roboflow",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Criar modelos de visão computacional com IA",
    "method": "Machine learning",
    "link": "https://roboflow.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Hugging Face Spaces",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Explorar e usar modelos de IA open source",
    "method": "IA aplicada",
    "link": "https://huggingface.co",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "Chatbot com Dialogflow",
    "category": "AI",
    "subject": "Tecnologia",
    "grade": "EM",
    "lesson": "Criar chatbots com processamento de linguagem natural",
    "method": "PLN educativo",
    "link": "https://dialogflow.cloud.google.com",
    "bncc": "EM13CNT303"
  },
  {
    "tool": "GIMP (EM)",
    "category": "Edição",
    "subject": "Artes",
    "grade": "EM",
    "lesson": "Edição profissional de imagens e composição",
    "method": "Arte digital",
    "link": "https://gimp.org",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Inkscape",
    "category": "Design",
    "subject": "Artes",
    "grade": "EM",
    "lesson": "Ilustração vetorial para artes e design gráfico",
    "method": "Artes visuais",
    "link": "https://inkscape.org",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Krita",
    "category": "Design",
    "subject": "Artes",
    "grade": "EM",
    "lesson": "Pintura digital e concept art",
    "method": "Arte digital",
    "link": "https://krita.org",
    "bncc": "EM13AR02"
  },
  {
    "tool": "Desmos Advanced",
    "category": "Simulação",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Explorar cálculo, trigonometria e análise gráfica",
    "method": "Investigação matemática",
    "link": "https://desmos.com",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Integral Calculator",
    "category": "Cálculo",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Resolver integrais com passo a passo",
    "method": "Cálculo",
    "link": "https://integral-calculator.com",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Matrix Calculator",
    "category": "Cálculo",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Operações com matrizes e transformações lineares",
    "method": "Álgebra linear",
    "link": "https://matrixcalculus.org",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "Nrich Maths",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Problemas e desafios matemáticos de alto nível",
    "method": "Resolução de problemas",
    "link": "https://nrich.maths.org",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "AoPS (Art of Problem Solving)",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "EM",
    "lesson": "Matemática competitiva e resolução avançada",
    "method": "Olimpíadas",
    "link": "https://artofproblemsolving.com",
    "bncc": "EM13MAT302"
  },
  {
    "tool": "PhilPapers",
    "category": "Pesquisa",
    "subject": "Ciências Humanas",
    "grade": "EM",
    "lesson": "Repositório de artigos filosóficos",
    "method": "Pesquisa acadêmica",
    "link": "https://philpapers.org",
    "bncc": "EM13CHS101"
  },
  {
    "tool": "Stanford Encyclopedia of Philosophy",
    "category": "Pesquisa",
    "subject": "Ciências Humanas",
    "grade": "EM",
    "lesson": "Enciclopédia filosófica de referência",
    "method": "Pesquisa académica",
    "link": "https://plato.stanford.edu",
    "bncc": "EM13CHS101"
  },
  {
    "tool": "Europeana",
    "category": "Leitura",
    "subject": "História",
    "grade": "EM",
    "lesson": "Acervo digital de patrimônio histórico europeu",
    "method": "Patrimônio cultural",
    "link": "https://europeana.eu",
    "bncc": "EM13CHS201"
  },
  {
    "tool": "Internet Archive",
    "category": "Pesquisa",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Repositório gratuito de livros, músicas e sites históricos",
    "method": "Pesquisa histórica",
    "link": "https://archive.org",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "Wikisource",
    "category": "Leitura",
    "subject": "Português",
    "grade": "EM",
    "lesson": "Textos históricos e literários em domínio público",
    "method": "Letramento literário",
    "link": "https://wikisource.org",
    "bncc": "EM13LP14"
  },
  {
    "tool": "Scielo",
    "category": "Pesquisa",
    "subject": "Ciências",
    "grade": "EM",
    "lesson": "Repositório de artigos científicos brasileiros",
    "method": "Pesquisa científica",
    "link": "https://scielo.br",
    "bncc": "EM13CNT301"
  },
  {
    "tool": "Portal CAPES",
    "category": "Pesquisa",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Acesso a periódicos científicos e teses",
    "method": "Pesquisa acadêmica",
    "link": "https://periodicos.capes.gov.br",
    "bncc": "EM13LGG701"
  },
  {
    "tool": "MEC Recursos Educacionais",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Repositório de recursos educacionais do MEC",
    "method": "Recursos abertos",
    "link": "https://rea.mec.gov.br",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "FNDE Educação",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EM",
    "lesson": "Programas e materiais do governo federal",
    "method": "Recursos educacionais",
    "link": "https://fnde.gov.br",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Yubb Educação",
    "category": "Plataforma",
    "subject": "Ciências Humanas",
    "grade": "8-EM",
    "lesson": "Simulações de investimentos e finanças pessoais",
    "method": "Educação financeira",
    "link": "https://yubb.com.br",
    "bncc": "EM13CHS301"
  },
  {
    "tool": "ENEF – Educação Financeira",
    "category": "Plataforma",
    "subject": "Ciências Humanas",
    "grade": "7-EM",
    "lesson": "Portal nacional de educação financeira do governo",
    "method": "Educação financeira",
    "link": "https://vidaedinheiro.gov.br",
    "bncc": "EM13CHS301"
  },
  {
    "tool": "MeConta",
    "category": "Plataforma",
    "subject": "Matemática",
    "grade": "7-EM",
    "lesson": "Simulador de finanças pessoais para jovens",
    "method": "Matemática financeira",
    "link": "https://meconta.com",
    "bncc": "EF09MA14"
  },
  {
    "tool": "JA Titan",
    "category": "Simulação",
    "subject": "Ciências Humanas",
    "grade": "8-EM",
    "lesson": "Simulação de gestão de empresa",
    "method": "Empreendedorismo",
    "link": "https://jasimulations.org",
    "bncc": "EM13CHS301"
  },
  {
    "tool": "Lemonade Stand",
    "category": "Gamificação",
    "subject": "Matemática",
    "grade": "5-8",
    "lesson": "Jogo de simulação empresarial simples",
    "method": "Educação financeira",
    "link": "https://coolmathgames.com",
    "bncc": "EF08MA14"
  },
  {
    "tool": "Strava EDU",
    "category": "Dados",
    "subject": "Educação Física",
    "grade": "7-EM",
    "lesson": "Rastrear e analisar atividade física",
    "method": "Saúde e movimento",
    "link": "https://strava.com",
    "bncc": "EM13CHS604"
  },
  {
    "tool": "Human Anatomy Atlas",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Explorar anatomia humana em 3D interativo",
    "method": "Anatomia",
    "link": "https://visiblebody.com",
    "bncc": "EF08CI07"
  },
  {
    "tool": "Netter's Anatomy",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "9-EM",
    "lesson": "Atlas anatômico digital para estudos avançados",
    "method": "Anatomia humana",
    "link": "https://netterimages.com",
    "bncc": "EM13CNT201"
  },
  {
    "tool": "Calm EDU",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Meditação e mindfulness para estudantes",
    "method": "Bem-estar",
    "link": "https://calm.com",
    "bncc": "EM13CHS604"
  },
  {
    "tool": "Global Forest Watch",
    "category": "Dados",
    "subject": "Ciências",
    "grade": "7-EM",
    "lesson": "Monitorar desmatamento e florestas globalmente",
    "method": "Sustentabilidade",
    "link": "https://globalforestwatch.org",
    "bncc": "EF09GE02"
  },
  {
    "tool": "Climate.nasa.gov",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "7-EM",
    "lesson": "Dados e visualizações sobre mudanças climáticas",
    "method": "Climatologia",
    "link": "https://climate.nasa.gov",
    "bncc": "EF09CI13"
  },
  {
    "tool": "Eyes on the Earth",
    "category": "Simulação",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Satélites da NASA em tempo real e dados ambientais",
    "method": "Geociências",
    "link": "https://eyes.nasa.gov",
    "bncc": "EM13CNT306"
  },
  {
    "tool": "Copernicus Climate",
    "category": "Dados",
    "subject": "Ciências",
    "grade": "9-EM",
    "lesson": "Dados climáticos europeus e visualizações",
    "method": "Ciências ambientais",
    "link": "https://climate.copernicus.eu",
    "bncc": "EM13CNT306"
  },
  {
    "tool": "Earth Nullschool",
    "category": "Dados",
    "subject": "Ciências",
    "grade": "8-EM",
    "lesson": "Visualização em tempo real de ventos, oceanos e clima",
    "method": "Climatologia",
    "link": "https://earth.nullschool.net",
    "bncc": "EF09CI13"
  },
  {
    "tool": "Libras Digital",
    "category": "Plataforma",
    "subject": "Línguas",
    "grade": "1-EM",
    "lesson": "Dicionário interativo e aulas de Libras",
    "method": "Educação Inclusiva",
    "link": "https://librasdigital.com.br",
    "bncc": "EF09LP35"
  },
  {
    "tool": "Hand Talk",
    "category": "Plataforma",
    "subject": "Línguas",
    "grade": "1-EM",
    "lesson": "Tradução automática de português para Libras",
    "method": "Acessibilidade",
    "link": "https://handtalk.me",
    "bncc": "EF09LP35"
  },
  {
    "tool": "Auris",
    "category": "Plataforma",
    "subject": "Línguas",
    "grade": "6-EM",
    "lesson": "Legendas automáticas para aulas inclusivas",
    "method": "Acessibilidade",
    "link": "https://auris.app",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "BeMyEyes",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Apoio a estudantes com deficiência visual",
    "method": "Inclusão",
    "link": "https://bemyeyes.com",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Boardmaker",
    "category": "Design",
    "subject": "Interdisciplinar",
    "grade": "1-EM",
    "lesson": "Comunicação alternativa e aumentativa",
    "method": "Educação especial",
    "link": "https://boardmakershare.com",
    "bncc": "EF02LP01"
  },
  {
    "tool": "LetMeTalk",
    "category": "Plataforma",
    "subject": "Línguas",
    "grade": "1-6",
    "lesson": "App de comunicação alternativa para autismo",
    "method": "Educação especial",
    "link": "https://letmetalk.info",
    "bncc": "EF01LP01"
  },
  {
    "tool": "Flipgrid (Avaliação)",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Avaliação por vídeo e portfólio",
    "method": "Avaliação alternativa",
    "link": "https://flip.com",
    "bncc": "EF06LP08"
  },
  {
    "tool": "Seesaw (Avaliação)",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "1-6",
    "lesson": "Portfólio digital com avaliação por rubrica",
    "method": "Avaliação por portfólio",
    "link": "https://web.seesaw.me",
    "bncc": "EF05LP30"
  },
  {
    "tool": "Rubric Maker",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Criar rubricas de avaliação personalizadas",
    "method": "Avaliação",
    "link": "https://rubric-maker.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Google Forms",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Questionários e avaliações automáticas",
    "method": "Avaliação formativa",
    "link": "https://forms.google.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "Typeform",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Formulários interativos e pesquisas de aprendizagem",
    "method": "Coleta de dados",
    "link": "https://typeform.com",
    "bncc": "EM13MAT401"
  },
  {
    "tool": "Wooclap",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Enquetes e interatividade ao vivo",
    "method": "Instrução responsiva",
    "link": "https://wooclap.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "AhaSlides",
    "category": "Interação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Apresentações interativas com quiz e nuvem de palavras",
    "method": "Engajamento",
    "link": "https://ahaslides.com",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Common Sense Media",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Currículo de cidadania digital e segurança online",
    "method": "Cidadania digital",
    "link": "https://commonsense.org/education",
    "bncc": "EF06LP35"
  },
  {
    "tool": "Be Internet Awesome",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "1-6",
    "lesson": "Segurança digital para crianças (Google)",
    "method": "Cidadania digital",
    "link": "https://beinternetawesome.withgoogle.com",
    "bncc": "EF05LP35"
  },
  {
    "tool": "Interland",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "3-7",
    "lesson": "Jogo sobre segurança e comportamento online",
    "method": "Cidadania digital",
    "link": "https://beinternetawesome.withgoogle.com/interland",
    "bncc": "EF05LP35"
  },
  {
    "tool": "Digital Compass",
    "category": "Gamificação",
    "subject": "Interdisciplinar",
    "grade": "6-9",
    "lesson": "Jogo sobre ética e dilemas na internet",
    "method": "Ética digital",
    "link": "https://digitalcompass.org",
    "bncc": "EF08LP35"
  },
  {
    "tool": "Privacy Badger EDU",
    "category": "Plataforma",
    "subject": "Tecnologia",
    "grade": "8-EM",
    "lesson": "Aprender sobre privacidade e rastreamento online",
    "method": "Literacia digital",
    "link": "https://privacybadger.org",
    "bncc": "EM13LGG703"
  },
  {
    "tool": "Storypark",
    "category": "Plataforma",
    "subject": "Educação Infantil",
    "grade": "EI",
    "lesson": "Documentação do desenvolvimento infantil com fotos e observações",
    "method": "Portfólio digital",
    "link": "https://storypark.com",
    "bncc": "DCNEI"
  },
  {
    "tool": "Puppet Pals",
    "category": "Mídia",
    "subject": "Educação Infantil",
    "grade": "EI-3",
    "lesson": "Criar histórias animadas com personagens digitais",
    "method": "Narrativa digital",
    "link": "https://puppetpals.com",
    "bncc": "EF01LP01"
  },
  {
    "tool": "Endless Alphabet",
    "category": "Línguas",
    "subject": "Línguas",
    "grade": "EI-2",
    "lesson": "Aprender vocabulário e letras de forma lúdica",
    "method": "Aprendizagem lúdica",
    "link": "https://originatorkids.com",
    "bncc": "EF01LP03"
  },
  {
    "tool": "Osmo",
    "category": "Maker",
    "subject": "Educação Infantil",
    "grade": "EI-3",
    "lesson": "Aprendizagem tátil combinando físico e digital",
    "method": "Aprendizagem hands-on",
    "link": "https://playosmo.com",
    "bncc": "EF01MA01"
  },
  {
    "tool": "Kodable (EI)",
    "category": "Coding",
    "subject": "Tecnologia",
    "grade": "EI-2",
    "lesson": "Primeiros passos em lógica de programação sem letras",
    "method": "Aprendizagem lúdica",
    "link": "https://kodable.com",
    "bncc": "EF01MA03"
  },
  {
    "tool": "PBS Kids",
    "category": "Plataforma",
    "subject": "Educação Infantil",
    "grade": "EI-3",
    "lesson": "Jogos educativos baseados em programas infantis",
    "method": "Gamificação",
    "link": "https://pbskids.org",
    "bncc": "DCNEI"
  },
  {
    "tool": "ABCmouse",
    "category": "Plataforma",
    "subject": "Educação Infantil",
    "grade": "EI-2",
    "lesson": "Currículo completo de pré-escola interativo",
    "method": "Aprendizagem adaptativa",
    "link": "https://abcmouse.com",
    "bncc": "DCNEI"
  },
  {
    "tool": "Toca Boca",
    "category": "Gamificação",
    "subject": "Educação Infantil",
    "grade": "EI-2",
    "lesson": "Exploração criativa e jogo imaginativo digital",
    "method": "Aprendizagem lúdica",
    "link": "https://tocaboca.com",
    "bncc": "DCNEI"
  },
  {
    "tool": "Plataforma MEC",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "EI-EM",
    "lesson": "Recursos educacionais digitais do Ministério da Educação",
    "method": "Recursos abertos",
    "link": "https://plataformaintegrada.mec.gov.br",
    "bncc": "EF06LP01"
  },
  {
    "tool": "Nova Escola",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "1-EM",
    "lesson": "Planos de aula alinhados à BNCC para todas as séries",
    "method": "Planejamento pedagógico",
    "link": "https://novaescola.org.br",
    "bncc": "EF06LP01"
  },
  {
    "tool": "Escola Digital",
    "category": "Plataforma",
    "subject": "Interdisciplinar",
    "grade": "1-EM",
    "lesson": "Objetos de aprendizagem e recursos educacionais abertos",
    "method": "Recursos abertos",
    "link": "https://escoladigital.org.br",
    "bncc": "EF06LP01"
  },
  {
    "tool": "Canal Futura",
    "category": "Mídia",
    "subject": "Interdisciplinar",
    "grade": "6-EM",
    "lesson": "Documentários e séries educativas brasileiras",
    "method": "Aprendizagem audiovisual",
    "link": "https://canalfutura.org.br",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Gamma",
    "category": "Apresentação",
    "subject": "Interdisciplinar",
    "grade": "7-EM",
    "lesson": "Criar apresentações com IA em minutos",
    "method": "Comunicação visual",
    "link": "https://gamma.app",
    "bncc": "EM13LGG303"
  },
  {
    "tool": "Whiteboard.fi",
    "category": "Colaboração",
    "subject": "Matemática",
    "grade": "6-9",
    "lesson": "Lousa branca individual para cada aluno em tempo real",
    "method": "Avaliação formativa",
    "link": "https://whiteboard.fi",
    "bncc": "EF07MA01"
  },
  {
    "tool": "BookWidgets",
    "category": "Avaliação",
    "subject": "Interdisciplinar",
    "grade": "4-EM",
    "lesson": "Criar atividades interativas, jogos e avaliações",
    "method": "Gamificação",
    "link": "https://bookwidgets.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "Buncee",
    "category": "Design",
    "subject": "Interdisciplinar",
    "grade": "3-9",
    "lesson": "Criar apresentações e murais multimídia criativos",
    "method": "Comunicação multimodal",
    "link": "https://app.buncee.com",
    "bncc": "EF69LP08"
  },
  {
    "tool": "Kialo EDU",
    "category": "Colaboração",
    "subject": "Português",
    "grade": "7-EM",
    "lesson": "Debates estruturados com argumentos e contra-argumentos",
    "method": "Pensamento crítico",
    "link": "https://kialo-edu.com",
    "bncc": "EF69LP21"
  },
  {
    "tool": "Canva for Education",
    "category": "Design",
    "subject": "Artes",
    "grade": "3-EM",
    "lesson": "Suite completa de design colaborativo para escolas",
    "method": "Design gráfico",
    "link": "https://canva.com/education",
    "bncc": "EF69AR05"
  },
  {
    "tool": "Formative (EDU)",
    "category": "Avaliação",
    "subject": "Interdisciplinar",
    "grade": "4-EM",
    "lesson": "Avaliação em tempo real com feedback imediato",
    "method": "Avaliação formativa",
    "link": "https://goformative.com",
    "bncc": "EF06LP30"
  },
  {
    "tool": "QGIS com plugin Historical Maps",
    "category": "Geotecnologia",
    "subject": "História",
    "grade": "7-EM",
    "lesson": "Sobrepor e georreferenciar mapas históricos sobre cartografia atual",
    "method": "Geotecnologia",
    "link": "https://qgis.org",
    "bncc": "EF08HI01"
  },
  {
    "tool": "ArcGIS StoryMaps",
    "category": "Geotecnologia",
    "subject": "Geografia",
    "grade": "7-EM",
    "lesson": "Criar narrativas multimídia com mapas e imagens históricas",
    "method": "Storytelling digital",
    "link": "https://storymaps.arcgis.com",
    "bncc": "EM13CHS302"
  },
  {
    "tool": "Google My Maps",
    "category": "Dados",
    "subject": "Geografia",
    "grade": "6-EM",
    "lesson": "Criar mapas temáticos colaborativos com camadas por período",
    "method": "Cartografia Digital",
    "link": "https://mymaps.google.com",
    "bncc": "EF07GE08"
  },
  {
    "tool": "Plickers",
    "category": "Assessment",
    "subject": "Interdisciplinar",
    "grade": "1-9",
    "lesson": "Avaliação formativa com cartões físicos lidos pela câmera do professor",
    "method": "Avaliação formativa",
    "link": "https://plickers.com",
    "bncc": "EF06LP30"
  }
];
