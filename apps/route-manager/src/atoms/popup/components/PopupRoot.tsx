import type { ReactElement } from 'react'

import { PopupRenderer } from './PopupRenderer/PopupRenderer'
import { MainWindowTemporaryMapContainer } from './MainWindowTemporaryMapContainer'

/**
 * The popup provider that adds whatever the popup needs to work.
 */
export function PopupRoot(props: { children: ReactElement }) {
  return (
    <>
      <MainWindowTemporaryMapContainer />
      <PopupRenderer />

      {props.children}
    </>
  )
}
