export type PopupId = string

// --------------------------------------------------
// POPUP
// --------------------------------------------------

export type PopupOptions = {
  id: PopupId
  plugins?: PopupPlugin[]
  windowConfig?: WindowConfig | ((id: string) => WindowConfig)
}

/**
 * The object representing the popup.
 */
export type Popup = {
  open: () => boolean
  close: () => boolean
  focus: () => boolean
}

export type WindowConfig = {
  // The title of the popup window
  title?: string

  // The supported window features
  windowFeatures?: {
    width: number
    height: number
    screenX: number
    screenY: number
  }
}

// --------------------------------------------------
// POPUP PLUGIN
// --------------------------------------------------
export type PopupPlugin = {
  // Called after the popup opened. It's the first moment the popup's window object is available.
  onOpen?: (popupData: OnOpenPopupData) => void

  // Called after the popup triggered the load event.
  onLoad?: (popupData: OnLoadPopupData) => void

  // Called when the popup is closed, either manually or programmatically, before performing any
  // internal cleanup. It's the last chance to access the popup window object.
  onBeforeClose?: (popupData: OnBeforeClosePopupData) => void

  // Called when the popup is closed, either manually or programmatically, after having performed the
  // internal cleanup.
  onClose?: (popupData: OnClosePopupData) => void

  onError?: (popupData: OnErrorPopupData) => void
}

type OnOpenPopupData = { popupWindow: Window; id: PopupId }

type OnLoadPopupData = { popupWindow: Window; id: PopupId }

type CloseInitiator = 'onMainWindowClose' | 'onPopupWindowClose' | 'closeApi'

type OnBeforeClosePopupData = {
  initiator: CloseInitiator
  popupWindow: Window
  id: PopupId
}

type OnClosePopupData = {
  initiator: CloseInitiator
  id: PopupId
}

type OnErrorPopupData = {
  errorType: 'popupBlocked' | 'unexistingPopup'
  id: PopupId
}
