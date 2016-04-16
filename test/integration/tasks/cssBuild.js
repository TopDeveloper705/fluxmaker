import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import chalk from 'chalk';

import processors from './postcssProcessors';

export default ({ application, gulp }) => {
  const main = application.pathTo('app', 'styles', 'main.css');
  const dest = application.pathTo('build', 'css');

  return () => {
    return gulp.src(main)
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .on('error', errorHandler)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest));
  };
};

function errorHandler(error) {
  notify.onError({
    title: 'PostCSS Error!',
    message: 'Check your terminal for more information.'
  })(error);

  console.log(chalk.cyan('Message: ') + chalk.red(error.message));

  this.emit('end');
};
