import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import Modal from 'iview/src/components/modal'
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

/*根据路由改变页面标题*/
router.afterEach(to => {
  document.title = to.meta.title
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
