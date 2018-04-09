<template>
  <div>
    <div class="merchant-guide-model" v-if="showMerchantGuideStep"></div>
    <div class="merchant-guide" v-if="showMerchantGuideStep">
      <div class="merchant-guide-step-01" v-show="merchantGuideStep === 1">
        <img src="~assets/img/merchant-guide/merchant-guide-step-01.png" alt="">
        <div class="merchant-guide-step-01-btn" @click="merchantGuideNextStep(2,'UserHome')"></div>
      </div>
      <div class="merchant-guide-step-02" v-show="merchantGuideStep === 2">
        <img src="~assets/img/merchant-guide/merchant-guide-step-02.png" alt="">
        <div class="merchant-guide-step-02-btn" @click="merchantGuideNextStep(3,'TaskReleaseProcess')"></div>
      </div>
      <div class="merchant-guide-step-03" v-show="merchantGuideStep === 3">
        <img src="~assets/img/merchant-guide/merchant-guide-step-03.png" alt="">
        <div class="merchant-guide-step-03-btn" @click="merchantGuideNextStep(4,'TaskReleaseProcess')"></div>
      </div>
      <div class="merchant-guide-step-04" v-show="merchantGuideStep === 4">
        <img src="~assets/img/merchant-guide/merchant-guide-step-04.png" alt="">
        <div class="merchant-guide-step-04-btn" @click="startExperience()"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        merchantGuideStep: 1,
        showMerchantGuideStep: true
      }
    },
    mounted() {
      this.$router.push({name:'Home'});
    },
    created() {

    },
    computed: {},
    methods: {
      merchantGuideNextStep(step, to) {
        this.$router.push({name: to});
        this.merchantGuideStep = step;
      },
      startExperience() {
        this.merchantGuideStep = 0;
        this.showMerchantGuideStep = false;
      },
      startExperience() {}
    }
  }
</script>

<style lang="scss" scoped>
  .merchant-guide-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
  }

  .merchant-guide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }

  .merchant-guide-step-01 {
    width: 940px;
    height: 528px;
    position: absolute;
    left: 50%;
    margin-left: -312px;
    margin-top: 166px;
    z-index: 1001;
  }

  .merchant-guide-step-01-btn {
    width: 134px;
    height: 28px;
    position: absolute;
    bottom: 58px;
    right: 144px;
    cursor: pointer;
  }

  .merchant-guide-step-02 {
    width: 616px;
    height: 419px;
    position: absolute;
    left: 50%;
    margin-left: -623px;
    margin-top: 210px;
  }

  .merchant-guide-step-02-btn {
    width: 134px;
    height: 28px;
    position: absolute;
    bottom: 149px;
    right: 201px;
    cursor: pointer;
  }

  .merchant-guide-step-03 {
    width: 597px;
    height: 232px;
    position: absolute;
    right: 50%;
    margin-right: 10px;
    margin-top: 203px;
  }

  .merchant-guide-step-03-btn {
    width: 134px;
    height: 28px;
    position: absolute;
    top: 170px;
    left: 265px;
    cursor: pointer;
  }

  .merchant-guide-step-04 {
    width: 803px;
    height: 684px;
    position: absolute;
    right: 0;
    top: 126px;
  }

  .merchant-guide-step-04-btn {
    width: 134px;
    height: 28px;
    position: absolute;
    bottom: 224px;
    left: 126px;
    cursor: pointer;
  }
</style>
