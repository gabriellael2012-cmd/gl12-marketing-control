export type AuthenticatedUser = {
  uid: string
  email: string | null
  companyIds: string[]
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}
