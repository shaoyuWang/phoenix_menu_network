/* eslint-disable no-unused-vars */
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element';
import './styles/style.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// 开启debug模式
// Vue.config.debug = true;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype._ = _;
Vue.prototype.moment = moment;

axios.defaults.withCredentials = true;

// 跳转后返回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

// 动态修改header
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
