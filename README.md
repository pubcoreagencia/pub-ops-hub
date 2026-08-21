# PUB ECOM Command Center

Você é o Product Designer + UX/UI Architect responsável por prototipar o frontend do PUB ECOM.

IMPORTANTE:
Este é um PROTÓTIPO DE PRODUTO.
Não altere o banco de dados existente.
Não crie migrations.
Não substitua a arquitetura backend existente.
Não invente APIs reais.
Use dados mockados e componentes preparados para futura integração com a API existente.

CONTEXTO DO PRODUTO

PUB ECOM é uma plataforma de e-commerce operada centralmente pela PUB ECOM.

A PUB ECOM é responsável por:
- catálogo mestre
- fornecedores
- estoque central
- fulfillment
- pedidos
- infraestrutura de checkout
- operação financeira
- aquisição
- tracking
- remarketing
- gestão de lojas
- gestão de afiliados
- gestão de influencers

Os lojistas/mentorados usam a plataforma principalmente como superfície comercial.

Quando um cliente compra em uma loja:
1. o cliente compra na Store do mentorado
2. o PUB ECOM identifica qual loja realizou a venda
3. identifica o produto
4. identifica o fornecedor
5. a PUB ECOM realiza a compra no fornecedor
6. o fornecedor envia o produto para o endereço do cliente
7. a PUB ECOM acompanha todo o ciclo operacional e financeiro

O produto deve transmitir claramente que a PUB ECOM é o OPERADOR CENTRAL.

==================================================
VISÃO DO PRODUTO
==================================================

Criar uma plataforma chamada:

PUB ECOM

Com três grandes superfícies:

1. MASTER
2. LOJISTA / MENTORADO
3. AFILIADO / INFLUENCER

O MASTER é a central operacional da PUB ECOM.

==================================================
1. MASTER DASHBOARD
==================================================

Criar um dashboard administrativo premium, moderno e altamente informativo.

Sidebar:

- Visão Geral
- Live Shop
- Lojas
- Pedidos
- Produtos
- Fornecedores
- Estoque
- Financeiro
- Ads
- Tracking
- Audiências
- Remarketing
- Afiliados
- Influencers
- Ranking
- Bonificações
- SEO
- Configurações

Dashboard principal:

Mostrar em tempo real:

- faturamento hoje
- faturamento do mês
- pedidos hoje
- pedidos em processamento
- pedidos enviados
- pedidos entregues
- visitantes online
- carrinhos abertos
- checkouts ativos
- vendas simultâneas
- ticket médio
- conversão
- lucro estimado

Criar gráficos:

- faturamento por hora
- pedidos por hora
- visitantes por hora
- conversão do funil
- vendas por loja
- vendas por produto
- vendas por canal

==================================================
2. LIVE SHOP
==================================================

Criar uma tela chamada:

LIVE SHOP

Inspirada na experiência de monitoramento em tempo real de plataformas como Shopify.

Mostrar:

VISITANTES ONLINE
CARRINHOS ABERTOS
CHECKOUTS
PAGAMENTOS
VENDAS

Exemplo:

1.284 visitantes online
187 carrinhos abertos
42 checkouts
19 pagamentos processando
13 vendas nos últimos 5 minutos

Criar feed de eventos em tempo real:

"Cliente adicionou Smartwatch X ao carrinho"
"Cliente iniciou checkout"
"Pedido #10482 aprovado"
"Loja João Store realizou uma venda"
"Influencer @joao gerou uma venda"

Mostrar a loja responsável por cada evento.

==================================================
3. LOJAS
==================================================

Criar tabela de lojas:

- nome
- mentor
- status
- visitantes
- pedidos
- faturamento
- ticket médio
- conversão
- lucro
- ranking

Ao clicar em uma loja:

abrir dashboard individual.

Mostrar:

- faturamento
- pedidos
- visitantes
- conversão
- produtos vendidos
- top produtos
- origem das vendas
- afiliados
- influencers
- campanhas
- SEO
- clientes
- pedidos
- financeiro

==================================================
4. CENTRAL FINANCEIRA
==================================================

Criar uma Central Financeira completa.

Cards:

- faturamento bruto
- descontos
- taxas de pagamento
- custo dos produtos
- frete
- lucro líquido
- comissões
- repasses
- lucro PUB ECOM

Criar ranking financeiro:

LOJA
FATURAMENTO
CUSTOS
LUCRO
MARGEM

Permitir filtros:

- hoje
- 7 dias
- 30 dias
- mês atual
- mês anterior
- período personalizado

Criar visão:

"Faturamento por loja"

com gráfico e tabela.

