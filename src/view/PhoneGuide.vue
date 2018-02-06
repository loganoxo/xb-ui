<template>
  <div class="seller-adv">
    <div style="background-color: #f93357; height: 760px">
      <div class="container pos-rel">
        <img src="/static/img/seller-adv/phone-guide_01.jpg" alt="" class="block">
        <img class="qr-code" :src="qrCodeSrc" alt="">
      </div>
    </div>
    <div class="bgfff" style="padding-top: 80px;">
      <div class="container">
        <img src="/static/img/seller-adv/phone-guide_02.jpg" alt="" class="block">
      </div>
    </div>
    <div class="bgfff">
      <div class="container">
        <img src="/static/img/seller-adv/phone-guide_03.jpg" alt="" class="block">
      </div>
    </div>
    <div class="bgfff">
      <div class="container">
        <img src="/static/img/seller-adv/phone-guide_04.jpg" alt="" class="block">
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import api from '@/config/apiConfig'
  export default {
    name: 'SellerAdv',
    components: {
      vanIcon: Icon,
    },
    data() {
      return {
        qrCodeSrc: null,
      }
    },
    created() {
      let self = this;
      self.getQrcodeQudaoInfo()
    },
    methods: {
      goRegisterFunc(e){
        this.$router.push({path: '/register/seller-register'});
        e.stopPropagation();
        e.preventDefault()
      },
      getQrcodeQudaoInfo(){
        let self = this;
        api.getQrcodeQudaoInfo({qrCode: self.$route.query.from_qudao.toUpperCase()}).then(res => {
            self.qrCodeSrc = res;
        })

      }
    },
    mounted: function () {
      let self = this;
    },
  }
</script>

<style lang="scss" scoped>

  .qr-code{
    position: absolute;
    top: 432px;
    left: 586px;
    width: 150px;
  }
</style>

