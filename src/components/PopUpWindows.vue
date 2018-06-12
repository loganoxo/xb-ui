<template>
  <div>
    <Modal v-model="payPopWindow" width="360"
           :styles="{top:'310px'}"
           :closable='false'>
      <div class="text-ct">
        <p>请前往充值页面进行充值</p>
      </div>
      <div slot="footer">
        <iButton type="success" style="width: 150px;" @click="success">已完成充值</iButton>
        <iButton type="error" style="width: 150px;" @click="error">充值遇到问题</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {Button, Modal} from 'iview'
  import {mapActions} from 'vuex'

  export default {
    name: 'PopUpWindows',
    components: {
      iButton: Button,
      ButtonGroup: Button.Group,
      Modal: Modal,
    },
    props: {
      payPopWindows: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        payPopWindow: true
      }
    },
    computed: {
      getUserBalance() {
        return this.$store.getters.getUserBalance;
      }
    },
    created() {
      this.payPopWindow = this.payPopWindows
    },
    methods: {
      ...mapActions([
        'getUserInformation'
      ]),
      success() {
        this.getUserInformation();
        this.payPopWindow = false;
        this.$emit('request', this.payPopWindow);
      },
      error() {
        this.payPopWindow = false;
        this.$emit('request', this.payPopWindow);
      }
    }
  }
</script>

