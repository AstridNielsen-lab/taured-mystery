'use client'

import { GameState, Player } from '@/types/game'

interface StatusPanelProps {
  gameState: GameState
  player: Player
}

export function StatusPanel({ gameState, player }: StatusPanelProps) {
  const getStatusColor = (value: number, type: 'sanity' | 'theory' | 'conspiracy' | 'distortion') => {
    if (type === 'sanity') {
      if (value > 80) return 'text-green-400'
      if (value > 50) return 'text-yellow-400'
      return 'text-red-400'
    }
    
    if (value > 75) return 'text-green-400'
    if (value > 50) return 'text-yellow-400'
    if (value > 25) return 'text-orange-400'
    return 'text-gray-400'
  }

  const getProgressBarColor = (value: number, type: 'sanity' | 'theory' | 'conspiracy' | 'distortion') => {
    if (type === 'sanity') {
      if (value > 80) return 'bg-green-400'
      if (value > 50) return 'bg-yellow-400'
      return 'bg-red-400'
    }
    
    if (value > 75) return 'bg-green-400'
    if (value > 50) return 'bg-yellow-400'
    if (value > 25) return 'bg-orange-400'
    return 'bg-gray-400'
  }

  return (
    <div className="terminal-screen">
      <div className="border-b border-green-400 pb-2 mb-4">
        <h2 className="text-orion-blue font-bold text-lg">🕵️ AGENTE {player.name || 'X'}</h2>
        <div className="text-green-300 text-sm">Dia {gameState.day} de Investigação</div>
      </div>
      
      <div className="space-y-4">
        {/* Sanidade */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-400">🧠 Sanidade</span>
            <span className={`text-sm font-bold ${getStatusColor(gameState.playerSanity, 'sanity')}`}>
              {gameState.playerSanity}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(gameState.playerSanity, 'sanity')}`}
              style={{ width: `${gameState.playerSanity}%` }}
            ></div>
          </div>
        </div>
        
        {/* Teoria Interdimensional */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-400">🌌 Teoria Interdimensional</span>
            <span className={`text-sm font-bold ${getStatusColor(gameState.interdimensionalTheory, 'theory')}`}>
              {gameState.interdimensionalTheory}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(gameState.interdimensionalTheory, 'theory')}`}
              style={{ width: `${gameState.interdimensionalTheory}%` }}
            ></div>
          </div>
        </div>
        
        {/* Nível de Conspiração */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-400">🕵️ Nível de Conspiração</span>
            <span className={`text-sm font-bold ${getStatusColor(gameState.conspiracyLevel, 'conspiracy')}`}>
              {gameState.conspiracyLevel}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(gameState.conspiracyLevel, 'conspiracy')}`}
              style={{ width: `${gameState.conspiracyLevel}%` }}
            ></div>
          </div>
        </div>
        
        {/* Distorção Temporal */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-400">🌀 Distorção Temporal</span>
            <span className={`text-sm font-bold ${getStatusColor(gameState.timelineDistortion, 'distortion')}`}>
              {gameState.timelineDistortion}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(gameState.timelineDistortion, 'distortion')}`}
              style={{ width: `${gameState.timelineDistortion}%` }}
            ></div>
          </div>
        </div>
        
        {/* Confiança no Governo */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-400">🏛️ Confiança no Governo</span>
            <span className={`text-sm font-bold ${
              gameState.trustGovernment > 0 ? 'text-green-400' : 
              gameState.trustGovernment < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
              {gameState.trustGovernment > 0 ? '+' : ''}{gameState.trustGovernment}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            {gameState.trustGovernment > 5 ? 'Alta Confiança' :
             gameState.trustGovernment > 0 ? 'Confiança Moderada' :
             gameState.trustGovernment === 0 ? 'Neutro' :
             gameState.trustGovernment > -5 ? 'Desconfiança Moderada' : 'Alta Desconfiança'}
          </div>
        </div>
      </div>
      
      {/* Alertas */}
      <div className="mt-6 space-y-2">
        {gameState.playerSanity < 30 && (
          <div className="text-red-400 text-xs p-2 border border-red-400 rounded bg-red-900 bg-opacity-20 flicker">
            ⚠️ ALERTA: Nível crítico de sanidade!
          </div>
        )}
        
        {gameState.timelineDistortion > 80 && (
          <div className="text-purple-400 text-xs p-2 border border-purple-400 rounded bg-purple-900 bg-opacity-20">
            🌀 ANOMALIA: Distorção temporal extrema detectada!
          </div>
        )}
        
        {gameState.interdimensionalTheory > 75 && (
          <div className="text-cyan-400 text-xs p-2 border border-cyan-400 rounded bg-cyan-900 bg-opacity-20">
            🌌 DESCOBERTA: Evidência interdimensional confirmada!
          </div>
        )}
        
        {gameState.conspiracyLevel > 75 && (
          <div className="text-yellow-400 text-xs p-2 border border-yellow-400 rounded bg-yellow-900 bg-opacity-20">
            🕵️ ALERTA: Conspiração governamental confirmada!
          </div>
        )}
      </div>
    </div>
  )
}

