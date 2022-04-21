import type OlMap from 'ol/Map'

/**
 * Generate the coordinates to place the popup at the same screen position of the map rendered in
 * the main window.
 */
export function getMapScreenCoordinates(map: OlMap) {
  const target = map.getTarget()

  // With the introduction of the Extracted Map, the map's target could not be a string anymore.
  if (!target || typeof target === 'string') {
    return {
      width: Math.round(window.innerWidth * 0.8),
      screenX: Math.round(window.screenTop * 1.1),
      screenY: Math.round(window.screenLeft * 1.1),
      height: Math.round(window.innerHeight * 0.8),
    }
  }

  const targetBounds = target.getBoundingClientRect()

  return {
    width: targetBounds.width,
    height: targetBounds.height,
    screenY: window.screenY + targetBounds.top,
    screenX: window.screenX + targetBounds.left,
  }
}
