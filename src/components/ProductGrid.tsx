import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
  /** Desktop column count — 2 by default; 3 for sections with three products. */
  columns?: 2 | 3
}

export function ProductGrid({ products, columns = 2 }: ProductGridProps) {
  return (
    <div className={`${styles.grid} ${columns === 3 ? styles.threeUp : ''}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} revealDelay={index * 75} />
      ))}
    </div>
  )
}
