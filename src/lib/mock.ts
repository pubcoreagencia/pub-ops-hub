/**
 * PUB ECOM — dados mockados coerentes para o protótipo.
 * Camada de apresentação apenas. Nenhuma chamada real de API.
 * Estruturas espelham o vocabulário da fundação existente (00001 → 00015)
 * para facilitar a integração futura.
 */

export type Store = {
  id: string;
  name: string;
  mentor: string;
  status: "ativa" | "pausada" | "onboarding";
  visitors: number;
  orders: number;
  revenue: number;
  cost: number;
  aov: number;
  conversion: number;
  profit: number;
  rank: number;
  niche: string;
};

export type Supplier = {
  id: string;
  name: string;
  country: string;
  products: number;
  orders: number;
  avgCost: number;
  avgLeadTime: number;
  status: "ativo" | "auditoria" | "suspenso";
  performance: number;
  fulfillmentRate: number;
  defectRate: number;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplierId: string;
  cost: number;
  price: number;
  stock: number;
  reserved: number;
  status: "ativo" | "rascunho" | "esgotado";
  storeIds: string[];
  seo: {
    title: string;
    description: string;
    slug: string;
    keywords: string[];
    structuredData: boolean;
    indexation: "indexado" | "pendente" | "erro";
    clicks: number;
    impressions: number;
    organicSales: number;
  };
  sold: number;
};

export type OrderStatus =
  | "novo"
  | "pagamento_pendente"
  | "pago"
  | "aguardando_compra"
  | "comprado_fornecedor"
  | "aguardando_envio"
  | "enviado"
  | "em_transito"
  | "entregue"
  | "cancelado"
  | "reembolsado";

export type Order = {
  id: string;
  number: string;
  customer: string;
  customerEmail: string;
  city: string;
  storeId: string;
  productId: string;
  qty: number;
  supplierId: string;
  value: number;
  cost: number;
  shipping: number;
  fees: number;
  discount: number;
  status: OrderStatus;
  origin: "meta_ads" | "google_ads" | "organico" | "influencer" | "afiliado" | "direto";
  partnerId?: string;
  createdAt: string;
  utm: { source: string; medium: string; campaign: string; content: string; term: string };
};

export type Affiliate = {
  id: string;
  name: string;
  handle: string;
  clicks: number;
  orders: number;
  revenue: number;
  commissionRate: number;
  conversion: number;
  status: "ativo" | "pendente";
};

export type Influencer = {
  id: string;
  name: string;
  handle: string;
  platform: "Instagram" | "TikTok" | "YouTube";
  reach: number;
  contents: number;
  clicks: number;
  carts: number;
  checkouts: number;
  orders: number;
  revenue: number;
  deductions: number;
  status: "ativo" | "negociacao";
};

export const STATUS_LABEL: Record<OrderStatus, string> = {
  novo: "Novo",
  pagamento_pendente: "Pagamento pendente",
  pago: "Pago",
  aguardando_compra: "Aguardando compra no fornecedor",
  comprado_fornecedor: "Comprado do fornecedor",
  aguardando_envio: "Aguardando envio",
  enviado: "Enviado",
  em_transito: "Em trânsito",
  entregue: "Entregue",
  cancelado: "Cancelado",
  reembolsado: "Reembolsado",
};

export const ORDER_FLOW: OrderStatus[] = [
  "novo",
  "pagamento_pendente",
  "pago",
  "aguardando_compra",
  "comprado_fornecedor",
  "aguardando_envio",
  "enviado",
  "em_transito",
  "entregue",
];

export const ORIGIN_LABEL: Record<Order["origin"], string> = {
  meta_ads: "Meta Ads",
  google_ads: "Google Ads",
  organico: "Orgânico",
  influencer: "Influencer",
  afiliado: "Afiliado",
  direto: "Direto",
};

