import { LocationData, ToolData, Location, Tool, Clue } from '@/types/game'

export const gameData = {
  locations: {
    orion_base: {
      id: 'orion_base' as Location,
      name: 'Base Secreta ORION',
      description: 'Centro de comando da unidade ORION para investigações interdimensionais.',
      available: true,
    },
    tokyo_airport_1954: {
      id: 'tokyo_airport_1954' as Location,
      name: 'Aeroporto de Tóquio (1954)',
      description: 'Local do primeiro avistamento do Homem de Taured.',
      available: true,
    },
    hotel_room: {
      id: 'hotel_room' as Location,
      name: 'Quarto do Hotel Imperial',
      description: 'Quarto 1015 onde o homem misterioso desapareceu.',
      available: true,
    },
    government_archive: {
      id: 'government_archive' as Location,
      name: 'Arquivo Secreto do Governo',
      description: 'Documentos classificados sobre o incidente.',
      available: true,
    },
    paris_cafe: {
      id: 'paris_cafe' as Location,
      name: 'Café de la Paix - Paris',
      description: 'Local onde o homem foi visto antes do incidente.',
      available: true,
    },
    barcelona_bar: {
      id: 'barcelona_bar' as Location,
      name: 'Bar El Portal - Barcelona',
      description: 'Último local conhecido de atividade do homem.',
      available: true,
    },
    conspiracy_room: {
      id: 'conspiracy_room' as Location,
      name: 'Sala de Conspiração Online',
      description: 'Fórum secreto sobre casos similares.',
      available: true,
    },
    temporal_portal: {
      id: 'temporal_portal' as Location,
      name: 'Portal Temporal',
      description: 'Anomalia dimensional detectada.',
      available: false,
      unlockCondition: (gameState) => gameState.timelineDistortion >= 75,
    },
  } as Record<Location, LocationData>,

  tools: {
    multiversal_database: {
      id: 'multiversal_database' as Tool,
      name: 'Banco de Dados Multiversal',
      description: 'Acesso a informações de realidades paralelas.',
      available: true,
    },
    temporal_analyzer: {
      id: 'temporal_analyzer' as Tool,
      name: 'Analisador Temporal',
      description: 'Detecta interferências no espaço-tempo.',
      available: true,
    },
    document_decoder: {
      id: 'document_decoder' as Tool,
      name: 'Decodificador de Documentos',
      description: 'Analisa documentos anômalos e falsos.',
      available: true,
    },
    timeline_simulator: {
      id: 'timeline_simulator' as Tool,
      name: 'Simulador de Linha Temporal',
      description: 'Testa hipóteses sobre eventos temporais.',
      available: true,
    },
    investigation_diary: {
      id: 'investigation_diary' as Tool,
      name: 'Diário de Investigação',
      description: 'Registro completo da investigação.',
      available: true,
    },
    expanded_reality: {
      id: 'expanded_reality' as Tool,
      name: 'Modo de Realidade Expandida',
      description: 'Visualiza anomalias interdimensionais.',
      available: false,
      unlockCondition: (gameState) => gameState.interdimensionalTheory >= 50,
    },
    orion_net: {
      id: 'orion_net' as Tool,
      name: 'ORION Net',
      description: 'Rede secreta de informações ORION.',
      available: true,
    },
    contradiction_detector: {
      id: 'contradiction_detector' as Tool,
      name: 'Detector de Contradições',
      description: 'Identifica inconsistências em depoimentos.',
      available: true,
    },
    portable_lab: {
      id: 'portable_lab' as Tool,
      name: 'Laboratório Portátil',
      description: 'Análise científica de amostras.',
      available: true,
    },
  } as Record<Tool, ToolData>,

  endings: {
    parallel_dimension: {
      id: 'parallel_dimension',
      name: 'A Verdade Interdimensional',
      description: 'O Homem de Taured era genuinamente de uma dimensão paralela.',
      condition: (gameState) => gameState.interdimensionalTheory >= 75,
      priority: 1,
    },
    government_experiment: {
      id: 'government_experiment', 
      name: 'Conspiração Governamental',
      description: 'O incidente foi resultado de experimentos militares secretos.',
      condition: (gameState) => gameState.conspiracyLevel >= 75,
      priority: 2,
    },
    simulation: {
      id: 'simulation',
      name: 'Dentro da Simulação',
      description: 'Toda a investigação é parte de uma simulação ORION.',
      condition: (gameState) => gameState.timelineDistortion >= 80,
      priority: 3,
    },
    player_is_taured: {
      id: 'player_is_taured',
      name: 'Você é de Taured',
      description: 'O investigador descobre ser originário do Reino de Taured.',
      condition: (gameState, clues) => clues.length >= 8,
      priority: 4,
    },
    mystery_remains: {
      id: 'mystery_remains',
      name: 'O Mistério Permanece',
      description: 'Algumas verdades nunca serão reveladas.',
      condition: () => true, // Final padrão
      priority: 5,
    },
  },

  clues: {
    dimensional_passport: {
      id: 'dimensional_passport',
      name: 'Passaporte Interdimensional',
      description: 'Documento com propriedades impossíveis de outro mundo.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    taured_coins: {
      id: 'taured_coins',
      name: 'Moedas de Taured',
      description: 'Moedas de ouro de um reino que não deveria existir.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'artifact' as const,
    },
    government_coverup: {
      id: 'government_coverup',
      name: 'Encobrimento Governamental',
      description: 'Evidências de que o governo ocultou informações.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    witness_yamamoto: {
      id: 'witness_yamamoto',
      name: 'Testemunho do Oficial Yamamoto',
      description: 'Depoimento consistente sobre o homem misterioso.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    temporal_anomaly: {
      id: 'temporal_anomaly',
      name: 'Anomalia Temporal',
      description: 'Distorções no espaço-tempo detectadas no local.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'temporal' as const,
    },
    reality_breach: {
      id: 'reality_breach',
      name: 'Brecha na Realidade',
      description: 'Evidência de portal interdimensional.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
  } as Record<string, Clue>,

  investigations: {
    airport_investigation: {
      title: 'Investigação no Aeroporto',
      description: 'Examine o local do primeiro avistamento.',
      choices: [
        {
          id: 'interview_officer',
          text: 'Entrevistar Oficial de Imigração',
          action: () => ({
            success: true,
            message: 'Oficial Yamamoto fornece detalhes consistentes sobre o incidente.',
            cluesFound: [gameData.clues.witness_yamamoto],
          }),
        },
        {
          id: 'analyze_passport',
          text: 'Analisar Passaporte Anômalo',
          action: () => ({
            success: true,
            message: 'O passaporte apresenta características impossíveis.',
            cluesFound: [gameData.clues.dimensional_passport],
            stateChanges: { interdimensionalTheory: 25 },
          }),
        },
        {
          id: 'scan_temporal',
          text: 'Escanear Anomalias Temporais',
          action: () => ({
            success: true,
            message: 'Detectadas distorções significativas no espaço-tempo.',
            cluesFound: [gameData.clues.temporal_anomaly],
            stateChanges: { timelineDistortion: 30 },
          }),
        },
      ],
    },
    hotel_investigation: {
      title: 'Investigação no Hotel',
      description: 'Examine o quarto onde o homem desapareceu.',
      choices: [
        {
          id: 'search_room',
          text: 'Revistar o Quarto',
          action: () => ({
            success: true,
            message: 'Encontradas moedas estranhas e documentos queimados.',
            cluesFound: [gameData.clues.taured_coins],
          }),
        },
        {
          id: 'interview_staff',
          text: 'Entrevistar Funcionários',
          action: () => ({
            success: true,
            message: 'Zelador relata desaparecimento sobrenatural.',
            stateChanges: { conspiracyLevel: 15 },
          }),
        },
      ],
    },
  },
}

export const formatLocation = (location: Location): string => {
  return gameData.locations[location]?.name || location
}

export const formatTool = (tool: Tool): string => {
  return gameData.tools[tool]?.name || tool
}

export const getAvailableLocations = (gameState: any, clues: Clue[]) => {
  return Object.values(gameData.locations).filter(location => {
    if (location.available) return true
    if (location.unlockCondition) {
      return location.unlockCondition(gameState, clues)
    }
    return false
  })
}

export const getAvailableTools = (gameState: any, clues: Clue[], playerTools: Record<Tool, boolean>) => {
  return Object.values(gameData.tools).filter(tool => {
    if (!playerTools[tool.id]) return false
    if (tool.available) return true
    if (tool.unlockCondition) {
      return tool.unlockCondition(gameState, clues)
    }
    return false
  })
}

