import { ShoppingBag } from "lucide-react";
import type { InfoTopic } from "@/components/info-dialog";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({
  cartCount,
  onCartClick,
  onProductsClick,
  onInfoClick,
}: {
  cartCount: number;
  onCartClick: () => void;
  onProductsClick: () => void;
  onInfoClick: (topic: InfoTopic) => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-4 lg:px-5">
      <a
        href="/"
        className="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-md bg-primary"
        >
          <span className="size-2.5 rounded-full border-2 border-primary-foreground" />
        </span>
        <span>
          halo<span className="text-muted-foreground">/audio</span>
        </span>
      </a>

      <nav
        aria-label="Primary"
        className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
      >
        <button
          type="button"
          onClick={onProductsClick}
          className="transition-colors hover:text-foreground"
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => onInfoClick("technology")}
          className="transition-colors hover:text-foreground"
        >
          Technology
        </button>
        <button
          type="button"
          onClick={() => onInfoClick("support")}
          className="transition-colors hover:text-foreground"
        >
          Support
        </button>
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={onCartClick}
          className="relative flex size-9 items-center justify-center rounded-lg border bg-secondary/50 transition-colors hover:bg-secondary"
          aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
        >
          <ShoppingBag className="size-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
