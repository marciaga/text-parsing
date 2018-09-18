import { Writable } from 'stream';

class SortAndFilter extends Writable <{ sortAry: Array<{}> }> {
  constructor(options) {
    super(options);

    this.sortAry = [];
  }

  _write(chunk, encoding, callback) {
    this.sortAry = JSON.parse(chunk);
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
      const [key, value] = item;
      console.log(`${value} - ${key}`);
    });
  }

  sortAndFilter() {
    const sorter = (a, b) => {
      const aVal = a[1];
      const bVal = b[1];

      return bVal - aVal;
    };

    return this.sortAry.sort(sorter);
  }
}

export default SortAndFilter;
