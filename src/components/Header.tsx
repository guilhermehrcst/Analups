import { categories } from '../data/categories'
import { site } from '../data/site'
import { InstagramIcon } from './icons/EditorialIcons'
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
          <InstagramIcon size={20} />
        </a>
      </div>
    </header>
  )
}
