<template>
  <div class="log-box">
    <div class="seller-log-box">
      <Collapse v-model="buyerCourse">
        <Panel name="1">
          商家活动进程


          <ul slot="content" class="seller-log-details">
            <li>2017-09-19 15:30:33:38 商家创建活动</li>
            <li>2017-09-19 15:30:33:38 商家创建活动</li>
            <li>2017-09-19 15:30:33:38 商家创建活动</li>
            <li>
              2017-09-19 15:30:33:38 商家活动进行中：
               <div class="shower-log-box">
              <Collapse v-model="value1">
                <Panel name="1">
                  秀客 13758794623 活动进程
                  <div slot="content" class="shower-log-details">
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                </div>
                </Panel>
                <Panel name="2">
                  秀客 13758794623 活动进程
                  <div slot="content" class="shower-log-details">
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                </div>
                </Panel>
                <Panel name="3">
                  秀客 13758794623 活动进程
                  <div slot="content" class="shower-log-details">
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                  <p>2017-09-19 15:30:33:38 商家创建活动</p>
                </div>
                </Panel>
              </Collapse>
            </div>
            </li>
            <li>2017-09-19 15:30:33:38 商家创建活动</li>
          </ul>
        </Panel>
      </Collapse>
    </div>


  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Collapse from 'iview/src/components/collapse'

  export default {
    components: {
      Icon: Icon,
      Collapse: Collapse,
      Panel: Collapse.Panel
    },
    data () {
      return {
        value1: '1',
        buyerCourse: "1"
      }
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
