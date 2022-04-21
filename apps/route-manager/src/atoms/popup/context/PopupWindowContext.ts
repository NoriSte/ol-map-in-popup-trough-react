import { createContext } from 'react'

export interface Context {
  window: 'main' | 'popup'
}

export const PopupWindowContext = createContext<Context>({
  window: 'main',
})
