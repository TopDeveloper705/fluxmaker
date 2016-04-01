import Promise from 'bluebird';

export default (application) => {
  return application.database.sync({ force: true });
};
