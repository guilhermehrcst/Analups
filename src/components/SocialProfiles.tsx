import { socialProfiles } from '../data/social'
import { useReveal } from '../lib/useReveal'
import { SocialCard } from './SocialCard'
import styles from './SocialProfiles.module.css'

export function SocialProfiles() {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section className={styles.section} aria-labelledby="social-heading">
      <div className="container">
        <header
          ref={ref}
          className={`${styles.header} reveal ${visible ? 'is-visible' : ''}`}
        >
          <h2 id="social-heading" className={styles.heading}>
            me acompanha por lá.
          </h2>
          <p className={styles.description}>
            cachos, beleza, rotina e tudo que acontece entre um achado e outro.
          </p>
        </header>

        <div className={styles.grid}>
          {socialProfiles.map((profile, index) => (
            <SocialCard key={profile.platform} profile={profile} revealDelay={index * 75} />
          ))}
        </div>
      </div>
    </section>
  )
}
