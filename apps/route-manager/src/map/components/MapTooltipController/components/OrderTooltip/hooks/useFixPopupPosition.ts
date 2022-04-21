import type { PopoverActions } from '@mui/material'

import { useLayoutEffect, useRef } from 'react'
import { useIsInPopup } from '@/atoms'

/**
 * In a popup, the left position is not calculated/applied correctly. By forcing
 * `updatePosition`, we ensure the tooltip is placed at the correct position.
 */
export function useFixPopupPosition() {
  const isInPopup = useIsInPopup()
  const actionsRef = useRef<PopoverActions>(null)

  // useLayoutEffect fixes the position before useEffect
  useLayoutEffect(() => {
    if (!isInPopup) return

    requestAnimationFrame(() => {
      actionsRef.current?.updatePosition()
    })

    // No dependency array, the position must be updated at every render
  })

  return actionsRef
}
