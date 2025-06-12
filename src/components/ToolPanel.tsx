'use client'

import { ToolData } from '@/types/game'

interface ToolPanelProps {
  tools: ToolData[]
  onToolUse: (tool: ToolData) => void
}

export function ToolPanel({ tools, onToolUse }: ToolPanelProps) {
  const getToolIcon = (toolId: string) => {
    const icons: Record<string, string> = {
      multiversal_database: '🌍',
      temporal_analyzer: '⏰',
      document_decoder: '📄',
      timeline_simulator: '⏳',
      investigation_diary: '📝',
      expanded_reality: '🔮',
      orion_net: '🌐',
      contradiction_detector: '🔍',
      portable_lab: '🧪',
      report_generator: '📊',
      encyclopedia: '📚',
    }
    return icons[toolId] || '🔧'
  }

  return (
    <div className="space-y-2">
      <div className="text-orion-blue font-bold mb-3">🔧 FERRAMENTAS DISPONÍVEIS</div>
      
      {tools.length === 0 ? (
        <div className="text-gray-500 text-sm italic">
          Nenhuma ferramenta disponível no momento.
        </div>
      ) : (
        tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolUse(tool)}
            className="w-full text-left p-3 border border-green-400 rounded hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-20 transition-all duration-200 group clickable"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getToolIcon(tool.id)}</span>
                <span className="font-medium text-green-400 group-hover:text-white">
                  {tool.name}
                </span>
              </div>
              {tool.available ? (
                <span className="text-green-400 text-xs">✅ ATIVO</span>
              ) : (
                <span className="text-yellow-400 text-xs">🔒 BLOQUEADO</span>
              )}
            </div>
            
            <div className="text-xs text-green-300 group-hover:text-green-100">
              {tool.description}
            </div>
            
            {/* Indicador de uso */}
            <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300">
              Clique para usar esta ferramenta
            </div>
          </button>
        ))
      )}
      
      {/* Dicas */}
      <div className="mt-4 p-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-400">
        💡 <strong>Dica:</strong> Algumas ferramentas são desbloqueadas conforme você progride na investigação.
      </div>
    </div>
  )
}

