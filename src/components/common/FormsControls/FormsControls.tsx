import { ErrorMessage, FieldProps } from 'formik';
import React from 'react';
import isKeyInObject from '../../../utils/helpers/isKeyInObj';
import styles from './FormsControls.module.scss';

const FormControl = (Element: string | React.FC<React.HTMLProps<HTMLInputElement>>) => (props: FieldProps & React.HTMLProps<HTMLInputElement>) => {
  const { form, field, placeholder, type, ...restProps } = props;

  const touched = isKeyInObject(form.touched, field.name);
  const error = isKeyInObject(form.errors, field.name);
  const hasError = touched && error

  // const hasError = form.touched[field.name] && form.errors[field.name]

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      {/* <div className={styles.formControl}> */}
      <Element placeholder={placeholder} type={type} {...field} {...restProps} />
      {/* {hasError && <span> {form.errors[field.name]} </span>} */}
      <ErrorMessage name={field.name} className={styles.error} component={'span'} />
    </div>
  );
};

export const Textarea = FormControl("textarea");
export const Input = FormControl("input");
