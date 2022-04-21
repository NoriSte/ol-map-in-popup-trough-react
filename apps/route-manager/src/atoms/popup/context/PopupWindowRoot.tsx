import type { ReactElement } from 'react'
import type { Context } from './PopupWindowContext'
import { PopupWindowContext } from './PopupWindowContext'

const popupValue: Context = { window: 'popup' }

/**
 * The Popup must use this Context root component to allow everyone in the render tree
 * to know whether they are in the popup or not.
 */
export function PopupWindowRoot(props: { children: ReactElement }) {
  return (
    <PopupWindowContext.Provider value={popupValue}>{props.children}</PopupWindowContext.Provider>
  )
}