export const suppliers: Supplier[] = [
  {
    id: "sup-nova",
    name: "Nova Supply Co.",
    country: "China · Shenzhen",
    products: 42,
    orders: 1284,
    avgCost: 82.4,
    avgLeadTime: 8,
    status: "ativo",
    performance: 96,
    fulfillmentRate: 98.2,
    defectRate: 0.8,
  },
  {
    id: "sup-atlas",
    name: "Atlas Distribuidora",
    country: "Brasil · Curitiba",
    products: 28,
    orders: 942,
    avgCost: 118.9,
    avgLeadTime: 3,
    status: "ativo",
    performance: 92,
    fulfillmentRate: 96.4,
    defectRate: 1.4,
  },
  {
    id: "sup-orion",
    name: "Orion Global Trade",
    country: "China · Yiwu",
    products: 61,
    orders: 703,
    avgCost: 54.2,
    avgLeadTime: 12,
    status: "auditoria",
    performance: 81,
    fulfillmentRate: 90.1,
    defectRate: 3.2,
  },
  {
    id: "sup-vertex",
    name: "Vertex Home Brasil",
    country: "Brasil · São Paulo",
    products: 19,
    orders: 488,
    avgCost: 143.5,
    avgLeadTime: 2,
    status: "ativo",
    performance: 94,
    fulfillmentRate: 97.8,
    defectRate: 1.1,
  },
  {
    id: "sup-kappa",
    name: "Kappa Wearables",
    country: "China · Guangzhou",
    products: 14,
    orders: 226,
    avgCost: 96.0,
    avgLeadTime: 10,
    status: "suspenso",
    performance: 63,
    fulfillmentRate: 78.5,
    defectRate: 6.9,
  },
];

export const stores: Store[] = [
  {
    id: "elite",
    name: "Elite Dropshipping",
    mentor: "Marcus Silva",
    status: "ativa",
    visitors: 42840,
    orders: 124,
    revenue: 18402,
    cost: 11210,
    aov: 148.4,
    conversion: 4.21,
    profit: 4290,
    rank: 1,
    niche: "Eletrônicos",
  },
  {
    id: "glow",
    name: "Glow Up Store",
    mentor: "Amanda Rebouças",
    status: "ativa",
    visitors: 31220,
    orders: 98,
    revenue: 12980,
    cost: 8140,
    aov: 132.4,
    conversion: 3.84,
    profit: 3120,
    rank: 2,
    niche: "Beleza",
  },
  {
    id: "alpha",
    name: "Alpha Tech Hub",
    mentor: "Ricardo Mendes",
    status: "ativa",
    visitors: 28410,
    orders: 87,
    revenue: 11450,
    cost: 7380,
    aov: 131.6,
    conversion: 3.42,
    profit: 2840,
    rank: 3,
    niche: "Tecnologia",
  },
  {
    id: "casa",
    name: "Casa Prime",
    mentor: "Juliana Prado",
    status: "ativa",
    visitors: 19880,
    orders: 64,
    revenue: 9240,
    cost: 6180,
    aov: 144.4,
    conversion: 3.11,
    profit: 2110,
    rank: 4,
    niche: "Casa & Cozinha",
  },
  {
    id: "urban",
    name: "Urban Fit",
    mentor: "Bruno Tavares",
    status: "ativa",
    visitors: 15640,
    orders: 51,
    revenue: 6820,
    cost: 4610,
    aov: 133.7,
    conversion: 2.84,
    profit: 1480,
    rank: 5,
    niche: "Fitness",
  },
  {
    id: "nexus",
    name: "Nexus Digital",
    mentor: "Carla Nunes",
    status: "pausada",
    visitors: 8120,
    orders: 22,
    revenue: 3110,
    cost: 2240,
    aov: 141.4,
    conversion: 1.94,
    profit: 560,
    rank: 6,
    niche: "Gadgets",
  },
  {
    id: "vitta",
    name: "Vitta Store",
    mentor: "Diego Farias",
    status: "onboarding",
    visitors: 2410,
    orders: 6,
    revenue: 890,
    cost: 640,
    aov: 148.3,
    conversion: 0.92,
    profit: 160,
    rank: 7,
    niche: "Suplementos",
  },
];

