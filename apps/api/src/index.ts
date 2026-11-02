import express from 'express'
import { requireAuth } from './middleware/auth.js'

const app = express()
const port = process.env.PORT ?? 3001

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Rota de teste: confirma que o token foi validado e mostra a empresa/papel do usuário.
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

app.listen(port, () => {
  console.log(`GL12 Marketing Control API rodando na porta ${port}`)
})
