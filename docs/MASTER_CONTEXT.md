# MASTER_CONTEXT.md — GL12 Marketing Control

Documento de contexto mestre. Serve como ponto de partida para qualquer sessão de desenvolvimento: resume o que o produto é, o que já foi decidido, o que está pendente e qual é a próxima etapa aprovada.

**Última atualização:** 2026-11-02 (Primeira Etapa — inspeção e planejamento inicial).

## 1. O que é o produto

Plataforma profissional, multiempresa, para gestão e automação de marketing, conteúdo, vendas e atendimento. Não é uma interface de demonstração: o objetivo é um produto utilizável, com arquitetura real, banco de dados, backend, frontend, integrações e documentação.

## 2. Empresas atendidas

| Empresa | Segmento | Status dos dados |
|---|---|---|
| **GL12 Studios** | Criação e venda de sites profissionais, sistemas e soluções digitais | Identidade visual descrita no briefing (seção 3). Catálogo de serviços/planos: **pendente de confirmação**. |
| **SurgiLar** | Móveis de alto padrão, atendimento comercial, catálogo de produtos | Identidade visual descrita em termos gerais (posicionamento premium). Paleta de cores específica, catálogo de produtos real, fotos, preços: **pendente de confirmação**. |

A arquitetura deve permitir adicionar outras empresas futuramente sem misturar dados entre elas (ver `MARKETING_CONTROL_ARCHITECTURE.md`).

Nenhum dado comercial (produto, cliente, venda, resultado) foi inventado neste projeto. Tudo que não foi fornecido pelo usuário está listado em `PRODUCTS_AND_COMMERCIAL_INFORMATION.md` como pendente.

## 2.1 Status da Segunda Etapa (estrutura do sistema)

- Repositório Git inicializado.
- Monorepo criado: `apps/web` (React + TypeScript + Tailwind, via Vite) e `apps/api` (Node + TypeScript + Express).
- Frontend: scaffold mínimo, builda sem erro, exibe uma tela de placeholder ("GL12 Marketing Control — em construção"). Nenhuma lógica de negócio ainda.
- Backend: scaffold mínimo com endpoint `/health`, testado e respondendo corretamente. Nenhuma lógica de negócio ainda.
- **Login (código pronto, aguardando credenciais reais para funcionar de verdade):**
  - Frontend: Firebase Authentication (e-mail/senha), tela de login, contexto de autenticação, rota protegida. Se as variáveis de ambiente do Firebase não estiverem configuradas, mostra uma tela explicando o que falta em vez de quebrar — testado e confirmado.
  - Backend: middleware que valida o token do Firebase e busca `companyId`/`role` do usuário em `users/{uid}` no Firestore (nenhuma rota de negócio deve confiar em `companyId` vindo do cliente). Rota de teste `GET /api/me`. Se o Firebase Admin não estiver configurado, responde com erro claro em vez de quebrar — testado e confirmado.
  - Ver `PENDING_INFORMATION_CHECKLIST.md` para a lista exata do que falta configurar.
- **Ainda não implementado:** tela de cadastro/convite de usuário, navegação, dashboard, qualquer módulo de negócio.
- Nada foi commitado no Git ainda (só criado/testado localmente) — commit é feito apenas quando o usuário pedir.

## 2.2 Primeiro usuário criado (2026-11-02)

