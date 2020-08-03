// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {post, del, fetch, put, fetchList} from "./util/request"

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$del = del;
Vue.prototype.$fetch = fetch;
Vue.prototype.$put = put;
Vue.prototype.$fetchList = fetchList;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
