import { site } from '../data/site'
import { publicUrl } from '../lib/publicUrl'
import { CategoryNav } from './CategoryNav'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Apresentação">
      {/* Placeholder art — replace with a real photograph of {site.fullName}
          and give it a descriptive alt (e.g. "{site.fullName} sorrindo,
          cabelo cacheado solto"), since it would no longer be decorative. */}
      <img
        src={publicUrl('/images/hero.svg')}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={styles.image}
      />
      <div className={styles.scrim} />

      <div className={`container ${styles.content}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{site.heroTagline}</p>
          <h1 className={styles.heading}>{site.heroHeading}</h1>
        </div>

        <CategoryNav />
      </div>
    </section>
  )
}
