<template>
  <button class="sendSmsBtn" :class="[disables ? 'dissendSmsBtn' : '']" type="button" @click="run" :disabled="disables || time > 0">{{ btnText }}</button>
</template>
<script>
  export default {
    props: {
      second: {
        type: Number,
        default: 60
      }

    },
    data () {
      return {
        time: 0,
        disables: false
      }
    },
    props: ['phone'],
    computed: {
      btnText: function () {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    },
    methods: {
      run: function () {
        if (/^1[34578]\d{9}$/.test(this.phone)) {
          this.$emit('sendCode');
          this.start();
          this.setDisabled(true);
        }
      },
      start: function () {
        this.time = this.second;
        this.timer();
      },
      setDisabled: function (val) {
        this.disables = val;
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.setDisabled(false);
        }
      }

    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .sendSmsBtn {
    position: absolute;
    right: 0;
    height: 30px;
    line-height: 34px;
    border-radius: 3px;
    background: $mainColor;
    border: none;
    padding: 0 6px;
    color: #fff;
    display: inline-block;
    width: 90px;
    top: 13px;
    margin-right: 2px;
    cursor: pointer;
  }
  .dissendSmsBtn {
    background-color:#666;
  }
</style>


