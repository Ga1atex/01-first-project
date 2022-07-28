export const parseContactsLinkErrors = (messages: string[]) => {
  return messages.reduce((obj: Record<string, any>, item: string) => {
    const errorInputs = item.match(/(.*)\((\w+)->(\w+)\)/i);
    if (errorInputs && errorInputs.length) {
      const [errorMessage, errorGroup, errorInput] = [
        errorInputs[1].trim(),
        errorInputs[2].toLowerCase(),
        errorInputs[3].toLowerCase(),
      ];

      if (obj[errorGroup]) {
        obj[errorGroup][errorInput] = errorMessage;
      } else {
        obj[errorGroup] = {
          [errorInput]: errorMessage,
        };
      }
    }

    return obj;
  }, {});
};
