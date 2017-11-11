<template>
  <div class="VueStar-ground">
    <div class="VueStar-icon" @click="zanClick">
      <Icon :type="iconType" :size="fontSize + 4" :color="color"></Icon>
      <span class="zan-number ml-5" :style="{color:color,fontSize:fontSize + 'px'}">赞(520)</span>
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
      color: {
        type: String,
        default: '#fff'
      },
      fontSize: {
        type: Number,
        default: 16
      },

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
