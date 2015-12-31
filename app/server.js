import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import json from 'jsonfile';
import LayoutComponent from './components/Layout.jsx';
import ErrorComponent from './components/Error.jsx';
import app from './app';
// In order th enable sharing services between client and server, we need
// to make them available by registering services on the app
import registerServices from './config/services';

registerServices(app);

const server = express();

let assetsBasePath = '/assets/';
let gzip = false;

if (server.get('env') === 'testing' || server.get('env') === 'development') {
  server.use(assetsBasePath, express.static('./build'));
  server.use(require('connect-livereload')());
} else {
  // production mode
  const file = './production.json';
  const productionSettings = json.readFileSync(file);
  assetsBasePath = productionSettings.assets_base_url + productionSettings.assets_version + '/';
  gzip = true;
}

// Fetchr registration on the server, this enables us to share services between client and server
// Middleware Magic!
server.use(app.getPlugin('FetchrPlugin').getXhrPath(), app.getPlugin('FetchrPlugin').getMiddleware());

server.use(function(req, res /* , next */) {
  const context = app.createContext();
  const actionContext = context.getActionContext();

  actionContext.dispatch('SET_LOCALE', 'nl');
  actionContext.dispatch('ASSETS_PATH_LOAD', assetsBasePath);

  actionContext.executeAction(navigateAction, {url: req.url}, ( err ) => {
    if (err) {
      res.status(err.status ? err.status : '404').send('<!DOCTYPE html>\n' + ReactDOMServer.renderToStaticMarkup(<ErrorComponent/>));
      return;
    }
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    const Component = app.getComponent();
    const renderedBody = ReactDOMServer.renderToString(<Component context={context.getComponentContext()} />);

    const html = ReactDOMServer.renderToStaticMarkup(
      <LayoutComponent
        state={exposed}
        context={context.getComponentContext()}
        assetsBasePath={assetsBasePath}
        gzip={gzip}
        markup={renderedBody} />
    );

    res.send('<!DOCTYPE html>\n' + html);
  });
});

const port = server.get('env') === 'development' ? 3000 : 8081;

server.listen(port, function() {
  console.log('Listening at port ' + port + ' (env: ' + server.get('env') + ')');
});
