import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/view/Home.vue')), 'Home');
const SelRole = r => require.ensure([], () => r(require('@/view/SelRole.vue')), 'SelRole');
const TrialReport = r => require.ensure([], () => r(require('@/view/TrialReport.vue')), 'TrialReport');
const Login = r => require.ensure([], () => r(require('@/view/Login.vue')), 'Login');
const Register = r => require.ensure([], () => r(require('@/view/Register.vue')), 'Register');
const TaskCategory = r => require.ensure([], () => r(require('@/view/TaskCategory.vue')), 'TaskCategory');
const TaskDetails = r => require.ensure([], () => r(require('@/view/TaskDetails.vue')), 'TaskDetails');
const MyXiuBa = r => require.ensure([], () => r(require('@/view/MyXiuBa/MyXiuBa.vue')), 'MyXiuBa');
const UserHome = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/UserHome.vue')), 'MyXiuBa');
const TaskReleaseProcess = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/TaskReleaseProcess.vue')), 'MyXiuBa');
const MyTrialReport = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/MyTrialReport.vue')), 'MyXiuBa');

const ActivityManagement = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/activityManagement/index.vue')), 'ActivityManagement');
const ActivitiesList = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/activityManagement/children/activitiesList.vue')), 'ActivityManagement');
const ApproveShowker = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/activityManagement/children/approveShowker.vue')), 'ActivityManagement');
const ProbationReport = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/activityManagement/children/probationReport.vue')), 'ActivityManagement');
const DetailAndLog = r => require.ensure([], () => r(require('../view/MyXiuBa/children/activityManagement/children/detailAndLog/index.vue')), 'ActivityManagement');
const ActivityDetail = r => require.ensure([], () => r(require('../view/MyXiuBa/children/activityManagement/children/detailAndLog/children/activityDetail.vue')), 'ActivityManagement');
const ActivityLog = r => require.ensure([], () => r(require('../view/MyXiuBa/children/activityManagement/children/detailAndLog/children/activityLog.vue')), 'ActivityManagement');

const MyProbation = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/myProbation/index.vue')), 'MyProbation');
const ApplyWaitAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/myProbation/children/applyWaitAudit.vue')), 'MyProbation');
const ApplyPassAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/myProbation/children/applyPassAudit.vue')), 'MyProbation');
const ApplyFailAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/myProbation/children/applyFailAudit.vue')), 'MyProbation');

const TaskManagement = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/taskManagement/index.vue')), 'TaskManagement');
const TaskWaitAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/taskManagement/children/taskWaitAudit.vue')), 'TaskManagement');
const TaskPassAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/taskManagement/children/taskPassAudit.vue')), 'TaskManagement');
const TaskFailAudit = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/taskManagement/children/taskFailAudit.vue')), 'TaskManagement');

const PersonalSetting = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/personalSetting/index.vue')), 'PersonalSetting');
const PersonalAccountInfo = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/personalSetting/children/PersonalAccountInfo.vue')), 'PersonalSetting');
const WwBind = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/personalSetting/children/WwBind.vue')), 'PersonalSetting');
const Verfied = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/personalSetting/children/Verfied.vue')), 'PersonalSetting');

const HelpCenter = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/helpCenter/index.vue')), 'helpCenter');
const Faq = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/helpCenter/children/Faq.vue')), 'helpCenter');
const FaqSeller = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/helpCenter/children/FaqSeller.vue')), 'helpCenter');
const FaqShowker = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/helpCenter/children/FaqShowker.vue')), 'helpCenter');

const MyTrialReport = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/MyTrialReport.vue')), 'MyTrialReport');

