import factorySequelize from 'factory-girl-sequelize';

export default ({ application, testHelper }) => {
  if(!testHelper.factory) {
    return;
  }

  testHelper.factory.setAdapter(factorySequelize());
}
