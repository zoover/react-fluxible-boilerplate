import {RouteStore} from 'fluxible-router';
import routes from '../config/routes';
import applicationStore from '../stores/applicationStore';
import SampleStore from '../stores/sampleStore';
import UserStore from '../stores/userStore';
import { I18nStore } from 'react-fluxible-i18n';

export default function registerStores(app) {
  app.registerStore(RouteStore.withStaticRoutes(routes));
  app.registerStore(applicationStore);
  app.registerStore(SampleStore);
  app.registerStore(UserStore);
  app.registerStore(I18nStore);
}
