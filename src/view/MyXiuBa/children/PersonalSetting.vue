<template>
  <div class="personal-box">
    <div class="personal-sel-top">
      <a href="">账号信息</a>
      <a href="">旺旺号绑定</a>
      <a href="" class="active">实名认证</a>
    </div>
    <div class="personal-sel-box">

      <!--旺旺号绑定beg-->
      <div v-show="false" class="ww-account-box">
        <div class="ww-account-list">
          <a class="">添加新旺旺号</a>
          <ul class="ww-account-title">
            <li>已绑定旺旺号</li>
            <li>绑定时间</li>
            <li>个人信息截图</li>
            <li>绑定状态</li>
            <li>操作</li>
          </ul>
          <div>
            <ul class="ww-account-ctt">
              <li>freshbox</li>
              <li>2017-07-04 17:00:00</li>
              <li>个人信息截图</li>
              <li>启用中</li>
              <li>
                <a href="">解绑</a>
              </li>
            </ul>
            <ul class="ww-account-ctt">
              <li>freshbox</li>
              <li>2017-07-04 17:00:00</li>
              <li>个人信息截图</li>
              <li>审核不通过</li>
              <li>
                <a href="">重新提交</a>
              </li>
            </ul>
            <ul class="ww-account-ctt">
              <li>freshbox</li>
              <li>2017-07-04 17:00:00</li>
              <li>个人信息截图</li>
              <li>审核中</li>
              <li>
              </li>
            </ul>
          </div>
        </div>
        <div class="ww-account-bind">
          <div class="ww-account-form">
            <iForm ref="wwFormValidate" :model="wwFormValidate" label-position="right" :label-width="100">
              <Form-item label="旺旺ID">
                <iInput v-model="wwFormValidate.wwName"></iInput>
              </Form-item>
              <Form-item label="旺旺信息截图"  class="ww-info-img">
                <iInput v-model="wwFormValidate.wwInfoImg" type="file"></iInput>
              </Form-item>
              <Form-item>
                <iButton  style="background-color: #FF6865; color: #fff"
                          @click="handleSubmit('wwFormValidate')">提交
                  </iButton>
                <iButton type="ghost" @click="handleReset('wwFormValidate')">重置</iButton>
              </Form-item>
            </iForm>

          </div>
          <div class="left ww-account-cue">
            <p>
              <a href="">什么是旺旺ID号？</a>
            </p>
            <p>
              <a href="">[查看示例截图]</a>
              <a href="">[点这里去截图]</a>
            </p>
          </div>
          <p class="error-result-text clear">审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交</p>
        </div>
      </div>
      <!--旺旺号绑定end-->

      <!--实名认证beg-->
      <div class="verified-box">
        <div>
          <div class="verified-form">
            <iForm ref="verifiedValidate" :model="verifiedValidate" :rules="verifiedRuleCustom" label-position="right" :label-width="120">
              <Form-item label="真实姓名" prop="realname">
                <iInput v-model="verifiedValidate.realname"></iInput>
              </Form-item>
              <Form-item label="身份证号"  class="ww-info-img" prop="idcard">
                <iInput v-model="verifiedValidate.idcard"></iInput>
              </Form-item>
              <Form-item label="手持身份证正面照"  class="ww-info-img" prop="picUrl">
                <iInput v-model="verifiedValidate.picUrl" type="file"></iInput>
              </Form-item>
              <Form-item label="手持身份证反面照"  class="ww-info-img" prop="reversePicUrl">
                <iInput v-model="verifiedValidate.reversePicUrl" type="file"></iInput>
              </Form-item>
              <p class="tip clear" style="margin-left: 116px;width: 600px;line-height: 30px;font-size: 14px;color: #999;padding-bottom: 30px;">
                1.审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交
                <br>
                2.审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交
                <br>
                3.审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交
                <br>
                4.审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交
                <br>
                5.审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交
                <br>
              </p>
              <Form-item>
                <iButton  style="background-color: #FF6865; color: #fff"
                          @click="handleSubmit('verifiedValidate')">提交
                </iButton>
                <iButton type="ghost" @click="handleReset('wwFormValidate')">重置</iButton>
              </Form-item>
            </iForm>
          </div>
          <div class="left verified-cue">
            <p>
            </p>
            <p>
            </p>
            <p>
              <a href="">[查看示例截图]</a>
            </p>
            <p>
              <a href="">[查看示例截图]</a>
            </p>
          </div>
          <p class="error-result-text clear">审核不通过：你的后台旺旺信息截图与旺旺ID不符合，请重新提交</p>
        </div>
        <div class="verified-result">
          <p>
            <img src="~assets/img/common/right_64.png" alt="" class="vtc-btm">
            实名认证已提交
          </p>
          <p>亲当前的实名认证已提交，工作人员会在一个工作日内审核你的活动，敬请关注！</p>
        </div>
      </div>
      <!--实名认证end-->

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
  import api from '@/config/apiConfig'
  //  import {setStorage, getStorage} from '/src/config/utils'
  export default {
    name: 'TaskReleaseProcess',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group
    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片验证码'));
        } else {
          callback()
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'));
        } else {
          callback()
        }
      };
      return {
        verifiedValidate: {
          realname: null,
          idcard: null,
          picUrl: null,
          reversePicUrl: null
        },
        verifiedRuleCustom: {
          realname: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          idcard: [
            {validator: validatePass, trigger: 'blur'}
          ],
          picUrl: [
            {validator: validatePass, trigger: 'blur'}
          ],
          reversePicUrl: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
      }
    },
    mounted() {

    },
    created() {

    },
    computed: {},
    methods: {
      handleSubmit (name, callback) {

      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';
  .personal-box {

    .personal-sel-top {
      border-bottom: 1px solid #FF845B;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: #FF845B;
        color: #fff;
      }
    }
    .personal-sel-box {
      .verified-box{
        width: 830px;
        margin: 100px auto auto auto;
        .verified-form{
          width: 400px;
          float: left;
        }
        .verified-cue{
          p{
            height: 36px;
            line-height: 36px;
            margin-bottom: 21px;
            margin-left: 30px;
            a{
              margin-right: 30px;
            }
          }
        }
        .error-result-text{
          margin-left: 116px;
          clear: both;
          font-size: 14px;
        }
        .verified-result{
          p:first-child{
            font-size: 30pt;
            margin: auto;
            width: 500px;
            color: #666;
          }
          p:last-child{
            font-size: 14px;
            margin: 60px auto;
            width: 600px;
            color: #999;
          }
        }
      }
      .ww-account-box{
        .ww-account-list{
          >a{
            margin: 20px 0 20px 10px;
            display: block;
            background-color: #F8F8F8;
            border: 1px solid #E8E8E8;
            color: #666;
            width: 120px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            font-size: 12px;
          }
          .ww-account-title{
            display: table;
            width: 100%;
            background-color: #DDDDDD;
            color: #000;
            height: 38px;
            text-align: center;
            margin-top: 20px;
            li{
              display: table-cell;
              vertical-align: middle;
              width: 20%;
            }
          }
          .ww-account-ctt{
            display: table;
            width: 100%;
            background-color: #FFFFFF;
            color: #999;
            height: 38px;
            border: 1px solid #E2E2E2;
            border-top: none;
            text-align: center;
            li{
              display: table-cell;
              vertical-align: middle;
              width: 20%;
            }
          }
        }
        .ww-account-bind {
          width: 830px;
          margin: 40px auto auto auto;
          .ww-account-form{
            width: 400px;
            float: left;
          }
          .ww-account-cue{
            p{
              height: 36px;
              line-height: 36px;
              margin-bottom: 21px;
              margin-left: 30px;
              a{
                margin-right: 30px;
              }
            }
          }
          .error-result-text{
            margin-left: 102px;
            clear: both;
            font-size: 14px;
          }
        }
      }

    }
  }

</style>
