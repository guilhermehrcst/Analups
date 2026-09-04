import { site } from '../data/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
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
