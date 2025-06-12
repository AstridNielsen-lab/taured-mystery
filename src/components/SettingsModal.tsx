'use client'

import { useState } from 'react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState('terminal')
  const [settings, setSettings] = useState({
    volume: 75,
    terminalSpeed: 'normal',
    theme: 'orion-green',
    autoSave: true,
    notifications: true,
    difficulty: 'normal'
  })

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: '🖥️' },
    { id: 'audio', label: 'Áudio', icon: '🔊' },
    { id: 'gameplay', label: 'Gameplay', icon: '🎮' },
    { id: 'system', label: 'Sistema', icon: '⚙️' }
  ]

  const terminalCommands = [
    { cmd: 'ls / dir', desc: 'Listar arquivos e pastas' },
    { cmd: 'cd <pasta>', desc: 'Navegar para diretório' },
    { cmd: 'cat <arquivo>', desc: 'Visualizar conteúdo' },
    { cmd: 'pwd', desc: 'Mostrar localização atual' },
    { cmd: 'clear', desc: 'Limpar terminal' },
    { cmd: 'save-inv', desc: 'Salvar investigação' },
    { cmd: 'load-inv', desc: 'Carregar investigação' },
    { cmd: 'edit-notes', desc: 'Editor de anotações' },
    { cmd: 'run <tool>', desc: 'Executar ferramenta' },
    { cmd: 'help', desc: 'Mostrar todos os comandos' }
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    // Aqui você salvaria as configurações no localStorage
    localStorage.setItem('orion_settings', JSON.stringify({ ...settings, [key]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-orion-dark border-2 border-orion-blue rounded-lg w-full max-w-5xl h-5/6 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="border-b border-orion-blue p-6 flex justify-between items-center bg-gradient-to-r from-orion-dark to-black">
          <div>
            <h2 className="text-orion-blue font-bold text-2xl">⚙️ CONFIGURAÇÕES - SISTEMA ORION</h2>
            <p className="text-green-300 text-sm mt-1">Central de Controle e Personalização</p>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-bold text-2xl transition-colors p-2 hover:bg-red-400 hover:bg-opacity-20 rounded"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar com tabs */}
          <div className="w-1/4 border-r border-green-400 p-4 bg-black bg-opacity-30">
            <h3 className="text-yellow-400 font-bold mb-4">📋 CATEGORIAS</h3>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    activeTab === tab.id
                      ? 'border-orion-blue bg-orion-blue bg-opacity-20 text-white'
                      : 'border-green-400 text-green-300 hover:border-orion-blue hover:bg-orion-blue hover:bg-opacity-10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{tab.icon}</span>
                    <span className="font-semibold">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-yellow-400 bg-opacity-10 border border-yellow-400 rounded">
              <div className="text-yellow-400 text-xs font-bold mb-2">⚠️ AVISO:</div>
              <div className="text-yellow-300 text-xs">
                Alterações são salvas automaticamente no navegador.
              </div>
            </div>
          </div>
          
          {/* Conteúdo das configurações */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'terminal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-orion-blue font-bold text-xl mb-4">🖥️ Configurações do Terminal</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">🎨 Tema do Terminal</h4>
                      <select 
                        value={settings.theme}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                        className="w-full bg-black border border-green-400 rounded p-2 text-green-300"
                      >
                        <option value="orion-green">ORION Verde (Padrão)</option>
                        <option value="matrix-green">Matrix Verde</option>
                        <option value="cyber-blue">Cyber Azul</option>
                        <option value="amber">Âmbar Retro</option>
                      </select>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">⚡ Velocidade de Digitação</h4>
                      <select 
                        value={settings.terminalSpeed}
                        onChange={(e) => handleSettingChange('terminalSpeed', e.target.value)}
                        className="w-full bg-black border border-green-400 rounded p-2 text-green-300"
                      >
                        <option value="slow">Lenta (Imersiva)</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Rápida</option>
                        <option value="instant">Instantânea</option>
                      </select>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-3">📖 Guia de Comandos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {terminalCommands.map((cmd, index) => (
                          <div key={index} className="flex justify-between p-2 bg-black bg-opacity-30 rounded">
                            <code className="text-orion-blue font-mono">{cmd.cmd}</code>
                            <span className="text-green-300">{cmd.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'audio' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-orion-blue font-bold text-xl mb-4">🔊 Configurações de Áudio</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">🔈 Volume Geral</h4>
                      <div className="flex items-center space-x-4">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={settings.volume}
                          onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-green-300 w-12 text-right">{settings.volume}%</span>
                      </div>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-3">🎵 Efeitos Sonoros Disponíveis</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-green-300">• Cliques de botão</div>
                        <div className="text-green-300">• Hover em elementos</div>
                        <div className="text-green-300">• Sons de sucesso</div>
                        <div className="text-green-300">• Alertas de erro</div>
                        <div className="text-green-300">• Digitação no terminal</div>
                        <div className="text-green-300">• Notificações</div>
                        <div className="text-green-300">• Ambiente cibernético</div>
                        <div className="text-green-300">• Efeitos de transição</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'gameplay' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-orion-blue font-bold text-xl mb-4">🎮 Configurações de Gameplay</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">🎯 Nível de Dificuldade</h4>
                      <select 
                        value={settings.difficulty}
                        onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                        className="w-full bg-black border border-green-400 rounded p-2 text-green-300"
                      >
                        <option value="easy">Fácil (Mais dicas, comandos sugeridos)</option>
                        <option value="normal">Normal (Balanced gameplay)</option>
                        <option value="hard">Difícil (Menos assistência)</option>
                        <option value="expert">Especialista (Terminal puro)</option>
                      </select>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">💾 Auto-salvamento</h4>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={settings.autoSave}
                          onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                          className="form-checkbox"
                        />
                        <span className="text-green-300">Salvar progresso automaticamente</span>
                      </label>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-2">🔔 Notificações</h4>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications}
                          onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                          className="form-checkbox"
                        />
                        <span className="text-green-300">Mostrar notificações de progresso</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-orion-blue font-bold text-xl mb-4">⚙️ Informações do Sistema</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-3">🖥️ Terminal Central ORION</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-300">Versão:</span>
                          <span className="text-white">v3.2.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Plataforma:</span>
                          <span className="text-white">PowerShell Simulado</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Sistema de Arquivos:</span>
                          <span className="text-white">Virtual (LocalStorage)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">IA Assistente:</span>
                          <span className="text-white">Prof. Júlio Campos Machado</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-3">🔧 Tecnologias</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-green-300">• Next.js 14</div>
                        <div className="text-green-300">• TypeScript</div>
                        <div className="text-green-300">• Tailwind CSS</div>
                        <div className="text-green-300">• Google Gemini API</div>
                        <div className="text-green-300">• Web Audio API</div>
                        <div className="text-green-300">• React Hooks</div>
                        <div className="text-green-300">• LocalStorage</div>
                        <div className="text-green-300">• Progressive Web App</div>
                      </div>
                    </div>
                    
                    <div className="border border-green-400 rounded p-4">
                      <h4 className="text-yellow-400 font-bold mb-3">📊 Estatísticas</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-300">Comandos disponíveis:</span>
                          <span className="text-white">15+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Arquivos do caso:</span>
                          <span className="text-white">25+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Ferramentas de análise:</span>
                          <span className="text-white">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Locais investigáveis:</span>
                          <span className="text-white">6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-orion-blue p-4 bg-gradient-to-r from-black to-orion-dark">
          <div className="flex justify-between items-center text-sm">
            <div className="text-green-300">
              ⚙️ Configurações aplicadas automaticamente
            </div>
            <div className="text-yellow-400">
              💾 Salvo no navegador • Sistema ORION v3.2.1
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

