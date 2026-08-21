import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { remarketing } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/remarketing")({
  head: () => ({
    meta: [
      { title: "Remarketing por Nível de Funil | PUB ECOM" },
      {
        name: "description",
        content:
          "Campanhas de remarketing por nível: visitou, abandonou carrinho, abandonou checkout e comprou — com investimento, receita e ROAS.",
      },
      { property: "og:title", content: "Remarketing — PUB ECOM" },
      { property: "og:description", content: "Quatro níveis de recuperação e LTV." },
    ],
  }),
  component: Remarketing,
});

function Remarketing() {
  const spend = remarketing.reduce((a, r) => a + r.spend, 0);
  const revenue = remarketing.reduce((a, r) => a + r.revenue, 0);
  const conv = remarketing.reduce((a, r) => a + r.conversions, 0);

  return (
    <Shell title="Remarketing" subtitle="Campanhas construídas sobre os públicos L1–L4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Investimento" value={brl(spend, true)} />
        <Kpi label="Receita recuperada" value={brl(revenue, true)} tone="accent" />
        <Kpi label="Conversões" value={num(conv)} />
        <Kpi label="ROAS de remarketing" value={`${(revenue / spend).toFixed(2)}x`} tone="accent" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {remarketing.map((r) => (
          <Panel key={r.level} title={r.level} action={<Tag tone="info">{r.audience}</Tag>}>
            <div className="space-y-4 p-5">
              <p className="text-sm text-card-foreground">{r.desc}</p>
              <p className="text-xs text-muted-foreground">Objetivo: {r.objective}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Field label="Público" value={num(r.size, true)} />
                <Field label="Investimento" value={brl(r.spend, true)} />
                <Field label="Receita" value={brl(r.revenue, true)} />
                <Field label="ROAS" value={`${(r.revenue / r.spend).toFixed(2)}x`} accent />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Comparativo de níveis">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Nível</Th>
              <Th>Público-alvo</Th>
              <Th right>Tamanho</Th>
              <Th right>Investimento</Th>
              <Th right>Conversões</Th>
              <Th right>CPA</Th>
              <Th right>Receita</Th>
              <Th right>ROAS</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {remarketing.map((r) => (
              <tr key={r.level} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{r.level}</Td>
                <Td className="num text-[11px] text-muted-foreground">{r.audience}</Td>
                <Td right className="num text-xs">
                  {num(r.size)}
                </Td>
                <Td right className="num text-xs">
                  {brl(r.spend, true)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.conversions)}
                </Td>
                <Td right className="num text-xs">
                  {brl(r.spend / r.conversions)}
                </Td>
                <Td right className="num text-xs">
                  {brl(r.revenue, true)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {(r.revenue / r.spend).toFixed(2)}x
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>

      <p className="text-[11px] text-muted-foreground">
        Taxa média de recuperação de checkout:{" "}
        {pct((remarketing[2].conversions / remarketing[2].size) * 100, 2)}
      </p>
    </Shell>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="label-xs">{label}</div>
      <div className={`num mt-1 text-sm ${accent ? "text-accent" : "text-card-foreground"}`}>
        {value}
      </div>
    </div>
  );
}
