/*globals document*/

import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';

import pages from '../routes';
import ApplicationStore from '../stores/ApplicationStore';
import Nav from './Nav';

class Application extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) {
      return;
    }
    document.title = newProps.pageTitle;
  }

  render() {
    var Handler = this.props.currentRoute.handler;

    return (
      <div>
        <Nav currentRoute={this.props.currentRoute} links={pages} />
        <Handler />
      </div>
    );
  }
}

export default provideContext(handleHistory(connectToStores(
  Application,
  [ApplicationStore],
  (context, props) => {
    var appStore = context.getStore(ApplicationStore);
    return {
      pageTitle: appStore.getPageTitle()
    };
  }
)));
