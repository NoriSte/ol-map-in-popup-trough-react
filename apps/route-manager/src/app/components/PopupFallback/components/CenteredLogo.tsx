import Grid from '@mui/material/Grid'

import { RouteManagerLogo } from './RouteManageLogo'

export function CenteredLogo() {
  return (
    <Grid
      container
      width="100%"
      height="100%"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <RouteManagerLogo width="350px" />
      </Grid>
    </Grid>
  )
}
