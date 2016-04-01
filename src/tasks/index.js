import nodemon from './nodemon';
import devServer from './devServer';

export default function loadDefaultTasks(cli) {
  cli.task('nodemon', nodemon(cli));
  cli.task('devServer', devServer(cli));
}
