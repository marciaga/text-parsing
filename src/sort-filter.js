// @flow
import { Transform } from 'stream';
/*
  output: 100 most common three word sequences
  output format: 231 - i will not
*/
const sortAndFilter = new Transform({
  transform(chunk, encoding, callback) {
    this.push();
    callback();
  },
});

export default sortAndFilter;
