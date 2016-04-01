import dotenv from 'dotenv/config';
import runServer from './app/server';

export default runServer({
  root: __dirname
});
