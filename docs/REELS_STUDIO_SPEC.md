# REELS_STUDIO_SPEC.md — Especificação do Módulo Reels Studio

Status: **não iniciado**. Este documento registra o escopo funcional previsto, conforme briefing original, para orientar o desenvolvimento quando este módulo for priorizado.

## Objetivo

Módulo para produção de vídeos verticais (reels), com fluxo organizado por etapas, aprovação humana obrigatória antes de qualquer publicação.

## Funcionalidades previstas

- Pesquisa de temas e tendências.
- Planejamento de conteúdo.
- Criação de roteiros com ganchos fortes.
- Narração por integração com **ElevenLabs**.
- Seleção ou geração de cenas.
- Organização de imagens e vídeos.
- Edição de vídeos.
- Legendas sincronizadas.
- Música e efeitos sonoros, **respeitando direitos autorais**.
- Exportação em **MP4, formato vertical 9:16, resolução 1080 × 1920**.
- Histórico de projetos.
- Pré-visualização.
- **Aprovação humana antes de qualquer publicação.**

## Regras obrigatórias

- O fluxo deve ser organizado em etapas claras e acompanháveis pelo usuário (pesquisa → roteiro → narração → cenas → edição → legendas → exportação → aprovação).
- Uma pré-visualização **nunca** pode ser apresentada como vídeo finalizado.
- A arquitetura deve permitir integrar ferramentas externas de geração e edição de vídeo, mas **nenhuma funcionalidade pode ser simulada** antes de estar realmente implementada (ex.: não mostrar um botão de "gerar cena com IA" funcional se a integração não existe ainda).
- Narração via ElevenLabs só pode ser usada com integração real e configurada — nunca simulada.

## Decisões técnicas pendentes

- Qual(is) ferramenta(s) externa(s) de edição/geração de vídeo serão integradas (nenhuma foi escolhida ainda).
- Onde o processamento de vídeo ocorre (client-side vs. serviço dedicado no backend/Cloud Run) — depende de volume e custo, a avaliar quando o módulo for priorizado.
- Armazenamento de arquivos de vídeo (Firebase Storage proposto na arquitetura geral, a confirmar considerando tamanho de arquivo e custo).
- Estrutura de dados de "projeto de reel" (etapas, status, versões) — a desenhar junto com o banco de dados na Segunda Etapa.

## Dependência de outras decisões

Este módulo depende da confirmação da stack geral (`MARKETING_CONTROL_ARCHITECTURE.md`) e das regras de aprovação (`SECURITY_AND_APPROVAL_RULES.md`). Não será implementado antes dos módulos de base (autenticação, multiempresa, dashboard).
