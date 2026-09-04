import type { CachosLook } from '../data/types'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import styles from './CachosGrid.module.css'

interface CachosCardProps {
  look: CachosLook
  revealDelay?: number
}

function CachosCard({ look, revealDelay = 0 }: CachosCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={[
        styles.card,
        look.featured ? styles.featured : '',
        'reveal',
        visible ? 'is-visible' : '',
      ].join(' ')}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
    >
      <AspectImage
        src={look.image}
        alt={`${look.title} — cabelo da Analunps`}
        ratio="5 / 4"
        objectPosition={look.imagePosition}
        className={styles.image}
        priority={look.featured}
        sizes={
          look.featured
            ? '(min-width: 1024px) 44vw, (min-width: 768px) 90vw, 92vw'
            : '(min-width: 1024px) 30vw, (min-width: 768px) 28vw, 92vw'
        }
      />
      <div className={styles.caption}>
        <p className={styles.label}>{look.label}</p>
        <h3 className={styles.title}>{look.title}</h3>
        <p className={styles.description}>{look.description}</p>
      </div>
    </div>
  )
}

interface CachosGridProps {
  looks: CachosLook[]
}

export function CachosGrid({ looks }: CachosGridProps) {
  const featured = looks.find((look) => look.featured)
  const secondary = looks.filter((look) => !look.featured)

  return (
    <div className={styles.grid}>
      {/* 2x2 grid, not "1 featured beside a 3-stack": with all 4 cards using
          the same 4/5 portrait ratio, a column of 3 stacked cards is always
          roughly 3x as tall as 1 — no width/ratio adjustment closes that gap
          without either an unusably squat featured image or bad face/hair
          crops on the others (measured, not a hunch — see git history for
          this file). Pairing featured with exactly one card per row keeps
          every row's height difference small enough to read as intentional
          asymmetry instead of a layout defect. */}
      <div className={styles.topRow}>
        {featured && <CachosCard look={featured} />}
        {secondary[0] && <CachosCard look={secondary[0]} revealDelay={75} />}
      </div>
      <div className={styles.bottomRow}>
        {secondary[1] && <CachosCard look={secondary[1]} revealDelay={150} />}
        {secondary[2] && <CachosCard look={secondary[2]} revealDelay={225} />}
      </div>
    </div>
  )
}
