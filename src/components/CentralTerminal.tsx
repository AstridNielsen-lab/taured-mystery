'use client'

import { useState, useEffect, useRef } from 'react'
import { useGame } from '@/hooks/useGame'
import { useSounds } from '@/hooks/useSounds'
import { NotesEditor } from './NotesEditor'

interface FileSystemNode {
  name: string
  type: 'file' | 'directory'
  content?: string
  children?: { [key: string]: FileSystemNode }
  dateModified?: string
  size?: string
}

interface TerminalLine {
  id: string
  text: string
  type: 'command' | 'output' | 'error' | 'system'
}

interface InvestigationData {
  clues: any[]
  locations: any[]
  theories: any
  notes: string[]
  savedAt: string
}

const initialFileSystem: { [key: string]: FileSystemNode } = {
  ferramentas: {
    name: 'ferramentas',
    type: 'directory',
    children: {
      'analisador_dna.exe': {
        name: 'analisador_dna.exe',
        type: 'file',
        content: 'Sistema de análise genética avançado\nVersão: 2.1.5\nStatus: Operacional\n\nUso: Analise amostras de DNA encontradas na investigação',
        size: '2.4 MB',
        dateModified: '2024-06-10 14:32'
      },
      'scanner_digital.exe': {
        name: 'scanner_digital.exe',
        type: 'file',
        content: 'Scanner de documentos com OCR integrado\nVersão: 3.0.1\nStatus: Ativo\n\nCapacidade: Digitalização e análise de documentos físicos',
        size: '1.8 MB',
        dateModified: '2024-06-10 09:15'
      },
      'detector_anomalias.exe': {
        name: 'detector_anomalias.exe',
        type: 'file',
        content: 'Detector de anomalias temporais e espaciais\nVersão: 4.2.0\nStatus: Experimental\n\nAviso: Use com cautela em investigações interdimensionais',
        size: '5.1 MB',
        dateModified: '2024-06-11 16:45'
      },
      'relatorio_generator.exe': {
        name: 'relatorio_generator.exe',
        type: 'file',
        content: 'Gerador automático de relatórios de investigação\nVersão: 1.9.2\nStatus: Operacional\n\nFuncionalidade: Compila todas as evidências em relatório estruturado',
        size: '3.2 MB',
        dateModified: '2024-06-12 08:20'
      }
    }
  },
  locais: {
    name: 'locais',
    type: 'directory',
    children: {
      'aeroporto_haneda.txt': {
        name: 'aeroporto_haneda.txt',
        type: 'file',
        content: 'AEROPORTO HANEDA - TÓQUIO\n========================\n\nLocalização: Tóquio, Japão\nData do Incidente: 1954\n\nRELATÓRIO INICIAL:\nHomem europeu chegou com passaporte de país inexistente (Taured)\nInsistiu que seu país existia entre França e Espanha\nDesapareceu misteriosamente do hotel vigiado\n\nEVIDÊNCIAS COLETADAS:\n- Passaporte falsificado (origem desconhecida)\n- Documentos comerciais de empresa inexistente\n- Testemunhos de funcionários da imigração\n\nSTATUS: Caso arquivado - Investigação reaberta',
        size: '1.2 KB',
        dateModified: '1954-07-23 15:30'
      },
      'hotel_imperial.txt': {
        name: 'hotel_imperial.txt',
        type: 'file',
        content: 'HOTEL IMPERIAL - TÓQUIO\n======================\n\nLocalização: Centro de Tóquio\nRelevância: Local onde o homem de Taured ficou hospedado\n\nDETALHES:\n- Quarto 237 reservado pela polícia\n- Vigilância 24h estabelecida\n- Homem desapareceu sem deixar rastros\n\nTESTEMUNHAS:\n- Recepcionista: "Ele parecia confuso sobre geografia"\n- Guarda: "Porta estava trancada por dentro"\n- Camareira: "Nenhum sinal de luta"\n\nANOMALIAS DETECTADAS:\n- Flutuações de energia durante a noite\n- Relatos de ruídos estranhos no corredor',
        size: '890 B',
        dateModified: '1954-07-24 08:15'
      },
      'europa_1954.txt': {
        name: 'europa_1954.txt',
        type: 'file',
        content: 'MAPA DA EUROPA - 1954\n====================\n\nFRONTEIRA FRANÇA-ESPANHA:\n- Andorra (Principado reconhecido)\n- Região dos Pirineus\n- Nenhum país chamado "Taured" documentado\n\nPESQUISA CARTOGRÁFICA:\n- Arquivos históricos verificados\n- Mapas oficiais consultados\n- Nenhuma referência a Taured encontrada\n\nTEORIAS PROPOSTAS:\n1. Erro de tradução/pronúncia\n2. País fictício para operação encoberta\n3. Anomalia dimensional (hipótese não confirmada)',
        size: '756 B',
        dateModified: '1954-08-01 12:00'
      }
    }
  },
  logs: {
    name: 'logs',
    type: 'directory',
    children: {
      'investigacao_principal.log': {
        name: 'investigacao_principal.log',
        type: 'file',
        content: 'LOG DE INVESTIGAÇÃO - CASO TAURED\n=================================\n\n[1954-07-23 14:30] Caso iniciado - Homem detido na imigração\n[1954-07-23 15:45] Passaporte analisado - País "Taured" não identificado\n[1954-07-23 18:20] Suspeito transferido para Hotel Imperial\n[1954-07-24 06:00] Desaparecimento relatado\n[1954-07-24 08:30] Busca iniciada - Nenhum resultado\n[2024-06-12 10:00] Caso reaberto com nova tecnologia\n[2024-06-12 12:30] Análise dimensional em andamento\n\nPRÓXIMOS PASSOS:\n- Aplicar detector de anomalias\n- Analisar evidências com tecnologia atual\n- Investigar possíveis conexões temporais',
        size: '1.1 KB',
        dateModified: '2024-06-12 16:18'
      },
      'anomalias_detectadas.log': {
        name: 'anomalias_detectadas.log',
        type: 'file',
        content: 'REGISTRO DE ANOMALIAS\n====================\n\n[TEMPORAL]\n- Distorção detectada: Hotel Imperial, Quarto 237\n- Intensidade: Moderada (Nível 3/7)\n- Duração: 6 horas aproximadamente\n\n[ESPACIAL]\n- Flutuação dimensional: Aeroporto Haneda\n- Tipo: Micro-fissura\n- Status: Inativa\n\n[ENERGÉTICA]\n- Pico de energia não identificada\n- Local: Corredor do hotel\n- Frequência: 432 Hz (anômala)\n\nCONCLUSÃO PRELIMINAR:\nEvidências sugerem possível evento interdimensional',
        size: '658 B',
        dateModified: '2024-06-12 14:22'
      }
    }
  },
  investigacoes_salvas: {
    name: 'investigacoes_salvas',
    type: 'directory',
    children: {}
  },
  caderno_anotacoes: {
    name: 'caderno_anotacoes',
    type: 'directory',
    children: {
      'notas_pessoais.txt': {
        name: 'notas_pessoais.txt',
        type: 'file',
        content: 'CADERNO DE ANOTAÇÕES - INVESTIGAÇÃO TAURED\n==========================================\n\nTEORIAS PESSOAIS:\n1. O homem pode ter vindo de dimensão paralela\n2. Possível viagem no tempo - futuro ou passado alternativo\n3. Operação de inteligência altamente sofisticada\n\nOBSERVAÇÕES:\n- Passaporte era convincente, mas país inexistente\n- Comportamento do suspeito indicava confusão genuína\n- Desaparecimento sem vestígios é fisicamente impossível\n\nPERGUNTAS SEM RESPOSTA:\n- Como ele obteve documentos tão convincentes?\n- Por que escolheu o Japão como destino?\n- Existe alguma conexão com outros casos similares?\n\n[Adicione suas próprias anotações aqui...]',
        size: '1.0 KB',
        dateModified: '2024-06-12 16:00'
      }
    }
  }
}

