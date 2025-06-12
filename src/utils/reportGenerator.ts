import { Clue, GameState } from '@/types/game'
import { gameData } from './gameData'

export interface InvestigationReport {
  id: string
  title: string
  date: Date
  summary: string
  cluesAnalyzed: Clue[]
  theories: Theory[]
  conclusions: string[]
  confidence: number
  nextSteps: string[]
}

export interface Theory {
  name: string
  probability: number
  supportingEvidence: string[]
  contradictingEvidence: string[]
  implication: string
}

const TAURED_FACTS = {
  basicFacts: [
    "Em julho de 1954, um homem caucasiano chegou ao Aeroporto de Tóquio",
    "Apresentou passaporte válido do 'Reino de Taured'",
    "Taured supostamente localizava-se entre França e Espanha",
    "Homem afirmou que Taured existia há mais de 1000 anos",
    "Não reconhecia o nome 'Andorra' para a região",
    "Possuía carteira de motorista, dinheiro e documentos de Taured",
    "Falava idioma que combinava francês antigo com catalão",
    "Desapareceu misteriosamente de quarto vigiado no hotel",
    "Todos os seus documentos também desapareceram",
    "Caso foi classificado pelo governo japonês"
  ],
  detailedEvidence: {
    physical: [
      "Passaporte com papel e carimbos autênticos",
      "Moedas de liga metálica desconhecida",
      "Dinheiro europeu legítimo mas não identificado",
      "Talão de cheques de banco europeu válido",
      "Impressões digitais com padrões biologicamente impossíveis",
      "DNA com 23 variações genéticas não humanas",
      "Assinatura quântica dimensional no quarto do hotel"
    ],
    testimonial: [
      "Oficial de imigração Sato confirmou chegada normal",
      "Intérprete relatou idioma com gramática impossível",
      "Staff do hotel confirmou comportamento normal",
      "Hóspedes relataram luzes estranhas durante desaparecimento",
      "Guarda de segurança confirmou quarto trancado e vigiado",
      "Especialistas não identificaram origem das moedas"
    ],
    governmental: [
      "Ordem de classificação como 'sensível à segurança nacional'",
      "Remoção de documentos por 'ordem superior'",
      "Negação de conhecimento por todas as embaixadas europeias",
      "Interpol sem registros de país chamado Taured",
      "ONU nunca teve membro com esse nome",
      "12 casos similares classificados entre 1950-1960"
    ]
  },
  theories: {
    parallel_dimension: {
      name: "Realidade Paralela",
      description: "Homem era genuinamente de dimensão onde Taured existe",
      evidence: [
        "Memórias consistentes e detalhadas impossíveis de inventar",
        "Conhecimento geográfico e climático preciso",
        "Assinatura quântica dimensional detectada",
        "Padrões genéticos não humanos",
        "Convergência de múltiplas linhas temporais em 1954"
      ],
      probability: 85
    },
    government_experiment: {
      name: "Experimento Governamental",
      description: "Teste militar de tecnologia avançada ou controle mental",
      evidence: [
        "Conexões com projetos MK-Ultra",
        "Tecnologia similar ao Experimento Filadélfia",
        "Encobrimento governamental massivo",
        "Liga metálica impossível para 1954",
        "Casos similares classificados"
      ],
      probability: 70
    },
    time_travel: {
      name: "Viagem no Tempo",
      description: "Viajante temporal de linha histórica alternativa",
      evidence: [
        "Carimbos de países com nomes ligeiramente diferentes",
        "Tecnologia anacrônica nas moedas",
        "Distorções temporais detectadas",
        "Conhecimento de evolução linguística alternativa"
      ],
      probability: 65
    },
    simulation: {
      name: "Falha na Simulação",
      description: "Erro em simulação computacional da realidade",
      evidence: [
        "Padrões impossíveis nas impressões digitais",
        "Documentos que existem e não existem simultaneamente",
        "Falhas nas gravações de segurança",
        "Próprio investigador pode ter memórias implantadas"
      ],
      probability: 55
    }
  }
}

