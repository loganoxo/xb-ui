<template>
  <div class="my-probation">
    <div class="my-probation-title pl-10">我的活动</div>
    <div class="my-probation-list mt-20">
      <div class="my-probation-list-title">
        <router-link to="/user/my-probation/wait" tag="span" :class="{isSelect:showProbationStatus === 'ApplyWaitAudit'}">待审批</router-link>
        <router-link to="/user/my-probation/pass" tag="span" :class="{isSelect:showProbationStatus === 'ApplyPassAudit'}">已通过</router-link>
        <router-link to="/user/my-probation/fail" tag="span" :class="{isSelect:showProbationStatus === 'ApplyFailAudit'}">未通过</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'MyProbation',
    data() {
      return {
        showProbationStatus:'ApplyWaitAudit'
      }
    },
    mounted() {},
    created() {
      this.showProbationStatus = this.$route.name;
    },
    computed: {},
    watch: {
      $route(to){
        this.showProbationStatus = to.name;
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import 'src/css/mixin';

  .my-probation {
    .main-color {
      color: $mainColor;
    }
    .minor-color {
      color: #999!important;
    }
    .my-probation-title {
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
    .my-probation-list-title {
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

    .probation-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }

    .probation-table table td,
    .probation-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }

    .probation-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }

    .probation-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .probation-table table tr.task-number td {
      text-align: left;
      padding:6px 0 6px 10px;
    }

    .probation-table table td img {
      width: 54px;
      height: 54px;
    }

    .probation-table table td .img-title {
      display: block;
      color: #666;
      width: 208px;
      padding-left: 5px;
      text-align: left;
      max-height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all ;
      -webkit-box-orient: vertical;
      &:hover{
        text-decoration: underline;
        color: #2b85e4;
      }
    }

    .probation-table table td .operation {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }

    .check-status {
      padding-bottom: 20px;
      border-bottom: 1px solid #F4F4F4;
    }

    .order-query {
      padding: 20px 0;
    }

    .commodity-info {
      padding: 15px 0 15px 10px;
      height: 88px;
      background-color: #F8F8F8;
      border: 1px solid #F2F2F2;
    }

    .commodity-img img {
      @include wh(54px, 54px)
    }

    .commodity-text {
      color: #000;
      strong {
        color: $mainColor;
      }
    }

    .place-type {
      padding: 28px 0 12px 0;
      border-bottom: 2px solid #F6F6F6;
      span:first-child {
        font-size: 16px;
        color: #666;
      }
      span:last-child {
        color: red;
        font-size: 14px;
      }
    }

    .place-step,
    .tao-code-place-step,
    .tao-link-place-step {
      p {
        margin-top: 20px;
        color: #999;
        span {
          color: #000;
          font-weight: bold;
        }
      }
    }

    .baby-info {
      img {
        @include wh(124px, 124px);
      }
      p {
        color: #8C9BB6;
        margin-top: 8px;
      }
    }

    .write-order-number {
      span:first-child {
        display: inline-block;
        font-size: 18px;
        background-color: $mainColor;
        padding: 6px 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        @include transition;
        &:hover {
          background-color: darken($mainColor, 10%);
        }
      }
      span:last-child {
        font-size: 14px;
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .tao-code-place-step {
      p {
        span:nth-child(2) {
          color: #2b85e4;
          cursor: pointer;
          &:hover{
           color: darken(#2b85e4, 10%);
          }
        }
      }
    }

    .tao-link-place-step {
      a {
        color: #2b85e4;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .audit-order-number-model {
      @include fullScreenModel;
      .audit-order-number-con {
        @include fullScreenModelCon(600px, 308px);
      }
      i.close-model {
        font-size: 32px;
        cursor: pointer;
      }
      .tip-title {
        @include wh(540px, 42px);
        line-height: 42px;
        margin: 42px auto 0 auto;
        background-color: #EEEEEE;
        span {
          color: #000;
          font-size: 16px;
          margin-left: 26px;
        }
      }
      p {
        span:first-child {
          color: #000;
        }
      }

      .submit-btn {
        @include wh(112px, 32px);
        line-height: 32px;
        background-color: $mainColor;
        color: #fff;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        margin-left: 135px;
        @include transition;
        border-radius: 5px;
        &:hover {
          background-color: darken($mainColor, 10%);
        }
      }
    }

    .order-info {
      height: 112px;
      width: 100%;
      background-color: #F8F8F8;
      border: 1px solid #F2F2F2;
      padding: 0 12px;
      p {
        margin-top: 12px;
        span:first-child {
          color: #666;
        }
        span:nth-child(2) {
          color: #000;
        }
      }
    }

    .experience,
    .experience-img {
      p {
        font-size: 14px;
        color: #666;
      }
    }

    .verification-link{
      border-top: 2px solid #F6F6F6;
      .link-right{
        color: #69B045;
      }
      .link-error{
        color: red;
      }
    }
  }
</style>
