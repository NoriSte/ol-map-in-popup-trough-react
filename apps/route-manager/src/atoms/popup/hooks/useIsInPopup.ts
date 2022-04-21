import { useContext } from 'react'
import { PopupWindowContext } from '../context/PopupWindowContext'

/**
 * Allow every component to know if it's rendered inside the Extracted Map or not.
 */
export function useIsInPopup() {
  return useContext(PopupWindowContext).window === 'popup'
}
