<template>
  <div class="fans-container">
    <div class="fans-top">
      <h3 class="fans-title">微信加粉</h3>
      <p class="fans-describe mt-20">帮您快速兑换高质量粉丝，完成自建粉丝池</p>
    </div>
    <div class="fans-questions">
      <h2 class="question text-center m-tb-30">为什么要使用微信加粉？</h2>
      <div class="answer">
        <p class="answer-title">1、废物利用</p>
        <p class="answer-content mt-5">
          尾货/试用商品/赠品等商业价值有限，消耗一件商品就能够带来一个高质量、高匹配的安全粉丝。
        </p>
      </div>
      <div class="answer mt-10">
        <p class="answer-title">2、摆脱平台的限制，自建粉丝池，安全快人一步</p>
        <p class="answer-content mt-5">
          在淘宝严打以来，各大型平台均出现严惩情况，摆脱平台限制，以账号安全作为唯一标准，筛选优质粉丝，自建高质量、高匹配的安全粉丝池才能更安全。
        </p>
      </div>
      <div class="answer mt-10">
        <p class="answer-title">3、突破店铺限制，实现多店铺粉丝资源共享，快速积攒销量</p>
        <p class="answer-content mt-5">
          形成粉丝池后，新开店铺或新品均能快速推广转化，用户不再受到店铺限制。
        </p>
      </div>
      <h2 class="question text-center m-tb-30">粉丝可以为商家带来什么？</h2>
      <div class="clear">
        <div class="fans-get left">
          <div class="get-top top-first text-center">
            <img src="~assets/img/task-fans/get_01.png" alt="安全">
          </div>
          <div class="get-content">
            <span class="get-title block">安全</span>
            <div class="get-describe desc-three">
              <p>以安全账号的粉丝</p>
              <p>作为依托</p>
              <p>建立的粉丝池，安全</p>
            </div>
          </div>
        </div>
        <div class="fans-get left">
          <div class="get-top top-second text-center">
            <img src="~assets/img/task-fans/get_02.png" alt="高匹配，权重高">
          </div>
          <div class="get-content">
            <span class="get-title block">高匹配，权重高</span>
            <div class="get-describe desc-two">
              <p>粉丝经过商家精细筛选</p>
              <p>和商品高契合，提升权重高</p>
            </div>
          </div>
        </div>
        <div class="fans-get left">
          <div class="get-top top-third text-center">
            <img src="~assets/img/task-fans/get_03.png" alt="快速响应">
          </div>
          <div class="get-content">
            <span class="get-title block ">快速响应</span>
            <div class="get-describe desc-two">
              <p>遇到较紧急情况时</p>
              <p>能够快速响应，及时完成</p>
            </div>
          </div>
        </div>
        <div class="fans-get left mr-0">
          <div class="get-top top-fourth text-center">
            <img src="~assets/img/task-fans/get_04.png" alt="高效测款">
          </div>
          <div class="get-content">
            <span class="get-title block">高效测款</span>
            <div class="get-describe desc-three">
              <p>根据粉丝反馈</p>
              <p>快速确定打爆宝贝</p>
              <p>有效且减少成本</p>
            </div>
          </div>
        </div>
      </div>
      <h2 class="question pd-tb-20">如何兑换粉丝？</h2>
      <div>
        <div class="pl-20 border-dashed">
          <p>通过将店铺的尾货/试用商品/赠品等变废为宝，换取意向、高匹配的淘宝买家粉丝，自建粉丝池，为安全、高效积攒销量做好准备。</p>
          <p class="requirement">商品要求及粉丝筛选条件：</p>
          <div class="require-container clear">
            <div class="require-item left text-center require-item-left">
              <img src="~assets/img/task-fans/require-left.png" alt="商品要求" class="require-icon block">
              <div class="require-title">商品要求</div>
              <p>任意费用</p>
              <p>>=</p>
              <p>20元的商品即可</p>
            </div>
            <div class="require-middle left text-center">
              <img src="~assets/img/task-fans/require-middle.png" class="inline-block" alt="兑换">
              <span class="block middle-text">兑换</span>
            </div>
            <div class="require-item left require-item-right">
              <img src="~assets/img/task-fans/require-right.png" alt="" class="require-icon block">
              <div class="require-title text-center">粉丝可筛选条件</div>
              <p class="pl-15">1、未受到惩罚的账号</p>
              <p class="pl-15">2、账号用户标签、会员等级、</p>
              <p class="pl-36">淘气值、性别、年龄、地</p>
              <p class="pl-36">域等均可筛选</p>
            </div>
          </div>
        </div>
      </div>
      <h2 class="question pd-tb-20">兑换粉丝流程？</h2>
      <div class="task-progress"></div>
      <div class="task-form mt-46">
        <div class="form-container">
          <div class="form-item">
            <span class="form-label inline-block">手机号：</span>
            <input type="number" class="form-input" placeholder="请输入手机号" v-model="mobile">
          </div>
          <div class="form-item">
            <span class="form-label inline-block">微信手机号：</span>
            <input type="number" class="form-input" placeholder="请输入微信绑定的手机号" v-model="mobileWx">
          </div>
          <div class="form-item">
            <span class="form-label inline-block">兑换粉丝数量：</span>
            <input type="number" class="form-input" placeholder="请输入要兑换的粉丝数量" v-model="fansNumber">
          </div>
          <div class="form-item">
            <span class="form-label inline-block">缴纳的保障金：</span>
            <input type="number" class="form-input result" placeholder="需缴纳的保障金，粉丝收货后返还" disabled="disabled" v-model="money">
            <span class="form-result form-label inline-block" :title="resultTitle">
              20元/个*<span v-text="num"></span>个粉丝
            </span>
          </div>
          <div class="form-submit text-center cursor-p" @click="submit">立即申请</div>
        </div>
        <div class="form-attention">
          <div class="attention-title text-center">注意事项</div>
          <p>1、粉丝添加微信之后，请按照提交商品发货，违规将扣除对应的保障金;</p>
          <p>2、粉丝添加之后，若存在未发货的情况，将扣除保障金反馈粉丝;</p>
          <p>3、本次活动为平台预售活动，暂不收取服务费用;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {  } from 'iview';
  export default {
    name: "TaskFans",
    data() {
      return {
        mobile: '',
        mobileWx: '',
        fansNumber: '',
      }
    },
    computed: {
      money() {
        const n = Math.floor( Math.abs( Number( this.fansNumber ) ) );
        return n * 20 ? n * 20 : '';
      },
      num() {
        const n = Math.floor( Math.abs( Number( this.fansNumber ) ) );
        return n;
      },
      resultTitle() {
        return `20元/个*${this.num}个粉丝`;
      }
    },
    methods: {
      submit() {
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.mobile) || !reg.test(this.mobileWx) || !this.fansNumber) {
          this.$Message.error('请输入手机号和兑换粉丝数量');
        } else {
          window.open('http://wpa.qq.com/msgrd?v=3&uin=171142825&site=qq&menu=yes')
        }

      }
    },
    created() {
      this.$store.commit({
        type: 'SET_ACTIVITY_CATEGORY',
        info: 'task-fans'
      });
      this.$store.commit({
        type: 'TASK_CATEGORY_LIST',
        info: 'task-fans'
      });
    },
    beforeDestroy() {
      this.$store.commit({
        type: 'SET_ACTIVITY_CATEGORY',
        info: ''
      });
      this.$store.commit({
        type: 'TASK_CATEGORY_LIST',
        info: ''
      });
    }
  }
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
.m-tb-30 {
  margin: 25px 0;
}

