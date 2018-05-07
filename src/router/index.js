import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/view/Home.vue')), 'Home');
const BuyerShow = r => require.ensure([], () => r(require('@/view/BuyerShow.vue')), 'BuyerShow');
const QQLogin = r => require.ensure([], () => r(require('@/view/QQLogin.vue')), 'QQLogin');
const SellerAdv = r => require.ensure([], () => r(require('@/view/SellerAdv.vue')), 'SellerAdv');
const RecommendSpread = r => require.ensure([], () => r(require('@/view/RecommendSpread.vue')), 'RecommendSpread');
const Notice = r => require.ensure([], () => r(require('@/view/Notice.vue')), 'Notice');

const SellerSpread = r => require.ensure([], () => r(require('@/view/SellerSpread.vue')), 'SellerSpread');
const SellerGuide = r => require.ensure([], () => r(require('@/view/SellerGuide.vue')), 'SellerGuide');
const PhoneGuide = r => require.ensure([], () => r(require('@/view/PhoneGuide.vue')), 'PhoneGuide');
const AboutUs = r => require.ensure([], () => r(require('@/view/AboutUs.vue')), 'AboutUs');
const ShowkerLanding = r => require.ensure([], () => r(require('@/view/ShowkerLanding.vue')), 'ShowkerLanding');
const SelRole = r => require.ensure([], () => r(require('@/view/SelRole.vue')), 'SelRole');
const TrialReport = r => require.ensure([], () => r(require('@/view/TrialReport.vue')), 'TrialReport');
const Login = r => require.ensure([], () => r(require('@/view/Login.vue')), 'Login');
const RevisePassword = r => require.ensure([], () => r(require('@/view/RevisePassword.vue')), 'RevisePassword');

const ThirdPartyLogin = r => require.ensure([], () => r(require('@/view/ThirdPartyLogin.vue')), 'ThirdPartyLogin');
const Register = r => require.ensure([], () => r(require('@/view/Register.vue')), 'Register');
const TaskCategory = r => require.ensure([], () => r(require('@/view/TaskCategory.vue')), 'TaskCategory');
const TaskDetails = r => require.ensure([], () => r(require('@/view/TaskDetails.vue')), 'TaskDetails');

const MyXiuBa = r => require.ensure([], () => r(require('@/view/personalCenter/Index.vue')), 'personalCenter');
const UserHome = r => require.ensure([], () => r(require('@/view/personalCenter/children/UserHome.vue')), 'personalCenter');
const VipMember = r => require.ensure([], () => r(require('@/view/personalCenter/children/VipMember.vue')), 'VipMember');
const TaskReleaseProcess = r => require.ensure([], () => r(require('@/view/personalCenter/children/TaskReleaseProcess.vue')), 'TaskReleaseProcess');

const ActivityManagement = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/index.vue')), 'ActivityManagement');
const ActivitiesList = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/activitiesList.vue')), 'ActivityManagement');
const ApproveShowker = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/approveShowker.vue')), 'ActivityManagement');
const ProbationReport = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/probationReport.vue')), 'ActivityManagement');
const DetailAndLog = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/detailAndLog/index.vue')), 'ActivityManagement');
const ActivityDetail = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/detailAndLog/children/activityDetail.vue')), 'ActivityManagement');
const ActivityLog = r => require.ensure([], () => r(require('@/view/personalCenter/children/activityManagement/children/detailAndLog/children/activityLog.vue')), 'ActivityManagement');

const MyProbation = r => require.ensure([], () => r(require('@/view/personalCenter/children/myProbation/index.vue')), 'MyProbation');
const ApplyWaitAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/myProbation/children/applyWaitAudit.vue')), 'MyProbation');
const ApplyPassAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/myProbation/children/applyPassAudit.vue')), 'MyProbation');
const ApplyFailAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/myProbation/children/applyFailAudit.vue')), 'MyProbation');

const TaskManagement = r => require.ensure([], () => r(require('@/view/personalCenter/children/taskManagement/index.vue')), 'TaskManagement');
const TaskWaitAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/taskManagement/children/taskWaitAudit.vue')), 'TaskManagement');
const TaskPassAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/taskManagement/children/taskPassAudit.vue')), 'TaskManagement');
const TaskFailAudit = r => require.ensure([], () => r(require('@/view/personalCenter/children/taskManagement/children/taskFailAudit.vue')), 'TaskManagement');

const PersonalSetting = r => require.ensure([], () => r(require('@/view/personalCenter/children/personalSetting/index.vue')), 'PersonalSetting');
const PersonalAccountInfo = r => require.ensure([], () => r(require('@/view/personalCenter/children/personalSetting/children/PersonalAccountInfo.vue')), 'PersonalSetting');
const WwBind = r => require.ensure([], () => r(require('@/view/personalCenter/children/personalSetting/children/WwBind.vue')), 'PersonalSetting');
const Verfied = r => require.ensure([], () => r(require('@/view/personalCenter/children/personalSetting/children/Verfied.vue')), 'PersonalSetting');

