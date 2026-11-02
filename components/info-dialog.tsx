'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { product } from '@/lib/product'

export type InfoTopic = 'technology' | 'support'

const technology = [
  { title: 'Adaptive ANC', body: 'Eight mics sample ambient noise 50,000 times per second and cancel it in real time.' },
  { title: 'Spatial audio', body: 'Head-tracked rendering places sound around you with sub-degree precision.' },
  { title: 'Low-latency link', body: 'Custom Bluetooth 5.4 stack delivers 28 ms latency for gaming and video.' },
]

const support = [
  { title: 'Shipping', body: 'Free 2-day shipping on every order. Ships within 24 hours.' },
  { title: 'Returns', body: '30-day no-questions-asked returns with a prepaid label.' },
  { title: 'Warranty', body: '2-year limited warranty covering defects and battery health.' },
]

export function InfoDialog({
  topic,
  onClose,
}: {
  topic: InfoTopic | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (topic && !dialog.open) dialog.showModal()
    if (!topic && dialog.open) dialog.close()
  }, [topic])

  const isTech = topic === 'technology'
  const items = isTech ? technology : support

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="info-dialog-title"
      className="m-auto w-[min(92vw,28rem)] rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-foreground/30 backdrop:backdrop-blur-sm"
    >
      {topic && (
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {isTech ? product.name : 'Help center'}
              </p>
              <h2 id="info-dialog-title" className="text-xl font-semibold tracking-tight">
                {isTech ? 'Technology' : 'Support'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-lg border bg-secondary/50 transition-colors hover:bg-secondary"
            >
              <X className="size-4" />
            </button>
          </div>

          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.title} className="rounded-xl border bg-secondary/40 p-4">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          {!isTech && (
            <p className="text-sm text-muted-foreground">
              {'Still need help? Email '}
              <a href="mailto:support@halo.audio" className="font-medium text-foreground underline underline-offset-4">
                support@halo.audio
              </a>
            </p>
          )}
        </div>
      )}
    </dialog>
  )
}
