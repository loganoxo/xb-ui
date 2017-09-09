<template>
    <router-view></router-view>
</template>
<script>
    export default {
      name: 'ActivityManagement',
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

<style lang="scss">
  @import 'src/css/mixin';
  .activity-management {
    .main-color {
      color: $mainColor;
    }
    .activity-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
      span {
        display: inline-block;
      }
      span:last-child {
        font-size: 12px;
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .activity-title-s {
      height: 52px;
      line-height: 52px;
      @include sc(14px, #666);
      border-bottom: 2px solid #F6F6F6;
      span {
        color: $mainColor;
      }
    }
    .select-status {
      height: 52px;
      line-height: 52px;
    }
    .activity-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }
    .activity-table table td,
    .activity-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    .activity-table table tr.task-number td {
      text-align: left;
      padding:6px 0 6px 10px;
    }
    .activity-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .activity-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .activity-table table td img {
      width: 54px;
      height: 54px;
    }
    .activity-table table td .img-title {
      display: inline-block;
      width: 132px;
      height: 54px;
      padding-left: 10px;
      text-align: left;
    }
    .activity-table table td.registration {
      color: #2b85e4;
    }
    .activity-table table td .del-edit span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .del-edit span:last-child {
      color: #2b85e4;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .bond span {
      color: $mainColor;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken($mainColor, 10%);
      }
    }
    .activity-table table td .copy span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .approve-manage-info {

    }
    .manage-img img {
      @include wh(54px, 54px)
    }
    .manage-info-con {
      padding: 15px 0 15px 10px;
      height: 88px;
      background-color: #F8F8F8;
    }
    .manage-text {
      color: #000;
      strong {
        color: $mainColor;
      }
    }
    .approve-list-title {
      height: 32px;
      border-bottom: 2px solid $mainColor;
      span {
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
    .order-info {
      padding: 10px 0 16px 12px;
      background-color: #F8F8F8;
      p {
        margin-top: 6px;
      }
    }
    .trial-experience-con {
      color: #000;
      font-weight: 600;
      line-height: 24px;
    }
    .trial-img-info {
      @include wh(884px, 662px);
      border: 1px solid #F8F6F5;
      margin: 20px auto 0 auto;
      position: relative;
      .trial-img {
        @include wh(420px, 500px);
        margin: 26px auto 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .left-btn {
        position: absolute;
        top: 260px;
        left: 140px;
        cursor: pointer;
      }
      .right-btn {
        position: absolute;
        top: 260px;
        right: 140px;
        cursor: pointer;
      }
    }
    .trial-img-list {
      border: 1px solid #f8f6f5;
      margin: 24px 6px;
      padding: 8px 0;
      li {
        float: left;
        margin-left: 46px;
        cursor: pointer;
        padding: 1px;
        @include wh(120px, 80px);
        img {
          width: 100%;
          height: 100%;
          border: 1px solid #f8f6f5;
        }
        &:hover{
          padding: 0;
          border:1px solid $mainColor;
        }
      }
    }
    .check-trial {
      text-align: center;
    }
    .true-btn {
      @include wh(120px, 32px);
      line-height: 32px;
      background-color: $mainColor;
      color: #fff;
      text-align: center;
      margin: 24px auto 0 auto;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }
    .remind {
      width: 600px;
      margin: 24px auto 0 auto;
      .remind-con {
        text-align: left;
      }
    }
    .confirm-refund-model,
    .check-order-model {
      @include fullScreenModel;
    }
    .confirm-refund-con {
      @include fullScreenModelCon(552px, 228px);
      i {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .confirm-refund-info {
      @include wh(514px, 68px);
      padding: 12px 24px;
      background-color: #EEEEEE;
      margin: 46px auto 0 auto;
      p:first-child {
        span:first-child {
          color: #000;
        }
      }
      p:last-child {
        span {
          font-size: 16px;
          color: #000;
        }
        strong {
          font-size: 16px;
          color: #f60;
        }
      }
    }
    .refund-tip {
      color: #ACACAC;
    }
    .check-order-con {
      position: absolute;
      width: 600px;
      background-color: #fff;
      border-radius: 5px;
      left: 50%;
      margin-left: -300px;
      top: 30%;
      padding: 0 32px 26px 32px;
      text-align: center;
      i {
        font-size: 24px;
        cursor: pointer;
      }
      > p:nth-child(2) {
        span {
          font-size: 16px;
        }
      }
      > p:nth-child(3) {
        font-size: 14px;
      }
    }
    .title-tip {
      height: 36px;
      line-height: 36px;
      margin: 56px auto 20px auto;
      color: #000;
      background-color: #FFF6F3;
      font-size: 14px;
    }
    .pay-model {
      @include fullScreenModel
    }
  }

</style>
