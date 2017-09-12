<template>
  <span :style="{color: color, fontSize: size + 'px', fontWeight: fontWeight}">{{time}}</span>
</template>

<script>
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
      }, 500)
    },
    props: {
      endTime: {
        type: Number,
        default: new Date().getTime() + 86400000
      },
      color: {
        type: String,
        default: '#f60'
      },
      size: {
        type: String,
        default: '12'
      },
      fontWeight: {
        type: Number,
        default: 500
      }
    },
    methods: {
      timeDown() {
        const nowTime = new Date();
        let leftTime = parseInt((this.endTime - nowTime.getTime()) / 1000);
        let d = parseInt(leftTime / (24 * 60 * 60));
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24));
        let m = this.formate(parseInt(leftTime / 60 % 60));
        let s = this.formate(parseInt(leftTime % 60));
        if (leftTime <= 0) {
          this.flag = true;
          this.$emit('timeEnd');
          this.time = `0天0小时0分0秒`;
        }else{
          this.time = `${d}天${h}小时${m}分${s}秒`
        }
      },
      formate(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }
</script>


