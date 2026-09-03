import type { SocialProfile } from '../data/social'
import { AspectImage } from './AspectImage'
import { InstagramIcon, TikTokIcon } from './icons/SocialIcons'
import styles from './SocialCard.module.css'

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} as const

interface SocialCardProps {
  profile: SocialProfile
}

export function SocialCard({ profile }: SocialCardProps) {
  const Icon = ICONS[profile.platform]

  return (
    <a href={profile.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <AspectImage
        src={profile.image}
        alt={`${profile.label} — ${profile.handle}`}
        ratio="4 / 5"
        className={styles.image}
        sizes="(min-width: 768px) 46vw, 92vw"
      />

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          <Icon className={styles.icon} />
          {profile.label}
        </p>
        <h3 className={styles.handle}>{profile.handle}</h3>
        <p className={styles.text}>{profile.text}</p>
        <span className="editorial-link">
          {profile.cta}
          <span className="editorial-link__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </a>
  )
}
