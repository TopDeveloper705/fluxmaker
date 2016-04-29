export default (config, application) => {
  if(typeof config === 'object') {
    return config[application.env];
  }

  return config(application);
};
