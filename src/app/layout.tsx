import './globals.css'
import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'O Enigma de Taured | Investigação Interdimensional',
  description: 'Investigue o misterioso caso do Homem de Taured em 1954. Um jogo interativo de mistério interdimensional.',
  keywords: 'jogo, mistério, Taured, interdimensional, investigação, ORION',
  authors: [{ name: 'ORION Unit' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-orion-dark text-green-400 font-mono overflow-hidden`}>
        <div className="min-h-screen bg-gradient-to-br from-orion-dark via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

