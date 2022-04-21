import { useEffect, useState } from 'react'

export function useMainWindowVisible() {
  // By setting the initial state to `false`, the mask starts visible. This is needed because when
  // the main window gets hidden, also the sync of the CSS rules between the main window and the
  // popup is suspended, hence the mask remain unstyled (I guess because the CSS-in-JS libraries
  // do not ass new styles when the page is hidden). By starting visible, the map styles are created
  //  and cloned immediately.
  const [mainWindowVisible, setMainWindowVisible] = useState(false)

  useEffect(() => {
    setMainWindowVisible(isMainWindowVisible())
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      setMainWindowVisible(isMainWindowVisible())
    }

    window.addEventListener('visibilitychange', onVisibilityChange)

    return () => window.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return mainWindowVisible
}

function isMainWindowVisible() {
  return document.visibilityState === 'visible'
}
