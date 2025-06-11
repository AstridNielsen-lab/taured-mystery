'use client'

import { useState } from 'react'

interface MainMenuProps {
  onStartGame: () => void
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  const [selectedOption, setSelectedOption] = useState(0)
  
  const menuOptions = [
    { label: 'INICIAR INVESTIGAÇÃO', action: onStartGame },
    { label: 'ARQUIVOS DE CASOS', action: () => alert('Em desenvolvimento') },
    { label: 'CONFIGURAÇÕES', action: () => alert('Em desenvolvimento') },
    { label: 'SOBRE A ORION', action: () => alert('Unidade ORION - Investigação de Anomalias Interdimensionais') },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Título principal */}
      <div className="text-center max-w-4xl mx-4">
        <div className="mb-12">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orion-blue to-green-400 mb-4 font-sci-fi">
            O ENIGMA
          </h1>
          <h2 className="text-6xl font-bold text-taured-gold mb-6 font-sci-fi glitch" data-text="DE TAURED">
            DE TAURED
          </h2>
          <div className="text-green-400 text-xl mb-8 font-mono">
            INVESTIGAÇÃO INTERDIMENSIONAL • CASO #1954-07-15
          </div>
        </div>

        {/* Briefing */}
        <div className="terminal-screen max-w-2xl mx-auto mb-12">
          <div className="text-left space-y-3">
            <div className="text-orion-blue font-bold border-b border-orion-blue pb-2 mb-4">
              📋 BRIEFING INICIAL
            </div>
            <p className="text-green-300">
              <span className="text-yellow-400">DATA:</span> 15 de Julho de 1954
            </p>
            <p className="text-green-300">
              <span className="text-yellow-400">LOCAL:</span> Aeroporto de Tóquio, Japão
            </p>
            <p className="text-green-300">
              <span className="text-yellow-400">ANOMALIA:</span> Homem com passaporte do Reino de Taured
            </p>
            <p className="text-green-300 mt-4">
              Um homem misterioso apareceu no aeroporto com documentos de um país 
              que não existe. Ele desapareceu sem deixar rastros de um quarto 
              vigiado. Sua missão: descobrir a verdade.
            </p>
          </div>
        </div>

        {/* Menu de opções */}
        <div className="space-y-4">
          {menuOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              onMouseEnter={() => setSelectedOption(index)}
              className={`
                block w-full max-w-md mx-auto px-8 py-4 font-mono text-lg transition-all duration-300
                border-2 rounded-lg transform hover:scale-105
                ${
                  selectedOption === index
                    ? 'border-orion-blue bg-orion-blue bg-opacity-20 text-white glow'
                    : 'border-green-400 text-green-400 hover:border-orion-blue hover:text-white'
                }
              `}
            >
              <span className="mr-4">{'>'}</span>
              {option.label}
              <span className={`ml-4 transition-opacity ${selectedOption === index ? 'opacity-100' : 'opacity-0'}`}>
                {'<'}
              </span>
            </button>
          ))}
        </div>

        {/* Rodapé */}
        <div className="mt-16 text-sm text-gray-500 space-y-2">
          <div>🎮 Um jogo interativo de mistério interdimensional</div>
          <div>🚀 Desenvolvido com Next.js e TypeScript</div>
          <div className="flicker">⚡ Versão Beta • Unidade ORION</div>
        </div>
      </div>

      {/* Efeitos visuais de fundo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orion-blue rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-mystery-purple rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-taured-gold rounded-full blur-2xl opacity-15 animate-pulse-slow"></div>
      </div>
    </div>
  )
}

