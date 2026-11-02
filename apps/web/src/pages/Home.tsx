import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 text-slate-900">
      <h1 className="text-2xl font-semibold">GL12 Marketing Control</h1>
      <p className="text-slate-500">Logado como {user?.email}</p>
      <button
        type="button"
        onClick={() => logout()}
        className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Sair
      </button>
    </main>
  )
}
