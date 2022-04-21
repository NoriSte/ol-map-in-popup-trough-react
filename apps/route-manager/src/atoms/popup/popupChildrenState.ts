import type { ReactElement } from 'react'
import { proxy, useSnapshot } from 'valtio'

// ------------------------------------
// Types
// ------------------------------------

/**
 * The owners that are expected to render something in the popup.
 */
export type PopupChildrenOwner = 'popupFallback' | 'routingSection' | 'settingsSection'

/**
 * The children to be rendered in the popup.
 */
export type PopupChildrenState = Partial<Record<PopupChildrenOwner, ReactElement>>

// ------------------------------------
// Atom
// ------------------------------------

const initialPopupChildrenState: PopupChildrenState = {}

export const popupChildrenStateAtom = proxy<{ state: PopupChildrenState }>({
  state: initialPopupChildrenState,
})

export const childOwnerPriority: PopupChildrenOwner[] = [
  'routingSection',
  'settingsSection',
  'popupFallback',
]

// ------------------------------------
// Hooks
// ------------------------------------

export function usePopupChildrenState() {
  return useSnapshot(popupChildrenStateAtom)
}
