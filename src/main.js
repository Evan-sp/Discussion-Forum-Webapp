import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Thread from './components/Thread/Thread.vue'
import Admin from './components/Admin.vue'

import VueRouter from 'vue-router';
import SuiVue from 'semantic-ui-vue';
import PortalVue from 'portal-vue'
import VueCookies from 'vue-cookies'
import shortid from 'shortid'

Vue.use(VueCookies)
Vue.use(PortalVue)
Vue.use(SuiVue);
Vue.use(VueRouter);

var idColors = [
    '#92a8d1',
    '#034f84',
    '#80ced6',
    '#618685',
    '#c0ded9',
    '#e4d1d1',
    '#563f46'
]

VueCookies.config('7d');
if($cookies.get('id') == null)
  VueCookies.set('id', shortid.generate());
if($cookies.get('color') == null)
  VueCookies.set('color', idColors[Math.floor(Math.random()*idColors.length)]);

const routes = [
  {path: '/', component:Home},
  {path: '/thread/:id', name: 'thread', component:Thread },
  {path: '/admin/login', name: 'admin', component:Admin  }
];

const router = new VueRouter({
  routes
});

var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App),

})
global.vm = vm;
