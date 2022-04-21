import { copyCssRules } from './copyCssRules'

type Options = {
  mainWindowDoc: Document
  mutableContainer: HTMLStyleElement
  initialSync?: boolean
  measurePerformance?: boolean
}

/**
 * Clone all the CSS rule of a document every time something changes in the main window's head.
 * The purpose is intercepting every CSS-in-JS-related change and update the popup's styles accordingly.
 */
export function keepCssRulesInSync(options: Options) {
  const {
    mainWindowDoc,
    mutableContainer,
    initialSync = true,
    measurePerformance = false,
  } = options

  function onStylesChange() {
    copyCssRules({
      mainWindowDoc,
      mutableContainer,
      measurePerformance,
    })
  }

  const observer = new MutationObserver(onStylesChange)
  const mainWindowHead = mainWindowDoc.querySelector('head')

  if (!mainWindowHead) throw new Error('No head found in the main window')

  observer.observe(mainWindowHead, { subtree: false, childList: true })

  if (initialSync) {
    copyCssRules({
      mainWindowDoc,
      mutableContainer,
      measurePerformance,
    })
  }

  return () => observer.disconnect()
}
