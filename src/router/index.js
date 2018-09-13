import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const _import = require(`./router.${process.env.NODE_ENV}.config`);

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
      component: _import('Home'),
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
      component: _import('BuyerShow'),
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
      component: _import('Notice'),
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
      component: _import('SelRole'),
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
      component: _import('RevisePassword'),
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
      component: _import('QQLogin'),
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
      component: _import('SellerAdv'),
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
      component: _import('RecommendSpread'),
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
      component: _import('SellerSpread'),
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
      component: _import('SellerGuide'),
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
      component: _import('PhoneGuide'),
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
      component: _import('promotionPage/ShowkerLanding'),
      meta: {
        title: "拿手落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: 0,
      }
    },
    {
      path: '/landing-page',
      name: 'LandingPage',
      component: _import('promotionPage/LandingPage'),
      meta: {
        title: "商家落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/chapaiming-landing',
      name: 'ChapaimingLanding',
      component: _import('promotionPage/ChapaimingLanding'),
      meta: {
        title: "商家落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/spread-landing-page',
      name: 'SpreadLandingPage',
      component: _import('promotionPage/SpreadLandingPage'),
      meta: {
        title: "推广落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/spread-landing-page-two',
      name: 'SpreadLandingPageTwo',
      component: _import('promotionPage/SpreadLandingPageTwo'),
      meta: {
        title: "推广落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/spread-landing-page-three',
      name: 'SpreadLandingPageThree',
      component: _import('promotionPage/SpreadLandingPageThree'),
      meta: {
        title: "推广落地页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: _import('AboutUs'),
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
      component: _import('ThirdPartyLogin'),
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
      name: 'Login',
      component: _import('Login'),
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
      component: _import('Register'),
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
      component: _import('TaskCategory'),
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
      component: _import('TaskDetails'),
      meta: {
        title: "任务详情页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    },
    {
      path: '/trial-report',
      name: 'TrialReport',
      component: _import('TrialReport'),
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
      name: 'PersonalCenter',
      component: _import('personalCenter/index'),
      children: [
        {
          path: 'user-home',
          name: 'UserHome',
          component: _import('personalCenter/children/UserHome'),
          meta: {
            title: "我的主页",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: null,
          }
        },
        {
          path: 'flow-order-detail',
          name: 'FlowOrderDetail',
          component: _import('personalCenter/children/flowOrderDetail/index'),
          meta: {
            title: "收藏加购及访客流量",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'bind-store',
          name: 'BindStore',
          component: _import('personalCenter/children/bindStore/index'),
          children: [
            {
              path: 'store-bind-rules',
              name: 'StoreBindRules',
              component: _import('personalCenter/children/bindStore/children/StoreBindRules'),
              meta: {
                title: "店铺绑定说明",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path: 'store-bind-operating',
              name: 'StoreBindOperating',
              component: _import('personalCenter/children/bindStore/children/StoreBindOperating'),
              meta: {
                title: '店铺绑定操作',
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
          name: 'TaskRelease',
          component: _import('personalCenter/children/TaskRelease'),
          meta: {
            title: "发布活动",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'fast-task-release',
          name: 'FastTaskRelease',
          component: _import('personalCenter/children/FastTaskRelease'),
          meta: {
            title: "快速发布活动",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'recommend',
          name: 'Recommend',
          component: _import('personalCenter/children/Recommend'),
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
          component: _import('personalCenter/children/activityManagement/index'),
          children: [
            {
              path: 'list',
              name: 'ActivitiesList',
              component: _import('personalCenter/children/activityManagement/children/ActivitiesList'),
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
              component: _import('personalCenter/children/activityManagement/children/ApproveShowker'),
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
              component: _import('personalCenter/children/activityManagement/children/ProbationReport'),
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
              component: _import('personalCenter/children/detailAndLog/index'),
              children: [
                {
                  path: 'detail',
                  name: 'ActivityDetail',
                  component: _import('personalCenter/children/detailAndLog/children/ActivityDetail'),
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
                  component: _import('personalCenter/children/detailAndLog/children/ActivityLog'),
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
          component: _import('personalCenter/children/taskManagement/index'),
          children: [
            {
              path: 'wait',
              name: 'TaskWaitAudit',
              component: _import('personalCenter/children/taskManagement/children/TaskWaitAudit'),
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
              component: _import('personalCenter/children/taskManagement/children/TaskPassAudit'),
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
              component: _import('personalCenter/children/taskManagement/children/TaskFailAudit'),
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
          component: _import('personalCenter/children/myProbation/index'),
          children: [
            {
              path: 'wait',
              name: 'ApplyWaitAudit',
              component: _import('personalCenter/children/myProbation/children/ApplyWaitAudit'),
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
              component: _import('personalCenter/children/myProbation/children/ApplyPassAudit'),
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
              component: _import('personalCenter/children/myProbation/children/ApplyFailAudit'),
              meta: {
                title: "我的买家秀-未通过",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 0,
              },
            },
          ]
        },
        {
          path: 'my-trial-report',
          name: 'MyTrialReport',
          component: _import('personalCenter/children/MyTrialReport'),
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
          component: _import('personalCenter/children/MyAppeal'),
          meta: {
            title: "我的建议",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: null,
          }
        },
        {
          path: 'black-list-management',
          name: 'BlackListManagement',
          component: _import('personalCenter/children/BlackListManagement'),
          meta: {
            title: "拿手违规申诉",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'personal-setting',
          name: 'personalSetting',
          component: _import('personalCenter/children/personalSetting/index'),
          children: [
            {
              path: 'personal-account-info',
              name: 'PersonalAccountInfo',
              component: _import('personalCenter/children/personalSetting/children/PersonalAccountInfo'),
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
              component: _import('personalCenter/children/personalSetting/children/WwBind'),
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
              component: _import('personalCenter/children/personalSetting/children/Verfied'),
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
          component: _import('personalCenter/children/helpCenter/index'),
          children: [
            {
              path: 'faq',
              name: 'Faq',
              component: _import('personalCenter/children/helpCenter/children/Faq'),
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
              name: 'FaqSeller',
              component: _import('personalCenter/children/helpCenter/children/FaqSeller'),
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
              name: 'FaqShowker',
              component: _import('personalCenter/children/helpCenter/children/FaqShowker'),
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
          component: _import('personalCenter/children/moneyManagement/index'),
          children: [
            {
              path: 'account-info',
              name: 'AccountInfo',
              component: _import('personalCenter/children/moneyManagement/children/AccountInfo'),
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
              component: _import('personalCenter/children/moneyManagement/children/AccountManagement'),
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
              component: _import('personalCenter/children/moneyManagement/children/PayMoney'),
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
              component: _import('personalCenter/children/moneyManagement/children/GetoutMoney'),
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
              component: _import('personalCenter/children/moneyManagement/children/TransactionRecord'),
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
          component: _import('personalCenter/children/vipMember/index'),
          children: [
            {
              path: 'order',
              name: 'VipMemberOrder',
              component: _import('personalCenter/children/vipMember/children/Order'),
              meta: {
                title: "VIP会员购买",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
            {
              path: 'instructions',
              name: 'VipMemberInstructions',
              component: _import('personalCenter/children/vipMember/children/Instructions'),
              meta: {
                title: "VIP会员说明",
                logInAuthority: true,
                topShow: true,
                bottomShow: true,
                role: 1,
              }
            },
          ]
        },
        {
          path: 'task-fans',
          name: 'TaskFans',
          component: _import('personalCenter/children/WxTaskFans'),
          meta: {
            title: "微信加粉",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path: 'release-good',
          name: 'releaseGood',
          component: _import('personalCenter/children/ReleaseGood'),
          meta: {
            title: "试用活动发布",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        }
      ]
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: _import('merchantPromotion/index'),
      children: [
        {
          path:'promotion-regulation',
          name:'PromotionRegulation',
          component: _import('merchantPromotion/children/PromotionRegulation'),
          meta: {
            title: "赚点钱儿",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path:'promotion-details',
          name:'PromotionDetails',
          component: _import('merchantPromotion/children/promotionDetails/index'),
          meta: {
            title: "赚钱明细",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
        {
          path:'promotion-management',
          name:'PromotionManagement',
          component: _import('merchantPromotion/children/promotionManagement/index'),
          meta: {
            title: "推荐管理",
            logInAuthority: true,
            topShow: true,
            bottomShow: true,
            role: 1,
          }
        },
      ]
    },
    {
      path: '/news',
      name: 'News',
      component: _import('newsPage/News'),
      meta: {
        title: "新闻页",
        logInAuthority: false,
        topShow: true,
        bottomShow: true,
        role: null,
      }
    }
  ],
})
