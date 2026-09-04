import { CachosGrid } from '../components/CachosGrid'
import { EditorialSection } from '../components/EditorialSection'
import { Hero } from '../components/Hero'
import { NailsByAnacc } from '../components/NailsByAnacc'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'
import { SocialProfiles } from '../components/SocialProfiles'
import { cachosLooks } from '../data/cachos'
import { categories } from '../data/categories'
import { productsByCategory } from '../data/products'
import styles from './Home.module.css'

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export function Home() {
  const melu = productsByCategory('melu')
  const acessorios = productsByCategory('acessorios')
  const treino = productsByCategory('treino')

  return (
    <>
      <Hero />

      <SocialProfiles />

      <EditorialSection category={categoryBySlug.melu} index={0}>
        <ProductGrid products={melu} columns={3} />
      </EditorialSection>

      <NailsByAnacc index={1} />

      <EditorialSection category={categoryBySlug.cachos} index={2}>
        <CachosGrid looks={cachosLooks} />
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
