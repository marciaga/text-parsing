// @flow
import { Transform } from 'stream';
// matches punctuation, newlines
const re = /[.,\/#!$%\^&\*;:{}=\-_`~()?<>\|\\\[\]+"@]|\n/g; // eslint-disable-line

const preprocess = new Transform({
  transform(chunk, encoding, callback) {
    // ensure no punctuation, newlines are present and that the output is case-insensitive
    const result = chunk.toString().replace(re, '').toLowerCase();
    this.push(result);
    callback();
  },
});

export default preprocess;
