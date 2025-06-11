'use client'

import { useState, useEffect } from 'react'
import { GameProvider } from '@/hooks/useGame'
import { MainMenu } from '@/components/MainMenu'
import { GameInterface } from '@/components/GameInterface'
import { IntroSequence } from '@/components/IntroSequence'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartGame = () => {
    setShowIntro(true)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    setGameStarted(true)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <GameProvider>
      <main className="min-h-screen relative overflow-hidden">
        {/* Efeitos visuais de fundo */}
        <div className="absolute inset-0 matrix-bg"></div>
        <div className="scan-line"></div>
        
        {/* Conteúdo principal */}
        {!gameStarted && !showIntro && (
          <MainMenu onStartGame={handleStartGame} />
        )}
        
        {showIntro && (
          <IntroSequence onComplete={handleIntroComplete} />
        )}
        
        {gameStarted && (
          <GameInterface />
        )}
      </main>
    </GameProvider>
  )
}

