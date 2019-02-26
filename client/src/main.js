import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element';
import './styles/style.scss';
import axios from "axios";
import _ from 'lodash';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype._ = _;

// 动态修改header
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
