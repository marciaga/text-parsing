import test from 'ava';
import path from 'path';
import { validateFilenames, getObjectKVOrBoth } from '../src/utils';

test('validateFilenames', (t) => {
  let ary = [path.resolve(__dirname, 'file.txt')];

  const result = validateFilenames(ary);

  t.deepEqual(result, []);

  ary = [];

  t.deepEqual(validateFilenames(ary), []);
});

test('getObjectKVOrBoth', (t) => {
  const obj = { 'cats are pretty awesome': 1337 };
  const a = getObjectKVOrBoth(obj, { type: 'both' });
  const b = getObjectKVOrBoth(obj, { type: 'key' });
  const c = getObjectKVOrBoth(obj, { type: 'value' });
  const d = getObjectKVOrBoth(obj, {});

  t.deepEqual(a, { key: 'cats are pretty awesome', value: 1337 });
  t.deepEqual(b, 'cats are pretty awesome');
  t.deepEqual(c, 1337);
  t.deepEqual(d, {});
});
