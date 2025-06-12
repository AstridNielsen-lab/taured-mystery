'use client'

import { useState, useEffect } from 'react'
import { useGame } from '@/hooks/useGame'
import { useSounds } from '@/hooks/useSounds'
import { LocationPanel } from './LocationPanel'
import { StatusPanel } from './StatusPanel'
import { ToolPanel } from './ToolPanel'
import { InvestigationLog } from './InvestigationLog'
import { TerminalOutput } from './TerminalOutput'
import { AIAssistant } from './AIAssistant'
import { getAvailableLocations, getAvailableTools, gameData, formatLocation } from '@/utils/gameData'
import { generateReport, formatReportForDisplay, generateTauredEncyclopedia } from '@/utils/reportGenerator'
import { ToolData, Location, Investigation } from '@/types/game'
export function GameInterface() {
  const { gameState, player, changeLocation, useTool } = useGame()
  const { playClick, playHover, playSuccess, playError, playNotification, playTyping, playAmbient } = useSounds()
  const [activePanel, setActivePanel] = useState<'tools' | 'locations' | 'log'>('tools')
  const [terminalLines, setTerminalLines] = useState<Array<{id: string, text: string, type: string}>>(
    [
      { id: '1', text: 'Sistema ORION inicializado com sucesso.', type: 'system' },
      { id: '2', text: `Bem-vindo, Agente ${player.name || 'X'}.`, type: 'system' },
      { id: '3', text: 'Investigação do Caso Taured iniciada.', type: 'system' },
    ]
  )

  const addTerminalLine = (text: string, type: string = 'result') => {
    const newLine = {
      id: Date.now().toString(),
      text,
      type
    }
    setTerminalLines(prev => [...prev.slice(-20), newLine]) // Mantém apenas as últimas 20 linhas
  }

  const handleLocationChange = (location: any) => {
    playClick()
    changeLocation(location.id)
    addTerminalLine(`Viajando para: ${location.name}`, 'system')
    addTerminalLine(`Localização atual: ${location.name}`, 'result')
    playSuccess()
  }

  const handleToolUse = (tool: any) => {
    addTerminalLine(`Usando: ${tool.name}`, 'user')
    
    if (tool.id === 'report_generator') {
      const report = generateReport(gameState, player.discoveredClues)
      const formattedReport = formatReportForDisplay(report)
      addTerminalLine('Relatório gerado com sucesso:', 'success')
      // Adiciona o relatório linha por linha para melhor exibição
      formattedReport.split('\n').forEach((line, index) => {
        setTimeout(() => {
          addTerminalLine(line, 'report')
        }, index * 50) // Adiciona linhas com pequeno delay para efeito de digitação
      })
      return
    }
    
    if (tool.id === 'encyclopedia') {
      const encyclopedia = generateTauredEncyclopedia()
      addTerminalLine('Enciclopédia de Taured carregada:', 'success')
      // Adiciona a enciclopédia linha por linha
      encyclopedia.split('\n').forEach((line, index) => {
        setTimeout(() => {
          addTerminalLine(line, 'encyclopedia')
        }, index * 30) // Delay menor para a enciclopédia
      })
      return
    }
    
    // Para outras ferramentas, usa a lógica padrão
    const result = useTool(tool.id)
    addTerminalLine(result.message, result.success ? 'success' : 'error')
  }

  return (
    <div className="min-h-screen bg-orion-dark text-green-400 p-2 sm:p-4">
      <div className="w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 min-h-screen">
        {/* Painel de Status - Esquerda */}
        <div className="lg:col-span-3 space-y-2 sm:space-y-4">
          <StatusPanel gameState={gameState} player={player} />
          
          {/* Navegação de painéis */}
          <div className="terminal-screen">
            <div className="flex space-x-1 mb-4">
              {[
                { id: 'tools', label: 'FERRAMENTAS', icon: '🔧' },
                { id: 'locations', label: 'LOCAIS', icon: '🗺️' },
                { id: 'log', label: 'LOG', icon: '📝' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick()
                    setActivePanel(tab.id as any)
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-2 text-sm border transition-colors clickable ${
                    activePanel === tab.id
                      ? 'border-orion-blue bg-orion-blue bg-opacity-20 text-white'
                      : 'border-green-400 text-green-400 hover:border-orion-blue'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            {/* Conteúdo do painel ativo */}
            <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto">
              {activePanel === 'tools' && (
                <ToolPanel 
                  tools={getAvailableTools(gameState, player.discoveredClues, player.toolsAvailable)}
                  onToolUse={handleToolUse}
                />
              )}
              {activePanel === 'locations' && (
                <LocationPanel 
                  locations={getAvailableLocations(gameState, player.discoveredClues)}
                  currentLocation={player.currentLocation}
                  onLocationChange={handleLocationChange}
                />
              )}
              {activePanel === 'log' && (
                <InvestigationLog log={player.investigationLog} clues={player.discoveredClues} />
              )}
            </div>
          </div>
        </div>

        {/* Terminal Principal - Centro */}
        <div className="lg:col-span-6">
          <TerminalOutput lines={terminalLines} />
        </div>

        {/* Painel de Investigação - Direita */}
        <div className="lg:col-span-3">
          <div className="terminal-screen h-full">
            <div className="border-b border-green-400 pb-2 mb-4">
              <h3 className="text-orion-blue font-bold">📍 LOCALIZAÇÃO ATUAL</h3>
              <div className="text-green-300">
                {formatLocation(player.currentLocation)}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-yellow-400 font-bold mb-2">🔍 PISTAS DESCOBERTAS</h4>
                <div className="space-y-1 text-sm">
                  {player.discoveredClues.length > 0 ? (
                    player.discoveredClues.map((clue, index) => (
                      <div key={clue.id} className="text-green-300">
                        {index + 1}. {clue.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Nenhuma pista descoberta ainda.</div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-yellow-400 font-bold mb-2">💭 TEORIAS ATUAIS</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Interdimensional:</span>
                    <span className={gameState.interdimensionalTheory > 50 ? 'text-green-400' : 'text-gray-400'}>
                      {gameState.interdimensionalTheory}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conspiração:</span>
                    <span className={gameState.conspiracyLevel > 50 ? 'text-yellow-400' : 'text-gray-400'}>
                      {gameState.conspiracyLevel}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distorção Temporal:</span>
                    <span className={gameState.timelineDistortion > 50 ? 'text-red-400' : 'text-gray-400'}>
                      {gameState.timelineDistortion}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-yellow-400 font-bold mb-2">🎯 PRÓXIMAS AÇÕES</h4>
                <div className="text-sm text-green-300 space-y-1">
                  <div>• Investigar localizações disponíveis</div>
                  <div>• Utilizar ferramentas de análise</div>
                  <div>• Coletar mais evidências</div>
                  <div>• Formar teorias conclusivas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant gameState={gameState} discoveredClues={player.discoveredClues} />
    </div>
  )
}

