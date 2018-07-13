<template>
  <div class="tribe">
    <div class="identity fs-14">
      <img src="~assets/img/merchant-promotion/crown.png" alt="" width="18" height="18" class="vtc-mid mr-15">
      嗨，1300000000~您当前的身份是代理商，当前共有族人100人
    </div>
    <div class="tab-area clear">
      <div v-for="(tab,index) in tabs" :key="index" @click="changeTab(tab)" :class="[{active:currentTab.id === tab.id}]">{{tab.name}}</div>
    </div>
    <div class="table-area">
      <!--按时间-->
      <ul v-if="currentTable.id === 1" class="time-check">
        <li class="thead clear">
          <div>成员名称</div>
          <div>成员层级</div>
         <div>加入时间</div>
          <div>TA的上级</div>
          <div>TA的推荐（人）</div>
          <div>TA的贡献</div>
          <div></div>
        </li>
        <li>
          <div>
            <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
            13100000000
          </div>
          <div>1级</div>
          <div>2018-02-01 12:12:12</div>
          <div>13000000004</div>
          <div>3人</div>
          <div>+900.00元</div>
          <div>查看</div>
        </li>
      </ul>
      <!--按部落-->
      <ul v-if="currentTab.id === 2" class="tribe-check">
        <li class="thead clear">
          <div>成员名称</div>
          <div>成员层级</div>
          <div>加入时间</div>
          <div>TA的上级</div>
          <div>TA的推荐（人）</div>
          <div>TA的贡献</div>
          <div></div>
        </li>
        <li>
          <div>
            <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
            13100000000
          </div>
          <div>1级</div>
          <div>2018-02-01 12:12:12</div>
          <div>13000000004</div>
          <div>3人</div>
          <div><span class="light-green">+900.00</span>元</div>
          <div class="blue">查看</div>
        </li>
      </ul>
      <!--已脱离-->
      <ul v-if="currentTab.id === 3" class="detach-check">
        <li class="thead clear">
          <div>成员名称</div>
          <div>成员层级</div>
          <div>脱离时间</div>
          <div>TA的推荐（人）</div>
          <div>TA的贡献</div>
        </li>
        <li>
          <div>
            <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
            13100000000
          </div>
          <div>2级</div>
          <div>2018-02-01 12:12:12</div>
          <div>103人</div>
          <div><span class="light-green">+900.00</span>元</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  export default {
    name: "tribe",
    components: {

    },
    data() {
      return {
        tabs: [
          {
            name: '按加入时间',
            id: 1
          },
          {
            name: '按推荐',
            id: 2
          },
          {
            name: '已脱离',
            id: 3
          }
        ],
        currentTab: {
          name: '按加入时间',
          id: 1
        },
        currentTable: {
          name: '按加入时间',
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
      changeTab(tab) {
        this.currentTab = tab;
        this.currentTable = tab;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .tribe {
    /*单页面样式*/
    .light-green {
      color: #34CD3B;
    }
    /*该页面样式*/
    .identity {
      padding: 0 10px 20px 10px;
    }
    .tab-area {
      padding-bottom: 20px;
      div {
        width: 120px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        float: left;
        background: #f8f8f8;
        cursor: pointer;
        user-select: none;
        &.active {
          color: #fff;
          background: $mainColor;
        }
      }
    }
    .table-area {
      .time-check, .tribe-check {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li {
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ccc;
          &.thead {
            background: #eee;
          }
          div {
            float: left;
          }
          div:nth-of-type(1) {
            width: 16%;
            padding-left: 10px;
          }
          div:nth-of-type(2) {
            width: 12%;
          }
          div:nth-of-type(3) {
            width: 18%;
          }
          div:nth-of-type(4) {
            width: 16%;
          }
          div:nth-of-type(5) {
            width: 12%;
          }
          div:nth-of-type(6) {
            width: 14%;
          }
          div:nth-of-type(7) {
            width: 12%;
          }
        }
      }
      .detach-check {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li {
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ccc;
          &.thead {
            background: #eee;
          }
          div {
            float: left;
          }
          div:nth-of-type(1) {
            width: 20%;
            padding-left: 10px;
          }
          div:nth-of-type(2) {
            width: 20%;
          }
          div:nth-of-type(3) {
            width: 20%;
          }
          div:nth-of-type(4) {
            width: 20%;
          }
          div:nth-of-type(5) {
            width: 20%;
          }
        }
      }
    }
  }
</style>
