import { categories } from '../data/categories'
import styles from './CategoryNav.module.css'

export function CategoryNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias do mural">
      <ul className={styles.list}>
        {categories.map((category) => (
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
