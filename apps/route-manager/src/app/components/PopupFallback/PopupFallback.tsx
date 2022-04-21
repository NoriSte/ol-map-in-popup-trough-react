import { RenderInPopup, usePopupApi } from '@/atoms'
import { LoadingState } from '@/components/LoadingState'

import { CenteredLogo } from './components/CenteredLogo'
import { UnavailableMapWarningCard } from './components/UnavailableMapWarningCard'

/**
 * Render a common fallback for every section that renders nothing in the popup.
 */
export function PopupFallback() {
  const { status } = usePopupApi()

  if (status !== 'open') return null

  return (
    <RenderInPopup owner="popupFallback">
      <>
        <LoadingState />
        <CenteredLogo />
        <UnavailableMapWarningCard />
      </>
    </RenderInPopup>
  )
}
