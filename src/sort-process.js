// @flow
/* eslint-disable */
import { Transform } from 'stream';

const sortAndProcess = new Transform({
  transform(chunk, encoding, callback) {
    const result = chunk.toString();

    callback();
  }
});

export default sortAndProcess;
