#!/usr/bin/env node
// @flow
import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import es from 'event-stream'; // a node event toolkit library
import preprocess from './preprocess';
import parse from './parse';
import processSequences from './process-sequences';
import sortAndFilter from './sort-filter';
import { validateFilenames } from './utils';

const main = () => {
  const pathPrefix = path.resolve(__dirname, '..');
  const [, , ...args] = process.argv;
  const filenames = validateFilenames(args)
    .map(filename => `${pathPrefix}/${filename}`);

  try {
    const streams = filenames.map(file => fs.createReadStream(
      file,
      { encoding: 'utf8', highWaterMark: 1024 },
    )); // process files in chunks of 1024 bytes

    es.merge(streams)
      .on('end', () => {
        console.log('Processing complete!');
        process.exit(0);
      })
      .pipe(preprocess) // preprocess
      .pipe(parse) // parse text into three word sequences
      .pipe(processSequences) // create map of sequence with counts
      .pipe(sortAndFilter) // sort map by value and return the first 100 elments
      .pipe(process.stdout);
  } catch (e) {
    console.log(e); // TODO Log somewhere useful
    // TODO would it be better to continue parsing or exit?
    process.exit(1); // if anything goes wrong, exit the program
  }
};

main();