- `VITE_FIREBASE_API_KEY` e `FIREBASE_SERVICE_ACCOUNT` confirmados presentes e válidos no ambiente (projeto Firebase `glstudios-f0395`).
- **Achado importante:** o valor de `FIREBASE_SERVICE_ACCOUNT` como está configurado no ambiente tem os marcadores PEM da chave privada corrompidos (`-----BEGIN PRIVATE CHAVE-----` / `-----FIM CHAVE PRIVADA-----` em vez do padrão `-----BEGIN/END PRIVATE KEY-----`), provavelmente por ter passado por alguma tradução/edição acidental em algum momento. O conteúdo em base64 da chave está intacto (validado com uma chamada real e somente leitura ao Firebase Auth). **Ação pendente do usuário:** reconfigurar esse segredo no gerenciador de segredos do ambiente com os marcadores corretos — o backend real (`apps/api/src/lib/firebase.ts`) não tem (e não deve ter) nenhum ajuste automático para isso, então `/api/me` continuará retornando "Autenticação não configurada" até o segredo ser corrigido de verdade.
- Decisão: usuário pediu acesso à GL12 Studios **e** SurgiLar para este primeiro usuário (admin geral). Isso exigiu uma pequena mudança de schema: `users/{uid}.companyId` (string única) virou `users/{uid}.companyIds` (array de strings). Atualizado em `apps/api/src/types/express.d.ts` e `apps/api/src/middleware/auth.ts`. Mudança ainda não commitada.
- Criado script reutilizável `apps/api/scripts/create-first-user.ts` (`tsx scripts/create-first-user.ts --email=... --role=... --companies=a,b`): cria o usuário no Firebase Authentication (sem senha) e o documento em `users/{uid}` no Firestore, depois gera um link oficial do Firebase para a pessoa definir a própria senha — a senha nunca passa pelo chat.
- Primeiro usuário criado: e-mail `gabriellael2012@gmail.com`, `role: "admin"`, `companyIds: ["gl12-studios", "surgilar"]`. Link de definição de senha (uso único) foi entregue diretamente ao usuário na conversa, não fica registrado aqui.
- **(2026-11-03) Dificuldade real para colar o segredo:** o campo de variáveis de ambiente da interface usada pelo usuário só aceita texto `CHAVE=valor` em uma linha — colar o JSON da conta de serviço (que tem quebras de linha) quebrava com erro de parse. Solução permanente: `apps/api/src/lib/firebase.ts` agora aceita `FIREBASE_SERVICE_ACCOUNT` também em **base64** do JSON (string única, sem quebra de linha), além do JSON bruto. Instruções de como gerar o base64 (Windows/Mac/Linux) estão em `apps/api/.env.example`. Usuário está no meio de gerar uma chave nova no Firebase e configurar nesse formato.

## 3. Módulos previstos e status

| Módulo | Descrição resumida | Status |
|---|---|---|
| A. Dashboard central | Visão geral de empresas, indicadores, campanhas, aprovações pendentes, status de automações | Não iniciado. Spec embutida no briefing original; não há documento dedicado ainda além deste contexto. |
| B. Reels Studio | Produção de vídeos verticais (roteiro, narração ElevenLabs, edição, legendas, exportação 9:16) | Não iniciado. Spec em `REELS_STUDIO_SPEC.md`. |
| C. Marketplace Studio | Cadastro e divulgação de produtos/serviços por empresa | Não iniciado. Spec em `MARKETPLACE_STUDIO_SPEC.md`. |
| D. WhatsApp IA | Atendimento via WhatsApp Cloud API + Claude API, com estados DESLIGADA/APROVAÇÃO/AUTOMÁTICA | Não iniciado. Primeiro ambiente de teste será GL12 Studios. Regras em `SECURITY_AND_APPROVAL_RULES.md`. |
| E. Meta Ads | Planejamento e acompanhamento de campanhas, sem ativação/orçamento automático | Não iniciado. |
| F. CRM | Cadastro de leads, funil, histórico de interações, tarefas | Não iniciado. |

Nenhum módulo foi implementado em código ainda. Esta é a Primeira Etapa: inspeção do ambiente e criação da documentação persistente.

## 4. Regra de autonomia com controle humano

Resumida aqui, detalhada em `SECURITY_AND_APPROVAL_RULES.md` e em `CLAUDE.md`:

- Sem publicação, envio real, ativação de campanha, alocação de orçamento ou deploy sem aprovação humana explícita.
- IA nunca é proprietária do sistema — é ferramenta de preparo/organização/execução de tarefas autorizadas.
- Auditoria obrigatória em toda ação relevante.
- Estado inicial de qualquer automação de atendimento: `APROVAÇÃO`.

## 5. Decisões já tomadas

- Estrutura de documentação persistente criada em `docs/` + `CLAUDE.md` na raiz.
- Stack proposta (ainda não implementada, sujeita a confirmação do usuário): React + TypeScript + Tailwind no frontend; Node.js + TypeScript + Express no backend; Firebase (Auth, Firestore, Storage) + Cloud Run na infraestrutura; integrações externas (Claude API, Meta APIs oficiais, ElevenLabs) apenas quando configuradas e autorizadas.
- Identidade visual de GL12 Studios e SurgiLar deve permanecer **separada** — nunca misturar as duas marcas em um mesmo componente visual compartilhado sem variação por tema.
- Método de trabalho: etapas pequenas, verificáveis, documentadas, com aprovação do usuário entre etapas.

## 5.1 Decisões adicionais tomadas (2026-11-02, à noite)

