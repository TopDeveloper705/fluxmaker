export default (factory, { User }) => {
  factory.define('user', User, {
    username: factory.seq(n => `user_${n}`),
    email: factory.seq(n => `user_${n}@test.com`),
    password: factory.sequence()
  });
};
