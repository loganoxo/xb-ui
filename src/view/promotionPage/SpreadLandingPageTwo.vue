<template>
  <div class="spread-landing-page-two">
    <div class="spread-landing-page-two-con pos-rel">
      <img src="~assets/img/landing-page/promotion-01.png" alt="推广页面">
      <div class="btn-01" @click="goExperience">马上体验</div>
    </div>
    <div class="spread-landing-page-two-con pos-rel">
      <img src="~assets/img/landing-page/promotion-02.png" alt="推广页面">
      <div class="btn-03" @click="goExperience"></div>
    </div>
    <div class="spread-landing-page-two-con pos-rel">
      <img src="~assets/img/landing-page/promotion-03.png" alt="推广页面">
      <div class="btn-04" @click="goExperience"></div>
    </div>
    <div class="spread-landing-page-two-con pos-rel">
      <img src="~assets/img/landing-page/promotion-04.png" alt="推广页面">
      <div class="btn-05" @click="goExperience"></div>
    </div>
    <div class="spread-landing-page-two-con pos-rel">
      <img src="~assets/img/landing-page/promotion-05.png" alt="推广页面">
      <div class="btn-02" @click="goExperience">
        <span class="fs-18 f-b ml-4">马上免费发布活动</span>
        <span>（评测）</span>
      </div>
    </div>
    <login-to-register-modal v-model="loginToRegisterModal"/>
  </div>
</template>

<script>
  import LoginToRegisterModal from '@/components/LoginToRegisterModal'
  import {Button} from 'iview'
  export default {
    name: "spread-landing-page-two",
    components: {
      LoginToRegisterModal: LoginToRegisterModal,
      IButton: Button,
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      }
    },
    data() {
      return {
        loginToRegisterModal: false
      }
    },
    methods: {
      goExperience() {
        if (this.isLogin) {
          this.$router.push({name: 'TaskRelease'})
        } else {
          this.loginToRegisterModal = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .spread-landing-page-two-con {
    margin: 0 auto 20px auto;
    max-width: 1200px;
    box-shadow: 0 2px 2px 2px #F9F9F9;
  }

  .btn-01 {
    width: 160px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    position: absolute;
    background-color: #fff;
    color: #3BB0C3;
    border-color: #3BB0C3;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 600;
    left: 50%;
    margin-left: -80px;
    bottom: 20px;
    cursor: pointer;
  }

  .btn-02 {
    position: absolute;
    width: 210px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #3BB0C3;
    background-color: #fff;
    border-radius: 5px;
    right: 10px;
    bottom: 50%;
    margin-bottom: -26px;
    cursor: pointer;
  }

  .btn-03 {
    position: absolute;
    width: 120px;
    height: 32px;
    bottom: 47px;
    left: 346px;
    cursor: pointer;
  }

  .btn-04 {
    position: absolute;
    width: 120px;
    height: 32px;
    bottom: 47px;
    right: 309px;
    cursor: pointer;
  }

  .btn-05{
    position: absolute;
    width: 120px;
    height: 32px;
    bottom: 40px;
    left: 294px;
    cursor: pointer;
  }
</style>
