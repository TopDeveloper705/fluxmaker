import nodemon from 'gulp-nodemon';

export default ({ application }) => {
  return () => {
    const port = process.env.PORT || 3001;

    nodemon({
      script: application.pathTo('start.js'),
      exec: 'babel-node',
      ext: 'js jsx',
      env: {
        PORT: port,
        NODE_ENV: 'development'
      },
      tasks: ['devServer']
    });

    application.log(`Webpack Dev Server listening on port ${ port }`);
  };
};
