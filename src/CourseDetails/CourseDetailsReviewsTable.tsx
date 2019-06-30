import React from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Link } from "@reach/router"
import firebase from "firebase/app"

import { useObjectVal } from "react-firebase-hooks/database"
import { Review } from "../types"

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

function ReviewsTable({ reviewIDs }: { reviewIDs: string[] }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right">Workload</TableCell>
            <TableCell align="right">Reviews</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewIDs.map((reviewID: string) => (
            <ReviewTableRow key={reviewID} reviewID={reviewID} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

function ReviewTableRow({ reviewID }: { reviewID: string }) {
  const { error, loading, value } = useObjectVal(firebase.database().ref("reviews/" + reviewID))
  const [showReview, setShowReview] = React.useState(false)

  if (loading)
    return (
      <TableRow key={reviewID}>
        <TableCell component="th" scope="row">
          loading...
        </TableCell>
      </TableRow>
    )
  if (error) {
    console.error({ error })
    return (
      <TableRow key={reviewID}>
        <TableCell component="th" scope="row">
          error
        </TableCell>
      </TableRow>
    )
  }
  let review = value as Review

  if (!review) {
    console.error("Missing review", { review, reviewID })
    return null
  }
  console.log({ review })
  return (
    <TableRow key={reviewID}>
      <TableCell component="th" scope="row">
        <Link to={`review/${reviewID}`}>{new Intl.DateTimeFormat("default").format(review.created)}</Link>
      </TableCell>
      <TableCell>{review.semester}</TableCell>
      <TableCell align="right">{review.rating || "N/A"}</TableCell>
      {/* <TableCell align="right">{round(course.average.difficulty)}</TableCell> */}
      <TableCell align="right">{review.difficulty}</TableCell>
      <TableCell align="right">{review.workload}</TableCell>
      <TableCell align="right">
        <button onClick={() => setShowReview(!showReview)}>{showReview ? "-" : "+"}</button>
        {!showReview ? review.text.slice(0, 20) : review.text}
      </TableCell>
    </TableRow>
  )
}

// function round(num: number) {
//   return Math.round(num * 10) / 10
// }

export default ReviewsTable
