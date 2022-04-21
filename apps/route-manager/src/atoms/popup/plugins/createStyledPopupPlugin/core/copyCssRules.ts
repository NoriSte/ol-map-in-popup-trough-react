type Options = {
  mainWindowDoc: Document

  // The container that will host all the CSS rules.
  mutableContainer: HTMLStyleElement

  measurePerformance?: boolean
}

/**
 * Clone all the internal CSS rules of a document. The purpose of this function is to clone the
 * dynamically-created stylesheets (all the CSS-in-JS ones).
 *
 * Please note that the styles created by the CSS-in-JS libraries don't have a set 'innerHTML' but
 * they can only be clones by reading `document.styleSheets`.
 *
 * see: https://github.com/mui/material-ui/issues/16756#issue-473252809
 */
export function copyCssRules(options: Options) {
  const { mainWindowDoc, mutableContainer, measurePerformance = false } = options

  const start = performance.now()

  const allStylesheets = mainWindowDoc.styleSheets

  // Filter out the browser extension stylesheets
  // see: https://betterprogramming.pub/how-to-fix-the-failed-to-read-the-cssrules-property-from-cssstylesheet-error-431d84e4a139
  const appStyleSheets = Array.from(allStylesheets).filter(
    styleSheet => !styleSheet.href || styleSheet.href.startsWith(window.location.origin),
  )

  let allCssRules = `
/* Dynamically-copied CSS rules, see copyDocumentStylesheets */
  `

  // Create a string containing all the CSS rules
  for (const stylesheet of appStyleSheets) {
    for (const rule of stylesheet.cssRules) {
      allCssRules += `
${rule.cssText}
`
    }
  }

  mutableContainer.textContent = allCssRules

  // Log the overall performance
  if (measurePerformance) {
    console.log(
      `Updating the popup styles with all the CSS rules took ${performance.now() - start} ms`,
    )
  }
}
