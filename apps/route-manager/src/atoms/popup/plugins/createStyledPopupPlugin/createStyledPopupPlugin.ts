import type { PopupPlugin } from '../../types'

import { journal } from '@/server-data'

import { keepCssRulesInSync } from './core/keepCssRulesInSync'
import { copyExternalStylesheets } from './core/copyExternalStylesheets'

/**
 * Copy all the main window's styles to the popup.
 */
export function createStyledPopupPlugin() {
  let externalStylesheetsCache = new WeakMap<Node, Node>()
  let stopSyncingCssRules: () => void

  const plugin: PopupPlugin = {
    // --------------------------------------------------
    // POPUP LOAD
    // --------------------------------------------------
    onLoad: popupData => {
      const { popupWindow, id } = popupData

      const popupDoc = popupWindow.document
      const mainWindowDoc = window.document

      // Create the CSS container
      const documentStyleSheetsContainer = document.createElement('style') as HTMLStyleElement
      popupDoc.head.appendChild(documentStyleSheetsContainer)

      copyExternalStylesheets({
        popupDoc,
        mainWindowDoc,
        measurePerformance: true,
        mutableCache: externalStylesheetsCache,
      })

      stopSyncingCssRules = keepCssRulesInSync({
        mainWindowDoc,
        mutableContainer: documentStyleSheetsContainer,
        initialSync: true,
        measurePerformance: true,
      })

      journal.main('Initial popup styles copied', { info: { id } })
    },

    // --------------------------------------------------
    // POPUP CLOSE
    // --------------------------------------------------
    onClose: popupData => {
      const { id } = popupData

      stopSyncingCssRules()
      externalStylesheetsCache = new WeakMap<Node, Node>()

      journal.main('Popup styles cleaned up', { info: { id } })
    },
  }

  return { plugin }
}