.fans-container {
  border: solid #ddd 1px;
  background: #f8f8f8;
  color: #666;
  font-size: 14px;
  font-family: "微软雅黑";
  width: 100%;
  padding: 15px;
}
.fans-top {
  -webkit-box-shadow:  2px 2px 10px #ccc;
  -moz-box-shadow:  2px 2px 10px #ccc;
  box-shadow:  2px 2px 10px #ccc;
  border-radius: 12px;
  background: #fff;
  padding: 10px;
  text-align: center;
  .fans-title {
    color: #f00;
    font-size: 18px;
    font-weight: 600;
    position: relative;
  }
  .fans-title:after {
    border-bottom: solid 2px #ccc;
    content: '';
    display: block;
    width: 36px;
    height: 0;
    position: absolute;
    left: 50%;
    top: 34px;
    margin-left: -18px;
  }
  .fans-describe {

  }
}
.fans-questions {
  padding: 0 10px 50px 10px;
  .border-dashed {
    border-bottom: dashed 1px #ccc;
  }
  .question {
    color: #fd6b22;
    font-size: 20px;
    font-weight: bold;
  }
  .answer {
    background: #eff3f4;
    border: solid 1px #e2e6e9;
    padding: 15px 10px;
    .answer-title {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .fans-get {
    -webkit-box-shadow:  2px 2px 10px #ccc;
    -moz-box-shadow:  2px 2px 10px #ccc;
    box-shadow:  2px 2px 10px #ccc;
    border-radius: 6px;
    width: 230px;
    height: 220px;
    margin-right: 20px;
    overflow: hidden;
    .top-first {
      background: #94db7b;
    }
    .top-second {
      background: #faa27e;
    }
    .top-third {
      background: #fbc058;
    }
    .top-fourth {
      background: #77c2ae;
    }
    .get-top {
      height: 70px;
      padding-top: 5px;
    }
    .get-content {
      background: #fff;
      height: 150px;
      text-align: center;
    }
    .get-title {
      font-weight: 600;
      font-size: 16px;
      padding: 20px 0 10px 0;
    }
    .get-describe p {
      margin-bottom: 6px;
    }
    .desc-two {
      padding-top: 12px;
    }
  }
  .mr-0 {
    margin-right: 0;
  }
  .requirement {
    font-size: 16px;
    font-weight: 600;
    margin-top: 30px;
  }
  .require-container {
    padding: 20px 90px 30px 90px;
  }
}
.require-item-left {
  border-top: solid 3px #3780ff;
}
.require-item-right {
  border-top: solid 3px #20ac03;
}
.require-item {
  -webkit-box-shadow:  2px 2px 6px #e6e9f0, -2px 0 6px #e6e9f0;
  -moz-box-shadow:  2px 2px 6px #e6e9f0, -2px 0 6px #e6e9f0;
  box-shadow:  2px 2px 6px #e6e9f0, -2px 0 6px #e6e9f0;
  background: #fff;
  width: 210px;
  height: 290px;
  .require-icon {
    margin: 25px auto;
    padding-left: 10px;
  }
  .require-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    line-height: 30px;
  }
  .pl-36 {
    padding-left: 36px;
  }
}
.require-middle {
  width: 340px;
  height: 290px;
  padding-top: 80px;
  .middle-text {
    color: #fd6b22;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 4px;
  }
}
.task-progress {
  background: url("~assets/img/task-fans/task-progress.png");
  background-size: 100% 100%;
  width: 100%;
  height: 214px;
}
.task-form {
  background: url("~assets/img/task-fans/task-form.png");
  background-size: 100% 100%;
  width: 100%;
  height: 724px;
  padding-top: 118px;
  position: relative;
}
.form-container {
  padding-left: 380px;
  .form-item {
    margin-bottom: 20px;
    .form-label {
      font-size: 15px;
      width: 125px;
      padding: 15px 15px 0 0;
      text-align: right;
    }
    .form-input {
      border: solid 1px #ccc;
      font-size: 15px;
      width: 260px;
      height: 44px;
      outline: 0;
      padding: 14px 15px;
      &:focus {
        border-color: #f9274e;
      }
    }
    .form-input.result {
      border-color: #f9274e;
      background: #fef4f2;
      color: #f9274e;
    }
    .form-result {
      width: 180px;
      color: #f9274e;
      padding-left: 12px;
      padding-right: 0;
      position: relative;
      top: 5px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .form-submit {
    background: #f9274e;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-left: 160px;
    width: 190px;
    height: 40px;
    line-height: 40px;
    outline: 0;
  }
  .form-submit:hover {
    opacity: 0.8;
  }
  .form-submit:active {
    opacity: 1;
  }
}
.form-attention {
  position: absolute;
  bottom: 44px;
  width: 100%;
  height: 140px;
  padding: 25px 45px;
  p {
    font-size: 15px;
    margin-bottom: 12px;
  }
  .attention-title {
    font-size: 20px;
    font-weight: 600;
    color: #f2f2f2;
    position: absolute;
    top: -45px;
    width: 100%;
    padding-right: 90px;
  }
}
</style>
