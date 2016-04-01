export default ({ application, gulp }) => {
  const glob = application.pathTo('app', 'styles', '**', '*.css');

  return () => {
    gulp.watch(glob, ['cssBuild']);
  };
};
