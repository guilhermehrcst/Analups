import { useEffect, useRef, useState } from 'react'

/**
 * Marks an element visible the first time it scrolls into view, via a
 * native IntersectionObserver — no animation library. Fires once, then
 * disconnects: this is a one-time reveal, not a repeating scroll effect.
 * Pair the returned ref/visible with the global `.reveal`/`.is-visible`
 * classes; `.reveal` is a no-op under prefers-reduced-motion, so this
 * hook still runs for those users but has nothing left to animate.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
