<template>
  <Modal :value="value" title="活动备注" :mask-closable="false" @on-visible-change="change" width="700">
    <div class="task-info clear pb-10">
      <img :src="activityInfo.taskMainImage | imageSrc('!thum54')" alt="活动主图" width="54" height="54" class="left">
      <div class="left ml-10">
        <p>
          <span>活动编号：{{activityInfo.number}}</span>
          <span class="ml-10">（{{activityInfo.taskStatusDesc}} / {{activityInfo.settlementStatusDesc}}）</span>
        </p>
        <p class="ellipsis">活动名称：{{activityInfo.taskName}}</p>
      </div>
    </div>
    <div class="remarks-edit mt-20">
      <i-input v-model="remarks" type="textarea" placeholder="请输入您的活动备注" :rows="4" :autosize="{ minRows: 2, maxRows: 6 }"></i-input>
    </div>
    <div slot="footer">
      <i-button class="cl-fff bg-main-color" long :loading="loading" @click="submitRemark">确定</i-button>
    </div>
  </Modal>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Input, Button} from 'iview'
  export default {
    name: "task-remarks-modal",
    components: {
      Modal: Modal,
      iInput: Input,
      IButton: Button
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      activityInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        remarks: null,
        loading: false
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      change(value) {
        if (!value) {
          this.remarks = null;
          this.$emit('input', false);
        } else {
          this.remarks = this.activityInfo.taskExt ? this.activityInfo.taskExt.remark : null;
        }
      },
      submitRemark() {
        const _this = this;
        if (!_this.remarks) {
          _this.$Message.info('请输入备注信息');
          return
        }
        _this.loading = true;
        api.merchantRemark({
          taskId: _this.activityInfo.taskId,
          remark: _this.remarks
        }).then(res => {
          if (res.status) {
            _this.$Message.success('活动备注成功！');
            this.remarks = null;
            this.$emit('input', false);
            this.$emit('remarkSuccess');
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .task-info {
    border-bottom: 1px solid #dddee1;
  }
</style>
