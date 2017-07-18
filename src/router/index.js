import Vue from 'vue'
import Router from 'vue-router'
const Hello = r => require.ensure([], () => r(require('../components/Hello.vue')), 'Hello');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        title: "首页"
      }
    }
  ]
})
