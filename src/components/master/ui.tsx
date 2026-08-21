import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
  live,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  live?: boolean;
}) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <h3 className="flex items-center gap-2 text-sm font-medium text-card-foreground">
            {title}
            {live && <span className="size-1.5 animate-pulse rounded-full bg-accent" />}
          </h3>
          {action}
        </header>
      )}
      <div className={cn(bodyClassName)}>{children}</div>
    </section>
  );
}

export function Kpi({
  label,
  value,
  hint,
  tone = "default",
  live,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "positive" | "negative" | "accent";
  live?: boolean;
}) {
  return (
    <div className="panel p-4">
      <div className="label-xs flex items-center gap-1.5">
        {label}
        {live && <span className="size-1.5 animate-pulse rounded-full bg-accent" />}
      </div>
      <div
        className={cn(
          "num mt-1.5 text-2xl",
          tone === "accent" ? "text-accent" : "text-card-foreground",
        )}
      >
        {value}
      </div>
      {hint && (
        <div
          className={cn(
            "num mt-2 text-[10px]",
            tone === "positive" && "text-positive",
            tone === "negative" && "text-negative",
            (tone === "default" || tone === "accent") && "text-muted-foreground",
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

const TONE: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/25",
  warn: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-negative/10 text-negative border-negative/25",
  info: "bg-info/10 text-info border-info/25",
};

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONE | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
        TONE[tone] ?? TONE.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      className={cn(
        "label-xs px-5 py-3 font-semibold whitespace-nowrap",
        right ? "text-right" : "text-left",
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  right,
  className,
}: {
  children: ReactNode;
  right?: boolean;
  className?: string;
}) {
  return (
    <td className={cn("px-5 py-3.5 text-sm", right && "text-right", className)}>{children}</td>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-thin overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export function Bar({ value, tone = "accent" }: { value: number; tone?: "accent" | "muted" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", tone === "accent" ? "bg-accent" : "bg-border-strong")}
        style={{ width: `${Math.min(100, Math.max(1.5, value))}%` }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="px-5 py-8 text-center text-sm text-muted-foreground">{children}</p>;
}
