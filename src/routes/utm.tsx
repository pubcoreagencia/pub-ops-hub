import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Td, Th } from "@/components/master/ui";
import { utmRows } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/utm")({
  head: () => ({
    meta: [
      { title: "Atribuição por UTM | PUB ECOM" },
      {
        name: "description",
        content:
          "Análise de utm_source, utm_medium, utm_campaign, utm_content e utm_term com visitas, carrinhos, checkouts, vendas e receita.",
      },
      { property: "og:title", content: "UTM & Atribuição — PUB ECOM" },
      { property: "og:description", content: "De onde vem cada venda da rede." },
    ],
  }),
  component: Utm,
});

function Utm() {
  const t = utmRows.reduce(
    (a, r) => ({
      visits: a.visits + r.visits,
      sales: a.sales + r.sales,
      revenue: a.revenue + r.revenue,
    }),
    { visits: 0, sales: 0, revenue: 0 },
  );

  return (
    <Shell title="UTM & Atribuição" subtitle="Toda venda é rastreada até a origem exata">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Visitas rastreadas" value={num(t.visits, true)} />
        <Kpi label="Vendas atribuídas" value={num(t.sales)} />
        <Kpi label="Receita atribuída" value={brl(t.revenue, true)} tone="accent" />
        <Kpi label="Conversão média" value={pct((t.sales / t.visits) * 100, 2)} />
      </div>

      <Panel title="Combinações de UTM">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>utm_source</Th>
              <Th>utm_medium</Th>
              <Th>utm_campaign</Th>
              <Th>utm_content</Th>
              <Th>utm_term</Th>
              <Th right>Visitas</Th>
              <Th right>Carrinhos</Th>
              <Th right>Checkouts</Th>
              <Th right>Vendas</Th>
              <Th right>Receita</Th>
              <Th right>Conv.</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {utmRows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/40">
                <Td className="num text-xs text-card-foreground">{r.source}</Td>
                <Td className="num text-xs text-muted-foreground">{r.medium}</Td>
                <Td className="num text-[11px]">{r.campaign}</Td>
                <Td className="num text-[11px] text-muted-foreground">{r.content}</Td>
                <Td className="num text-[11px] text-muted-foreground">{r.term}</Td>
                <Td right className="num text-xs">
                  {num(r.visits)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.carts)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.checkouts)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.sales)}
                </Td>
                <Td right className="num text-xs">
                  {brl(r.revenue, true)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {pct((r.sales / r.visits) * 100, 2)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
