// @flow
import path from 'path';

type objParams = { type: string };
type objMainParam = { [string]: number };

export const getObjectKVOrBoth = (
  obj: objMainParam = {},
  { type }: objParams,
): any => {
  const result = Object.entries(obj).pop();
  if (!result) {
    return 0;
  }

  switch (type) {
    case 'both':
      return {
        key: result[0],
        value: result[1],
      };
    case 'key':
      return result[0];
    case 'value':
      return result[1];
    default:
      return {};
  }
};
// verifies that the path is absolute. Further validations could be included
export const validateFilenames = (ary:string[] = []): string[] =>
  ary.filter(filename => !path.isAbsolute(filename));
