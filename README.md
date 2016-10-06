[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![travis build](https://img.shields.io/travis/maxisam/angular2-clipboard.svg?style=flat-square)](https://travis-ci.org/maxisam/angular2-clipboard)
[![npm](https://img.shields.io/npm/dt/angular2-clipboard.svg?style=flat-square)](https://www.npmjs.com/package/angular2-clipboard)
[![GitHub release](https://img.shields.io/github/release/maxisam/angular2-clipboard.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/angular2-clipboard.svg?style=flat-square)]()

# angular2-clipboard

 Angular2  directive for [clipboard.js](http://zenorocha.github.io/clipboard.js/) by [@zenorocha](https://twitter.com/zenorocha)

## Dependencies

+ Angular 2
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


## Troubleshooting

If you see the following error message.

`Import assignment cannot be used when targeting ECMAScript 2015 modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.`

Please check if the module setting in tsconfig.json is set to `commonjs`

Kudos to [Thierry Templier](http://stackoverflow.com/a/36330518/667767) This project is base on his answer on StackOverflow