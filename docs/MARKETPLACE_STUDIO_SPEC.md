# MARKETPLACE_STUDIO_SPEC.md — Especificação do Módulo Marketplace Studio

Status: **não iniciado**. Módulo separado por empresa — cada empresa tem seu próprio fluxo, pois os produtos/serviços são de natureza diferente.

## SurgiLar — divulgação de produtos físicos

Funcionalidades previstas:

- Cadastro de produtos: nome, modelo, cores, materiais, trama, quantidade e demais características.
- Fotografias de produto.
- Descrições comerciais.
- Variações de anúncios (ex.: mesmo produto em cores/tecidos diferentes).
- Organização de publicações.
- Histórico de anúncios.

Catálogo real de produtos: **pendente de confirmação** (ver `PRODUCTS_AND_COMMERCIAL_INFORMATION.md`). Nenhum produto, foto ou preço será inventado para preencher esta área.

## GL12 Studios — divulgação de serviços digitais

Funcionalidades previstas:

- Divulgação de serviços digitais.
- Apresentação de planos.
- Descrições comerciais.
- Portfólio.
- Materiais de prospecção.

Catálogo real de serviços/planos: **pendente de confirmação** (ver `PRODUCTS_AND_COMMERCIAL_INFORMATION.md`).

## Regras obrigatórias

- **Não** anunciar serviços digitais (GL12 Studios) como se fossem produtos físicos para contornar regras de marketplace.
- Respeitar as regras de cada marketplace de destino e usar **integrações oficiais** quando disponíveis.
- Quando não existir integração oficial adequada para um marketplace, oferecer um **fluxo manual assistido** (a plataforma prepara o conteúdo, mas a publicação final é feita manualmente pelo usuário na plataforma de destino) em vez de simular uma integração automática inexistente.

## Decisões técnicas pendentes

- Quais marketplaces/canais de destino serão integrados primeiro (ex.: Instagram, Facebook Marketplace, site próprio) — nenhum foi escolhido ainda.
- Estrutura de dados de produto/serviço (campos obrigatórios/opcionais por empresa) — a desenhar na Segunda Etapa, após confirmação do catálogo real.
- Política de armazenamento de imagens de produto (Firebase Storage proposto, a confirmar).
