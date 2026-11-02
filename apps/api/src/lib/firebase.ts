import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT

let initialized = false

if (serviceAccountJson && getApps().length === 0) {
  try {
    const serviceAccount = JSON.parse(serviceAccountJson)
    initializeApp({ credential: cert(serviceAccount) })
    initialized = true
  } catch (error) {
    console.error('FIREBASE_SERVICE_ACCOUNT inválido — confira o JSON da conta de serviço.', error)
  }
} else if (getApps().length > 0) {
  initialized = true
}

export const isFirebaseAdminConfigured = initialized
export const auth = initialized ? getAuth() : undefined
export const db = initialized ? getFirestore() : undefined
