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
