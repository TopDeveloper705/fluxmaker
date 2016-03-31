import databaseInitializer from '../initializers/databaseInitializer';

export default (server) => {
  return [ databaseInitializer(server) ];
};