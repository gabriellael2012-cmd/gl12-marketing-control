const REQUIRED_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

export default function FirebaseNotConfigured() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center text-slate-900">
      <h1 className="text-xl font-semibold">O login ainda não está configurado</h1>
      <p className="max-w-md text-slate-500">
        Faltam as variáveis de ambiente do Firebase. Adicione-as nas configurações do ambiente
        (nunca em um arquivo versionado) e reinicie o servidor de desenvolvimento.
      </p>
      <ul className="font-mono text-sm text-slate-400">
        {REQUIRED_VARS.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  )
}
