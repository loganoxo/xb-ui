<template>
  <div class="content">
    <p slot="header" class="header">
      <Icon type="information-circled"></Icon>
      <span>{{applyName}}提交的活动申请截图</span>
    </p>
    <div class="text-ct mt-20 ">
      <div v-if="userScreenShotImg" style="display: inline-block;padding: 0 10px">
        <img class="cursor-p" style="width:80px ;height: 80px" :src="userScreenShotImg.searchCondition" alt=""
             @click="viewScreenShotFun(userScreenShotImg.searchCondition)">
        <p>搜索条件截图</p>
      </div>
      <div v-if="userScreenShotImg " style="display: inline-block;padding: 0 10px">
        <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.itemLocation" alt=""
             @click="viewScreenShotFun(userScreenShotImg.itemLocation)">
        <p>所在位置截图</p>
      </div>
      <div v-if="userScreenShotImg" style="display: inline-block;padding: 0 10px">
        <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.browseToBottom" alt=""
             @click="viewScreenShotFun(userScreenShotImg.browseToBottom)">
        <p>宝贝浏览见底</p>
      </div>
      <div v-if="userScreenShotImg " style="display: inline-block;padding: 0 10px">
        <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.enshrine"
             @click="viewScreenShotFun(userScreenShotImg.enshrine)">
        <p>加入收藏夹</p>
      </div>
      <div v-if="userScreenShotImg" style="display: inline-block;padding: 0 10px">
        <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.addToCart" alt=""
             @click="viewScreenShotFun(userScreenShotImg.addToCart)">
        <p>加入购物车</p>
      </div>
    </div>
    <div class="text-ct mt-20">
      <Radio-group v-model="passOrNoPass">
        <Radio label=true ><span>通过</span></Radio>
        <Radio class="ml-20" label=false><span>希望重新提交</span></Radio>
      </Radio-group>
    </div>
    <div v-show="passOrNoPass ==='false'" class="mt-20 text-ct">
      <iInput style="width: 80%" placeholder="请填写截图不正确的地方，以便秀客修改" v-model="reason"></iInput>
    </div>
    <div class="text-ct mt-20">
      <iButton type="success" style="width: 110px;" @click="showkerPassAudit(passId,passOrNoPass,reason)">确定</iButton>
    </div>
    <div class="clear mt-20 pt-10">
      <div class="left ml-20" style="color: #FF6636;font-size: 29px">
        <Icon type="alert-circled"></Icon>
      </div>
      <div class="left ml-20" style="text-align: left">
        <p>“通过”秀客直接获得活动资格，“希望重新提交”将通知秀客重新修改截图！</p>
        <p> 您还有<time-down :endTime="activeEndTime"></time-down>进行审核，若该时间内未审核，系统将随机审核通过！</p>
      </div>
    </div>
    <!--照片查看器-->
    <Modal title="照片查看器" v-model="viewScreenShot" :transfer="false" width="600">
      <div class="text-ct">
        <img style="width: 560px" :src="viewScreenShotUrl" alt="">
      </div>
    </Modal>
  </div>

</template>
<script>
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import Radio from 'iview/src/components/radio'
  import Icon from 'iview/src/components/icon'
  import api from '@/config/apiConfig'
  import TimeDown from '@/components/TimeDown'
  import Input from 'iview/src/components/input'


  export default {
    name: 'AuditShowker',
    components: {
      iButton: Button,
      ButtonGroup: Button.Group,
      Modal: Modal,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Icon: Icon,
      TimeDown: TimeDown,
      iInput: Input,


    },
    props: {
      applyName: {
        type: String,
        default: null
      },
      userScreenShotImg: {
        type: Object,
        default: {}
      },
      passId: {
        default: null
      },
      activeEndTime: {
        default: null
      },
    },
    data() {
      return {
        passOrNoPass: 'true',
        reason: null,
        viewScreenShotUrl: null,
        viewScreenShot: false,
      }
    },
    computed: {},
    created() {},
    methods: {
      viewScreenShotFun(type) {
        this.viewScreenShotUrl = type;
        this.viewScreenShot = true;
      },
      showkerPassAudit(id, status, reason) {
        this.setShowkerAudit(id, status, reason);
      },
      setShowkerAudit(id, status, reason) {
        let _this = this;
        api.setTaskShowkerAudit({
          id: id,
          status: status,
          reason: reason || null
        }).then(res => {
          if (res.status) {
            _this.$Message.success("审核秀客成功！");
            _this.$emit('request', false);
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>

  .content {
    .header {
      color: #f60;
      text-align: center;
    }
  }
</style>

