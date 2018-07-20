<template>
  <div class="tribe">
    <div class="identity fs-14">
      <img src="~assets/img/merchant-promotion/crown.png" alt="" width="18" height="18" class="vtc-mid mr-15">
      嗨，{{myPhone}}~您当前的身份是{{getUserLevel}}，当前共有<span v-if="currentTab.id === 1">成员</span><span v-if="currentTab.id === 2">一级成员</span><span v-if="currentTab.id === 3">已脱离成员</span>{{firstLevelTotalElements}}人
    </div>
    <div class="tab-area clear">
      <div v-for="(tab,index) in tabs" :key="index" @click="changeTab(tab)" :class="[{active:currentTab.id === tab.id}]">{{tab.name}}</div>
    </div>
    <div v-if="isChildrenList" class="mb-10">你的成员 {{childrenPhone}} 共拥有下级 {{totalElements}} 人</div>
    <div class="table-area">
      <!--按时间-->
      <div  v-if="currentTable.id === 1">
        <ul class="time-check">
          <li class="thead clear">
            <div>成员名称</div>
            <div>成员层级</div>
            <div>加入时间</div>
            <div v-if="!isChildrenList">TA的上级</div>
            <div>TA的下级（人）</div>
            <div>TA的贡献</div>
            <div></div>
          </li>
          <li v-for="member in memberList" :key="member.id">
            <div>
              <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
              {{member.other.memberPhone}}
            </div>
            <div>{{member.other.hierarchy}}级</div>
            <div>{{member.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
            <div v-if="!isChildrenList">{{member.other.superiorPhone}}</div>
            <div>{{member.other.recommendCounts}}人</div>
            <div><span class="light-green">+{{(member.other.contribute/100).toFixed(2)}}</span>元</div>
            <div class="cursor-p blue" @click="checkChildrenMember(member)">查看</div>
          </li>
        </ul>
        <div v-if="!totalElements" class="mt-15 text-ct">暂无数据</div>
        <div class="mt-15 right" v-if="totalElements">
          <page :total="totalElements" :page-size="pageSize" @on-change="changePages"/>
        </div>
      </div>
      <!--按部落-->
      <div  v-if="currentTab.id === 2">
        <ul class="tribe-check">
          <li class="thead clear">
            <div>成员名称</div>
            <div>成员层级</div>
            <div>加入时间</div>
            <div v-if="!isChildrenList">TA的上级</div>
            <div>TA的下级（人）</div>
            <div>TA的贡献</div>
            <div></div>
          </li>
          <li v-for="member in memberList" :key="member.id">
            <div>
              <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
              {{member.other.memberPhone}}
            </div>
            <div>{{member.other.hierarchy}}级</div>
            <div>{{member.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
            <div v-if="!isChildrenList">{{member.other.superiorPhone}}</div>
            <div>{{member.other.recommendCounts}}人</div>
            <div><span class="light-green">+{{(member.other.contribute/100).toFixed(2)}}</span>元</div>
            <div class="blue cursor-p"  @click="checkChildrenMember(member)">查看</div>
          </li>
        </ul>
        <div v-if="!totalElements" class="mt-15 text-ct">暂无数据</div>
        <div class="mt-15 right" v-if="totalElements">
          <page :total="totalElements" :page-size="pageSize" @on-change="changePages"/>
        </div>
      </div>
      <!--已脱离-->
      <div v-if="currentTab.id === 3">
        <ul class="detach-check" v-if="getLevel !== 0">
          <li class="thead clear">
            <div>成员名称</div>
            <div>成员层级</div>
            <div>脱离时间</div>
            <div>TA的下级（人）</div>
            <div>TA的贡献</div>
          </li>
          <li v-for="member in memberList" :key="member.id">
            <div>
              <img src="~assets/img/merchant-promotion/crown.png" alt="" width="16" height="16" class="vtc-mid">
              {{member.other.memberPhone}}
            </div>
            <div>{{member.other.hierarchy}}级</div>
            <div>{{member.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
            <div>{{member.other.recommendCounts}}人</div>
            <div><span class="light-green">+{{(member.other.contribute/100).toFixed(2)}}</span>元</div>
          </li>
        </ul>
        <div  v-if="getLevel === 0" class="mt-15 text-ct">您没有已脱离成员</div>
        <div v-if="!totalElements" class="mt-15 text-ct">暂无数据</div>
        <div class="mt-15 right" v-if="totalElements">
          <page :total="totalElements" :page-size="pageSize" @on-change="changePages"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Page} from 'iview'
  export default {
    name: "tribe",
    components: {
      Page: Page
    },
    data() {
      return {
        tabs: [
          {
            name: '按加入时间',
            id: 1,
            type: 'joinTime'
          },
          {
            name: '按层级',
            id: 2,
            type:'hierarchy'
          },
          {
            name: '已脱离',
            id: 3,
            type:'divorced'
          }
        ],
        currentTab: {
          name: '按加入时间',
          id: 1,
          type: 'joinTime'
        },
        currentTable: {
          name: '按加入时间',
          id: 1,
          type: 'joinTime'
        },
        pageIndex: 1,
        pageSize: 10,
        totalElements: 0,
        firstLevelTotalElements: 0,
        phoneNumber: null,
        memberList: [],
        isChildrenList: false,
        childrenPhone: null

      }
    },
    computed: {
      myPhone() {
        return this.$store.state.userInfo.phone
      },
      getRole() {
        return this.$store.state.userInfo.role
      },
      getLevel() {
        return this.$store.state.userInfo.extension.inviteRole
      },
      getUserLevel() {
        if (this.getRole === 1) {
          if (this.getLevel === 0) {
            return '普通推荐者';
          } else if (this.getLevel === 1) {
            return '普通推荐者';
          } else if (this.getLevel === 2) {
            return '代理商';
          }
        }
      }
    },
    created() {
      this.getAllMember();
      this.$store.dispatch('getUserInformation');
    },
    mounted() {

    },
    methods: {
      changeTab(tab) {
        this.currentTab = tab;
        this.currentTable = tab;
        this.pageIndex = 1;
        this.memberList = [];
        this.getAllMember();
        this.isChildrenList = false;
      },
      // 获取家族成员列表
      getAllMember() {
        const _this = this;
        api.getAllMember({
          type: _this.currentTab.type,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.memberList = res.data.content;
            _this.totalElements = res.data.totalElements;
            _this.firstLevelTotalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 查看子集成员
      checkChildrenMember(father) {
        const _this = this;
        _this.childrenPhone = father.other.memberPhone;
        api.getChildrenMember({
          fatherId: father.userId,
          phone: _this.phoneNumber,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.isChildrenList = true;
            _this.memberList = res.data.content;
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      changePages(page) {
        this.pageIndex = page;
        this.getAllMember();
      },
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
