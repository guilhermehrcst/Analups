import type { Product } from './types'

/**
 * The melu catalogue — real product photography, placeholder `url`s.
 *
 * `url` points at example.com, meant to be replaced with the real
 * affiliate link before launch — a one-line edit here, no component
 * needs to change.
 */
export const products: Product[] = [
  {
    id: 'creme-corporal-vanilove',
    name: 'Creme Corporal Vanilove',
    brand: 'Melu',
    category: 'melu',
    image: '/images/melu/vanilove.png',
    imagePosition: '50% 50%',
    description:
      'hidrata sem pesar e deixa aquele cheirinho doce e confortável pro dia a dia.',
    url: 'https://example.com/produto/creme-corporal-vanilove',
    accent: 'yellow',
  },
  {
    id: 'sparkle-wave-tuluca',
    name: 'Sparkle Wave',
    brand: 'Tuluca by Melu',
    category: 'melu',
    image: '/images/melu/tuluca.png',
    imagePosition: '50% 40%',
    description:
      'uma linha mais divertida, colorida e com aquele clima criativo que chama atenção na rotina.',
    url: 'https://example.com/produto/sparkle-wave-tuluca',
    cta: 'ver favorito',
    accent: 'pink',
  },
  {
    id: 'pistachill',
    name: 'Pistachill',
    brand: 'Melu',
    category: 'melu',
    image: '/images/melu/pistachill.png',
    imagePosition: '50% 55%',
    description:
      'uma pegada refrescante e diferente, com visual marcante e uma vibe leve e gostosa.',
    url: 'https://example.com/produto/pistachill',
    accent: 'mint',
  },
]

export function productsByCategory(category: Product['category']): Product[] {
  return products.filter((product) => product.category === category)
}
