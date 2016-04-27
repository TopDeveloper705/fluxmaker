import Promise from 'bluebird';
import sass from 'gulp-sass';

export default function SASSInitializer(application) {
  application.on('assets:pre', ({ application, cli }) => {
    cli.pipeline('css', (files) => {
      return files.pipe(sass().on('error', sass.logError));
    });
  });

  return () => Promise.resolve();
}
