import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import { nails } from '../data/nails'
import { useReveal } from '../lib/useReveal'
import { AspectImage } from './AspectImage'
import { ChevronLeftIcon, ChevronRightIcon } from './icons/EditorialIcons'
import styles from './NailsByAnacc.module.css'

interface NailsByAnaccProps {
  /** Position among category sections — drives the alternating background,
   *  same contract as EditorialSection's `index`. */
  index: number
}

export function NailsByAnacc({ index }: NailsByAnaccProps) {
  const sunken = index % 2 === 1
  const { ref: headerRef, visible } = useReveal<HTMLDivElement>()

  // Computed once via useState's lazy initializer (not read from a ref
  // during render — the correct one-time-computation pattern), and not
  // subscribed live: matches how the rest of the site treats this
  // preference (a CSS custom property baked in at load), and autoplay is a
  // one-time decision — whether to attach the plugin at all — not
  // something that needs to react to the setting changing mid-session.
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    reducedMotion ? [] : [autoplay],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnapCount, setScrollSnapCount] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((snap: number) => emblaApi?.scrollTo(snap), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onInit = () => setScrollSnapCount(emblaApi.scrollSnapList().length)

    onInit()
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  // Arrow keys advance the carousel when focus is anywhere inside it (an
  // arrow button or a dot) — doesn't hijack arrow keys page-wide, since the
  // handler only runs while focus already lives inside this region.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  return (
    <section
      id="nails"
      className={`${styles.section} ${sunken ? styles.sunken : ''}`}
      aria-labelledby="nails-heading"
    >
      <div className="container">
        <div ref={headerRef} className={`${styles.header} reveal ${visible ? 'is-visible' : ''}`}>
          <h2 id="nails-heading" className={styles.heading}>
            nailsbyanacc.
          </h2>
          <p className={styles.subtitle}>
            inspirações que traduzem personalidade, beleza e atitude.
          </p>
          <p className={styles.subtitleSecondary}>
            dos delicados aos mais marcantes, esses são alguns dos meus favoritos.
          </p>
        </div>
      </div>

      <div className="container">
        <div
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="Fotos de unhas by anacc"
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={scrollPrev}
            aria-label="Inspiração anterior"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.track}>
              {nails.map((look, i) => (
                <div
                  key={look.id}
                  className={styles.slide}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${nails.length}`}
                >
                  <div
                    className={`${styles.card} ${i === selectedIndex ? styles.cardActive : ''}`}
                  >
                    <AspectImage
                      src={look.image}
                      alt={`Unha ${look.name}, by anacc`}
                      ratio="4 / 5"
                      objectPosition={look.imagePosition}
                      className={styles.image}
                      priority={i === 0}
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 82vw"
                    />
                    <div className={styles.overlay} aria-hidden="true" />
                    <div className={styles.caption}>
                      <p className={styles.by}>by anacc</p>
                      <p className={styles.name}>{look.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={scrollNext}
            aria-label="Próxima inspiração"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Selecionar inspiração">
        {Array.from({ length: scrollSnapCount }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Ir para a foto ${i + 1}`}
            className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
