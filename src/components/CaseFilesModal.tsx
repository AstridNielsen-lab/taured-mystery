'use client'

import { useState, useEffect } from 'react'

interface CaseFilesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CaseFilesModal({ isOpen, onClose }: CaseFilesModalProps) {
  const [currentFile, setCurrentFile] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const caseFiles = [
    {
      id: 'CASE-001',
      title: 'CASO TAURED - ARQUIVO PRINCIPAL',
      date: '1954-07-23',
      classification: 'ULTRA SECRETO',
      content: [
        '📋 RESUMO EXECUTIVO:',
        'Em 1954, um homem caucasiano desconhecido chegou ao Aeroporto Haneda',
        'portando passaporte do "Reino de Taured" - país geograficamente impossível.',
        '',
        '🔍 EVIDÊNCIAS FÍSICAS:',
        '• Passaporte com características autênticas, mas país inexistente',
        '• Moedas com liga metálica impossível para época',
        '• Carteira de motorista com padrões de segurança avançados',
        '• DNA com variações genéticas não catalogadas',
        '',
        '⚠️ ANOMALIAS DETECTADAS:',
        '• Flutuações dimensionais no Hotel Imperial',
        '• Interferência temporal durante investigação',
        '• Desaparecimento sem vestígios físicos',
        '',
        '🎯 STATUS: CASO REABERTO COM NOVA TECNOLOGIA'
      ]
    },
    {
      id: 'CASE-002',
      title: 'RELATÓRIO DE TESTEMUNHAS',
      date: '1954-07-24',
      classification: 'CONFIDENCIAL',
      content: [
        '👥 TESTEMUNHA #1 - Oficial Sato (Imigração):',
        '"O homem parecia genuinamente confuso quando questionado sobre',
        'a localização de Taured. Insistia que o país existia há séculos"',
        '',
        '👥 TESTEMUNHA #2 - Intérprete Linguístico:',
        '"Falava um dialeto que não consegui identificar. Parecia',
        'uma mistura de francês e espanhol, mas com estruturas únicas"',
        '',
        '👥 TESTEMUNHA #3 - Recepcionista do Hotel:',
        '"Durante a noite, relatamos flutuações na energia elétrica',
        'e ruídos estranhos vindos do corredor do 10º andar"',
        '',
        '👥 TESTEMUNHA #4 - Segurança do Hotel:',
        '"A porta estava trancada por dentro. Fisicamente impossível',
        'alguém sair sem ser detectado. Ainda assim, ele desapareceu"'
      ]
    },
    {
      id: 'CASE-003',
      title: 'ANÁLISE CIENTÍFICA MODERNA',
      date: '2024-06-12',
      classification: 'ORION EYES ONLY',
      content: [
        '🔬 ANÁLISE DNA (Tecnologia 2024):',
        'Sequenciamento revelou marcadores genéticos impossíveis:',
        '• 23 pares de cromossomos + fragmento adicional não identificado',
        '• Proteínas com estruturas quaternárias inexistentes na Terra',
        '',
        '⚛️ ANÁLISE QUÂNTICA:',
        'Detector de anomalias identificou:',
        '• Assinatura dimensional classe Delta-7',
        '• Frequência de vibração 432Hz (ressonância interdimensional)',
        '• Campo de energia residual com duração de 70 anos',
        '',
        '🌌 CONCLUSÃO CIENTÍFICA:',
        'Evidências suportam Hipótese de Convergência Dimensional.',
        'Probabilidade de origem paralela: 89.7%',
        '',
        '⚡ SISTEMA ORION ATIVO - INVESTIGAÇÃO EM ANDAMENTO'
      ]
    }
  ]

