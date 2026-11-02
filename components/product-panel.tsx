import Image from 'next/image'
import { Minus, Plus, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, product, type Variant } from '@/lib/product'
import { cn } from '@/lib/utils'

const MAX_QUANTITY = 5

export function ProductPanel({
  variant,
  onVariantChange,
  quantity,
  onQuantityChange,
  onBuyNow,
}: {
  variant: Variant
  onVariantChange: (id: string) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
  onBuyNow: () => void
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative min-h-0 flex-1 bg-[#16171b]">
        <Image
          src={product.image}
          alt={`${product.name} headphones in ${variant.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-contain p-4"
        />
        <span className="absolute top-4 left-4 rounded-md bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
          SKU HL-01-{variant.id.slice(0, 3).toUpperCase()}
        </span>
      </div>

      <div className="flex shrink-0 flex-col gap-4 border-t p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 id="product-title" className="text-xl font-semibold tracking-tight">
              {product.name}
            </h2>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
              <span className="text-foreground">{product.rating}</span>
              <span>({product.reviews.toLocaleString('en-US')} reviews)</span>
            </p>
          </div>
          <p className="font-mono text-xl font-semibold">{formatPrice(product.price)}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-xs text-muted-foreground">
              Finish: <span className="text-foreground">{variant.name}</span>
            </legend>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <label
                  key={v.id}
                  className={cn(
                    'relative flex size-8 cursor-pointer items-center justify-center rounded-full border transition-all has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                    v.id === variant.id ? 'border-primary' : 'hover:border-muted-foreground',
                  )}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={v.id === variant.id}
                    onChange={() => onVariantChange(v.id)}
                    className="sr-only"
                  />
                  <span className="size-6 rounded-full border border-foreground/15" style={{ backgroundColor: v.swatch }} />
                  <span className="sr-only">{v.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <span id="qty-label" className="text-xs text-muted-foreground">
              Quantity
            </span>
            <div role="group" aria-labelledby="qty-label" className="flex h-8 items-center rounded-lg border">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <Minus className="size-3.5" />
              </button>
              <output aria-live="polite" className="w-6 text-center font-mono text-sm">
                {quantity}
              </output>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= MAX_QUANTITY}
                onClick={() => onQuantityChange(Math.min(MAX_QUANTITY, quantity + 1))}
                className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-3 divide-x rounded-lg border bg-secondary/40">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-0.5 px-3 py-2">
              <dt className="text-[11px] text-muted-foreground">{spec.label}</dt>
              <dd className="font-mono text-sm">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <Button size="lg" onClick={onBuyNow} className="h-11 text-sm font-semibold">
          <Zap data-icon="inline-start" />
          Buy Now · {formatPrice(product.price * quantity)}
        </Button>
      </div>
    </div>
  )
}
