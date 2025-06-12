'use client'

import { useEffect, useRef } from 'react'

interface TerminalLine {
  id: string
  text: string
  type: string
}

interface TerminalOutputProps {
  lines: TerminalLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll para a última linha
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const getLineStyle = (type: string) => {
    const styles: Record<string, string> = {
      system: 'text-orion-blue',
      user: 'text-yellow-400',
      result: 'text-green-300',
      success: 'text-green-400',
      error: 'text-red-400',
      warning: 'text-yellow-400',
      report: 'text-blue-300',
      encyclopedia: 'text-purple-300',
    }
    return styles[type] || 'text-green-400'
  }

  const getLinePrefix = (type: string) => {
    const prefixes: Record<string, string> = {
      system: 'ORION_SYSTEM:~$',
      user: 'AGENT_INPUT:~$',
      result: 'RESULT:',
      success: 'SUCCESS:',
      error: 'ERROR:',
      warning: 'WARNING:',
    }
    return prefixes[type] || 'OUTPUT:'
  }

  return (
    <div className="terminal-screen h-full relative">
      {/* Header do terminal */}
      <div className="flex items-center justify-between border-b border-green-400 pb-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400 text-sm font-bold">
          ORION INVESTIGATION TERMINAL
        </div>
        <div className="text-green-400 text-sm">
          {new Date().toLocaleTimeString('pt-BR')}
        </div>
      </div>

      {/* Conteúdo do terminal */}
      <div 
        ref={terminalRef}
        className="h-full overflow-y-auto font-mono text-sm space-y-1 pb-20"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {/* Banner inicial */}
        <div className="mb-4 p-3 border border-orion-blue rounded bg-orion-blue bg-opacity-10">
          <div className="text-orion-blue font-bold text-center mb-2">
            🌌 TERMINAL DE INVESTIGAÇÃO ORION 🌌
          </div>
          <div className="text-green-300 text-xs text-center">
            Caso: O Enigma de Taured | Classificação: ULTRA SECRETO
          </div>
        </div>

        {/* Linhas do terminal */}
        {lines.map((line, index) => (
          <div 
            key={line.id} 
            className={`flex items-start space-x-2 ${getLineStyle(line.type)} animate-in fade-in duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-gray-500 text-xs min-w-fit">
              [{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
            </span>
            <span className="text-gray-400 text-xs min-w-fit">
              {getLinePrefix(line.type)}
            </span>
            <span className="flex-1 break-words">
              {line.text}
              {index === lines.length - 1 && (
                <span className="animate-pulse ml-1">|</span>
              )}
            </span>
          </div>
        ))}

        {/* Prompt de entrada */}
        <div className="flex items-center space-x-2 text-green-400 mt-4">
          <span className="text-gray-500 text-xs">
            [{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
          </span>
          <span className="text-gray-400 text-xs">AGENT_READY:~$</span>
          <span className="flex-1">
            Aguardando próxima ação...
            <span className="animate-pulse ml-1">|</span>
          </span>
        </div>
      </div>

      {/* Indicadores de status na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 border-t border-green-400 p-2">
        <div className="flex justify-between items-center text-xs">
          <div className="flex space-x-4">
            <span className="text-green-400">⚡ SISTEMA ONLINE</span>
            <span className="text-blue-400">🔐 CONEXÃO SEGURA</span>
            <span className="text-yellow-400">📡 SYNC ORION</span>
          </div>
          <div className="text-gray-400">
            Linhas: {lines.length} | Memória: OK
          </div>
        </div>
      </div>
    </div>
  )
}

