[![travis build](https://img.shields.io/travis/maxisam/ngx-clipboard.svg?style=flat-square)](https://travis-ci.org/maxisam/ngx-clipboard)
[![npm](https://img.shields.io/npm/dt/ngx-clipboard.svg?style=flat-square)](https://www.npmjs.com/package/ngx-clipboard)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-clipboard.svg?style=flat-square)](https://github.com/maxisam/ngx-clipboard/releases)
[![npm](https://img.shields.io/npm/l/ngx-clipboard.svg?style=flat-square)]()

# ngx-clipboard , F.K.A [angular2-clipboard](https://www.npmjs.com/package/angular2-clipboard)

From 6.0.0, there is no other JS dependency anymore. Just Angular.

It works with angular version 2.0.0 and up

To make more sense with the future versioning scheme of Angular, the directive selector is now rename to **ngxClipboard**

## Other packages

-   [ngx-progressive-image-loader](https://github.com/maxisam/ngx-progressive-image-loader): it can lazy load img/picture, prevent reflow and seo friendly.

## Dependencies

-   Angular >=6.0.0

If you need to use it on 2.x, please use version 7.x.x.
If you need to use it on 4.x, please use version 8.x.x.
If you need to use it on 5.x, please use version 10.x.x.

The code are pretty much the same, in 8.0.0 it uses InjectionToken which requires angular4 and above.

## Install

You can get it on npm.

```bat
npm install ngx-clipboard --save
```

Open your module file e.g `app.module.ts` and update **imports** array

```ts
import { ClipboardModule } from 'ngx-clipboard';
...
imports: [
...
    ClipboardModule,
...
]
```

## Usage

If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ngx-clipboard': 'node_modules/ngx-clipboard'
    }
});
```

### Copy source

This library support multiple kinds of copy source.

-   Setting `cbContent` attribute

```html
<button ngxClipboard [cbContent]="'target string'">Copy</button>
```

You can assign the parent container to avoid focus trapper issue, #145

```html
<div #container>
  <button ngxClipboard [cbContent]="'target string'" [container]="container">Copy</button>
</div>
```

-   Setting an input target

```html
....

<input type="text" #inputTarget>

<button [ngxClipboard]="inputTarget">Copy</button>
```

-   Using `copyFromContent` from `ClipboardService` to copy any text you dynamically created.

```ts
import { ClipboardService } from 'ngx-clipboard'

...

constructor(private _clipboardService: ClipboardService){
...
}

copy(text: string){
  this._clipboardService.copyFromContent(text)
}
```

### Callbacks

-   `cbOnSuccess` callback attribute is triggered after copy was successful with `$event: {isSuccess: true, content: string}`

```html
<button (cbOnSuccess) = "copied($event)" [cbContent]="'example string'">Copied</button>
```

Or updating parameters directly like so

```html
<button (cbOnSuccess) = "isCopied = true" [cbContent]="'example string'">Copied</button>
```

-   `cbOnError` callback attribute is triggered when there's failure in copying with `$event:{isSuccess: false}`

## Example

[stackblitz.com](https://stackblitz.com/github/maxisam/ngx-clipboard)

## Build project

```
1. npm i

2. npm run build
```

To run demo code locally

`npm run start`

## Contributing

-   Your commits conform to the conventions established [here](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)

## Troubleshooting

Please ask your general questions at https://stackoverflow.com/questions/tagged/ngx-clipboard

## Shoutouts 🙏

Kudos to

[Thierry Templier](http://stackoverflow.com/a/36330518/667767) This project is inspired by his answer on StackOverflow.

The core function is ported from [clipboard.js](http://zenorocha.github.io/clipboard.js/) by [@zenorocha](https://twitter.com/zenorocha).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

<img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" height="80" title="BrowserStack Logo" alt="BrowserStack Logo" />

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.
