[![Financial Contributors on Open Collective](https://opencollective.com/ngx-clipboard/all/badge.svg?label=financial+contributors)](https://opencollective.com/ngx-clipboard)
[![ngx-clipboard](https://github.com/maxisam/ngx-clipboard/actions/workflows/ngx-clipboard.yml/badge.svg)](https://github.com/maxisam/ngx-clipboard/actions/workflows/ngx-clipboard.yml)
[![npm](https://img.shields.io/npm/dt/ngx-clipboard.svg?style=flat-square)](https://www.npmjs.com/package/ngx-clipboard)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-clipboard.svg?style=flat-square)](https://github.com/maxisam/ngx-clipboard/releases)
[![npm](https://img.shields.io/npm/l/ngx-clipboard.svg?style=flat-square)]()

# ngx-clipboard , F.K.A [angular2-clipboard](https://www.npmjs.com/package/angular2-clipboard)

From 6.0.0, there is no other JS dependency anymore. Just Angular.

It works with angular version 2.0.0 and up

To make more sense with the future versioning scheme of Angular, the directive selector is now rename to **ngxClipboard**

## Dependencies

-   If you need to use it on 2.x, please use version 7.x.x.
-   If you need to use it on 4.x, please use version 8.x.x.
-   If you need to use it on 5.x, please use version 10.x.x.
-   If you need to use it on 8.x, please use version 12.x.x.
-   If you need to use it on 9.x, please use version 13.x.x.
-   If you need to use it on 10.x - 12.x, please use version 14.0.2.
-   If you need to use it on 13.x, please use version 15.x.x. (Also thanks https://github.com/arturovt for updating & tuning)

The code are pretty much the same, in v8.0.0 it uses InjectionToken which requires angular4 and above.

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

You can assign the parent **container** to avoid focus trapper issue, #145

```html
<div #container>
    <button ngxClipboard [cbContent]="'target string'" [container]="container">Copy</button>
</div>
```

-   Setting an input target

```html
....

<input type="text" #inputTarget />

<button [ngxClipboard]="inputTarget">Copy</button>
```

-   Using `copy` from `ClipboardService` to copy any text you dynamically created.

```ts
import { ClipboardService } from 'ngx-clipboard'

...

constructor(private _clipboardService: ClipboardService){
...
}

copy(text: string){
  this._clipboardService.copy(text)
}
```

### Callbacks

-   `cbOnSuccess` callback attribute is triggered after copy was successful with `$event: {isSuccess: true, content: string}`

```html
<button (cbOnSuccess)="copied($event)" [cbContent]="'example string'">Copied</button>
```

Or updating parameters directly like so

```html
<button (cbOnSuccess)="isCopied = true" [cbContent]="'example string'">Copied</button>
```

-   `cbOnError` callback attribute is triggered when there's failure in copying with `$event:{isSuccess: false}`

### Conditionally render host

You can also use the structural directive \*ngxClipboardIfSupported to conditionally render the host element

```html
<button ngxClipboard *ngxClipboardIfSupported [cbContent]="'target string'" (cbOnSuccess)="isCopied = true">
    Copy
</button>
```

_Special thanks to @surajpoddar16 for implementing this feature_

### Handle copy response globally

To handle copy response globally, you can subscribe to `copyResponse$` exposed by the `ClipboardService`

```
export class ClipboardResponseService {
  constructor(
    private _clipboardService: ClipboardService,
    private _toasterService: ToasterService
  ) {
    this.handleClipboardResponse();
  }

  handleClipboardResponse() {
    this._clipboardService.copyResponse$.subscribe((res: IClipboardResponse) => {
      if (res.isSuccess) {
        this._toasterService.pop('success', undefined, res.successMessage);
      }
    });
  }
}
```

_Special thanks to @surajpoddar16 for implementing this feature_

### Clean up temporary textarea used by this module after each copy to clipboard

This library creates a textarea element at the root of the body for its internal use. By default it only destroys it when the directive is destroyed. If you'd like it to be destroyed after each copy to clipboard, provide root level module configuration like this:

```ts
ClipboardService.configure({ cleanUpAfterCopy: true });
```

Special thanks to [@DmitryEfimenko](https://github.com/DmitryEfimenko) for implementing this feature

## Example

[stackblitz.com](https://stackblitz.com/github/maxisam/ngx-clipboard)

## Build project

```cmd
npm i && npm run build
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

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.

<img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" height="80" title="BrowserStack Logo" alt="BrowserStack Logo" />

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/maxisam/ngx-clipboard/graphs/contributors"><img src="https://opencollective.com/ngx-clipboard/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/ngx-clipboard/contribute)]

#### Individuals

<a href="https://opencollective.com/ngx-clipboard"><img src="https://opencollective.com/ngx-clipboard/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/ngx-clipboard/contribute)]

<a href="https://opencollective.com/ngx-clipboard/organization/0/website"><img src="https://opencollective.com/ngx-clipboard/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/1/website"><img src="https://opencollective.com/ngx-clipboard/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/2/website"><img src="https://opencollective.com/ngx-clipboard/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/3/website"><img src="https://opencollective.com/ngx-clipboard/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/4/website"><img src="https://opencollective.com/ngx-clipboard/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/5/website"><img src="https://opencollective.com/ngx-clipboard/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/6/website"><img src="https://opencollective.com/ngx-clipboard/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/7/website"><img src="https://opencollective.com/ngx-clipboard/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/8/website"><img src="https://opencollective.com/ngx-clipboard/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/ngx-clipboard/organization/9/website"><img src="https://opencollective.com/ngx-clipboard/organization/9/avatar.svg"></a>
