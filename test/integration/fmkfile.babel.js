import dotenv from 'dotenv/config';
import gulp from 'gulp';
import { CLI } from 'fluxmaker';

import jsLint from './tasks/jsLint';
import cssLint from './tasks/cssLint';

import cssBuild from './tasks/cssBuild';
import cssWatch from './tasks/cssWatch';

import createApplication from './app/app';

const application = global.$app = createApplication({
  root: __dirname
});

const cli = new CLI({ application, gulp });

cli.task('jsLint', jsLint(cli));
cli.task('css:lint', cssLint(cli));
cli.task('lint', ['jsLint']);

cli.task('css:build', cssBuild(cli));
cli.task('css:watch', ['css:build'], cssWatch(cli));

cli.task('dev', ['devServer', 'nodemon']);

cli.start();
