import React from 'react'
// import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CourseAutoComplete from './CourseAutoComplete'
// import TextField from '@material-ui/core/TextField'
import NativeSelect from './NativeSelect'
import CustomTextField from './CustomTextField'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import initialValues from './initialValues'

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

interface State {
  name: string
  age: string
  multiline: string
  currency: string
}
function makeLabelValueArray(strs: string[]) {
  return strs.map((str) => ({
    label: str,
    value: str,
  }))
}
const NewReview: (args: { path?: string }) => JSX.Element = () => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      console.log({ values })
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 5000)
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
        name="Program"
        required
        optionArray={makeLabelValueArray(['OMSCS', 'OMSA'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="Semester"
        required
        optionArray={makeLabelValueArray(['Summer 2019', 'Fall 2019', 'Spring 2019', 'Fall 2018'])}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="Rating"
        required
        optionArray={makeLabelValueArray(['Strong Dislike', 'Dislike', 'Neutral', 'Like', 'LOVE!'].reverse())}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <NativeSelect
        className={classes.textField}
        name="Difficulty"
        required
        optionArray={makeLabelValueArray(['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'].reverse())}
        onChange={(e) => console.log(e.target.value)}
        formik={formik}
      />
      <CustomTextField
        id="standard-number"
        label="Workload (hrs/week)"
        name="Workload"
        required
        type="number"
        className={classes.textField}
        formik={formik}
      />
      {/* <TextField
    id="standard-name"
    label="Name"
    className={classes.textField}
    value={values.name}
    onChange={handleChange('name')}
    margin="normal"
  />
  <TextField
    id="standard-multiline-flexible"
    label="Multiline"
    multiline
    rowsMax="4"
    value={values.multiline}
    onChange={handleChange('multiline')}
    className={classes.textField}
    margin="normal"
  />
  <TextField
    id="standard-multiline-static"
    label="Multiline"
    multiline
    rows="4"
    defaultValue="Default Value"
    className={classes.textField}
    margin="normal"
  />
  <TextField
    id="standard-helperText"
    label="Helper text"
    defaultValue="Default Value"
    className={classes.textField}
    helperText="Some important text"
    margin="normal"
  />
  <TextField
    id="standard-with-placeholder"
    label="With placeholder"
    placeholder="Placeholder"
    className={classes.textField}
    margin="normal"
  />
  <TextField
    id="standard-textarea"
    label="With placeholder multiline"
    placeholder={`placoleder`}
    multiline
    className={classes.textField}
    margin="normal"
  />
  <TextField
    id="standard-search"
    label="Search field"
    type="search"
    className={classes.textField}
    margin="normal"
  />

  <TextField
    id="standard-full-width"
    label="Label"
    style={{ margin: 8 }}
    placeholder="Placeholder"
    helperText="Full width!"
    fullWidth
    margin="normal"
    InputLabelProps={{
      shrink: true,
    }}
  />
  <TextField
    id="standard-bare"
    className={classes.textField}
    defaultValue="Bare"
    margin="normal"
    inputProps={{ 'aria-label': 'bare' }}
  /> */}

      {/* <button type="submit">Submit</button> */}
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
        //  className={classes.button}
      >
        Submit
      </Button>
      <div>submitting {JSON.stringify(formik.isSubmitting)}</div>
    </form>
  )
}
export default NewReview
