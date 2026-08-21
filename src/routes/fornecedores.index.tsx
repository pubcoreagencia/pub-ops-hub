import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th, Bar } from "@/components/master/ui";
import { suppliers } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/fornecedores/")({
  head: () => ({
    meta: [
      { title: "Painel de Fornecedores | PUB ECOM" },
      {
        name: "description",
        content:
          "Fornecedores da PUB ECOM: produtos, pedidos, custo médio, prazo médio, status e performance logística.",
      },
      { property: "og:title", content: "Fornecedores — PUB ECOM" },
      { property: "og:description", content: "Base de suprimento da operação central." },
    ],
  }),
  component: Fornecedores,
});

const tone = (s: string) => (s === "ativo" ? "accent" : s === "auditoria" ? "warn" : "danger");

function Fornecedores() {
  return (
    <Shell title="Fornecedores" subtitle="A central compra no fornecedor após cada venda aprovada">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Fornecedores" value={suppliers.length} />
        <Kpi label="Ativos" value={suppliers.filter((s) => s.status === "ativo").length} />
        <Kpi
          label="Prazo médio da rede"
          value={`${(suppliers.reduce((a, s) => a + s.avgLeadTime, 0) / suppliers.length).toFixed(1)} dias`}
        />
        <Kpi
          label="Fulfillment médio"
          value={pct(
            suppliers.reduce((a, s) => a + s.fulfillmentRate, 0) / suppliers.length,
            1,
          )}
          tone="accent"
        />
      </div>

      <Panel title="Base de fornecedores">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Fornecedor</Th>
              <Th>Origem</Th>
              <Th right>Produtos</Th>
              <Th right>Pedidos</Th>
              <Th right>Custo médio</Th>
              <Th right>Prazo médio</Th>
              <Th>Status</Th>
              <Th>Performance</Th>
              <Th right />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {suppliers.map((s) => (
              <tr key={s.id} className="group transition-colors hover:bg-muted/40">
                <Td>
                  <Link
                    to="/fornecedores/$supplierId"
                    params={{ supplierId: s.id }}
                    className="font-medium text-card-foreground group-hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </Td>
                <Td className="text-xs text-muted-foreground">{s.country}</Td>
                <Td right className="num text-xs">
                  {s.products}
                </Td>
                <Td right className="num text-xs">
                  {num(s.orders)}
                </Td>
                <Td right className="num text-xs">
                  {brl(s.avgCost)}
                </Td>
                <Td right className="num text-xs">
                  {s.avgLeadTime} dias
                </Td>
                <Td>
                  <Tag tone={tone(s.status)}>{s.status}</Tag>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="w-24">
                      <Bar value={s.performance} tone={s.performance > 85 ? "accent" : "muted"} />
                    </div>
                    <span className="num text-[11px] text-muted-foreground">{s.performance}</span>
                  </div>
                </Td>
                <Td right>
                  <Link
                    to="/fornecedores/$supplierId"
                    params={{ supplierId: s.id }}
                    className="text-xs text-accent hover:underline"
                  >
                    Abrir
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
