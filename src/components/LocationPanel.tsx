'use client'

import { LocationData, Location } from '@/types/game'

interface LocationPanelProps {
  locations: LocationData[]
  currentLocation: Location
  onLocationChange: (location: LocationData) => void
}

export function LocationPanel({ locations, currentLocation, onLocationChange }: LocationPanelProps) {
  const getLocationIcon = (locationId: string) => {
    const icons: Record<string, string> = {
      orion_base: '🏢',
      tokyo_airport_1954: '🛫',
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
    return { text: 'VIAJAR', color: 'text-blue-400', bg: 'bg-blue-900' }
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
            <button
              key={location.id}
              onClick={() => !isCurrent && onLocationChange(location)}
              disabled={isCurrent}
              className={`
                w-full text-left p-3 border rounded transition-all duration-200 group
                ${
                  isCurrent
                    ? 'border-green-400 bg-green-900 bg-opacity-30 cursor-default'
                    : 'border-green-400 hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-20 cursor-pointer'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getLocationIcon(location.id)}</span>
                  <span className={`font-medium ${
                    isCurrent ? 'text-green-400' : 'text-green-400 group-hover:text-white'
                  }`}>
                    {location.name}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${status.bg} bg-opacity-30 ${status.color}`}>
                  {status.text}
                </span>
              </div>
              
              <div className={`text-xs ${
                isCurrent ? 'text-green-300' : 'text-green-300 group-hover:text-green-100'
              }`}>
                {location.description}
              </div>
              
              {!isCurrent && (
                <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300">
                  Clique para viajar para este local
                </div>
              )}
            </button>
          )
        })
      )}
      
      {/* Informações adicionais */}
      <div className="mt-4 space-y-2">
        <div className="p-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-400">
          💡 <strong>Dica:</strong> Cada local pode conter pistas únicas e oportunidades de investigação.
        </div>
        
        {locations.some(loc => loc.id === 'temporal_portal') && (
          <div className="p-2 bg-purple-900 bg-opacity-30 border border-purple-400 rounded text-xs text-purple-300">
            🌀 <strong>Anomalia Detectada:</strong> Portal temporal disponível para exploração!
          </div>
        )}
      </div>
    </div>
  )
}

