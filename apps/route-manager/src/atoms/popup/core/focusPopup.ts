import { journal } from '@/server-data'
import { popupStateAtom } from '../popupState'

/**
 * Focus the popup.
 */
export function focusPopup() {
  const popupAtom = popupStateAtom.state

  switch (popupAtom.status) {
    case 'close':
      journal.main('The Popup is not open', {}, 'warn')
      return

    case 'opening':
      journal.main(
        'The Popup is currently opening, it will be automatically focused once opened',
        {},
        'warn',
      )
      break

    case 'open':
      return popupAtom.popupWindow.focus()

    case 'error':
      journal.main('The Popup encountered an error and did not open', {}, 'warn')
      break

    default:
      // This is a TS protection that forces the developer to properly manage all the cases.
      // It throws when the developer adds new app statuses without adding a corresponding `case` here.
      // @ts-expect-error
      throw new Error(`Unknown status: ${popup.status}`)
  }
}
