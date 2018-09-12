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
      <i-input v-model="remarks" type="textarea" placeholder="请输入您的活动备注"></i-input>
    </div>
  </Modal>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Input} from 'iview'
  export default {
    name: "task-remarks-modal",
    components: {
      Modal: Modal,
      iInput: Input
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
        remarks: null
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
          this.$emit('input', false);
        }
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
