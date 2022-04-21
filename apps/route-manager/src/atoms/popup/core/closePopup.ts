import { journal } from '@/server-data'
import { popupStateAtom } from '../popupState'

/**
 * Close the popup.
 */
export function closePopup() {
  const popupAtom = popupStateAtom.state

  switch (popupAtom.status) {
    case 'close':
      journal.main('The Popup is not open', {})
      return false

    case 'opening':
    case 'open':
      popupAtom.popup.close()

      popupStateAtom.state = {
        status: 'close',
      }

      return true

    case 'error':
      journal.main('The Popup encountered an error and did not open', {}, 'warn')
      return false

    default:
      // This is a TS protection that forces the developer to properly manage all the cases.
      // It throws when the developer adds new app statuses without adding a corresponding `case` here.
      // @ts-expect-error
      throw new Error(`Unknown status: ${popup.status}`)
  }
}
