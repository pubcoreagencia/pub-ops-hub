import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { adsCampaigns, getStore } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ads")({
  head: () => ({
    meta: [
      { title: "Ads — Meta e Google Ads Consolidados | PUB ECOM" },
      {
        name: "description",
        content:
          "Painel de mídia paga da PUB ECOM: investimento, impressões, cliques, CTR, CPC, CPM, CPA, receita e ROAS por campanha.",
      },
      { property: "og:title", content: "Ads — PUB ECOM" },
      { property: "og:description", content: "Performance consolidada de Meta Ads e Google Ads." },
    ],
  }),
  component: Ads,
});

const FILTERS = ["Todos", "Meta Ads", "Google Ads"];

function Ads() {
  const [platform, setPlatform] = useState("Todos");
  const list =
    platform === "Todos" ? adsCampaigns : adsCampaigns.filter((c) => c.platform === platform);

  const t = list.reduce(
    (a, c) => ({
      spend: a.spend + c.spend,
      impressions: a.impressions + c.impressions,
      clicks: a.clicks + c.clicks,
      conversions: a.conversions + c.conversions,
      revenue: a.revenue + c.revenue,
    }),
    { spend: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0 },
  );

  return (
    <Shell title="Ads" subtitle="Integrações visuais com Meta Ads e Google Ads (dados mockados)">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Investimento" value={brl(t.spend, true)} />
        <Kpi label="Impressões" value={num(t.impressions, true)} />
        <Kpi label="Cliques" value={num(t.clicks, true)} hint={`CTR ${pct((t.clicks / t.impressions) * 100, 2)}`} />
        <Kpi label="CPC médio" value={brl(t.spend / t.clicks)} hint={`CPM ${brl((t.spend / t.impressions) * 1000)}`} />
        <Kpi label="CPA" value={brl(t.spend / t.conversions)} hint={`${num(t.conversions)} conversões`} />
        <Kpi
          label="ROAS"
          value={`${(t.revenue / t.spend).toFixed(2)}x`}
          tone="accent"
          hint={`Receita ${brl(t.revenue, true)}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setPlatform(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs transition-colors",
              platform === f
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-surface text-muted-foreground hover:text-card-foreground",
            )}
          >
            {f}
          </button>
        ))}
        <span className="ml-2 text-[11px] text-muted-foreground">
          Filtros disponíveis: loja · produto · campanha · canal · afiliado · influencer
        </span>
      </div>

      <Panel title="Campanhas">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Campanha</Th>
              <Th>Plataforma</Th>
              <Th>Loja</Th>
              <Th right>Investimento</Th>
              <Th right>Impressões</Th>
              <Th right>Cliques</Th>
              <Th right>CTR</Th>
              <Th right>CPC</Th>
              <Th right>CPM</Th>
              <Th right>Conversões</Th>
              <Th right>CPA</Th>
              <Th right>Receita</Th>
              <Th right>ROAS</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {list.map((c) => (
              <tr key={c.id} className="hover:bg-muted/40">
                <Td className="text-xs text-card-foreground">{c.name}</Td>
                <Td>
                  <Tag tone={c.platform === "Meta Ads" ? "info" : "warn"}>{c.platform}</Tag>
                </Td>
                <Td className="text-xs text-muted-foreground">{getStore(c.storeId)?.name}</Td>
                <Td right className="num text-xs">
                  {brl(c.spend, true)}
                </Td>
                <Td right className="num text-xs">
                  {num(c.impressions, true)}
                </Td>
                <Td right className="num text-xs">
                  {num(c.clicks, true)}
                </Td>
                <Td right className="num text-xs">
                  {pct((c.clicks / c.impressions) * 100, 2)}
                </Td>
                <Td right className="num text-xs">
                  {brl(c.spend / c.clicks)}
                </Td>
                <Td right className="num text-xs">
                  {brl((c.spend / c.impressions) * 1000)}
                </Td>
                <Td right className="num text-xs">
                  {num(c.conversions)}
                </Td>
                <Td right className="num text-xs">
                  {brl(c.spend / c.conversions)}
                </Td>
                <Td right className="num text-xs">
                  {brl(c.revenue, true)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {(c.revenue / c.spend).toFixed(2)}x
                </Td>
                <Td>
                  <Tag tone={c.status === "ativa" ? "accent" : "neutral"}>{c.status}</Tag>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
