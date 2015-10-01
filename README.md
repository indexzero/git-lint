# git-lint

Lint gitconfig files for fun and profit

## Usage

``` js
var gitLint = require('git-lint');

gitLint(function (err) {
  if (err) {
    console.dir(err);
    return process.exit(1);
  }

  console.log('git-lint ok!');
});
```

##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
##### LICENSE: MIT
