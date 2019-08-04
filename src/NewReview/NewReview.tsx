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

const initialValues = {
  program: 'OMSCS',
  semester: 'Summer 2019',
  // rating: 'Neutral' as 'Strong Dislike' | 'Dislike' | 'Neutral' | 'Like' | 'LOVE!',
  rating: 2,
  workload: undefined as number | undefined,
  difficulty: 2,
  // difficulty: 'Medium' as 'Very Easy' | 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | undefined,
  course: undefined as undefined | string,
}
const difficultyMap = {
  'Very Easy': 1,
  Easy: 2,
  Medium: 3,
  Hard: 4,
  'Very Hard': 5,
}
const ratingMap = { 'Strong Dislike': 1, Dislike: 1, Neutral: 1, Like: 1, 'LOVE!': 1 }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
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

function makeLabelValueArray(strs: string[]) {
  return strs.map((str) => ({
    label: str,
    value: str,
  }))
}
function makeLabelValueArray2(strs: string[]) {
  return strs.map((str, i) => ({
    label: str,
    value: i,
  }))
}
const NewReview: (args: { path?: string }) => JSX.Element = () => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues,
    onSubmit: (values /*actions*/) => {
      const { difficulty, rating, ..._newReview } = values
      const newReview: Review = _newReview
      // if (!difficulty) throw new Error('invalid difficulty setting')
      // if (!rating) throw new Error('invalid rating setting')
      newReview.difficulty = Number(difficulty)
      newReview.rating = Number(rating)

      console.log({ newReview, values })
      // setTimeout(() => {
      //   // alert(JSON.stringify(values, null, 2))
      //   actions.setSubmitting(false)
      // }, 5000)
    },
  })
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
        optionArray={makeLabelValueArray(['OMSCS', 'OMSA'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="semester"
        label="Semester"
        required
        optionArray={makeLabelValueArray(['Summer 2019', 'Fall 2019', 'Spring 2019', 'Fall 2018'])}
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
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
      >
        Submit
      </Button>
      <div>submitting {JSON.stringify(formik.isSubmitting)}</div>
    </form>
  )
}
export default NewReview
