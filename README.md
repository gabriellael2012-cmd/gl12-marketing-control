# GL12 Marketing Control

Plataforma multiempresa de gestão e automação de marketing, conteúdo, vendas e atendimento. Primeiras empresas atendidas: GL12 Studios e SurgiLar.

Leia `CLAUDE.md` e a pasta `docs/` antes de mexer no projeto — eles guardam as regras, decisões e arquitetura combinadas até aqui.

## Estrutura

```
apps/
  web/   — frontend (React + TypeScript + Tailwind, via Vite)
  api/   — backend (Node + TypeScript + Express)
docs/    — documentação persistente do projeto
```

Ainda é só a estrutura inicial (Segunda Etapa): sem autenticação, sem banco de dados conectado, sem módulos de negócio. Ver `docs/MASTER_CONTEXT.md` para o status atualizado.

## Rodando localmente

```bash
# Frontend
cd apps/web
npm install
npm run dev

# Backend
cd apps/api
npm install
npm run dev
```
