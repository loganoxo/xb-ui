import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import {Modal, Message, Notice} from 'iview'
import '@/css/common.scss'
import '../iview/iview.less'

Vue.config.productionTip = false;

Vue.prototype.$Modal = Modal;

Notice.config({
  top: 40,
});

Vue.prototype.$Notice = Notice;

Message.config({
  duration: 4
});

Vue.prototype.$Message = Message;

Vue.prototype.$IVIEW = {
  size: '',
  transfer: true
};

/*VueLazyload配置初始化*/
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/lazyLoadImage/lazy-load-image-error.svg',
  loading: '/static/img/lazyLoadImage/lazy-load-image-loading.svg',
  attempt: 3
});

/*注册全局过滤器*/
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/*页面刷新的时候初始化用户信息存储*/
store.commit('INIT_USER_INFO');

/*根据路由改变前处理业务逻辑*/
router.beforeEach((to, from, next) => {
  store.commit({
    type: "CHANGE_TOP_SHOW_HIDE",
    status: to.meta.topShow
  });
  store.commit({
    type: "CHANGE_BOTTOM_SHOW_HIDE",
    status: to.meta.bottomShow
  });
  store.commit({
    type: "LOG_IN_AUTHORITY",
    logInAuthority: to.meta.logInAuthority
  });
  if (to.meta.logInAuthority && !store.state.login) {
    next('/login');
  } else if (to.meta.role && to.meta.role !== store.getters.getUserRole) {
    next('/');
  } else if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/');
  } else {
    next();
  }
});

/*根据路由改变后处理业务逻辑*/
router.afterEach(to => {
  document.title = to.meta.title;
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
