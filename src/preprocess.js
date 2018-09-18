// @flow
import { Transform } from 'stream';
// matches most relevant punctuation
const re = /[.,\/#!$%\^&\*;:{}=\-_`~()?<>\|\\\[\]+"@]/g; // eslint-disable-line

const preprocess = new Transform({
  transform(chunk, encoding, callback) {
    // ensure no punctuation, newlines, or empty spaces are present & the output is case-insensitive
    const result = chunk.toString()
      .replace(re, ' ')
      .replace(/[\n\r]+|[\s]{2,}/g, ' ')
      .toLowerCase();

    this.push(result);
    callback();
  },
});

export default preprocess;
