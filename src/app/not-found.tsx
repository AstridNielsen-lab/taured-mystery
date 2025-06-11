export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orion-dark">
      <div className="text-center terminal-screen max-w-2xl mx-4">
        <h1 className="text-4xl font-bold text-red-400 mb-4 glitch" data-text="404">
          404
        </h1>
        <h2 className="text-2xl text-green-400 mb-4">ARQUIVO NÃO ENCONTRADO</h2>
        <p className="text-green-300 mb-6">
          A página solicitada não existe na base de dados ORION.
        </p>
        <div className="text-left text-sm text-green-400 font-mono">
          <p>ORION_SYSTEM:~$ ls -la /reality/pages/</p>
          <p>ERROR: Permission denied</p>
          <p>ORION_SYSTEM:~$ sudo access_reality</p>
          <p>WARNING: Dimensional breach detected</p>
          <p>ORION_SYSTEM:~$ return_to_base</p>
        </div>
        <a 
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-orion-blue hover:bg-blue-600 text-white rounded-lg transition-colors orion-border"
        >
          RETORNAR À BASE ORION
        </a>
      </div>
    </div>
  )
}

