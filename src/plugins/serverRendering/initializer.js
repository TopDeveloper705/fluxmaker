import Promise from 'bluebird';

export default function ServerRenderingInitializer(application) {
  const { middleware } = application.config.serverRendering;

  if(!middleware) {
    const error = new Error('Server rendering middleware was not set');
    return () => Promise.reject(error);
  }

  application.server.middlewares.use(middleware);

  return () => Promise.resolve();
}
