import { publicUrl } from '../lib/publicUrl'
import styles from './AspectImage.module.css'

interface AspectImageProps {
  src: string
  alt: string
  /** CSS aspect-ratio value, e.g. "4 / 5". */
  ratio: string
  /** Eager, high-priority load — reserve for the single above-the-fold image. */
  priority?: boolean
  sizes?: string
  className?: string
}

export function AspectImage({
  src,
  alt,
  ratio,
  priority = false,
  sizes,
  className,
}: AspectImageProps) {
  return (
    <div className={`${styles.frame} ${className ?? ''}`} style={{ aspectRatio: ratio }}>
      <img
        src={publicUrl(src)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={styles.img}
      />
    </div>
  )
}
