import { ErrorMessage, FieldProps, FormikFormProps, FormikProps } from 'formik';
import React from 'react';
import styles from './FormsControls.module.css';

function isKeyInObject(obj: Record<string, any>, key: string) {
  const path = key.split('.');
  let newObj = { ...obj }
  // going through possible nested objects
  path.forEach((pathKey) => {
    if (newObj)
    newObj = newObj[pathKey]
  })

  return newObj === undefined ? false : newObj;
}
const FormControl = (Element: string | React.FC<React.HTMLProps<HTMLInputElement>>) => (props: FieldProps & React.HTMLProps<HTMLInputElement> ) => {
  const touched = isKeyInObject(props.form.touched, props.field.name);
  const error = isKeyInObject(props.form.errors, props.field.name);
  const hasError = touched && error

  // const hasError = props.form.touched[props.field.name] && props.form.errors[props.field.name]

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      {/* <div className={styles.formControl}> */}
      <Element placeholder={props.placeholder} type={props.type} {...props.field} />
      {/* {hasError && <span> {props.form.errors[props.field.name]} </span>} */}
      <ErrorMessage name={props.field.name} className={styles.error} component={'span'} />
    </div>
  );
};

export const Textarea = FormControl("textarea");
export const Input = FormControl("input");
