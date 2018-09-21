// @flow
import { Transform } from 'stream';
// matches most relevant punctuation
const re = /[.,\/#!$%\^&\*;:{}=\-_`~()?<>\|\\\[\]+"@]/g; // eslint-disable-line

const preprocess = new Transform({
  transform(chunk, encoding, callback) {
    // ensure no punctuation, newlines, or empty spaces are present & the output is case-insensitive
    chunk.toString()
      .replace(re, ' ')
      .replace(/[\n\r]+|[\s]{2,}/g, ' ')
      .toLowerCase()
      .split(' ')
      .filter(entry => entry.trim() !== '')
      .map(el => this.push(el));

    callback();
  },
});

export default preprocess;
