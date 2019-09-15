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
import NewReview from './Review/NewReview'
import YourReview from './Review/YourReview'
import { User } from 'firebase'

// import { AuthProvider } from './unused_Auth/AuthContext'
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
  user: User
}

function Paperbase(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { classes, user } = props
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const [isSignedIn, setisSignedIn] = React.useState(false)

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
          <Header user={user} onDrawerToggle={handleDrawerToggle} />
          <main className={classes.mainContent}>
            <Router>
              <CourseList path="/" />
              <About path="/about"></About>
              <CourseList path="/courses" />
              <CourseDetails path="courses/:courseID" />
              <NewReview user={user} path="/reviews/new" />
              <YourReview user={user} path="/reviews" />
              <NotFound default />
            </Router>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

function About({  }: { path: string }) {
  return (
    <div>
      <h1>About</h1>
      <div>
        This is a simple about page. we dont have much yet. If you can contribute, we really need your feedback and
        help, on <a href="https://github.com/OMSCentral/omscentral-react">the GitHub repo</a>.
      </div>
    </div>
  )
}

export default withStyles(styles)(Paperbase)
