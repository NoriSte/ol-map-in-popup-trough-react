import { useState } from 'react'
import { useIntl } from '@/intl'

export function useTexts() {
  const { translate } = useIntl()

  const [api] = useState(() => ({
    warningCardTitle: translate({ id: 'popup.fallback.warningCard.title' }),
    warningCardDescription: translate({ id: 'popup.fallback.warningCard.description' }),
  }))

  return api
}
