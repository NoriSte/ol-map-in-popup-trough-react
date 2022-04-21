import type { ReactElement } from 'react'
import type { PopupChildrenOwner } from '../popupChildrenState'

import { ref } from 'valtio'
import { useEffect } from 'react'

import { popupChildrenStateAtom } from '../popupChildrenState'

type Props = { children: ReactElement; owner: PopupChildrenOwner }

/**
 * Add the passed children to the ones eligible to be rendered in the popup
 */
export function RenderInPopup(props: Props) {
  const { children, owner } = props

  useEffect(() => {
    popupChildrenStateAtom.state[owner] = ref(children)

    return () => {
      delete popupChildrenStateAtom.state[owner]
    }
  }, [owner, children])

  return null
}
