import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'

type GFP = ReturnType<typeof useFormik>['getFieldProps']
type CTFProps = {
  className?: string
  helperText?: string
  name: string
  label?: string
  id?: string
  type: string
  required?: boolean
  formik: { getFieldProps: GFP }
}
export default function CustomTextField(props: CTFProps) {
  const [field, meta] = props.formik.getFieldProps({ name: props.name })
  return (
    <>
      <TextField
        id="standard-number"
        label={props.label}
        required={props.required}
        {...field}
        type={props.type}
        className={props.className}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  )
}
