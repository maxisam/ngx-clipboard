"use strict";

// ShellJS.
require('shelljs/global');

// Colors.
const chalk = require('chalk');


echo('before release...');
echo('copy package.json to dist');

rm('-Rf', 'dist/package.json');
cp('-Rf', 'package.json', 'dist');

echo(chalk.green('finish pre-release'));