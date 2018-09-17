# marciaga-coding-exercise
Stackery coding exercise

## Steps to Run

### Ensure your current Node version is >=8 (tested on 8.12.0)

### Install dependencies using `yarn`:
```
$ yarn
```

### Build the application:
```
$ yarn build
```

### Run the application -
#### from stdin:
```
$ cat file.txt | yarn start
```

#### from file(s):
```
$ yarn start file1.txt file2.txt
```

## Run the tests
```
$ yarn test
```

## Run the static typechecker
```
$ yarn flow
```

Write a program that meets the following requirements:

The program can be written in any language but should be easy to run.

It should accept as arguments a list of one or more file paths (e.g. ./solution file1.txt file2.txt ...). The program also accepts input on stdin (e.g. cat file1.txt | ./solution).

The program outputs a list of the 100 most common three word sequences in the text, along with a count of how many times each occurred in the text.

For example:

231 - i will not
116 - i do not
105 - there is no
54 - i know not
37 - i am not
...


The program ignores punctuation, line endings, and is case insensitive (e.g. "I love\nsandwiches." should be treated the same as "(I LOVE SANDWICHES!!)")

The program is capable of processing large files and runs as fast as possible.
