export default {
  name: 'ServerPlugin',
  initializer: function ServerPluginInitializer(application) {
    return () => {
      const {
        _server,
        middlewares
      } = application.server;

      _server.use(middlewares);

      return Promise.resolve();
    };
  }
};
