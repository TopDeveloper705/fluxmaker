import eslint from 'gulp-eslint';

export default ({ application, gulp }) => {
  const glob = application.pathTo('app', '**', '*.{js,jsx}');

  return () => {
    return gulp.src(glob)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  };
};
