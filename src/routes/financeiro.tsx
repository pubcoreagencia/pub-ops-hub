import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Td, Th } from "@/components/master/ui";
import { finance, financeNet, pubEcomProfit, stores } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Central Financeira da Operação | PUB ECOM" },
      {
        name: "description",
        content:
          "Faturamento bruto, descontos, taxas, custo de produtos, frete, comissões, repasses e lucro da PUB ECOM por loja e período.",
      },
      { property: "og:title", content: "Central Financeira — PUB ECOM" },
      { property: "og:description", content: "Resultado consolidado e ranking financeiro da rede." },
    ],
  }),
  component: Financeiro,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 10,
  tickLine: false,
  axisLine: false,
};

function Financeiro() {
  const data = stores.map((s) => ({
    name: s.name,
    faturamento: s.revenue,
    custos: s.cost,
    lucro: s.profit,
  }));

  return (
    <Shell title="Central Financeira" subtitle="Resultado operacional consolidado da PUB ECOM">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <Kpi label="Faturamento bruto" value={brl(finance.gross, true)} />
        <Kpi label="Descontos" value={`- ${brl(finance.discounts, true)}`} />
        <Kpi label="Taxas de pagamento" value={`- ${brl(finance.paymentFees, true)}`} />
        <Kpi label="Custo dos produtos" value={`- ${brl(finance.productCost, true)}`} />
        <Kpi label="Frete" value={`- ${brl(finance.shipping, true)}`} />
        <Kpi label="Lucro líquido" value={brl(financeNet, true)} tone="accent" />
        <Kpi label="Comissões (afiliados)" value={`- ${brl(finance.commissions, true)}`} />
        <Kpi label="Repasses (influencers)" value={`- ${brl(finance.payouts, true)}`} />
        <Kpi
          label="Lucro PUB ECOM"
          value={brl(pubEcomProfit, true)}
          tone="accent"
          hint={`Margem ${pct((pubEcomProfit / finance.gross) * 100, 1)}`}
        />
        <Kpi label="Ticket médio da rede" value={brl(189.4)} />
      </div>

      <Panel title="Faturamento por loja">
        <div className="h-[280px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" {...axis} interval={0} height={50} angle={-15} dy={12} />
              <YAxis {...axis} width={48} tickFormatter={(v) => num(v, true)} />
              <Tooltip
                cursor={{ fill: "var(--color-muted)" }}
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v: number) => brl(v)}
              />
              <Bar dataKey="faturamento" name="Faturamento" fill="var(--color-info)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="lucro" name="Lucro" fill="var(--color-accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Ranking financeiro">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Pos.</Th>
              <Th>Loja</Th>
              <Th right>Faturamento</Th>
              <Th right>Custos</Th>
              <Th right>Lucro</Th>
              <Th right>Margem</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {[...stores]
              .sort((a, b) => b.profit - a.profit)
              .map((s, i) => (
                <tr key={s.id} className="group hover:bg-muted/40">
                  <Td className="num text-xs text-accent">#{String(i + 1).padStart(2, "0")}</Td>
                  <Td>
                    <Link
                      to="/lojas/$storeId"
                      params={{ storeId: s.id }}
                      className="text-sm text-card-foreground group-hover:text-accent"
                    >
                      {s.name}
                    </Link>
                  </Td>
                  <Td right className="num text-xs">
                    {brl(s.revenue)}
                  </Td>
                  <Td right className="num text-xs text-muted-foreground">
                    {brl(s.cost)}
                  </Td>
                  <Td right className="num text-xs text-accent">
                    {brl(s.profit)}
                  </Td>
                  <Td right className="num text-xs">
                    {pct((s.profit / s.revenue) * 100, 1)}
                  </Td>
                </tr>
              ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
