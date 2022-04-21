import { Mask } from './components/Mask'
import { useMainWindowVisible } from './hooks/useMainWindowVisible'

/**
 * Show an overlay over the map when the main window is visible.
 * see: https://github.com/openlayers/openlayers/issues/13567
 */
export function UnusableMapMask() {
  const mainWindowVisible = useMainWindowVisible()

  if (mainWindowVisible) return null

  return <Mask />
}
