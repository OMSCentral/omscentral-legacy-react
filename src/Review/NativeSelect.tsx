import React from 'react'
import TextField from '@material-ui/core/TextField'

// todo: using useFormik was a mistake, got to refactor back to <Formik> and useField
import { useFormik } from 'formik'
type Option<T extends number | string | string[]> = {
  label: string
  value: T
}
type GFP = ReturnType<typeof useFormik>['getFieldProps']
type NSProps<T extends number | string | string[]> = {
  className?: string
  optionArray: Option<T>[]
  helperText?: string
  name: string
  label?: string
  id?: string
  required?: boolean
  formik: { getFieldProps: GFP }
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void
}
export default function NativeSelect<T extends number | string | string[]>(props: NSProps<T>) {
  const [field, meta] = props.formik.getFieldProps({ name: props.name })
  return (
    <>
      <TextField
        id={props.id}
        select
        required={props.required}
        label={props.label || props.name}
        className={props.className}
        {...field}
        SelectProps={{
          native: true,
        }}
        helperText={props.helperText}
        margin="normal"
      >
        {props.optionArray.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  )
}
