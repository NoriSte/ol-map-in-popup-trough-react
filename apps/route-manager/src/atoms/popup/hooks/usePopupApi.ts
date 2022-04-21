import { useCallback } from 'react'

import { useMapInstance } from '@/map'

import { usePopupState } from '../popupState'

import { openPopup } from '../core/openPopup'
import { closePopup } from '../core/closePopup'
import { focusPopup } from '../core/focusPopup'

/**
 * Expose the popup API.
 */
export function usePopupApi() {
  const map = useMapInstance()
  const popupState = usePopupState()

  const open = useCallback(() => openPopup(map), [map])
  const close = useCallback(() => closePopup(), [])
  const focus = useCallback(() => focusPopup(), [])

  return {
    open,
    close,
    focus,
    status: popupState.state.status,
  }
}
