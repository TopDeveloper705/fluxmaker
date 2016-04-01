import interopRequire from 'interop-require';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default ({ application }) => {
  const webpackPath = application.pathTo('webpack.config');
  const webpackConfig = interopRequire(webpackPath);

  return (callback) => {
    new WebpackDevServer(webpack(webpackConfig), {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      quiet: true,
      proxy: {
        '*': { target: 'http://localhost:3001' }
      }
    }).listen(application.config.port, callback);
  };
};
