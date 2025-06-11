'use client'

import { useState, useEffect } from 'react'
import { useGame } from '@/hooks/useGame'

interface IntroSequenceProps {
  onComplete: () => void
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const { player } = useGame()

  const introSteps = [
    {
      type: 'system',
      text: 'CONECTANDO À BASE DE DADOS ORION...',
      delay: 1000
    },
    {
      type: 'system', 
      text: 'ACESSO AUTORIZADO. BEM-VINDO, AGENTE.',
      delay: 1500
    },
    {
      type: 'input',
      text: 'DIGITE SEU NOME DE CÓDIGO:',
      delay: 1000
    },
    {
      type: 'briefing',
      text: `EXCELENTE, AGENTE ${playerName || 'X'}. VOCÊ FOI DESIGNADO PARA INVESTIGAR O CASO TAURED.`,
      delay: 2000
    },
    {
      type: 'mission',
      text: 'PREPARANDO EQUIPAMENTOS E INICIANDO MISSÃO...',
      delay: 2000
    }
  ]

  useEffect(() => {
    if (currentStep < introSteps.length) {
      const timer = setTimeout(() => {
        if (introSteps[currentStep].type !== 'input') {
          setCurrentStep(prev => prev + 1)
        }
      }, introSteps[currentStep].delay)
      
      return () => clearTimeout(timer)
    } else {
      // Sequência completa
      setTimeout(onComplete, 1000)
    }
  }, [currentStep, onComplete, playerName])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orion-dark relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="scan-line"></div>
      <div className="absolute inset-0 crt-effect"></div>
      
      <div className="terminal-screen max-w-4xl mx-4 min-h-[500px] relative">
        {/* Header do terminal */}
        <div className="flex items-center justify-between border-b border-green-400 pb-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-400 text-sm">ORION_SECURE_TERMINAL</div>
          <div className="text-green-400 text-sm">{new Date().toISOString().slice(0, 19)}</div>
        </div>

        {/* Conteúdo da sequência */}
        <div className="space-y-4 text-left font-mono">
          {introSteps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className="space-y-2">
              {step.type === 'system' && (
                <div className="text-orion-blue">
                  ORION_SYSTEM:~$ {step.text}
                  {index === currentStep && <span className="animate-pulse">|</span>}
                </div>
              )}
              
              {step.type === 'input' && (
                <div className="space-y-2">
                  <div className="text-yellow-400">
                    ORION_SYSTEM:~$ {step.text}
                  </div>
                  {index === currentStep && (
                    <form onSubmit={handleNameSubmit} className="flex items-center space-x-2">
                      <span className="text-green-400">AGENT_NAME:</span>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="bg-transparent border-b border-green-400 text-green-400 outline-none px-2 py-1 w-48"
                        placeholder="Digite seu nome..."
                        autoFocus
                        maxLength={20}
                      />
                      <button 
                        type="submit"
                        className="text-orion-blue hover:text-blue-300 ml-4"
                      >
                        [ENTER]
                      </button>
                    </form>
                  )}
                </div>
              )}
              
              {step.type === 'briefing' && (
                <div className="space-y-2">
                  <div className="text-green-400">
                    ORION_SYSTEM:~$ {step.text.replace('${playerName || \'X\'}', playerName || 'X')}
                    {index === currentStep && <span className="animate-pulse">|</span>}
                  </div>
                  <div className="bg-orion-blue bg-opacity-20 border border-orion-blue rounded p-4 mt-4">
                    <div className="text-orion-blue font-bold mb-2">📂 ARQUIVO DO CASO:</div>
                    <div className="text-green-300 text-sm space-y-1">
                      <div>• CASO: O Homem de Taured</div>
                      <div>• DATA: 15/07/1954</div>
                      <div>• CLASSIFICAÇÃO: ULTRA SECRETO</div>
                      <div>• STATUS: ATIVO</div>
                      <div>• AGENTE RESPONSÁVEL: {playerName || 'AGENT_X'}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {step.type === 'mission' && (
                <div className="space-y-4">
                  <div className="text-green-400">
                    ORION_SYSTEM:~$ {step.text}
                    {index === currentStep && <span className="animate-pulse">|</span>}
                  </div>
                  
                  {/* Barra de carregamento dos equipamentos */}
                  <div className="space-y-2">
                    <div className="text-green-300 text-sm">Carregando ferramentas de investigação...</div>
                    <div className="bg-gray-700 rounded h-2">
                      <div className="bg-gradient-to-r from-orion-blue to-green-400 h-2 rounded animate-pulse" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-green-300">
                    <div>✅ Banco Multiversal</div>
                    <div>✅ Analisador Temporal</div>
                    <div>✅ Decodificador de Docs</div>
                    <div>✅ Laboratório Portátil</div>
                    <div>✅ ORION Net</div>
                    <div>✅ Detector de Contradições</div>
                  </div>
                  
                  <div className="text-yellow-400 text-center mt-6 animate-pulse">
                    INICIANDO INVESTIGAÇÃO EM 3... 2... 1...
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Skip button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onComplete}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            [ESC] Pular introdução
          </button>
        </div>
      </div>
    </div>
  )
}

