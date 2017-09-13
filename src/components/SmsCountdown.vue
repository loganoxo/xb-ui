<template>
  <button class="sendSmsBtn" :class="[disables ? 'dissendSmsBtn' : '']" type="button" @click="run"
          :disabled="disables || time > 0">{{ btnText }}
  </button>
</template>
<script>
  import api from '@/config/apiConfig'

  export default {
    props: {
      second: {
        type: Number,
        default: 60
      },
      phone: {
        required: true,
        default: null
      },
      purpose: {
        type: String,
        required: true
      },
      validateCode: {
        required: true
      },
      onSuccess: {
        type: Function,
        default() {
          return {};
        }
      },
    },
    data() {
      return {
        time: 0,
        disables: false
      }
    },
    computed: {
      btnText: function () {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    },
    methods: {
      run() {
        let _this = this;
        if (/^1[34578]\d{9}$/.test(_this.phone)) {
          api.getCode({
            phone: _this.phone,
            purpose: _this.purpose,
            validateCode: _this.validateCode,
          }).then((res) => {
            _this.onSuccess(res);
            if (res.status) {
              _this.start();
              _this.setDisabled(true);
            }
          }).catch(err => {
            alert('发送短信接口错误信息：' + err);
          });
        }
      },
      start() {
        this.time = this.second;
        this.timer();
      },
      setDisabled(val) {
        this.disables = val;
      },
      timer() {
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
    outline: none;
    @include transition;
    &:hover {
      background-color: darken($mainColor, 10%);
    }
  }

  .dissendSmsBtn {
    background-color: #666;
  }
</style>


