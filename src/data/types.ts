export type CategorySlug =
  | 'melu'
  | 'cabelo'
  | 'skincare'
  | 'acessorios'
  | 'treino'

export interface Category {
  slug: CategorySlug
  /** Lowercase editorial label, used in nav pills and section headings. */
  label: string
  /** Short editorial line under the section heading. */
  description: string
}

export interface Product {
  id: string
  name: string
  brand: string
  category: CategorySlug
  /** Path under /public, or a fully-qualified URL once real photography exists. */
  image: string
  /** Short, first-person opinion — never marketing copy. */
  description: string
  url: string
  /** Highlights the product in the section's editorial composition. */
  featured?: boolean
  /** Overrides the default "ver produto" call to action. */
  cta?: string
  /** Overrides the category's default accent — for sections (like "melu")
   *  where each product carries its own color identity instead of sharing
   *  one accent across the whole category. */
  accent?: 'pink' | 'coral' | 'yellow' | 'lilac' | 'mint'
  /** CSS object-position, for real photos whose subject isn't centered
   *  at the card's 4:5 crop — mirrors SocialProfile.imagePosition. */
  imagePosition?: string
}
