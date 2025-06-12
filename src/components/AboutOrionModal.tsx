'use client'

import { useState, useEffect } from 'react'

interface AboutOrionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutOrionModal({ isOpen, onClose }: AboutOrionModalProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const sections = [
    {
      id: 'mission',
      title: '🎯 MISSÃO DA ORION',
      icon: '🎡',
      content: [
        '🌌 UNIDADE ORION - INVESTIGAÇÃO DE ANOMALIAS INTERDIMENSIONAIS',
        '',
        'A Organização para Resolução de Incidentsões em Ocorrências Não-convencionais',
        '(ORION) é uma unidade ultra-secreta criada em 1955, um ano após o',
        'misterioso incidente de Taured.',
        '',
        '🎯 NOSSA MISSÃO:',
        '• Investigar fenômenos que desafiam a lógica convencional',
        '• Documentar e catalogar anomalias dimensionais',
        '• Proteger a população de ameaças interdimensionais',
        '• Preservar a estabilidade do continuum espaço-temporal',
        '',
        '🕰️ FUNDADA: 1955',
        '🌍 SEDE: Localização Classificada (Dimensão Base)',
        '👥 AGENTES ATIVOS: [DADOS CENSURADOS]',
        '📁 CASOS RESOLVIDOS: 1,247'
      ]
    },
    {
      id: 'technology',
      title: '🔬 TECNOLOGIA ORION',
      icon: '⚙️',
      content: [
        '🖥️ TERMINAL CENTRAL ORION v3.2.1',
        '',
        'Sistema operacional avançado desenvolvido especificamente para',
        'investigações de anomalias interdimensionais.',
        '',
        '🔧 CARACTERÍSTICAS TÉCNICAS:',
        '• Interface PowerShell nativa com comandos especializados',
        '• Sistema de arquivos virtual persistente',
        '• Detector de anomalias quânticas integrado',
        '• IA Assistente especializada (Prof. Júlio Campos Machado)',
        '• Backup dimensional automático',
        '• Criptografia quântica de segurança',
        '',
        '⚛️ FERRAMENTAS DISPONÍVEIS:',
        '• Analisador de DNA Multidimensional',
        '• Scanner Digital com OCR Quântico',
        '• Detector de Anomalias Temporais',
        '• Gerador de Relatórios Automatizado',
        '',
        '📊 PERFORMANCE:',
        '• Tempo de resposta: < 0.001 nanossegundos',
        '• Capacidade de processamento: 847.2 petaflops',
        '• Armazenamento: Infinito (tecnologia dimensional)'
      ]
    },
    {
      id: 'team',
      title: '👥 EQUIPE ORION',
      icon: '🎖️',
      content: [
        '👨‍🔬 PROFESSOR JÚLIO CAMPOS MACHADO',
        'Especialista em Física Quântica & Investigador Chefe',
        '',
        '🎓 FORMAÇÃO ACADÊmica:',
        '• PhD em Física Quântica - MIT (1987)',
        '• Pós-Doutorado em Mecânica Dimensional - CERN (1990)',
        '• Mestrado em Ciência da Computação - Stanford (1985)',
        '',
        '🏆 ESPECIALIDADES:',
        '• Teoria das Cordas e Multiversos',
        '• Investigações de Anomalias Temporais',
        '• Desenvolvimento de IA para Análise Dimensional',
        '• Criptografia Quântica Avançada',
        '',
        '📈 CASOS NOTÁVEIS RESOLVIDOS:',
        '• Incidente de Roswell (Reclassificação Dimensional)',
        '• Triângulo das Bermudas (Portal Temporal Instvel)',
        '• Desaparecimento do Voo MH370 (Falha Dimensional)',
        '• Fenômeno Mandela (Convergência de Realidades)',
        '',
        '🎆 PREMIAÇÕES:',
        '• Medal of Honor ORION (5x)',
        '• Prêmio Nobel Interdimensional (2019)',
        '• Ordem do Mérito Científico Quântico (2021)'
      ]
    },
    {
      id: 'protocols',
      title: '📋 PROTOCOLOS DE SEGURANÇA',
      icon: '🔒',
      content: [
        '🔐 CLASSIFICAÇÕES DE SEGURANÇA',
        '',
        '🟢 NÍVEL VERDE - PÚBLICO',
        'Informações gerais sobre casos resolvidos e notícias.',
        '',
        '🟡 NÍVEL AMARELO - RESTRITO',
        'Dados operacionais básicos, relatórios de campo padrão.',
        '',
        '🟠 NÍVEL LARANJA - CONFIDENCIAL',
        'Informações técnicas, testemunhos de casos ativos.',
        '',
        '🔴 NÍVEL VERMELHO - ULTRA SECRETO',
        'Evidências críticas, localizações de anomalias ativas.',
        '',
        '🟣 NÍVEL VIOLETA - ORION EYES ONLY',
        'Dados dimensionais, tecnologia classificada, operações encoberta.',
        '',
        '⚫ NÍVEL PRETO - ACESSO NEGADO',
        'Informações que podem comprometer a realidade local.',
        '',
        '⚠️ PROTOCOLOS DE EMERGÊNCIA:',
        '• Código Azul: Anomalia dimensional detectada',
        '• Código Vermelho: Brecha interdimensional ativa',
        '• Código Preto: Colapso iminente da realidade local'
      ]
    },
    {
      id: 'getting-started',
      title: '🚀 COMO COMEÇAR',
      icon: '🎯',
      content: [
        '📝 GUIA RÁPIDO PARA NOVOS AGENTES',
        '',
        '🔵 PASSO 1: ACESSO AO TERMINAL',
        'Clique em "INICIAR INVESTIGAÇÃO" para acessar o Terminal Central ORION.',
        'O sistema inicializará automaticamente com suas credenciais.',
        '',
        '🔵 PASSO 2: NAVEGAÇÃO BÁSICA',
        'Use comandos PowerShell nativos:',
        '• "ls" - listar arquivos da pasta atual',
        '• "cd <pasta>" - navegar para uma pasta',
        '• "cat <arquivo>" - visualizar conteúdo',
        '• "help" - ver todos os comandos disponíveis',
        '',
        '🔵 PASSO 3: EXPLORAÇÃO DOS ARQUIVOS',
        'Navegue pelas pastas principais:',
        '• /ferramentas - Equipamentos de análise',
        '• /locais - Informações dos locais do caso',
        '• /logs - Registros da investigação',
        '',
        '🔵 PASSO 4: DOCUMENTAÇÃO',
        'Use "edit-notes" para abrir o editor de anotações.',
        'Documente suas descobertas e teorias.',
        '',
        '🔵 PASSO 5: SALVAMENTO',
        'Use "save-inv" regularmente para salvar seu progresso.',
        'Todas as alterações são mantidas entre sessões.',
        '',
        '🎆 BOA SORTE, AGENTE!',
        'Lembre-se: a verdade está lá fora... em alguma dimensão.'
      ]
    }
  ]

  useEffect(() => {
    if (isOpen) {
      setAnimationKey(prev => prev + 1)
    }
  }, [isOpen, currentSection])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-orion-dark border-2 border-orion-blue rounded-lg w-full max-w-6xl h-5/6 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="border-b border-orion-blue p-6 flex justify-between items-center bg-gradient-to-r from-orion-dark to-black">
          <div>
            <h2 className="text-orion-blue font-bold text-2xl">🌌 SOBRE A ORGANIZAÇÃO ORION</h2>
            <p className="text-green-300 text-sm mt-1">Unidade de Investigação de Anomalias Interdimensionais</p>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-bold text-2xl transition-colors p-2 hover:bg-red-400 hover:bg-opacity-20 rounded"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar com seções */}
          <div className="w-1/3 border-r border-green-400 p-4 bg-black bg-opacity-30">
            <h3 className="text-yellow-400 font-bold mb-4">📋 SEÇÕES</h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    currentSection === index
                      ? 'border-orion-blue bg-orion-blue bg-opacity-20 text-white'
                      : 'border-green-400 text-green-300 hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{section.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{section.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-orion-blue bg-opacity-10 border border-orion-blue rounded">
              <div className="text-orion-blue text-xs font-bold mb-2">🎆 STATUS DA UNIDADE:</div>
              <div className="text-green-300 text-xs space-y-1">
                <div>• Status: OPERACIONAL</div>
                <div>• Nível de Alerta: VERDE</div>
                <div>• Agentes Ativos: ONLINE</div>
                <div>• Sistema: 100% FUNCIONAL</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-400 bg-opacity-10 border border-green-400 rounded">
              <div className="text-green-300 text-xs font-bold mb-2">💡 DICA:</div>
              <div className="text-green-300 text-xs">
                Comece a investigação acessando o Terminal Central ORION.
                Use "help" para ver todos os comandos disponíveis.
              </div>
            </div>
          </div>
          
          {/* Conteúdo da seção */}
          <div className="flex-1 p-6">
            <div key={animationKey} className="h-full">
              <div className="border border-green-400 rounded bg-black bg-opacity-50 h-full flex flex-col">
                <div className="border-b border-green-400 p-4 bg-gradient-to-r from-orion-blue from-opacity-10 to-transparent">
                  <h3 className="text-orion-blue font-bold text-xl">{sections[currentSection].title}</h3>
                  <div className="text-green-300 text-sm mt-1">
                    Seção {currentSection + 1} de {sections.length} • Organização ORION
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="font-mono text-green-300 space-y-2">
                    {sections[currentSection].content.map((line, index) => (
                      <div 
                        key={index} 
                        className={`${
                          line.startsWith('🌌') || line.startsWith('🎯') || line.startsWith('🔧') || line.startsWith('⚛️') || line.startsWith('📊') || line.startsWith('🎓') || line.startsWith('🏆') || line.startsWith('📈') || line.startsWith('🎆') || line.startsWith('🔐') || line.startsWith('📝') || line.startsWith('🔵')
                            ? 'text-orion-blue font-bold text-lg mt-4 mb-2'
                            : line.startsWith('•')
                            ? 'text-yellow-400 ml-4'
                            : line.startsWith('🟢') || line.startsWith('🟡') || line.startsWith('🟠') || line.startsWith('🔴') || line.startsWith('🟣') || line.startsWith('⚫')
                            ? 'text-white font-bold mt-2'
                            : line.includes('NÍVEL') || line.includes('Código')
                            ? 'text-yellow-300 font-semibold'
                            : 'text-green-300'
                        }`}
                        style={{ 
                          animationDelay: `${index * 0.03}s`,
                          animation: 'fadeInRight 0.4s ease-out forwards',
                          opacity: 0
                        }}
                      >
                        {line || '\u00A0'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-orion-blue p-4 bg-gradient-to-r from-black to-orion-dark">
          <div className="flex justify-between items-center text-sm">
            <div className="text-green-300">
              🌌 Organização ORION • Fundada em 1955 • Casos Resolvidos: 1,247
            </div>
            <div className="text-yellow-400">
              🔒 Classificação: ACESSO AUTORIZADO • Agente: {Math.random().toString(36).substr(2, 8).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

