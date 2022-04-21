import { useState } from 'react'
import { useIntl } from '@/intl'

export function useTexts() {
  const { translate } = useIntl()

  const [api] = useState(() => ({
    warningCardTitle: translate({ id: 'popup.unusableMap.title' }),
    warningCardDescription: translate({ id: 'popup.unusableMap.description' }),
  }))

  return api
}
