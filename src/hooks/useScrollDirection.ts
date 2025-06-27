import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

export const useScrollOnceAnimation = () => {
  const scrollDirection = useScrollDirection()
  const [hasAnimated, setHasAnimated] = useState(false)

  const shouldAnimate = (inView: boolean) => {
    // Chỉ animate 1 lần khi scroll xuống và element trong view
    if (inView && scrollDirection === 'down' && !hasAnimated) {
      setHasAnimated(true)
    }
    // Trả về true nếu đã animate hoặc đang animate
    return hasAnimated || (inView && scrollDirection === 'down')
  }

  return { shouldAnimate, hasAnimated }
}
