import test from 'ava';

// TODO test with 0 files
// TODO test with 1 file
// TODO test with 100 large files

test('foo', (t) => {
  t.pass();
});

test('bar', async (t) => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});
