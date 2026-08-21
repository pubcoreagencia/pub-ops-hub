import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { getProduct, getStore, trackEvents, type TrackEvent } from "@/lib/mock";
import { num } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Tracking de Eventos e Sessões | PUB ECOM" },
      {
        name: "description",
        content:
          "Log em tempo real de Page View, Add To Cart, Add Payment Info e Purchase com sessão, loja, produto e campanha.",
      },
      { property: "og:title", content: "Tracking — PUB ECOM" },
      { property: "og:description", content: "Cada evento rastreado da jornada do cliente." },
    ],
  }),
  component: Tracking,
});

const LABEL: Record<TrackEvent["type"], string> = {
  page_view: "Page View",
  add_to_cart: "Add To Cart",
  add_payment_info: "Payment Info",
  purchase: "Purchase",
};

const TONE: Record<TrackEvent["type"], string> = {
  page_view: "neutral",
  add_to_cart: "info",
  add_payment_info: "warn",
  purchase: "accent",
};

function Tracking() {
  const [filter, setFilter] = useState<"todos" | TrackEvent["type"]>("todos");
  const list = filter === "todos" ? trackEvents : trackEvents.filter((e) => e.type === filter);
  const count = (t: TrackEvent["type"]) => trackEvents.filter((e) => e.type === t).length;

  return (
    <Shell title="Tracking" subtitle="Eventos capturados no pixel próprio da PUB ECOM">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(Object.keys(LABEL) as TrackEvent["type"][]).map((t) => (
          <Kpi
            key={t}
            label={LABEL[t]}
            value={num(count(t))}
            live={t === "purchase"}
            tone={t === "purchase" ? "accent" : "default"}
            hint="eventos na janela atual"
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {(["todos", ...(Object.keys(LABEL) as TrackEvent["type"][])] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs transition-colors",
              filter === f
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-surface text-muted-foreground hover:text-card-foreground",
            )}
          >
            {f === "todos" ? "Todos" : LABEL[f]}
          </button>
        ))}
      </div>

      <Panel title="Log de eventos">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Horário</Th>
              <Th>Evento</Th>
              <Th>Sessão</Th>
              <Th>Loja</Th>
              <Th>Produto</Th>
              <Th>Campanha</Th>
              <Th>Origem</Th>
              <Th>Parceiro</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {list.map((e) => (
              <tr key={e.id} className="hover:bg-muted/40">
                <Td className="num text-[11px] text-muted-foreground">
                  {new Date(e.ts).toLocaleTimeString("pt-BR")}
                </Td>
                <Td>
                  <Tag tone={TONE[e.type]}>{LABEL[e.type]}</Tag>
                </Td>
                <Td className="num text-[11px] text-muted-foreground">{e.session}</Td>
                <Td className="text-xs">{getStore(e.storeId)?.name}</Td>
                <Td className="text-xs text-muted-foreground">{getProduct(e.productId)?.name}</Td>
                <Td className="num text-[11px] text-muted-foreground">{e.campaign}</Td>
                <Td className="num text-[11px]">{e.utmSource}</Td>
                <Td className="text-xs text-muted-foreground">{e.partner ?? "—"}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
