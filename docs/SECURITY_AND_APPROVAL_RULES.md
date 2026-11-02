# SECURITY_AND_APPROVAL_RULES.md — Regras de Segurança e Aprovação

Este documento consolida, em detalhe, as regras de controle humano e segurança que valem para **toda** a plataforma e **todo** módulo, presentes e futuros. É a referência normativa — em caso de dúvida sobre se uma ação pode ser automatizada, este documento prevalece.

## 1. Regras de aprovação humana (produto)

1. Nenhuma publicação (post, reel, carrossel, anúncio, qualquer conteúdo voltado ao público externo) é feita sem aprovação humana explícita, registrada no sistema.
2. Nenhuma campanha é ativada e nenhum orçamento é alocado ou alterado sem aprovação humana.
3. Nenhum gasto é realizado automaticamente, em nenhuma hipótese, por nenhum módulo.
4. Nenhuma mensagem comercial automática é enviada sem que o modo de automação correspondente tenha sido explicitamente configurado e autorizado para aquela empresa/canal específico.
5. O administrador deve poder pausar ou desligar qualquer automação a qualquer momento — esse controle deve ser visível e de fácil acesso, não escondido em submenus.
6. Toda ação importante (publicação, envio, mudança de orçamento, mudança de automação, mudança de permissão de usuário) gera registro de auditoria.

## 2. Estados de automação de atendimento (WhatsApp IA e futuros canais)

- **DESLIGADA** — nenhuma resposta automática é enviada pela IA.
- **APROVAÇÃO** — a IA prepara respostas, mas um atendente humano precisa revisar e aprovar cada envio.
- **AUTOMÁTICA** — respostas automáticas sem revisão prévia; só pode ser habilitado após configuração e autorização expressas, por empresa e por canal.

**O estado inicial de qualquer canal/empresa nova é sempre `APROVAÇÃO`.**

Quando um atendente humano assume uma conversa, a IA deve interromper imediatamente o envio automático naquele atendimento específico (mesmo que o canal esteja em modo `AUTOMÁTICA` de forma geral).

## 3. Segurança técnica

- **Autenticação:** Firebase Authentication (ou provedor confirmado), sem fallback de autenticação "fake" em produção.
- **Controle de acesso por função (RBAC):** validado no backend em cada endpoint — a interface pode esconder botões, mas a permissão real é sempre verificada no servidor.
- **Separação de dados por empresa:** toda consulta ao banco de dados escopada por `companyId`, validada a partir do usuário autenticado no backend, reforçada por regras de segurança no próprio banco (defesa em profundidade).
- **Proteção de endpoints:** nenhum endpoint que altera dados ou dispara ações externas pode ser acessado sem autenticação e verificação de permissão.
- **Proteção de segredos:** credenciais, tokens e chaves de API apenas em variáveis de ambiente ou gerenciador de segredos do ambiente de execução. Nunca no frontend, nunca versionadas em Git, nunca em texto plano em documentação.
- **Logs de auditoria:** toda ação administrativa, de automação, publicação ou envio gera entrada de auditoria com quem, quando, o quê e estado anterior/novo.
- **Controle de sessões:** expiração e possibilidade de revogação de sessão.
- **Tratamento seguro de erros:** mensagens de erro para o usuário não expõem detalhes internos sensíveis (stack traces, nomes de tabelas, segredos).
- **Proteção contra acesso indevido entre empresas:** nenhum usuário de uma empresa pode visualizar dados privados de outra empresa sem autorização explícita e registrada.

## 4. Regras sobre dados e credenciais

- Nunca inserir senhas, tokens ou chaves reais no código, nos documentos ou no histórico do Git.
- Nunca inventar credenciais, clientes, vendas, resultados ou informações comerciais. Informação desconhecida é marcada como "pendente de confirmação".
- Nunca publicar conteúdo real, enviar mensagens reais, contratar serviços pagos ou realizar deploy em produção sem autorização explícita do usuário para aquela ação específica.
- Credenciais reais só serão solicitadas ao usuário quando a etapa de desenvolvimento correspondente efetivamente precisar delas, e o usuário será avisado antes de qualquer configuração que as utilize.

## 5. Regras específicas por módulo (resumo — detalhes nos documentos de cada módulo)

- **WhatsApp IA:** janela de atendimento de 24h e templates aprovados da Meta devem ser respeitados quando aplicável; autenticação de webhooks obrigatória; controle de mensagens duplicadas obrigatório.
- **Meta Ads:** nenhum anúncio é ativado ou recebe orçamento automaticamente — toda ativação/alteração de orçamento exige aprovação humana registrada.
- **Reels Studio / Marketplace Studio:** nenhuma publicação sai sem aprovação; pré-visualizações nunca são apresentadas como produto final.
- **CRM:** nenhum lead ou cliente fictício é criado para preencher o sistema.

## 6. O que fazer quando uma regra entra em conflito com um pedido de implementação

Se, em qualquer etapa futura, um pedido do usuário (ou de uma automação) parecer exigir contornar uma destas regras (ex.: "ative a automação direto", "publique sem aprovação", "pode gastar X automaticamente"), a sessão de desenvolvimento deve:

1. Explicar que a regra existe e por quê.
2. Perguntar se o usuário quer formalmente alterar a regra neste documento (o que exige atualização explícita deste arquivo) ou se o pedido pode ser atendido de outra forma que preserve a regra.
3. Nunca implementar silenciosamente um atalho que viole as regras acima.
