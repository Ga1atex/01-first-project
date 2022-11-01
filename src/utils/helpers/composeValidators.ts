export const composeValidators =
  (...args: Array<(value: any) => string | undefined>) =>
  (value: any) => {
    for (const validator of args) {
      const error = validator(value);

      if (error) {
        return error;
      }
    }

    return undefined;
  };
