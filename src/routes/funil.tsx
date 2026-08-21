import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Bar, Kpi, Panel, TableShell, Td, Th } from "@/components/master/ui";
import { funnel, funnelBy } from "@/lib/mock";
import { num, pct } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/funil")({
  head: () => ({
    meta: [
      { title: "Funil de Conversão da Rede | PUB ECOM" },
      {
        name: "description",
        content:
          "Page View, Add To Cart, Add Payment Info e Purchase com taxas de conversão por etapa, loja e canal.",
      },
      { property: "og:title", content: "Funil de Conversão — PUB ECOM" },
      { property: "og:description", content: "Onde a operação ganha e perde conversão." },
    ],
  }),
  component: Funil,
});

const STEPS = [
  { key: "pageView", label: "Page View" },
  { key: "addToCart", label: "Add To Cart" },
  { key: "addPaymentInfo", label: "Add Payment Info" },
  { key: "purchase", label: "Purchase" },
] as const;

function Funil() {
  const [dim, setDim] = useState<"loja" | "canal">("canal");
  const rows = funnelBy[dim];
  const top = funnel.pageView;

  return (
    <Shell title="Funil" subtitle="Jornada completa do visitante até a compra">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const v = funnel[s.key];
          const prev = i === 0 ? v : funnel[STEPS[i - 1].key];
          return (
            <Kpi
              key={s.key}
              label={s.label}
              value={num(v, true)}
              tone={i === 3 ? "accent" : "default"}
              hint={i === 0 ? "base do funil" : `${pct((v / prev) * 100, 1)} da etapa anterior`}
            />
          );
        })}
      </div>

      <Panel title="Etapas do funil">
        <div className="space-y-5 p-5">
          {STEPS.map((s, i) => {
            const v = funnel[s.key];
            const prev = i === 0 ? v : funnel[STEPS[i - 1].key];
            return (
              <div key={s.key}>
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-card-foreground">{s.label}</span>
                  <span className="num text-muted-foreground">
                    {num(v)} · {pct((v / top) * 100, 2)} do topo
                    {i > 0 && ` · queda ${pct(100 - (v / prev) * 100, 1)}`}
                  </span>
                </div>
                <Bar value={(v / top) * 100} tone={i === 3 ? "accent" : "muted"} />
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="flex items-center gap-1.5">
        {(["canal", "loja"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDim(d)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs capitalize transition-colors",
              dim === d
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-surface text-muted-foreground hover:text-card-foreground",
            )}
          >
            por {d}
          </button>
        ))}
      </div>

      <Panel title={`Funil por ${dim}`}>
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>{dim === "canal" ? "Canal" : "Loja"}</Th>
              <Th right>Page View</Th>
              <Th right>Add To Cart</Th>
              <Th right>Payment Info</Th>
              <Th right>Purchase</Th>
              <Th right>Conversão total</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{r.name}</Td>
                <Td right className="num text-xs">
                  {num(r.pv)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.cart)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.pay)}
                </Td>
                <Td right className="num text-xs">
                  {num(r.purchase)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {pct((r.purchase / r.pv) * 100, 2)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
