import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, Tag } from "@/components/master/ui";
import { getStore, liveEvents, liveMetrics, stores } from "@/lib/mock";
import { brl, num } from "@/lib/format";

export const Route = createFileRoute("/live-shop")({
  head: () => ({
    meta: [
      { title: "Live Shop — Monitoramento em Tempo Real | PUB ECOM" },
      {
        name: "description",
        content:
          "Monitor em tempo real da PUB ECOM: visitantes online, carrinhos abertos, checkouts, pagamentos e vendas por loja.",
      },
      { property: "og:title", content: "Live Shop — PUB ECOM" },
      {
        property: "og:description",
        content: "Visitantes, carrinhos, checkouts e vendas em tempo real por loja.",
      },
    ],
  }),
  component: LiveShop,
});

const KIND: Record<string, { label: string; tone: string }> = {
  view: { label: "Page view", tone: "neutral" },
  cart: { label: "Add to cart", tone: "info" },
  checkout: { label: "Checkout", tone: "warn" },
  payment: { label: "Pagamento", tone: "warn" },
  sale: { label: "Venda", tone: "accent" },
};

function LiveShop() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const jitter = (base: number, amp: number) =>
    base + Math.round(Math.sin(tick / 2 + base) * amp);

  const feed = [...liveEvents.slice(tick % liveEvents.length), ...liveEvents].slice(0, 12);

  return (
    <Shell
      title="Live Shop"
      subtitle="Fluxo operacional em tempo real de toda a rede PUB ECOM"
      showPeriods={false}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Visitantes online" value={num(jitter(liveMetrics.visitors, 24))} live />
        <Kpi label="Carrinhos abertos" value={num(jitter(liveMetrics.carts, 7))} live />
        <Kpi label="Checkouts" value={num(jitter(liveMetrics.checkouts, 4))} live />
        <Kpi label="Pagamentos processando" value={num(jitter(liveMetrics.payments, 3))} live />
        <Kpi
          label="Vendas (5 min)"
          value={num(jitter(liveMetrics.sales5min, 2))}
          tone="accent"
          live
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Feed de eventos" live className="xl:col-span-2" bodyClassName="p-4">
          <div className="scroll-thin max-h-[620px] space-y-2.5 overflow-y-auto">
            {feed.map((e, i) => {
              const k = KIND[e.kind];
              return (
                <div
                  key={`${e.id}-${i}`}
                  className="feed-in flex items-start justify-between gap-4 rounded-lg border border-border bg-surface-2 p-3.5"
                >
                  <div className="min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <Tag tone={k.tone}>{k.label}</Tag>
                      <span className="num text-[10px] text-muted-foreground">
                        há {e.offset + (i % 3)}s
                      </span>
                    </div>
                    <div className="text-sm text-card-foreground">{e.text}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
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
                  {e.value != null && (
                    <div className="num shrink-0 text-sm text-card-foreground">{brl(e.value)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Sessões ativas por loja" bodyClassName="p-5">
            <div className="space-y-4">
              {stores.slice(0, 6).map((s, i) => {
                const sessions = Math.max(4, Math.round(s.visitors / 120) + (tick % 5) - i);
                const share = Math.min(100, (sessions / 380) * 100);
                return (
                  <div key={s.id}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <Link
                        to="/lojas/$storeId"
                        params={{ storeId: s.id }}
                        className="text-card-foreground hover:text-accent"
                      >
                        {s.name}
                      </Link>
                      <span className="num text-muted-foreground">{sessions} online</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-accent" style={{ width: `${share}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Checkouts em andamento" bodyClassName="divide-y divide-border/60">
            {liveEvents
              .filter((e) => e.kind === "checkout" || e.kind === "payment")
              .map((e) => (
                <div key={e.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <div className="text-xs text-card-foreground">{e.meta}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {getStore(e.storeId)?.name}
                    </div>
                  </div>
                  <span className="num text-xs text-accent">{e.value ? brl(e.value) : "—"}</span>
                </div>
              ))}
          </Panel>
        </div>
      </div>
    </Shell>
  );
}
