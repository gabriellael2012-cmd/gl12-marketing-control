# MARKETING_CONTROL_ARCHITECTURE.md — Arquitetura Técnica

Status: **proposta inicial, não implementada**. Nenhum código foi criado ainda. Este documento registra a arquitetura planejada e as decisões que precisam ser confirmadas antes da Segunda Etapa.

## 1. Princípios de arquitetura

- Modular: cada módulo (Dashboard, Reels Studio, Marketplace Studio, WhatsApp IA, Meta Ads, CRM) deve poder evoluir de forma independente.
- Multiempresa desde a base: nenhum dado, lógica ou identidade visual compartilhada entre empresas sem isolamento explícito.
- Escalável: capaz de adicionar novas empresas e novos módulos sem reescrever a base.
- Segura por padrão: validação de permissões sempre no backend, segredos nunca no frontend.

## 2. Stack proposta

### Frontend
- React + TypeScript.
- Tailwind CSS.
- Componentes reutilizáveis, organizados por módulo.
- Interface responsiva (notebook, tablet, celular).

### Backend
- Node.js + TypeScript.
- Express (ou arquitetura equivalente, a justificar se trocada) — organizado por módulo, com validação de dados e tratamento de erros centralizados.
- APIs organizadas por módulo (ex.: `/api/crm`, `/api/reels`, `/api/whatsapp`), cada uma validando `company_id` e permissões do usuário autenticado.

### Dados e infraestrutura
- Firebase Authentication (login, sessões).
- Cloud Firestore (banco de dados principal).
- Firebase Storage (imagens, vídeos, arquivos).
- Google Cloud Run (quando adequado para serviços backend).
- Integrações externas, **apenas quando configuradas e autorizadas**: Claude API, Meta APIs oficiais (WhatsApp Cloud API, Meta Ads), ElevenLabs.

> Esta stack ainda precisa de confirmação do usuário (ver `MASTER_CONTEXT.md`, seção "Decisões pendentes"). Antes de instalar qualquer dependência na Segunda Etapa, a necessidade e compatibilidade serão explicadas.

## 3. Modelo multiempresa (proposta conceitual)

- Toda entidade de negócio (produto, lead, campanha, conversa, conteúdo) carrega um identificador de empresa (`companyId`).
- Toda consulta ao banco de dados é escopada por `companyId`, validada no backend a partir do contexto do usuário autenticado — nunca confiando em um parâmetro enviado livremente pelo cliente.
- Usuários têm papéis (roles) associados a uma ou mais empresas (ex.: um administrador pode ter acesso a GL12 Studios e SurgiLar; um atendente pode ter acesso só a uma).
- Regras de segurança do Firestore (ou equivalente) devem reforçar esse isolamento também no nível de banco de dados, não apenas no backend — defesa em profundidade.

Este modelo é uma proposta conceitual; o desenho completo de coleções/esquemas segue sendo feito aos poucos. Primeira peça já implementada (login): coleção `users`, documento por `uid` (mesmo id do Firebase Authentication), com os campos `companyId` (string) e `role` (string). O backend busca esse documento a cada requisição autenticada e nunca aceita um `companyId` enviado pelo cliente. Ainda não há suporte a usuário com acesso a mais de uma empresa (ex.: administrador GL12 + SurgiLar ao mesmo tempo) — hoje é um `companyId` só por usuário; estender para múltiplas empresas é uma evolução futura, se necessário.

## 4. Controle de automação e aprovação (transversal a todos os módulos)

- Toda ação que publica, envia, gasta ou ativa algo externo passa por um estado de aprovação (ver `SECURITY_AND_APPROVAL_RULES.md`).
- Um registro de auditoria (quem, quando, o quê, antes/depois) é gravado para toda ação relevante — proposta: coleção dedicada de audit log, imutável (somente inserção), associada a `companyId`.
- Interruptor de automação (ligar/desligar) deve ser visível e acessível no Dashboard, por empresa e por canal.

## 5. Segurança (ver também SECURITY_AND_APPROVAL_RULES.md)

- Autenticação via Firebase Authentication.
- Controle de acesso por função (RBAC) validado no backend em cada endpoint.
- Segredos (API keys, tokens) apenas em variáveis de ambiente / gerenciador de segredos do ambiente de execução — nunca no frontend, nunca versionados em Git.
- Logs de auditoria para ações administrativas e de automação.
- Controle de sessão (expiração, revogação).
- Tratamento de erros que não exponha detalhes internos sensíveis ao usuário final.

## 6. Decisões em aberto

Ver lista completa em `MASTER_CONTEXT.md`, seção "Decisões pendentes de confirmação do usuário". As principais do ponto de vista técnico:

1. Monorepo (`apps/web`, `apps/api`) vs. repositórios separados.
2. Confirmação definitiva do Firebase como provedor de dados/autenticação, ou alternativa.
3. Estratégia de deploy (Cloud Run para backend; hospedagem do frontend — Firebase Hosting, Vercel, outro — a decidir).
4. Ambiente de desenvolvimento local vs. uso de emuladores Firebase para testes sem custos/credenciais reais.

## 7. O que NÃO fazer nesta arquitetura

- Não implementar nenhuma automação que publique, envie ou gaste sem aprovação humana (regra de produto, não só de segurança).
- Não armazenar credenciais reais em nenhum arquivo deste repositório.
- Não acoplar lógica de uma empresa específica no núcleo compartilhado da plataforma (toda especificidade de marca/negócio deve ser configuração de dados, não código hardcoded).
