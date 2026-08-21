import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/master/Shell";
import { Kpi, Panel, TableShell, Tag, Td, Th, Bar } from "@/components/master/ui";
import { getSupplier, inventory } from "@/lib/mock";
import { brl, num } from "@/lib/format";

export const Route = createFileRoute("/estoque")({
  head: () => ({
    meta: [
      { title: "Estoque Central e Cobertura | PUB ECOM" },
      {
        name: "description",
        content:
          "Estoque central da PUB ECOM: disponível, reservado, cobertura em dias e valor imobilizado por SKU.",
      },
      { property: "og:title", content: "Estoque Central — PUB ECOM" },
      { property: "og:description", content: "Disponibilidade e cobertura de todo o catálogo." },
    ],
  }),
  component: Estoque,
});

function Estoque() {
  const value = inventory.reduce((a, p) => a + p.stock * p.cost, 0);
  const reserved = inventory.reduce((a, p) => a + p.reserved, 0);
  const critical = inventory.filter((p) => p.available < 120);

  return (
    <Shell title="Estoque" subtitle="Posição central de estoque que abastece todas as lojas">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Unidades em estoque" value={num(inventory.reduce((a, p) => a + p.stock, 0))} />
        <Kpi label="Reservado" value={num(reserved)} />
        <Kpi label="SKUs críticos" value={critical.length} tone="negative" hint="cobertura baixa" />
        <Kpi label="Valor imobilizado" value={brl(value, true)} tone="accent" />
      </div>

      <Panel title="Posição por SKU">
        <TableShell>
          <thead>
            <tr className="border-b border-border">
              <Th>Produto</Th>
              <Th>SKU</Th>
              <Th>Fornecedor</Th>
              <Th right>Estoque</Th>
              <Th right>Reservado</Th>
              <Th right>Disponível</Th>
              <Th right>Cobertura</Th>
              <Th>Nível</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {inventory.map((p) => (
              <tr key={p.id} className="hover:bg-muted/40">
                <Td className="text-sm text-card-foreground">{p.name}</Td>
                <Td className="num text-[11px] text-muted-foreground">{p.sku}</Td>
                <Td className="text-xs text-muted-foreground">{getSupplier(p.supplierId)?.name}</Td>
                <Td right className="num text-xs">
                  {p.stock}
                </Td>
                <Td right className="num text-xs text-muted-foreground">
                  {p.reserved}
                </Td>
                <Td right className="num text-xs">
                  {p.available}
                </Td>
                <Td right className="num text-xs">
                  {p.coverageDays} dias
                </Td>
                <Td>
                  {p.stock === 0 ? (
                    <Tag tone="danger">esgotado</Tag>
                  ) : (
                    <div className="w-28">
                      <Bar
                        value={Math.min(100, (p.available / 800) * 100)}
                        tone={p.available < 120 ? "muted" : "accent"}
                      />
                    </div>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
