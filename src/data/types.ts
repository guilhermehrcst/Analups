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
}
