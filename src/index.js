#!/usr/bin/env node
// @flow
import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import preprocess from './preprocess';
import parse from './parse';
import sortAndProcess from './sort-process';
import { validateFilenames } from './utils';

const main = async () => {
  const pathPrefix = path.resolve(__dirname, '..');
  const [, , ...args] = process.argv;
  const filenames = validateFilenames(args)
    .map(filename => `${pathPrefix}/${filename}`);

  try {
    for (const file of filenames) {
      const readStream = fs.createReadStream(file,
        { encoding: 'utf8', highWaterMark: 1024 }); // process files in chunks of 1024 bytes

      readStream
        .pipe(preprocess) // preprocess
        .pipe(parse) // parse text into three word sequences
        .pipe(sortAndProcess) // sort map by value and return the first 100 elments
        .pipe(process.stdout);
    }

    process.exit(0); // successful execution
  } catch (e) {
    console.log(e); // TODO Log somewhere useful
    // TODO would it be better to continue parsing or exit?
    process.exit(1); // if anything goes wrong, exit the program
  }
};

main();
