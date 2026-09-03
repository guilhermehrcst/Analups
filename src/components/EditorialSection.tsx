import type { ReactNode } from 'react'
import type { Category } from '../data/types'
import styles from './EditorialSection.module.css'

interface EditorialSectionProps {
  category: Category
  children: ReactNode
}

export function EditorialSection({ category, children }: EditorialSectionProps) {
  return (
    <section id={category.slug} className={styles.section} aria-labelledby={`${category.slug}-heading`}>
      <div className="container">
        <header className={styles.header}>
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
