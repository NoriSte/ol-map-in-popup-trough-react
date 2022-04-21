type Options = {
  target: string
  windowFeatures?: {
    width: number
    height: number
    screenX: number
    screenY: number
  }
}

/**
 * Imperatively spawn a new popup.
 */
export function spawnPopup(options: Options) {
  const { target, windowFeatures } = options

  let commaSeparatedFeatures = ``

  if (windowFeatures) {
    commaSeparatedFeatures += `width=${windowFeatures.width},height=${windowFeatures.height},left=${windowFeatures?.screenX},top=${windowFeatures?.screenY}`
  }

  // Open the popup
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
  return window.open(
    // An empty URL means an empty popup
    '',

    // The browsing context. Can be used as the target attribute of <a> or <form> elements.
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    target,

    commaSeparatedFeatures,
  )
}
