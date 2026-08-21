import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { NAV } from "./nav";
import { liveMetrics } from "@/lib/mock";
import { num } from "@/lib/format";
import { cn } from "@/lib/utils";

const PERIODS = ["Hoje", "7 dias", "30 dias", "Mês atual", "Mês anterior", "Personalizado"];

function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="border-b border-border p-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md bg-accent">
            <span className="size-3.5 border-2 border-accent-foreground" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-card-foreground">
            PUB ECOM
            <span className="num ml-1.5 align-top text-[9px] text-muted-foreground">MASTER</span>
          </span>
        </Link>
      </div>

      <nav className="scroll-thin flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV.map((group, gi) => (
          <div key={gi}>
            {group.label && <div className="label-xs px-3 pt-4 pb-2">{group.label}</div>}
            {group.items.map((item) => {
              const active =
                item.to === "/" ? path === "/" : path === item.to || path.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent font-medium text-accent"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-card-foreground",
                  )}
                >
                  {item.to === "/" && (
                    <span className="size-4 shrink-0 rounded-sm bg-accent/20" />
                  )}
                  <span className="truncate">{item.label}</span>
                  {item.live && (
                    <span className="ml-auto size-1.5 animate-pulse rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-border p-4">
        <span className="grid size-8 place-items-center rounded-full bg-muted text-[10px] font-semibold text-card-foreground">
          OP
        </span>
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-card-foreground">Central PUB ECOM</div>
          <div className="num truncate text-[10px] text-muted-foreground">operador · master</div>
        </div>
      </div>
    </aside>
  );
}

export function Shell({
  title,
  subtitle,
  actions,
  showPeriods = true,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showPeriods?: boolean;
  children: ReactNode;
}) {
  const [period, setPeriod] = useState("Hoje");
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <h1 className="text-base font-medium text-card-foreground">{title}</h1>
              {subtitle && (
                <p className="text-[11px] text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {showPeriods && (
              <>
                <span className="hidden h-4 w-px bg-border md:block" />
                <div className="hidden items-center gap-1 rounded-lg border border-border bg-surface-2 p-1 md:flex">
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                        period === p
                          ? "bg-muted text-card-foreground"
                          : "text-muted-foreground hover:text-card-foreground",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
              <span className="size-2 animate-pulse rounded-full bg-accent" />
              <span className="num text-xs text-muted-foreground">
                {num(liveMetrics.visitors)} ONLINE
              </span>
            </div>
            {actions ?? (
              <button className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground ring-accent/20 transition-all hover:ring-4">
                Exportar Relatório
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 space-y-6 p-6">{children}</div>
      </main>
    </div>
  );
}
