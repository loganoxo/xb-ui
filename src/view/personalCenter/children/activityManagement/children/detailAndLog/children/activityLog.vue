<template :ref="c1">
  <div class="log-box">
    <div class="activity-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="20%">活动标题</th>
          <th width="14%">活动开始 / 结束时间</th>
          <th width="10%">活动状态</th>
          <th width="12%">报名 / 已通过</th>
          <th width="8%">可审批名额</th>
          <th width="24%">活动所需担保金 / 活动所需推广费 / 已存入</th>
        </tr>
        </thead>
        <tbody>
        <tr class="task-number">
          <td colspan="7">活动编号：{{itemCatalog.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="itemCatalog.taskMainImage + '!thum54'" :alt="itemCatalog.taskName">
            <span class="img-title left">{{itemCatalog.taskName}}</span>
          </td>
          <td>
            <p>{{itemCatalog.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{itemCatalog.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td v-if="itemCatalog.taskStatus !== 'waiting_modify'">{{itemCatalog.taskStatusDesc}}<br/>{{itemCatalog.settlementStatusDesc}}
          </td>
          <td class="cursor-p main-color" v-else>
            <tooltip :content="itemCatalog.auditLogs[itemCatalog.auditLogs.length - 1].resultMsg" placement="top">
              <icon color="#f9284f" type="information-circled"/>&nbsp;待修改
            </tooltip>
          </td>
          <td class="registration">{{itemCatalog.showkerApplyTotalCount || 0}} / {{itemCatalog.showkerApplySuccessCount
            || 0}}（人）
          </td>
          <td>{{itemCatalog.taskCount - itemCatalog.showkerApplySuccessCount}}</td>
          <td>{{itemCatalog.totalMarginNeed / 100}} / {{itemCatalog.promotionExpensesNeed / 100}} /
            {{(itemCatalog.marginPaid + itemCatalog.promotionExpensesPaid) / 100 || 0}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="seller-log-box">
      <Collapse v-model="buyerCourse">
        <Panel name="1">
          商家活动进程
          <ul slot="content" class="seller-log-details">
            <li v-for="log in logList" v-if="!(log.opType === 'showker_apply_success')">
              {{log.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
              <span v-if="log.showkerPhone">{{log.opDesc.replace(/{phone}/g,log.showkerPhone)}}</span>
              <span v-else>
                {{log.opDesc}}
              </span>
              <span v-if="log.auditReason">
                ({{log.auditReason}})
              </span>
              <div v-if="log.opType === 'under_way' && showkerLogList.length > 0" class="shower-log-box">
                <Collapse>
                  <Panel v-for="(showkerLog, index) in showkerLogList" :key="showkerLog.id">
                    <span style="width: 98%;display: inline-block;" @click="getShowkerLog(showkerLog, index)"> 拿手 {{showkerLog.showkerPhone}} 任务进程</span>
                    <div slot="content" class="shower-log-details">
                      <p v-for="details in showkerLog.detailsAarrayList">
                        {{details.opTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
                        {{details.opDesc.replace('{phone}',showkerLog.showkerPhone)}}
                        <span v-if="details.auditDescription">（原因：{{details.auditDescription}})</span>
                      </p>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </li>
          </ul>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
  import {Icon, Collapse} from 'iview'
  import {decode} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    components: {
      Icon: Icon,
      Collapse: Collapse,
      Panel: Collapse.Panel,
    },
    data() {
      return {
        taskId: '',
        itemCatalog: [],
        buyerCourse: "1",
        logList: [],
        showkerLogList: [],
        deleteIndex: [],
        collapseIndex: [],
      }
    },
    mounted() {

    },
    created() {
      let taskId = decode(this.$route.query.q);
      if (taskId) {
        this.taskId = taskId;
        this.getTaskInfo();
      }
      this.getLogList()
    },
    computed: {},
    methods: {
      getTaskInfo() {
        let _this = this;
        api.getTaskInfo({
          taskId: _this.taskId
        }).then(res => {
          if (res.status) {
            _this.itemCatalog = res.data
          } else {
            _this.$Message.error({
              content: res.msg
            })
          }
        })
      },
      getLogList() {
        let self = this;
        api.getLogList({
          taskId: self.taskId
        }).then((res) => {
          if (res.status) {
            self.logList = res.data;
            for (let i = 0, j = self.logList.length; i < j; i++) {
              if (self.logList[i].showkerTaskId) {
                self.logList[i].detailsAarrayList = [];
                let part = self.logList.slice(i, i + 1);
                self.collapseIndex.push(i);
                self.showkerLogList.push(part[0]);
                self.deleteIndex.push(i);
              }
            }
          } else {
            self.$Message.error({
              content: res.msg,
            })
          }
        })
      },
      getShowkerLog(showkerLog, index) {
        let self = this;
        if (showkerLog.detailsAarrayList.length === 0) {
          api.getShowkerLog({
            showkerTaskId: showkerLog.showkerTaskId
          }).then((res) => {
            if (res.status) {
              self.showkerLogList[index].detailsAarrayList = res.data;
              self.$set(self.showkerLogList, index, self.showkerLogList[index]);
            } else {
              self.$Message.error({
                content: res.msg,
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

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
    padding: 6px 0 6px 10px;
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

  .log-box {
    div.seller-log-box {
      margin-top: 20px;
      ul.seller-log-details {
        li {
          line-height: 30px;
          padding-left: 24px;
        }
      }
    }
    div.shower-log-box {
      .shower-log-details {
        p {
          line-height: 30px;
          padding-left: 24px;
        }
      }
    }
  }

</style>
