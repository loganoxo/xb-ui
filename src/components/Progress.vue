<template>
  <div class="progressbar" :style="{width: byProgressBarWidth}">
    <div class="progress" :style="{width: byProgressWidth}"></div>
  </div>
</template>

<script>
  export default {
    name: "vue-progress",
    props: {
      progressBarWidth: {
        type: Number,
        default: 200
      },
      progressWidth: {
        type: Number,
        default: 0
      }
    },
    computed: {
      byProgressBarWidth() {
        return `${this.progressBarWidth}px`
      },
      byProgressWidth() {
        return `${this.progressWidth}px`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .progressbar {
    margin: auto;
    height: 12px;
    border: 1px solid $mainColor;
    border-radius: 5px;
    text-align: center;
    line-height: 10px;
    font-size: 0.8em;
  }

  .progress {
    height: 100%;
    background: #F93A1D;
    border-radius: 5px;
    z-index: -1;
    background-size: 30px 30px;
    background-image: -webkit-linear-gradient(-45deg, #F91755, #F91755 25%, #F9E055 25%, #F9E055 50%, #F91755 50%, #F91755 75%, #F9E055 75%, #F9E055);
    background-image: -moz-linear-gradient(-45deg, #F91755, #F91755 25%, #F9E055 25%, #F9E055 50%, #F91755 50%, #F91755 75%, #F9E055 75%, #F9E055);
    background-image: linear-gradient(-45deg, #F91755, #F91755 25%, #F9E055 25%, #F9E055 50%, #F91755 50%, #F91755 75%, #F9E055 75%, #F9E055);
    animation: animate 1.5s linear infinite;
  }

  @keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 60px 30px;
    }
  }
</style>
