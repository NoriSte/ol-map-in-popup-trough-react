import type { Popup } from './types'
import { proxy, useSnapshot } from 'valtio'

// ------------------------------------
// Types
// ------------------------------------

/**
 * The current state of the popup's lifecycle.
 */
export type PopupState =
  | {
      // The popup has been closed or never open
      status: 'close'
    }
  | {
      // The popup is opening right now
      status: 'opening'
      popup: Popup
      popupWindow: Window

      // Allow anyone to wait until the popup is open
      loadingPromise: Promise<LoadingResult>
    }
  | {
      // The popup is up and running, ready to render children
      status: 'open'
      popup: Popup
      popupWindow: Window
      rootContainer: HTMLElement
    }
  | {
      status: 'error'
      type:
        | 'popupBlocked' // The popup has been blocked
        | 'unexistingPopup' // The popup seems disappeared
        | 'unknown' // Something unexpected happened
    }

export type LoadingResult = 'success' | 'popupBlocked' | 'unexistingPopup' | 'unknown'

// ------------------------------------
// Atom
// ------------------------------------

const initialPopupState: PopupState = {
  status: 'close',
}

export const popupStateAtom = proxy<{ state: PopupState }>({
  state: initialPopupState,
})

// ------------------------------------
// Hooks
// ------------------------------------

export function usePopupState() {
  return useSnapshot(popupStateAtom)
}
