import nodemon from './nodemon';
import devServer from './devServer';

export { loadPipelines } from './pipelines';

export function loadDefaultTasks(cli) {
  cli.task('nodemon', nodemon(cli));
  cli.task('devServer', devServer(cli));
}

export function executeTask(cli) {
  const argv = process.argv.slice(2);

  cli.gulp.start(argv[0]);
}
