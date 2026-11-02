'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { HeroPanel } from '@/components/hero-panel'
import { ProductPanel } from '@/components/product-panel'
import { CheckoutPanel } from '@/components/checkout-panel'
import { StepNav, type Step } from '@/components/step-nav'
import { product } from '@/lib/product'
import { cn } from '@/lib/utils'

export function Storefront() {
  const [step, setStep] = useState<Step>('discover')
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)
  const [checkoutFocusKey, setCheckoutFocusKey] = useState(0)

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  function handleBuyNow() {
    setStep('checkout')
    setCheckoutFocusKey((key) => key + 1)
  }

  const panelClass = (id: Step) =>
    cn(
      'min-h-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors duration-300',
      step === id ? 'flex lg:border-primary/40' : 'hidden lg:flex',
    )

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader cartCount={step === 'checkout' ? quantity : 0} onCartClick={handleBuyNow} />

      <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3 pb-3 lg:grid-cols-[1.05fr_1fr_1fr]">
        <section aria-labelledby="hero-title" className={panelClass('discover')}>
          <HeroPanel onShop={() => setStep('product')} />
        </section>

        <section aria-labelledby="product-title" className={panelClass('product')}>
          <ProductPanel
            variant={variant}
            onVariantChange={setVariantId}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onBuyNow={handleBuyNow}
          />
        </section>

        <section aria-labelledby="checkout-title" className={panelClass('checkout')}>
          <CheckoutPanel
            variant={variant}
            quantity={quantity}
            focusKey={checkoutFocusKey}
            onBackToStore={() => {
              setQuantity(1)
              setStep('discover')
            }}
          />
        </section>
      </main>

      <StepNav step={step} onStepChange={setStep} />
    </div>
  )
}
