import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const LazyBox = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true)
    }
  }, [inView, isLoaded])

  return (
    <div ref={ref} className="w-full">
      {isLoaded && children}
    </div>
  )
}