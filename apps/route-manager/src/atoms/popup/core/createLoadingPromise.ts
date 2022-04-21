import { LoadingResult } from '../popupState'

/**
 * Create a promise and steal its resolver.
 */
export function createLoadingPromise() {
  let resolver: (value: LoadingResult) => void = () => {}
  const promise = new Promise<LoadingResult>(resolve => (resolver = resolve))

  return { resolver, promise }
}
