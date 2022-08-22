import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUi from "@/tool/elementUi";

Vue.config.productionTip = false;

// import '@/assets/js/rem.js';
// import '@/assets/css/common.css';
// import '@/assets/css/animate.css';

Vue.use(ElementUi); // 部分引入 ElementUi 组件

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