  useEffect(() => {
    if (isOpen) {
      setAnimationKey(prev => prev + 1)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-orion-dark border-2 border-orion-blue rounded-lg w-full max-w-6xl h-5/6 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="border-b border-orion-blue p-6 flex justify-between items-center bg-gradient-to-r from-orion-dark to-black">
          <div>
            <h2 className="text-orion-blue font-bold text-2xl">📁 ARQUIVOS DE CASOS - ORION</h2>
            <p className="text-green-300 text-sm mt-1">Sistema de Arquivos Classificados • Acesso Autorizado</p>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-bold text-2xl transition-colors p-2 hover:bg-red-400 hover:bg-opacity-20 rounded"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar com lista de arquivos */}
          <div className="w-1/3 border-r border-green-400 p-4 bg-black bg-opacity-30">
            <h3 className="text-yellow-400 font-bold mb-4">📋 ÍNDICE DE ARQUIVOS</h3>
            <div className="space-y-2">
              {caseFiles.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => setCurrentFile(index)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    currentFile === index
                      ? 'border-orion-blue bg-orion-blue bg-opacity-20 text-white'
                      : 'border-green-400 text-green-300 hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-10'
                  }`}
                >
                  <div className="font-mono text-xs text-yellow-400">{file.id}</div>
                  <div className="font-semibold text-sm">{file.title}</div>
                  <div className="text-xs text-gray-400">{file.date}</div>
                  <div className={`text-xs font-bold mt-1 ${
                    file.classification === 'ULTRA SECRETO' ? 'text-red-400' :
                    file.classification === 'ORION EYES ONLY' ? 'text-purple-400' :
                    'text-yellow-400'
                  }`}>
                    🔒 {file.classification}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-green-400 bg-opacity-10 border border-green-400 rounded">
              <div className="text-green-300 text-xs font-bold mb-2">💡 DICA PARA INVESTIGADORES:</div>
              <div className="text-green-300 text-xs">
                Use o Terminal Central ORION para acessar arquivos detalhados:
                <div className="font-mono bg-black bg-opacity-50 p-2 mt-2 rounded">
                  cd locais<br/>
                  cat aeroporto_haneda.txt
                </div>
              </div>
            </div>
          </div>
          
          {/* Conteúdo do arquivo */}
          <div className="flex-1 p-6">
            <div key={animationKey} className="h-full">
              <div className="border border-green-400 rounded bg-black bg-opacity-50 h-full flex flex-col">
                <div className="border-b border-green-400 p-4 bg-gradient-to-r from-green-400 from-opacity-10 to-transparent">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-orion-blue font-bold text-xl">{caseFiles[currentFile].title}</h3>
                      <div className="text-green-300 text-sm mt-1">
                        Arquivo: {caseFiles[currentFile].id} | Data: {caseFiles[currentFile].date}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-bold ${
                      caseFiles[currentFile].classification === 'ULTRA SECRETO' ? 'bg-red-400 bg-opacity-20 text-red-400 border border-red-400' :
                      caseFiles[currentFile].classification === 'ORION EYES ONLY' ? 'bg-purple-400 bg-opacity-20 text-purple-400 border border-purple-400' :
                      'bg-yellow-400 bg-opacity-20 text-yellow-400 border border-yellow-400'
                    }`}>
                      {caseFiles[currentFile].classification}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="font-mono text-green-300 space-y-2">
                    {caseFiles[currentFile].content.map((line, index) => (
                      <div 
                        key={index} 
                        className={`${
                          line.startsWith('📋') || line.startsWith('🔍') || line.startsWith('⚠️') || line.startsWith('🎯') || line.startsWith('👥') || line.startsWith('🔬') || line.startsWith('⚛️') || line.startsWith('🌌') || line.startsWith('⚡')
                            ? 'text-orion-blue font-bold text-lg mt-4 mb-2'
                            : line.startsWith('•')
                            ? 'text-yellow-400 ml-4'
                            : line.startsWith('"')
                            ? 'text-green-200 italic ml-4'
                            : 'text-green-300'
                        }`}
                        style={{ 
                          animationDelay: `${index * 0.05}s`,
                          animation: 'fadeInUp 0.5s ease-out forwards',
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
              🔐 Acesso autorizado • Sistema ORION v3.2.1
            </div>
            <div className="text-yellow-400">
              ⚡ {caseFiles.length} arquivo(s) disponível(is) • Última atualização: 2024-06-12
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

