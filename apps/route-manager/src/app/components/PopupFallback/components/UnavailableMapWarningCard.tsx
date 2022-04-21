import type { CSSProperties } from 'react'

import { WarningCard } from '@local/components'
import { WarningTriangle } from '@/icons'

import { useTexts } from '../hooks/useTexts'

const warningCardStyles: CSSProperties = {
  position: 'fixed',
  width: '320px',
  right: '26px',
  bottom: '29px',
}

export function UnavailableMapWarningCard() {
  const texts = useTexts()

  return (
    <WarningCard
      Icon={<WarningTriangle size={16} color="$pureWhite" background="$darkOrange" />}
      description={texts.warningCardDescription}
      preset="warning"
      title={texts.warningCardTitle}
      style={warningCardStyles}
    />
  )
}
