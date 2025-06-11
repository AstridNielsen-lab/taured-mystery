/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orion-dark': '#0a0a0a',
        'orion-blue': '#1e3a8a',
        'orion-green': '#16a34a',
        'taured-gold': '#f59e0b',
        'mystery-purple': '#7c3aed',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'sci-fi': ['Orbitron', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
          '20%, 24%, 55%': { opacity: 0.4 },
        },
        glow: {
          from: { boxShadow: '0 0 20px #1e3a8a' },
          to: { boxShadow: '0 0 30px #1e3a8a, 0 0 40px #1e3a8a' },
        },
      },
    },
  },
  plugins: [],
}

