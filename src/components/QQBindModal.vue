<template>
  <modal :title="title" :value="closable" :mask-closable="false" :closable="closableIcon" width="380" @on-visible-change="change">
    <div class="text-lf fs-14 mb-10">{{tip}}：</div>
    <i-input type="text" v-model="qqNumberInput" @on-focus="focus" placeholder="请输入您的QQ号"/>
    <div class="text-lf main-color mt-10" v-show="messageText">
      <icon color="#f9284f" size="14" type="ios-close"/>
      <span>{{messageText}}</span>
    </div>
    <div slot="footer">
      <i-button type="error" size="large" long @click="confirm" :loading="loading">确定</i-button>
    </div>
  </modal>
</template>

<script>
  import {Modal, Input, Icon, Button} from 'iview'
  import api from '@/config/apiConfig'

  export default {
    name: "qq-bind-modal",
    components: {
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      iInput: Input
    },
    props: {
      closable: {
        type: Boolean,
        default: false
      },
      closableIcon: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      hasQQNumber() {
        return this.$store.getters.getQQNumber
      },
      title() {
       return !this.hasQQNumber ? 'QQ号设定' : 'QQ号修改'
      },
      tip() {
        return !this.hasQQNumber ? '由于活动及沟通需要，请填写您的QQ号' : '请填写您要修改的QQ号'
      }
    },
    data() {
      return {
        qqNumberInput: null,
        messageText: '',
        loading: false
      }
    },
    methods: {
      confirm() {
        const _this = this;
        const qqReq = /^[1-9][0-9]{5,10}$/;
        if (!_this.qqNumberInput) {
          _this.messageText = '请输入QQ号码！';
          return;
        }
        _this.qqNumberInput = _this.qqNumberInput.replace(/(^\s*)|(\s*$)/g, '');
        if (!qqReq.test(_this.qqNumberInput)) {
          _this.messageText = 'QQ号码输入有误，请重新输入！';
          return;
        }
        _this.loading = true;
        api.addOrEditQqNumber({
          qqNumber: _this.qqNumberInput
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation').then(() => {
              this.$emit('change', false)
            });
            if (_this.hasQQNumber) {
              _this.$Message.success('QQ号修改成功！')
            } else {
              _this.$Message.success('QQ号添加成功！')
            }
          } else {
            _this.$Message.error(res.msg)
          }
          _this.loading = false;
        })
      },
      focus() {
        this.messageText = ''
      },
      change(value) {
        if (!value) {
          this.$emit('change', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
