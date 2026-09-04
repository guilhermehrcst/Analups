import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} revealDelay={index * 75} />
      ))}
    </div>
  )
}
