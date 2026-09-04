import type { Product } from '../data/types'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import { ArrowUpRightIcon } from './icons/EditorialIcons'
import styles from './FeaturedProduct.module.css'

interface FeaturedProductProps {
  product: Product
  /** Mirrors the image to the opposite side, for cross-section rhythm. */
  reverse?: boolean
  /** Stagger for cards entering the viewport together — see useReveal. */
  revealDelay?: number
}

export function FeaturedProduct({ product, reverse = false, revealDelay = 0 }: FeaturedProductProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={product.url}
      target="_blank"
      rel="noreferrer noopener"
      data-category={product.category}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
      className={`${styles.card} ${reverse ? styles.reverse : ''} reveal ${visible ? 'is-visible' : ''}`}
    >
      <AspectImage
        src={product.image}
        alt={`${product.name} — ${product.brand}`}
        ratio="4 / 5"
        className={styles.image}
        sizes="(min-width: 1024px) 50vw, 92vw"
      />

      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <span className="editorial-link">
          {product.cta ?? 'ver produto'}
          <ArrowUpRightIcon className="editorial-link__arrow" />
        </span>
      </div>
    </a>
  )
}
