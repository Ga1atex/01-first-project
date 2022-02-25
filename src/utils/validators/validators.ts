export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
  if (!value) {
    return 'Field is required'
  }
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
  if (value && value.length > maxLength) {
    return `Must be ${maxLength} characters or less`;
  }
}

// export const emailValidator = (values: any) => {
//   const errors: any = {};
//   if (values && !values.email) {
//     errors.email = 'Required';
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//   ) {
//     errors.email = 'Invalid email address';
//   }
//   return errors;
// }
