import React from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Course } from "./type"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  })
)

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

function SimpleTable({ courses }: { courses: { [key: string]: Course } }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell align="right">Department</TableCell>
            <TableCell align="right">Number</TableCell> */}
            <TableCell align="right">Reviews</TableCell>
            <TableCell align="right">Avg. Difficulty</TableCell>
            <TableCell align="right">Avg. Rating</TableCell>
            <TableCell align="right">Avg. Workload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(courses).map((key: string) => {
            const course = courses[key]
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell>{course.name}</TableCell>
                {/* <TableCell align="right">{course.department}</TableCell>
                <TableCell align="right">{course.number}</TableCell> */}
                <TableCell align="right">{course.reviews ? Object.keys(course.reviews).length : 0}</TableCell>
                <TableCell align="right">{round(course.average.difficulty)}</TableCell>
                <TableCell align="right">{round(course.average.rating)}</TableCell>
                <TableCell align="right">{round(course.average.workload)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

function round(num: number) {
  return Math.round(num * 10) / 10
}

export default SimpleTable
