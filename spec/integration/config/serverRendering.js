import serverRenderingMiddleware from '../app/middlewares/serverRendering';

export default (application) => ({
  middleware: serverRenderingMiddleware(application)
});
