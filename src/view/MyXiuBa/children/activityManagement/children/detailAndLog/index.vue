<template>
  <div class="detail-and-log">
    <div class="detail-and-log-title pl-10 clear">
      <span class="left">试用活动管理</span>
      <span class="right"><router-link to="/user/activity-management/list">返回上一页</router-link></span>
    </div>
    <div class="detail-and-log-list mt-20">
      <div class="detail-and-log-list-title">
        <router-link :to="{'path':'/user/activity-management/detail-log/detail',query:{'taskId': taskId}}" tag="span":class="{isSelect:showStatus === 'ActivityDetail'}">
          活动详情
        </router-link>
        <router-link :to="{'path':'/user/activity-management/detail-log/log',query:{'taskId': taskId}}" tag="span":class="{isSelect:showStatus === 'ActivityLog'}">
          活动日志
        </router-link>
      </div>
    </div>
    <router-view v-on:viewIn="saveTaskId"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'DetailAndLog',
    data() {
      return {
        showStatus: 'ActivityDetail',
        taskId: ''
      }
    },
    mounted() {},
    created() {},
    computed: {},
    watch: {
      $route(to) {
        this.showStatus = to.name;
      }
    },
    methods: {
      saveTaskId(data){
        this.taskId = data;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .detail-and-log-title {
    height: 52px;
    line-height: 52px;
    @include sc(20px, #666);
    border-bottom: 2px solid #F6F6F6;
    span:last-child {
      font-size: 14px;
      color: #2b85e4;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .detail-and-log-list-title {
    height: 32px;
    border-bottom: 2px solid $mainColor;
    > span {
      display: inline-block;
      line-height: 32px;
      @include sc(14px, #000);
      width: 114px;
      text-align: center;
      cursor: pointer;
    }
    .isSelect {
      background-color: $mainColor;
      color: #fff;
    }
  }
</style>
