export default () => ({
  hot: true,
  historyApiFallback: true,
  quiet: true,
  proxy: {
    '*': { target: 'http://localhost:3001' }
  }
});
