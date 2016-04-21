import interopRequire from 'interop-require';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default ({ application }) => {
  const webpackPath = application.pathTo('webpack.config');
  const webpackConfig = interopRequire(webpackPath);

  return (callback) => {
    const publicPath = {
      publicPath: webpackConfig.output.publicPath
    };

    new WebpackDevServer(webpack(webpackConfig), {
      ...publicPath,
      ...application.config.devServer
    }).listen(application.config.port, callback);
  };
};
