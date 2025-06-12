'use client'

export function Footer() {
  return (
    <footer className="bg-orion-dark border-t border-green-400 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {/* Informações do Desenvolvedor */}
          <div className="space-y-2">
            <h3 className="text-orion-blue font-bold text-lg">👨‍💻 Desenvolvedor</h3>
            <p className="text-green-300">Julio Campos Machado</p>
            <p className="text-gray-400">Especialista em Física Quântica & Desenvolvimento</p>
            <div className="flex items-center space-x-2 text-green-300">
              <span>📱</span>
              <a 
                href="https://wa.me/5511970603441" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orion-blue transition-colors"
              >
                WhatsApp: +55 11 97060-3441
              </a>
            </div>
          </div>

          {/* Como Contribuir */}
          <div className="space-y-2">
            <h3 className="text-orion-blue font-bold text-lg">💰 Como Contribuir</h3>
            <p className="text-gray-400 text-xs mb-3">
              Qualquer valor doado ajuda a educar novos desenvolvedores em tecnologia!
            </p>
            
            <div className="space-y-1">
              <h4 className="text-yellow-400 font-semibold">🏦 Métodos Tradicionais</h4>
              <div className="text-green-300 space-y-1">
                <div className="flex items-center space-x-2">
                  <span>💳</span>
                  <span>PIX/PayPal: radiotatuapefm@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 mt-3">
              <h4 className="text-yellow-400 font-semibold">₿ Criptomoedas</h4>
              <div className="text-green-300 space-y-1 text-xs">
                <div>
                  <span className="text-orange-400">Bitcoin:</span>
                  <div className="break-all font-mono">bc1qmjf00jqttk2kgemxtxh0hv4xp8fqztnn23cuc2</div>
                </div>
                <div>
                  <span className="text-blue-400">Ethereum:</span>
                  <div className="break-all font-mono">0x7481B4591e7f0DFAD23b884E78C46F0c207a3E35</div>
                </div>
                <div>
                  <span className="text-gray-300">Litecoin:</span>
                  <div className="break-all font-mono">ltc1qxytts52mykr2u83x6ghwllmu7d524ltt702mcc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright e Links */}
          <div className="space-y-2">
            <h3 className="text-orion-blue font-bold text-lg">🏢 Like Look Solutions</h3>
            <p className="text-gray-400 text-xs">
              © 2024 Like Look Solutions. Todos os direitos reservados.
            </p>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-yellow-400 font-semibold text-sm">🔗 Links Úteis</h4>
              <div className="space-y-1 text-green-300 text-xs">
                <div>
                  <a 
                    href="https://github.com/AstridNielsen-lab/taured-mystery" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-orion-blue transition-colors flex items-center space-x-1"
                  >
                    <span>📂</span>
                    <span>Código no GitHub</span>
                  </a>
                </div>
                <div>
                  <span className="text-gray-400">🎮 Baseado no caso real de 1954</span>
                </div>
                <div>
                  <span className="text-gray-400">🔬 Tecnologia: Next.js + TypeScript</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-2 bg-black bg-opacity-30 rounded border border-green-400">
              <p className="text-xs text-center text-green-300">
                🌟 Obrigado por jogar O Enigma de Taured! 🌟
              </p>
            </div>
          </div>
        </div>
        
        {/* Linha final */}
        <div className="border-t border-green-400 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-400">
            "A verdade é mais estranha que a ficção." - Agente ORION | 
            Desenvolvido com ❤️ para a comunidade de desenvolvedores
          </p>
        </div>
      </div>
    </footer>
  )
}

