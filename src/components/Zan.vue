<template>
  <div class="VueStar">
    <div class="VueStar-ground">
      <div class="VueStar-icon" @click="toggle" :class="AnimateClass" :style='{color:ColorValue}'>
        <Icon type="android-favorite"></Icon>
      </div>
      <div class="VueStar-decoration" :class="{ 'active':active}"></div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  export default {
    name:'zan',
    components: {
      Icon: Icon
    },
    props: {
      animate: {
        type:String,
        default:'animated zoomInDown'
      },
      color:{
        type:String,
        default:'DD4D4E'
      }
    },
    data() {
      return {
        active: false,
        toggleAnimate: false,
        toggleColor: false
      }
    },
    mounted() {

    },
    created() {

    },
    computed: {
      AnimateClass () {
        return this.toggleAnimate ? this.animate : ''
      },
      ColorValue () {
        return this.toggleColor ? this.color : ''
      }
    },
    methods: {
      toggle () {
        this.active = !this.active;
        this.toggleAnimate = !this.toggleAnimate;
        this.toggleColor = !this.toggleColor
      }
    }
  }
</script>

<style lang="scss" scoped>
  .VueStar{
    position: absolute;
  }
  .VueStar-ground {
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueStar-icon {
    z-index: 888;
  }
  .VueStar-decoration {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: url('~assert/img/common/zan-image.png') no-repeat;
    background-position: 0 0;
    transition: background-position 1s steps(25);
    transition-duration: 0s;
    .active {
      transition-duration: 1s;
      background-position: -2500px 0;
    }
  }
</style>
