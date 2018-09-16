// @flow
import { Transform } from 'stream';

const splitIntoSeq = (str) => {
  const result = str.split(' ');
  let tmp = [];

  return result.reduce((p, c, i) => {
    if (i !== 0 && i % 3 === 0) {
      p.push(tmp.join(' '));
      tmp = [];
    }
    tmp.push(c);

    return p;
  }, []);
};

const parse = new Transform({
  transform(chunk, encoding, callback) {
    splitIntoSeq(chunk.toString())
      .map(el => this.push(el));

    callback();
  },
});

export default parse;
