import type { PopoverOrigin, PopoverPosition } from '@mui/material'

import { Popover } from '@mui/material'

import { useIsInPopup } from '@/atoms'

export function MultipleOrders() {
  const isInPopup = useIsInPopup()

  return (
    <Popover
      // Avoid MUI moving the tooltip back to the main window through a portal
      disablePortal={isInPopup}
    >
      {/* ... */}
    </Popover>
  )
}
