import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { stores } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/lojas/")({
  head: () => ({
    meta: [
      { title: "Lojas da Rede — Gestão de Lojistas | PUB ECOM" },
      {
        name: "description",
        content:
          "Todas as lojas operadas pela PUB ECOM: visitantes, pedidos, faturamento, ticket médio, conversão, lucro e ranking.",
      },
      { property: "og:title", content: "Lojas da Rede — PUB ECOM" },
      { property: "og:description", content: "Performance consolidada de cada loja da rede." },
    ],
  }),
  component: Lojas,
});

const STATUS_TONE: Record<string, string> = {
  ativa: "accent",
  pausada: "warn",
  onboarding: "info",
};

function Lojas() {
  const total = stores.reduce(
    (a, s) => ({
      revenue: a.revenue + s.revenue,
      orders: a.orders + s.orders,
      profit: a.profit + s.profit,
      visitors: a.visitors + s.visitors,
    }),
    { revenue: 0, orders: 0, profit: 0, visitors: 0 },
  );

  return (
    <Shell title="Lojas" subtitle="Superfícies comerciais operadas pela central PUB ECOM">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Lojas ativas" value={stores.filter((s) => s.status === "ativa").length} />
        <Kpi label="Faturamento rede" value={brl(total.revenue)} />
        <Kpi label="Pedidos" value={num(total.orders)} />
        <Kpi label="Visitantes" value={num(total.visitors, true)} />
        <Kpi label="Lucro consolidado" value={brl(total.profit)} tone="accent" />
      </div>

      <Panel title="Todas as lojas">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Ranking</Th>
              <Th>Loja</Th>
              <Th>Mentor</Th>
              <Th>Status</Th>
              <Th right>Visitantes</Th>
              <Th right>Pedidos</Th>
              <Th right>Faturamento</Th>
              <Th right>Ticket médio</Th>
              <Th right>Conversão</Th>
              <Th right>Lucro</Th>
              <Th right />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {stores.map((s) => (
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
                  <div className="text-[10px] text-muted-foreground">{s.niche}</div>
                </Td>
                <Td className="text-xs text-muted-foreground">{s.mentor}</Td>
                <Td>
                  <Tag tone={STATUS_TONE[s.status]}>{s.status}</Tag>
                </Td>
                <Td right className="num text-xs">
                  {num(s.visitors)}
                </Td>
                <Td right className="num">
                  {s.orders}
                </Td>
                <Td right className="num">
                  {brl(s.revenue)}
                </Td>
                <Td right className="num text-xs">
                  {brl(s.aov)}
                </Td>
                <Td right className="num text-xs">
                  {pct(s.conversion)}
                </Td>
                <Td right className="num text-accent">
                  {brl(s.profit)}
                </Td>
                <Td right>
                  <Link
                    to="/lojas/$storeId"
                    params={{ storeId: s.id }}
                    className="text-xs text-accent hover:underline"
                  >
                    Abrir
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
