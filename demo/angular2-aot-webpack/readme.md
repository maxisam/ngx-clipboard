# Angular 2 AOT (Ahead Of Time) offline compilation example with Webpack
[![Dependency Status](https://david-dm.org/blacksonic/angular2-aot-webpack.svg)](https://david-dm.org/blacksonic/angular2-aot-webpack)
[![devDependency Status](https://david-dm.org/blacksonic/angular2-aot-webpack/dev-status.svg)](https://david-dm.org/blacksonic/angular2-aot-webpack?type=dev)

This repository shows how to use the Angular 2 command line offline compiler ```ngc``` with Webpack.
Additionally it shows an alternative to ```ngc``` with ```@ngtools/webpack``` plugin used in the Angular CLI.

The application consists of a basic component (```src/app/components/hello-world.component.ts```) 
and a module (```src/app/modules/main.module.ts```).

When the application starts (```npm start```) 
it generates the compiled files next to the modules and the components(```*.ngfactory.ts```).

There is a different entry point for the non compiled(```src/app/bootstrap.ts```)
and AOT compiled application(```src/app/bootstrap.aot.ts```).

The difference between the development and production version is minification with UglifyJS.
Both development and production builds create the AOT compiled files.

The application is bundled with Webpack from the bootstrap files and is available on ```http://localhost:9000```.
You can change between the different builds with commenting/uncommenting entry files in ```src/index.html```.

### Starting the application

There are two modes for the application.

Using the command line tool ```ngc``` for compilation is the default one 
and can be started with ```npm start```. It bundles once and watches for file changes with ```chokidar``` 
and re-runs the compilation on change.

The second one is using the ```@ngtools/webpack``` loader plugin for compilation
and can be started with ```npm run start-plugin```. It uses ```webpack-dev-server``` and 
live reloads on every file change.

### Known issues

- [AOT related issues](https://github.com/angular/angular/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20aot)
- [AOT Webpack plugin related issues](https://github.com/angular/angular-cli/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20aot)
- Unmet dependencies when ```npm install```: delete the ```node_modules``` directory and do a clean install.

### Further reading

- [Ahead-of-Time Compilation - official](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
- [Ahead-of-Time Compilation in Angular 2](http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/)
- [Building an Angular 2 Application for Production](http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/)
- [Demystifying Ahead-Of-Time Compilation In Angular 2](http://slides.com/wassimchegham/demystifying-ahead-of-time-compilation-in-angular-2-aot-jit)

### Starters with AOT compilation available

- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular 2 Seed](https://github.com/mgechev/angular-seed)
- [Angular 2 Universal Starter](https://github.com/angular/universal-starter)
