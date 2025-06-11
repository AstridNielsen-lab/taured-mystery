'use client'

import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [loadingText, setLoadingText] = useState('')
  const [progress, setProgress] = useState(0)

  const loadingSteps = [
    'Inicializando sistemas ORION...',
    'Conectando base de dados multiversal...',
    'Calibrando detectores temporais...',
    'Carregando arquivos classificados...',
    'Estabelecendo conexão interdimensional...',
    'Sistema pronto para investigação.'
  ]

  useEffect(() => {
    let stepIndex = 0
    let charIndex = 0
    
    const typeStep = () => {
      if (stepIndex >= loadingSteps.length) return
      
      const currentStep = loadingSteps[stepIndex]
      
      if (charIndex < currentStep.length) {
        setLoadingText(currentStep.substring(0, charIndex + 1))
        charIndex++
        setTimeout(typeStep, 50)
      } else {
        // Próximo passo após uma pausa
        setTimeout(() => {
          stepIndex++
          charIndex = 0
          setProgress((stepIndex / loadingSteps.length) * 100)
          typeStep()
        }, 800)
      }
    }

    typeStep()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-orion-dark relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-orion-dark via-gray-900 to-black"></div>
      <div className="scan-line"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 text-center max-w-2xl mx-4">
        {/* Logo ORION */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-orion-blue mb-4 glow-text font-sci-fi">
            <span className="glitch" data-text="ORION">ORION</span>
          </h1>
          <div className="text-green-400 text-xl font-mono">
            UNIDADE DE INVESTIGAÇÃO INTERDIMENSIONAL
          </div>
        </div>

        {/* Terminal de carregamento */}
        <div className="terminal-screen max-w-xl mx-auto mb-8">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-green-400 text-sm ml-4">ORION_TERMINAL v2.1.4</div>
          </div>
          
          <div className="text-left space-y-2">
            <div className="text-green-400">
              ORION_SYSTEM:~$ initialize_investigation
            </div>
            <div className="text-green-300 min-h-[1.5rem]">
              {loadingText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="mt-6">
            <div className="bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-orion-blue to-green-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-green-400 text-sm text-right">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Avisos de segurança */}
        <div className="text-sm text-yellow-400 space-y-1">
          <div className="flicker">⚠️ CLASSIFICAÇÃO: ULTRA SECRETO</div>
          <div>🔒 ACESSO AUTORIZADO APENAS A AGENTES ORION</div>
          <div>📡 CONEXÃO CRIPTOGRAFADA ESTABELECIDA</div>
        </div>
      </div>
      
      {/* Efeitos visuais adicionais */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orion-blue to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
    </div>
  )
}

