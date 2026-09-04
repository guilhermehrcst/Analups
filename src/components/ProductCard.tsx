import type { Product } from '../data/types'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import { ArrowUpRightIcon } from './icons/EditorialIcons'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  /** Horizontal reads as a compact row — used sparingly for rhythm. */
  orientation?: 'vertical' | 'horizontal'
  /** Large steps up type scale for a card carrying more visual weight in a section. */
  size?: 'default' | 'large'
  /** Stagger for cards entering the viewport together — see useReveal. */
  revealDelay?: number
}

export function ProductCard({
  product,
  orientation = 'vertical',
  size = 'default',
  revealDelay = 0,
}: ProductCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={product.url}
      target="_blank"
      rel="noreferrer noopener"
      data-category={product.category}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
      className={[
        styles.card,
        orientation === 'horizontal' ? styles.horizontal : '',
        size === 'large' ? styles.large : '',
        'reveal',
        visible ? 'is-visible' : '',
      ].join(' ')}
    >
      <AspectImage
        src={product.image}
        alt={`${product.name} — ${product.brand}`}
        ratio={orientation === 'horizontal' ? '1 / 1' : '4 / 5'}
        className={styles.image}
        sizes={
          orientation === 'horizontal'
            ? '(min-width: 768px) 220px, 40vw'
            : '(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 88vw'
        }
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
