'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, CreditCard, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, product, SHIPPING, TAX_RATE, type Variant } from '@/lib/product'

type Status = 'idle' | 'processing' | 'success'

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
}

const inputClass =
  'h-9 w-full rounded-lg border bg-input/20 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-3 focus-visible:ring-ring/30'

export function CheckoutPanel({
  variant,
  quantity,
  focusKey,
  onBackToStore,
}: {
  variant: Variant
  quantity: number
  focusKey: number
  onBackToStore: () => void
}) {
  const emailRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    if (focusKey > 0) emailRef.current?.focus()
  }, [focusKey])

  const subtotal = product.price * quantity
  const tax = subtotal * TAX_RATE
  const total = subtotal + SHIPPING + tax

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('processing')
    setTimeout(() => {
      setOrderId(`HL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
      setStatus('success')
    }, 1400)
  }

  function handleReset() {
    setCard('')
    setExpiry('')
    setCvc('')
    setStatus('idle')
    onBackToStore()
  }

  if (status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center" role="status">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="size-7 text-primary" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 id="checkout-title" className="text-xl font-semibold tracking-tight">
            Order confirmed
          </h2>
          <p className="text-sm text-muted-foreground">
            {quantity} × {product.name} in {variant.name} is on its way.
          </p>
        </div>
        <p className="rounded-md border bg-secondary/50 px-3 py-1.5 font-mono text-xs">
          Order {orderId} · {formatPrice(total)}
        </p>
        <Button variant="outline" size="lg" onClick={handleReset} className="mt-2 h-10 px-4">
          Back to store
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h2 id="checkout-title" className="text-lg font-semibold tracking-tight">
          Checkout
        </h2>
        <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Lock className="size-3" aria-hidden="true" />
          256-bit TLS
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="card-number" className="text-xs text-muted-foreground">
            Card number
          </label>
          <div className="relative">
            <input
              id="card-number"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              pattern="(\d{4} ){3}\d{4}"
              title="Enter a 16-digit card number"
              placeholder="4242 4242 4242 4242"
              value={card}
              onChange={(e) => setCard(formatCardNumber(e.target.value))}
              className={`${inputClass} pr-9 font-mono`}
            />
            <CreditCard
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="expiry" className="text-xs text-muted-foreground">
              Expiry
            </label>
            <input
              id="expiry"
              name="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
              pattern="(0[1-9]|1[0-2]) / \d{2}"
              title="Use MM / YY"
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className={`${inputClass} font-mono`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cvc" className="text-xs text-muted-foreground">
              CVC
            </label>
            <input
              id="cvc"
              name="cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
              pattern="\d{3,4}"
              title="3 or 4 digits"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className={`${inputClass} font-mono`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="card-name" className="text-xs text-muted-foreground">
            Name on card
          </label>
          <input
            id="card-name"
            name="cardName"
            required
            autoComplete="cc-name"
            placeholder="Ada Lovelace"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 rounded-xl border bg-secondary/40 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full border border-white/10" style={{ backgroundColor: variant.swatch }} />
            {product.name} · {variant.name}
            <span className="font-mono text-xs text-muted-foreground">×{quantity}</span>
          </span>
          <span className="font-mono">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-mono">{SHIPPING === 0 ? 'Free' : formatPrice(SHIPPING)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tax</span>
          <span className="font-mono">{formatPrice(tax)}</span>
        </div>
        <div className="flex items-center justify-between border-t pt-2 font-semibold">
          <span>Total</span>
          <span className="font-mono">{formatPrice(total)}</span>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={status === 'processing'} className="h-11 shrink-0 text-sm font-semibold">
        {status === 'processing' ? (
          <>
            <Loader2 data-icon="inline-start" className="animate-spin" />
            Processing…
          </>
        ) : (
          <>Pay {formatPrice(total)}</>
        )}
      </Button>
      <p className="-mt-2 text-center text-[11px] text-muted-foreground">Demo checkout — no card is charged.</p>
    </form>
  )
}
