export default function createCSSPipeline({ application, gulp }) {
  const { css: cssConfig } = application.config.assets;
  const cssPath = application.pathTo('app', 'styles', cssConfig.entry);
  const cssPipeline = [() => gulp.src(cssPath)];

  application.on('assets:post', saveBuildedCSS);
  application.on('assets:close', createCSSTask);

  return cssPipeline;
}

function saveBuildedCSS({ application, cli }) {
  cli.pipeline('css', (files) => {
    const gulp = cli.gulp;
    const cssDest = application.pathTo('build', 'css');

    return files.pipe(gulp.dest(cssDest));
  });
}

function createCSSTask({ application, cli }) {
  cli.task('css:build', () => {
    const begin = cli._pipelines.css.shift();
    cli._pipelines.css.reduce((files, pipe) => pipe(files), begin());
  });
}
