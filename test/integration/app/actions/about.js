import { Actions } from '../constants';

export default function aboutAction(context, payload, done) {
  context.service.read('time', {}, {}, (err, time) => {
    context.dispatch(Actions.UPDATE_TIME, time);

    done();
  });
}
