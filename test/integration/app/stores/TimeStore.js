import BaseStore from 'fluxible/addons/BaseStore';

import { Actions } from '../constants';

class TimeStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.currentTime = '';
  }

  updateTime(currentTime) {
    this.currentTime = currentTime;
    this.emitChange();
  }

  dehydrate() {
    return {
      currentTime: this.currentTime
    };
  }

  rehydrate(state) {
    this.currentTime = state.currentTime;
  }
}

TimeStore.storeName = 'TimeStore';

TimeStore.handlers = {
  [Actions.UPDATE_TIME]: 'updateTime'
};

export default TimeStore;
