import '@babel/polyfill';
import fs from 'fs';
import es from 'event-stream'; // a node event toolkit library
import preprocess from './preprocess';
import parse from './parse';
import ProcessSequences from './process-sequences';
import SortAndFilter from './sort-filter';
import { validateFilenames } from './utils';

const main = () => {
  // handle stdin
  if (!process.stdin.isTTY) {
    return process.stdin
      .pipe(preprocess) // preprocess
      .pipe(parse) // parse text into three word sequences
      .pipe(new ProcessSequences()) // create map of sequence with counts
      .pipe(new SortAndFilter()); // sort, filter, return results
  }

  const [, , ...args] = process.argv;
  const filenames = validateFilenames(args);
  // handle file(s) as input(s)
  try {
    const streams = filenames.map(file => fs.createReadStream(
      file,
      { encoding: 'utf8', highWaterMark: 1024 },
    )); // process files in chunks of 1024 bytes

    es.merge(streams)
      .pipe(preprocess) // preprocess
      .pipe(parse) // parse text into three word sequences
      .pipe(new ProcessSequences()) // create map of sequence with counts
      .pipe(new SortAndFilter()); // sort, filter, return results
  } catch (e) {
    console.log(e); // TODO Log somewhere useful
    process.exit(1); // if anything goes wrong, exit the program
  }
};

main();
