import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

import TimeStore from '../stores/TimeStore';

class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <p>This is a description of the site. { this.props.currentTime }</p>
      </div>
    );
  }
}

export default connectToStores(
  About,
  [TimeStore],
  (context, props) => {
    const timeStore = context.getStore(TimeStore);

    return {
      currentTime: timeStore.currentTime
    };
  }
);
