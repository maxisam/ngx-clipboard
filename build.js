"use strict";

// ShellJS.
require('shelljs/global');

// Colors.
const chalk = require('chalk');


echo('Start building...');


/* Cleans aot & dist folders */
rm('-Rf', 'aot/*');
rm('-Rf', 'dist/*');


/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
echo('Start TSLint');

exec('tslint ./src/**/*.ts -e ./src/**/*.ngfactory.ts');

echo(chalk.green('TSLint completed'));


/* Aot compilation */
echo('Start AoT compilation');
if (exec(`ngc -p tsconfig-build.json`).code !== 0) {
    echo(chalk.red(`Error: AoT compilation failed`));
    exit(1);
}
echo(chalk.green('AoT compilation completed'));

/* Creates umd bundle */
echo('Start bundling');
echo('rollup -c rollup.config.js');

exec('rollup -c rollup.config.js');

echo(chalk.green('Bundling completed'));


/* Minimizes umd bundle */
echo('Start minification');

exec('uglifyjs ./dist/bundles/ngxClipboard.umd.js -o ./dist/bundles/ngxClipboard.umd.min.js');

echo(chalk.green('Minification completed'));


/* Copies files */
/*cp('-Rf', ['package.json', 'LICENSE', 'README.md'], 'dist');*/


echo('End building');