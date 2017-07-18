import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filter/custom'
import VueLazyload from 'vue-lazyload'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.use(VueLazyload)
/*注册全局过滤器*/
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
/*根据路由改变页面标题*/
router.afterEach(to =>{document.title = to.meta.title})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