export const products: Product[] = [
  {
    id: "p-smartwatch",
    name: "Smartwatch Pro X",
    sku: "PUB-SWX-001",
    category: "Wearables",
    supplierId: "sup-nova",
    cost: 148.0,
    price: 399.9,
    stock: 842,
    reserved: 64,
    status: "ativo",
    storeIds: ["elite", "alpha", "nexus"],
    sold: 312,
    seo: {
      title: "Smartwatch Pro X — Monitor de Saúde e GPS | PUB ECOM",
      description:
        "Smartwatch Pro X com GPS, monitor cardíaco e 14 dias de bateria. Envio nacional com rastreio.",
      slug: "smartwatch-pro-x",
      keywords: ["smartwatch", "relógio inteligente", "gps", "monitor cardíaco"],
      structuredData: true,
      indexation: "indexado",
      clicks: 8420,
      impressions: 184200,
      organicSales: 48,
    },
  },
  {
    id: "p-fone",
    name: "Fone Noise Cancelling v2",
    sku: "PUB-FNC-002",
    category: "Áudio",
    supplierId: "sup-nova",
    cost: 96.5,
    price: 289.9,
    stock: 610,
    reserved: 38,
    status: "ativo",
    storeIds: ["elite", "glow", "alpha"],
    sold: 264,
    seo: {
      title: "Fone Noise Cancelling v2 — Cancelamento Ativo | PUB ECOM",
      description: "Fone bluetooth com cancelamento ativo de ruído e 40h de autonomia.",
      slug: "fone-noise-cancelling-v2",
      keywords: ["fone bluetooth", "cancelamento de ruído", "headphone"],
      structuredData: true,
      indexation: "indexado",
      clicks: 6210,
      impressions: 142800,
      organicSales: 34,
    },
  },
  {
    id: "p-kit-cozinha",
    name: "Kit Pro Cozinha 12 Peças",
    sku: "PUB-KPC-003",
    category: "Casa & Cozinha",
    supplierId: "sup-vertex",
    cost: 132.0,
    price: 329.0,
    stock: 218,
    reserved: 22,
    status: "ativo",
    storeIds: ["casa", "glow"],
    sold: 188,
    seo: {
      title: "Kit Pro Cozinha 12 Peças em Aço Inox | PUB ECOM",
      description: "Kit completo de utensílios em aço inox com suporte magnético.",
      slug: "kit-pro-cozinha-12-pecas",
      keywords: ["kit cozinha", "utensílios", "aço inox"],
      structuredData: true,
      indexation: "pendente",
      clicks: 2140,
      impressions: 68400,
      organicSales: 12,
    },
  },
  {
    id: "p-serum",
    name: "Sérum Vitamina C 30ml",
    sku: "PUB-SVC-004",
    category: "Beleza",
    supplierId: "sup-atlas",
    cost: 38.4,
    price: 129.9,
    stock: 1240,
    reserved: 90,
    status: "ativo",
    storeIds: ["glow", "vitta"],
    sold: 402,
    seo: {
      title: "Sérum Vitamina C 30ml — Antioxidante Facial | PUB ECOM",
      description: "Sérum facial com vitamina C pura 20% para uniformizar o tom da pele.",
      slug: "serum-vitamina-c-30ml",
      keywords: ["sérum", "vitamina c", "skincare"],
      structuredData: true,
      indexation: "indexado",
      clicks: 9840,
      impressions: 212400,
      organicSales: 71,
    },
  },
  {
    id: "p-halter",
    name: "Kit Halteres Ajustáveis 20kg",
    sku: "PUB-KHA-005",
    category: "Fitness",
    supplierId: "sup-atlas",
    cost: 189.0,
    price: 449.0,
    stock: 96,
    reserved: 14,
    status: "ativo",
    storeIds: ["urban"],
    sold: 74,
    seo: {
      title: "Kit Halteres Ajustáveis 20kg para Treino em Casa | PUB ECOM",
      description: "Par de halteres ajustáveis de 20kg com travamento rápido.",
      slug: "kit-halteres-ajustaveis-20kg",
      keywords: ["halteres", "treino em casa", "musculação"],
      structuredData: false,
      indexation: "erro",
      clicks: 640,
      impressions: 28200,
      organicSales: 3,
    },
  },
  {
    id: "p-projetor",
    name: "Mini Projetor Full HD",
    sku: "PUB-MPF-006",
    category: "Tecnologia",
    supplierId: "sup-orion",
    cost: 214.0,
    price: 599.0,
    stock: 0,
    reserved: 0,
    status: "esgotado",
    storeIds: ["alpha", "elite"],
    sold: 121,
    seo: {
      title: "Mini Projetor Full HD 1080p Portátil | PUB ECOM",
      description: "Projetor portátil Full HD com Wi-Fi e espelhamento de tela.",
      slug: "mini-projetor-full-hd",
      keywords: ["projetor", "full hd", "portátil"],
      structuredData: true,
      indexation: "pendente",
      clicks: 3120,
      impressions: 94100,
      organicSales: 18,
    },
  },
  {
    id: "p-umidificador",
    name: "Umidificador Aroma LED",
    sku: "PUB-UAL-007",
    category: "Casa & Cozinha",
    supplierId: "sup-orion",
    cost: 44.2,
    price: 149.9,
    stock: 486,
    reserved: 30,
    status: "ativo",
    storeIds: ["casa", "nexus"],
    sold: 231,
    seo: {
      title: "Umidificador de Ar com Aromaterapia e LED | PUB ECOM",
      description: "Umidificador ultrassônico 500ml com luz LED e difusor de aromas.",
      slug: "umidificador-aroma-led",
      keywords: ["umidificador", "aromaterapia", "difusor"],
      structuredData: true,
      indexation: "indexado",
      clicks: 4180,
      impressions: 118600,
      organicSales: 27,
    },
  },
  {
    id: "p-camera",
    name: "Câmera de Segurança Wi-Fi 360º",
    sku: "PUB-CSW-008",
    category: "Tecnologia",
    supplierId: "sup-kappa",
    cost: 121.0,
    price: 319.0,
    stock: 142,
    reserved: 8,
    status: "rascunho",
    storeIds: ["alpha"],
    sold: 58,
    seo: {
      title: "Câmera de Segurança Wi-Fi 360º com Visão Noturna | PUB ECOM",
      description: "Câmera IP rotativa 360º com visão noturna e detecção de movimento.",
      slug: "camera-seguranca-wifi-360",
      keywords: ["câmera de segurança", "wifi", "360"],
      structuredData: false,
      indexation: "pendente",
      clicks: 910,
      impressions: 41200,
      organicSales: 4,
    },
  },
];

