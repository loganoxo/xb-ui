<template :ref="c1">
  <div class="log-box">
    <div class="seller-log-box">
      <Collapse v-model="buyerCourse">
        <Panel name="1">
          商家活动进程
          <ul slot="content" class="seller-log-details">
            <li v-for="log in logList">
              {{log.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
              <span v-if="log.showkerPhone">{{log.opDesc.replace('{phone}',log.showkerPhone)}}</span>
              <span>
                {{log.opDesc}}
              </span>
              <span v-if="log.auditReason">{{log.auditReason}}</span>
              <div v-if="log.opType == 'under_way' && showkerLogList.length > 0" class="shower-log-box">
                <Collapse  v-for="(showkerLog , index) in showkerLogList" >
                  <Panel>
                    <span style="width: 98%;display: inline-block;"  @click="getShowkerLog(showkerLog, index)"> 秀客 {{showkerLog.showkerPhone}} 任务进程</span>
                    <div slot="content" class="shower-log-details">
                      <p v-for="details in showkerLog.detailsAarrayList">
                        {{details.opTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
                        {{details.opDesc.replace('{phone}',showkerLog.showkerPhone)}}
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
  import Icon from 'iview/src/components/icon'
  import Collapse from 'iview/src/components/collapse'
  import api from '@/config/apiConfig'
  export default {
    components: {
      Icon: Icon,
      Collapse: Collapse,
      Panel: Collapse.Panel
    },
    data () {
      return {
        buyerCourse: "1",
        logList: [],
        showkerLogList: [],
        deleteIndex: [],
      }
    },
    mounted() {

    },
    created() {
      this.getLogList()
    },
    computed: {},
    methods: {
      getLogList(){
        let self  = this;
        api.getLogList({
          taskId: self.$route.query.taskId
        }).then((res) => {
          if(res.status){
            self.logList = res.data;
            for(let i = 0, j = self.logList.length; i < j; i++){
              if(self.logList[i].showkerTaskId){
                self.logList[i].detailsAarrayList = [];
                let part = self.logList.slice(i,i+1);
                self.showkerLogList.push(part[0]);
                self.deleteIndex.push(i);
              }
            }
            for(let z = 0, g = self.deleteIndex.length; z < g; z++){
              self.logList.splice(self.deleteIndex[z],1);
            }
          }else {
            self.$Message.error({
              content: res.msg,
            })
          }
        })
      },
      getShowkerLog(showkerLog, index){
        let self = this;
        if(showkerLog.detailsAarrayList.length > 0){
            return
        }else {
          api.getShowkerLog({
            showkerTaskId: showkerLog.showkerTaskId
          }).then((res) => {
            if(res.status){
              self.showkerLogList[index].detailsAarrayList = res.data;
              self.$set(self.showkerLogList);
            }else {
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
      .shower-log-details{
        p {
          line-height: 30px;
          padding-left: 24px;
        }
      }
    }
  }
</style>
