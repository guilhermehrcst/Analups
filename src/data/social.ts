export type SocialPlatform = 'instagram' | 'tiktok'

export interface SocialProfile {
  platform: SocialPlatform
  /** Eyebrow label, e.g. "Instagram". */
  label: string
  handle: string
  text: string
  cta: string
  url: string
  /** Path under /public, or a fully-qualified URL once real photography exists. */
  image: string
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@analunps',
    text: 'beleza, cachos, rotina e um pouco de tudo que faz parte dos meus dias.',
    cta: 'ver no Instagram',
    url: 'https://www.instagram.com/analunps/',
    image: '/images/placeholders/social-instagram.svg',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    handle: '@analunps',
    text: 'vídeos, cabelo, estilo e aqueles momentos que acabam virando conteúdo.',
    cta: 'ver no TikTok',
    url: 'https://www.tiktok.com/@analunps',
    image: '/images/placeholders/social-tiktok.svg',
  },
]
