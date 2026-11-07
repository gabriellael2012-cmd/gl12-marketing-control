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

## Aprendizados do protótipo de dublagem (2026-11-07)

Validado fora da plataforma (scripts de trabalho, ainda não é código do produto):

- **Voz:** ElevenLabs, modelo `eleven_multilingual_v2`, voz pré-pronta **Liam**, escolhida pelo usuário. No plano gratuito, a API **não** permite vozes da biblioteca da comunidade: a voz "Paulo" retornou erro 402. Só funcionam as vozes pré-prontas.
- **Chave:** fica como segredo de rede do ambiente e é injetada pelo proxy. Nunca vai para o chat, para o código ou para documentos.
- **Sincronia:** a narração é gerada por frase, com o endpoint `with-timestamps`, que devolve o tempo de cada letra.
  - Cada texto que aparece na tela é "ancorado" à palavra correspondente da fala.
  - Quando a fala é mais longa que a cena, o tempo extra é inserido **só nos quadros em que a tela está parada** (medido pela diferença entre quadros). Assim, nenhuma animação fica em câmera lenta.
  - Quando sobra silêncio (> 0,7 s), os trechos parados são levemente acelerados.
  - Quando o visual vem depois da fala, a fala ganha uma pausa curta entre palavras.
- **Duração:** com a voz Liam, roteiros pensados para 40 s ficaram com 44 a 50 s.
- **Volume:** a trilha de voz é normalizada para −14 LUFS, com pico de −1,5 dBTP.

## Decisões técnicas pendentes

- Qual(is) ferramenta(s) externa(s) de edição/geração de vídeo serão integradas (nenhuma foi escolhida ainda).
- Onde o processamento de vídeo ocorre (client-side vs. serviço dedicado no backend/Cloud Run) — depende de volume e custo, a avaliar quando o módulo for priorizado.
- Armazenamento de arquivos de vídeo (Firebase Storage proposto na arquitetura geral, a confirmar considerando tamanho de arquivo e custo).
- Estrutura de dados de "projeto de reel" (etapas, status, versões) — a desenhar junto com o banco de dados na Segunda Etapa.

## Dependência de outras decisões

Este módulo depende da confirmação da stack geral (`MARKETING_CONTROL_ARCHITECTURE.md`) e das regras de aprovação (`SECURITY_AND_APPROVAL_RULES.md`). Não será implementado antes dos módulos de base (autenticação, multiempresa, dashboard).
