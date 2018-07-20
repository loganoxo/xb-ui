<template>
  <div class="management">
    <div class="title">
      <img src="~assets/img/merchant-promotion/management-on.png" alt="" class="purse-icon">
      <span class="fs-18 cl666 ml-10">成员管理</span>
    </div>
    <div class="tab-area clear">
      <div class="tab" v-for="(tab,index) in tabs" :key="index" @click="currentTab = tab" :class="{active : currentTab.id === tab.id}">{{tab.name}}</div>
    </div>
    <div class="pl-10 pr-10">
      <component :is="currentTab.component"></component>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import Contribution from './components/Contribution'
  import Tribe from './components/Tribe'
  export default {
    name: "management",
    components: {

    },
    data() {
      return {
        tabs: [
          {
            name: '成员管理',
            component: Tribe,
            id: 1
          },
          {
            name: '收入贡献榜',
            component: Contribution,
            id: 2
          },
        ],
        currentTab: {
          name: '成员管理',
          component: Tribe,
          id: 1
        }
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .management {
    /*该页面样式*/
    .title {
      padding: 5px;
      border-bottom: 1px solid #f8f8f8;
      .purse-icon {
        width:24px;
        height:24px;
        vertical-align: top;
      }
    }
    .tab-area {
      margin: 20px 10px;
      border-bottom: 1px solid $mainColor;
      .tab {
        float: left;
        padding: 10px 30px;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
        &.active {
          color: #fff;
          background: $mainColor;
        }
      }
    }
  }
</style>
