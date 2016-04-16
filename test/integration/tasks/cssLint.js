import stylelint from 'gulp-stylelint';
import reporter from 'gulp-stylelint-console-reporter';

export default ({ application, gulp }) => {
  const glob = application.pathTo('app', 'styles', '**', '*.css');

  return () => {
    return gulp.src(glob)
      .pipe(stylelint({
        reporters: [
          reporter()
        ]
      }));
  };
};
