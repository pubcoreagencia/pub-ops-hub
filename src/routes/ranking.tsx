import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Bar, Panel, Tag } from "@/components/master/ui";
import { affiliates, influencerPayout, influencers, products, stores } from "@/lib/mock";
import { brl, num } from "@/lib/format";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Rankings Mensais da Rede | PUB ECOM" },
      {
        name: "description",
        content:
          "Rankings do mês na PUB ECOM: lojas mais vendedoras, produtos campeões, afiliados de maior receita e influencers com maior lucro.",
      },
      { property: "og:title", content: "Rankings — PUB ECOM" },
      { property: "og:description", content: "Competição saudável entre lojas e criadores." },
    ],
  }),
  component: Ranking,
});

type Row = { id: string; name: string; sub: string; value: number; display: string; to?: string };

function Board({ title, rows }: { title: string; rows: Row[] }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <Panel title={title}>
      <ol className="divide-y divide-border/60">
        {rows.map((r, i) => (
          <li key={r.id} className="flex items-center gap-4 px-5 py-3.5">
            <span
              className={`num w-8 text-xs ${i === 0 ? "text-accent" : "text-muted-foreground"}`}
            >
              #{String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-card-foreground">
                {r.to ? (
                  <Link to={r.to} className="hover:text-accent">
                    {r.name}
                  </Link>
                ) : (
                  r.name
                )}
              </div>
              <div className="num truncate text-[11px] text-muted-foreground">{r.sub}</div>
              <div className="mt-2">
                <Bar value={(r.value / max) * 100} tone={i === 0 ? "accent" : "muted"} />
              </div>
            </div>
            <span className="num text-xs text-card-foreground">{r.display}</span>
            {i === 0 && <Tag tone="accent">líder</Tag>}
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function Ranking() {
  const lojas: Row[] = [...stores]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6)
    .map((s) => ({
      id: s.id,
      name: s.name,
      sub: `${num(s.orders)} pedidos · lucro ${brl(s.profit, true)}`,
      value: s.revenue,
      display: brl(s.revenue, true),
    }));

  const produtos: Row[] = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sub: `${p.sku} · ${p.category}`,
      value: p.sold,
      display: `${num(p.sold)} un.`,
    }));

  const afs: Row[] = [...affiliates]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6)
    .map((a) => ({
      id: a.id,
      name: a.name,
      sub: `${a.handle} · ${num(a.orders)} pedidos`,
      value: a.revenue,
      display: brl(a.revenue, true),
    }));

  const infs: Row[] = [...influencers]
    .sort((a, b) => influencerPayout(b) - influencerPayout(a))
    .map((i) => ({
      id: i.id,
      name: i.name,
      sub: `${i.handle} · ${i.platform}`,
      value: influencerPayout(i),
      display: brl(influencerPayout(i), true),
    }));

  return (
    <Shell title="Rankings" subtitle="Posições consolidadas do mês corrente">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Board title="Lojas mais vendedoras" rows={lojas} />
        <Board title="Produtos campeões" rows={produtos} />
        <Board title="Afiliados por receita" rows={afs} />
        <Board title="Influencers por repasse" rows={infs} />
      </div>
    </Shell>
  );
}
