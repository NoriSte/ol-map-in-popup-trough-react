import type { Popup, PopupOptions } from '../types'
import { spawnPopup } from './spawnPopup'

/**
 * Create a new empty popup and return a minimal set of API.
 */
export function createEmptyPopup(options: PopupOptions): Popup {
  const { id, windowConfig, plugins = [] } = options

  let popupWindow: Window | null = null

  // --------------------------------------------------
  // ON POPUP LOAD
  // --------------------------------------------------
  const onPopupWindowLoad = () => {
    // Something strange happened
    if (!popupWindow) {
      // onError hook
      for (const p of plugins) p.onError?.({ errorType: 'unexistingPopup', id })
      return
    }

    if (loadTimeoutId !== undefined) clearTimeout(loadTimeoutId)

    // onLoad hook
    for (const p of plugins) p.onLoad?.({ popupWindow, id })
  }

  // --------------------------------------------------
  // CLOSE API
  // --------------------------------------------------
  const close = () => {
    if (!popupWindow) {
      // onError hook
      for (const p of plugins) p.onError?.({ errorType: 'unexistingPopup', id })

      return false
    }

    // Without immediately removing the listeners the next .close() call would trigger the onClose listener
    removeEventListeners()

    // onBeforeClose hook
    for (const p of plugins) p.onBeforeClose?.({ initiator: 'closeApi', popupWindow, id })

    // cleanup
    popupWindow.close()
    popupWindow = null

    // onClose hook
    for (const p of plugins) p.onClose?.({ initiator: 'closeApi', id })

    return true
  }

  // --------------------------------------------------
  // ON POPUP CLOSE
  // --------------------------------------------------
  const onPopupWindowClose = () => {
    if (!popupWindow) {
      // onError hook
      for (const p of plugins) p.onError?.({ errorType: 'unexistingPopup', id })

      return
    }

    removeEventListeners()

    // onBeforeClose hook
    for (const p of plugins) p.onBeforeClose?.({ initiator: 'onPopupWindowClose', popupWindow, id })

    // cleanup
    popupWindow = null

    // onClose hook
    for (const p of plugins) p.onClose?.({ initiator: 'onPopupWindowClose', id })
  }

  // --------------------------------------------------
  // ON MAIN WINDOW CLOSE
  // --------------------------------------------------
  const onMainWindowClose = () => {
    if (!popupWindow) {
      // onError hook
      for (const p of plugins) p.onError?.({ errorType: 'unexistingPopup', id })

      return
    }

    // Without immediately removing the listeners the next .close() call would trigger the onClose listener
    removeEventListeners()

    // onBeforeClose hook
    for (const p of plugins) p.onBeforeClose?.({ initiator: 'onMainWindowClose', popupWindow, id })

    // cleanup
    popupWindow.close()
    popupWindow = null

    // onClose hook
    for (const p of plugins) p.onClose?.({ initiator: 'onMainWindowClose', id })
  }

  // --------------------------------------------------
  // EVENT LISTENERS
  // --------------------------------------------------
  let loadTimeoutId: ReturnType<typeof setTimeout> | undefined
  const addEventListeners = () => {
    if (!popupWindow) return

    // Close management
    window.addEventListener('pagehide', onMainWindowClose)
    popupWindow.addEventListener('pagehide', onPopupWindowClose)

    // Load management
    popupWindow.addEventListener('load', onPopupWindowLoad)

    // Both Firefox and Safari does not trigger the 'load' event for the popups, let's trigger it manually
    loadTimeoutId = setTimeout(onPopupWindowLoad, 1000)
  }

  const removeEventListeners = () => {
    if (!popupWindow) return

    // Close management
    window.removeEventListener('pagehide', onMainWindowClose)
    popupWindow.removeEventListener('pagehide', onPopupWindowClose)

    // Load management
    popupWindow.removeEventListener('load', onPopupWindowLoad)
    if (loadTimeoutId !== undefined) clearTimeout(loadTimeoutId)
  }

  // --------------------------------------------------
  // OPEN API
  // --------------------------------------------------

  const open = () => {
    const config = !!windowConfig
      ? typeof windowConfig === 'function'
        ? windowConfig(id)
        : windowConfig
      : undefined

    // Open the popup
    popupWindow = spawnPopup({ target: id, windowFeatures: config?.windowFeatures })

    // The popup did not open, probably because of a popup blocker
    if (!popupWindow) {
      // onError hook
      for (const p of plugins) p.onError?.({ errorType: 'popupBlocked', id })

      return false
    }

    popupWindow.document.title = config?.title ?? 'Popup'

    // onOpen hook
    for (const p of plugins) p.onOpen?.({ popupWindow, id })

    // Add all the necessary listeners to the new window
    addEventListeners()

    return true
  }

  // --------------------------------------------------
  // FOCUS API
  // --------------------------------------------------
  const focus = () => {
    if (!popupWindow) return false

    popupWindow.focus()

    return true
  }

  return {
    open,
    close,
    focus,
  }
}
