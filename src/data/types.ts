export type CategorySlug =
  | 'melu'
  | 'nails'
  | 'cachos'
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
  accent?: 'pink' | 'coral' | 'yellow' | 'mint'
  /** CSS object-position, for real photos whose subject isn't centered
   *  at the card's 4:5 crop — mirrors SocialProfile.imagePosition. */
  imagePosition?: string
}

/**
 * A single nail-art photo in the nailsbyanacc carousel — editorial
 * photography, not a shoppable product: no brand, price, or outbound
 * link, so it deliberately doesn't reuse Product.
 */
export interface NailLook {
  id: string
  /** Path under /public. */
  image: string
  /** Short editorial title, e.g. "Chrome Estelar". */
  name: string
  /** CSS object-position — mirrors Product.imagePosition. */
  imagePosition?: string
}

/**
 * A single hair photo in the cachos grid — personal photography, not a
 * shoppable product: no brand, price, or outbound link, same reasoning
 * as NailLook.
 */
export interface CachosLook {
  id: string
  /** Path under /public. */
  image: string
  /** Small eyebrow above the title, e.g. "analunps". */
  label: string
  /** Short editorial title, e.g. "volume dourado". */
  title: string
  /** Short, first-person line — never marketing copy. */
  description: string
  /** CSS object-position — mirrors Product.imagePosition. */
  imagePosition?: string
  /** The one card given the large, spotlighted slot in the grid. */
  featured?: boolean
}
