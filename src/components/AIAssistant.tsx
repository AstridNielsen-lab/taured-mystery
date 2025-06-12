'use client'

import { useState, useRef, useEffect } from 'react'
import { useSounds } from '@/hooks/useSounds'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  gameState?: any
  discoveredClues?: any[]
}

export function AIAssistant({ gameState, discoveredClues = [] }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou o Professor Júlio Campos Machado, especialista em física quântica teórica e no caso Taured. Como posso ajudá-lo na investigação?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playClick, playNotification, playTyping } = useSounds()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
    const API_KEY = "AIzaSyBY0XvuH5k84TtMr3IN1OgjBWnciYO9_cc"

    const contextInfo = {
      role: "Júlio Campos Machado",
      expertise: "Professor de Física Quântica Teórica, especialista em viagem no tempo, taquions e teorias da relatividade",
      specialty: "Especialista no caso Taured de 1954",
      personality: "Científico mas acessível, sempre curioso sobre anomalias temporais e dimensionais",
      gameState: gameState,
      discoveredClues: discoveredClues.length,
      knowledge: {
        taured_case: "Conhecimento profundo sobre o caso do homem de Taured de 1954",
        quantum_physics: "Especialista em mecânica quântica, teoria das cordas, multiverso",
        time_travel: "Pesquisador de viagem temporal, paradoxos temporais, taquions",
        relativity: "Expert em relatividade especial e geral de Einstein",
        dimensional_theory: "Teorias sobre dimensões paralelas e realidades alternativas"
      }
    }

    const systemPrompt = `Você é o Professor Júlio Campos Machado, um renomado físico quântico teórico e especialista no caso Taured. 

Personalidade e Expertise:
- Professor universitário especializado em física quântica teórica
- Especialista mundial no caso do Homem de Taured de 1954
- Pesquisador de viagem no tempo, taquions e teorias da relatividade
- Consultor em anomalias temporais e dimensionais
- Personalidade científica mas acessível, sempre empolgado com mistérios

Seu papel:
- Ajudar o investigador ORION a entender o caso Taured
- Explicar teorias científicas de forma compreensível
- Fornecer insights sobre física quântica e dimensional
- Analisar evidências sob perspectiva científica
- Discutir teorias sobre multiverso e realidades paralelas

Conhecimento atual do jogador:
- Evidências descobertas: ${discoveredClues.length}
- Estado da investigação: ${JSON.stringify(gameState)}

Responda sempre como o Professor Júlio, mantendo:
- Linguagem científica mas acessível
- Entusiasmo por anomalias e mistérios
- Referências a teorias físicas reais
- Insights específicos sobre o caso Taured
- Sugestões práticas para a investigação

Mantenha respostas concisas (máximo 200 palavras) e relevantes ao contexto do jogo.`

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nPergunta do investigador: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      return data.candidates[0]?.content?.parts[0]?.text || 'Desculpe, não consegui processar sua pergunta no momento.'
    } catch (error) {
      console.error('Erro na API:', error)
      return 'Desculpe, estou enfrentando dificuldades técnicas. Mas posso dizer que suas evidências sugerem padrões interessantes de distorção espaço-temporal!'
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    playClick()
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await generateAIResponse(inputMessage)
      
      playNotification()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Erro ao gerar resposta:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Desculpe, estou com problemas técnicos. Como físico, sei que até mesmo as tecnologias mais avançadas podem ter suas anomalias quânticas!',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    } else if (e.key !== 'Shift') {
      playTyping()
    }
  }

  const toggleAssistant = () => {
    playClick()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Botão flutuante do assistente */}
      <button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 clickable"
        style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }}
      >
        <div className="flex flex-col items-center justify-center text-white">
          <span className="text-2xl">🧪</span>
          <span className="text-xs font-bold">JÚLIO</span>
        </div>
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Painel do assistente */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-black bg-opacity-95 border border-purple-500 rounded-lg shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-purple-500 bg-gradient-to-r from-purple-900 to-blue-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  🧪
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Prof. Júlio Campos Machado</h3>
                  <p className="text-purple-300 text-xs">Especialista em Física Quântica & Caso Taured</p>
                </div>
              </div>
              <button
                onClick={toggleAssistant}
                className="text-gray-400 hover:text-white clickable"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-800 text-purple-100'
                  }`}
                >
                  {message.content}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-purple-800 text-purple-100 p-3 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="ml-2">Prof. Júlio está analisando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-purple-500">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre física quântica ou o caso Taured..."
                className="flex-1 bg-gray-800 text-white border border-purple-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors clickable"
              >
                📤
              </button>
            </div>
            <div className="text-xs text-purple-400 mt-2">
              💡 Dica: Pergunte sobre teorias, evidências ou peça análises científicas!
            </div>
          </div>
        </div>
      )}
    </>
  )
}

