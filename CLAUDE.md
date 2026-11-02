# CLAUDE.md — GL12 Marketing Control

Este arquivo contém as **regras permanentes de desenvolvimento** para qualquer sessão do Claude Code que trabalhe neste projeto. Estas regras têm precedência sobre atalhos de conveniência e devem ser seguidas em toda sessão futura, mesmo que o prompt da tarefa não as repita.

> Leia também `docs/MASTER_CONTEXT.md` antes de iniciar qualquer trabalho. Ele contém a visão geral do produto, o status de cada módulo e as decisões já tomadas.

## 1. O que é este projeto

GL12 Marketing Control é uma plataforma **multiempresa** de gestão e automação de marketing, conteúdo, vendas e atendimento. As primeiras empresas atendidas são:

- **GL12 Studios** — criação e venda de sites, sistemas e soluções digitais.
- **SurgiLar** — móveis de alto padrão.

A arquitetura deve permitir adicionar novas empresas no futuro sem misturar dados, identidade visual, credenciais ou conteúdo entre elas.

## 2. Regra inegociável: autonomia com controle humano

A IA é **ferramenta de trabalho**, nunca proprietária do sistema. As regras abaixo não podem ser contornadas por nenhuma automação, atalho de UX ou "modo avançado":

1. Nenhuma publicação (post, reel, anúncio, mensagem) sai sem aprovação humana explícita.
2. Nenhuma campanha é ativada e nenhum orçamento é alocado sem aprovação humana.
3. Nenhum gasto é realizado automaticamente, em nenhuma hipótese.
4. Nenhuma mensagem comercial automática é enviada sem que o **modo de automação correspondente** tenha sido explicitamente configurado e autorizado para aquela empresa/canal.
5. O administrador pode pausar ou desligar qualquer automação a qualquer momento, e esse controle precisa estar sempre acessível (não enterrado em configurações).
6. Toda ação relevante (publicação, envio, alteração de orçamento, alteração de automação) gera registro de auditoria: quem, quando, o quê, antes/depois.
7. Credenciais e tokens vivem em variáveis de ambiente / gerenciador de segredos — nunca no código, nunca no frontend, nunca em documentos versionados.
8. **Nunca** inserir senhas, tokens, chaves de API ou credenciais reais em código, commits, documentação ou mensagens de chat.
9. **Nunca** inventar clientes, leads, vendas, métricas, resultados de campanha ou qualquer dado comercial. Dados desconhecidos são marcados como "pendente de confirmação" — nunca preenchidos com exemplos fictícios apresentados como reais.
10. **Nunca** publicar conteúdo real, enviar mensagens reais a clientes, contratar serviços, gastar dinheiro ou fazer deploy em produção sem autorização explícita e específica do usuário para aquela ação.

### Estados de automação (WhatsApp IA e qualquer canal de atendimento futuro)

- `DESLIGADA`: nenhuma resposta automática é enviada.
- `APROVAÇÃO`: a IA prepara respostas, mas um humano precisa revisar e aprovar antes do envio.
- `AUTOMÁTICA`: só pode ser habilitado após configuração e autorização expressas, por empresa/canal.

**O estado inicial de qualquer canal novo é sempre `APROVAÇÃO`.** Quando um atendente humano assume uma conversa, a IA para de responder automaticamente naquele atendimento específico.

## 3. Multiempresa e isolamento de dados

- Cada empresa tem seus próprios dados, configurações, identidade visual, produtos, campanhas, conteúdos e contatos.
- Nenhum usuário de uma empresa pode visualizar dados privados de outra empresa sem autorização explícita.
- Toda consulta a dados deve ser escopada por empresa (`company_id` ou equivalente) e validada no **backend**, nunca confiando apenas em filtros do frontend.
- Regras de acesso (RBAC) devem ser verificadas em cada endpoint, não apenas na interface.

## 4. Método de trabalho

- **Trabalhe em etapas pequenas, verificáveis e documentadas.** Não tente implementar vários módulos de uma vez.
- Antes de implementar um módulo, confirme que a etapa anterior foi aprovada pelo usuário.
- Antes de escolher ou instalar uma dependência nova, avalie necessidade e compatibilidade, e explique a decisão em linguagem simples.
- Não adicione tecnologia, abstração ou funcionalidade além do que a etapa pede.
- Não simule funcionalidades que ainda não foram implementadas (ex.: não apresente uma pré-visualização como se fosse um vídeo final; não finja que uma integração existe).
- Atualize a documentação em `docs/` sempre que uma decisão importante for tomada, para não perder contexto entre sessões.

## 5. Comunicação

- Fale em português brasileiro.
- Explique decisões técnicas em linguagem simples, sem assumir conhecimento de programação.
- Diga o que está fazendo e por quê, sem despejar dezenas de comandos de uma vez.
- Informe explicitamente quando uma tarefa exigir autorização do usuário (credenciais, deploy, envio real, gasto, publicação).
- Nunca afirme que algo funciona sem ter testado.
- Se encontrar um problema, explique a causa e proponha solução — não contorne com atalhos (`--no-verify`, desabilitar validação, etc.).

## 6. Stack técnica (proposta inicial — ver `docs/MARKETING_CONTROL_ARCHITECTURE.md`)

- **Frontend:** React + TypeScript + Tailwind CSS.
- **Backend:** Node.js + TypeScript + Express (ou equivalente, a justificar).
- **Dados:** Firebase Authentication, Cloud Firestore, Firebase Storage.
- **Infra:** Google Cloud Run (quando adequado).
- **Integrações externas (apenas quando configuradas e autorizadas):** Claude API, Meta APIs oficiais (WhatsApp Cloud API, Meta Ads), ElevenLabs.

Essa stack ainda não foi implementada — está documentada como proposta, sujeita a confirmação do usuário antes da Segunda Etapa.

## 7. Documentação persistente

Os documentos abaixo (pasta `docs/`) guardam decisões, regras, arquitetura, limitações e próximos passos. Leia-os antes de iniciar trabalho e atualize-os quando decisões importantes forem tomadas:

- `docs/MASTER_CONTEXT.md` — visão geral, status dos módulos, decisões pendentes.
- `docs/GL12_BRAND_GUIDELINES.md` — identidade visual da GL12 Studios.
- `docs/SURGILAR_BRAND_GUIDELINES.md` — identidade visual da SurgiLar.
- `docs/CAROUSEL_AND_CONTENT_STYLE.md` — padrões de conteúdo (carrosséis, posts, texto).
- `docs/REELS_STUDIO_SPEC.md` — especificação do módulo Reels Studio.
- `docs/MARKETPLACE_STUDIO_SPEC.md` — especificação do módulo Marketplace Studio.
- `docs/MARKETING_CONTROL_ARCHITECTURE.md` — arquitetura técnica da plataforma.
- `docs/SECURITY_AND_APPROVAL_RULES.md` — regras de segurança e aprovação (versão detalhada das regras da seção 2 e 6 deste arquivo).
- `docs/PRODUCTS_AND_COMMERCIAL_INFORMATION.md` — informações comerciais reais por empresa (produtos, planos, preços) — hoje majoritariamente pendente de confirmação.

## 8. Próxima etapa

A implementação de código (frontend/backend/banco de dados) só começa após aprovação explícita do usuário para a "Segunda Etapa" (estrutura do sistema). Ver lista de pendências e próximos passos em `docs/MASTER_CONTEXT.md`.
