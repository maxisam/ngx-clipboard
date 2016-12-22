[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![travis build](https://img.shields.io/travis/maxisam/angular2-clipboard.svg?style=flat-square)](https://travis-ci.org/maxisam/angular2-clipboard)
[![npm](https://img.shields.io/npm/dt/angular2-clipboard.svg?style=flat-square)](https://www.npmjs.com/package/angular2-clipboard)
[![GitHub release](https://img.shields.io/github/release/maxisam/angular2-clipboard.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/angular2-clipboard.svg?style=flat-square)]()

# angular2-clipboard

Angular directive for [clipboard.js](http://zenorocha.github.io/clipboard.js/) by [@zenorocha](https://twitter.com/zenorocha)

It works with angular version 2.0.0 and up

To make more sense with the future versioning scheme of Angular, the directive selector is now rename to **xngClipboard**

## Dependencies

+ Angular ~2.0.0
+ [clipboard.js](https://clipboardjs.com/)

## Install

You can get it on npm.

```
npm install angular2-clipboard --save
```

## Build project

```
1. npm i

2. npm run build
```

## Example

[plunker](http://embed.plnkr.co/PD4Ap8/)


## Contributing 

1. Your commits conform to the conventions established [here](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)
2. This project used [commitizen](https://github.com/commitizen/cz-cli) and [semantic-release](https://github.com/semantic-release/semantic-release) to handle npm version from CI
    + run git add first to add your changes to staging 
    + use `npm run commit` to commit, and CI will do the rest.
    + if changes contain breaking change, use `BREAKING CHANGE` keyword in the comment to trigger major release
    + before push to git and trigger CI, you can dry run `npm run semantic-release` locally to make sure the version number is push as expected.

## Troubleshooting

1. If you use webpack, check `/demo/webpack`. Try to use the same version of webpack that demo used, if you run into any error.

2. If you don't need AoT support, you can stick with 1.4.0. 2.x is just trying to solve AoT issue.

Kudos to [Thierry Templier](http://stackoverflow.com/a/36330518/667767) This project is base on his answer on StackOverflow