const HelpCenter = r => require.ensure([], () => r(require('@/view/personalCenter/children/helpCenter/index.vue')), 'helpCenter');
const Faq = r => require.ensure([], () => r(require('@/view/personalCenter/children/helpCenter/children/Faq.vue')), 'helpCenter');
const FaqSeller = r => require.ensure([], () => r(require('@/view/personalCenter/children/helpCenter/children/FaqSeller.vue')), 'helpCenter');
const FaqShowker = r => require.ensure([], () => r(require('@/view/personalCenter/children/helpCenter/children/FaqShowker.vue')), 'helpCenter');
const SellerTest = r => require.ensure([], () => r(require('@/view/SellerTest.vue')), 'SellerTest');

const MyTrialReport = r => require.ensure([], () => r(require('@/view/personalCenter/children/MyTrialReport.vue')), 'MyTrialReport');
const MyAppeal = r => require.ensure([], () => r(require('@/view/personalCenter/children/MyAppeal.vue')), 'MyAppeal');
const BlackListManagement = r => require.ensure([], () => r(require('@/view/personalCenter/children/BlackListManagement.vue')), 'BlackListManagement');

const MoneyManagement = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/index.vue')), 'MoneyManagement');
const AccountInfo = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/children/accountInfo.vue')), 'MoneyManagement');
const AccountManagement = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/children/accountManagement.vue')), 'MoneyManagement');
const PayMoney = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/children/payMoney.vue')), 'MoneyManagement');
const GetoutMoney = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/children/getoutMoney.vue')), 'MoneyManagement');
const TransactionRecord = r => require.ensure([], () => r(require('@/view/personalCenter/children/moneyManagement/children/transactionRecord.vue')), 'MoneyManagement');

const Recommend = r => require.ensure([], () => r(require('@/view/personalCenter/children/Recommend.vue')), 'Recommend');

const BindStore = r => require.ensure([], () => r(require('@/view/personalCenter/children/bindStore/index.vue')), 'BindStore');
const StoreBindRules = r => require.ensure([], () => r(require('@/view/personalCenter/children/bindStore/children/storeBindRules.vue')), 'StoreBindRules');
const StoreBindOperating = r => require.ensure([], () => r(require('@/view/personalCenter/children/bindStore/children/storeBindOperating.vue')), 'StoreBindOperating');


Vue.use(Router);

