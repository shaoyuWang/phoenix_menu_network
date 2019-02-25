import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element';
import './styles/style.scss';
import axios from "axios";
import _ from 'lodash';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype._ = _;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