export const affiliates: Affiliate[] = [
  {
    id: "af-lucas",
    name: "Lucas Andrade",
    handle: "@lucasdrops",
    clicks: 18420,
    orders: 142,
    revenue: 21840,
    commissionRate: 12,
    conversion: 0.77,
    status: "ativo",
  },
  {
    id: "af-marina",
    name: "Marina Costa",
    handle: "@marinacosta",
    clicks: 12180,
    orders: 96,
    revenue: 14210,
    commissionRate: 10,
    conversion: 0.79,
    status: "ativo",
  },
  {
    id: "af-pedro",
    name: "Pedro Lima",
    handle: "@pedroreviews",
    clicks: 9640,
    orders: 71,
    revenue: 10480,
    commissionRate: 10,
    conversion: 0.74,
    status: "ativo",
  },
  {
    id: "af-bia",
    name: "Beatriz Rocha",
    handle: "@biarocha",
    clicks: 6210,
    orders: 38,
    revenue: 5620,
    commissionRate: 8,
    conversion: 0.61,
    status: "ativo",
  },
  {
    id: "af-igor",
    name: "Igor Bastos",
    handle: "@igorbastos",
    clicks: 2840,
    orders: 11,
    revenue: 1610,
    commissionRate: 8,
    conversion: 0.39,
    status: "pendente",
  },
];

export const influencers: Influencer[] = [
  {
    id: "in-carlos",
    name: "Carlos Tech",
    handle: "@carlos_tech",
    platform: "Instagram",
    reach: 1240000,
    contents: 18,
    clicks: 42800,
    carts: 6120,
    checkouts: 2140,
    orders: 486,
    revenue: 168410,
    deductions: 101046,
    status: "ativo",
  },
  {
    id: "in-nath",
    name: "Nath Beauty",
    handle: "@nathbeauty",
    platform: "TikTok",
    reach: 890000,
    contents: 24,
    clicks: 38210,
    carts: 5240,
    checkouts: 1810,
    orders: 402,
    revenue: 98420,
    deductions: 61220,
    status: "ativo",
  },
  {
    id: "in-rafa",
    name: "Rafa Home",
    handle: "@rafahome",
    platform: "YouTube",
    reach: 420000,
    contents: 9,
    clicks: 14210,
    carts: 2180,
    checkouts: 740,
    orders: 168,
    revenue: 54120,
    deductions: 34980,
    status: "ativo",
  },
  {
    id: "in-duda",
    name: "Duda Fit",
    handle: "@dudafit",
    platform: "Instagram",
    reach: 260000,
    contents: 6,
    clicks: 8420,
    carts: 1120,
    checkouts: 390,
    orders: 84,
    revenue: 31240,
    deductions: 21100,
    status: "negociacao",
  },
];

/** Lucro líquido atribuído ao influencer. Repasse = 50% do lucro líquido. */
export const influencerNetProfit = (i: Influencer) => i.revenue - i.deductions;
export const influencerPayout = (i: Influencer) => influencerNetProfit(i) * 0.5;

