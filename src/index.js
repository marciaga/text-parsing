#!/usr/bin/env node
// @flow
import parser from './parse';

const main = () => {
  const [,, ...args] = process.argv;

  const result = parser();

  console.log(`Working with ${args}`);

  return result;
};

main();
