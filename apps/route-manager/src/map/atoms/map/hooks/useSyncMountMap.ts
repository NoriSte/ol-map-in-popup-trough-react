import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { mapAtom } from '../map'

const sizeObserver = new ResizeObserver(() => {
  mapAtom.map.updateSize()
})

/**
 * Synchronously mount the mep in the given target element.
 */
export const useSyncMountMap = (mapTarget: MutableRefObject<HTMLElement>) => {
  return useCallback(() => {
    if (!mapTarget.current) throw new Error('No map target set')

    // mount the map into the provided target identifier
    mapAtom.map.setTarget(mapTarget.current)
    mapAtom.status = 'mounted'

    const targetElement = mapAtom.map.getTargetElement()
    sizeObserver.observe(targetElement)

    // Return a cleanup function
    return () => {
      // unmount the map when the target change or the component unmounts
      sizeObserver.unobserve(targetElement)
      mapAtom.map.setTarget(undefined)
      mapAtom.status = 'unmounted'
    }
  }, [mapTarget])
}
