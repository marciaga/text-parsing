import { Transform } from 'stream';

class ProcessSequences extends Transform {
  constructor(options) {
    super(options);

    this.cache = new Map();
  }

  _transform(chunk, encoding, callback) {
    let currentCount = 0;
    const sequence = `${chunk.toString()}`;
    // check map to see if sequence exists as a key
    const hasKey = this.cache.has(sequence);
    // if not add result to Map with value: 1
    if (!hasKey) {
      this.cache.set(sequence, 1);
    } else {
      currentCount = this.cache.get(sequence);
      this.cache.set(sequence, currentCount + 1);
    }
    callback();
  }

  _flush(done) {
    this.push(JSON.stringify([...this.cache]));
    done();
  }
}

export default ProcessSequences;
