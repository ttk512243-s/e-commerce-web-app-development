import { cn } from '@/lib/utils'

export type Step = 'discover' | 'product' | 'checkout'

const steps: { id: Step; label: string }[] = [
  { id: 'discover', label: 'Discover' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

export function StepNav({
  step,
  onStepChange,
}: {
  step: Step
  onStepChange: (step: Step) => void
}) {
  return (
    <nav aria-label="Store sections" className="border-t px-3 py-2 lg:hidden">
      <ol className="grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
        {steps.map((s, index) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onStepChange(s.id)}
              aria-current={step === s.id ? 'step' : undefined}
              className={cn(
                'flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-colors',
                step === s.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className="font-mono opacity-70">{`0${index + 1}`}</span>
              {s.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
