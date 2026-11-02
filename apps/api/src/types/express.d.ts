export type AuthenticatedUser = {
  uid: string
  email: string | null
  companyId: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}
