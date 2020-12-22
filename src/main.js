import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '@/assets/js/rem.js';
import '@/assets/css/common.css';
import '@/assets/css/animate.css';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
