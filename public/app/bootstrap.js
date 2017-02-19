import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from  'vue-resource';
import Toast from './plugins/toast';
import TouchRipple from 'vue-touch-ripple';


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Toast);
Vue.use(TouchRipple)

// Style
import './assets/css/normalize.css';
import './assets/css/flex.css';
import './assets/css/font-awesome.css';

import './scss/app.scss';

// Js
import './assets/js/bootstrap';

// Components
import App from './app';

// Directives
import Menu from './directives/collapseMenu';
Vue.directive('menu', Menu);

import authConfig from './interceptors/auth_interceptor';
import routeConfig from './routes';

Vue.config.debug = true;
Vue.config.silent = false;
Vue.config.devtools = true;
Vue.http.options.root = '/backend';

let router = new VueRouter();
routeConfig(router);

authConfig(Vue);

router.start(App, '#app');

window.router = router;