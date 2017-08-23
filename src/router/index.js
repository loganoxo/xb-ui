import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../view/Home.vue')), 'Home');
const SelRole = r => require.ensure([], () => r(require('../view/SelRole.vue')), 'SelRole');
const Login = r => require.ensure([], () => r(require('../view/Login.vue')), 'Login');
const Register = r => require.ensure([], () => r(require('../view/Register.vue')), 'Register');
const TaskCategory = r => require.ensure([], () => r(require('../view/TaskCategory.vue')), 'TaskCategory');
const TaskDetails = r => require.ensure([], () => r(require('../view/TaskDetails.vue')), 'TaskDetails');
const MyXiuBa = r => require.ensure([], () => r(require('../view/MyXiuBa/MyXiuBa.vue')), 'MyXiuBa');
const UserHome = r => require.ensure([], () => r(require('../view/MyXiuBa/children/UserHome.vue')), 'MyXiuBa');
const PersonalSetting = r => require.ensure([], () => r(require('../view/MyXiuBa/children/PersonalSetting.vue')), 'PersonalSetting');
const TaskReleaseProcess = r => require.ensure([], () => r(require('../view/MyXiuBa/children/TaskReleaseProcess.vue')), 'TaskReleaseProcess');
const ActivityManagement = r => require.ensure([], () => r(require('../view/MyXiuBa/children/ActivityManagement.vue')), 'ActivityManagement');
const MyProbation = r => require.ensure([], () => r(require('../view/MyXiuBa/children/MyProbation.vue')), 'MyProbation');
const MoneyManagement = r => require.ensure([], () => r(require('../view/MyXiuBa/children/MoneyManagement.vue')), 'MoneyManagement');


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/sel-role',
      name: 'SelRole',
      component: SelRole,
      meta: {
        title: "注册角色选择"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "用户登陆"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: "用户注册"
      },
      children: [
        {
          path: '/seller-register',
          name: 'seller'
        },
        {
          path: '/buyer-register',
          name: 'buyer'
        },
      ]
    },
    {
      path: '/task-category',
      name: 'TaskCategory',
      component: TaskCategory,
      meta: {
        title: "任务分类展示"
      }
    },
    {
      path: '/task-details',
      name: 'TaskDetails',
      component: TaskDetails,
      meta: {
        title: "任务详情页"
      }
    },
    {
      path: '/user',
      name: 'MyXiuBa',
      component: MyXiuBa,
      meta: {
        title: "我的秀吧"
      },
      children: [
        {
          path: 'user-home',
          name: 'UserHome',
          component: UserHome,
          meta: {
            title: "我的主页"
          }
        },
        {
          path: 'task-release',
          name: 'TaskReleaseProcess',
          component: TaskReleaseProcess,
          meta: {
            title: "发布试用活动"
          }
        },
        {
          path: 'activity-management',
          name: 'ActivityManagement',
          component: ActivityManagement,
          meta: {
            title: "试用活动管理"
          }
        },
        {
          path: 'my-probation',
          name: 'MyProbation',
          component: MyProbation,
          meta: {
            title: "我的试用"
          }
        },
        {
          path: 'personal-setting',
          name: 'personalSetting',
          component: PersonalSetting,
          meta: {
            title: "个人设置"
          }
        },
        {
          path:'money-management',
          name:'MoneyManagement',
          component:MoneyManagement,
          meta:{
            title :"资金管理"
          }
        }
      ]
    }
  ]
})
