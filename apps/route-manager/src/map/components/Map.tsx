import { useRef } from 'react'

import { useMountMap } from '../atoms/map/hooks/useMountMap'

import { MapContainer } from './MapContainer'

const placeholderContainer = document.createElement('div')

export function Map(props: Props) {
  const { mapId = 'map-div' } = props

  // The placeholder container helps TS to avoid a merge conflict between
  // React.MutableRefObject and React.LegacyRef down in MapContainer
  const targetRef = useRef(placeholderContainer)

  // access the map and mount it to the HTML element whose id is set to `mapId`
  const map = useMountMap(targetRef)

  return <MapContainer mapId={mapId} targetRef={targetRef} />
}
