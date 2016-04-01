import path from 'path';

import webpack from 'webpack';

export default (root) => {
  const pathTo = path.join.bind(null, root);

  return {
    resolve: {
      extensions: ['', '.js']
    },
    entry: [
      pathTo('app', 'client', 'index.js')
    ],
    output: {
      path: pathTo('build', 'js'),
      publicPath: '/public/js/',
      filename: 'main.min.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: [
            require.resolve('babel-loader')
          ]
        },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    node: {
      setImmediate: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    devtool: 'source-map'
  };
};