const CUSTOMERS = [
  ["Ana Beatriz Souza", "ana.souza@email.com", "São Paulo, SP"],
  ["Rodrigo Martins", "rodrigo.m@email.com", "Belo Horizonte, MG"],
  ["Fernanda Alves", "fe.alves@email.com", "Curitiba, PR"],
  ["Thiago Ribeiro", "thiago.rib@email.com", "Recife, PE"],
  ["Camila Duarte", "camila.d@email.com", "Porto Alegre, RS"],
  ["Vinícius Barros", "vini.barros@email.com", "Salvador, BA"],
  ["Larissa Pinto", "lari.pinto@email.com", "Fortaleza, CE"],
  ["Gustavo Nogueira", "gu.nog@email.com", "Campinas, SP"],
  ["Patrícia Lopes", "patricia.l@email.com", "Goiânia, GO"],
  ["Eduardo Ramos", "edu.ramos@email.com", "Florianópolis, SC"],
  ["Sabrina Teixeira", "sabrina.t@email.com", "Manaus, AM"],
  ["Henrique Dias", "henrique.d@email.com", "Brasília, DF"],
] as const;

const STATUS_POOL: OrderStatus[] = [
  "novo",
  "pagamento_pendente",
  "pago",
  "aguardando_compra",
  "comprado_fornecedor",
  "aguardando_envio",
  "enviado",
  "em_transito",
  "entregue",
  "entregue",
  "cancelado",
  "reembolsado",
];

const ORIGIN_POOL: Order["origin"][] = [
  "meta_ads",
  "google_ads",
  "influencer",
  "afiliado",
  "organico",
  "direto",
];

const UTM_BY_ORIGIN: Record<Order["origin"], Order["utm"]> = {
  meta_ads: {
    source: "facebook",
    medium: "cpc",
    campaign: "PUB-ADV-BR-CONV",
    content: "video_ugc_01",
    term: "smartwatch",
  },
  google_ads: {
    source: "google",
    medium: "cpc",
    campaign: "PUB-SEARCH-BRAND",
    content: "rsa_headline_b",
    term: "comprar smartwatch",
  },
  influencer: {
    source: "instagram",
    medium: "influencer",
    campaign: "CREATOR-PERF-50",
    content: "reels_review",
    term: "-",
  },
  afiliado: {
    source: "afiliado",
    medium: "referral",
    campaign: "AFF-PROGRAM",
    content: "link_bio",
    term: "-",
  },
  organico: {
    source: "google",
    medium: "organic",
    campaign: "-",
    content: "-",
    term: "melhor smartwatch 2026",
  },
  direto: { source: "direct", medium: "none", campaign: "-", content: "-", term: "-" },
};

function buildOrders(): Order[] {
  const list: Order[] = [];
  const base = Date.UTC(2026, 7, 21, 14, 40, 0);
  for (let i = 0; i < 64; i++) {
    const store = stores[i % stores.length];
    const product = products[(i * 3) % products.length];
    const status = STATUS_POOL[i % STATUS_POOL.length];
    const origin = ORIGIN_POOL[i % ORIGIN_POOL.length];
    const qty = (i % 3) + 1;
    const value = product.price * qty;
    const discount = i % 5 === 0 ? Math.round(value * 0.1 * 100) / 100 : 0;
    const shipping = 18.9 + (i % 4) * 6;
    const fees = Math.round((value - discount) * 0.0499 * 100) / 100;
    const partnerId =
      origin === "influencer"
        ? influencers[i % influencers.length].id
        : origin === "afiliado"
          ? affiliates[i % affiliates.length].id
          : undefined;
    list.push({
      id: `o-${10942 - i}`,
      number: `#${10942 - i}`,
      customer: CUSTOMERS[i % CUSTOMERS.length][0],
      customerEmail: CUSTOMERS[i % CUSTOMERS.length][1],
      city: CUSTOMERS[i % CUSTOMERS.length][2],
      storeId: store.id,
      productId: product.id,
      qty,
      supplierId: product.supplierId,
      value,
      cost: product.cost * qty,
      shipping,
      fees,
      discount,
      status,
      origin,
      partnerId,
      createdAt: new Date(base - i * 11 * 60 * 1000).toISOString(),
      utm: UTM_BY_ORIGIN[origin],
    });
  }
  return list;
}

export const orders: Order[] = buildOrders();

export const orderProfit = (o: Order) =>
  o.value - o.discount - o.cost - o.shipping - o.fees;

export const getStore = (id: string) => stores.find((s) => s.id === id);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getSupplier = (id: string) => suppliers.find((s) => s.id === id);
export const getAffiliate = (id: string) => affiliates.find((a) => a.id === id);
export const getInfluencer = (id: string) => influencers.find((i) => i.id === id);
export const getOrder = (id: string) => orders.find((o) => o.id === id);
export const partnerName = (o: Order) =>
  o.partnerId
    ? (getInfluencer(o.partnerId)?.handle ?? getAffiliate(o.partnerId)?.handle ?? "—")
    : "—";

