import { usePopupState } from '../../../popupState'

/**
 * Expose the popup's root container for rendering some components inside it.
 */
export function usePopupRootContainer() {
  const popupAtom = usePopupState()

  if (popupAtom.state.status !== 'open') return

  // Workaround the limitations of valtio.ref used on an HTMLElement
  return popupAtom.state.rootContainer as any as HTMLElement
}
