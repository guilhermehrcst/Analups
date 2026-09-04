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

/**
 * A single 4/5 ratio applied everywhere produces wildly different absolute
 * heights depending on how much width the layout gives the card (2 vs 3
 * grid columns, a 1.6fr split-feature column, ...), since height scales
 * directly with width. These per-category/size overrides correct the
 * resulting scale imbalance without changing any grid, column count, or
 * flex proportion: cabelo's 2-column cards were ~7% taller than they read
 * next to melu's 3-column ones (7/8 trims that back); acessorios' 1.6fr
 * split-feature column made the "big" card ~1060px tall, close to a full
 * viewport (9/8 brings its own image + the split-feature's stretch-forced
 * partner down to ~77% of that), while its own 8/9 gives the smaller
 * column an independent, milder trim. See README "Verificado nesta
 * sessão" for the measured before/after height at every breakpoint.
 */
function imageRatio(
  category: Product['category'],
  orientation: 'vertical' | 'horizontal',
  size: 'default' | 'large',
): string {
  if (orientation === 'horizontal') return '1 / 1'
  if (category === 'cabelo') return '7 / 8'
  if (category === 'acessorios') return size === 'large' ? '9 / 8' : '8 / 9'
  return '4 / 5'
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
      data-accent={product.accent}
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
        ratio={imageRatio(product.category, orientation, size)}
        objectPosition={product.imagePosition}
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
