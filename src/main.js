import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import VueQuillEditor from 'vue-quill-editor'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(VueQuillEditor)

/*VueLazyload配置初始化*/
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

/*注册全局过滤器*/
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/*根据路由改变页面标题*/
router.afterEach(to => {
  document.title = to.meta.title
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});

