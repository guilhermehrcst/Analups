import type { ReactNode } from 'react'
import type { Category } from '../data/types'
import { useReveal } from '../lib/useReveal'
import styles from './EditorialSection.module.css'

interface EditorialSectionProps {
  category: Category
  /** Position among category sections — drives the alternating background.
   *  Explicit rather than CSS `:nth-of-type`, so inserting an unrelated
   *  <section> elsewhere on the page (e.g. SocialProfiles) can never shift
   *  which of these sections reads as sunken. */
  index: number
  children: ReactNode
}

export function EditorialSection({ category, index, children }: EditorialSectionProps) {
  const sunken = index % 2 === 1
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      id={category.slug}
      className={`${styles.section} ${sunken ? styles.sunken : ''}`}
      aria-labelledby={`${category.slug}-heading`}
    >
      <div className="container">
        <header
          ref={ref}
          className={`${styles.header} reveal ${visible ? 'is-visible' : ''}`}
        >
          <h2 id={`${category.slug}-heading`} className={styles.heading}>
            {category.label}.
          </h2>
          <p className={styles.description}>{category.description}</p>
        </header>

        {children}
      </div>
    </section>
  )
}
