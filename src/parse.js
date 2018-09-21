// @flow
import { Transform } from 'stream';

const cache = [];
const result = [];

const parse = new Transform({
  transform(chunk, encoding, callback) {
    const word = chunk.toString();

    cache.push(word);

    if (cache.length === 3) {
      result.push(cache.slice(0, 3).join(' '));
      cache.shift();
    }

    result.map(el => this.push(el));
    callback();
  },
});

export default parse;
