import { EditorialSection } from '../components/EditorialSection'
import { FeaturedProduct } from '../components/FeaturedProduct'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'
import { SocialProfiles } from '../components/SocialProfiles'
import { categories } from '../data/categories'
import { productsByCategory } from '../data/products'
import styles from './Home.module.css'

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export function Home() {
  const melu = productsByCategory('melu')
  const cabelo = productsByCategory('cabelo')
  const skincare = productsByCategory('skincare')
  const acessorios = productsByCategory('acessorios')
  const treino = productsByCategory('treino')

  return (
    <>
      <Hero />

      <SocialProfiles />

      <EditorialSection category={categoryBySlug.melu} index={0}>
        <ProductGrid products={melu} columns={3} />
      </EditorialSection>

      <EditorialSection category={categoryBySlug.cabelo} index={1}>
        <ProductGrid products={cabelo} />
      </EditorialSection>

      <EditorialSection category={categoryBySlug.skincare} index={2}>
        <FeaturedProduct product={skincare[0]} />
        <div className={styles.spotlightSecondary}>
          <ProductCard product={skincare[1]} orientation="horizontal" revealDelay={75} />
        </div>
      </EditorialSection>

      <EditorialSection category={categoryBySlug.acessorios} index={3}>
        <div className={`${styles.splitFeature} ${styles.reverse}`}>
          <div className={styles.bigCol}>
            <ProductCard product={acessorios[0]} size="large" />
          </div>
          <div className={styles.smallCol}>
            <ProductCard product={acessorios[1]} revealDelay={75} />
          </div>
        </div>
      </EditorialSection>

      <EditorialSection category={categoryBySlug.treino} index={4}>
        <div className={styles.horizontalStack}>
          {treino.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              orientation="horizontal"
              revealDelay={index * 75}
            />
          ))}
        </div>
      </EditorialSection>
    </>
  )
}
