import { LocationData, ToolData, Location, Tool, Clue, EndingCondition, Investigation } from '@/types/game'

interface GameData {
  locations: Record<Location, LocationData>
  tools: Record<Tool, ToolData>
  endings: Record<string, EndingCondition>
  clues: Record<string, Clue>
  investigations: Record<string, Investigation>
}

export const gameData: GameData = {
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
    report_generator: {
      id: 'report_generator' as Tool,
      name: 'Gerador de Relatórios',
      description: 'Compile todas as evidências em relatório detalhado.',
      available: true,
    },
    encyclopedia: {
      id: 'encyclopedia' as Tool,
      name: 'Enciclopédia de Taured',
      description: 'Acesso completo a todas as informações sobre o enigma.',
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
    // Informações adicionais sobre o Enigma de Taured
    original_passport: {
      id: 'original_passport',
      name: 'Passaporte Original de Taured',
      description: 'Passaporte autêntico emitido pelo "Reino de Taured".',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    drivers_license: {
      id: 'drivers_license',
      name: 'Carteira de Motorista de Taured',
      description: 'Licença emitida em Taured.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    company_documentation: {
      id: 'company_documentation',
      name: 'Documentos da Empresa',
      description: 'Cartas de uma empresa em Taured.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    european_currency: {
      id: 'european_currency',
      name: 'Moeda Europeia Estranha',
      description: 'Dinheiro europeu legítimo, mas desconhecido.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'artifact' as const,
    },
    checkbook_account: {
      id: 'checkbook_account',
      name: 'Talão de Cheques Bancário',
      description: 'Conta bancária válida de Taured.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    immigration_officer_testimony: {
      id: 'immigration_officer_testimony',
      name: 'Depoimento do Oficial de Imigração',
      description: 'Oficial Sato confirma homem misterioso.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    hotel_staff_testimony: {
      id: 'hotel_staff_testimony',
      name: 'Testemunho da Equipe do Hotel',
      description: 'Funcionários confirmam check-in normal.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    security_guard_report: {
      id: 'security_guard_report',
      name: 'Relatório do Guarda de Segurança',
      description: 'Guarda relata desaparecimento inexplicável.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    world_map_analysis: {
      id: 'world_map_analysis',
      name: 'Análise do Mapa Mundial',
      description: 'Homem apontou Taured no mapa onde é Andorra.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    andorra_connection: {
      id: 'andorra_connection',
      name: 'Conexão com Andorra',
      description: 'Evidência de realidade paralela envolvendo Andorra.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    locked_room_mystery: {
      id: 'locked_room_mystery',
      name: 'Mistério do Quarto Trancado',
      description: 'Quarto selado inexplicavelmente.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'temporal' as const,
    },
    disappeared_documents: {
      id: 'disappeared_documents',
      name: 'Documentos Desaparecidos',
      description: 'Documentos desapareceram misteriosamente.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    mysterious_company: {
      id: 'mysterious_company',
      name: 'Empresa Misteriosa de Taured',
      description: 'Empresa onde homem trabalhava nunca foi encontrada.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    airport_cctv_footage: {
      id: 'airport_cctv_footage',
      name: 'Filmagem de Segurança do Aeroporto',
      description: 'Registros de CCTV mostram homem chegando normalmente.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'evidence' as const,
    },
    hotel_cctv_gap: {
      id: 'hotel_cctv_gap',
      name: 'Falha nas Câmeras do Hotel',
      description: 'Período de 6 horas sem gravação inexplicavelmente.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'evidence' as const,
    },
    linguistic_analysis: {
      id: 'linguistic_analysis',
      name: 'Análise Linguística',
      description: 'Idioma falado combinava francês antigo com catalão.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    customs_declaration: {
      id: 'customs_declaration',
      name: 'Declaração Alfandegária',
      description: 'Formulário preenchido em idioma desconhecido.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    fingerprint_anomaly: {
      id: 'fingerprint_anomaly',
      name: 'Anomalia nas Impressões Digitais',
      description: 'Padrões impossíveis na dermatoglifia.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'evidence' as const,
    },
    medical_examination: {
      id: 'medical_examination',
      name: 'Exame Médico',
      description: 'Sangue tipo O negativo, mas com anomalias genéticas.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'evidence' as const,
    },
    psychological_profile: {
      id: 'psychological_profile',
      name: 'Perfil Psicológico',
      description: 'Homem demonstrava memórias consistentes de Taured.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    travel_history: {
      id: 'travel_history',
      name: 'Histórico de Viagens',
      description: 'Carimbos de países que não conferem com geografia atual.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'document' as const,
    },
    currency_metallurgy: {
      id: 'currency_metallurgy',
      name: 'Análise Metalúrgica da Moeda',
      description: 'Liga metálica desconhecida na época.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    climate_records: {
      id: 'climate_records',
      name: 'Registros Climáticos',
      description: 'Homem descreveu clima de Taured inconsistente com Andorra.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    similar_cases: {
      id: 'similar_cases',
      name: 'Casos Similares',
      description: 'Outros incidentes de pessoas de lugares inexistentes.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'cases' as const,
    },
    quantum_signature: {
      id: 'quantum_signature',
      name: 'Assinatura Quântica',
      description: 'Vestígios de energia dimensional no quarto do hotel.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    timeline_convergence: {
      id: 'timeline_convergence',
      name: 'Convergência de Linhas Temporais',
      description: 'Evidência de múltiplas realidades se sobrepondo.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'temporal' as const,
    },
    dimensional_fabric_tear: {
      id: 'dimensional_fabric_tear',
      name: 'Rasgo no Tecido Dimensional',
      description: 'Anomalia no espaço-tempo detectada em 1954.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    hotel_guest_reports: {
      id: 'hotel_guest_reports',
      name: 'Relatos de Outros Hóspedes',
      description: 'Hóspedes relataram luzes estranhas e sons inexplicáveis.',
      location: 'hotel_room' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    interpreter_account: {
      id: 'interpreter_account',
      name: 'Relato do Intérprete',
      description: 'Linguista relatou idioma com gramática impossível.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    customs_officer_notes: {
      id: 'customs_officer_notes',
      name: 'Notas do Oficial Alfandegário',
      description: 'Oficial Tanaka documentou anomalias nos documentos.',
      location: 'tokyo_airport_1954' as Location,
      discoveredAt: new Date(),
      category: 'witness' as const,
    },
    embassy_records: {
      id: 'embassy_records',
      name: 'Registros de Embaixadas',
      description: 'Nenhuma embaixada reconheceu o país Taured.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    interpol_check: {
      id: 'interpol_check',
      name: 'Verificação da Interpol',
      description: 'Interpol não possui registros de Taured.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    un_membership_records: {
      id: 'un_membership_records',
      name: 'Registros de Membros da ONU',
      description: 'ONU nunca teve país membro chamado Taured.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    historical_maps: {
      id: 'historical_maps',
      name: 'Mapas Históricos',
      description: 'Mapas antigos nunca mostraram Taured.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    genealogy_research: {
      id: 'genealogy_research',
      name: 'Pesquisa Genealógica',
      description: 'Família do homem nunca foi localizada.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'analysis' as const,
    },
    dimensional_physicist_theory: {
      id: 'dimensional_physicist_theory',
      name: 'Teoria do Físico Dimensional',
      description: 'Dr. Yamamoto propõe teoria de realidades paralelas.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    mandela_effect_connection: {
      id: 'mandela_effect_connection',
      name: 'Conexão com Efeito Mandela',
      description: 'Possível evidência de mudanças na realidade.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    cern_experiments: {
      id: 'cern_experiments',
      name: 'Experimentos do CERN',
      description: 'Correlação temporal com experimentos de partículas.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    philadelphia_experiment_link: {
      id: 'philadelphia_experiment_link',
      name: 'Ligação com Experimento Filadélfia',
      description: 'Possível conexão com experimentos militares.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    montauk_project: {
      id: 'montauk_project',
      name: 'Projeto Montauk',
      description: 'Experimentos de viagem no tempo e controle mental.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    looking_glass_project: {
      id: 'looking_glass_project',
      name: 'Projeto Looking Glass',
      description: 'Tecnologia militar de visualização temporal.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    alternate_earth_theory: {
      id: 'alternate_earth_theory',
      name: 'Teoria da Terra Alternativa',
      description: 'Hipótese de múltiplas Terras em dimensões paralelas.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    quantum_entanglement_evidence: {
      id: 'quantum_entanglement_evidence',
      name: 'Evidência de Entrelaçamento Quântico',
      description: 'Partículas no local mostram entrelaçamento anômalo.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    butterfly_effect_analysis: {
      id: 'butterfly_effect_analysis',
      name: 'Análise do Efeito Borboleta',
      description: 'Pequenas diferenças históricas podem criar Taured.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'temporal' as const,
    },
    simulation_hypothesis: {
      id: 'simulation_hypothesis',
      name: 'Hipótese da Simulação',
      description: 'Possibilidade de realidade ser simulação computacional.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    matrix_glitch_theory: {
      id: 'matrix_glitch_theory',
      name: 'Teoria do Erro na Matrix',
      description: 'Falha no sistema criou anomalia temporal.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    collective_unconscious: {
      id: 'collective_unconscious',
      name: 'Inconsciente Coletivo',
      description: 'Manifestação física de memória coletiva humana.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    tulpa_manifestation: {
      id: 'tulpa_manifestation',
      name: 'Manifestação Tulpa',
      description: 'Criação mental coletiva materializada.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    akashic_records: {
      id: 'akashic_records',
      name: 'Registros Akáshicos',
      description: 'Acesso a memórias universais de realidades alternativas.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    doppelganger_phenomenon: {
      id: 'doppelganger_phenomenon',
      name: 'Fenômeno Doppelganger',
      description: 'Encontro com versão alternativa de pessoa real.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    false_memory_syndrome: {
      id: 'false_memory_syndrome',
      name: 'Síndrome de Memória Falsa',
      description: 'Implantação artificial de memórias.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    mk_ultra_connection: {
      id: 'mk_ultra_connection',
      name: 'Conexão com MK-Ultra',
      description: 'Possível experimento de controle mental.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    project_stargate: {
      id: 'project_stargate',
      name: 'Projeto Stargate',
      description: 'Programa militar de visão remota.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    cia_psychic_research: {
      id: 'cia_psychic_research',
      name: 'Pesquisa Psíquica da CIA',
      description: 'Investigações sobre fenômenos paranormais.',
      location: 'government_archive' as Location,
      discoveredAt: new Date(),
      category: 'government' as const,
    },
    roswell_connection: {
      id: 'roswell_connection',
      name: 'Conexão com Roswell',
      description: 'Possível origem extraterrestre.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    alien_intervention: {
      id: 'alien_intervention',
      name: 'Intervenção Alienígena',
      description: 'Tecnologia extraterrestre de manipulação dimensional.',
      location: 'conspiracy_room' as Location,
      discoveredAt: new Date(),
      category: 'theory' as const,
    },
    time_police_theory: {
      id: 'time_police_theory',
      name: 'Teoria da Polícia Temporal',
      description: 'Agentes corrigindo anomalias temporais.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'temporal' as const,
    },
    interdimensional_tourism: {
      id: 'interdimensional_tourism',
      name: 'Turismo Interdimensional',
      description: 'Viajante perdido entre dimensões.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    reality_anchor_failure: {
      id: 'reality_anchor_failure',
      name: 'Falha na Âncora da Realidade',
      description: 'Sistema de estabilização dimensional defeituoso.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'dimensional' as const,
    },
    player_memory_implant: {
      id: 'player_memory_implant',
      name: 'Implante de Memória do Investigador',
      description: 'Suspeita de que próprias memórias foram alteradas.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'identity' as const,
    },
    taured_citizenship_document: {
      id: 'taured_citizenship_document',
      name: 'Documento de Cidadania de Taured',
      description: 'Investigador encontra próprio nome em registros de Taured.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'identity' as const,
    },
    family_photo_anomaly: {
      id: 'family_photo_anomaly',
      name: 'Anomalia em Foto de Família',
      description: 'Foto mostra investigador com família em Taured.',
      location: 'orion_base' as Location,
      discoveredAt: new Date(),
      category: 'identity' as const,
    },
    birth_certificate_taured: {
      id: 'birth_certificate_taured',
      name: 'Certidão de Nascimento de Taured',
      description: 'Documento oficial indica nascimento em Taured.',
      location: 'temporal_portal' as Location,
      discoveredAt: new Date(),
      category: 'identity' as const,
    }
  },
} as Record<string, Clue>,

  investigations: {
    airport_investigation: {
      title: 'Investigação no Aeroporto de Tóquio - 1954',
      description: 'Examine o local do primeiro avistamento do homem misterioso.',
      background: 'Um homem caucasiano bem vestido chegou em voo comercial vindo da Europa em julho de 1954.',
      choices: [
        {
          id: 'interview_officer',
          text: 'Entrevistar Oficial de Imigração Sato',
          action: () => ({
            success: true,
            message: 'Oficial Sato: "O homem se identificou como cidadão de Taured. Estava confuso quando disse que não reconhecia o nome Andorra. Insistiu que Taured ficava entre França e Espanha há mais de 1000 anos."',
            cluesFound: [gameData.clues.immigration_officer_testimony],
          }),
        },
        {
          id: 'analyze_original_passport',
          text: 'Analisar Passaporte Original de Taured',
          action: () => ({
            success: true,
            message: 'O passaporte aparentava ser autêntico: papel correto, carimbos válidos, foto do portador. Emitido pelo "Reino de Taured" em idioma que parecia uma mistura de francês e catalão.',
            cluesFound: [gameData.clues.original_passport],
            stateChanges: { interdimensionalTheory: 30 },
          }),
        },
        {
          id: 'examine_documentation',
          text: 'Examinar Outros Documentos',
          action: () => ({
            success: true,
            message: 'Carteira de motorista emitida em Taured, cartas comerciais de empresa sediada em Taured, e documentos que pareciam completamente legítimos.',
            cluesFound: [gameData.clues.drivers_license, gameData.clues.company_documentation],
            stateChanges: { interdimensionalTheory: 20 },
          }),
        },
        {
          id: 'analyze_map_incident',
          text: 'Analisar Incidente do Mapa Mundial',
          action: () => ({
            success: true,
            message: 'Quando mostrado um mapa-múndi, o homem ficou visivelmente perturbado. Apontou para onde hoje é Andorra e disse "Este é Taured". Não reconhecia Andorra como nome válido.',
            cluesFound: [gameData.clues.world_map_analysis],
            stateChanges: { timelineDistortion: 25 },
          }),
        },
      ],
    },
    hotel_investigation: {
      title: 'Investigação no Hotel Imperial - Quarto 1015',
      description: 'Examine o quarto onde o homem de Taured desapareceu misteriosamente.',
      background: 'O homem foi escoltado para hotel sob guarda após incidente no aeroporto. Desapareceu de quarto vigiado.',
      choices: [
        {
          id: 'analyze_currency',
          text: 'Analisar Moeda Europeia Encontrada',
          action: () => ({
            success: true,
            message: 'O dinheiro era europeu legítimo, mas incluía moedas e cédulas que nenhum especialista conseguiu identificar. Metal e papel autênticos, mas design desconhecido.',
            cluesFound: [gameData.clues.european_currency],
          }),
        },
        {
          id: 'examine_checkbook',
          text: 'Examinar Talão de Cheques',
          action: () => ({
            success: true,
            message: 'Verificação revelou que a conta bancária listada no talão realmente existia em banco europeu, com saldo substancial em nome do portador.',
            cluesFound: [gameData.clues.checkbook_account],
            stateChanges: { conspiracyLevel: 20 },
          }),
        },
        {
          id: 'interview_hotel_staff',
          text: 'Entrevistar Equipe do Hotel',
          action: () => ({
            success: true,
            message: 'Funcionários confirmam check-in normal. Gerente diz: "Ele parecia um homem de negócios comum. Falava japonês básico e inglês fluente. Nada suspeito em seu comportamento."',
            cluesFound: [gameData.clues.hotel_staff_testimony],
          }),
        },
        {
          id: 'investigate_locked_room',
          text: 'Investigar Mistério do Quarto Trancado',
          action: () => ({
            success: true,
            message: 'Guarda de segurança relatou: "Vigiamos o corredor toda noite. Porta estava trancada por dentro. Janela no 10º andar, impossível escapar. Pela manhã, quarto vazio. Como se nunca tivesse existido."',
            cluesFound: [gameData.clues.locked_room_mystery, gameData.clues.security_guard_report],
            stateChanges: { timelineDistortion: 40 },
          }),
        },
      ],
    },
    government_archive_investigation: {
      title: 'Arquivo Secreto do Governo Japonês',
      description: 'Acesse documentos classificados sobre o incidente Taured.',
      background: 'Arquivos governamentais mantidos em sigilo por décadas.',
      choices: [
        {
          id: 'discover_coverup',
          text: 'Descobrir Encobrimento Oficial',
          action: () => ({
            success: true,
            message: 'Documentos revelam ordem para classificar caso como "sensível à segurança nacional". Instruções para negar existência do incidente publicamente.',
            cluesFound: [gameData.clues.government_coverup],
            stateChanges: { conspiracyLevel: 30 },
          }),
        },
        {
          id: 'find_disappeared_documents',
          text: 'Localizar Documentos Desaparecidos',
          action: () => ({
            success: true,
            message: 'Vários arquivos marcados como "removidos por ordem superior". Lista inclui: fotos do passaporte, gravações de interrogatório, amostras da moeda.',
            cluesFound: [gameData.clues.disappeared_documents],
            stateChanges: { conspiracyLevel: 25 },
          }),
        },
        {
          id: 'analyze_andorra_connection',
          text: 'Analisar Conexão com Andorra',
          action: () => ({
            success: true,
            message: 'Relatório secreto sugere que em realidade paralela, região da Andorra seria conhecida como "Taured". Teoria de dimensões alternativas considerada seriamente.',
            cluesFound: [gameData.clues.andorra_connection],
            stateChanges: { interdimensionalTheory: 45 },
          }),
        },
      ],
    },
    conspiracy_investigation: {
      title: 'Investigação de Conspiração Online',
      description: 'Explore teorias alternativas sobre o caso Taured.',
      choices: [
        {
          id: 'parallel_reality_theory',
          text: 'Teoria da Realidade Paralela',
          action: () => ({
            success: true,
            message: 'Física quântica sugere múltiplas realidades. Em uma delas, Taured poderia ter evoluído diferentemente da nossa Andorra.',
            stateChanges: { interdimensionalTheory: 35 },
          }),
        },
        {
          id: 'time_travel_theory',
          text: 'Teoria da Viagem no Tempo',
          action: () => ({
            success: true,
            message: 'Homem poderia ser viajante temporal de linha temporal alternativa onde história se desenvolveu diferentemente.',
            stateChanges: { timelineDistortion: 30 },
          }),
        },
        {
          id: 'government_experiment_theory',
          text: 'Teoria do Experimento Governamental',
          action: () => ({
            success: true,
            message: 'Possível teste de tecnologia militar secreta ou experimento psicológico de guerra fria.',
            stateChanges: { conspiracyLevel: 40 },
          }),
        },
      ],
    },
    forensic_analysis: {
      title: 'Análise Forense Avançada',
      description: 'Examine evidências físicas com tecnologia moderna.',
      background: 'Tecnologia ORION permite análise retroativa de evidências.',
      choices: [
        {
          id: 'fingerprint_analysis',
          text: 'Analisar Impressões Digitais Anômalas',
          action: () => ({
            success: true,
            message: 'Padrões dermatoglíficos impossíveis: loop duplo com whorl central. Configuração biologicamente impossível em humanos terrestres.',
            cluesFound: [gameData.clues.fingerprint_anomaly],
            stateChanges: { interdimensionalTheory: 40 },
          }),
        },
        {
          id: 'medical_analysis',
          text: 'Examinar Dados Médicos',
          action: () => ({
            success: true,
            message: 'Sangue tipo O negativo com anomalias genéticas. DNA mostra variações em 23 loci que não correspondem a populações humanas conhecidas.',
            cluesFound: [gameData.clues.medical_examination],
            stateChanges: { interdimensionalTheory: 35 },
          }),
        },
        {
          id: 'metallurgy_analysis',
          text: 'Análise Metalúrgica das Moedas',
          action: () => ({
            success: true,
            message: 'Liga metálica contém isótopos impossíveis de produzir em 1954. Composição sugere tecnologia de fusão avançada.',
            cluesFound: [gameData.clues.currency_metallurgy],
            stateChanges: { conspiracyLevel: 30 },
          }),
        },
      ],
    },
    linguistic_investigation: {
      title: 'Investigação Linguística',
      description: 'Analise o idioma e dialeto falado pelo homem de Taured.',
      background: 'Especialistas em linguística examinaram gravações do interrogatório.',
      choices: [
        {
          id: 'language_analysis',
          text: 'Analisar Estrutura Linguística',
          action: () => ({
            success: true,
            message: 'Idioma combina francês medieval com catalão moderno. Gramática inclui casos que não existem em línguas indo-europeias conhecidas.',
            cluesFound: [gameData.clues.linguistic_analysis],
            stateChanges: { interdimensionalTheory: 25 },
          }),
        },
        {
          id: 'interpreter_testimony',
          text: 'Entrevistar Intérprete Original',
          action: () => ({
            success: true,
            message: 'Professor Kowalski: "Nunca ouvi nada igual. Era como se ele falasse uma evolução natural do provençal que seguiu um caminho diferente por mil anos."',
            cluesFound: [gameData.clues.interpreter_account],
            stateChanges: { interdimensionalTheory: 20 },
          }),
        },
        {
          id: 'customs_officer_notes',
          text: 'Revisar Notas do Oficial Tanaka',
          action: () => ({
            success: true,
            message: 'Oficial Tanaka documentou: "Homem escreveu em script desconhecido. Parecia alfabeto latino modificado com caracteres adicionais. Muito fluente."',
            cluesFound: [gameData.clues.customs_officer_notes],
          }),
        },
      ],
    },
    psychological_profile: {
      title: 'Perfil Psicológico Detalhado',
      description: 'Analise o estado mental e memórias do homem de Taured.',
      background: 'Psiquiatras governamentais conduziram avaliação completa.',
      choices: [
        {
          id: 'memory_consistency',
          text: 'Verificar Consistência das Memórias',
          action: () => ({
            success: true,
            message: 'Memórias extremamente detalhadas e consistentes. Descreveu geografia, história e cultura de Taured com precisão impossível para fantasia.',
            cluesFound: [gameData.clues.psychological_profile],
            stateChanges: { interdimensionalTheory: 30 },
          }),
        },
        {
          id: 'travel_history_analysis',
          text: 'Analisar Histórico de Viagens',
          action: () => ({
            success: true,
            message: 'Carimbos de países que existem, mas com nomes ligeiramente diferentes. "España" ao invés de "España", "Frankreich" ao invés de "France".',
            cluesFound: [gameData.clues.travel_history],
            stateChanges: { timelineDistortion: 25 },
          }),
        },
        {
          id: 'climate_description',
          text: 'Examinar Descrições Climáticas',
          action: () => ({
            success: true,
            message: 'Descreveu clima de Taured como mais úmido que Andorra, com estações diferentes. Conhecimento detalhado de padrões meteorológicos impossível de inventar.',
            cluesFound: [gameData.clues.climate_records],
            stateChanges: { interdimensionalTheory: 20 },
          }),
        },
      ],
    },
    international_verification: {
      title: 'Verificação Internacional',
      description: 'Consulte autoridades internacionais sobre Taured.',
      background: 'Embaixadas e organizações internacionais foram contactadas.',
      choices: [
        {
          id: 'embassy_inquiries',
          text: 'Consultar Registros de Embaixadas',
          action: () => ({
            success: true,
            message: 'Todas as embaixadas europeias negaram conhecimento de Taured. Registros diplomáticos não mostram nenhum país com esse nome.',
            cluesFound: [gameData.clues.embassy_records],
            stateChanges: { conspiracyLevel: 15 },
          }),
        },
        {
          id: 'interpol_search',
          text: 'Busca na Interpol',
          action: () => ({
            success: true,
            message: 'Interpol confirma: nenhum país membro chamado Taured. Nenhum registro de passaportes emitidos por tal nação.',
            cluesFound: [gameData.clues.interpol_check],
            stateChanges: { conspiracyLevel: 10 },
          }),
        },
        {
          id: 'un_records',
          text: 'Verificar Registros da ONU',
          action: () => ({
            success: true,
            message: 'Nações Unidas confirmam: nunca houve membro chamado Taured. Registros históricos não mostram tal nação.',
            cluesFound: [gameData.clues.un_membership_records],
            stateChanges: { conspiracyLevel: 10 },
          }),
        },
      ],
    },
    surveillance_analysis: {
      title: 'Análise de Vigilância',
      description: 'Examine filmagens de segurança e evidências visuais.',
      background: 'Câmeras de segurança capturaram momentos cruciais.',
      choices: [
        {
          id: 'airport_cctv',
          text: 'Analisar CCTV do Aeroporto',
          action: () => ({
            success: true,
            message: 'Filmagens mostram homem chegando normalmente. Nenhuma edição detectada. Comportamento consistente com viajante de negócios.',
            cluesFound: [gameData.clues.airport_cctv_footage],
          }),
        },
        {
          id: 'hotel_cctv_gap',
          text: 'Investigar Falha nas Câmeras do Hotel',
          action: () => ({
            success: true,
            message: 'Período de 6 horas sem gravação inexplicável. Sistema funcionando normalmente antes e depois. Falha coincide exatamente com desaparecimento.',
            cluesFound: [gameData.clues.hotel_cctv_gap],
            stateChanges: { timelineDistortion: 30, conspiracyLevel: 20 },
          }),
        },
        {
          id: 'witness_reports',
          text: 'Coletar Relatos de Testemunhas',
          action: () => ({
            success: true,
            message: 'Hóspedes relataram luzes estranhas e sons metálicos vindos do corredor durante a noite. Alguns descreveram sensação de "tempo parado".',
            cluesFound: [gameData.clues.hotel_guest_reports],
            stateChanges: { timelineDistortion: 25 },
          }),
        },
      ],
    },
    historical_research: {
      title: 'Pesquisa Histórica',
      description: 'Investigue registros históricos sobre Taured.',
      background: 'Análise de documentos históricos e mapas antigos.',
      choices: [
        {
          id: 'ancient_maps',
          text: 'Examinar Mapas Históricos',
          action: () => ({
            success: true,
            message: 'Mapas de 1200-1800 nunca mostram Taured. Região sempre identificada como Andorra ou território disputado.',
            cluesFound: [gameData.clues.historical_maps],
            stateChanges: { interdimensionalTheory: 15 },
          }),
        },
        {
          id: 'genealogy_search',
          text: 'Pesquisa Genealógica',
          action: () => ({
            success: true,
            message: 'Família descrita pelo homem nunca existiu. Registros de nascimento, casamento e morte não encontrados em nenhum arquivo europeu.',
            cluesFound: [gameData.clues.genealogy_research],
            stateChanges: { interdimensionalTheory: 20 },
          }),
        },
        {
          id: 'similar_cases_research',
          text: 'Pesquisar Casos Similares',
          action: () => ({
            success: true,
            message: 'Descobertos 12 casos similares entre 1950-1960: pessoas de países inexistentes. Todos envolvem Europa e todos foram classificados.',
            cluesFound: [gameData.clues.similar_cases],
            stateChanges: { conspiracyLevel: 35 },
          }),
        },
      ],
    },
    quantum_investigation: {
      title: 'Investigação Quântica',
      description: 'Use tecnologia ORION para detectar anomalias dimensionais.',
      background: 'Sensores quânticos detectaram perturbações temporais.',
      choices: [
        {
          id: 'quantum_signature',
          text: 'Analisar Assinatura Quântica',
          action: () => ({
            success: true,
            message: 'Vestígios de energia dimensional detectados no quarto 1015. Padrão consistente com dobra no espaço-tempo.',
            cluesFound: [gameData.clues.quantum_signature],
            stateChanges: { interdimensionalTheory: 50 },
          }),
        },
        {
          id: 'timeline_convergence',
          text: 'Detectar Convergência Temporal',
          action: () => ({
            success: true,
            message: 'Evidência de múltiplas linhas temporais se sobrepondo em julho de 1954. Três realidades distintas detectadas.',
            cluesFound: [gameData.clues.timeline_convergence],
            stateChanges: { timelineDistortion: 60 },
          }),
        },
        {
          id: 'dimensional_tear',
          text: 'Localizar Rasgo Dimensional',
          action: () => ({
            success: true,
            message: 'Rasgo microscópico no tecido do espaço-tempo detectado. Ainda ativo, mas instável. Portal para realidade alternativa.',
            cluesFound: [gameData.clues.dimensional_fabric_tear],
            stateChanges: { interdimensionalTheory: 65, timelineDistortion: 45 },
          }),
        },
      ],
    },
    conspiracy_deep_dive: {
      title: 'Investigação Profunda de Conspiração',
      description: 'Explore teorias avançadas sobre o caso Taured.',
      background: 'Conexões com projetos militares e experimentos classificados.',
      choices: [
        {
          id: 'mk_ultra_connection',
          text: 'Investigar Conexão MK-Ultra',
          action: () => ({
            success: true,
            message: 'Documentos sugerem experimento de implantação de memórias falsas. Taured poderia ser identidade artificial criada.',
            cluesFound: [gameData.clues.mk_ultra_connection],
            stateChanges: { conspiracyLevel: 40 },
          }),
        },
        {
          id: 'philadelphia_link',
          text: 'Examinar Ligação com Experimento Filadélfia',
          action: () => ({
            success: true,
            message: 'Tecnologia similar à utilizada no USS Eldridge. Possível teste de teletransporte dimensional.',
            cluesFound: [gameData.clues.philadelphia_experiment_link],
            stateChanges: { conspiracyLevel: 35, timelineDistortion: 30 },
          }),
        },
        {
          id: 'project_stargate',
          text: 'Investigar Projeto Stargate',
          action: () => ({
            success: true,
            message: 'Programa de visão remota da CIA. Agentes psíquicos relataram visões de "Taured" em sessões de 1953.',
            cluesFound: [gameData.clues.project_stargate],
            stateChanges: { conspiracyLevel: 30 },
          }),
        },
      ],
    },
    personal_investigation: {
      title: 'Investigação Pessoal do Agente',
      description: 'Examine suas próprias memórias e identidade.',
      background: 'Evidências sugerem conexão pessoal com o caso.',
      choices: [
        {
          id: 'memory_implant_check',
          text: 'Verificar Implantes de Memória',
          action: () => ({
            success: true,
            message: 'Scan cerebral revela anomalias na região do hipocampo. Padrões consistentes com manipulação de memória.',
            cluesFound: [gameData.clues.player_memory_implant],
            stateChanges: { identityCrisis: 40 },
          }),
        },
        {
          id: 'taured_citizenship',
          text: 'Descobrir Documento de Cidadania',
          action: () => ({
            success: true,
            message: 'Em arquivo ultra-secreto: certidão de nascimento em seu nome, emitida em Taured. Data corresponde ao seu nascimento.',
            cluesFound: [gameData.clues.taured_citizenship_document],
            stateChanges: { identityCrisis: 60, interdimensionalTheory: 45 },
          }),
        },
        {
          id: 'family_photo_anomaly',
          text: 'Examinar Foto de Família Anômala',
          action: () => ({
            success: true,
            message: 'Foto em seus arquivos pessoais mostra você com família em paisagem que não corresponde a lugar conhecido. Backdating de Taured.',
            cluesFound: [gameData.clues.family_photo_anomaly],
            stateChanges: { identityCrisis: 50, interdimensionalTheory: 35 },
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

export const getAvailableLocations = (gameState: any, clues: Clue[]): LocationData[] => {
  return Object.values(gameData.locations).filter(location => {
    if (location.available) return true
    if (location.unlockCondition) {
      return location.unlockCondition(gameState, clues)
    }
    return false
  }) as LocationData[]
}

export const getAvailableTools = (gameState: any, clues: Clue[], playerTools: Record<Tool, boolean>): ToolData[] => {
  return Object.values(gameData.tools).filter(tool => {
    if (!playerTools[tool.id]) return false
    if (tool.available) return true
    if (tool.unlockCondition) {
      return tool.unlockCondition(gameState, clues)
    }
    return false
  }) as ToolData[]
}

