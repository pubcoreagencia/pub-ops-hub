import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { influencerNetProfit, influencerPayout, influencers } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/influencers")({
  head: () => ({
    meta: [
      { title: "Creator Center — Influencers | PUB ECOM" },
      {
        name: "description",
        content:
          "Influencers da PUB ECOM com funil próprio, lucro líquido atribuído e repasse automático de 50% do lucro gerado.",
      },
      { property: "og:title", content: "Influencers — PUB ECOM" },
      { property: "og:description", content: "Modelo de 50% do lucro líquido por criador." },
    ],
  }),
  component: Influencers,
});

function Influencers() {
  const revenue = influencers.reduce((a, i) => a + i.revenue, 0);
  const net = influencers.reduce((a, i) => a + influencerNetProfit(i), 0);
  const payout = influencers.reduce((a, i) => a + influencerPayout(i), 0);

  return (
    <Shell
      title="Influencers"
      subtitle="Repasse = 50% do lucro líquido gerado por cada criador"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Receita gerada" value={brl(revenue, true)} />
        <Kpi label="Lucro líquido atribuído" value={brl(net, true)} tone="accent" />
        <Kpi label="Repasse total (50%)" value={brl(payout, true)} />
        <Kpi label="Criadores ativos" value={influencers.filter((i) => i.status === "ativo").length} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {influencers.map((i) => (
          <Panel
            key={i.id}
            title={i.name}
            action={<Tag tone={i.status === "ativo" ? "accent" : "warn"}>{i.status}</Tag>}
          >
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="num">{i.handle}</span>
                <span className="h-3 w-px bg-border" />
                <span>{i.platform}</span>
                <span className="h-3 w-px bg-border" />
                <span className="num">{num(i.reach, true)} de alcance</span>
                <span className="h-3 w-px bg-border" />
                <span className="num">{i.contents} conteúdos</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["Cliques", num(i.clicks)],
                  ["Carrinhos", num(i.carts)],
                  ["Checkouts", num(i.checkouts)],
                  ["Pedidos", num(i.orders)],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border border-border bg-surface-2 p-3">
                    <div className="label-xs">{l}</div>
                    <div className="num mt-1 text-sm text-card-foreground">{v}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-surface-2 p-4">
                <Row label="Receita gerada" value={brl(i.revenue)} />
                <Row label="Custos e deduções" value={`- ${brl(i.deductions)}`} muted />
                <Row label="Lucro líquido" value={brl(influencerNetProfit(i))} />
                <div className="my-2 h-px bg-border" />
                <Row label="Repasse (50%)" value={brl(influencerPayout(i))} accent />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Comparativo de criadores">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Criador</Th>
              <Th>Plataforma</Th>
              <Th right>Alcance</Th>
              <Th right>Cliques</Th>
              <Th right>Pedidos</Th>
              <Th right>Conv. clique→venda</Th>
              <Th right>Receita</Th>
              <Th right>Lucro líquido</Th>
              <Th right>Repasse</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {influencers.map((i) => (
              <tr key={i.id} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{i.name}</Td>
                <Td className="text-xs text-muted-foreground">{i.platform}</Td>
                <Td right className="num text-xs">
                  {num(i.reach, true)}
                </Td>
                <Td right className="num text-xs">
                  {num(i.clicks)}
                </Td>
                <Td right className="num text-xs">
                  {num(i.orders)}
                </Td>
                <Td right className="num text-xs">
                  {pct((i.orders / i.clicks) * 100, 2)}
                </Td>
                <Td right className="num text-xs">
                  {brl(i.revenue, true)}
                </Td>
                <Td right className="num text-xs">
                  {brl(influencerNetProfit(i), true)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {brl(influencerPayout(i), true)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}

function Row({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`num ${accent ? "text-accent" : muted ? "text-muted-foreground" : "text-card-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
