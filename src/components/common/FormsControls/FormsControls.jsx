import React from 'react';
import styles from './FormsControls.module.css'

// const FormControl = ({ input, meta, el, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   const Tag = React.createElement(el, {...input, ...props})

//   return (
//     <div className={styles.formControl + " " + (hasError && styles.error)}>
//       {Tag}
//       {hasError && <span>{meta.error}</span>}

//     </div>
//   )
// }

// export const Textarea = (props) => {
//   return (
//     <FormControl {...props} el={"textarea"}></FormControl>
//   )
// }

// export const Input = (props) => {
//   return (
//     <FormControl {...props} el={"input"}></FormControl>
//   )
// }


const FormControl = Element => ({ input, meta, ...props }) => {
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
