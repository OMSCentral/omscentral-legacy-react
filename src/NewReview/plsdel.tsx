import React from 'react'
import { useFormik } from 'formik'

type Props = {
  label: string
  name: string
  type: string
  formik: {
    getFieldProps: ReturnType<typeof useFormik>['getFieldProps']
  }
}
const MyTextField = ({ label, formik, ...props }: Props) => {
  const [field, meta] = formik.getFieldProps(props)
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  )
}

const Example = () => {
  const formik = useFormik({
    initialValues: { email: '', firstName: 'red', lastName: '' },
    onSubmit: (values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    },
  })
  return (
    <div>
      <h1>My Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <MyTextField formik={formik} name="firstName" type="text" label="First Name" />
        <MyTextField formik={formik} name="lastName" type="text" label="Last Name" />
        <MyTextField formik={formik} name="email" type="email" label="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Example
