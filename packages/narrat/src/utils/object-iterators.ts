export const everyObject = <T>(
  object: T,
  predicate: (value: T[keyof T]) => boolean,
) => {
  for (const key in object) {
    if (!predicate(object[key])) {
      return false;
    }
  }
  return true;
};

export const someObject = <T>(
  object: T,
  predicate: (value: T[keyof T]) => boolean,
) => {
  for (const key in object) {
    if (predicate(object[key])) {
      return true;
    }
  }
};

export const mapObject = <T, U>(
  object: T,
  mapper: (value: T[keyof T]) => U,
) => {
  const result: { [key: string]: U } = {};
  for (const key in object) {
    result[key] = mapper(object[key]);
  }
  return result;
};

export const filterObject = <T>(
  object: T,
  predicate: (value: T[keyof T]) => boolean,
) => {
  const result: { [key: string]: T[keyof T] } = {};
  for (const key in object) {
    if (predicate(object[key])) {
      result[key] = object[key];
    }
  }
  return result;
};

export const deepEvery = <T>(
  object: T,
  predicate: (value: any, key: string | number, parent: any) => any,
) => {
  for (const key in object) {
    const value = object[key];
    predicate(value, key, object);
    if (typeof value === 'object' && value !== null) {
      deepEvery(value, predicate);
    }
  }
};
