import { ErrorMessage } from 'formik';
import React from 'react';
import styles from './FormsControls.module.css';

const FormControl = (Element: string | React.ComponentType) => (props: any) => {
  // const hasError = props.form.touched && props.form.status?.errors;
  // const hasError = props.form.touched && Object.keys(props.form.errors).length !== 0;

  return (
    // <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
    <div className={styles.formControl}>
      <Element placeholder={props.placeholder} type={props.type} {...props.field}/>
      {/* {hasError && <span> {props.form.errors[props.field.name]} </span>} */}
      <ErrorMessage name={props.field.name} className={styles.red} component={'span'}/>
    </div>
  );
};

export const Textarea = FormControl("textarea");
export const Input = FormControl("input");
