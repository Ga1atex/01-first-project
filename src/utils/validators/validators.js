export const required = (value) => {
  if (!value) {
    return 'Field is required'
  }
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Must be ${maxLength} characters or less`;
  }
}
