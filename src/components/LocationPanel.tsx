'use client'

import { useState } from 'react'
import { LocationData, Location } from '@/types/game'
import { useSounds } from '@/hooks/useSounds'
import { InvestigationModal } from './InvestigationModal'
import { gameData } from '@/utils/gameData'

interface LocationPanelProps {
  locations: LocationData[]
  currentLocation: Location
  onLocationChange: (location: LocationData) => void
}

export function LocationPanel({ locations, currentLocation, onLocationChange }: LocationPanelProps) {
  const { playClick, playHover } = useSounds()
  const [investigationModalOpen, setInvestigationModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  const handleInvestigateLocation = (location: LocationData) => {
    playClick()
    setSelectedLocation(location)
    setInvestigationModalOpen(true)
  }

  const getLocationIcon = (locationId: string) => {
    const icons: Record<string, string> = {
      orion_base: '🏢',
      tokyo_airport_1954: '✈️',
      hotel_room: '🏨',
      government_archive: '🏛️',
      paris_cafe: '☕',
      barcelona_bar: '🍺',
      conspiracy_room: '💻',
      temporal_portal: '🌀',
    }
    return icons[locationId] || '📍'
  }

  const getLocationStatus = (locationId: string) => {
    if (locationId === currentLocation) {
      return { text: 'ATUAL', color: 'text-green-400', bg: 'bg-green-900' }
    }
    return { text: 'DISPONÍVEL', color: 'text-blue-400', bg: 'bg-blue-900' }
  }

  return (
    <div className="space-y-2">
      <div className="text-orion-blue font-bold mb-3">🗺️ LOCAIS DE INVESTIGAÇÃO</div>
      
      {locations.length === 0 ? (
        <div className="text-gray-500 text-sm italic">
          Nenhum local disponível para investigação.
        </div>
      ) : (
        locations.map((location) => {
          const status = getLocationStatus(location.id)
          const isCurrent = location.id === currentLocation
          
          return (
            <div 
              key={location.id}
              className={`
                border rounded transition-all duration-200 p-3 space-y-2
                ${
                  isCurrent
                    ? 'border-green-400 bg-green-900 bg-opacity-30'
                    : 'border-green-400'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getLocationIcon(location.id)}</span>
                  <span className="font-medium text-green-400">
                    {location.name}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${status.bg} bg-opacity-30 ${status.color}`}>
                  {status.text}
                </span>
              </div>
              
              <div className="text-xs text-green-300">
                {location.description}
              </div>
              
              <div className="flex space-x-2 pt-2">
                {!isCurrent && (
                  <button
                    onClick={() => {
                      playClick()
                      onLocationChange(location)
                    }}
                    onMouseEnter={playHover}
                    className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors clickable"
                  >
                    🚀 Viajar
                  </button>
                )}
                <button
                  onClick={() => handleInvestigateLocation(location)}
                  onMouseEnter={playHover}
                  className="flex-1 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded transition-colors clickable"
                >
                  🔍 Investigar
                </button>
              </div>
            </div>
          )
        })
      )}
      
      {/* Informações adicionais */}
      <div className="mt-4 space-y-2">
        <div className="p-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-400">
          💡 <strong>Dica:</strong> Use "Investigar" para descobrir pistas específicas em cada local. Use "Viajar" para mudar sua localização atual.
        </div>
        
        {locations.some(loc => loc.id === 'temporal_portal') && (
          <div className="p-2 bg-purple-900 bg-opacity-30 border border-purple-400 rounded text-xs text-purple-300">
            🌀 <strong>Anomalia Detectada:</strong> Portal temporal disponível para exploração!
          </div>
        )}
      </div>
      
      {/* Investigation Modal */}
      <InvestigationModal
        isOpen={investigationModalOpen}
        onClose={() => {
          setInvestigationModalOpen(false)
          setSelectedLocation(null)
        }}
        investigation={selectedLocation ? gameData.investigations[selectedLocation.id] || null : null}
        onChoiceSelect={(choice) => {
          playClick()
          console.log('Investigation choice selected:', choice)
          // Aqui você pode processar o resultado da investigação
        }}
      />
    </div>
  )
}

