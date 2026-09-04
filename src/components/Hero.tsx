import { site } from '../data/site'
import { publicUrl } from '../lib/publicUrl'
import { CategoryNav } from './CategoryNav'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Apresentação">
      {/* Decorative hero background — atmospheric art, not a photo of
          {site.fullName}, so it stays alt="" / aria-hidden. Native <img>
          renders an animated .gif exactly like a still image (no <video>
          needed): drop a real animated file at this same path and nothing
          else here has to change. */}
      <img
        src={publicUrl('/images/hero/hero-bg.jpg')}
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
