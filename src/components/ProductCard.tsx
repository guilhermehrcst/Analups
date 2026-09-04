import type { Product } from '../data/types'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import { ArrowUpRightIcon } from './icons/EditorialIcons'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  /** CSS aspect-ratio for the image. Set by the grid from its column count:
   *  a card's height is its width divided by this ratio, so the same 4/5
   *  portrait that reads well in a narrow 3-up column turns into a poster
   *  in a wide 2-up one. See ProductGrid. */
  imageRatio?: string
  /** Stagger for cards entering the viewport together — see useReveal. */
  revealDelay?: number
}

export function ProductCard({
  product,
  imageRatio = '4 / 5',
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
      data-accent={product.accent}
      style={{ transitionDelay: visible ? `${revealDelay}ms` : undefined }}
      className={[styles.card, 'reveal', visible ? 'is-visible' : ''].join(' ')}
    >
      <AspectImage
        src={product.image}
        alt={`${product.name} — ${product.brand}`}
        ratio={imageRatio}
        objectPosition={product.imagePosition}
        className={styles.image}
        sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 88vw"
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
