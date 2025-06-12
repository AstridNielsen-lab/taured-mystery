'use client'

import { useState, useEffect } from 'react'

interface NotesEditorProps {
  isOpen: boolean
  onClose: () => void
  onSave: (notes: string) => void
  initialNotes?: string
}

export function NotesEditor({ isOpen, onClose, onSave, initialNotes = '' }: NotesEditorProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setNotes(initialNotes)
  }, [initialNotes])

  const handleSave = () => {
    onSave(notes)
    setHasChanges(false)
    onClose()
  }

  const handleNotesChange = (value: string) => {
    setNotes(value)
    setHasChanges(value !== initialNotes)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-orion-dark border-2 border-orion-blue rounded-lg w-full max-w-4xl h-3/4 flex flex-col">
        <div className="border-b border-orion-blue p-4 flex justify-between items-center">
          <h2 className="text-orion-blue font-bold text-xl">📝 Editor de Anotações</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-bold text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="w-full h-full bg-black bg-opacity-30 border border-green-400 rounded p-3 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-orion-blue"
            placeholder="Digite suas anotações sobre o caso Taured aqui...\n\nDicas:\n- Anote teorias pessoais\n- Registre conexões entre pistas\n- Documente observações importantes\n- Formule hipóteses"
          />
        </div>
        
        <div className="border-t border-orion-blue p-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {hasChanges ? '• Alterações não salvas' : '• Nenhuma alteração'}
          </div>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-500 text-gray-400 rounded hover:border-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-4 py-2 border rounded transition-colors ${
                hasChanges
                  ? 'border-orion-blue text-orion-blue hover:bg-orion-blue hover:text-white'
                  : 'border-gray-500 text-gray-500 cursor-not-allowed'
              }`}
            >
              💾 Salvar Anotações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

