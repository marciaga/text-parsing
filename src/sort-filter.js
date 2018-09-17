import { Writable } from 'stream';
import { getObjectKVOrBoth } from './utils';

class SortAndFilter extends Writable <{ sortAry: Array<{}> }> {
  constructor(options) {
    super(options);

    this.sortAry = [];
  }

  _write(chunk, encoding, callback) {
    this.sortAry.push(JSON.parse(chunk));
    callback();
  }

  _final(callback) {
    this.sortAndFilter();
    this.formatOutput();

    console.log('\nProcess completed.');
    callback();
    process.exit(0);
  }

  formatOutput() {
    this.sortAry = this.sortAry.splice(0, 100);

    this.sortAry.forEach((item) => {
      const { key, value } = getObjectKVOrBoth(item, { type: 'both' });
      console.log(`${value} - ${key}`);
    });
  }

  sortAndFilter() {
    const sorter = (a, b) => {
      const aVal = getObjectKVOrBoth(a, { type: 'value' });
      const bVal = getObjectKVOrBoth(b, { type: 'value' });

      return bVal - aVal;
    };

    return this.sortAry.sort(sorter);
  }
}

export default SortAndFilter;
