import React from 'react'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Navigator from './Navigator'
import CourseList from './CourseList'
import CourseDetails from './CourseDetails/CourseDetails'
import Header from './Header'
import NotFound from './NotFound'
import NewReview from './NewReview/NewReview'
import { useLoading } from '@swyx/hooks'
import './App.css'

import { Router } from '@reach/router'

let theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
}

const drawerWidth = 256

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as flexDirection,
  },
  mainContent: {
    flex: 1,
    // padding: "48px 36px 0",
    padding: '1rem',
    background: '#eaeff1',
  },
}

type flexDirection =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  | undefined
type Props = {
  classes: {
    root: string
    drawer: string
    appContent: string
    mainContent: string
  }
}
function Paperbase(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { classes } = props
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const [isSignedIn, setisSignedIn] = React.useState(false)
  // const [isPerformingAuthAction, setisPerformingAuthAction] = React.useState(false)
  const [isPerformingAuthAction, performAuthAction] = useLoading()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            // isSignedIn={isSignedIn}
            // isPerformingAuthAction={isPerformingAuthAction}
            // user={user}
            // onSignUpClick={() => setsignUpDialog(true)}
            // onSignInClick={() => setsignInDialog(true)}
            // onSettingsClick={() => setsettingsDialog(true)}
            // onSignOutClick={() => setsignoutDialog(true)}
          />
          <main className={classes.mainContent}>
            <Router>
              <CourseList path="/" />
              <CourseList path="/courses" />
              <CourseDetails path="courses/:courseID" />
              <NewReview path="/reviews/new" />
              <NotFound default />
            </Router>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Paperbase)
