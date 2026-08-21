import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import {
  STATUS_LABEL,
  getProduct,
  getSupplier,
  getStore,
  orders,
  products,
} from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/fornecedores/$supplierId")({
  loader: ({ params }) => {
    const supplier = getSupplier(params.supplierId);
    if (!supplier) throw notFound();
    return { supplier };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Fornecedor indisponível — PUB ECOM" },
          { name: "robots", content: "noindex" },
        ],
      };
    const t = `${loaderData.supplier.name} — Fornecedor | PUB ECOM`;
    return {
      meta: [
        { title: t },
        {
          name: "description",
          content: `Catálogo, pedidos, custo, margem, prazo e performance logística do fornecedor ${loaderData.supplier.name}.`,
        },
        { property: "og:title", content: t },
        { property: "og:description", content: "Performance de suprimento na rede PUB ECOM." },
      ],
    };
  },
  component: SupplierDetail,
});

function SupplierDetail() {
  const { supplier } = Route.useLoaderData();
  const catalog = products.filter((p) => p.supplierId === supplier.id);
  const supOrders = orders.filter((o) => o.supplierId === supplier.id);
  const pending = supOrders.filter((o) =>
    ["aguardando_compra", "pago", "novo"].includes(o.status),
  );
  const done = supOrders.filter((o) =>
    ["comprado_fornecedor", "enviado", "em_transito", "entregue"].includes(o.status),
  );
  const margin =
    catalog.reduce((a, p) => a + ((p.price - p.cost) / p.price) * 100, 0) /
    Math.max(1, catalog.length);

  return (
    <Shell
      title={supplier.name}
      subtitle={`${supplier.country} · prazo médio ${supplier.avgLeadTime} dias`}
      actions={
        <Link
          to="/fornecedores"
          className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-card-foreground"
        >
          Voltar
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Produtos" value={supplier.products} />
        <Kpi label="Pedidos" value={num(supplier.orders)} />
        <Kpi label="Custo médio" value={brl(supplier.avgCost)} />
        <Kpi label="Margem média" value={pct(margin, 1)} tone="accent" />
        <Kpi label="Fulfillment" value={pct(supplier.fulfillmentRate, 1)} />
        <Kpi label="Defeitos" value={pct(supplier.defectRate, 1)} tone="negative" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title={`Pedidos pendentes (${pending.length})`}>
          <TableShell>
            <thead>
              <tr className="border-b border-border">
                <Th>Pedido</Th>
                <Th>Loja</Th>
                <Th>Produto</Th>
                <Th>Status</Th>
                <Th right>Custo</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {pending.slice(0, 8).map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <Td>
                    <Link
                      to="/pedidos/$orderId"
                      params={{ orderId: o.id }}
                      className="num text-xs text-accent hover:underline"
                    >
                      {o.number}
                    </Link>
                  </Td>
                  <Td className="text-xs text-muted-foreground">{getStore(o.storeId)?.name}</Td>
                  <Td className="text-xs">{getProduct(o.productId)?.name}</Td>
                  <Td>
                    <Tag tone="warn">{STATUS_LABEL[o.status]}</Tag>
                  </Td>
                  <Td right className="num text-xs">
                    {brl(o.cost)}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>

        <Panel title={`Pedidos realizados (${done.length})`}>
          <TableShell>
            <thead>
              <tr className="border-b border-border">
                <Th>Pedido</Th>
                <Th>Loja</Th>
                <Th>Status</Th>
                <Th right>Custo</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {done.slice(0, 8).map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <Td>
                    <Link
                      to="/pedidos/$orderId"
                      params={{ orderId: o.id }}
                      className="num text-xs text-accent hover:underline"
                    >
                      {o.number}
                    </Link>
                  </Td>
                  <Td className="text-xs text-muted-foreground">{getStore(o.storeId)?.name}</Td>
                  <Td>
                    <Tag tone={o.status === "entregue" ? "accent" : "info"}>
                      {STATUS_LABEL[o.status]}
                    </Tag>
                  </Td>
                  <Td right className="num text-xs">
                    {brl(o.cost)}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      </div>

      <Panel title="Catálogo do fornecedor">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Produto</Th>
              <Th>SKU</Th>
              <Th right>Custo</Th>
              <Th right>Preço</Th>
              <Th right>Margem</Th>
              <Th right>Estoque</Th>
              <Th right>Vendidos</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {catalog.map((p) => (
              <tr key={p.id} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{p.name}</Td>
                <Td className="num text-[11px] text-muted-foreground">{p.sku}</Td>
                <Td right className="num text-xs text-muted-foreground">
                  {brl(p.cost)}
                </Td>
                <Td right className="num text-xs">
                  {brl(p.price)}
                </Td>
                <Td right className="num text-xs text-accent">
                  {pct(((p.price - p.cost) / p.price) * 100, 1)}
                </Td>
                <Td right className="num text-xs">
                  {p.stock}
                </Td>
                <Td right className="num text-xs">
                  {p.sold}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
