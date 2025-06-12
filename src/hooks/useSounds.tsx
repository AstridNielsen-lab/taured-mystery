'use client'

import { useCallback, useRef } from 'react'

export function useSounds() {
  const audioContext = useRef<AudioContext | null>(null)

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContext.current
  }, [])

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const ctx = initAudio()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (error) {
      console.warn('Audio not supported:', error)
    }
  }, [initAudio])

  const playClick = useCallback(() => {
    playTone(800, 0.1, 'square')
    setTimeout(() => playTone(600, 0.1, 'square'), 50)
  }, [playTone])

  const playHover = useCallback(() => {
    playTone(400, 0.15, 'sine')
  }, [playTone])

  const playSuccess = useCallback(() => {
    playTone(523, 0.2, 'sine') // C5
    setTimeout(() => playTone(659, 0.2, 'sine'), 100) // E5
    setTimeout(() => playTone(784, 0.3, 'sine'), 200) // G5
  }, [playTone])

  const playError = useCallback(() => {
    playTone(200, 0.3, 'sawtooth')
    setTimeout(() => playTone(150, 0.3, 'sawtooth'), 150)
  }, [playTone])

  const playNotification = useCallback(() => {
    playTone(880, 0.15, 'triangle')
    setTimeout(() => playTone(1108, 0.15, 'triangle'), 100)
  }, [playTone])

  const playTyping = useCallback(() => {
    playTone(300 + Math.random() * 200, 0.05, 'square')
  }, [playTone])

  const playAmbient = useCallback(() => {
    // Som ambiente sutil
    const frequencies = [110, 146.83, 220, 293.66]
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 2, 'sine')
      }, index * 500)
    })
  }, [playTone])

  const playPortalSound = useCallback(() => {
    // Som de portal dimensional
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        playTone(200 + i * 50, 0.1, 'sawtooth')
      }, i * 50)
    }
  }, [playTone])

  const createSoundWave = useCallback((x: number, y: number) => {
    const wave = document.createElement('div')
    wave.className = 'sound-wave'
    wave.style.left = `${x - 10}px`
    wave.style.top = `${y - 10}px`
    wave.style.width = '20px'
    wave.style.height = '20px'
    
    document.body.appendChild(wave)
    
    setTimeout(() => {
      if (wave.parentNode) {
        wave.parentNode.removeChild(wave)
      }
    }, 600)
  }, [])

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playNotification,
    playTyping,
    playAmbient,
    playPortalSound,
    createSoundWave,
  }
}

