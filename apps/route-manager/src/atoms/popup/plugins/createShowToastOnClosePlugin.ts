import type { PopupPlugin } from '../types'
import { toast } from 'react-toastify'
import { intl } from '@/intl'

const extractedMapClosed = (): string => intl.translate({ id: 'extractedMapClosed.toast.close' })

/**
 * Show a toast notification when the user closes the popup window. Please note that when the popup
 * gets closed indirectly (ex. when the users move to the map view, forcing the popup to close)
 * the toast message is not managed here.
 */
export function createShowToastOnClosePlugin() {
  const plugin: PopupPlugin = {
    // --------------------------------------------------
    // POPUP CLOSE
    // --------------------------------------------------
    onClose: ({ initiator }) => {
      if (initiator !== 'onPopupWindowClose') return

      toast.success(extractedMapClosed())
    },
  }

  return { plugin }
}
