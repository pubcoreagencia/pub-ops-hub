export type NavItem = { label: string; to: string; live?: boolean };
export type NavGroup = { label?: string; items: NavItem[] };

export const NAV: NavGroup[] = [
  { items: [{ label: "Visão Geral", to: "/" }] },
  {
    label: "Operações",
    items: [
      { label: "Live Shop", to: "/live-shop", live: true },
      { label: "Lojas", to: "/lojas" },
      { label: "Pedidos", to: "/pedidos" },
      { label: "Produtos", to: "/produtos" },
      { label: "Fornecedores", to: "/fornecedores" },
      { label: "Estoque", to: "/estoque" },
    ],
  },
  {
    label: "Crescimento",
    items: [
      { label: "Financeiro", to: "/financeiro" },
      { label: "Ads", to: "/ads" },
      { label: "Funil", to: "/funil" },
      { label: "Tracking", to: "/tracking" },
      { label: "UTM", to: "/utm" },
      { label: "Audiências", to: "/audiencias" },
      { label: "Remarketing", to: "/remarketing" },
    ],
  },
  {
    label: "Parceiros",
    items: [
      { label: "Afiliados", to: "/afiliados" },
      { label: "Influencers", to: "/influencers" },
      { label: "Ranking", to: "/ranking" },
      { label: "Bonificações", to: "/bonificacoes" },
    ],
  },
  {
    label: "Sistemas",
    items: [
      { label: "SEO", to: "/seo" },
      { label: "Store / Checkout", to: "/checkout" },
      { label: "Configurações", to: "/configuracoes" },
    ],
  },
];
