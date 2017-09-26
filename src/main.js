import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import Modal from 'iview/src/components/modal'
import LoadingBar from 'iview/src/components/loading-bar'
import Message from 'iview/src/components/message'
import 'animate.css/animate.css'
import '../iview/iview.less'
import '@/css/common.scss'



Vue.config.productionTip = false;

Vue.prototype.$Modal = Modal;

Vue.prototype.$Message = Message;

/*VueLazyload配置初始化*/
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
});

/*注册全局过滤器*/
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/*根据路由改变处理页面标题和组件加载进度*/
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  store.commit({
    type: 'LOG_IN_AUTHORITY',
    logInAuthority: to.meta.logInAuthority
  });
  next();
});

router.afterEach(to => {
  document.title = to.meta.title;
  LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
