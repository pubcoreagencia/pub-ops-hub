import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import {
  ORIGIN_LABEL,
  ORDER_FLOW,
  STATUS_LABEL,
  getProduct,
  getStore,
  getSupplier,
  orderProfit,
  orders,
  partnerName,
  type OrderStatus,
} from "@/lib/mock";
import { brl, num } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pedidos/")({
  head: () => ({
    meta: [
      { title: "Central de Pedidos e Fulfillment | PUB ECOM" },
      {
        name: "description",
        content:
          "Todos os pedidos da rede: cliente, loja, produto, fornecedor, valor, custo, lucro, origem e status do fulfillment.",
      },
      { property: "og:title", content: "Central de Pedidos — PUB ECOM" },
      {
        property: "og:description",
        content: "Ciclo completo do pedido, da compra do cliente à entrega pelo fornecedor.",
      },
    ],
  }),
  component: Pedidos,
});

const ALL: (OrderStatus | "todos")[] = [
  "todos",
  ...ORDER_FLOW,
  "cancelado",
  "reembolsado",
];

const tone = (s: OrderStatus) =>
  s === "entregue"
    ? "accent"
    : s === "cancelado" || s === "reembolsado"
      ? "danger"
      : s === "pagamento_pendente" || s === "novo"
        ? "warn"
        : "info";

function Pedidos() {
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");
  const list = filter === "todos" ? orders : orders.filter((o) => o.status === filter);

  const gross = orders.reduce((a, o) => a + o.value, 0);
  const profit = orders.reduce((a, o) => a + orderProfit(o), 0);

  return (
    <Shell title="Pedidos" subtitle="Fulfillment centralizado: PUB ECOM compra no fornecedor e acompanha a entrega">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Pedidos" value={num(orders.length)} />
        <Kpi
          label="Aguardando compra"
          value={orders.filter((o) => o.status === "aguardando_compra").length}
          tone="negative"
          hint="ação da central"
        />
        <Kpi label="Em trânsito" value={orders.filter((o) => o.status === "em_transito").length} />
        <Kpi label="Volume bruto" value={brl(gross, true)} />
        <Kpi label="Lucro do ciclo" value={brl(profit, true)} tone="accent" />
      </div>

      <div className="scroll-thin flex gap-1.5 overflow-x-auto pb-1">
        {ALL.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 rounded-lg border px-3 py-1.5 text-xs transition-colors",
              filter === s
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-surface text-muted-foreground hover:text-card-foreground",
            )}
          >
            {s === "todos" ? "Todos" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <Panel title={`${list.length} pedidos`}>
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Número</Th>
              <Th>Cliente</Th>
              <Th>Loja</Th>
              <Th>Produto</Th>
              <Th>Fornecedor</Th>
              <Th>Origem</Th>
              <Th>Parceiro</Th>
              <Th right>Valor</Th>
              <Th right>Custo</Th>
              <Th right>Lucro</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {list.map((o) => (
              <tr key={o.id} className="group transition-colors hover:bg-muted/40">
                <Td>
                  <Link
                    to="/pedidos/$orderId"
                    params={{ orderId: o.id }}
                    className="num text-xs text-accent hover:underline"
                  >
                    {o.number}
                  </Link>
                </Td>
                <Td className="text-xs text-card-foreground">{o.customer}</Td>
                <Td className="text-xs">
                  <Link
                    to="/lojas/$storeId"
                    params={{ storeId: o.storeId }}
                    className="text-muted-foreground hover:text-accent"
                  >
                    {getStore(o.storeId)?.name}
                  </Link>
                </Td>
                <Td className="text-xs text-muted-foreground">{getProduct(o.productId)?.name}</Td>
                <Td className="text-xs text-muted-foreground">
                  {getSupplier(o.supplierId)?.name}
                </Td>
                <Td className="text-xs text-muted-foreground">{ORIGIN_LABEL[o.origin]}</Td>
                <Td className="num text-[11px] text-muted-foreground">{partnerName(o)}</Td>
                <Td right className="num text-xs">
                  {brl(o.value)}
                </Td>
                <Td right className="num text-xs text-muted-foreground">
                  {brl(o.cost)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {brl(orderProfit(o))}
                </Td>
                <Td>
                  <Tag tone={tone(o.status)}>{STATUS_LABEL[o.status]}</Tag>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
