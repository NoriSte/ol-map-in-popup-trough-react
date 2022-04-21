import type { MutableRefObject } from 'react'

interface Props {
  mapId: string
  targetRef: MutableRefObject<HTMLDivElement>
  bottomContentPadding?: number
}

export function MapContainer(props: Props) {
  const { mapId, targetRef } = props

  return <div id={mapId} ref={targetRef} />
}