export const generateReport = (gameState: GameState, clues: Clue[]): InvestigationReport => {
  const clueCategories = categorizeClues(clues)
  const activeTheories = analyzeTheories(gameState, clues)
  const conclusions = drawConclusions(gameState, clues, activeTheories)
  
  return {
    id: `report-${Date.now()}`,
    title: `Relatório de Investigação: O Enigma de Taured`,
    date: new Date(),
    summary: generateSummary(gameState, clues),
    cluesAnalyzed: clues,
    theories: activeTheories,
    conclusions,
    confidence: calculateConfidence(activeTheories),
    nextSteps: suggestNextSteps(gameState, clues, activeTheories)
  }
}

const categorizeClues = (clues: Clue[]) => {
  return {
    physical: clues.filter(c => ['document', 'artifact', 'evidence'].includes(c.category)),
    witness: clues.filter(c => c.category === 'witness'),
    government: clues.filter(c => c.category === 'government'),
    dimensional: clues.filter(c => ['dimensional', 'temporal'].includes(c.category)),
    analysis: clues.filter(c => ['analysis', 'theory'].includes(c.category))
  }
}

const analyzeTheories = (gameState: GameState, clues: Clue[]): Theory[] => {
  const theories: Theory[] = []
  
  // Teoria da Realidade Paralela
  const dimensionalClues = clues.filter(c => 
    ['dimensional', 'temporal', 'identity'].includes(c.category)
  )
  
  theories.push({
    name: "Realidade Paralela",
    probability: Math.min(95, gameState.interdimensionalTheory || 0),
    supportingEvidence: [
      `${dimensionalClues.length} evidências dimensionais encontradas`,
      "Assinatura quântica detectada no local",
      "Padrões genéticos impossíveis confirmados",
      "Memórias consistentes e detalhadas demais para serem falsas"
    ],
    contradictingEvidence: [
      "Nenhum registro histórico de Taured encontrado",
      "Tecnologia para viagem dimensional não existia em 1954"
    ],
    implication: "O homem era genuinamente de uma dimensão paralela onde Taured existe no lugar de Andorra."
  })
  
  // Teoria da Conspiração Governamental
  const govClues = clues.filter(c => c.category === 'government')
  
  theories.push({
    name: "Experimento Governamental",
    probability: Math.min(90, gameState.conspiracyLevel || 0),
    supportingEvidence: [
      `${govClues.length} evidências de encobrimento encontradas`,
      "Conexões com projetos militares classificados",
      "Tecnologia anacrônica nas evidências físicas",
      "Padrão de casos similares classificados"
    ],
    contradictingEvidence: [
      "Tecnologia para criar evidências tão convincentes não existia",
      "Motivação para experimento tão elaborado unclear"
    ],
    implication: "O incidente foi resultado de experimento militar ultra-secreto de tecnologia avançada."
  })
  
  // Teoria da Simulação
  const anomalyClues = clues.filter(c => 
    ['evidence', 'identity'].includes(c.category)
  )
  
  theories.push({
    name: "Falha na Simulação",
    probability: Math.min(85, gameState.timelineDistortion || 0),
    supportingEvidence: [
      `${anomalyClues.length} anomalias detectadas na realidade`,
      "Falhas sistemáticas em gravações",
      "Padrões impossíveis em evidências físicas",
      "Possíveis implantes de memória no investigador"
    ],
    contradictingEvidence: [
      "Teoria não falsificável",
      "Outras teorias mais parcimoniosas"
    ],
    implication: "Toda a investigação pode ser parte de uma simulação computacional avançada."
  })
  
  return theories.sort((a, b) => b.probability - a.probability)
}

const drawConclusions = (gameState: GameState, clues: Clue[], theories: Theory[]): string[] => {
  const conclusions: string[] = []
  
  conclusions.push("FATOS ESTABELECIDOS:")
  conclusions.push("• O incidente de 1954 realmente ocorreu")
  conclusions.push("• O homem possuía documentos fisicamente autênticos")
  conclusions.push("• Taured nunca existiu nos registros históricos oficiais")
  conclusions.push("• O governo japonês classificou o caso imediatamente")
  conclusions.push("• Evidências físicas apresentam anomalias impossíveis")
  
  conclusions.push("\nTEORIA MAIS PROVÁVEL:")
  const topTheory = theories[0]
  if (topTheory) {
    conclusions.push(`• ${topTheory.name} (${topTheory.probability}% de probabilidade)`)
    conclusions.push(`• ${topTheory.implication}`)
  }
  
  if (gameState.identityCrisis && gameState.identityCrisis > 50) {
    conclusions.push("\nREVELAÇÃO PESSOAL:")
    conclusions.push("• Evidências sugerem conexão pessoal do investigador com Taured")
    conclusions.push("• Possíveis implantes de memória detectados")
    conclusions.push("• Documentos indicam cidadania do investigador em Taured")
  }
  
  return conclusions
}