/* ---------- séries e agregações ---------- */

export const hourly = Array.from({ length: 24 }, (_, h) => {
  const shape = [
    0.2, 0.12, 0.08, 0.06, 0.05, 0.08, 0.16, 0.28, 0.42, 0.55, 0.66, 0.72, 0.78, 0.92, 1.0,
    0.88, 0.74, 0.69, 0.81, 0.95, 0.86, 0.62, 0.44, 0.3,
  ][h];
  return {
    hour: `${String(h).padStart(2, "0")}h`,
    faturamento: Math.round(shape * 3600),
    faturamentoOntem: Math.round(shape * 3180 * (0.85 + ((h % 5) * 0.06))),
    pedidos: Math.round(shape * 24),
    visitantes: Math.round(shape * 940),
  };
});

export const funnel = {
  pageView: 184200,
  addToCart: 33890,
  addPaymentInfo: 15120,
  purchase: 6980,
};

export const funnelBy = {
  loja: stores.slice(0, 5).map((s) => ({
    name: s.name,
    pv: s.visitors,
    cart: Math.round(s.visitors * 0.18),
    pay: Math.round(s.visitors * 0.082),
    purchase: s.orders * 6,
  })),
  canal: [
    { name: "Meta Ads", pv: 78400, cart: 15680, pay: 7050, purchase: 3210 },
    { name: "Google Ads", pv: 42100, cart: 7570, pay: 3480, purchase: 1640 },
    { name: "Orgânico", pv: 31800, cart: 5090, pay: 2210, purchase: 1080 },
    { name: "Influencer", pv: 21400, cart: 4280, pay: 1810, purchase: 742 },
    { name: "Afiliado", pv: 10500, cart: 1270, pay: 570, purchase: 308 },
  ],
};

export const channelSales = [
  { name: "Meta Ads", value: 642000, orders: 3210 },
  { name: "Google Ads", value: 318400, orders: 1640 },
  { name: "Orgânico", value: 204100, orders: 1080 },
  { name: "Influencer", value: 168400, orders: 742 },
  { name: "Afiliado", value: 61200, orders: 308 },
];

export const finance = {
  gross: 1842400,
  discounts: 96420,
  paymentFees: 91240,
  productCost: 842100,
  shipping: 142800,
  commissions: 118400,
  payouts: 214600,
};

export const financeNet =
  finance.gross -
  finance.discounts -
  finance.paymentFees -
  finance.productCost -
  finance.shipping;
export const pubEcomProfit = financeNet - finance.commissions - finance.payouts;

export const audiences = [
  {
    level: "L1",
    event: "PAGE VIEW",
    rule: "Page View — EXCLUI Add To Cart, EXCLUI Purchase",
    windows: { 1: 18400, 3: 42100, 7: 84200, 14: 141000, 30: 268000, 90: 612000, 180: 1024000, 365: 1840000 },
  },
  {
    level: "L2",
    event: "ADD TO CART",
    rule: "Add To Cart — EXCLUI Purchase",
    windows: { 1: 3210, 3: 7420, 7: 14800, 14: 24100, 30: 46200, 90: 104000, 180: 178000, 365: 312000 },
  },
  {
    level: "L3",
    event: "ADD PAYMENT INFO",
    rule: "Payment Info — EXCLUI Purchase",
    windows: { 1: 1420, 3: 3240, 7: 6410, 14: 10800, 30: 20400, 90: 46100, 180: 78200, 365: 138000 },
  },
  {
    level: "L4",
    event: "PURCHASE",
    rule: "Purchase — base de recompra, cross sell e upsell",
    windows: { 1: 698, 3: 1640, 7: 3210, 14: 5420, 30: 10200, 90: 23400, 180: 41200, 365: 72800 },
  },
] as const;

export const AUDIENCE_WINDOWS = [1, 3, 7, 14, 30, 90, 180, 365] as const;

export const remarketing = [
  {
    level: "Nível 1",
    desc: "Visitou e não adicionou ao carrinho",
    audience: "L1 · Page View 7D",
    size: 84200,
    spend: 18400,
    revenue: 64200,
    conversions: 412,
    objective: "Aquisição fria requente",
  },
  {
    level: "Nível 2",
    desc: "Adicionou ao carrinho e não iniciou pagamento",
    audience: "L2 · Add To Cart 7D",
    size: 14800,
    spend: 9200,
    revenue: 78400,
    conversions: 604,
    objective: "Recuperação de carrinho",
  },
  {
    level: "Nível 3",
    desc: "Informou pagamento e não comprou",
    audience: "L3 · Payment Info 7D",
    size: 6410,
    spend: 4100,
    revenue: 61800,
    conversions: 488,
    objective: "Recuperação de checkout",
  },
  {
    level: "Nível 4",
    desc: "Comprou — recompra, cross sell, upsell e fidelização",
    audience: "L4 · Purchase 30D",
    size: 10200,
    spend: 6800,
    revenue: 112400,
    conversions: 812,
    objective: "LTV",
  },
];

