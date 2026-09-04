import { categories } from '../data/categories'
import styles from './CategoryNav.module.css'

/**
 * This nav is the hero's chip row only — it never appears elsewhere, so
 * this filter doesn't touch the "acessórios" section further down the
 * page (Home.tsx still renders it from the full `categories` list).
 * "acessorios" is excluded here by editorial choice.
 */
const heroCategories = categories.filter((category) => category.slug !== 'acessorios')

export function CategoryNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias do mural">
      <ul className={styles.list}>
        {heroCategories.map((category) => (
          <li key={category.slug}>
            <a href={`#${category.slug}`} className={styles.pill}>
              {category.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
