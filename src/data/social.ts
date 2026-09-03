export type SocialPlatform = 'instagram' | 'tiktok'

export interface SocialProfile {
  platform: SocialPlatform
  /** Eyebrow label, e.g. "Instagram". */
  label: string
  handle: string
  text: string
  cta: string
  url: string
  /** Path under /public, or a fully-qualified URL. Resolved through publicUrl() by AspectImage. */
  image: string
  /** Real, descriptive alt text — these are actual photos, not decoration. */
  alt: string
  /** CSS object-position, tuned per photo so face/hair/phone stay in frame at 4:5. */
  imagePosition: string
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@analunps',
    text: 'beleza, cachos, rotina e um pouco de tudo que faz parte dos meus dias.',
    cta: 'ver no Instagram',
    url: 'https://www.instagram.com/analunps/',
    image: '/images/social/instagram.jpg',
    alt: 'Ana Luiza fazendo uma selfie no espelho com celular rosa',
    imagePosition: '50% 22%',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    handle: '@analunps',
    text: 'vídeos, cabelo, estilo e aqueles momentos que acabam virando conteúdo.',
    cta: 'ver no TikTok',
    url: 'https://www.tiktok.com/@analunps',
    image: '/images/social/tiktok.jpg',
    alt: 'Ana Luiza fazendo uma selfie no espelho',
    imagePosition: '50% 38%',
  },
]
