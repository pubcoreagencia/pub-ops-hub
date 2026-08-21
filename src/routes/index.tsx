import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, Tag, TableShell, Th, Td, Bar as MiniBar } from "@/components/master/ui";
import {
  channelSales,
  finance,
  funnel,
  hourly,
  liveEvents,
  liveMetrics,
  orders,
  products,
  pubEcomProfit,
  stores,
  getStore,
} from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visão Geral da Operação — PUB ECOM Master" },
      {
        name: "description",
        content:
          "Painel master da PUB ECOM: faturamento, pedidos, visitantes online, funil de conversão e vendas por loja em tempo real.",
      },
      { property: "og:title", content: "Visão Geral da Operação — PUB ECOM Master" },
      {
        property: "og:description",
        content: "Central operacional em tempo real da PUB ECOM.",
      },
    ],
  }),
  component: Overview,
});

const CHART_COLORS = [
  "var(--color-accent)",
  "var(--color-info)",
  "var(--color-warning)",
  "var(--color-negative)",
  "var(--color-muted-foreground)",
];

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 10,
  tickLine: false,
  axisLine: false,
};

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="panel px-3 py-2 text-xs">
      <div className="label-xs mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="num flex items-center gap-2 text-card-foreground">
          <span className="size-1.5 rounded-full" style={{ background: p.color }} />
          {p.name}: {typeof p.value === "number" ? num(p.value) : p.value}
        </div>
      ))}
    </div>
  );
}

