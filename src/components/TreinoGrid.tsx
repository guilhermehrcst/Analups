import type { TreinoLook } from '../data/types'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import styles from './TreinoGrid.module.css'

interface TreinoCardProps {
  look: TreinoLook
  revealDelay?: number
}

function TreinoCard({ look, revealDelay = 0 }: TreinoCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={['reveal', visible ? 'is-visible' : '', styles.card].join(' ')}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
    >
      <AspectImage
        src={look.image}
        alt={`${look.title} — Analunps`}
        ratio="1 / 1"
        objectPosition={look.imagePosition}
        className={styles.image}
        sizes="(min-width: 768px) 44vw, 92vw"
      />
      <div className={styles.caption}>
        <p className={styles.label}>{look.label}</p>
        <h3 className={styles.title}>{look.title}</h3>
        <p className={styles.description}>{look.description}</p>
      </div>
    </div>
  )
}

interface TreinoGridProps {
  looks: TreinoLook[]
}

export function TreinoGrid({ looks }: TreinoGridProps) {
  return (
    <div className={styles.grid}>
      {looks.map((look, index) => (
        <TreinoCard key={look.id} look={look} revealDelay={index * 75} />
      ))}
    </div>
  )
}
