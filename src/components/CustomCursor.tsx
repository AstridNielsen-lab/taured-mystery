'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.classList.contains('clickable') ||
                         target.closest('button') ||
                         target.closest('a') ||
                         target.closest('.clickable')
      setIsHovering(!!isClickable)
    }

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${
        isClicking ? 'clicking' : ''
      } ${
        isHovering ? 'hovering' : ''
      }`}
      style={{
        left: `${position.x - 10}px`,
        top: `${position.y - 10}px`,
      }}
    />
  )
}

