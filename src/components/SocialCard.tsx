import type { SocialProfile } from '../data/social'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import { ArrowUpRightIcon, InstagramIcon, TikTokIcon } from './icons/EditorialIcons'
import styles from './SocialCard.module.css'

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} as const

interface SocialCardProps {
  profile: SocialProfile
  /** Stagger for cards entering the viewport together — see useReveal. */
  revealDelay?: number
}

export function SocialCard({ profile, revealDelay = 0 }: SocialCardProps) {
  const Icon = ICONS[profile.platform]
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      data-platform={profile.platform}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
      className={`${styles.card} reveal ${visible ? 'is-visible' : ''}`}
    >
      <AspectImage
        src={profile.image}
        alt={profile.alt}
        ratio="4 / 5"
        objectPosition={profile.imagePosition}
        className={styles.image}
        sizes="(min-width: 768px) 46vw, 92vw"
      />

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          <Icon className={styles.icon} size={17} />
          {profile.label}
        </p>
        <h3 className={styles.handle}>{profile.handle}</h3>
        <p className={styles.text}>{profile.text}</p>
        <span className="editorial-link">
          {profile.cta}
          <ArrowUpRightIcon className="editorial-link__arrow" />
        </span>
      </div>
    </a>
  )
}
