export type Variant = {
  id: string
  name: string
  swatch: string
}

export const product = {
  name: 'Halo One',
  tagline: 'Adaptive noise-cancelling headphones',
  price: 349,
  rating: 4.9,
  reviews: 2184,
  image: '/images/product.png',
  variants: [
    { id: 'graphite', name: 'Graphite', swatch: '#2a2b30' },
    { id: 'frost', name: 'Frost', swatch: '#d9dbe0' },
    { id: 'volt', name: 'Volt', swatch: '#c6f432' },
  ] satisfies Variant[],
  specs: [
    { label: 'Battery', value: '60 hrs' },
    { label: 'Latency', value: '28 ms' },
    { label: 'Weight', value: '242 g' },
  ],
}

export const SHIPPING = 0
export const TAX_RATE = 0.08

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
