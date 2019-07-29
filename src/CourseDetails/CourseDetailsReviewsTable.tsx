import React from 'react'
import MaterialTable from 'material-table'
// import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import ReactMarkdown from 'react-markdown'

import firebase from 'firebase/app'

// import { useObjectVal } from 'react-firebase-hooks/database'
import { Review } from '../types'

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

function ReviewsTable({ reviewIDs }: { reviewIDs: string[] }) {
  const [data, setData] = React.useState([] as any)
  React.useEffect(() => {
    ;(async function() {
      const _data = await Promise.all(
        reviewIDs.map(async (reviewID: string) => {
          const potato: any = await firebase
            .database()
            .ref('reviews/' + reviewID)
            .once('value')
          const data: Review = potato.val()
          if (!data) {
            console.error('Missing review', { reviewID })
            return null
          }
          return {
            reviewID,
            Date: new Intl.DateTimeFormat('default').format(data.created),
            Semester: data.semester,
            Rating: data.rating || 'N/A',
            Difficulty: data.difficulty,
            Workload: data.workload,
            FullReview: data.text,
            ShortReview: data.text
              .replace('#', '')
              .trim()
              .slice(0, 20),
          }
        }),
      )
      setData(_data.filter(Boolean))
    })()
  }, [reviewIDs])
  if (!data.length) return null
  return (
    <MaterialTable
      title="Course Details"
      columns={[
        { title: 'Date', field: 'Date', type: 'string' },
        { title: 'Semester', field: 'Semester', type: 'string', defaultGroupOrder: 0, defaultGroupSort: 'desc' },
        { title: 'Rating', field: 'Rating', type: 'numeric' },
        { title: 'Difficulty', field: 'Difficulty', type: 'numeric' },
        { title: 'Workload', field: 'Workload', type: 'numeric' },
        { title: 'ShortReview', field: 'ShortReview', type: 'string', grouping: false },
        { title: 'FullReview', field: 'FullReview', type: 'string', hidden: true, grouping: false },
        { title: 'reviewID', field: 'reviewId', type: 'string', hidden: true, grouping: false },
      ]}
      data={data}
      detailPanel={(review) => {
        console.log({ review })
        if (!review) {
          console.error('Missing review', review.reviewID)
          return <div>missing review</div>
        }
        // return <div>sldkjsldkjslkj</div>
        return <ReactMarkdown source={review.FullReview} />
      }}
      options={{
        filtering: true,
        pageSize: Math.min(data.length, 100),
        searchFieldStyle: {
          fontSize: '0.8rem',
        },
        rowStyle: {
          padding: 5,
        },
        grouping: true,
        padding: 'dense',
        exportButton: true,
      }}
    />
  )
}

// function round(num: number) {
//   return Math.round(num * 10) / 10
// }

export default ReviewsTable
