/**
 * Bootstrap manual do primeiro usuário de login.
 * Uso: tsx scripts/create-first-user.ts --email=foo@bar.com --role=admin --companies=gl12-studios,surgilar
 * Requer FIREBASE_SERVICE_ACCOUNT configurado no ambiente. Não define senha —
 * gera um link oficial do Firebase para o próprio usuário definir a senha.
 *
 * AVISO: o valor de FIREBASE_SERVICE_ACCOUNT atualmente configurado no ambiente
 * tem os marcadores PEM da chave privada corrompidos (ex.: "BEGIN PRIVATE CHAVE"
 * em vez de "BEGIN PRIVATE KEY" — parece ter passado por alguma tradução/edição
 * acidental). O conteúdo em base64 da chave está intacto e foi validado com uma
 * chamada real ao Firebase antes deste script existir. Este script normaliza
 * esses marcadores só em memória, só para este bootstrap manual — o servidor
 * real (apps/api/src/lib/firebase.ts) NÃO tem esse ajuste e continuará falhando
 * até o segredo FIREBASE_SERVICE_ACCOUNT ser corrigido/reconfigurado de verdade
 * no gerenciador de segredos do ambiente.
 */
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    const original = sa.private_key as string | undefined
    const fixed = original
      ?.replace('-----BEGIN PRIVATE CHAVE-----', '-----BEGIN PRIVATE KEY-----')
      .replace('-----FIM CHAVE PRIVADA-----', '-----END PRIVATE KEY-----')
    if (fixed && fixed !== original) {
      console.warn(
        'AVISO: marcadores PEM corrompidos detectados em FIREBASE_SERVICE_ACCOUNT — normalizando só em memória para este script. Corrija o segredo no ambiente.',
      )
      sa.private_key = fixed
      process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify(sa)
    }
  } catch {
    // Se não for JSON válido, deixa o firebase.ts reportar o erro normalmente.
  }
}

const { auth, db, isFirebaseAdminConfigured } = await import('../src/lib/firebase.js')

function parseArgs() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.replace(/^--/, '').split('=')
      return [key, value]
    }),
  )

  const email = args.email
  const role = args.role
  const companyIds = args.companies?.split(',').map((c) => c.trim()).filter(Boolean)

  if (!email || !role || !companyIds?.length) {
    console.error('Uso: tsx scripts/create-first-user.ts --email=foo@bar.com --role=admin --companies=gl12-studios,surgilar')
    process.exit(1)
  }

  return { email, role, companyIds }
}

async function main() {
  if (!isFirebaseAdminConfigured || !auth || !db) {
    console.error('FIREBASE_SERVICE_ACCOUNT ausente ou inválido — veja apps/api/.env.example.')
    process.exit(1)
  }

  const { email, role, companyIds } = parseArgs()

  const existing = await auth.getUserByEmail(email).catch(() => null)
  const user = existing ?? (await auth.createUser({ email, emailVerified: false, disabled: false }))

  await db.collection('users').doc(user.uid).set(
    {
      email,
      role,
      companyIds,
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  )

  const resetLink = await auth.generatePasswordResetLink(email)

  console.log(`Usuário ${existing ? 'já existia' : 'criado'}: uid=${user.uid}`)
  console.log(`Documento users/${user.uid} gravado com role="${role}" e companyIds=${JSON.stringify(companyIds)}.`)
  console.log('Link para o usuário definir a própria senha (uso único, não compartilhe com terceiros):')
  console.log(resetLink)
}

main().catch((error) => {
  console.error('Falha ao criar o primeiro usuário:', error)
  process.exit(1)
})
