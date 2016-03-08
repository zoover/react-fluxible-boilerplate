import Fluxible from 'fluxible';
import MainComponent from './components/Main.jsx';
// Isomorphic restful services plugin - its magic!
// This will enable to share the same services/api calls between server and client
import fetchr from 'fluxible-plugin-fetchr';
import registerStores from './config/stores';
import { I18n } from 'react-i18n-components';
import translations from './config/locales';

const fetchrInstance = fetchr({
  // Internal name to make the calls,
  // Name it whatever suits you best
  xhrPath: '/api'
});
const app = new Fluxible({
  component: MainComponent
});

I18n.setTranslations(translations);
I18n.setLocale('nl');

registerStores(app);

// Plug new fetcher instance to the app
app.plug(fetchrInstance);

export default app;
