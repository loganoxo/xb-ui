<template>
  <span :style="{color: color, fontSize: size + 'px', fontWeight: fontWeight}" v-html="time"></span>
</template>

<script>
  import {getSeverTime} from '@/config/utils'

  export default {
    data() {
      return {
        time: '',
        flag: false
      }
    },
    mounted() {
      let time = setInterval(() => {
        if (this.flag === true) {
          clearInterval(time)
        }
        this.timeDown()
      }, 1000)
    },
    props: {
      endTime: {
        required: true,
        default: new Date().getTime() + 86400000
      },
      color: {
        type: String,
        default: '#f9284f'
      },
      size: {
        type: String,
        default: '12'
      },
      fontWeight: {
        type: Number,
        default: 500
      },
      timeEndText: {
        type: String,
        default: ''
      }
    },
    computed: {},
    methods: {
      timeDown() {
        const nowTime = getSeverTime();
        let _this = this;
        let leftTime = parseInt((_this.endTime - nowTime) / 1000);
        let d = parseInt(leftTime / (24 * 60 * 60));
        let h = _this.format(parseInt(leftTime / (60 * 60) % 24));
        let m = _this.format(parseInt(leftTime / 60 % 60));
        let s = _this.format(parseInt(leftTime % 60));
        if (leftTime <= 0) {
          _this.flag = true;
          _this.$emit('timeEnd');
          _this.time = _this.timeEndText;
        } else {
          _this.time = `${d}天${h}小时${m}分${s}秒`
        }
      },
      format(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }
</script>


