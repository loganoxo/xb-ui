<template>
  <div class="VueStar-ground">
    <div class="VueStar-icon" @click="zanClick">
      <Icon :type="iconType" :size="fontSize + 4" :color="color"></Icon>
      <!--      <Icon type="thumbsup" :size="iconFontSize + 4" :color="iconColor"></Icon>-->
      <span class="zan-number ml-5" :style="{color: color,fontSize: fontSize + 'px'}">赞({{zanNumber}})</span>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'

  export default {
    name: 'zan',
    components: {
      Icon: Icon
    },
    props: {
      iconType: {
        type: String,
        default: 'ios-heart-outline'
      },
      iconColor: {
        type: String,
        default: '#fff'
      },
      color: {
        type: String,
        default: '#fff'
      },
      iconFontSize: {
        type: Number,
        default: 22
      },
      fontSize: {
        type: Number,
        default: 16
      },
      zanNumber: {
        type: Number,
        default: 0
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
    computed: {},
    methods: {
      zanClick() {

      }
    }
  }
</script>

<style lang="scss" scoped>

  .VueStar-ground {
    cursor: pointer;
  }

  .VueStar-icon {
    z-index: 888;
    i {
      vertical-align: sub;
    }
  }
</style>
