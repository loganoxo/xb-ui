<template>
  <div class="my-xiu-ba container">
    <div class="my-xiu-ba-title">
      <h1 class="left">我的秀吧</h1>
    </div>
    <div class="tmy-xiu-ba-con clear">
      <div class="my-xiu-ba-con-nav left">
        <ul>
          <li :class="{isSelect:isSelect ==='userHome'}" @click="selectNavigate('userHome')">
            <Icon type="person-stalker"></Icon>
            <router-link to="/user/user-home">我的主页</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='taskRelease'}" @click="selectNavigate('taskRelease')">
            <Icon type="compose"></Icon>
            <router-link to="/user/task-release">发布试用活动</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='eventManagement'}" @click="selectNavigate('eventManagement')">
            <Icon type="clipboard"></Icon>
            <router-link to="/user/task-release">试用活动管理</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='fundsManagement'}" @click="selectNavigate('fundsManagement')">
            <Icon type="social-usd"></Icon>
            <router-link to="/user/task-release">资金管理</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='tradingRecord'}" @click="selectNavigate('tradingRecord')">
            <Icon type="loop"></Icon>
            <router-link to="/user/task-release">交易记录</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='personalSetting'}" @click="selectNavigate('personalSetting')">
            <Icon type="gear-b"></Icon>
            <router-link to="/user/task-release">个人设置</router-link>
          </li>
          <li :class="{isSelect:isSelect ==='helpCenter'}" @click="selectNavigate('helpCenter')">
            <Icon type="help-buoy"></Icon>
            <router-link to="/user/task-release">帮助中心</router-link>
          </li>
        </ul>
      </div>
      <div class="my-xiu-ba-con-right right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
    export default {
      name: 'MyXiuBa',
      components: {
        Icon: Icon,
      },
        data() {
            return {
              isSelect:"userHome"
            }
        },
        mounted() {

        },
        created() {

        },
        computed: {},
        methods: {
          selectNavigate(type) {
            this.isSelect = type;
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';
  .my-xiu-ba-title{
    height: 50px;
    background-color:$mainColor;
    position: relative;
    h1{
      @include sc(28px,#fff);
      position: absolute;
      left: 22px;
      line-height: 50px;
    }
  }
  .tmy-xiu-ba-con{
    margin-top: 12px;
  }
  .my-xiu-ba-con-nav{
    background-color:#F8F8F8;
    border:1px solid #F4F4F4;
    ul{
      li{
        height:38px;
        line-height: 38px;
        color:#999;
        padding-left:16px;
        padding-right:16px;
        cursor: pointer;
        &:hover{
          color:$mainColor!important;
          background-color:#fff;
          border-top:1px solid #F4F4F4;
          border-bottom:1px solid #F4F4F4;
        }
      }
      a{
        color:inherit;
        font-size: 14px;
      }
      i{
        font-size: 18px;
        padding-right: 6px;
      }
    }
  }
  .isSelect{
    color:$mainColor!important;
    background-color:#fff;
    border-top:1px solid #F4F4F4;
    border-bottom:1px solid #F4F4F4;
  }
  .my-xiu-ba-con-right{
    width: 86%;
  }
</style>
