export default {
  name: 'time',

  read(req, resource, params, config, callback) {
    const time = (new Date()).toDateString();

    callback(null, `It is ${time} now.`);
  }
};
