import type OlMap from 'ol/Map'
import type { PopupPlugin } from '../types'

import { createMapPopupPlugin } from '../plugins/createMapPopupPlugin'
import { createStyledPopupPlugin } from '../plugins/createStyledPopupPlugin'
import { createPopupLoggerPlugin } from '../plugins/createPopupLoggerPlugin'
import { createReactRootPopupPlugin } from '../plugins/createReactRootPopupPlugin'
import { createShowToastOnClosePlugin } from '../plugins/createShowToastOnClosePlugin'

import { createEmptyPopup } from './createEmptyPopup'
import { getMapScreenCoordinates } from './getMapScreenCoordinates'

type Params = {
  map: OlMap

  // The if of the container that must always be available in the main window.
  mainWindowTemporaryContainerId: string

  // A list of popup plugins that come *after* the createRouteManagerPopup ones.
  plugins: PopupPlugin[]
}

/**
 * Create a new popup with all the necessary plugins to render a RouteManager portion and/or the map.
 */
export function createRouteManagerPopup(params: Params) {
  const { map, mainWindowTemporaryContainerId, plugins } = params

  const popupLoggerPlugin = createPopupLoggerPlugin()
  const styledPopupPlugin = createStyledPopupPlugin()
  const reactRootPopupPlugin = createReactRootPopupPlugin()
  const showToastOnClosePlugin = createShowToastOnClosePlugin()
  const mapPopupPlugin = createMapPopupPlugin({ mainWindowTemporaryContainerId, map })

  const popup = createEmptyPopup({
    id: 'routeManagerPopup',

    plugins: [
      // the order matters
      popupLoggerPlugin.plugin,
      mapPopupPlugin.plugin,
      reactRootPopupPlugin.plugin,
      styledPopupPlugin.plugin,
      showToastOnClosePlugin.plugin,

      ...plugins,
    ],

    windowConfig: () => ({
      title: 'RouteManager extracted map',
      windowFeatures: getMapScreenCoordinates(map),
    }),
  })

  return { popup, rootId: reactRootPopupPlugin.rootId }
}
