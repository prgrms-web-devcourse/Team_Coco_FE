export const isArray = <T>(value: any): value is T[] => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: any) => {
  return Array.isArray(value) && value.length === 0;
};

export const isObject = (value: any): value is Record<string, any> => {
  const type = typeof value;
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  );
};

export const isEmptyObject = (value: any) => {
  return isObject(value) && Object.keys(value).length === 0;
};

export const isEmpty = (value: any): boolean => {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === "") return true;
  return false;
};