function Overview() {
  const processing = orders.filter((o) =>
    ["pago", "aguardando_compra", "comprado_fornecedor", "aguardando_envio"].includes(o.status),
  ).length;
  const shipped = orders.filter((o) => ["enviado", "em_transito"].includes(o.status)).length;
  const delivered = orders.filter((o) => o.status === "entregue").length;

  const funnelSteps = [
    { label: "Page View", value: funnel.pageView },
    { label: "Add to Cart", value: funnel.addToCart },
    { label: "Add Payment Info", value: funnel.addPaymentInfo },
    { label: "Purchase", value: funnel.purchase },
  ];

  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <Shell
      title="Visão Geral da Operação"
      subtitle="PUB ECOM opera catálogo, fornecedores, fulfillment, checkout e financeiro de toda a rede"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Faturamento hoje" value={brl(42890.2)} hint="+12,4% vs ontem" tone="positive" />
        <Kpi label="Faturamento do mês" value={brl(finance.gross, true)} hint="Projeção: R$ 2,4M" />
        <Kpi label="Pedidos hoje" value={num(482)} hint={`${processing} em processamento`} />
        <Kpi label="Ticket médio" value={brl(189.4)} hint="Estável" />
        <Kpi label="Conversão" value={pct(3.82)} hint="-0,4% vs média" tone="negative" />
        <Kpi
          label="Lucro estimado"
          value={brl(pubEcomProfit, true)}
          hint="Margem: 29,1%"
          tone="accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Visitantes online" value={num(liveMetrics.visitors)} live />
        <Kpi label="Carrinhos abertos" value={num(liveMetrics.carts)} live />
        <Kpi label="Checkouts ativos" value={num(liveMetrics.checkouts)} live />
        <Kpi label="Vendas simultâneas" value={num(liveMetrics.sales5min)} hint="últimos 5 min" live />
        <Kpi label="Pedidos enviados" value={num(shipped)} hint="em trânsito na malha" />
        <Kpi label="Pedidos entregues" value={num(delivered)} hint="ciclo concluído" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <Panel
            title="Faturamento por hora"
            action={
              <div className="num flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-accent" /> Hoje
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-border-strong" /> Ontem
                </span>
              </div>
            }
          >
            <div className="h-[280px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourly}>
                  <defs>
                    <linearGradient id="gAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="hour" {...axis} interval={2} />
                  <YAxis {...axis} width={44} tickFormatter={(v) => num(v, true)} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: "var(--color-border-strong)" }} />
                  <Area
                    type="monotone"
                    dataKey="faturamentoOntem"
                    name="Ontem"
                    stroke="var(--color-border-strong)"
                    fill="none"
                    strokeWidth={1.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="faturamento"
                    name="Hoje"
                    stroke="var(--color-accent)"
                    fill="url(#gAcc)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Panel title="Pedidos por hora">
              <div className="h-[200px] p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourly}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="hour" {...axis} interval={4} />
                    <YAxis {...axis} width={28} />
                    <Tooltip content={<ChartTip />} cursor={{ fill: "var(--color-muted)" }} />
                    <Bar dataKey="pedidos" name="Pedidos" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
            <Panel title="Visitantes por hora">
              <div className="h-[200px] p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourly}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="hour" {...axis} interval={4} />
                    <YAxis {...axis} width={36} tickFormatter={(v) => num(v, true)} />
                    <Tooltip content={<ChartTip />} />
                    <Area
                      type="monotone"
                      dataKey="visitantes"
                      name="Visitantes"
                      stroke="var(--color-info)"
                      fill="var(--color-info)"
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          <Panel
            title="Vendas por loja"
            action={
              <Link to="/lojas" className="text-xs text-accent hover:underline">
                Ver todas
              </Link>
            }
          >
            <TableShell>
              <thead>
                <tr className="border-b border-border">
                  <Th>Pos.</Th>
                  <Th>Loja</Th>
                  <Th>Mentor</Th>
                  <Th right>Pedidos</Th>
                  <Th right>Conversão</Th>
                  <Th right>Lucro</Th>
                  <Th right>Faturamento</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {stores.slice(0, 5).map((s) => (
                  <tr key={s.id} className="group transition-colors hover:bg-muted/40">
                    <Td className="num text-xs text-accent">#{String(s.rank).padStart(2, "0")}</Td>
                    <Td>
                      <Link
                        to="/lojas/$storeId"
                        params={{ storeId: s.id }}
                        className="font-medium text-card-foreground group-hover:text-accent"
                      >
                        {s.name}
                      </Link>
                    </Td>
                    <Td className="text-xs text-muted-foreground">{s.mentor}</Td>
                    <Td right className="num">
                      {s.orders}
                    </Td>
                    <Td right className="num text-xs">
                      {pct(s.conversion)}
                    </Td>
                    <Td right className="num text-accent">
                      {brl(s.profit)}
                    </Td>
                    <Td right className="num">
                      {brl(s.revenue)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </Panel>
        </div>

        <div className="space-y-6 xl:col-span-4">
          <Panel title="Funil de aquisição" bodyClassName="p-5">
            <div className="space-y-4">
              {funnelSteps.map((step, i) => {
                const rate = (step.value / funnel.pageView) * 100;
                return (
                  <div key={step.label}>
                    <div className="num mb-1 flex justify-between text-[10px] text-muted-foreground">
                      <span className={i === 3 ? "text-accent uppercase" : "uppercase"}>
                        {step.label} ({pct(rate, 1)})
                      </span>
                      <span>{num(step.value)}</span>
                    </div>
                    <MiniBar value={rate} tone={i === 3 ? "accent" : "muted"} />
                  </div>
                );
              })}
            </div>
            <Link
              to="/funil"
              className="mt-5 inline-block text-xs text-accent hover:underline"
            >
              Abrir funil completo
            </Link>
          </Panel>

          <Panel title="Eventos em tempo real" live bodyClassName="flex flex-col">
            <div className="scroll-thin max-h-[360px] space-y-2.5 overflow-y-auto p-4">
              {liveEvents.slice(0, 8).map((e) => (
                <div
                  key={e.id}
                  className="feed-in rounded-lg border border-border bg-surface-2 p-3"
                >
                  <div className="num mb-1 flex justify-between text-[10px] text-muted-foreground">
                    <span className="uppercase">{e.kind}</span>
                    <span>há {e.offset}s</span>
                  </div>
                  <div className="text-xs text-card-foreground">{e.text}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    Loja:{" "}
                    <Link
                      to="/lojas/$storeId"
                      params={{ storeId: e.storeId }}
                      className="text-accent hover:underline"
                    >
                      {getStore(e.storeId)?.name}
                    </Link>{" "}
                    · {e.meta}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-4 py-3">
              <Link to="/live-shop" className="text-xs text-accent hover:underline">
                Abrir Live Shop
              </Link>
            </div>
          </Panel>

          <Panel title="Vendas por canal">
            <div className="h-[190px] p-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelSales}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={44}
                    outerRadius={70}
                    paddingAngle={2}
                    stroke="var(--color-surface)"
                  >
                    {channelSales.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 border-t border-border p-4">
              {channelSales.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                    />
                    {c.name}
                  </span>
                  <span className="num text-card-foreground">{brl(c.value, true)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Vendas por produto">
            <div className="divide-y divide-border/60">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium text-card-foreground">{p.name}</div>
                    <div className="num text-[10px] text-muted-foreground">{p.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="num text-xs text-card-foreground">{p.sold} un.</div>
                    <Tag tone={p.status === "ativo" ? "accent" : "warn"}>{p.status}</Tag>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </Shell>
  );
}
