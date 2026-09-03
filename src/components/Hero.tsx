import { site } from '../data/site'
import { publicUrl } from '../lib/publicUrl'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Apresentação">
      <div className={`container ${styles.content}`}>
        {/*
          The wordmark stands in for the page's H1 — it's the site's name,
          not decoration, so it carries the heading semantics and its alt
          text is the accessible name a screen reader announces.
        */}
        <h1 className={styles.logoWrap}>
          <img
            src={publicUrl('/images/analunps-logo.png')}
            alt={site.name}
            width={2172}
            height={724}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={styles.logo}
          />
        </h1>

        <p className={styles.tagline}>{site.heroTagline}</p>
      </div>
    </section>
  )
}
