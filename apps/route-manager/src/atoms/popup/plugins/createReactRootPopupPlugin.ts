import type { PopupPlugin } from '../types'

import { journal } from '@/server-data'

// The route id of the root component for the react portal
const rootId = 'routeManagerPopupRoot'

/**
 * Create a new popup with a standard root container.
 */
export function createReactRootPopupPlugin() {
  const plugin: PopupPlugin = {
    // --------------------------------------------------
    // POPUP LOAD
    // --------------------------------------------------
    onLoad: popupData => {
      const { popupWindow, id } = popupData
      const popupDoc = popupWindow.document

      // Create the root container
      const rootContainer = popupDoc.createElement('div')
      rootContainer.setAttribute('id', rootId)
      popupDoc.body.appendChild(rootContainer)

      journal.main('React root added', { info: { id } })
    },
  }

  return { plugin, rootId }
}
