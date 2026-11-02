import type { NextFunction, Request, Response } from 'express'
import { auth, db, isFirebaseAdminConfigured } from '../lib/firebase.js'

/**
 * Valida o token do Firebase no header Authorization e carrega as empresas/papel
 * do usuário a partir de `users/{uid}` no Firestore. Isolamento multiempresa
 * depende desse companyIds — nenhuma rota de negócio deve confiar em um
 * companyId vindo do cliente.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!isFirebaseAdminConfigured || !auth || !db) {
    res.status(500).json({ error: 'Autenticação não configurada no servidor.' })
    return
  }

  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de autenticação ausente.' })
    return
  }

  const token = header.slice('Bearer '.length)

  try {
    const decoded = await auth.verifyIdToken(token)
    const userDoc = await db.collection('users').doc(decoded.uid).get()

    if (!userDoc.exists) {
      res.status(403).json({ error: 'Usuário autenticado, mas não cadastrado no sistema.' })
      return
    }

    const data = userDoc.data() as { companyIds?: string[]; role?: string }
    if (!data.companyIds?.length || !data.role) {
      res.status(403).json({ error: 'Usuário sem empresa ou papel definido.' })
      return
    }

    req.user = {
      uid: decoded.uid,
      email: decoded.email ?? null,
      companyIds: data.companyIds,
      role: data.role,
    }
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado.' })
  }
}
