export const generateObjectFromList = <T extends ReadonlyArray<string>>(
  list: T,
) =>
  list.reduce(
    (map, current) => {
      return { ...map, [current]: current };
    },
    {} as { [K in (typeof list)[number]]: K },
  );

export const isPromise = <T>(value: any): value is Promise<T> => {
  if (
    value !== null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  ) {
    return true;
  }

  return false;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
