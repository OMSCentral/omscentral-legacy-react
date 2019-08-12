import React from 'react'
import clsx from 'clsx'
import { withStyles, Theme } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer, { DrawerProps } from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import { Link } from '@reach/router'

// import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual"
// import PublicIcon from "@material-ui/icons/Public"
// import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet"
// import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent"
// import TimerIcon from "@material-ui/icons/Timer"
// import SettingsIcon from "@material-ui/icons/Settings"
// import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup"

const categories = [
  {
    id: 'Reviews',
    children: [
      { id: 'Write a Review', route: 'reviews/new', icon: <PeopleIcon /> },
      { id: 'Your Reviews', route: 'reviews', icon: <DnsRoundedIcon /> },
      // { id: "Storage", icon: <PermMediaOutlinedIcon /> },
      // { id: "Hosting", icon: <PublicIcon /> },
      // { id: "Functions", icon: <SettingsEthernetIcon /> },
      // { id: "ML Kit", icon: <SettingsInputComponentIcon /> }
    ],
  },
  // {
  //   id: "Quality",
  //   children: [
  //     { id: "Analytics", icon: <SettingsIcon /> },
  //     { id: "Performance", icon: <TimerIcon /> },
  //     { id: "Test Lab", icon: <PhonelinkSetupIcon /> }
  //   ]
  // }
]

const styles = (theme: Theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
})

type Props = {
  classes: {
    firebase: string
    item: string
    itemCategory: string
    itemPrimary: string
    categoryHeaderPrimary: string
    categoryHeader: string
    divider: string
    itemActiveItem: string
    itemIcon: string
  }
}
function Navigator(props: Props & DrawerProps) {
  const { classes, ...other } = props

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Link to={'courses'}>
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>OMSCentral</ListItem>
        </Link>
        <Link to={'courses'}>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Courses
            </ListItemText>
          </ListItem>
        </Link>

        {categories.map(({ id, children }) => {
          const isCourseActive = window.location.pathname.slice(1).startsWith('courses')
          return (
            <React.Fragment key={id}>
              <ListItem className={clsx(classes.categoryHeader, isCourseActive && classes.itemActiveItem)}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>

              {children.map(({ id: childId, icon, route }) => {
                const isActive = window.location.pathname.slice(1).startsWith(route)
                // console.log({ route, isActive, class: classes.itemActiveItem })
                return (
                  <Link key={childId} to={route}>
                    <ListItem button key={childId} className={clsx(classes.item, isActive && classes.itemActiveItem)}>
                      <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary,
                        }}
                      >
                        {childId}
                      </ListItemText>
                    </ListItem>
                  </Link>
                )
              })}

              <Divider className={classes.divider} />
            </React.Fragment>
          )
        })}
        <Link to={'about'}>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              About
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default withStyles(styles)(Navigator)
