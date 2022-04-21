import { Typography, styled } from '@mui/material'
import { useTexts } from '../hooks/useTexts'
import { RouteManagerLogo } from './RouteManagerLogo'

const MaskContainer = styled('div', { name: 'MaskContainer' })({
  display: 'flex',
  flexDirection: 'column',

  // Center the children
  alignItems: 'center',
  justifyContent: 'center',

  // Fill the parent viewport
  width: '100%',
  height: '100%',

  // Cover the rest of the app
  zIndex: 99999,
  position: 'fixed',
  top: 0,
  left: 0,
  background: 'rgba(255, 255, 255, 0.85)',
})

const FirstRowContainer = styled('div', { name: 'FirstRowContainer' })({
  width: '100%',
  flex: '1 1 auto',

  // Center the children
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const LogoContainer = styled('div', { name: 'LogoContainer' })({
  width: '100%',
  flex: '0 0 200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const TextContainer = styled('div', { name: 'LogoContainer' })(({ theme }) => ({
  width: '50%',
  padding: theme.spacing(3),
}))

export function Mask() {
  const texts = useTexts()

  return (
    <MaskContainer>
      <FirstRowContainer>
        <TextContainer>
          <Typography variant="h3" align="center">
            {texts.warningCardTitle}
          </Typography>
          <Typography variant="h5" align="center">
            {texts.warningCardDescription}
          </Typography>
        </TextContainer>
      </FirstRowContainer>

      <LogoContainer>
        <RouteManagerLogo width="350px" />
      </LogoContainer>
    </MaskContainer>
  )
}
