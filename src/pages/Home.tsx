import { EditorialSection } from '../components/EditorialSection'
import { FeaturedProduct } from '../components/FeaturedProduct'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'
import { categories } from '../data/categories'
import { productsByCategory } from '../data/products'
import styles from './Home.module.css'

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export function Home() {
  const beleza = productsByCategory('beleza')
  const cabelo = productsByCategory('cabelo')
  const skincare = productsByCategory('skincare')
  const acessorios = productsByCategory('acessorios')
  const treino = productsByCategory('treino')

  return (
    <>
      <Hero />

      <EditorialSection category={categoryBySlug.beleza}>
        <div className={styles.splitFeature}>
          <div className={styles.bigCol}>
            <ProductCard product={beleza[0]} size="large" />
          </div>
          <div className={styles.smallCol}>
            <ProductCard product={beleza[1]} />
          </div>
        </div>
      </EditorialSection>

      <EditorialSection category={categoryBySlug.cabelo}>
        <ProductGrid products={cabelo} />
      </EditorialSection>

      <EditorialSection category={categoryBySlug.skincare}>
        <FeaturedProduct product={skincare[0]} />
        <div className={styles.spotlightSecondary}>
          <ProductCard product={skincare[1]} orientation="horizontal" />
        </div>
      </EditorialSection>

      <EditorialSection category={categoryBySlug.acessorios}>
        <div className={`${styles.splitFeature} ${styles.reverse}`}>
          <div className={styles.bigCol}>
            <ProductCard product={acessorios[0]} size="large" />
          </div>
          <div className={styles.smallCol}>
            <ProductCard product={acessorios[1]} />
          </div>
        </div>
      </EditorialSection>

      <EditorialSection category={categoryBySlug.treino}>
        <div className={styles.horizontalStack}>
          {treino.map((product) => (
            <ProductCard key={product.id} product={product} orientation="horizontal" />
          ))}
        </div>
      </EditorialSection>
    </>
  )
}
