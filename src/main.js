import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'


Vue.config.productionTip = false

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vue.use(VueResource);

Vue.use(VueRouter);