- Stack confirmada pelo usuário: React + Node + Firebase.
- Monorepo confirmado (`apps/web` + `apps/api`).
- Firebase: reaproveitar, por enquanto, o projeto Firebase já existente do site institucional da GL12 Studios (decisão consciente do usuário, para simplificar o início). Dados da SurgiLar ficarão isolados logicamente por `companyId` e regras de segurança dentro desse mesmo projeto. Plano de migrar para um projeto Firebase dedicado e neutro fica em aberto para quando fizer sentido financeiramente — ver `PENDING_INFORMATION_CHECKLIST.md`.
- Usuário aprovou início da Segunda Etapa (estrutura do sistema).

## 6. Decisões pendentes de confirmação do usuário

Estas decisões **não foram tomadas** — precisam de resposta do usuário antes ou durante a Segunda Etapa:

1. **Confirmação da stack**: React/TypeScript/Tailwind + Node/TypeScript/Express + Firebase/Firestore/Storage + Cloud Run é a escolha correta, ou há preferência diferente (ex.: outro provedor de banco de dados, outro framework backend)?
2. **Monorepo vs. repositórios separados** para frontend/backend (proposta: monorepo com `apps/web` e `apps/api`, mas não decidido).
3. **Domínios e hospedagem** de cada marca (GL12 Studios e SurgiLar terão domínios/subdominios próprios? Haverá um painel administrativo único para ambas?).
4. **Provedor de autenticação**: Firebase Authentication confirmado, ou há preferência por outro (ex.: Auth0, Supabase)?
5. **Credenciais reais** (Firebase, Meta, Claude API, ElevenLabs): nenhuma foi fornecida nem deve ser inventada. Serão solicitadas apenas quando a etapa correspondente exigir, e o usuário será avisado explicitamente antes.
6. **Catálogo real de produtos/serviços** de cada empresa (ver `PRODUCTS_AND_COMMERCIAL_INFORMATION.md`).
7. **Paleta de cores exata e manual de marca completo** de cada empresa (logotipo, tipografia, tom de voz detalhado) — ver guias de marca.
8. **Inicialização de repositório Git**: a pasta de trabalho não é um repositório Git. Recomenda-se iniciar um repositório na Segunda Etapa, mas isso ainda não foi feito (ver seção 7 deste documento).

## 7. Ambiente técnico identificado (Primeira Etapa)

Inspeção realizada em 2026-11-02:

- Pasta de trabalho (`/home/user`) estava **vazia**, sem repositório Git, sem projeto pré-existente.
- Ferramentas disponíveis: Node.js v22.23.4, npm 10.9.9, Python 3.13.18, Git 2.43.0, GitHub CLI (`gh`) 2.89.0, Google Cloud CLI (`gcloud`, sem conta autenticada).
- Firebase CLI **não está instalada** — será necessário instalar na Segunda Etapa, se a stack Firebase for confirmada.
- Nenhuma credencial (`gcloud auth list` retornou vazio) está configurada no ambiente. Nenhuma credencial será inventada ou solicitada fora de contexto.

## 7.1 Checklist de informações pendentes

A lista completa do que ainda falta o usuário fornecer (identidade visual, informações comerciais, contatos, decisões técnicas) está consolidada em `docs/PENDING_INFORMATION_CHECKLIST.md`. Atualizar esse arquivo sempre que uma informação pendente for confirmada ou uma nova pendência surgir.

## 8. Próximas etapas recomendadas (ordem sugerida)

1. **Aprovação do usuário** para esta Primeira Etapa (documentação e planejamento).
2. **Segunda Etapa — Estrutura do sistema** (somente após aprovação):
   - Confirmar decisões pendentes da seção 6 (stack, monorepo, domínios, autenticação).
   - Criar estrutura inicial de frontend e backend (sem lógica de negócio ainda).
   - Implementar autenticação e separação multiempresa (modelo de dados `company_id`, RBAC básico).
   - Preparar banco de dados (coleções/esquemas iniciais no Firestore, ou equivalente confirmado).
   - Criar navegação principal e dashboard mínimo (sem dados fictícios).
   - Testar o funcionamento básico (login, troca de empresa, controle de acesso).
3. **Etapas posteriores** (um módulo por vez, com teste e aprovação entre cada um): Dashboard completo → CRM → Marketplace Studio → Meta Ads (modo planejamento) → WhatsApp IA (modo APROVAÇÃO) → Reels Studio.

Nenhuma etapa além da Primeira foi iniciada.
