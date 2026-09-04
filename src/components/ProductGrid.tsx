import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
  /** Desktop column count — 2 by default; 3 for sections with three products. */
  columns?: 2 | 3
}

/**
 * A card's height is its width divided by the image ratio, so the same
 * portrait crop that reads well in a narrow 3-up column becomes a poster in
 * a wide 2-up one (measured: 4/5 at 2-up produced ~900px cards at 1440px,
 * against ~690px for the 3-up ones). Squaring the 2-up crop keeps both
 * layouts in the same height family — the same lever already used for the
 * cachos grid.
 */
const RATIO_BY_COLUMNS = {
  2: '1 / 1',
  3: '4 / 5',
} as const

export function ProductGrid({ products, columns = 2 }: ProductGridProps) {
  return (
    <div className={`${styles.grid} ${columns === 3 ? styles.threeUp : ''}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          imageRatio={RATIO_BY_COLUMNS[columns]}
          revealDelay={index * 75}
        />
      ))}
    </div>
  )
}
