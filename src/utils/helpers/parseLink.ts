export const parseLink = (str: string) => {
  let urlParts = str.match(/(https?:\/\/)?(www.)?(.*)/i);
  let link = urlParts![3];

  return `${urlParts![1] || 'https://'}www.${link}`;
};
