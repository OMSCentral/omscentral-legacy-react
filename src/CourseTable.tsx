import React from 'react'
import MaterialTable from 'material-table'
import { Link } from '@reach/router'
import { Course } from './types'

function SimpleTable({ courses }: { courses: { [key: string]: Course } }) {
  return (
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
  )
}

function round(num: number) {
  return Math.round(num * 10) / 10
}

export default SimpleTable
