import { useState, type MutableRefObject, useRef, useEffect } from 'react'

interface UseObserverPropsType {
  distance?: string
  externalRef: MutableRefObject<null> | null
  once?: boolean
}

interface UseObserverType {
  isNearScreen: boolean
  fromRef: MutableRefObject<null>
}

export const useObserver = ({ distance = '100px', externalRef, once = true }: UseObserverPropsType): UseObserverType => {
  const [isNearScreen, setShow] = useState(false)
  const fromRef = useRef(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const element = (externalRef != null) ? externalRef.current : fromRef.current

    const onChange = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      const el = entries[0]
      if (el.isIntersecting) {
        setShow(true)
        once && observer.disconnect()
      } else {
        !once && setShow(false)
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance
    })

    if (element != null) observer.observe(element)
    else setShow(false)

    return () => { observer?.disconnect() }
  })

  return {
    isNearScreen,
    fromRef
  }
}
