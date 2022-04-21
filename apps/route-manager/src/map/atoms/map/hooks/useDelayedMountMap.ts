import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { mapAtom } from '../map'

const sizeObserver = new ResizeObserver(() => {
  mapAtom.map.updateSize()
})

/**
 * Asynchronously mount the mep in the given target element.
 */
export const useDelayedMountMap = (mapTarget: MutableRefObject<HTMLElement>, delay = 100) => {
  return useCallback(() => {
    if (!mapTarget.current) throw new Error('No map target set')

    let timeoutTicked = false

    const setNewTarget = () => {
      // mount the map into the provided target identifier
      mapAtom.map.setTarget(mapTarget.current)
      mapAtom.status = 'mounted'

      sizeObserver.observe(mapAtom.map.getTargetElement())

      timeoutTicked = true
    }

    const timeoutId = setTimeout(setNewTarget, delay)

    // Return a cleanup function
    return () => {
      if (!timeoutTicked) {
        clearTimeout(timeoutId)
        return
      }

      // unmount the map when the target change or the component unmounts
      sizeObserver.unobserve(mapAtom.map.getTargetElement())
      mapAtom.map.setTarget(undefined)
      mapAtom.status = 'unmounted'
    }
  }, [mapTarget, delay])
}
