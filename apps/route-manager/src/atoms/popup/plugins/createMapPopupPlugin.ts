import type OlMap from 'ol/Map'
import type { PopupPlugin } from '../types'

type Params = {
  map: OlMap

  /**
   * The container that must always be available to allow the map rendered in the popup to
   * immediately switch back to the main window when the popup close. Theoretically, this is not
   * necessary since OL already answered to this issue https://github.com/openlayers/openlayers/issues/13525
   * but the mentioned solution sometimes does not work for the markers (but always works for the
   * other layers). The bug happens in our own code since in this CodeSandbox
   * https://codesandbox.io/s/external-map-bug-markers-jew6cd?file=/main.js:2021-2043
   * you can see that both the standard layers and the marker one always work.
   */
  mainWindowTemporaryContainerId: string
}

/**
 * Create a popup plugin that works around the map limitations when being moved to a popup.
 */
export function createMapPopupPlugin(params: Params) {
  const { map, mainWindowTemporaryContainerId } = params

  const plugin: PopupPlugin = {
    // --------------------------------------------------
    // POPUP CLOSE
    // --------------------------------------------------
    onClose: () => {
      const currentTarget = map.getTarget()

      // The map is not mounted yet
      if (!currentTarget) return

      // With the introduction of the Extracted Map, the map's target could not be a string anymore.
      if (typeof currentTarget === 'string') return

      const mainWindowTemporaryContainer = getMainWindowTemporaryContainer(
        mainWindowTemporaryContainerId,
      )

      const mapWasInPopup = currentTarget.ownerDocument.defaultView !== window

      if (!mapWasInPopup) return

      // Immediately set the map target to a temporary container of the main window to avoid render
      // errors with the map layers.
      // ATTENTION: setting the target to a main window element must be performed synchronously whrn
      // the popup closes!
      map.setTarget(mainWindowTemporaryContainer)
    },
  }

  return { plugin }
}

function getMainWindowTemporaryContainer(id: string) {
  const container = document.getElementById(id)

  // Prompt the developer in case of missing temporary container
  if (!container) {
    throw new Error('No temporary map container available')
  }

  return container
}
