import React from 'react'
// import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import Tooltip from '@material-ui/core/Tooltip'
// import IconButton from '@material-ui/core/IconButton'
import { withStyles, Theme } from '@material-ui/core/styles'
// import SearchIcon from '@material-ui/icons/Search'
// import RefreshIcon from '@material-ui/icons/Refresh'
import firebase from 'firebase/app'
import { useObjectVal } from 'react-firebase-hooks/database'
import CourseDetailsReviewsTable from './CourseDetailsReviewsTable'
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
const styles = (theme: Theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  secondaryBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
})

type Props = {
  classes: {
    paper: string
    // searchBar: string
    block: string
    searchInput: string
    contentWrapper: string
    addUser: string
    secondaryBar: string
  }
  courseID?: string
  path?: string
}
function CourseDetails(props: Props) {
  const { classes, courseID } = props

  const { error, loading, value } = useObjectVal(firebase.database().ref('courses/' + courseID))
  // const temp = useObjectVal(firebase.database().ref("reviews/-LaBOOf9SCpk0Xl28kQI"))
  // const temp = useObjectVal(firebase.database().ref("reviews/-LBIlHqAvnrp2YRZvZzF"))
  if (!courseID) return <div>no courseid specified</div>
  // console.log({ value, temp })

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.secondaryBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/courses">
              Courses
            </Link>
            <Typography color="textPrimary">{courseID}</Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {/* <Typography color="textSecondary" align="center"> */}
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && value && (
          <div>
            <h1>
              {value.id}: {value.name}
            </h1>
            <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
              <li style={{ display: 'inline' }}>Difficulty: {round(value.average.difficulty)}</li>
              <li style={{ display: 'inline' }}>Rating: {round(value.average.rating)}</li>
              <li style={{ display: 'inline' }}>Workload: {round(value.average.workload)}</li>
            </ul>
            <CourseDetailsReviewsTable reviewIDs={Object.keys(value.reviews).sort((a, b) => (a > b ? -1 : 1))} />
          </div>
        )}
        {/* </Typography> */}
      </div>
      {/* <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
    </Paper>
  )
}

function round(num: number) {
  return Math.round(num * 10) / 10
}

export default withStyles(styles)(CourseDetails)
