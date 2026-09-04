import type { NailLook } from './types'

/**
 * nailsbyanacc carousel — editorial nail-art photography, not products.
 *
 * `image` currently points at generated placeholder art (see
 * /public/images/placeholders) while the 6 real photos are pending; once
 * they land at /public/images/nailsbyanacc/nail-0N.jpg, only the `image`
 * (and, where a photo's subject isn't centered, `imagePosition`) fields
 * below need to change — the carousel itself doesn't.
 */
export const nails: NailLook[] = [
  {
    id: 'chrome-estelar',
    image: '/images/placeholders/nails-01.svg',
    name: 'Chrome Estelar',
  },
  {
    id: 'dourado-floral',
    image: '/images/placeholders/nails-02.svg',
    name: 'Dourado Floral',
  },
  {
    id: 'luz-dourada',
    image: '/images/placeholders/nails-03.svg',
    name: 'Luz Dourada',
  },
  {
    id: 'cosmic-purple',
    image: '/images/placeholders/nails-04.svg',
    name: 'Cosmic Purple',
  },
  {
    id: 'pop-colors',
    image: '/images/placeholders/nails-05.svg',
    name: 'Pop Colors',
  },
  {
    id: 'chrome-aura',
    image: '/images/placeholders/nails-06.svg',
    name: 'Chrome Aura',
  },
]
