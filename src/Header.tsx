import React from 'react'
// import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar'
// import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
// import HelpIcon from '@material-ui/icons/Help'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Auth from './Auth/Auth'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import Tab from '@material-ui/core/Tab'
// import Tabs from '@material-ui/core/Tabs'
// import Tooltip from '@material-ui/core/Tooltip'
// import Typography from '@material-ui/core/Typography'

import Toolbar from '@material-ui/core/Toolbar'
import { withStyles, Theme } from '@material-ui/core/styles'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = (theme: Theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  signUpButton: {
    marginRight: theme.spacing(1),
  },
})

type Props = {
  classes: {
    secondaryBar: string
    button: string
    avatar?: string
    iconButtonAvatar: string
    link: string
    menuButton: string
    signUpButton: string
  }
  onDrawerToggle: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}
function Header(props: Props) {
  const {
    // styling
    classes,
    // state
    onDrawerToggle,
    // auth stuff below
  } = props

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Auth isSignedIn={true} user={null} isPerformingAuthAction={false} performAuthAction={console.log} />
            {/* <Grid item>
              <Typography className={classes.link} component="a">
                Go to docs
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alters">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
            <Grid item>
              {/* <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
              </IconButton> */}
              {/* {isSignedIn ? (
                <React.Fragment>
                </React.Fragment>
              ) : (
                <React.Fragment>
                </React.Fragment>
              )} */}
              'placeholder'
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default withStyles(styles)(Header)
