import nodemon from './nodemon';
import devServer from './devServer';

export function loadDefaultTasks(cli) {
  cli.task('nodemon', nodemon(cli));
  cli.task('devServer', devServer(cli));
}

export function executeTask(cli) {
  const argv = process.argv.slice(2);

  cli.gulp.start(argv[0]);
}

export function loadPipelines({ application, gulp }) {
  const { assets } = application.config;

  const cssPaths = application.pathTo('app', 'styles', assets.css.entry);
  const css = [() => gulp.src(cssPath)];

  application.on('assets:post', (application, cli) => {
    cli.pipeline('css', (files) => {
      const gulp = cli.gulp;
      const cssDest = application.pathTo('build', 'css');

      return files.pipe(gulp.dest(cssDest));
    });
  });

  application.on('assets:close', (application, cli) => {
    cli.task('css:build', () => {
      cli._pipelines.css.reduce((pipe) => {

      });
    });
  });

  return {
    css
  };
}
