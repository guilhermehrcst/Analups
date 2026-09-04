import { CachosGrid } from '../components/CachosGrid'
import { EditorialSection } from '../components/EditorialSection'
import { Hero } from '../components/Hero'
import { NailsByAnacc } from '../components/NailsByAnacc'
import { ProductGrid } from '../components/ProductGrid'
import { SocialProfiles } from '../components/SocialProfiles'
import { cachosLooks } from '../data/cachos'
import { categories } from '../data/categories'
import { productsByCategory } from '../data/products'

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export function Home() {
  const melu = productsByCategory('melu')
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

      <EditorialSection category={categoryBySlug.treino} index={3}>
        <ProductGrid products={treino} columns={2} />
      </EditorialSection>
    </>
  )
}
