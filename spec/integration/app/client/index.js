/*global document, window */

import ReactDOM from 'react-dom';
import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';

import flux from '../flux';

const debugClient = debug('dummyApp');
const dehydratedState = window.App; // Sent from the server

window.React = ReactDOM; // For Chrome DevTools support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

flux.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  window.context = context;
  const mountNode = document.getElementById('app');

  debugClient('React Rendering');
  ReactDOM.render(
    createElementWithContext(context),
    mountNode,
    () => debugClient('React Rendered')
  );
});
