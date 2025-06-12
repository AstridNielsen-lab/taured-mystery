'use client'

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { GameState, Player, Clue, Location, Tool, GameActionResult, GameEnding } from '@/types/game'
import { gameData } from '@/utils/gameData'

interface GameContextType {
  gameState: GameState
  player: Player
  updateGameState: (changes: Partial<GameState>) => void
  addClue: (clue: Clue) => void
  changeLocation: (location: Location) => void
  useTool: (tool: Tool) => GameActionResult
  checkEnding: () => GameEnding | null
  resetGame: () => void
}

type GameAction = 
  | { type: 'UPDATE_STATE'; payload: Partial<GameState> }
  | { type: 'ADD_CLUE'; payload: Clue }
  | { type: 'CHANGE_LOCATION'; payload: Location }
  | { type: 'UNLOCK_TOOL'; payload: Tool }
  | { type: 'RESET_GAME' }
  | { type: 'SET_PLAYER_NAME'; payload: string }

const initialGameState: GameState = {
  day: 1,
  trustGovernment: 0,
  interdimensionalTheory: 0,
  conspiracyLevel: 0,
  playerSanity: 100,
  timelineDistortion: 0,
  identityCrisis: 0,
}

const initialPlayer: Player = {
  name: '',
  currentLocation: 'orion_base',
  discoveredClues: [],
  investigationLog: [],
  toolsAvailable: {
    multiversal_database: true,
    temporal_analyzer: true,
    document_decoder: true,
    timeline_simulator: true,
    investigation_diary: true,
    expanded_reality: false,
    orion_net: true,
    contradiction_detector: true,
    portable_lab: true,
    report_generator: true,
    encyclopedia: true,
  },
}

interface GameReducerState {
  gameState: GameState
  player: Player
}

const initialReducerState: GameReducerState = {
  gameState: initialGameState,
  player: initialPlayer,
}

function gameReducer(state: GameReducerState, action: GameAction): GameReducerState {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {
        ...state,
        gameState: { ...state.gameState, ...action.payload },
      }
    
    case 'ADD_CLUE':
      if (state.player.discoveredClues.find(c => c.id === action.payload.id)) {
        return state // Clue já descoberta
      }
      return {
        ...state,
        player: {
          ...state.player,
          discoveredClues: [...state.player.discoveredClues, action.payload],
          investigationLog: [
            ...state.player.investigationLog,
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              location: state.player.currentLocation,
              action: 'Pista descoberta',
              result: action.payload.name,
              cluesFound: [action.payload.id],
            },
          ],
        },
      }
    
    case 'CHANGE_LOCATION':
      return {
        ...state,
        player: {
          ...state.player,
          currentLocation: action.payload,
          investigationLog: [
            ...state.player.investigationLog,
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              location: action.payload,
              action: 'Viagem',
              result: `Viajou para ${gameData.locations[action.payload]?.name}`,
              cluesFound: [],
            },
          ],
        },
      }
    
    case 'UNLOCK_TOOL':
      return {
        ...state,
        player: {
          ...state.player,
          toolsAvailable: {
            ...state.player.toolsAvailable,
            [action.payload]: true,
          },
        },
      }
    
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        player: {
          ...state.player,
          name: action.payload,
        },
      }
    
    case 'RESET_GAME':
      return initialReducerState
    
    default:
      return state
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialReducerState)

  const updateGameState = useCallback((changes: Partial<GameState>) => {
    dispatch({ type: 'UPDATE_STATE', payload: changes })
  }, [])

  const addClue = useCallback((clue: Clue) => {
    dispatch({ type: 'ADD_CLUE', payload: clue })
  }, [])

  const changeLocation = useCallback((location: Location) => {
    dispatch({ type: 'CHANGE_LOCATION', payload: location })
  }, [])

  const useTool = useCallback((tool: Tool): GameActionResult => {
    // Implementar lógica específica de cada ferramenta
    const toolData = gameData.tools[tool]
    if (!toolData || !state.player.toolsAvailable[tool]) {
      return {
        success: false,
        message: 'Ferramenta não disponível ou não desbloqueada.',
      }
    }

    // Aqui seria implementada a lógica específica de cada ferramenta
    // Por enquanto, retorna um resultado genérico
    return {
      success: true,
      message: `${toolData.name} utilizada com sucesso.`,
    }
  }, [state.player.toolsAvailable])

  const checkEnding = useCallback((): GameEnding | null => {
    const { gameState, player } = state
    
    // Verifica condições de final em ordem de prioridade
    if (gameState.interdimensionalTheory >= 75) {
      return 'parallel_dimension'
    }
    
    if (gameState.conspiracyLevel >= 75) {
      return 'government_experiment'
    }
    
    if (gameState.timelineDistortion >= 80) {
      return 'simulation'
    }
    
    if (player.discoveredClues.length >= 8) {
      return 'player_is_taured'
    }
    
    return null
  }, [state])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const setPlayerName = useCallback((name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: name })
  }, [])

  const value: GameContextType = {
    gameState: state.gameState,
    player: state.player,
    updateGameState,
    addClue,
    changeLocation,
    useTool,
    checkEnding,
    resetGame,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

