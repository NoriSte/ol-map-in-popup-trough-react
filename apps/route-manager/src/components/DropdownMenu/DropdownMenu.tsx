import type { ReactElement } from 'react'
import { useCallback, useRef } from 'react'

import Menu from '@mui/material/Menu'

import { useFixPopupPosition } from './hooks/useFixPopupPosition'

export function DropdownMenu() {
  const actionsRef = useFixPopupPosition()

  return (
    <>
      <Menu anchorEl={ref.current}>{/* ... */}</Menu>
    </>
  )
}
