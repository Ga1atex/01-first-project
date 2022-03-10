import React from 'react';
import { BaseFieldProps, GenericFieldHTMLAttributes, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css';

// type FormControlPropsType = {
//   // input: WrappedFieldInputProps,
//   input: object,
//   meta: WrappedFieldMetaProps,
//   elem: string | React.FunctionComponent | React.ComponentClass
// }

// const FormControl: React.VFC<FormControlPropsType> = ({ input, meta, elem, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   const Tag = React.createElement(elem, {...input, ...props})

//   return (
//     <div className={styles.formControl + " " + (hasError && styles.error)}>
//       {Tag}
//       {hasError && <span>{meta.error}</span>}

//     </div>
//   )
// }

// export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//   return (
//     <FormControl {...props} elem={"textarea"}/>
//   )
// }
// export const Input: React.FC<WrappedFieldProps> = (props) => {
//   return (
//     <FormControl {...props} elem={"input"}/>
//   )
// }

const FormControl = (Element: string | React.ComponentType) => ({ meta, input, ...props }: WrappedFieldProps & GenericFieldHTMLAttributes & BaseFieldProps) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <Element {...input} {...props} />
      {hasError && <span> {meta.error} </span>}
    </div>
  );
};

export const Textarea = FormControl("textarea");
export const Input = FormControl("input");