==================================================
5. PEDIDOS
==================================================

Criar central de pedidos.

Status:

- novo
- pagamento pendente
- pago
- aguardando compra no fornecedor
- comprado do fornecedor
- aguardando envio
- enviado
- em trânsito
- entregue
- cancelado
- reembolsado

Cada pedido deve mostrar:

- número
- cliente
- loja
- produto
- fornecedor
- valor
- custo
- lucro
- origem
- afiliado/influencer
- status

Criar timeline do pedido.

Exemplo:

CLIENTE COMPROU
↓
PAGAMENTO APROVADO
↓
PUB ECOM IDENTIFICOU LOJA
↓
PUB ECOM IDENTIFICOU FORNECEDOR
↓
COMPRA NO FORNECEDOR
↓
FORNECEDOR ENVIOU
↓
CLIENTE RECEBEU

==================================================
6. FORNECEDORES
==================================================

Criar painel de fornecedores.

Mostrar:

- fornecedor
- produtos
- pedidos
- custo médio
- prazo médio
- status
- performance

Ao abrir fornecedor:

- catálogo
- pedidos pendentes
- pedidos realizados
- custo
- margem
- prazo
- performance logística

==================================================
7. CATÁLOGO
==================================================

Criar catálogo mestre.

Produtos:

- imagem
- nome
- SKU
- categoria
- fornecedor
- custo
- preço
- margem
- estoque
- status
- SEO

Permitir visualizar quais lojas estão vendendo cada produto.

==================================================
8. FUNIL DE AQUISIÇÃO
==================================================

Criar painel visual:

PAGE VIEW
↓
ADD TO CART
↓
ADD PAYMENT INFO
↓
PURCHASE

Mostrar:

visitantes
carrinhos
checkouts
vendas

Calcular:

Page View → Cart
Cart → Payment
Payment → Purchase
Page View → Purchase

Mostrar conversão por:

- loja
- produto
- campanha
- canal
- afiliado
- influencer

==================================================
9. AUDIENCE ENGINE
==================================================

Criar uma central chamada:

AUDIENCE ENGINE

Cada nível do funil deve gerar automaticamente um público personalizado.

NÍVEL 1
PAGE VIEW

NÍVEL 2
ADD TO CART

NÍVEL 3
ADD PAYMENT INFO

NÍVEL 4
PURCHASE

Criar públicos por janela:

1 dia
3 dias
7 dias
14 dias
30 dias
90 dias
180 dias
365 dias

Criar exclusões automáticas.

Exemplo:

L1:
Page View 7D
EXCLUDE Add To Cart
EXCLUDE Purchase

L2:
Add To Cart 7D
EXCLUDE Purchase

L3:
Payment Info 7D
EXCLUDE Purchase

L4:
Purchase

Mostrar tamanho de cada público.

==================================================
10. REMARKETING
==================================================

Criar painel:

REMARKETING

Campanhas:

Nível 1:
visitou e não adicionou ao carrinho

Nível 2:
adicionou ao carrinho e não iniciou pagamento

Nível 3:
informou pagamento e não comprou

Nível 4:
comprou

No nível 4, tratar como:

- recompra
- cross sell
- upsell
- fidelização

Mostrar:

público
tamanho
campanha
investimento
receita
ROAS
conversões

==================================================
11. ADS
==================================================

Criar painel ADS.

Integrações visuais:

META ADS
GOOGLE ADS

Mostrar:

- campanhas
- investimento
- impressões
- cliques
- CTR
- CPC
- CPM
- conversões
- CPA
- receita
- ROAS

Criar filtros por:

- loja
- produto
- campanha
- canal
- afiliado
- influencer

==================================================
12. TRACKING
==================================================

Criar painel de tracking.

Eventos:

page_view
add_to_cart
add_payment_info
purchase

Cada evento deve mostrar:

- timestamp
- session
- loja
- produto
- campanha
- UTM
- afiliado
- influencer

Criar visualização de jornada do cliente.

==================================================
13. UTM
==================================================

Criar painel de atribuição.

Mostrar:

utm_source
utm_medium
utm_campaign
utm_content
utm_term

Permitir visualizar:

origem → visita → carrinho → checkout → venda

==================================================
14. AFILIADOS
==================================================

Criar painel de afiliados.

Afiliado recebe percentual da venda.

Dashboard:

- vendas
- faturamento
- comissão
- conversão
- cliques
- pedidos

Ranking:

1º
2º
3º

Criar página individual do afiliado.

==================================================
15. INFLUENCERS
==================================================

Criar Creator Center.

Influencer não recebe pagamento fixo pela produção.

O modelo é baseado em performance.

