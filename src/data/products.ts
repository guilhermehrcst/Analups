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
    id: 'bruma-mystic',
    name: 'Bruma Mystic',
    brand: 'Aurel',
    category: 'beleza',
    image: '/images/placeholders/beleza-1.svg',
    description:
      'um dos meus favoritos de sempre — fixa o dia inteiro e não enjoa.',
    url: 'https://example.com/produto/bruma-mystic',
    featured: true,
    cta: 'ver meu favorito',
  },
  {
    id: 'creme-corporal-amalfi',
    name: 'Creme Corporal Amalfi',
    brand: 'Aurel',
    category: 'beleza',
    image: '/images/placeholders/beleza-2.svg',
    description:
      'hidrata sem pesar e deixa aquele perfume suave por baixo da roupa.',
    url: 'https://example.com/produto/creme-corporal-amalfi',
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