export function CentralTerminal() {
  const { gameState, player } = useGame()
  const { playClick, playTyping } = useSounds()
  const [currentPath, setCurrentPath] = useState(['C:', 'ORION'])
  const [fileSystem, setFileSystem] = useState(initialFileSystem)
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { id: '1', text: 'Sistema ORION Terminal Central v3.2.1', type: 'system' },
    { id: '2', text: 'PowerShell 7.4.0 - Sistema de Investigação Interdimensional', type: 'system' },
    { id: '3', text: 'Digite "help" para ver comandos disponíveis', type: 'system' },
    { id: '4', text: '', type: 'output' }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [notesEditorOpen, setNotesEditorOpen] = useState(false)
  const [currentNotes, setCurrentNotes] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const getCurrentDirectory = () => {
    return currentPath.join('\\')
  }

  const addOutput = (text: string, type: 'output' | 'error' | 'system' = 'output') => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      text,
      type
    }
    setTerminalLines(prev => [...prev, newLine])
  }

  const navigateToPath = (path: string[]): FileSystemNode | null => {
    if (path.length <= 2) return null // C:\ORION é a raiz
    
    let current: any = fileSystem
    for (let i = 2; i < path.length; i++) {
      if (current[path[i]]) {
        current = current[path[i]].type === 'directory' ? current[path[i]].children : current[path[i]]
      } else {
        return null
      }
    }
    return current
  }

  const saveInvestigation = () => {
    const investigationData: InvestigationData = {
      clues: player.discoveredClues,
      locations: [], // Adicionar dados de localização se necessário
      theories: {
        interdimensional: gameState.interdimensionalTheory,
        conspiracy: gameState.conspiracyLevel,
        timeline: gameState.timelineDistortion
      },
      notes: [fileSystem.caderno_anotacoes.children?.['notas_pessoais.txt']?.content || ''],
      savedAt: new Date().toISOString()
    }
    
    const fileName = `investigacao_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`
    
    // Salvar no localStorage
    const existingSaves = JSON.parse(localStorage.getItem('taured_investigations') || '[]')
    existingSaves.push({ fileName, data: investigationData })
    localStorage.setItem('taured_investigations', JSON.stringify(existingSaves))
    
    // Adicionar ao sistema de arquivos
    const newFileSystem = { ...fileSystem }
    if (newFileSystem.investigacoes_salvas.children) {
      newFileSystem.investigacoes_salvas.children[fileName] = {
        name: fileName,
        type: 'file',
        content: JSON.stringify(investigationData, null, 2),
        size: `${Math.round(JSON.stringify(investigationData).length / 1024 * 10) / 10} KB`,
        dateModified: new Date().toLocaleString('pt-BR')
      }
    }
    setFileSystem(newFileSystem)
    
    addOutput(`Investigação salva: ${fileName}`, 'system')
  }

  const handleSaveNotes = (notes: string) => {
    const newFileSystem = { ...fileSystem }
    if (newFileSystem.caderno_anotacoes.children) {
      newFileSystem.caderno_anotacoes.children['notas_pessoais.txt'] = {
        ...newFileSystem.caderno_anotacoes.children['notas_pessoais.txt'],
        content: notes,
        dateModified: new Date().toLocaleString('pt-BR')
      }
    }
    setFileSystem(newFileSystem)
    
    // Salvar também no localStorage
    localStorage.setItem('taured_notes', notes)
    
    addOutput('Anotações salvas com sucesso!', 'system')
  }

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase()
    const args = cmd.split(' ')
    
    addOutput(`PS ${getCurrentDirectory()}> ${command}`, 'output')
    
    switch (args[0]) {
      case 'help':
        addOutput('Comandos disponíveis:', 'system')
        addOutput('  ls / dir       - Listar arquivos e pastas', 'output')
        addOutput('  cd <pasta>     - Navegar para pasta', 'output')
        addOutput('  cat <arquivo>  - Exibir conteúdo do arquivo', 'output')
        addOutput('  pwd            - Mostrar diretório atual', 'output')
        addOutput('  clear          - Limpar terminal', 'output')
        addOutput('  save-inv       - Salvar investigação atual', 'output')
        addOutput('  load-inv       - Carregar investigação salva', 'output')
        addOutput('  edit-notes     - Editar caderno de anotações', 'output')
        addOutput('  run <tool>     - Executar ferramenta', 'output')
        break
        
      case 'ls':
      case 'dir':
        const currentDir = navigateToPath(currentPath)
        if (currentDir) {
          Object.values(currentDir).forEach(item => {
            const icon = item.type === 'directory' ? '📁' : '📄'
            const size = item.size || (item.type === 'directory' ? '<DIR>' : '0 B')
            const date = item.dateModified || new Date().toLocaleString('pt-BR')
            addOutput(`${icon} ${item.name.padEnd(30)} ${size.padEnd(10)} ${date}`, 'output')
          })
        } else {
          Object.keys(fileSystem).forEach(name => {
            const item = fileSystem[name]
            const icon = item.type === 'directory' ? '📁' : '📄'
            addOutput(`${icon} ${name}`, 'output')
          })
        }
        break
        
      case 'cd':
        if (args[1]) {
          if (args[1] === '..') {
            if (currentPath.length > 2) {
              setCurrentPath(prev => prev.slice(0, -1))
            }
          } else {
            const targetPath = [...currentPath, args[1]]
            const target = navigateToPath(targetPath)
            if (target || fileSystem[args[1]]) {
              setCurrentPath(targetPath)
            } else {
              addOutput(`cd: pasta '${args[1]}' não encontrada`, 'error')
            }
          }
        }
        break
        
      case 'pwd':
        addOutput(getCurrentDirectory(), 'output')
        break
        
      case 'cat':
        if (args[1]) {
          const currentDir = navigateToPath(currentPath)
          const file = currentDir?.[args[1]] || fileSystem[args[1]]
          if (file && file.type === 'file' && file.content) {
            file.content.split('\n').forEach(line => {
              addOutput(line, 'output')
            })
          } else {
            addOutput(`cat: arquivo '${args[1]}' não encontrado`, 'error')
          }
        }
        break
        
      case 'clear':
        setTerminalLines([
          { id: '1', text: 'Sistema ORION Terminal Central v3.2.1', type: 'system' },
          { id: '2', text: '', type: 'output' }
        ])
        break
        
      case 'save-inv':
        saveInvestigation()
        break
        
      case 'load-inv':
        const saves = JSON.parse(localStorage.getItem('taured_investigations') || '[]')
        if (saves.length > 0) {
          addOutput('Investigações salvas:', 'system')
          saves.forEach((save: any, index: number) => {
            addOutput(`${index + 1}. ${save.fileName}`, 'output')
          })
        } else {
          addOutput('Nenhuma investigação salva encontrada', 'error')
        }
        break
        
      case 'edit-notes':
        const notesFile = fileSystem.caderno_anotacoes.children?.['notas_pessoais.txt']
        setCurrentNotes(notesFile?.content || '')
        setNotesEditorOpen(true)
        addOutput('Editor de anotações aberto...', 'system')
        break
        
      case 'echo':
        if (command.includes('>>')) {
          const [content, file] = command.split('>>')
          const noteContent = content.replace('echo', '').replace(/"/g, '').trim()
          addOutput(`Adicionado ao arquivo: ${noteContent}`, 'system')
        } else {
          const echoContent = command.replace('echo', '').trim()
          addOutput(echoContent, 'output')
        }
        break
        
      case 'run':
        if (args[1]) {
          addOutput(`Executando ferramenta: ${args[1]}`, 'system')
          addOutput('Ferramenta executada com sucesso!', 'output')
        }
        break
        
      default:
        addOutput(`Comando '${args[0]}' não reconhecido. Digite 'help' para ver comandos disponíveis.`, 'error')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        executeCommand(currentCommand)
        setCommandHistory(prev => [...prev, currentCommand])
        setHistoryIndex(-1)
      }
      setCurrentCommand('')
      playClick()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentCommand('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    
    // Carregar notas salvas do localStorage
    const savedNotes = localStorage.getItem('taured_notes')
    if (savedNotes) {
      const newFileSystem = { ...fileSystem }
      if (newFileSystem.caderno_anotacoes.children) {
        newFileSystem.caderno_anotacoes.children['notas_pessoais.txt'] = {
          ...newFileSystem.caderno_anotacoes.children['notas_pessoais.txt'],
          content: savedNotes,
          dateModified: new Date().toLocaleString('pt-BR')
        }
      }
      setFileSystem(newFileSystem)
    }
  }, [])

  return (
    <div className="terminal-screen h-full flex flex-col">
      <div className="border-b border-green-400 pb-2 mb-4 flex justify-between items-center">
        <h3 className="text-orion-blue font-bold">🖥️ TERMINAL CENTRAL ORION</h3>
        <div className="text-sm text-green-300">
          Sistema Online | Usuário: {player.name || 'Agente'}
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-4 font-mono text-sm space-y-1 bg-black bg-opacity-30 p-3 rounded"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        {terminalLines.map(line => (
          <div 
            key={line.id} 
            className={`${
              line.type === 'system' ? 'text-orion-blue' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'command' ? 'text-yellow-300' :
              'text-green-300'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-yellow-400 font-mono text-sm whitespace-nowrap">
          PS {getCurrentDirectory()}>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono text-sm"
          placeholder="Digite um comando..."
        />
      </div>
      
      <NotesEditor
        isOpen={notesEditorOpen}
        onClose={() => setNotesEditorOpen(false)}
        onSave={handleSaveNotes}
        initialNotes={currentNotes}
      />
    </div>
  )
}

