import { categories } from '../data/categories'
import { site } from '../data/site'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <p className={styles.copyright}>
          © {year} {site.fullName}
        </p>

        <nav aria-label="Categorias" className={styles.nav}>
          {categories.map((category) => (
            <a key={category.slug} href={`#${category.slug}`}>
              {category.label}
            </a>
          ))}
        </nav>

        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.handle}
        >
          {site.instagramHandle}
        </a>
      </div>
    </footer>
  )
}
