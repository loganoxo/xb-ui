<template>
  <div class="merchant-promotion clear">
    <div class="sidebar left">
      <ul>
        <li :class="{isSelect:isSelect === 'PromotionRegulation'}">
          <span class="icon-size my-purse"></span>
          <router-link to="/promotion/promotion-regulation">赚点钱儿</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'PromotionDetails'}">
          <span class="icon-size detail"></span>
          <router-link to="/promotion/promotion-details">赚钱明细</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'PromotionManagement'}">
          <span class="icon-size management"></span>
          <router-link to="/promotion/promotion-management">推荐管理</router-link>
        </li>
      </ul>
    </div>
    <div class="promotion-con left clear ml-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "merchant-promotion",
    components: {

    },
    data() {
      return {
        isSelect: "PromotionRegulation",
      }
    },
    computed: {

    },
    created() {
      this.isSelect = this.$route.name;
    },
    mounted() {

    },
    methods: {

    },
    watch: {
      $route(to) {
        this.isSelect = to.name;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/css/mixin";
  .merchant-promotion {
    width: 1200px;
    margin: auto;
    margin-top: 12px;
    padding-bottom: 50px;
    .sidebar {
      background-color: #F8F8F8;
      border: 1px solid #F4F4F4;
      width: 12%;
      min-height: 500px;
      ul {
        li {
          height: 38px;
          line-height: 38px;
          color: #999;
          padding-left: 16px;
          padding-right: 16px;
          text-align: left;
          .icon-size {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            margin-right: 5px;
            transform: translateY(3px);
          }
          a {
            color: inherit;
            font-size: 14px;
            display: inline-block;
            height: 38px;
          }
          &:hover {
            color: #ff6600 !important;
            background-color: #fff;
            border-top: 1px solid #F4F4F4;
            border-bottom: 1px solid #F4F4F4;
          }
          &:hover {
            .my-purse {
              background: url("~assets/img/merchant-promotion/purse-on.png");
            }
          }
          &:hover {
            .detail {
              background: url("~assets/img/merchant-promotion/detail-on.png");
            }
          }
          &:hover {
            .management {
              background: url("~assets/img/merchant-promotion/management-on.png");
            }
          }
          .my-purse {
            background: url("~assets/img/merchant-promotion/purse-off.png");
          }
          &.isSelect {
            .my-purse {
              background: url("~assets/img/merchant-promotion/purse-on.png");
            }
          }
          .detail {
            background: url("~assets/img/merchant-promotion/detail-off.png");
          }
          &.isSelect {
            .detail {
              background: url("~assets/img/merchant-promotion/detail-on.png");
            }
          }
          .management {
            background: url("~assets/img/merchant-promotion/management-off.png");
          }
          &.isSelect {
            .management {
              background: url("~assets/img/merchant-promotion/management-on.png");
            }
          }
          &.isSelect {
            color: #ff6600 !important;
            background-color: #fff;
            border-top: 1px solid #F4F4F4;
            border-bottom: 1px solid #F4F4F4;
          }
        }
      }
    }
    .promotion-con {
      width:86%;
    }
  }

</style>
