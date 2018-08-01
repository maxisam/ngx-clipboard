[![travis build](https://img.shields.io/travis/maxisam/ngx-clipboard.svg?style=flat-square)](https://travis-ci.org/maxisam/ngx-clipboard)
[![npm](https://img.shields.io/npm/dt/ngx-clipboard.svg?style=flat-square)](https://www.npmjs.com/package/ngx-clipboard)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-clipboard.svg?style=flat-square)](https://github.com/maxisam/ngx-clipboard/releases)
[![npm](https://img.shields.io/npm/l/ngx-clipboard.svg?style=flat-square)]()

# ngx-clipboard , F.K.A [angular2-clipboard](https://www.npmjs.com/package/angular2-clipboard)

From 6.0.0, there is no other JS dependency anymore. Just Angular.

It works with angular version 2.0.0 and up

To make more sense with the future versioning scheme of Angular, the directive selector is now rename to **ngxClipboard**

## Dependencies

* Angular >=6.0.0

If you need to use it on 2.x, please use version 7.x.x.
If you need to use it on 4.x, please use version 8.x.x.
If you need to use it on 5.x, please use version 10.x.x.

The code are pretty much the same, in 8.0.0 it uses InjectionToken which requires angular4 and above.

## Install

You can get it on npm.

```
npm install ngx-clipboard --save
```

## Build project

```
1. npm i

2. npm run build
```

To run demo code locally

`npm run start`

## Usage

If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
  map: {
    'ngx-clipboard': 'node_modules/ngx-clipboard'
  }
});
```

This library support 2 kinds of copy source.

You can either set

```
[cbContent]="'target string'"
```

Or

```
[ngxClipboard]="inputTarget"
```

Or

You can just use copyFromContent from clipboard.service to copy any text you dynamically created.

**PLEASE CHECK WITH PLUNKER FIRST**

## Example

[stackblitz.com](https://stackblitz.com/github/maxisam/ngx-clipboard)

## Contributing

1.  Your commits conform to the conventions established [here](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)

## Troubleshooting

Kudos to

[Thierry Templier](http://stackoverflow.com/a/36330518/667767) This project is inspired by his answer on StackOverflow.

The core function is ported from [clipboard.js](http://zenorocha.github.io/clipboard.js/) by [@zenorocha](https://twitter.com/zenorocha).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.


### Shoutouts 🙏
<img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" height="80" title="BrowserStack Logo" alt="BrowserStack Logo" /> 

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.
