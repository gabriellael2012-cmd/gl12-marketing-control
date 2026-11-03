import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT

/**
 * Aceita tanto o JSON bruto quanto a mesma string em base64. Base64 é mais
 * fácil de colar em campos de variável de ambiente que só aceitam uma linha
 * (sem quebra de linha, aspas ou chaves) — gerado com:
 * [Convert]::ToBase64String([IO.File]::ReadAllBytes("caminho\do\arquivo.json"))
 */
function parseServiceAccount(value: string) {
  const trimmed = value.trim()
  const json = trimmed.startsWith('{') ? trimmed : Buffer.from(trimmed, 'base64').toString('utf8')
  return JSON.parse(json)
}

let initialized = false

if (rawServiceAccount && getApps().length === 0) {
  try {
    const serviceAccount = parseServiceAccount(rawServiceAccount)
    initializeApp({ credential: cert(serviceAccount) })
    initialized = true
  } catch (error) {
    console.error('FIREBASE_SERVICE_ACCOUNT inválido — confira o JSON (ou base64 do JSON) da conta de serviço.', error)
  }
} else if (getApps().length > 0) {
  initialized = true
}

export const isFirebaseAdminConfigured = initialized
export const auth = initialized ? getAuth() : undefined
export const db = initialized ? getFirestore() : undefined