const generateSummary = (gameState: GameState, clues: Clue[]): string => {
  const clueCount = clues.length
  const locations = new Set(clues.map(c => c.location)).size
  
  return `Investigação completa do Enigma de Taured analisou ${clueCount} evidências através de ${locations} locais. ` +
         `Caso presenta mistério de homem que alegava ser cidadão de país inexistente. ` +
         `Evidências físicas autênticas combinadas com impossibilidades históricas sugerem explicação extraordinária. ` +
         `Tecnologia ORION detectou anomalias dimensionais significativas no local do incidente.`
}

const calculateConfidence = (theories: Theory[]): number => {
  if (theories.length === 0) return 0
  return Math.round(theories[0].probability * 0.85) // Slight discount for uncertainty
}

const suggestNextSteps = (gameState: GameState, clues: Clue[], theories: Theory[]): string[] => {
  const steps: string[] = []
  
  if (gameState.interdimensionalTheory && gameState.interdimensionalTheory > 60) {
    steps.push("Investigar outros casos de viajantes dimensionais")
    steps.push("Tentar reativar o portal dimensional detectado")
    steps.push("Estabelecer protocolos para contato interdimensional")
  }
  
  if (gameState.conspiracyLevel && gameState.conspiracyLevel > 60) {
    steps.push("Infiltrar projetos militares classificados relacionados")
    steps.push("Localizar outros participantes dos experimentos")
    steps.push("Expor encobrimento governamental")
  }
  
  if (gameState.timelineDistortion && gameState.timelineDistortion > 60) {
    steps.push("Verificar integridade da linha temporal atual")
    steps.push("Estabelecer medidas de proteção contra distorções")
    steps.push("Mapear anomalias temporais em outros locais")
  }
  
  if (gameState.identityCrisis && gameState.identityCrisis > 40) {
    steps.push("Submeter-se a análise completa de memória")
    steps.push("Investigar origem real do agente investigador")
    steps.push("Verificar conexões familiares com Taured")
  }
  
  steps.push("Monitorar atividade dimensional em locais relacionados")
  steps.push("Manter vigília sobre casos similares futuros")
  
  return steps
}

export const formatReportForDisplay = (report: InvestigationReport): string => {
  let formatted = `
╔══════════════════════════════════════════════════════════════╗
║                    RELATÓRIO DE INVESTIGAÇÃO                ║
║                      O ENIGMA DE TAURED                     ║
╚══════════════════════════════════════════════════════════════╝

`
  
  formatted += `📅 Data: ${report.date.toLocaleDateString('pt-BR')}
`
  formatted += `🔍 Evidências Analisadas: ${report.cluesAnalyzed.length}
`
  formatted += `📊 Nível de Confiança: ${report.confidence}%

`
  
  formatted += `📋 RESUMO EXECUTIVO:
${report.summary}

`
  
  formatted += `🎯 TEORIAS PRINCIPAIS:
`
  report.theories.forEach((theory, index) => {
    formatted += `${index + 1}. ${theory.name} (${theory.probability}%)
`
    formatted += `   ${theory.implication}

`
  })
  
  formatted += `✅ CONCLUSÕES:
`
  report.conclusions.forEach(conclusion => {
    formatted += `${conclusion}
`
  })
  
  formatted += `
🚀 PRÓXIMOS PASSOS:
`
  report.nextSteps.forEach((step, index) => {
    formatted += `${index + 1}. ${step}
`
  })
  
  formatted += `
📊 EVIDÊNCIAS POR CATEGORIA:
`
  const categories = {
    document: '📄 Documentos',
    artifact: '🏺 Artefatos',
    evidence: '🔬 Evidências Físicas',
    witness: '👁️ Testemunhos',
    government: '🏛️ Documentos Governamentais',
    dimensional: '🌌 Anomalias Dimensionais',
    temporal: '⏰ Distorções Temporais',
    analysis: '🧠 Análises',
    theory: '💭 Teorias',
    cases: '📚 Casos Similares',
    identity: '🪪 Identidade'
  }
  
  const cluesByCategory = new Map()
  report.cluesAnalyzed.forEach(clue => {
    const category = clue.category
    if (!cluesByCategory.has(category)) {
      cluesByCategory.set(category, [])
    }
    cluesByCategory.get(category).push(clue)
  })
  
  cluesByCategory.forEach((clues, category) => {
    formatted += `\n${categories[category as keyof typeof categories] || category.toUpperCase()}:
`
    clues.forEach((clue: Clue) => {
      formatted += `  • ${clue.name}: ${clue.description}
`
    })
  })
  
  formatted += `
═══════════════════════════════════════════════════════════════
`
  formatted += `"A verdade é mais estranha que a ficção."
`
  formatted += `                                    - Agente ORION
`
  
  return formatted
}

