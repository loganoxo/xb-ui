import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('../view/Home.vue')), 'Home');
const Login = r => require.ensure([], () => r(require('../view/Login.vue')), 'Login');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: "登陆"
      }
    },
  ]
})
