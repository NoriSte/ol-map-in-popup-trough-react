type Options = {
  mainWindowDoc: Document
  popupDoc: Document

  // Avoid cloning the same stylesheet over and over again.
  mutableCache: WeakMap<Node, Node>

  measurePerformance?: boolean
}

/**
 * Clone all the externally-loaded stylesheets (ex. the fonts).
 */
export function copyExternalStylesheets(options: Options) {
  const { mainWindowDoc, popupDoc, mutableCache, measurePerformance = false } = options

  const start = measurePerformance ? performance.now() : 0

  // Retrieve all the links from the main window
  const stylesheets = mainWindowDoc.querySelectorAll(
    'link[rel="stylesheet"]',
  ) as NodeListOf<HTMLLinkElement>

  // Clone the stylesheets and append them to the popup window
  for (const stylesheet of stylesheets) {
    // Avoid cloning the stylesheet if not needed
    if (mutableCache.has(stylesheet)) continue

    const clonedStylesheet = stylesheet.cloneNode(true) as HTMLLinkElement
    popupDoc.head.appendChild(clonedStylesheet)

    mutableCache.set(stylesheet, clonedStylesheet)
  }

  // Log the overall performance
  if (measurePerformance) {
    console.log(
      `Cloning the external stylesheets in the popup took ${performance.now() - start} ms`,
    )
  }
}
