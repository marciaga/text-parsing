// @flow
import { Transform } from 'stream';

const cache = new Map();

const processSequences = new Transform({
  transform(chunk, encoding, callback) {
    let currentCount = 0;
    const sequence = `${chunk.toString()}`;
    // check map to see if sequence exists as a key
    const hasKey = cache.has(sequence);
    // if not add result to Map with value: 1
    if (!hasKey) {
      cache.set(sequence, 1);
    } else {
      currentCount = cache.get(sequence);
      cache.set(sequence, currentCount + 1);
    }

    const ct = !hasKey ? 1 : currentCount + 1;
    this.push(JSON.stringify({ [sequence]: ct }));
    callback();
  },
});

export default processSequences;
