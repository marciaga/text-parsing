import test from 'ava';
import path from 'path';
import { validateFilenames } from '../src/utils';

test('validateFilenames', (t) => {
  let ary = [path.resolve(__dirname, 'file.txt')];

  const result = validateFilenames(ary);

  t.deepEqual(result, []);

  ary = [];

  t.deepEqual(validateFilenames(ary), []);
});
