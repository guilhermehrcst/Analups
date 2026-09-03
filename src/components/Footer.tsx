import { categories } from '../data/categories'
import { site } from '../data/site'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.signature}>{site.name}</p>
          <p className={styles.note}>{site.footerNote}</p>
        </div>

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

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.fullName}
        </p>
      </div>
    </footer>
  )
}
