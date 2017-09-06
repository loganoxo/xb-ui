<template>
  <div>
    <iButton :href="url" @click="payPopWindow = true">提交</iButton>
    <Modal v-model="payPopWindow" width="360"
           :styles="{top:'310px',height:'300px'}">
      <div style="text-align:center">
        <p>请前往充值页面进行充值</p>
      </div>
      <div slot="footer">
        <iButton type="success" style="width: 150px;" @click="success" >已完成充值</iButton>
        <iButton type="error" style="width: 150px;"   @click="del">充值遇到问题</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Form from 'iview/src/components/form'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import {mapActions} from 'vuex'
  export default {
    name: 'PopUpWindows',
    components:{
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      ButtonGroup: Button.Group,
      Modal: Modal,
    },
    props:['url'],
    data () {
      return {
        payPopWindow:false
      }
    },
    methods:{
      ...mapActions([
        'getBalance'
      ]),
      success(){
        this.getBalance();
        this.payPopWindow = false;
      },
      del () {
        this.payPopWindow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
