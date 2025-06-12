# 🖥️ Terminal Central ORION - Caso Taured

## Visão Geral

O Terminal Central ORION é um sistema de investigação avançado que simula um ambiente PowerShell completo para investigar o misterioso Caso Taured. O terminal oferece acesso direto a arquivos, ferramentas, logs e anotações através de comandos nativos do PowerShell.

## 🌟 Características Principais

### ✅ Sistema de Arquivos Completo
- **📁 ferramentas/** - Ferramentas de investigação
- **📁 locais/** - Informações sobre localizações
- **📁 logs/** - Registros de investigação
- **📁 investigacoes_salvas/** - Investigações salvas
- **📁 caderno_anotacoes/** - Anotações pessoais

### ✅ Comandos PowerShell Nativos
- `ls` / `dir` - Listar arquivos e pastas
- `cd` - Navegar entre diretórios
- `cat` - Visualizar conteúdo de arquivos
- `pwd` - Mostrar diretório atual
- `clear` - Limpar terminal

### ✅ Comandos Especializados
- `save-inv` - Salvar investigação atual
- `load-inv` - Carregar investigações salvas
- `edit-notes` - Abrir editor de anotações
- `run <ferramenta>` - Executar ferramentas
- `help` - Mostrar todos os comandos

### ✅ Persistência de Dados
- **LocalStorage** - Todas as anotações e investigações são salvas automaticamente
- **Sistema de Arquivos Virtual** - Estrutura de pastas realista
- **Histórico de Comandos** - Use ↑/↓ para navegar no histórico

## 📂 Estrutura de Pastas

### 🔧 Ferramentas (/ferramentas)
- `analisador_dna.exe` - Sistema de análise genética
- `scanner_digital.exe` - Scanner com OCR integrado
- `detector_anomalias.exe` - Detector de anomalias temporais
- `relatorio_generator.exe` - Gerador de relatórios

### 🗺️ Locais (/locais)
- `aeroporto_haneda.txt` - Informações do aeroporto de Tóquio
- `hotel_imperial.txt` - Detalhes do hotel onde o homem ficou
- `europa_1954.txt` - Mapa da Europa em 1954

### 📝 Logs (/logs)
- `investigacao_principal.log` - Log principal da investigação
- `anomalias_detectadas.log` - Registro de anomalias encontradas

### 💾 Investigações Salvas (/investigacoes_salvas)
- Arquivos JSON com investigações completas
- Incluem pistas, teorias e anotações
- Nomeados automaticamente com timestamp

### 📖 Caderno de Anotações (/caderno_anotacoes)
- `notas_pessoais.txt` - Suas anotações pessoais
- Editor visual integrado
- Salvamento automático

## 🎯 Como Usar

### Navegação Básica
```powershell
# Listar conteúdo do diretório atual
ls

# Navegar para uma pasta
cd ferramentas

# Voltar para pasta anterior
cd ..

# Ver onde você está
pwd

# Visualizar um arquivo
cat analisador_dna.exe
```

### Investigação
```powershell
# Explorar locais do caso
cd locais
cat aeroporto_haneda.txt
cat hotel_imperial.txt

# Verificar logs
cd ..
cd logs
cat investigacao_principal.log

# Executar ferramentas
cd ..
cd ferramentas
run detector_anomalias.exe
```

### Anotações
```powershell
# Abrir editor de anotações
edit-notes

# Visualizar anotações atuais
cd caderno_anotacoes
cat notas_pessoais.txt
```

### Salvar Progresso
```powershell
# Salvar investigação atual
save-inv

# Ver investigações salvas
cd investigacoes_salvas
ls

# Visualizar investigação salva
cat investigacao_2024-06-12T14-30-15.json

# Listar todas as investigações
load-inv
```

## 🌐 Recursos Avançados

### Editor de Anotações
- Interface visual completa
- Syntax highlighting
- Salvamento automático
- Integração com sistema de arquivos

### Sistema de Persistência
- Todas as alterações são salvas automaticamente
- Dados mantidos entre sessões
- Backup em localStorage

### Histórico de Comandos
- Use ↑ para comandos anteriores
- Use ↓ para comandos posteriores
- Histórico mantido durante a sessão

## 🎮 Comandos Úteis para Investigação

```powershell
# Sequência recomendada para novos investigadores
help                           # Ver todos os comandos
ls                            # Ver estrutura inicial
cd locais                     # Ir para locais
cat aeroporto_haneda.txt      # Ler sobre o incidente inicial
cat hotel_imperial.txt        # Detalhes do desaparecimento
cd ../logs                    # Ir para logs
cat investigacao_principal.log # Ver cronologia
cd ../ferramentas             # Explorar ferramentas
ls                           # Ver ferramentas disponíveis
run detector_anomalias.exe   # Executar análise
edit-notes                   # Fazer anotações
save-inv                     # Salvar progresso
```

## 🔍 Dicas de Investigação

1. **Leia todos os arquivos** - Cada arquivo contém pistas importantes
2. **Use o editor de anotações** - Documente suas teorias e observações
3. **Salve frequentemente** - Use `save-inv` para não perder progresso
4. **Explore as ferramentas** - Cada ferramenta pode revelar novos insights
5. **Correlacione informações** - Compare dados entre diferentes arquivos
6. **Anote conexões** - Use o caderno para conectar pistas

## 🚀 Funcionalidades Futuras

- Mais ferramentas de análise
- Sistema de busca nos arquivos
- Comandos de análise avançada
- Integração com IA para análise de padrões
- Exportação de relatórios em PDF
- Sistema de colaboração entre investigadores

---

**🎯 Objetivo:** Desvende o mistério do homem de Taured usando todas as ferramentas e informações disponíveis no Terminal Central ORION.

**💡 Lembre-se:** Este é um caso real que aconteceu em 1954. Use sua lógica, criatividade e as ferramentas disponíveis para formar suas próprias teorias sobre o que realmente aconteceu.

