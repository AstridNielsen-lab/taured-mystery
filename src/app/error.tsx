'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('ORION System Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-orion-dark">
      <div className="text-center terminal-screen max-w-2xl mx-4">
        <h1 className="text-3xl font-bold text-red-400 mb-4 flicker">
          ⚠️ ERRO CRÍTICO DO SISTEMA ORION
        </h1>
        <div className="text-left text-sm text-red-300 font-mono mb-6 bg-red-900 bg-opacity-20 p-4 rounded">
          <p>SYSTEM_ERROR: {error.message}</p>
          <p>ERROR_CODE: DIMENSIONAL_BREACH_001</p>
          <p>TIMESTAMP: {new Date().toISOString()}</p>
          <p>STATUS: CRITICAL</p>
        </div>
        <p className="text-green-400 mb-6">
          Uma anomalia temporal foi detectada no sistema.
          Reinicializando protocolos de segurança...
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors orion-border mr-4"
        >
          REINICIALIZAR SISTEMA
        </button>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-orion-blue hover:bg-blue-600 text-white rounded-lg transition-colors orion-border"
        >
          RETORNAR À BASE
        </a>
      </div>
    </div>
  )
}

