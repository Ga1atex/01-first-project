export default function isKeyInObject(obj: Record<string, any>, key: string) {
  const path = key.split('.');
  let newObj = { ...obj };
  // going through possible nested objects
  path.forEach((pathKey) => {
    if (newObj) newObj = newObj[pathKey];
  });

  return newObj === undefined ? false : newObj;
}
