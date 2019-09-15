import React from 'react'
import MaterialTable from 'material-table'
// import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router'
import { Course } from './types'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 650,
//     },
//   }),
// )

function SimpleTable({ courses }: { courses: { [key: string]: Course } }) {
  // const classes = useStyles()

  return (
    // <MuiThemeProvider theme={theme}>
    <MaterialTable
      title="Course Table"
      columns={[
        // { title: 'ID', field: 'ID', filtering: false },
        { title: 'ID', field: 'ID', type: 'string' },
        { title: 'Name', field: 'Name', type: 'string' },
        { title: 'Number', field: 'Number', type: 'string' },
        { title: 'Reviews', field: 'Reviews', filtering: false },
        { title: 'Avg. Difficulty', field: 'Difficulty', type: 'numeric', filtering: false },
        { title: 'Avg. Rating', field: 'Rating', type: 'numeric', filtering: false },
        { title: 'Avg. Workload', field: 'Workload', type: 'numeric', filtering: false },
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]}
      data={Object.entries(courses).map(([key, course]: [string, any]) => {
        return {
          ID: <Link to={`/courses/${key}`}>{key}</Link>,
          Name: course.name,
          Number: course.number,
          Reviews: course.reviews ? Object.keys(course.reviews).length : 0,
          Difficulty: round(course.average.difficulty),
          Rating: round(course.average.rating),
          Workload: round(course.average.workload),
        }
      })}
      options={{
        filtering: true,
        pageSize: 100,
        headerStyle: { position: 'sticky', top: 0 },
        maxBodyHeight: 650,
        searchFieldStyle: {
          fontSize: '0.8rem',
        },
        rowStyle: {
          padding: 5,
        },
        padding: 'dense',
      }}
    />
    // </MuiThemeProvider>
    // <Paper className={classes.root}>
    //   <Table className={classes.table}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>ID</TableCell>
    //         <TableCell>Name</TableCell>
    //         {/* <TableCell align="right">Department</TableCell>
    //         <TableCell align="right">Number</TableCell> */}
    //         <TableCell align="right">Reviews</TableCell>
    //         <TableCell align="right">Avg. Difficulty</TableCell>
    //         <TableCell align="right">Avg. Rating</TableCell>
    //         <TableCell align="right">Avg. Workload</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {Object.keys(courses).map((key: string) => {
    //         const course = courses[key]
    //         return (
    //           <TableRow key={key}>
    //             <TableCell component="th" scope="row">
    //               <Link to={`/courses/${key}`}>{key}</Link>
    //             </TableCell>
    //             <TableCell>{course.name}</TableCell>
    //             {/* <TableCell align="right">{course.department}</TableCell>
    //             <TableCell align="right">{course.number}</TableCell> */}
    //             <TableCell align="right">{course.reviews ? Object.keys(course.reviews).length : 0}</TableCell>
    //             <TableCell align="right">{round(course.average.difficulty)}</TableCell>
    //             <TableCell align="right">{round(course.average.rating)}</TableCell>
    //             <TableCell align="right">{round(course.average.workload)}</TableCell>
    //           </TableRow>
    //         )
    //       })}
    //     </TableBody>
    //   </Table>
    // </Paper>
  )
}

function round(num: number) {
  return Math.round(num * 10) / 10
}

export default SimpleTable
