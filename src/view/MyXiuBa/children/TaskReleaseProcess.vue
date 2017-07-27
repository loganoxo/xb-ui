<template>
  <div class="task-release">
    <div class="task-release-title">发布试用活动</div>
    <div class="flow-title"></div>
    <div class="activity-con">
      <div class="activity-info">
        <div class="activity-info-title">填写活动信息</div>
        <div class="activity-type">
          <span class="required">活动类型：</span>
          <Radio-group v-model="taskRelease.activityType">
            <Radio label="PC">
              <span>PC搜索下单（taobao.com）</span>
            </Radio>
            <Radio label="handTao">
              <span>手淘搜索下单（APP）</span>
            </Radio>
            <Radio label="taoCode">
              <span>淘口令下单（APP）</span>
            </Radio>
            <Radio label="babyLink">
              <span>宝贝链接下单（taobao.com）</span>
            </Radio>
          </Radio-group>
        </div>
        <div class="activity-time">
          <span class="required">活动时长：</span>
          <iInput v-model="taskRelease.activityTime" placeholder="请输入活动时长（天）" style="width: 160px"></iInput>
          <span class="required">天</span>
          <span>请于活动结束后48小时内审批完成所有试客资格，逾期系统将自动为您审批。</span>
          <p>（单期活动时间为3-30天。）</p>
        </div>
        <div class="trial-condition">
          <span>试客申请条件：</span>
          <Checkbox v-model="taskRelease.onlyShowForQualification">只有获得资格的试客才可以查看试用信息</Checkbox>
          <p>勾选后可以避免试客私下索要资格，避免同行举报。但流量、收藏量、分享量会相对减少</p>
          <p>
            <Checkbox v-model="taskRelease.refuseOldShowker">拒绝已参加过本店活动的试客再次申请</Checkbox>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'

  export default {
    name: 'TaskReleaseProcess',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup:Radio.Group
    },
    data() {
      return {
        taskRelease:{
          activityType: 'PC',
          activityTime:null,
          onlyShowForQualification:false,
          refuseOldShowker:false,
          PCTaskDetail:{

          }
        }
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

</style>