/**
 * 路由元信息参数说明
 * title 页面标题
 * logInAuthority 页面登录访问权限控制 （true：需要登录访问 false：无需登录即可访问）
 * role 页面角色访问权限控制 （null：所有角色可访问 1：仅限商家角色可以访问 0：仅限拿手角色可访问）
 * topShow 顶部导航栏显示（true：显示 false 不显示）
 * bottomShow 底部导航栏显示（true：显示 false 不显示）
 */

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "白拿拿 - 海量优质商品 免费试用",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/buyer-show',
      name: 'BuyerShow',
      component: BuyerShow,
      meta: {
        title: "买家秀",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: {
        title: "公告",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/sel-role',
      name: 'SelRole',
      component: SelRole,
      meta: {
        title: "注册角色选择",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/revise-password',
      name: 'RevisePassword',
      component: RevisePassword,
      meta: {
        title: "登录密码修改",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/qq-login',
      name: 'QQLogin',
      component: QQLogin,
      meta: {
        title: "QQ登录中",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/seller-adv',
      name: 'SellerAdv',
      component: SellerAdv,
      meta: {
        title: "商家推广",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/recommend-spread',
      name: 'RecommendSpread',
      component: RecommendSpread,
      meta: {
        title: "推荐引导",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/seller-spread',
      name: 'sellerSpread',
      component: SellerSpread,
      meta: {
        title: "商家引导",
        logInAuthority: false,
        topShow: false,
        bottomShow: false,
        role: null,
      }
    },

    {
      path: '/seller-guide',
      name: 'SellerGuide',
      component: SellerGuide,
      meta: {
        title: "商家引导页",
        logInAuthority: true,
        topShow: false,
        bottomShow: false,
        role: 1,
      }
    },
    {
      path: '/phone-guide',
      name: 'PhoneGuide',
      component: PhoneGuide,
      meta: {
        title: "手机端引导",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/showker-landing',
      name: 'ShowkerLanding',
      component: ShowkerLanding,
      meta: {
        title: "拿手落地页",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: 0,
      }
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs,
      meta: {
        title: "关于我们",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/go-xb',
      name: 'ThirdPartyLogin',
      component: ThirdPartyLogin,
      meta: {
        title: "用户登录",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "用户登录",
        logInAuthority: false,
        topShow: false,
        bottomShow: true,
        role: null,
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
            topShow: false,
            bottomShow: true,
            role: null,
          },
        },
        {
          path: 'buyer-register',
          name: 'buyer',
          meta: {
            title: "用户注册",
            logInAuthority: false,
            topShow: false,
            bottomShow: true,
            role: null,
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
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/task-details',
      name: 'TaskDetails',
      component: TaskDetails,
      meta: {
        title: "任务详情页",
        logInAuthority: false,
        topShow:true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/trial-report',
      name: 'TrialReport',
      component: TrialReport,
      meta: {
        title: "买家秀页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
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
            topShow: true,
            bottomShow: true,
            role: null,
          }
        },
        {
          path: 'bind-store',
          name: 'BindStore',
          component: BindStore,
          children:[
            {
              path:'store-bind-rules',
              name:'StoreBindRules',
              component:StoreBindRules,
              meta:{
                title:"店铺绑定说明",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path:'store-bind-operating',
              name:'StoreBindOperating',
              component:StoreBindOperating,
              meta:{
                title:'店铺绑定操作',
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            }
          ],
        },
        {
          path: 'task-release',
          name: 'TaskReleaseProcess',
          component: TaskReleaseProcess,
          meta: {
            title: "发布活动",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'recommend',
          name: 'Recommend',
          component: Recommend,
          meta: {
            title: "推荐有礼",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: null,
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
                topShow: true,
                bottomShow: true,
                role: 1,
              },
            },
            {
              path: 'approve',
              name: 'ApproveShowker',
              component: ApproveShowker,
              meta: {
                title: "活动管理-审批拿手",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              },
            },
            {
              path: 'report',
              name: 'ProbationReport',
              component: ProbationReport,
              meta: {
                title: "活动管理-买家秀",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: null,
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
                    topShow: true,
                    bottomShow: true,
                    role: 1,
                  },
                },
                {
                  path: 'log',
                  name: 'ActivityLog',
                  component: ActivityLog,
                  meta: {
                    title: "活动管理-活动日志",
                    logInAuthority: true,
                    topShow: true,
                    bottomShow: true,
                    role: 1,
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
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path: 'pass',
              name: 'TaskPassAudit',
              component: TaskPassAudit,
              meta: {
                title: "任务管理-已通过",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path: 'fail',
              name: 'TaskFailAudit',
              component: TaskFailAudit,
              meta: {
                title: "任务管理-已终止",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
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
                topShow: true,
                bottomShow: true,
                role: 0,
              },
            },
            {
              path: 'pass',
              name: 'ApplyPassAudit',
              component: ApplyPassAudit,
              meta: {
                title: "我的买家秀-已通过",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 0,
              },
            },
            {
              path: 'fail',
              name: 'ApplyFailAudit',
              component: ApplyFailAudit,
              meta: {
                title: "我的买家秀-未通过",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 0,
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
            topShow: true,
            bottomShow: true,
            role: 0,
          }
        },
        {
          path: 'my-appeal',
          name: 'MyAppeal',
          component: MyAppeal,
          meta: {
            title: "我的申诉",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: null,
          }
        },
        {
          path: 'black-list-management',
          name: 'BlackListManagement',
          component: BlackListManagement,
          meta: {
            title: "黑名单管理",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
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
                topShow: true,
                bottomShow: true,
                role: null,
              },
            },
            {
              path: 'ww-bind',
              name: 'WwBind',
              component: WwBind,
              meta: {
                title: "个人设置-旺旺绑定",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 0,
              },
            },
            {
              path: 'verified',
              name: 'Verfied',
              component: Verfied,
              meta: {
                title: "个人设置-实名认证",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: null,
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
                logInAuthority: false,
                topShow: true,
                bottomShow: true,
                role: null,
              },
            },
            {
              path: 'faq-seller',
              name: 'faqSeller',
              component: FaqSeller,
              meta: {
                title: "帮助中心-商家中心",
                logInAuthority: false,
                topShow: true,
                bottomShow: true,
                role: 1,
              },
            },
            {
              path: 'faq-showker',
              name: 'faqShowker',
              component: FaqShowker,
              meta: {
                title: "个人设置-拿手中心",
                logInAuthority: false,
                topShow: true,
                bottomShow: true,
                role: 0,
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
                topShow: true,
                bottomShow: true,
                role: null,
              }
            },
            {
              path: 'account-management',
              name: 'AccountManagement',
              component: AccountManagement,
              meta: {
                title: "资金管理-账户管理",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: null,
              }
            },
            {
              path: 'pay-money',
              name: 'PayMoney',
              component: PayMoney,
              meta: {
                title: "资金管理-充值",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path: 'getout-money',
              name: 'GetoutMoney',
              component: GetoutMoney,
              meta: {
                title: "资金管理-提现",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: null,
              }
            },
            {
              path: 'transaction-record',
              name: 'TransactionRecord',
              component: TransactionRecord,
              meta: {
                title: "资金管理-交易记录",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: null,
              }
            },
          ]
        },
        {
          path: 'vip-member',
          name: 'VipMember',
          component: VipMember,
          meta: {
            title: "VIP会员",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },

      ]
    }
  ],
})