export const generateTauredEncyclopedia = (): string => {
  return `
╔══════════════════════════════════════════════════════════════╗
║                   ENCICLOPÉDIA DE TAURED                    ║
║              Todas as Informações Disponíveis               ║
╚══════════════════════════════════════════════════════════════╝

📖 HISTÓRIA DO CASO:

O Enigma de Taured é um dos mistérios mais intrigantes do século XX.
Em julho de 1954, um homem caucasiano bem-vestido chegou ao Aeroporto
de Tóquio em um voo comercial da Europa. O que deveria ser uma entrada
rotineira no país se transformou em um dos casos mais investigados
de possível viagem interdimensional.

🆔 DADOS DO VIAJANTE MISTERIOSO:
• Homem caucasiano, aparentemente entre 40-50 anos
• Bem vestido, aparência de homem de negócios
• Falava japonês básico e inglês fluente
• Comportamento calmo e cooperativo
• Genuinamente confuso com questionamentos sobre Taured

📄 DOCUMENTAÇÃO APRESENTADA:
• Passaporte do "Reino de Taured" aparentemente autêntico
• Carteira de motorista emitida em Taured
• Documentos comerciais de empresa sediada em Taured
• Dinheiro europeu legítimo, mas parcialmente não identificado
• Talão de cheques de banco europeu com conta válida

🗺️ LOCALIZAÇÃO GEOGRÁFICA ALEGADA:
• Taured ficaria entre França e Espanha
• Na posição onde hoje conhecemos como Andorra
• Existiria há mais de 1000 anos segundo o viajante
• Clima descrito como mais úmido que Andorra atual
• Geografia detalhada inconsistente com Andorra

🏛️ RESPOSTA GOVERNAMENTAL:
• Caso imediatamente classificado como "sensível à segurança nacional"
• Ordem para negar existência do incidente publicamente
• Remoção de evidências por "ordem superior"
• Interrogatório extensivo por autoridades
• Arquivo mantido em segredo por décadas

🕵️ PROCEDIMENTOS DE INVESTIGAÇÃO:
• Verificação com embaixadas europeias - todas negaram conhecimento
• Consulta à Interpol - nenhum registro de Taured
• Checagem com Nações Unidas - país nunca foi membro
• Análise de mapas históricos - Taured nunca registrado
• Pesquisa genealógica - família do homem nunca localizada

🏨 O DESAPARECIMENTO:
• Homem escoltado para Hotel Imperial sob vigilância
• Colocado no quarto 1015 sob guarda constante
• Porta trancada por dentro, janela no 10º andar
• Corredor vigiado durante toda a noite
• Pela manhã, quarto completamente vazio
• Todos os documentos também desapareceram
• Filmagens de segurança com falha de 6 horas inexplicável

🔬 EVIDÊNCIAS FÍSICAS ANÔMALAS:
• Impressões digitais com padrões biologicamente impossíveis
• DNA com variações em 23 loci não correspondentes a humanos terrestres
• Moedas com liga metálica impossível de produzir em 1954
• Papel do passaporte autêntico mas com fibras desconhecidas
• Tinta que mudava de cor sob análise espectrográfica

🗣️ ANÁLISE LINGUÍSTICA:
• Idioma combinava francês medieval com catalão moderno
• Gramática incluía casos inexistentes em línguas indo-europeias
• Evolução linguística consistente com mil anos de desenvolvimento
• Script escrito parecia alfabeto latino modificado
• Fluência impossível de simular ou aprender artificialmente

🧠 PERFIL PSICOLÓGICO:
• Memórias extremamente detalhadas e consistentes sobre Taured
• Conhecimento geográfico preciso de região inexistente
• Nenhum sinal de delírios ou distúrbios mentais
• Genuína confusão com não-reconhecimento de Taured
• Reações emocionais autênticas a questionamentos

📊 CASOS SIMILARES:
• 12 casos documentados entre 1950-1960
• Todos envolvendo pessoas de países inexistentes
• Concentração geográfica na Europa
• Todos classificados por governos respectivos
• Padrões similares de documentação autêntica
• Desaparecimentos misteriosos em todos os casos

🔮 TEORIAS PRINCIPAIS:

1. REALIDADE PARALELA (85% probabilidade)
   • Homem genuinamente de dimensão onde Taured existe
   • Convergência dimensional acidental em 1954
   • Evidências físicas impossíveis de falsificar
   • Memórias consistentes demais para serem inventadas

2. EXPERIMENTO GOVERNAMENTAL (70% probabilidade)
   • Teste de tecnologia militar ultra-secreta
   • Conexões com projetos MK-Ultra e experimentos similares
   • Tecnologia anacrônica nas evidências
   • Encobrimento governamental massivo

3. VIAGEM NO TEMPO (65% probabilidade)
   • Viajante de linha temporal alternativa
   • História desenvolveu-se diferentemente em sua realidade
   • Carimbos de países com nomes ligeiramente diferentes
   • Tecnologia avançada disfarçada

4. FALHA NA SIMULAÇÃO (55% probabilidade)
   • Erro em simulação computacional da realidade
   • Anomalias impossíveis explicadas por bugs no sistema
   • Investigador pode ter memórias implantadas
   • Teoria não falsificável

🌌 IMPLICAÇÕES CIENTÍFICAS:
• Evidência de múltiplas realidades paralelas
• Possibilidade de viagem interdimensional natural
• Convergência de linhas temporais em momentos específicos
• Existência de tecnologia além da compreensão atual
• Necessidade de repensar conceitos de realidade

🔒 CLASSIFICAÇÃO GOVERNAMENTAL:
• Nível de segurança: ULTRA-SECRETO
• Projeto ORION: Investigação Interdimensional
• Apenas pessoal com clearance dimensional pode acessar
• Informações compartimentalizadas por segurança
• Protocolos especiais para casos similares

🚨 ALERTAS DE SEGURANÇA:
• Anomalias dimensionais podem reocorrer
• Monitoramento constante de portais temporais
• Equipamentos especiais para detecção de visitantes
• Protocolos de contenção para casos futuros
• Preparação para contato interdimensional

💭 REFLEXÕES FILOSÓFICAS:
• Natureza da realidade questionada
• Conceitos de identidade e existência
• Limites do conhecimento humano
• Responsabilidade com verdades perigosas
• Ética da investigação dimensional

═══════════════════════════════════════════════════════════════
"A realidade é uma ilusão, embora muito persistente."
                                        - Albert Einstein

"Há mais coisas no céu e na terra, Horácio,
do que sonha a nossa vã filosofia."
                                        - William Shakespeare
═══════════════════════════════════════════════════════════════

🌟 CONCLUSÃO:

O Enigma de Taured permanece como um dos mistérios mais fascinantes
da era moderna. Seja resultado de viagem interdimensional, experimento
governamental ultra-secreto ou fenômeno ainda desconhecido pela ciência,
o caso desafia nossas percepções fundamentais sobre a natureza da
realidade.

A investigação ORION continua, na esperança de que um dia possamos
compreender completamente este extraordinário evento e suas implicações
para nossa compreensão do universo.

Até então, o mistério permanece... assim como a possibilidade de que
outro viajante de Taured possa aparecer a qualquer momento.

🔍 STATUS: INVESTIGAÇÃO ATIVA
📅 PRÓXIMA REVISÃO: [CLASSIFICADO]
👤 RESPONSÁVEL: AGENTE ORION [CLASSIFICADO]

[FIM DO ARQUIVO]
`
}

