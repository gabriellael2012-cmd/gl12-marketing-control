# PENDING_INFORMATION_CHECKLIST.md — O que falta o usuário fornecer

Lista consolidada de tudo que ainda depende de informação real do usuário, organizada por categoria. Itens marcados com `[x]` já foram confirmados/recebidos; `[ ]` segue pendente. Esta lista não substitui o detalhe que já está em cada documento de marca/produto — ela existe para dar uma visão rápida do que falta, sem precisar vasculhar todos os arquivos.

**Última atualização:** 2026-11-02.

## 1. Identidade visual

### GL12 Studios
- [x] Logotipo real (recebido e em uso nos carrosséis).
- [ ] Paleta de cores oficial em hexadecimal (hoje uso um azul aproximado da logo, `#1540E6`, escolhido por mim — confirmar se é esse ou outro).
- [ ] Fonte oficial de marca, se existir (hoje uso Space Grotesk + Inter, escolha minha).
- [ ] Manual de marca completo, se já existir um.

### SurgiLar
- [x] Logotipo real (recebido e em uso nos carrosséis).
- [ ] Paleta de cores oficial em hexadecimal (hoje uso tons extraídos visualmente da logo — creme, dourado, marrom — escolha minha).
- [ ] Fonte oficial de marca, se existir (hoje uso Fraunces + Inter, escolha minha).
- [ ] Manual de marca completo, se já existir um.

## 2. Informações comerciais e produtos

### SurgiLar
- [x] Nome do produto: **Puff Comfy** (confirmado).
- [x] Preço: **R$ 297** (confirmado).
- [ ] A SurgiLar vende só a linha Puff Comfy, ou também outros móveis (o briefing original fala em "móveis de alto padrão" de forma geral)?
- [ ] Materiais exatos (tipo de tecido/courino, enchimento) — pra eu falar com precisão nas descrições.
- [ ] Varia o preço por cor, tamanho ou modelo?
- [ ] Frete, prazo de entrega, formas de pagamento.
- [ ] Mais fotos de produto, se tiver além das que você já mandou.
- [ ] Catálogo completo (se houver mais produtos/linhas).

### GL12 Studios
- [ ] Lista real de serviços e planos (hoje descrevo de forma genérica: sites, sistemas, soluções digitais — linguagem já aprovada, mas sem detalhe de plano/preço).
- [ ] Preços ou faixas de preço dos serviços.
- [ ] Portfólio real (projetos já entregues, se quiser usar como prova/case).
- [ ] Depoimentos reais de clientes (nunca vou inventar um).

## 3. Contato e canais

- [ ] WhatsApp, Instagram, e-mail e site de cada empresa. Hoje os carrosséis mostram `[contato SurgiLar]` e `[contato GL12 Studios]` como espaço reservado — preciso do dado real pra trocar.
- [ ] Links das redes sociais atuais de cada marca (se já existirem perfis ativos).

## 4. Para os próximos carrosséis

- [ ] Temas/assuntos que você quer que eu aborde — pode mandar uma lista de ideias ou ir pedindo um de cada vez.
- [ ] Fotos reais de produto/serviço de cada novo assunto (do mesmo jeito que você mandou as fotos dos puffs).
- [ ] Qualquer informação real que deva aparecer no carrossel (preço, promoção, condição especial etc.) — nunca invento isso.

## 5. Decisões técnicas (para quando começarmos a "Segunda Etapa" — construção do sistema)

Ver detalhe completo em `MARKETING_CONTROL_ARCHITECTURE.md` e `MASTER_CONTEXT.md`. Resumo:

- [x] Stack confirmada pelo usuário: React + Node + Firebase.
- [x] Firebase: decidido reaproveitar o projeto Firebase que o usuário já tem (do site institucional da GL12 Studios), por enquanto. Decisão consciente: dados da SurgiLar ficarão, por ora, dentro de um projeto Firebase que é tecnicamente "da GL12" — usuário optou por isso para simplificar agora, com plano de separar em um projeto Firebase dedicado mais à frente, quando fizer sentido financeiramente. Isolamento lógico entre empresas (companyId + regras de segurança) será implementado de qualquer forma, independente do projeto Firebase ser compartilhado ou não. Credencial real do Firebase, quando chegar a hora, entra via variável de ambiente/segredo do ambiente — nunca colada no chat.
- [x] Monorepo vs. repositórios separados: decidido monorepo (`apps/web` + `apps/api`), por ser a proposta original e não haver objeção.
- [x] **Código de login pronto e credenciais configuradas** — `VITE_FIREBASE_API_KEY` e `FIREBASE_SERVICE_ACCOUNT` presentes no ambiente (projeto `glstudios-f0395`).
- [ ] **`FIREBASE_SERVICE_ACCOUNT` precisa ser reconfigurado** — o valor atual tem os marcadores PEM da chave privada corrompidos (texto trocado, não o conteúdo criptográfico). Funciona hoje só porque o script de bootstrap normaliza isso em memória; o backend real (`apps/api/src/lib/firebase.ts`) não tem esse ajuste de propósito, então `/api/me` não vai funcionar até esse segredo ser corrigido/reconfigurado de verdade no gerenciador de segredos do ambiente. Ver detalhe em `MASTER_CONTEXT.md` seção 2.2.
- [x] **Primeiro usuário criado** (2026-11-02): `gabriellael2012@gmail.com`, role `admin`, acesso a `gl12-studios` e `surgilar`. Via `apps/api/scripts/create-first-user.ts`. Link de definição de senha (uso único) foi entregue direto na conversa.
- [ ] Monorepo ou repositórios separados para frontend/backend.
- [ ] Domínio e hospedagem de cada marca.
- [ ] Provedor de autenticação (Firebase confirmado ou outro).

## 6. Credenciais e integrações

Nada é necessário agora. Quando chegar a hora de configurar WhatsApp Cloud API, Meta Ads, Claude API, ElevenLabs ou qualquer outra integração, aviso exatamente o que precisa, uma coisa de cada vez, antes de pedir — conforme a regra de segurança do projeto (`SECURITY_AND_APPROVAL_RULES.md`).
