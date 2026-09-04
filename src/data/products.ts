import type { Product } from './types'

/**
 * Placeholder catalogue for the layout and editorial voice.
 *
 * `image` points at generated placeholder art (see /public/images/placeholders)
 * and `url` points at example.com — both are meant to be replaced with real
 * product photography and real affiliate links before launch. Swapping either
 * is a one-line edit here; no component needs to change.
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
  {
    id: 'oleo-nutritivo',
    name: 'Óleo Nutritivo Diário',
    brand: 'Raiz',
    category: 'cabelo',
    image: '/images/placeholders/cabelo-1.svg',
    description:
      'uso pra manter o cronograma capilar em dia sem precisar caçar produto separado.',
    url: 'https://example.com/produto/oleo-nutritivo',
  },
  {
    id: 'mascara-reconstrutora',
    name: 'Máscara Reconstrutora Intensiva',
    brand: 'Raiz',
    category: 'cabelo',
    image: '/images/placeholders/cabelo-2.svg',
    description:
      'desde que entrou na rotina o cabelo tá visivelmente mais forte e com mais brilho.',
    url: 'https://example.com/produto/mascara-reconstrutora',
    featured: true,
    cta: 'ver meu favorito',
  },
  {
    id: 'serum-vitamina-c',
    name: 'Sérum Vitamina C',
    brand: 'Alva',
    category: 'skincare',
    image: '/images/placeholders/skincare-1.svg',
    description: 'uniformiza o tom e dá aquele viço sem ressecar — uso todo dia.',
    url: 'https://example.com/produto/serum-vitamina-c',
    featured: true,
    cta: 'ver meu favorito',
  },
  {
    id: 'hidratante-barreira',
    name: 'Hidratante Barreira',
    brand: 'Alva',
    category: 'skincare',
    image: '/images/placeholders/skincare-2.svg',
    description: 'rotina enxuta: limpa, esse e protetor solar. só isso já muda tudo.',
    url: 'https://example.com/produto/hidratante-barreira',
  },
  {
    id: 'colar-signo',
    name: 'Colar Signo',
    brand: 'Orla',
    category: 'acessorios',
    image: '/images/placeholders/acessorios-1.svg',
    description:
      'meu conjunto de prata com o meu signo — uso praticamente todo dia, combina com tudo.',
    url: 'https://example.com/produto/colar-signo',
    featured: true,
    cta: 'conhecer',
  },
  {
    id: 'colar-solar',
    name: 'Colar Solar Minimal',
    brand: 'Orla',
    category: 'acessorios',
    image: '/images/placeholders/acessorios-2.svg',
    description:
      'peça que vira o centro do look sozinha — uso solo ou empilhado, sempre chama atenção sem exagerar.',
    url: 'https://example.com/produto/colar-solar',
  },
  {
    id: 'legging-second-skin',
    name: 'Legging Second Skin',
    brand: 'Vívida',
    category: 'treino',
    image: '/images/placeholders/treino-1.svg',
    description: 'não marca, não escorrega e aguenta o treino inteiro sem transparecer.',
    url: 'https://example.com/produto/legging-second-skin',
    featured: true,
    cta: 'ver meu favorito',
  },
  {
    id: 'top-livre',
    name: 'Top Livre',
    brand: 'Vívida',
    category: 'treino',
    image: '/images/placeholders/treino-2.svg',
    description: 'sustentação boa pra qualquer treino e conforto pra usar o dia todo.',
    url: 'https://example.com/produto/top-livre',
  },
]

export function productsByCategory(category: Product['category']): Product[] {
  return products.filter((product) => product.category === category)
}
