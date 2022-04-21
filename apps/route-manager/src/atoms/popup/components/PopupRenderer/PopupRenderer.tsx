import type { PopupChildrenState } from '../../popupChildrenState'

import { createPortal } from 'react-dom'

import { PopupWindowRoot } from '../../context/PopupWindowRoot'
import { usePopupChildrenState, childOwnerPriority } from '../../popupChildrenState'

import { usePopupRootContainer } from './hooks/usePopupRootContainer'

/**
 * Render the popup child with the highest priority among the registered ones.
 */
export function PopupRenderer() {
  const popupContainer = usePopupRootContainer()
  const popupChildren = usePopupChildrenState().state as any as PopupChildrenState

  if (!popupContainer) return null

  const child = getChild(popupChildren)

  if (!child) return null

  return createPortal(<PopupWindowRoot>{child}</PopupWindowRoot>, popupContainer)
}

/**
 * Get the correct child based on the priority.
 *
 * @param {PopupChildrenState} popupChildren
 * @returns
 */
function getChild(popupChildren: PopupChildrenState) {
  for (const owner of childOwnerPriority) {
    const child = popupChildren[owner]

    if (child) return child
  }
}
