import type { CSSProperties } from 'react'

export const id = 'mainWindowTemporaryMapContainer'

const styles: CSSProperties = {
  position: 'fixed',
  top: -1000,
  left: -1000,

  width: 100,
  height: 100,
}

/**
 * The container that must always be available in order to allow the map rendered in the popup to
 * immediately switch back to the main window when the popup close.
 */
export function MainWindowTemporaryMapContainer() {
  return <div style={styles} id={id}></div>
}