const MoneyManagement = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/index.vue')), 'MoneyManagement');
const AccountInfo = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/children/accountInfo.vue')), 'MoneyManagement');
const AccountManagement = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/children/accountManagement.vue')), 'MoneyManagement');
const PayMoney = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/children/payMoney.vue')), 'MoneyManagement');
const GetoutMoney = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/children/getoutMoney.vue')), 'MoneyManagement');
const TransactionRecord = r => require.ensure([], () => r(require('@/view/MyXiuBa/children/moneyManagement/children/transactionRecord.vue')), 'MoneyManagement');

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "秀吧-提权重促转化",
        logInAuthority: false,
      }
    },
    {
      path: '/sel-role',
      name: 'SelRole',
      component: SelRole,
      meta: {
        title: "注册角色选择",
        logInAuthority: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "用户登陆",
        logInAuthority: false,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      children: [
        {
          path: 'seller-register',
          name: 'seller',
          meta: {
            title: "用户注册",
            logInAuthority: false,
          },
        },
        {
          path: 'buyer-register',
          name: 'buyer',
          meta: {
            title: "用户注册",
            logInAuthority: false,
          },
        },
      ]
    },
    {
      path: '/task-category',
      name: 'TaskCategory',
      component: TaskCategory,
      meta: {
        title: "任务分类展示",
        logInAuthority: false,
      }
    },
    {
      path: '/task-details',
      name: 'TaskDetails',
      component: TaskDetails,
      meta: {
        title: "任务详情页",
        logInAuthority: false,
      }
    },
    {
      path: '/trial-report',
      name: 'TrialReport',
      component: TrialReport,
      meta: {
        title: "买家秀页",
        logInAuthority: true,
      }
    },
    {
      path: '/user',
      name: 'MyXiuBa',
      component: MyXiuBa,
      children: [
        {
          path: 'user-home',
          name: 'UserHome',
          component: UserHome,
          meta: {
            title: "我的主页",
            logInAuthority: true,
          }
        },
        {
          path: 'task-release',
          name: 'TaskReleaseProcess',
          component: TaskReleaseProcess,
          meta: {
            title: "发布活动",
            logInAuthority: true,
          }
        },
        {
          path: 'activity-management',
          name: 'ActivityManagement',
          component: ActivityManagement,
          children: [
            {
              path: 'list',
              name: 'ActivitiesList',
              component: ActivitiesList,
              meta: {
                title: "活动管理-活动列表",
                logInAuthority: true,
              },
            },
            {
              path: 'approve',
              name: 'ApproveShowker',
              component: ApproveShowker,
              meta: {
                title: "活动管理-审批秀客",
                logInAuthority: true,
              },
            },
            {
              path: 'report',
              name: 'ProbationReport',
              component: ProbationReport,
              meta: {
                title: "活动管理-买家秀",
                logInAuthority: true,
              },
            },
            {
              path: 'detail-log',
              name: 'DetailAndLog',
              component: DetailAndLog,
              children: [
                {
                  path: 'detail',
                  name: 'ActivityDetail',
                  component: ActivityDetail,
                  meta: {
                    title: "活动管理-活动详情",
                    logInAuthority: true,
                  },
                },
                {
                  path: 'log',
                  name: 'ActivityLog',
                  component: ActivityLog,
                  meta: {
                    title: "活动管理-活动日志",
                    logInAuthority: true,
                  },
                },
              ]
            },
          ]
        },
        {
          path: 'task-management',
          name: 'TaskManagement',
          component: TaskManagement,
          children: [
            {
              path: 'wait',
              name: 'TaskWaitAudit',
              component: TaskWaitAudit,
              meta: {
                title: "任务管理-待审核",
                logInAuthority: true,
              }
            },
            {
              path: 'pass',
              name: 'TaskPassAudit',
              component: TaskPassAudit,
              meta: {
                title: "任务管理-已通过",
                logInAuthority: true,
              }
            },
            {
              path: 'fail',
              name: 'TaskFailAudit',
              component: TaskFailAudit,
              meta: {
                title: "任务管理-已终止",
                logInAuthority: true,
              }
            }
          ]
        },
        {
          path: 'my-probation',
          name: 'MyProbation',
          component: MyProbation,
          children: [
            {
              path: 'wait',
              name: 'ApplyWaitAudit',
              component: ApplyWaitAudit,
              meta: {
                title: "我的买家秀-待审批",
                logInAuthority: true,
              },
            },
            {
              path: 'pass',
              name: 'ApplyPassAudit',
              component: ApplyPassAudit,
              meta: {
                title: "我的买家秀-已通过",
                logInAuthority: true,
              },
            },
            {
              path: 'fail',
              name: 'ApplyFailAudit',
              component: ApplyFailAudit,
              meta: {
                title: "我的买家秀-未通过",
                logInAuthority: true,
              },
            },
            {
              path: 'report',
              redirect: {
                name: 'ProbationReport'
              }
            },
          ]
        },
        {
          path: 'my-trial-report',
          name: 'MyTrialReport',
          component: MyTrialReport,
          meta: {
            title: "我的报告",
            logInAuthority: true,
          }
        },
        {
          path: 'personal-setting',
          name: 'personalSetting',
          component: PersonalSetting,
          children: [
            {
              path: 'personal-account-info',
              name: 'PersonalAccountInfo',
              component: PersonalAccountInfo,
              meta: {
                title: "个人设置-账号信息",
                logInAuthority: true,
              },
            },
            {
              path: 'ww-bind',
              name: 'WwBind',
              component: WwBind,
              meta: {
                title: "个人设置-旺旺绑定",
                logInAuthority: true,
              },
            },
            {
              path: 'verified',
              name: 'Verfied',
              component: Verfied,
              meta: {
                title: "个人设置-实名认证",
                logInAuthority: true,
              },
            }
          ]
        },
        {
          path: 'help-center',
          name: 'helpCenter',
          component: HelpCenter,
          children: [
            {
              path: 'faq',
              name: 'faq',
              component: Faq,
              meta: {
                title: "帮助中心-常见问题",
                logInAuthority: true,
              },
            },
            {
              path: 'faq-seller',
              name: 'faqSeller',
              component: FaqSeller,
              meta: {
                title: "帮助中心-商家中心",
                logInAuthority: true,
              },
            },
            {
              path: 'faq-showker',
              name: 'faqShowker',
              component: FaqShowker,
              meta: {
                title: "个人设置-秀客中心",
                logInAuthority: true,
              },
            }
          ]
        },
        {
          path: 'money-management',
          name: 'MoneyManagement',
          component: MoneyManagement,
          children: [
            {
              path: 'account-info',
              name: 'AccountInfo',
              component: AccountInfo,
              meta: {
                title: "资金管理-账号信息",
                logInAuthority: true,
              }
            },
            {
              path: 'account-management',
              name: 'AccountManagement',
              component: AccountManagement,
              meta: {
                title: "资金管理-账户管理",
                logInAuthority: true,
              }
            },
            {
              path: 'pay-money',
              name: 'PayMoney',
              component: PayMoney,
              meta: {
                title: "资金管理-充值",
                logInAuthority: true,
              }
            },
            {
              path: 'getout-money',
              name: 'GetoutMoney',
              component: GetoutMoney,
              meta: {
                title: "资金管理-提现",
                logInAuthority: true,
              }
            },
            {
              path: 'transaction-record',
              name: 'TransactionRecord',
              component: TransactionRecord,
              meta: {
                title: "资金管理-交易记录",
                logInAuthority: true,
              }
            },
          ]
        }
      ]
    }
  ],
})
