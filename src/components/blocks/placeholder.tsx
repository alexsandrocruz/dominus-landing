import { Badge } from "@/components/ui/badge";

type PlaceholderBlockProps = {
  blockId: string;
  label: string;
  heightClass?: string;
};

/**
 * Visual placeholder for landing blocks. Real copy/visuals land in SAP-164.
 *
 * Why: SAP-166 is scaffolding only — copy/design decisions are deliberately
 * deferred so design and content can iterate in their own ticket without
 * churning a bunch of nearly-final markup.
 */
export function PlaceholderBlock({
  blockId,
  label,
  heightClass = "min-h-64",
}: PlaceholderBlockProps) {
  return (
    <section
      id={blockId}
      data-block={blockId}
      className={`mx-auto flex w-full max-w-6xl flex-col items-start gap-3 rounded-md border border-dashed border-zinc-300 px-6 py-10 dark:border-zinc-700 ${heightClass}`}
    >
      <Badge variant="outline" className="font-mono text-xs">
        block: {blockId}
      </Badge>
      <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
        {label}
      </h2>
      <p className="text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conteúdo real é
        implementado em SAP-164.
      </p>
    </section>
  );
}
