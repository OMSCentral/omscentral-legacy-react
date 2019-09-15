import React from 'react'
import { useFormik } from 'formik'

const BasicExample = () => {
  const formik = useFormik({
    initialValues: { name: 'jared' },
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
        <input
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          name="name"
        />
        {formik.errors.name && <div id="feedback">{formik.errors.name}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
