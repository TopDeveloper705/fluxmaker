import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOM from 'react-dom/server';

import { createElementWithContext } from 'fluxible-addons-react';
import { navigateAction } from 'fluxible-router';

import Html from '../components/Html';

export default ({ env, flux, log }) => {

  return (req, res, next) => {
    const context = flux.createContext();

    log('info', `Executing navigate action '${ req.url }'`);
    context.getActionContext().executeAction(navigateAction, {
      url: req.url
    }, (err) => {
      if (err) {
        if (err.statusCode && err.statusCode === 404) {
          next();
        } else {
          next(err);
        }
        return;
      }

      log('info', 'Exposing context state');
      const exposed = `window.App=${serialize(flux.dehydrate(context))};`;

      log('info', 'Rendering Application component into html');
      const markup = ReactDOM.renderToString(createElementWithContext(context));

      const htmlElement = React.createElement(Html, {
        clientFile: env === 'production' ? 'main.min.js' : 'main.js',
        context: context.getComponentContext(),
        state: exposed,
        markup: markup
      });

      const html = ReactDOM.renderToStaticMarkup(htmlElement);

      log('info', 'Sending markup');
      res.type('html');
      res.write(`<!DOCTYPE html>${html}`);
      res.end();
    });
  };
};