export const adsCampaigns = [
  {
    id: "cmp-1",
    platform: "Meta Ads" as const,
    name: "PUB-ADV-BR-CONV | Smartwatch",
    storeId: "elite",
    spend: 42800,
    impressions: 3840000,
    clicks: 96400,
    conversions: 1210,
    revenue: 184200,
    status: "ativa" as const,
  },
  {
    id: "cmp-2",
    platform: "Meta Ads" as const,
    name: "PUB-RMKT-L2 | Carrinho 7D",
    storeId: "glow",
    spend: 9200,
    impressions: 842000,
    clicks: 28400,
    conversions: 604,
    revenue: 78400,
    status: "ativa" as const,
  },
  {
    id: "cmp-3",
    platform: "Google Ads" as const,
    name: "PUB-SEARCH-BRAND",
    storeId: "alpha",
    spend: 18400,
    impressions: 1240000,
    clicks: 42100,
    conversions: 812,
    revenue: 98400,
    status: "ativa" as const,
  },
  {
    id: "cmp-4",
    platform: "Google Ads" as const,
    name: "PUB-PMAX-CATALOGO",
    storeId: "casa",
    spend: 12600,
    impressions: 984000,
    clicks: 21800,
    conversions: 398,
    revenue: 51200,
    status: "pausada" as const,
  },
  {
    id: "cmp-5",
    platform: "Meta Ads" as const,
    name: "PUB-RMKT-L3 | Checkout 7D",
    storeId: "urban",
    spend: 4100,
    impressions: 312000,
    clicks: 11400,
    conversions: 488,
    revenue: 61800,
    status: "ativa" as const,
  },
];

export type TrackEvent = {
  id: string;
  type: "page_view" | "add_to_cart" | "add_payment_info" | "purchase";
  ts: string;
  session: string;
  storeId: string;
  productId: string;
  campaign: string;
  utmSource: string;
  partner?: string;
};

export const trackEvents: TrackEvent[] = Array.from({ length: 40 }, (_, i) => {
  const types: TrackEvent["type"][] = [
    "page_view",
    "page_view",
    "add_to_cart",
    "page_view",
    "add_payment_info",
    "purchase",
  ];
  const o = orders[i % orders.length];
  return {
    id: `ev-${9000 + i}`,
    type: types[i % types.length],
    ts: new Date(Date.UTC(2026, 7, 21, 14, 39, 0) - i * 37 * 1000).toISOString(),
    session: `sess_${(783412 + i * 977).toString(36)}`,
    storeId: o.storeId,
    productId: o.productId,
    campaign: o.utm.campaign,
    utmSource: o.utm.source,
    partner: o.partnerId ? partnerName(o) : undefined,
  };
});

export const utmRows = [
  {
    source: "facebook",
    medium: "cpc",
    campaign: "PUB-ADV-BR-CONV",
    content: "video_ugc_01",
    term: "smartwatch",
    visits: 78400,
    carts: 15680,
    checkouts: 7050,
    sales: 3210,
    revenue: 642000,
  },
  {
    source: "google",
    medium: "cpc",
    campaign: "PUB-SEARCH-BRAND",
    content: "rsa_headline_b",
    term: "comprar smartwatch",
    visits: 42100,
    carts: 7570,
    checkouts: 3480,
    sales: 1640,
    revenue: 318400,
  },
  {
    source: "google",
    medium: "organic",
    campaign: "-",
    content: "-",
    term: "melhor smartwatch 2026",
    visits: 31800,
    carts: 5090,
    checkouts: 2210,
    sales: 1080,
    revenue: 204100,
  },
  {
    source: "instagram",
    medium: "influencer",
    campaign: "CREATOR-PERF-50",
    content: "reels_review",
    term: "-",
    visits: 21400,
    carts: 4280,
    checkouts: 1810,
    sales: 742,
    revenue: 168400,
  },
  {
    source: "afiliado",
    medium: "referral",
    campaign: "AFF-PROGRAM",
    content: "link_bio",
    term: "-",
    visits: 10500,
    carts: 1270,
    checkouts: 570,
    sales: 308,
    revenue: 61200,
  },
];