Influencer recebe:

50% DO LUCRO LÍQUIDO DAS VENDAS ATRIBUÍDAS A ELE

Importante:
não calcular 50% do faturamento.

Calcular:

VENDA
- custo produto
- frete
- taxas
- descontos
- outros custos dedutíveis
=
LUCRO LÍQUIDO

LUCRO LÍQUIDO × 50%
=
REPASSE DO INFLUENCER

Dashboard:

- conteúdo
- alcance
- cliques
- carrinhos
- checkouts
- vendas
- faturamento
- lucro gerado
- repasse

==================================================
16. RANKING
==================================================

Criar ranking mensal.

Ranking de lojas:

- vendas
- faturamento
- lucro
- conversão

Ranking de afiliados:

- vendas
- comissão

Ranking de influencers:

- vendas
- lucro gerado
- receita para PUB ECOM

Criar sistema visual de:

🥇 1º
🥈 2º
🥉 3º

==================================================
17. BONIFICAÇÃO
==================================================

Criar painel de premiações.

Permitir definir:

- meta
- período
- prêmio
- regra
- participante

Mostrar:

meta
progresso
resultado
prêmio

==================================================
18. SEO
==================================================

Criar painel SEO.

Cada produto deve possuir:

- title
- meta description
- slug
- keywords
- structured data
- status de indexação

Criar indicadores:

produtos indexados
produtos pendentes
erros SEO
cliques orgânicos
impressões
CTR
vendas orgânicas

O objetivo é permitir que produtos catalogados sejam encontrados organicamente nas buscas.

==================================================
19. CHECKOUT
==================================================

Criar checkout transparente moderno.

Fluxo:

produto
↓
carrinho
↓
dados cliente
↓
endereço
↓
pagamento
↓
confirmação

Preparar interface para integração futura com:

- gateways
- UTMify
- Meta Pixel
- Google tracking

Não implementar gateways reais no protótipo.

==================================================
20. DESIGN SYSTEM
==================================================

Interface premium de SaaS/e-commerce.

Visual:

- moderno
- profissional
- limpo
- altamente informativo
- responsivo
- desktop-first para MASTER
- mobile-first para Store

Usar cards, tabelas, gráficos, badges, timelines e dashboards.

Evitar aparência de template genérico.

A interface deve parecer uma plataforma proprietária de infraestrutura de e-commerce.

==================================================
21. NAVEGAÇÃO
==================================================

Criar navegação funcional entre todas as telas.

Não criar apenas screenshots estáticas.

Botões devem abrir páginas, drawers, modais ou detalhes.

Usar dados mockados consistentes.

Uma venda criada no mock deve aparecer coerentemente em:

- Live Shop
- Dashboard
- Loja
- Pedido
- Financeiro
- Tracking
- Afiliado/Influencer
- Ranking

==================================================
22. REGRA ARQUITETURAL
==================================================

Não quebrar a fundação existente do PUB ECOM.

A base atual possui:

00001 → 00015

incluindo:

- identity
- catalog
- inventory
- commerce
- orders
- shipping foundation
- finance/audit
- store platform
- media
- tracking/analytics
- cart items
- commerce transactions
- checkout transactions
- anonymous HTTP API

O frontend deve ser criado como camada de apresentação/prototipação sobre essa fundação.

Não substituir o backend existente.

==================================================
23. OBJETIVO FINAL DO PROTÓTIPO
==================================================

Ao finalizar, o protótipo deve permitir visualizar claramente o PUB ECOM como:

CENTRAL OPERADORA DE E-COMMERCE

que conecta:

LOJAS
+
CATÁLOGO
+
FORNECEDORES
+
FULFILLMENT
+
CHECKOUT
+
PAGAMENTOS
+
TRACKING
+
ADS
+
SEO
+
AUDIÊNCIAS
+
REMARKETING
+
AFILIADOS
+
INFLUENCERS
+
FINANCEIRO
+
RANKING

Tudo conectado em uma única experiência.

Prioridade máxima:
1. MASTER Dashboard
2. Live Shop
3. Lojas
4. Pedidos/Fulfillment
5. Central Financeira
6. Funil/Tracking
7. Audience Engine
8. Remarketing
9. Ads
10. Afiliados/Influencers
11. Ranking/Bonificação
12. SEO
13. Store/Checkout

Crie primeiro a arquitetura visual completa e navegável.
Depois refine cada módulo.

Não simplifique o produto para um dashboard genérico.
O objetivo é demonstrar visualmente toda a operação do PUB ECOM.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pub-ops-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b1101814-489c-4063-a76c-47839b1ad052).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
