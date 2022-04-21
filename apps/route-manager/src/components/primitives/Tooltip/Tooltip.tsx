import Popover from '@mui/material/Popover'

import { useFixPopupPosition } from './hooks/useFixPopupPosition'

export function Tooltip(props: Props) {
  const actionsRef = useFixPopupPosition()

  return (
    <>
      <Popover action={actionsRef}>{/* ... */}</Popover>
    </>
  )
}
