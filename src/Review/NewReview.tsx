import React from 'react'
// import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CourseAutoComplete from './CourseAutoComplete'
// import TextField from '@material-ui/core/TextField'
import NativeSelect from './NativeSelect'
import CustomTextField from './CustomTextField'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import { Review } from '../reviews'
import firebase from 'firebase/app'
import { User } from 'firebase'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import ReactMarkdown from 'react-markdown'

/**
 *
 *
 * note: there are a lot of fields left yet to be implemented
 *
 * TODO
 *
 */

const initialValues: Review = {
  program: 1,
  semester: '2019-2',
  rating: 3,
  workload: undefined,
  difficulty: 3,
  course: undefined,
  text: '',
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }),
)

const ChoosableSemesters = [
  { label: 'Fall 2018', value: '2018-3' },
  { label: 'Spring 2019', value: '2019-1' },
  { label: 'Summer 2019', value: '2019-2' },
  { label: 'Fall 2019', value: '2019-3' },
]

function makeLabelValueArray2(strs: string[]) {
  return strs.map((str, i) => ({
    label: str,
    value: i + 1,
  }))
}
const NewReview: (args: { path?: string; user: User }) => JSX.Element = ({ user }) => {
  const classes = useStyles()

  const formik = useFormik<Review>({
    initialValues,
    onSubmit: (values /*actions*/) => {
      if (!values.difficulty) throw new Error('invalid difficulty setting')
      if (!values.rating) throw new Error('invalid rating setting')
      if (!values.course) throw new Error('must select course')
      // https://github.com/martzcodes/OMSCentral/blob/7cf5bab68a58ae7774b6c6d5ed288a3af2944845/src/app/authed-reviews/authed-review.service.ts#L27
      const newReview: Review = {
        created: new Date().getTime(),
        updated: new Date().getTime(),
        author: user.uid,
        course: values.course.split(':')[0],
        difficulty: Number(values.difficulty),
        semester: values.semester,
        text: values.text,
        workload: values.workload,
        rating: Number(values.rating),
        program: values.program,
        proctortrack: values.proctortrack || '',
        firstCourse: values.firstCourse || '',
        previousClasses: values.previousClasses,
        projects: values.projects,
        groupProjects: values.groupProjects,
        tests: values.tests,
        extraCredit: values.extraCredit || '',
        moneySpent: values.moneySpent,
        frontLoad: values.frontLoad || '',
      }
      // clear keys that are undefined
      Object.entries(newReview).forEach(([k, v]) => {
        if (typeof v === 'undefined') {
          delete newReview[k]
        }
      })
      console.log({ newReview, values })

      const newReviewRef = firebase
        .database()
        .ref('/reviews/')
        .push(newReview)
      console.log({ newReviewRef })
      alert('Review submitted successfully!')
      formik.resetForm()
      // setTimeout(() => {
      //   // alert(JSON.stringify(values, null, 2))
      //   actions.setSubmitting(false)
      // }, 5000)
    },
  })
  const [reviewField, reviewMeta] = formik.getFieldProps({ name: 'text' })
  return (
    <form onSubmit={formik.handleSubmit} className={classes.container} noValidate autoComplete="off">
      <CourseAutoComplete
        className={classes.textField}
        onChange={(value) => {
          formik.setFieldValue('course', value)
        }}
      />
      <NativeSelect
        className={classes.textField}
        name="program"
        label="Program (OMSCS or OMSA)"
        required
        optionArray={makeLabelValueArray2(['OMSCS', 'OMSA'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="semester"
        label="Semester"
        required
        optionArray={ChoosableSemesters}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="rating"
        label="Rating"
        required
        optionArray={makeLabelValueArray2(['Strong Dislike', 'Dislike', 'Neutral', 'Like', 'LOVE!'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="difficulty"
        label="Difficulty"
        required
        optionArray={makeLabelValueArray2(['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <CustomTextField
        id="standard-number"
        label="Workload (hrs/week)"
        name="workload"
        required
        type="number"
        className={classes.textField}
        formik={formik}
      />
      <h3>Review (Required)</h3>
      <p>
        Remember: You can use Markdown to format your review! (
        <a href="https://en.wikipedia.org/wiki/Markdown#Example">What is Markdown?</a>)
      </p>
      <div style={{ display: 'flex', width: '100%' }}>
        <TextareaAutosize
          style={{ width: '60%', fontSize: '1rem' }}
          className={classes.textField}
          aria-label="full text of your review"
          rows={10}
          required
          placeholder={`Write your review here, you can use Markdown! Example:
        
# Review Headline

I loved this course!

## Course Material

my review of course material

## Workload / Group Work / projects

i got lucky with group work and learned a lot!

## This course is for...

People who are super into Computational Journalism
        `}
          {...reviewField}
        />
        <div>
          <ReactMarkdown source={reviewField.value || `*A preview of your markdown will appear here!*`} />
        </div>
      </div>
      {reviewMeta.touched && reviewMeta.error ? <div className="error">{reviewMeta.error}</div> : null}
      <hr />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
      >
        Submit
      </Button>
      <Button
        type="button"
        color="secondary"
        onClick={() => {
          if (window.confirm('are you sure you want to reset the form?')) {
            formik.resetForm()
          }
        }}
      >
        Reset
      </Button>
      <div>submitting {JSON.stringify(formik.isSubmitting)}</div>
    </form>
  )
}
export default NewReview
