import { socialProfiles } from '../data/social'
import { SocialCard } from './SocialCard'
import styles from './SocialProfiles.module.css'

export function SocialProfiles() {
  return (
    <section className={styles.section} aria-labelledby="social-heading">
      <div className="container">
        <header className={styles.header}>
          <h2 id="social-heading" className={styles.heading}>
            me acompanha por lá.
          </h2>
          <p className={styles.description}>
            cachos, beleza, rotina e tudo que acontece entre um achado e outro.
          </p>
        </header>

        <div className={styles.grid}>
          {socialProfiles.map((profile) => (
            <SocialCard key={profile.platform} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  )
}
