import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Bar, Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { AUDIENCE_WINDOWS, audiences } from "@/lib/mock";
import { num } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audiencias")({
  head: () => ({
    meta: [
      { title: "Audience Engine L1–L4 | PUB ECOM" },
      {
        name: "description",
        content:
          "Públicos automáticos por evento e janela (1 a 365 dias): Page View, Add To Cart, Payment Info e Purchase com regras de exclusão.",
      },
      { property: "og:title", content: "Audience Engine — PUB ECOM" },
      { property: "og:description", content: "Públicos prontos para exportação a Meta e Google." },
    ],
  }),
  component: Audiencias,
});

const TONE = { L1: "neutral", L2: "info", L3: "warn", L4: "accent" } as const;

function Audiencias() {
  const [win, setWin] = useState<(typeof AUDIENCE_WINDOWS)[number]>(7);
  const max = Math.max(...audiences.map((a) => a.windows[win]));

  return (
    <Shell title="Audience Engine" subtitle="Segmentação automática por evento e janela temporal">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {audiences.map((a) => (
          <Kpi
            key={a.level}
            label={`${a.level} · ${a.event}`}
            value={num(a.windows[win], true)}
            tone={a.level === "L4" ? "accent" : "default"}
            hint={`janela de ${win} dias`}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="label-xs mr-1">Janela</span>
        {AUDIENCE_WINDOWS.map((w) => (
          <button
            key={w}
            onClick={() => setWin(w)}
            className={cn(
              "num rounded-lg border px-3 py-1.5 text-xs transition-colors",
              win === w
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-surface text-muted-foreground hover:text-card-foreground",
            )}
          >
            {w}D
          </button>
        ))}
      </div>

      <Panel title="Níveis de público">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Nível</Th>
              <Th>Evento</Th>
              <Th>Regra de construção</Th>
              <Th right>Tamanho ({win}D)</Th>
              <Th>Volume relativo</Th>
              <Th right>Exportar</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {audiences.map((a) => (
              <tr key={a.level} className="hover:bg-muted/40">
                <Td>
                  <Tag tone={TONE[a.level as keyof typeof TONE]}>{a.level}</Tag>
                </Td>
                <Td className="num text-xs text-card-foreground">{a.event}</Td>
                <Td className="text-xs text-muted-foreground">{a.rule}</Td>
                <Td right className="num text-xs">
                  {num(a.windows[win])}
                </Td>
                <Td>
                  <div className="w-40">
                    <Bar
                      value={(a.windows[win] / max) * 100}
                      tone={a.level === "L4" ? "accent" : "muted"}
                    />
                  </div>
                </Td>
                <Td right>
                  <div className="flex justify-end gap-1.5">
                    <span className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
                      Meta
                    </span>
                    <span className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
                      Google
                    </span>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>

      <Panel title="Matriz completa de janelas">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Nível</Th>
              {AUDIENCE_WINDOWS.map((w) => (
                <Th key={w} right>{`${w}D`}</Th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {audiences.map((a) => (
              <tr key={a.level} className="hover:bg-muted/40">
                <Td className="num text-xs text-card-foreground">
                  {a.level} · {a.event}
                </Td>
                {AUDIENCE_WINDOWS.map((w) => (
                  <Td key={w} right className="num text-xs text-muted-foreground">
                    {num(a.windows[w], true)}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
