import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
type Option<T extends string | string[]> = {
  label: string
  value: T
}
type GFP = ReturnType<typeof useFormik>['getFieldProps']
type NSProps<T extends string | string[]> = {
  className?: string
  optionArray: Option<T>[]
  helperText?: string
  name: string
  id?: string
  required?: boolean
  formik: { getFieldProps: GFP }
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void
}
export default function NativeSelect<T extends string | string[]>(props: NSProps<T>) {
  const [field, meta] = props.formik.getFieldProps({ name: props.name })
  return (
    <>
      <TextField
        id={props.id}
        select
        required={props.required}
        label={props.name}
        className={props.className}
        // value={field.value}
        // onChange={props.onChange}
        {...field}
        SelectProps={{
          native: true,
          // MenuProps: {
          //   className: classes.menu,
          // },
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
