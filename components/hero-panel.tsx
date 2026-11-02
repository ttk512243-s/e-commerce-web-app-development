import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '-45dB', label: 'Adaptive ANC' },
  { value: '60h', label: 'Battery life' },
  { value: '4.9', label: 'Avg. rating' },
]

export function HeroPanel({ onShop }: { onShop: () => void }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          <Sparkles className="size-3 text-primary" />
          New drop · Spring 2026
        </span>
        <h1 id="hero-title" className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance xl:text-5xl">
          Welcome to <span className="text-primary">My Store</span>
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground xl:text-base">
          Halo One blends studio-grade drivers with on-device AI that tunes noise cancelling to your
          surroundings — 200 times a second.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onShop} className="h-10 px-4">
            Shop Halo One
            <ArrowRight data-icon="inline-end" />
          </Button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            In stock · Ships in 24h · Free returns
          </p>
        </div>
      </div>

      <dl className="relative grid grid-cols-3 gap-3 border-t pt-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="font-mono text-xl font-semibold tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
