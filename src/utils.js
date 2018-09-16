// @flow
import path from 'path';

// verifies that the path is absolute. Further validations could be included
export const validateFilenames = (ary:string[] = []): string[] =>
  ary.filter(filename => !path.isAbsolute(filename));
