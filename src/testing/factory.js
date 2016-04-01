import Promise from 'bluebird';

import factoryGirl from 'factory-girl';
import factorySequelize from 'factory-girl-sequelize';

const factory = factoryGirl.promisify(Promise);

factorySequelize();

export default factory;
