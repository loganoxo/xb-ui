import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import Modal from 'iview/src/components/modal'
import LoadingBar from 'iview/src/components/loading-bar'
import Message from 'iview/src/components/message'
import '../iview/iview.less'
import '@/css/common.scss'

Vue.config.productionTip = false;

Vue.prototype.$Modal = Modal;

Vue.prototype.$Message = Message;

/*VueLazyload配置初始化*/
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/lazyLoadImage/lazy-load-image-error.svg',
  loading: '/static/lazyLoadImage/lazy-load-image-loading.svg',
  attempt: 3
});

/*注册全局过滤器*/
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/*根据路由改变处理业务逻辑*/
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  store.commit({
    type: "LOG_IN_AUTHORITY",
    logInAuthority: to.meta.logInAuthority
  });
  if (to.meta.logInAuthority && !store.state.login) {
    router.push({name: 'login'})
  } else if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/');
  }
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
