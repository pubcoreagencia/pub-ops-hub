import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th, Bar } from "@/components/master/ui";
import {
  STATUS_LABEL,
  ORIGIN_LABEL,
  adsCampaigns,
  affiliates,
  getProduct,
  getStore,
  hourly,
  influencers,
  orderProfit,
  orders,
  products,
  stores,
} from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/lojas/$storeId")({
  loader: ({ params }) => {
    const store = getStore(params.storeId);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Loja indisponível — PUB ECOM" }, { name: "robots", content: "noindex" }],
      };
    const t = `${loaderData.store.name} — Dashboard da Loja | PUB ECOM`;
    return {
      meta: [
        { title: t },
        {
          name: "description",
          content: `Performance da loja ${loaderData.store.name}: faturamento, pedidos, conversão, produtos, parceiros e SEO.`,
        },
        { property: "og:title", content: t },
        {
          property: "og:description",
          content: `Dashboard individual da loja ${loaderData.store.name} na rede PUB ECOM.`,
        },
      ],
    };
  },
  component: StoreDetail,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 10,
  tickLine: false,
  axisLine: false,
};

function StoreDetail() {
  const { store } = Route.useLoaderData();
  const storeOrders = orders.filter((o) => o.storeId === store.id);
  const storeProducts = products.filter((p) => p.storeIds.includes(store.id));
  const campaigns = adsCampaigns.filter((c) => c.storeId === store.id);

  const origins = Object.entries(
    storeOrders.reduce<Record<string, number>>((acc, o) => {
      acc[o.origin] = (acc[o.origin] ?? 0) + o.value;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const originTotal = origins.reduce((a, [, v]) => a + v, 0) || 1;

  return (
    <Shell
      title={store.name}
      subtitle={`Mentor: ${store.mentor} · Nicho: ${store.niche} · Operação e fulfillment por PUB ECOM`}
      actions={
        <Link
          to="/lojas"
          className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-card-foreground"
        >
          Voltar às lojas
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Faturamento" value={brl(store.revenue)} />
        <Kpi label="Pedidos" value={num(store.orders)} />
        <Kpi label="Visitantes" value={num(store.visitors)} />
        <Kpi label="Conversão" value={pct(store.conversion)} />
        <Kpi label="Ticket médio" value={brl(store.aov)} />
        <Kpi label="Lucro" value={brl(store.profit)} tone="accent" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Faturamento por hora" className="xl:col-span-2">
          <div className="h-[240px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly.map((h) => ({ ...h, v: Math.round(h.faturamento * (store.revenue / 60000)) }))}>
                <defs>
                  <linearGradient id="gStore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" {...axis} interval={2} />
                <YAxis {...axis} width={44} tickFormatter={(v) => num(v, true)} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => brl(v)}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  name="Faturamento"
                  stroke="var(--color-accent)"
                  fill="url(#gStore)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Origem das vendas" bodyClassName="p-5">
          <div className="space-y-4">
            {origins.map(([origin, value]) => (
              <div key={origin}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {ORIGIN_LABEL[origin as keyof typeof ORIGIN_LABEL]}
                  </span>
                  <span className="num text-card-foreground">{brl(value)}</span>
                </div>
                <Bar value={(value / originTotal) * 100} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Top produtos vendidos">
          <TableShell>
            <thead>
              <tr className="border-b border-border">
                <Th>Produto</Th>
                <Th right>Preço</Th>
                <Th right>Margem</Th>
                <Th right>Vendidos</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {storeProducts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40">
                  <Td>
                    <Link
                      to="/produtos"
                      className="text-sm text-card-foreground hover:text-accent"
                    >
                      {p.name}
                    </Link>
                    <div className="num text-[10px] text-muted-foreground">{p.sku}</div>
                  </Td>
                  <Td right className="num text-xs">
                    {brl(p.price)}
                  </Td>
                  <Td right className="num text-xs text-accent">
                    {pct(((p.price - p.cost) / p.price) * 100, 1)}
                  </Td>
                  <Td right className="num text-xs">
                    {p.sold}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>

        <Panel title="Pedidos recentes" action={<Link to="/pedidos" className="text-xs text-accent hover:underline">Central de pedidos</Link>}>
          <TableShell>
            <thead>
              <tr className="border-b border-border">
                <Th>Pedido</Th>
                <Th>Cliente</Th>
                <Th>Status</Th>
                <Th right>Valor</Th>
                <Th right>Lucro</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {storeOrders.slice(0, 8).map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <Td>
                    <Link
                      to="/pedidos/$orderId"
                      params={{ orderId: o.id }}
                      className="num text-xs text-accent hover:underline"
                    >
                      {o.number}
                    </Link>
                  </Td>
                  <Td className="text-xs">{o.customer}</Td>
                  <Td>
                    <Tag tone={o.status === "entregue" ? "accent" : "neutral"}>
                      {STATUS_LABEL[o.status]}
                    </Tag>
                  </Td>
                  <Td right className="num text-xs">
                    {brl(o.value)}
                  </Td>
                  <Td right className="num text-xs text-accent">
                    {brl(orderProfit(o))}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Afiliados vinculados" bodyClassName="divide-y divide-border/60">
          {affiliates.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <Link
                  to="/afiliados/$affiliateId"
                  params={{ affiliateId: a.id }}
                  className="text-sm text-card-foreground hover:text-accent"
                >
                  {a.name}
                </Link>
                <div className="num text-[10px] text-muted-foreground">{a.handle}</div>
              </div>
              <span className="num text-xs text-accent">{brl(a.revenue * 0.2, true)}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Influencers vinculados" bodyClassName="divide-y divide-border/60">
          {influencers.slice(0, 3).map((i) => (
            <div key={i.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <Link
                  to="/influencers/$influencerId"
                  params={{ influencerId: i.id }}
                  className="text-sm text-card-foreground hover:text-accent"
                >
                  {i.name}
                </Link>
                <div className="num text-[10px] text-muted-foreground">
                  {i.handle} · {i.platform}
                </div>
              </div>
              <span className="num text-xs text-accent">{brl(i.revenue * 0.15, true)}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Campanhas ativas" bodyClassName="divide-y divide-border/60">
          {(campaigns.length ? campaigns : adsCampaigns.slice(0, 2)).map((c) => (
            <div key={c.id} className="px-5 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-card-foreground">{c.name}</span>
                <span className="num text-xs text-accent">
                  {(c.revenue / c.spend).toFixed(2)}x
                </span>
              </div>
              <div className="num mt-1 text-[10px] text-muted-foreground">
                {c.platform} · investimento {brl(c.spend, true)}
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="SEO da loja" bodyClassName="p-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="label-xs">Produtos indexados</div>
              <div className="num mt-1 text-xl text-card-foreground">
                {storeProducts.filter((p) => p.seo.indexation === "indexado").length}
              </div>
            </div>
            <div>
              <div className="label-xs">Cliques orgânicos</div>
              <div className="num mt-1 text-xl text-card-foreground">
                {num(storeProducts.reduce((a, p) => a + p.seo.clicks, 0))}
              </div>
            </div>
            <div>
              <div className="label-xs">Vendas orgânicas</div>
              <div className="num mt-1 text-xl text-accent">
                {storeProducts.reduce((a, p) => a + p.seo.organicSales, 0)}
              </div>
            </div>
          </div>
          <Link to="/seo" className="mt-5 inline-block text-xs text-accent hover:underline">
            Abrir painel SEO
          </Link>
        </Panel>

        <Panel title="Financeiro da loja" bodyClassName="p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="label-xs">Faturamento</div>
              <div className="num mt-1 text-lg">{brl(store.revenue, true)}</div>
            </div>
            <div>
              <div className="label-xs">Custos</div>
              <div className="num mt-1 text-lg text-muted-foreground">{brl(store.cost, true)}</div>
            </div>
            <div>
              <div className="label-xs">Lucro</div>
              <div className="num mt-1 text-lg text-accent">{brl(store.profit, true)}</div>
            </div>
            <div>
              <div className="label-xs">Margem</div>
              <div className="num mt-1 text-lg">{pct((store.profit / store.revenue) * 100, 1)}</div>
            </div>
          </div>
          <Link to="/financeiro" className="mt-5 inline-block text-xs text-accent hover:underline">
            Abrir central financeira
          </Link>
        </Panel>
      </div>

      <Panel title="Clientes da loja">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Cliente</Th>
              <Th>E-mail</Th>
              <Th>Cidade</Th>
              <Th>Produto</Th>
              <Th right>Pedidos</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {storeOrders.slice(0, 6).map((o) => (
              <tr key={o.id} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{o.customer}</Td>
                <Td className="text-xs text-muted-foreground">{o.customerEmail}</Td>
                <Td className="text-xs text-muted-foreground">{o.city}</Td>
                <Td className="text-xs">{getProduct(o.productId)?.name}</Td>
                <Td right className="num text-xs">
                  {o.qty}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>

      <div className="flex flex-wrap gap-2">
        {stores
          .filter((s) => s.id !== store.id)
          .map((s) => (
            <Link
              key={s.id}
              to="/lojas/$storeId"
              params={{ storeId: s.id }}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground hover:text-accent"
            >
              {s.name}
            </Link>
          ))}
      </div>
    </Shell>
  );
}
