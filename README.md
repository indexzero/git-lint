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

## Rules

* `autocrlf`: Ensures that line endings are correctly set by `git` (source: [Dealing with line endings](https://help.github.com/articles/dealing-with-line-endings/))

##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
##### LICENSE: MIT
