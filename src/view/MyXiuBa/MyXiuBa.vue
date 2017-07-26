<template>
  <div class="my-xiu-ba">
    <div class="my-xiu-ba-title">我的秀吧</div>
    <div class="tmy-xiu-ba-con">
      <div class="my-xiu-ba-con-nav">
        <ul>
          <li>
            <router-link to="/user/user-home">我的主页</router-link>
          </li>
          <li>
            <router-link to="/user/task-release">发布试用活动</router-link>
          </li>
          <li>试用活动管理</li>
          <li>资金管理</li>
          <li>交易记录</li>
          <li>个人设置</li>
          <li>帮助中心</li>
        </ul>
      </div>
      <div class="my-xiu-ba-con-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {

        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
