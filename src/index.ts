#!/usr/bin/env node
import './polyfills';
import * as commander from 'commander';
import chalk from 'chalk';
import {Scanner} from './scanner';
import fs = require('fs')
const mkdirp = require('mkdirp');

commander.version('1.0.5').description('Angular analyzer');


commander.command('scan <modulePath> <savePath>').description('Scan an angular project')
    .action((modulePath, savePath) => {
        const effectiveSavePath = savePath + '/angelyzer_report/';
        console.log(chalk.red(`
     ___   ___     _   _____    ______   _      __    __  ______   ______   _____   
    /   | |   \\   | | |  ___|  |  ____| | |     \\ \\  / / |  ____| |  ____| |  __  |
   / /| | | |\\ \\  | | | |  __  | |__    | |      \\ \\/ /   \\ \\     | |__    | |__| |
  / /_| | | | \\ \\ | | | | |  | |  __|   | |       \\  /     \\ \\    |  __|   | |__ '
 /  __  | | |  \\ \\| | | |__| | | |____  | |____   / /    ___\\ \\   | |____  | |  \\ \\
/_/   |_| |_|   \\___| |______| |______| |______| /_/    |______|  |______| |_|   \\_\\
`));
        console.log(chalk.white('Angular project analyzer @author: Yacine MEDDAH <my.meddah@gmail.com>'))
        console.log(chalk.yellow(`Scanning ${modulePath}`));
        mkdirp.sync(effectiveSavePath);
        const scanner = new Scanner();
        fs.readdir(modulePath, (err, files) => scanner.scanPath(files, modulePath, effectiveSavePath));
    });

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);