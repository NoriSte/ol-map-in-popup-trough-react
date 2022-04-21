import type OlMap from 'ol/Map'
import { ref } from 'valtio'

import { journal } from '@/server-data'

import { popupStateAtom } from '../popupState'
import { id as mainWindowTemporaryContainerId } from '../components/MainWindowTemporaryMapContainer'

import { createLoadingPromise } from './createLoadingPromise'
import { createRouteManagerPopup } from './createRouteManagerPopup'

/**
 * Create a new popup and open it.
 */
export function openPopup(map: OlMap) {
  const popupAtom = popupStateAtom.state

  switch (popupAtom.status) {
    case 'opening':
    case 'open':
      journal.main('The Popup is already open', {}, 'warn')
      return Promise.reject(new Error('The Popup is already open'))

    case 'close':
    case 'error':
      const { promise: loadingPromise, resolver } = createLoadingPromise()

      const { rootId, popup } = createRouteManagerPopup({
        map,
        mainWindowTemporaryContainerId,
        plugins: [
          {
            onOpen: popupData => {
              popupStateAtom.state = {
                status: 'opening',
                popup: ref(popup),
                popupWindow: ref(popupData.popupWindow),
                loadingPromise: ref(loadingPromise),
              }
            },

            onLoad: popupData => {
              const { popupWindow } = popupData

              // Someone else closed the popup
              if (popupStateAtom.state.status !== 'opening') return

              const rootContainer = popupWindow.document.getElementById(rootId)
              if (!rootContainer) throw new Error('Cannot find the root container')

              popupStateAtom.state = {
                status: 'open',
                popup: ref(popup),
                popupWindow: ref(popupWindow),
                rootContainer: ref(rootContainer),
              }

              // Resolve the loading promise
              resolver('success')
            },

            onClose: () => {
              popupStateAtom.state = {
                status: 'close',
              }
            },

            onError: popupData => {
              popupStateAtom.state = {
                status: 'error',
                type: popupData.errorType,
              }
            },
          },
        ],
      })

      popup.open()

      return loadingPromise

    default:
      // This is a TS protection that forces the developer to properly manage all the cases.
      // It throws when the developer adds new app statuses without adding a corresponding `case` here.
      // @ts-expect-error
      throw new Error(`Unknown status: ${popup.status}`)
  }
}
