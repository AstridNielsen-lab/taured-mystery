'use client'

import { useState, useEffect } from 'react'
import { Investigation, InvestigationChoice, Clue } from '@/types/game'
import { gameData } from '@/utils/gameData'

interface InvestigationModalProps {
  isOpen: boolean
  onClose: () => void
  investigation: Investigation | null
  onChoiceSelect: (choice: InvestigationChoice) => void
}

export function InvestigationModal({ isOpen, onClose, investigation, onChoiceSelect }: InvestigationModalProps) {
  const [selectedChoice, setSelectedChoice] = useState<InvestigationChoice | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSelectedChoice(null)
      setIsExecuting(false)
    }
  }, [isOpen])

  if (!isOpen || !investigation) return null

  const handleChoiceClick = async (choice: InvestigationChoice) => {
    setSelectedChoice(choice)
    setIsExecuting(true)
    
    // Simulate investigation time
    setTimeout(() => {
      onChoiceSelect(choice)
      setIsExecuting(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-orion-dark border-2 border-green-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-green-400 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-orion-blue mb-2">{investigation.title}</h2>
              <p className="text-green-300 text-sm">{investigation.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-red-400 hover:text-red-300 text-2xl font-bold clickable"
            >
              ×
            </button>
          </div>
        </div>

        {/* Background Information */}
        <div className="p-4 border-b border-green-400 bg-gray-900 bg-opacity-30">
          <h3 className="text-yellow-400 font-bold mb-2">📋 INFORMAÇÕES DE CONTEXTO</h3>
          <p className="text-green-300 text-sm leading-relaxed">{investigation.background}</p>
        </div>

        {/* Investigation Choices */}
        <div className="p-4">
          <h3 className="text-yellow-400 font-bold mb-4">🔍 AÇÕES DE INVESTIGAÇÃO DISPONÍVEIS</h3>
          
          {isExecuting ? (
            <div className="text-center py-8">
              <div className="text-orion-blue text-lg mb-2">🔄 Executando investigação...</div>
              <div className="text-green-400 text-sm">Analisando evidências e coletando dados...</div>
              <div className="mt-4">
                <div className="animate-pulse bg-green-400 h-1 w-full rounded"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {investigation.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  className="w-full text-left p-4 border border-green-400 rounded hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-20 transition-all duration-200 clickable group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-orion-blue font-bold text-lg">{index + 1}.</span>
                    <div className="flex-1">
                      <div className="text-green-400 font-medium group-hover:text-white mb-1">
                        {choice.text}
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">
                        Clique para executar esta ação de investigação
                      </div>
                    </div>
                    <span className="text-green-400 group-hover:text-white">→</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-green-400 p-4 bg-gray-900 bg-opacity-30">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              💡 Cada ação pode revelar pistas importantes ou alterar suas teorias sobre o caso
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-colors clickable"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

