import axios from 'axios';
import _ from 'lodash';
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

axios.defaults.withCredentials = true;

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
