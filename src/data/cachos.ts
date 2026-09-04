import type { CachosLook } from './types'

/**
 * cachos grid — personal hair photography, not products.
 *
 * Real photos, copied byte-for-byte (checksum verified) from the provided
 * files — no crop, filter, or edit. Assigned to each title by actually
 * looking at the photo's content (color, styling), not by upload order:
 * cachos-01 is the sunlit golden-blonde shot (the "volume dourado" one),
 * cachos-02 the short auburn/copper curls, cachos-03 the long hair under
 * dramatic red light, cachos-04 the half-up braids + loose copper curls.
 */
export const cachosLooks: CachosLook[] = [
  {
    id: 'volume-dourado',
    image: '/images/cachos/cachos-01.png',
    label: 'analunps',
    title: 'volume dourado',
    description: 'uma fase leve, iluminada e cheia de personalidade.',
    featured: true,
  },
  {
    id: 'coque-cacheado',
    image: '/images/cachos/cachos-02.png',
    label: 'analunps',
    title: 'coque cacheado',
    description: 'praticidade sem perder textura, presença e estilo.',
    /* O crop mais baixo (5/4) cortava o próprio coque no topo — que é o
       assunto do card. Sobe a janela visível para mantê-lo inteiro. */
    imagePosition: '50% 30%',
  },
  {
    id: 'ondas-em-vermelho',
    image: '/images/cachos/cachos-03.png',
    label: 'analunps',
    title: 'ondas em vermelho',
    description: 'um momento mais marcante, criativo e cheio de atitude.',
  },
  {
    id: 'half-up-texture',
    image: '/images/cachos/cachos-04.png',
    label: 'analunps',
    title: 'half-up texture',
    description: 'um visual que mistura definição, charme e presença.',
  },
]
