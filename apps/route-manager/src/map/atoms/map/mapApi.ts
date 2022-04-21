import type { MapState } from './map'

import { snapshot, useSnapshot } from 'valtio'
import {
  mapAtom,
  initialLockedValue,
  initialSelectionModeValue,
  initialShowTrafficValue,
} from './map'

type PublicMapState = Pick<MapState, 'locked' | 'showTraffic' | 'selectionMode'>

type SetMap = (prev: PublicMapState) => PublicMapState
type SetMapParam = SetMap | Partial<PublicMapState> | 'reset'

// ------------------------------------
// Write functions
// ------------------------------------

export const setMap = (valueOrFunc: SetMapParam) => {
  // reset
  if (valueOrFunc === 'reset') return resetMap()

  // callback with prev value
  if (typeof valueOrFunc === 'function') {
    const updates = valueOrFunc(snapshot(mapAtom))

    for (const field of Object.keys(updates)) {
      mapAtom[field] = updates[field]
    }
  } else {
    // atomic update
    for (const field of Object.keys(valueOrFunc)) {
      mapAtom[field] = valueOrFunc[field]
    }
  }

  return mapAtom
}

export const resetMap = () => {
  mapAtom.locked = initialLockedValue
  mapAtom.showTraffic = initialShowTrafficValue
  mapAtom.selectionMode = initialSelectionModeValue

  return mapAtom
}

// ------------------------------------
// React Hooks
// ------------------------------------

export const useMap = () => {
  return [useSnapshot(mapAtom), setMap] as const
}
export const useMapInstance = () => {
  return mapAtom.map
}
