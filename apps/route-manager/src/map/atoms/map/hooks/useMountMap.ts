import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

import { mainWindowTemporaryContainerId } from '@/atoms'

import { mapAtom } from '../map'
import { useSyncMountMap } from './useSyncMountMap'
import { useDelayedMountMap } from './useDelayedMountMap'

/**
 * When the map moves from the popup to the main window, the main window should wait for a while
 * before rendering the map in the desired container. Otherwise, the map renders empty.
 *
 * Delaying the original useMountMap logic works in the following two cases:
 * 1. When the popup is closed and the map returns to the main window (ex. moving to the Map
 * Layout when the Extracted Map is open)
 * Detailed steps:
 * - the popup is closed
 * - the map is immediately moved to the MainWindowTemporaryMapContainer's div
 * - the previous useMountMap clears the previous useMountMap's target
 * - the MapLayout components renders the Map in an internal component but the delayedMountMap
 * delays mounting the map
 *
 * 2. When a component recalls the map in the main window without closing the Extracted Map (ex.
 * moving to a section that renders the map internally from a section thea renders the map in
 * the popup)
 * Detailed steps:
 * - the map is unmounted from the popup
 * - a component renders the map in the main window
 * - a component renders the map in the main window but the delayedMountMap delays mounting the map
 *
 * see: MainWindowTemporaryMapContainer
 * see: createMapPopupPlugin
 */
export const useMountMap = (mapTarget: MutableRefObject<HTMLElement>) => {
  const syncMountMap = useSyncMountMap(mapTarget)

  // 100 should be enough. 0 or requestAnimationFrame does not work. 200 is for safety
  const delayedMountMap = useDelayedMountMap(mapTarget, 200)

  useEffect(() => {
    if (!mapTarget.current) throw new Error('No map target set')

    const previousTarget: HTMLElement | null = mapAtom.map.getTargetElement()

    const wasUnmounted = !previousTarget

    if (wasUnmounted) {
      return syncMountMap()
    }

    const mapIsRenderedInPopup = previousTarget.ownerDocument.defaultView !== window
    const popupJustClosed = previousTarget.id === mainWindowTemporaryContainerId

    if (mapIsRenderedInPopup || popupJustClosed) {
      return delayedMountMap()
    }

    return syncMountMap()
  }, [mapTarget, delayedMountMap, syncMountMap])

  return mapAtom.map
}
