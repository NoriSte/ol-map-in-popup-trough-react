import { VerticalLayout, Grow } from '@/components/layout'
import { MapControls } from '@/components/MapControls'

import { UnusableMapMask, usePopupApi, RenderInPopup } from '@/atoms'
import { Map } from './Map'

export function Popup() {
  const { status } = usePopupApi()

  if (status !== 'open') return null

  return (
    <RenderInPopup owner="settingsSection">
      <Grow xAxis yAxis>
        <VerticalLayout>
          <MapControls canFilterOrders />

          <Map />

          <UnusableMapMask />
        </VerticalLayout>
      </Grow>
    </RenderInPopup>
  )
}
