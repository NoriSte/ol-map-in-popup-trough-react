import type { PopupPlugin } from '../types'
import { journal } from '@/server-data'

/**
 * Log the different popup states. If placed as the first plugin, it allows understanding what
 * happened to the popup while investigating errors reported by the error manager.
 */
export function createPopupLoggerPlugin() {
  const plugin: PopupPlugin = {
    // --------------------------------------------------
    // POPUP OPEN
    // --------------------------------------------------
    onOpen: ({ id }) => {
      journal.main('Popup opened', { info: { id } })
    },

    // --------------------------------------------------
    // POPUP LOAD
    // --------------------------------------------------
    onLoad: ({ id }) => {
      journal.main('Popup loaded', { info: { id } })
    },

    // --------------------------------------------------
    // POPUP CLOSE
    // --------------------------------------------------
    onClose: ({ id }) => {
      journal.main('Popup closed', { info: { id } })
    },

    // --------------------------------------------------
    // POPUP ERROR
    // --------------------------------------------------
    onError: ({ errorType, id }) => {
      journal.main('Popup error', { info: { id, errorType } }, 'error')
    },
  }

  return { plugin }
}