export const bonuses = [
  {
    id: "b1",
    name: "Meta Faturamento Agosto",
    participant: "Todas as lojas",
    period: "01–31 ago 2026",
    goal: 2000000,
    progress: 1842400,
    prize: "R$ 20.000 em créditos de mídia",
    rule: "Faturamento consolidado da rede",
  },
  {
    id: "b2",
    name: "Desafio 200 Pedidos",
    participant: "Elite Dropshipping",
    period: "01–31 ago 2026",
    goal: 200,
    progress: 124,
    prize: "Mentoria 1:1 + destaque na home",
    rule: "Pedidos pagos no período",
  },
  {
    id: "b3",
    name: "Creator Performance 50",
    participant: "@carlos_tech",
    period: "Trimestre 3",
    goal: 100000,
    progress: 67364,
    prize: "Bônus de R$ 10.000 sobre o repasse",
    rule: "Lucro líquido gerado",
  },
  {
    id: "b4",
    name: "Top Afiliado do Mês",
    participant: "Programa de afiliados",
    period: "01–31 ago 2026",
    goal: 150,
    progress: 142,
    prize: "Aumento de comissão para 15%",
    rule: "Pedidos atribuídos",
  },
];

/* ---------- Live Shop ---------- */

export const liveMetrics = {
  visitors: 1284,
  carts: 187,
  checkouts: 42,
  payments: 19,
  sales5min: 13,
};

export type LiveEvent = {
  id: string;
  kind: "view" | "cart" | "checkout" | "payment" | "sale";
  text: string;
  storeId: string;
  meta: string;
  value?: number;
  offset: number;
};

export const liveEvents: LiveEvent[] = [
  { id: "l1", kind: "sale", text: "Pedido #10942 aprovado", storeId: "alpha", meta: "Influencer @carlos_tech", value: 299.9, offset: 2 },
  { id: "l2", kind: "checkout", text: "Cliente iniciou checkout", storeId: "elite", meta: "Smartwatch Pro X", value: 399.9, offset: 14 },
  { id: "l3", kind: "cart", text: "Cliente adicionou Fone Noise Cancelling v2 ao carrinho", storeId: "glow", meta: "Meta Ads · PUB-ADV-BR-CONV", offset: 26 },
  { id: "l4", kind: "payment", text: "Pagamento processando · PIX gerado", storeId: "casa", meta: "Pedido #10941", value: 329, offset: 38 },
  { id: "l5", kind: "sale", text: "Loja Urban Fit realizou uma venda", storeId: "urban", meta: "Afiliado @lucasdrops", value: 449, offset: 51 },
  { id: "l6", kind: "view", text: "Novo visitante orgânico", storeId: "elite", meta: "Google · melhor smartwatch 2026", offset: 63 },
  { id: "l7", kind: "cart", text: "Cliente adicionou Sérum Vitamina C ao carrinho", storeId: "glow", meta: "TikTok · @nathbeauty", offset: 78 },
  { id: "l8", kind: "checkout", text: "Cliente preencheu dados de pagamento", storeId: "alpha", meta: "Mini Projetor Full HD", value: 599, offset: 92 },
  { id: "l9", kind: "sale", text: "Pedido #10939 aprovado", storeId: "casa", meta: "Google Ads · PMAX", value: 149.9, offset: 108 },
  { id: "l10", kind: "view", text: "Novo visitante de campanha", storeId: "urban", meta: "Meta Ads · video_ugc_01", offset: 121 },
  { id: "l11", kind: "cart", text: "Cliente adicionou Kit Pro Cozinha ao carrinho", storeId: "casa", meta: "Direto", offset: 140 },
  { id: "l12", kind: "payment", text: "Pagamento processando · Cartão", storeId: "elite", meta: "Pedido #10938", value: 799.8, offset: 156 },
];

export const seoTotals = {
  indexed: products.filter((p) => p.seo.indexation === "indexado").length,
  pending: products.filter((p) => p.seo.indexation === "pendente").length,
  errors: products.filter((p) => p.seo.indexation === "erro").length,
  clicks: products.reduce((a, p) => a + p.seo.clicks, 0),
  impressions: products.reduce((a, p) => a + p.seo.impressions, 0),
  organicSales: products.reduce((a, p) => a + p.seo.organicSales, 0),
};

export const inventory = products.map((p) => ({
  ...p,
  available: Math.max(0, p.stock - p.reserved),
  coverageDays: p.stock === 0 ? 0 : Math.round(p.stock / Math.max(1, p.sold / 30)),
}));
