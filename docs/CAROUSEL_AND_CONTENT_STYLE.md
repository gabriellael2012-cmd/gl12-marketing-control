# CAROUSEL_AND_CONTENT_STYLE.md — Padrões de Conteúdo

> O briefing original não detalha regras específicas de carrossel/conteúdo além dos princípios gerais de marca e das regras de aprovação humana. Este documento registra os princípios que **podem ser derivados com segurança** das regras já definidas, e marca como pendente tudo que exigiria decisão nova do usuário.

## Princípios gerais (derivados das regras já definidas)

1. Nenhum conteúdo (carrossel, post, reel, anúncio) é publicado sem aprovação humana (regra já estabelecida em `SECURITY_AND_APPROVAL_RULES.md`).
2. Conteúdo de cada empresa segue a identidade visual própria (`GL12_BRAND_GUIDELINES.md` / `SURGILAR_BRAND_GUIDELINES.md`) — nunca misturar marcas.
3. Nenhum dado comercial, estatística, depoimento ou resultado apresentado em conteúdo pode ser inventado. Se um número ou depoimento real não foi fornecido, o conteúdo deve indicar claramente um placeholder, nunca um valor fictício apresentado como real.
4. Pré-visualizações de conteúdo (rascunhos, provas de roteiro) devem ser identificadas como rascunho — nunca apresentadas como peça finalizada.

## Pendente de confirmação

- Formatos de carrossel por empresa (número de slides padrão, proporção, uso de capa/CTA).
- Guia de copywriting por empresa (estrutura de legenda, hashtags, chamadas para ação específicas).
- Calendário editorial e frequência de publicação.
- Biblioteca de referências visuais aprovadas (templates, fontes de imagem licenciadas).
- Processo exato de aprovação dentro da plataforma (quem aprova, quantos níveis de revisão).

## Direção de estilo por marca (atualizado em 2026-11-02, após revisão do usuário)

O primeiro rascunho de carrossel (SurgiLar) foi avaliado como **minimalista demais e pouco impactante**. A partir desta revisão, todo carrossel novo segue as regras abaixo. **Nunca misturar a identidade de uma marca com a da outra** — cada uma usa sua própria paleta, tipografia e motivos gráficos, mesmo quando a técnica de construção (ex.: divisão diagonal, barra de rodapé fixa) se repete nos bastidores.

### Regras gerais (as duas marcas)

- **Composição variada entre slides**: nunca repetir o mesmo layout em todas as lâminas. Alternar capa de impacto, spotlight de imagem/elemento cheio de sangria, grade assimétrica, divisão diagonal (dois painéis) e fechamento com CTA.
- **Títulos fortes com gancho**: a primeira lâmina sempre carrega uma pergunta, afirmação ou gancho que gere curiosidade e vontade de arrastar — nunca um título descritivo genérico.
- **Moldura consistente, miolo dinâmico**: uma barra de topo (logo + categoria) e uma barra de rodapé (dica de arrastar + contador de slides tipo "01/06") se repetem em todas as lâminas para dar unidade de marca; o espaço entre elas é livre para variar bastante (cores de fundo, formas diagonais, imagens com sangria, tipografia gigante).
- **Contraste forte**: alternar fundos claros e escuros entre lâminas, não só uma paleta pastel do início ao fim.
- **Elementos gráficos**: formas diagonais/geométricas, números ou palavras gigantes em segundo plano, pílulas/etiquetas com indicador de cor — tudo construído em CSS/SVG a partir da identidade real da marca, nunca clipart genérico nem aparência "feita por IA".
- **Nada inventado**: ganchos e CTAs podem ser criativos e provocativos, mas nunca afirmam fato comercial não confirmado (preço, estoque, prova social, depoimento). Informação real confirmada pelo usuário pode e deve virar destaque visual (ex.: selo de preço).

### SurgiLar

- Paleta: creme (#F6F1E9), espresso escuro (#2B2420), dourado (#C49A3C) e terracota (#A6512A) como acento secundário — cores extraídas da logo real.
- Tipografia: serifada editorial (Fraunces) para títulos grandes + Inter para corpo/rótulos — tom "alto padrão", elegante, nunca genérico.
- Fotos de produto: sempre com `mix-blend-mode: multiply` sobre fundo claro para remover o fundo de estúdio sem precisar recortar manualmente. Nunca usar fotos com informação pessoal visível (placas, números de telefone etc.).
- Direção: dinâmica porém **ainda premium** — contraste forte e composição variada, mas sem parecer barulhenta ou genérica. Primeiro carrossel de referência (6 lâminas): `https://claude.ai/artifact/24czR33xkGVvLy2Bw83RQw`.

### GL12 Studios

- Paleta obrigatória: azul (#1540E6, extraído da logo real), branco, preto/grafite (#0D0D0F) e cinza (#F2F3F5 claro / #5B6168 texto). Nunca introduzir outras cores de acento.
- Tipografia: geométrica e moderna (Space Grotesk) para títulos + Inter para corpo/rótulos.
- Motivos gráficos: formas angulares/geométricas (ecoando o corte do logotipo "G"), grade de pontos, mockups abstratos de interface (nunca uma captura de tela de um site real ou inventado como se fosse um case verdadeiro).
- Direção: moderna, profissional, de alto impacto, com potencial de engajamento — mantém o princípio original de "nada de aparência genérica de IA" e "nada de gradientes exagerados", mas agora com mais contraste e dinamismo do que a primeira proposta ultraminimalista. Carrossel de demonstração (6 lâminas): `https://claude.ai/artifact/JJ4tjeLJtvpdB6iv4aEddf`.

## Observação sobre direitos autorais

Qualquer música, imagem, fonte ou template utilizado em conteúdo (carrossel, reel, anúncio) deve respeitar direitos autorais e licenciamento. Este princípio se aplica também ao módulo Reels Studio (ver `REELS_STUDIO_SPEC.md`).
