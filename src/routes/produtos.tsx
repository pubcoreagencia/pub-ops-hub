import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th } from "@/components/master/ui";
import { getStore, getSupplier, products } from "@/lib/mock";
import { brl, num, pct } from "@/lib/format";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Catálogo Mestre de Produtos | PUB ECOM" },
      {
        name: "description",
        content:
          "Catálogo mestre da PUB ECOM: SKU, categoria, fornecedor, custo, preço, margem, estoque, SEO e lojas que vendem cada produto.",
      },
      { property: "og:title", content: "Catálogo Mestre — PUB ECOM" },
      { property: "og:description", content: "Produtos, custos, margens e distribuição por loja." },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const [selected, setSelected] = useState<string | null>(null);
  const product = products.find((p) => p.id === selected);

  return (
    <Shell title="Catálogo Mestre" subtitle="Fonte única de verdade de produtos para toda a rede">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="SKUs no catálogo" value={products.length} />
        <Kpi label="Ativos" value={products.filter((p) => p.status === "ativo").length} />
        <Kpi label="Esgotados" value={products.filter((p) => p.status === "esgotado").length} tone="negative" />
        <Kpi
          label="Margem média"
          value={pct(
            products.reduce((a, p) => a + ((p.price - p.cost) / p.price) * 100, 0) / products.length,
            1,
          )}
          tone="accent"
        />
        <Kpi label="Unidades vendidas" value={num(products.reduce((a, p) => a + p.sold, 0))} />
      </div>

      <Panel title="Produtos">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Produto</Th>
              <Th>SKU</Th>
              <Th>Categoria</Th>
              <Th>Fornecedor</Th>
              <Th right>Custo</Th>
              <Th right>Preço</Th>
              <Th right>Margem</Th>
              <Th right>Estoque</Th>
              <Th>SEO</Th>
              <Th>Status</Th>
              <Th right />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{p.name}</Td>
                <Td className="num text-[11px] text-muted-foreground">{p.sku}</Td>
                <Td className="text-xs text-muted-foreground">{p.category}</Td>
                <Td className="text-xs text-muted-foreground">{getSupplier(p.supplierId)?.name}</Td>
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
                <Td>
                  <Tag
                    tone={
                      p.seo.indexation === "indexado"
                        ? "accent"
                        : p.seo.indexation === "erro"
                          ? "danger"
                          : "warn"
                    }
                  >
                    {p.seo.indexation}
                  </Tag>
                </Td>
                <Td>
                  <Tag tone={p.status === "ativo" ? "info" : "neutral"}>{p.status}</Tag>
                </Td>
                <Td right>
                  <button
                    onClick={() => setSelected(p.id)}
                    className="text-xs text-accent hover:underline"
                  >
                    Detalhes
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>

      {product && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-background/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="scroll-thin h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-card-foreground">{product.name}</h2>
                <p className="num text-xs text-muted-foreground">{product.sku}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-muted-foreground hover:text-card-foreground"
              >
                Fechar
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="label-xs">Custo</div>
                <div className="num mt-1 text-base">{brl(product.cost)}</div>
              </div>
              <div>
                <div className="label-xs">Preço</div>
                <div className="num mt-1 text-base">{brl(product.price)}</div>
              </div>
              <div>
                <div className="label-xs">Estoque central</div>
                <div className="num mt-1 text-base">{product.stock}</div>
              </div>
              <div>
                <div className="label-xs">Reservado</div>
                <div className="num mt-1 text-base">{product.reserved}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="label-xs mb-2">Lojas vendendo este produto</div>
              <div className="flex flex-wrap gap-2">
                {product.storeIds.map((id) => (
                  <Link
                    key={id}
                    to="/lojas/$storeId"
                    params={{ storeId: id }}
                    className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground hover:text-accent"
                  >
                    {getStore(id)?.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="label-xs">SEO</div>
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <div className="text-xs text-card-foreground">{product.seo.title}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {product.seo.description}
                </div>
                <div className="num mt-2 text-[10px] text-accent">/{product.seo.slug}</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.seo.keywords.map((k) => (
                  <Tag key={k}>{k}</Tag>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <div className="label-xs">Cliques</div>
                  <div className="num text-sm">{num(product.seo.clicks)}</div>
                </div>
                <div>
                  <div className="label-xs">Impressões</div>
                  <div className="num text-sm">{num(product.seo.impressions)}</div>
                </div>
                <div>
                  <div className="label-xs">Vendas org.</div>
                  <div className="num text-sm text-accent">{product.seo.organicSales}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
