'use client'

import { LogEntry, Clue } from '@/types/game'

interface InvestigationLogProps {
  log: LogEntry[]
  clues: Clue[]
}

export function InvestigationLog({ log, clues }: InvestigationLogProps) {
  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp)
  }

  const getActionIcon = (action: string) => {
    if (action.includes('Viagem')) return '🚀'
    if (action.includes('Pista')) return '🔍'
    if (action.includes('Ferramenta')) return '🔧'
    if (action.includes('Entrevista')) return '👥'
    return '📝'
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      dimensional: '🌌',
      government: '🏛️',
      witness: '👤',
      document: '📄',
      artifact: '🏺',
      temporal: '⏰',
    }
    return icons[category] || '🔍'
  }

  return (
    <div className="space-y-4">
      {/* Seção de Pistas */}
      <div>
        <div className="text-orion-blue font-bold mb-3">🔍 PISTAS DESCOBERTAS</div>
        
        {clues.length === 0 ? (
          <div className="text-gray-500 text-sm italic">
            Nenhuma pista descoberta ainda.
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {clues.map((clue, index) => (
              <div key={clue.id} className="p-2 border border-green-400 rounded bg-green-900 bg-opacity-10">
                <div className="flex items-center space-x-2 mb-1">
                  <span>{getCategoryIcon(clue.category)}</span>
                  <span className="font-medium text-green-400 text-sm">
                    {clue.name}
                  </span>
                </div>
                <div className="text-xs text-green-300">
                  {clue.description}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Descoberta em: {clue.location.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Seção de Log */}
      <div>
        <div className="text-orion-blue font-bold mb-3">📝 LOG DE INVESTIGAÇÃO</div>
        
        {log.length === 0 ? (
          <div className="text-gray-500 text-sm italic">
            Nenhuma atividade registrada ainda.
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {log.slice().reverse().map((entry) => (
              <div key={entry.id} className="p-2 border border-gray-600 rounded bg-gray-800 bg-opacity-30">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span>{getActionIcon(entry.action)}</span>
                    <span className="font-medium text-green-400 text-sm">
                      {entry.action}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                
                <div className="text-xs text-green-300 mb-1">
                  {entry.result}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📍 {entry.location.replace('_', ' ')}</span>
                  {entry.cluesFound.length > 0 && (
                    <span className="text-yellow-400">
                      +{entry.cluesFound.length} pista{entry.cluesFound.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Estatísticas */}
      <div className="mt-4 p-2 bg-gray-800 bg-opacity-50 rounded text-xs">
        <div className="text-orion-blue font-bold mb-2">📊 ESTATÍSTICAS</div>
        <div className="grid grid-cols-2 gap-2 text-gray-300">
          <div>Total de Ações: {log.length}</div>
          <div>Pistas Encontradas: {clues.length}</div>
          <div>Locais Visitados: {new Set(log.map(l => l.location)).size}</div>
          <div>Última Atividade: {log.length > 0 ? formatTimestamp(log[log.length - 1].timestamp) : 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}

