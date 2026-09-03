import { categories } from '../data/categories'
import { site } from '../data/site'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.signature}>
          {site.name}
        </a>

        <nav className={styles.nav} aria-label="Categorias">
          {categories.map((category) => (
            <a key={category.slug} href={`#${category.slug}`}>
              {category.label}
            </a>
          ))}
        </nav>

        <a
          className={styles.instagram}
          href={site.instagramUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Instagram de ${site.fullName}`}
        >
          <InstagramMark />
        </a>
      </div>
    </header>
  )
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}
