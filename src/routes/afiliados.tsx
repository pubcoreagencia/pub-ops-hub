import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { affiliates } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/afiliados")({
  head: () => ({
    meta: [
      { title: "Creator Center — Afiliados | PUB ECOM" },
      {
        name: "description",
        content:
          "Painel de afiliados da PUB ECOM: links, cliques, pedidos, conversão, comissão gerada e status de pagamento.",
      },
      { property: "og:title", content: "Afiliados — PUB ECOM" },
      { property: "og:description", content: "Programa de afiliados com atribuição por link." },
    ],
  }),
  component: Afiliados,
});

function Afiliados() {
  const clicks = affiliates.reduce((a, x) => a + x.clicks, 0);
  const orders = affiliates.reduce((a, x) => a + x.orders, 0);
  const revenue = affiliates.reduce((a, x) => a + x.revenue, 0);
  const commission = affiliates.reduce((a, x) => a + (x.revenue * x.commissionRate) / 100, 0);

  return (
    <Shell title="Afiliados" subtitle="Cada afiliado tem link próprio com atribuição automática">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Cliques em links" value={num(clicks, true)} />
        <Kpi label="Pedidos atribuídos" value={num(orders)} />
        <Kpi label="Receita gerada" value={brl(revenue, true)} tone="accent" />
        <Kpi label="Comissões a pagar" value={brl(commission, true)} />
      </div>

      <Panel title="Ranking de afiliados">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Pos.</Th>
              <Th>Afiliado</Th>
              <Th>Link</Th>
              <Th right>Cliques</Th>
              <Th right>Pedidos</Th>
              <Th right>Conversão</Th>
              <Th right>Receita</Th>
              <Th right>Comissão</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {[...affiliates]
              .sort((a, b) => b.revenue - a.revenue)
              .map((a, i) => (
                <tr key={a.id} className="hover:bg-muted/40">
                  <Td className="num text-xs text-accent">#{String(i + 1).padStart(2, "0")}</Td>
                  <Td>
                    <div className="text-sm text-card-foreground">{a.name}</div>
                    <div className="num text-[11px] text-muted-foreground">{a.handle}</div>
                  </Td>
                  <Td className="num text-[11px] text-muted-foreground">
                    pubecom.com/r/{a.handle.replace("@", "")}
                  </Td>
                  <Td right className="num text-xs">
                    {num(a.clicks)}
                  </Td>
                  <Td right className="num text-xs">
                    {num(a.orders)}
                  </Td>
                  <Td right className="num text-xs">
                    {pct(a.conversion, 2)}
                  </Td>
                  <Td right className="num text-xs">
                    {brl(a.revenue)}
                  </Td>
                  <Td right className="num text-xs text-accent">
                    {brl((a.revenue * a.commissionRate) / 100)}
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      {a.commissionRate}%
                    </span>
                  </Td>
                  <Td>
                    <Tag tone={a.status === "ativo" ? "accent" : "warn"}>{a.status}</Tag>
                  </Td>
                </tr>
              ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
