import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Panel, Tag } from "@/components/master/ui";
import {
  ORDER_FLOW,
  ORIGIN_LABEL,
  STATUS_LABEL,
  getOrder,
  getProduct,
  getStore,
  getSupplier,
  orderProfit,
  partnerName,
} from "@/lib/mock";
import { brl } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pedidos/$orderId")({
  loader: ({ params }) => {
    const order = getOrder(params.orderId);
    if (!order) throw notFound();
    return { order };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Pedido indisponível — PUB ECOM" }, { name: "robots", content: "noindex" }],
      };
    const t = `Pedido ${loaderData.order.number} — Timeline de Fulfillment | PUB ECOM`;
    return {
      meta: [
        { title: t },
        {
          name: "description",
          content: `Ciclo completo do pedido ${loaderData.order.number}: pagamento, identificação de loja e fornecedor, compra, envio e entrega.`,
        },
        { property: "og:title", content: t },
        { property: "og:description", content: "Timeline operacional do pedido na PUB ECOM." },
      ],
    };
  },
  component: OrderDetail,
});

const TIMELINE = [
  { key: "novo", title: "CLIENTE COMPROU", desc: "Checkout concluído na Store do mentorado" },
  { key: "pago", title: "PAGAMENTO APROVADO", desc: "Gateway confirmou a transação" },
  { key: "aguardando_compra", title: "PUB ECOM IDENTIFICOU A LOJA", desc: "Atribuição da venda ao lojista" },
  { key: "aguardando_compra", title: "PUB ECOM IDENTIFICOU O FORNECEDOR", desc: "Roteamento pelo catálogo mestre" },
  { key: "comprado_fornecedor", title: "COMPRA NO FORNECEDOR", desc: "Central realiza a compra" },
  { key: "enviado", title: "FORNECEDOR ENVIOU", desc: "Objeto postado para o endereço do cliente" },
  { key: "entregue", title: "CLIENTE RECEBEU", desc: "Ciclo operacional concluído" },
] as const;

function OrderDetail() {
  const { order } = Route.useLoaderData();
  const product = getProduct(order.productId);
  const store = getStore(order.storeId);
  const supplier = getSupplier(order.supplierId);
  const stageIndex = ORDER_FLOW.indexOf(order.status);

  const rows: [string, string][] = [
    ["Cliente", order.customer],
    ["E-mail", order.customerEmail],
    ["Endereço de entrega", order.city],
    ["Loja responsável", store?.name ?? "—"],
    ["Mentor", store?.mentor ?? "—"],
    ["Produto", `${product?.name} × ${order.qty}`],
    ["SKU", product?.sku ?? "—"],
    ["Fornecedor", supplier?.name ?? "—"],
    ["Prazo médio do fornecedor", `${supplier?.avgLeadTime} dias`],
    ["Origem", ORIGIN_LABEL[order.origin]],
    ["Afiliado / Influencer", partnerName(order)],
  ];

  const finance: [string, string][] = [
    ["Valor do pedido", brl(order.value)],
    ["Descontos", `- ${brl(order.discount)}`],
    ["Custo do produto", `- ${brl(order.cost)}`],
    ["Frete", `- ${brl(order.shipping)}`],
    ["Taxas de pagamento", `- ${brl(order.fees)}`],
  ];

  return (
    <Shell
      title={`Pedido ${order.number}`}
      subtitle={`${store?.name} · ${STATUS_LABEL[order.status]}`}
      showPeriods={false}
      actions={
        <Link
          to="/pedidos"
          className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-card-foreground"
        >
          Voltar aos pedidos
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Timeline do pedido" className="xl:col-span-2" bodyClassName="p-6">
          <ol className="relative space-y-6 border-l border-border pl-6">
            {TIMELINE.map((step, i) => {
              const done = ORDER_FLOW.indexOf(step.key as never) <= stageIndex;
              const current = i > 0 && ORDER_FLOW.indexOf(step.key as never) === stageIndex;
              return (
                <li key={i} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[31px] top-1 grid size-3.5 place-items-center rounded-full border",
                      done
                        ? "border-accent bg-accent"
                        : "border-border-strong bg-surface",
                      current && "ring-4 ring-accent/20",
                    )}
                  />
                  <div
                    className={cn(
                      "text-xs font-semibold tracking-wide",
                      done ? "text-card-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{step.desc}</div>
                </li>
              );
            })}
          </ol>
          {(order.status === "cancelado" || order.status === "reembolsado") && (
            <div className="mt-6 rounded-lg border border-negative/25 bg-negative/10 px-4 py-3 text-xs text-negative">
              Pedido {STATUS_LABEL[order.status].toLowerCase()} — ciclo interrompido pela central.
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Resultado financeiro" bodyClassName="p-5">
            <div className="space-y-2.5">
              {finance.map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="num text-card-foreground">{v}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
                <span className="text-card-foreground">Lucro líquido</span>
                <span className="num font-medium text-accent">{brl(orderProfit(order))}</span>
              </div>
            </div>
          </Panel>

          <Panel title="Status atual" bodyClassName="p-5">
            <Tag tone="accent">{STATUS_LABEL[order.status]}</Tag>
            <p className="mt-3 text-xs text-muted-foreground">
              A PUB ECOM opera este pedido de ponta a ponta: identifica loja e fornecedor, realiza a
              compra e acompanha o envio até o endereço do cliente.
            </p>
          </Panel>
        </div>
      </div>

      <Panel title="Dados do pedido" bodyClassName="grid grid-cols-1 gap-x-8 gap-y-3 p-5 md:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-border/50 pb-2 text-xs">
            <span className="text-muted-foreground">{k}</span>
            <span className="text-right text-card-foreground">{v}</span>
          </div>
        ))}
      </Panel>

      <Panel title="Atribuição (UTM)" bodyClassName="grid grid-cols-2 gap-4 p-5 md:grid-cols-5">
        {Object.entries(order.utm).map(([k, v]) => (
          <div key={k}>
            <div className="label-xs">utm_{k}</div>
            <div className="num mt-1 truncate text-xs text-card-foreground">{v}</div>
          </div>
        ))}
      </Panel>
    </Shell>
  );
}
