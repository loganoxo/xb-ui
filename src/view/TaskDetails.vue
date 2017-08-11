<template>
  <div>
    <div class="task-details-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>试客联盟</Breadcrumb-item>
            <Breadcrumb-item>试用品专区</Breadcrumb-item>
            <Breadcrumb-item>潮流女装</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>
      <div class="container">
        <div class="task-details-top">
          <div class="task-details-top-left left">
            <img src="~assets/img/task-details/task_details_03.png"  alt="">
          </div>
          <div class="task-details-top-right left">
            <h3 class="fs-18">纯色宽松圆领短袖打底衫T恤</h3>
            <p class="fs-14">
              活动类型：
              <span class="fs-18">
                 PC搜索下单（taobao.com）
              </span>
            </p>
            <p class="fs-14">
              单品试用担保金：<span class="fs-18">14.00</span>元
              &nbsp;&nbsp;&nbsp;&nbsp;
              试用份数：<span class="fs-18">14.00</span>份
            </p>
            <p class="fs-14">
              （商家已存入总试用担保金 504.00 元，请放心申请）
            </p>
            <p class="fs-14">
              231 人申请， 9 人正在参与试用， 0 人完成试用， 剩余 27 份
            </p>
            <p class="fs-14">
              <i class="ivu-icon ivu-icon-clock fs-16"></i>
              距申请结束： <span class="fs-24">17</span> 天 <span class="fs-24">02</span> 小时 <span class="fs-24">56</span> 分钟 <span class="fs-24">31</span> 秒
            </p>

            <div>
              <iButton size="large" class="fs-16 default-btn" long type="error">申请试用</iButton>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-details-step">
            <div class="left title">
              试用
              流程
              <span></span>
            </div>
            <ul class="left ctt">
              <li>
                <span>1</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>2</span>
                <em>以14.00元到指定平台购买试用品</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>3</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>4</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>5</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>6</span>
                <em>获得试用资格</em>
              </li>
            </ul>
        </div>
      </div>
      <div class="container">
        <div class="graphic-info">
          <div class="graphic-info-sel">
            <a class="active">活动详情</a>
            <a>试用报告(0)</a>
            <a>已审批秀客(9)</a>
          </div>
          <div class="graphic-info-ctt">
            <div v-show="false" class="graphic-info-details">
              <p class="fs-18 mb-40">
                该活动为9.9元试用活动，请您获得资格后以139.00元到指定平台购买试用品，在您试用完成后试客联盟将返还129.10元至您的互联支付账号；
              </p>
              <p class="fs-18">温馨提示：</p>
              <ul class="fs-18 mb-20">
                <li>
                  1、请不要使用信用卡、花呗等产生手续费的付款方式下单
                </li>
                <li>
                  2、请不要旺旺索要资格及催促商家返款
                </li>
                <li>
                  3、默认快递：中通快递
                </li>
              </ul>
              <img class="block margin" src="~assets/img/task-details/task_details_07.png" alt="">
            </div>
            <div class="graphic-info-report">
              <ul>
                <li>
                  <div class="left">
                    <img src="~assets/img/common/home_24.png" alt="">
                    <p>136****666</p>
                  </div>
                  <div class="left">
                    <p>发表于2017-08-07 10:45:49</p>
                    <p>
                      真的很惊喜了哈，第一是速度，上午买了下午到，当日达效果不错，看来京东的物流确实很强大！照顾到买新机的人很着急！谢谢！速度666 第二，打开很惊艳，手感超级好！
                      试用了一个多小时，系统流畅，拍照效果好，666.第三，性价比很高！5.5英寸，
                      4G运行内存，64存储内存，电池容量大！很不错，处理器也还可以哈！如果你考虑在1500左右的手机这款就是值得购买的！好吧！上几张图片供大家看吧！  查看全文
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '../config/apiConfig'
  import {setStorage, getStorage} from '../config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'task-details',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
    },
    data () {
      return {

      }
    },
    created(){

    },
    computed: {

    },
    methods: {

    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';
  .task-details-ctt{
    background-color: #f1f1f1;
    .task-details-top{
      background-color: #fff;
      padding: 10px;
      height: 380px;
      .task-details-top-left{
        margin-right: 50px;
      }
      .task-details-top-right{
        padding: 15px 0;
        p{
          line-height: 48px;
        }
        div{
          margin-top: 10px;
          width: 150px;
        }
      }
    }
    .task-details-step{
      height: 80px;
      background-color: #fff;
      margin: 10px 0;
      div.title{
        position: relative;
        width: 60px;
        font-size: 18px;
        padding: 13px 10px 10px 10px;
        background-color: $mainColor;
        font-weight: bold;
        color: #fff;
        text-align: center;
        height: 100%;
        span{
          position: absolute;
          right: -12px;
          top: 50%;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          margin-top: -3px;
          border-left-color:  $mainColor;
        }
      }
      ul.ctt{
        display: table;
        height: 100%;
        padding: 0 10px;
        width: 1140px;
        li{
          display: table-cell;
          vertical-align: middle;
          font-size: 14px;
          width: 16.666%;
          span{
            display: inline-block;
            width: 38px;
            height: 38px;
            line-height: 38px;
            border-radius: 50%;
            background-color: #FFB299;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin: 0 2px;
          }
          em{
            font-style: normal;
            width: 58%;
            display: inline-block;
            vertical-align: middle;
          }
          i{
            font-size: 38px;
            vertical-align: middle;
            color: #ccc;
          }
        }
      }
    }
    .graphic-info{
      background-color: #fff;
      margin-bottom: 60px;
      .graphic-info-sel{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        a{
          display: inline-block;
          font-size: 18px;
          color: #666;
          padding: 0 30px;
          text-align: center;
          border-bottom: 2px solid transparent;
        }
        a.active{
          border-bottom: 2px solid $mainColor;
        }
      }
      .graphic-info-ctt{
        .graphic-info-details{
          padding:20px 20px 40px 20px;
          ul{
            line-height: 36px;
          }
        }
        .graphic-info-report{
          ul{
            li{
              display: table;
              padding: 30px 0;
              margin: 0 30px;
              border-bottom: 1px solid #ddd;
              div{
                display: table-cell;
                vertical-align: middle;
              }
              >div:first-child{
                width: 15%;
                text-align: center;
              }
              >div:last-child{
                width: 85%;
              }
            }
          }
        }
      }
    }
  }

</style>
