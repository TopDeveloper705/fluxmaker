import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';

import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import TimeStore from './stores/TimeStore';

const flux = new Fluxible({
  component: Application
});

const fetchr = fetchrPlugin({
  xhrPath: '/api'
});

flux.plug(fetchr);

flux.registerStore(RouteStore);
flux.registerStore(ApplicationStore);
flux.registerStore(TimeStore);

export default flux;
