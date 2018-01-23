<template>
  <div class="mb-40">
    <div>
      <div v-show="!endShow">
        <div v-show="testState === 1" class="container begin-test text-ct">
          <p class="text-align-rt link-other">
            <!--<router-link to="/" class="inline-block fs-22 f-b">跳过</router-link>-->
          </p>
          <p class="fs-16 cl9c4040 f-b text-ct begin-text">
            您目前的会员等级：普通会员（仅能发一次任务）
          </p>
          <p class="fs-16 cl9c4040 f-b text-ct">
             <span class="main-color">1199</span> 元 / 季度，成为VIP会员（所有功能无限制）
          </p>
          <p style="margin-top: 230px;">
            <a class="begin-btn" @click="changeTestState(2)"></a>
            <router-link to="/user/vip-member" class="buyer-vip"> </router-link>
          </p>
        </div>
        <div v-show="!showTip && testState === 2" class="test-box container">
          <div  class="text-ct">
            <p class="test-question fs-22">
              <a v-for="(question, index) in questionList" :class="[index === answerIndex ? 'active' : '']" >第{{index + 1}}题</a>
            </p>
            <p class="test-question-details">
              {{questionList[answerIndex].question}}
            </p>
            <div class="test-question-box">
              <p class="mt-10 pos-rel" v-for="answer in questionList[answerIndex].answer" @click="getAnswerFunc(answer)" :class="[answer.state === 'error' ? 'cle60012' : '']">
                <img class="selected" :src="questionSelectedUrl[answer.state]" alt=""  >
                {{answer.text}}
                <a class="big-tips fs-14 " v-if="answer.key !== questionList[answerIndex].key" >
                  <em style="font-style: normal;" class="inline-block cl000 answer-desc">
                    {{answer.desc}}
                  </em>
                </a>
              </p>
            </div>
          </div>
          <p class="text-align-rt mt-30">
            <a class="tip-box inline-block" @click="showTipFunc">
              <img src="/static/img/seller-test/tips.jpg" alt="">
            </a>
            <a class="next-box inline-block" @click="nextQuestionFunc" v-show="questionKey === questionList[answerIndex].key">
              <img src="/static/img/seller-test/next.jpg" alt="">
            </a>
          </p>
        </div>
      </div>
      <!--结束-->
      <div class="end-box container" v-show="endShow">
        <p style="margin-top: 510px;" class="text-ct">
          <router-link to="/user/task-release" class="go-task"> </router-link>
        </p>
      </div>
      <!--提醒-->
      <div v-show="showTip && !endShow"  class="container text-ct pb-20" style="background-color: #fcf2d9;">
        <div class="answer-tip-box" :style="{background: 'url(' + tipImgList[answerIndex] + ') no-repeat'}" >
        </div>
        <p class="text-align-rt ">
          <a class="next-box inline-block" @click="showTip=false">
            <img src="/static/img/seller-test/back.png" alt="">
          </a>
        </p>
      </div>
    </div>

  </div>

</template>

<script>
  import api from '@/config/apiConfig'
  export default {
    name: 'SellerTest',
    components: {},
    data() {
      return {
        testState: 1,
        answerIndex: 0,
        questionList: [
          {
            question: '用免费试用提销量，为什么能提权重促转化？',
            answer: [
              {
                text: '安全',
                state: 'unselected',
                key: 'A',
                desc: '18年刷单立法，你还敢刷吗？用白拿拿，走免费试用吧！（白拿拿安全保障措施详见第二题）',
              },
              {
                text: '人群标签',
                state: 'unselected',
                key: 'B',
                desc: '买家1人1号，每日申请上限，凭真正喜好选商品买家信息全面透明（年龄、性别、消费水平，购物喜好全透明）深度访问（1-4天重复访问，搜索进店，收藏加购，货比多家，访问副宝贝，手淘问大家）',
              },
              {
                text: '优质买家秀',
                state: 'unselected',
                key: 'C',
                desc: '买家1人1号，每日申请上限，凭真正喜好选商品买家信息全面透明（年龄、性别、消费水平，购物喜好全透明）深度访问（1-4天重复访问，搜索进店，收藏加购，货比多家，访问副宝贝，手淘问大家）',
              },
              {
                text: '优化转化率',
                state: 'unselected',
                key: 'D',
                desc: '100:1 的申请率，任务秒接，众多优质买家，以往买家秀可查，更多选择,传照片：核心美女网红、平台优质买家秀，平台优质照片'
              },
              {
                text: '以上全都是',
                state: 'unselected',
                key: 'E',
                desc: ''
              },
            ],
            key: 'E'
          },
          {
            question: '用免费试用，该注意哪几方面安全保障？',
            answer: [
              {
                text: '资金安全',
                state: 'unselected',
                key: 'A',
                desc: ' 18年刷单立法，你还敢刷吗？用白拿拿，走免费试用吧！（白拿拿安全保障措施详见第二题）',
              },
              {
                text: '买家号安全',
                state: 'unselected',
                key: 'B',
                desc: 'A、严苛审核：信誉等级注册时间截图，手持身份证拍照实名认证、支付宝实名认证等 B、稽查系统：银行卡、电话号码、收货地址和登录IP，唯一性稽查，确保1人1号 C、商家申诉机制：一旦商家申诉异常情况，查实后立即冻结买家账号和资金',
              },
              {
                text: '流程安全',
                state: 'unselected',
                key: 'C',
                desc: 'A、商家挑选买家：申请买家信息全透明，买家是否通过做任务，全部由商家决定 B、访问深度,行为透明：1-4天重复访问、收藏加购、货比三家等，均需截图上传 C、千人千面，定向推广：根据商家产品属性，定向推广符合标签的拿手人群 ',
              },
              {
                text: '服务到位',
                state: 'unselected',
                key: 'D',
                desc: '一周7天，每天朝九晚九服务模式！只要有问题，随问随答！',
              },
              {
                text: '以上全都是',
                state: 'unselected',
                key: 'E',
                desc: '',
              },
            ],
            key: 'E'
          },
        ],
        questionKey: null,
        showTip: false,
        questionSelectedUrl:{
          unselected: '/static/img/seller-test/unselected.jpg',
          selected: '/static/img/seller-test/selected.png',
          error: '/static/img/seller-test/error.png',
        },
        tipImgList: [
          '/static/img/seller-test/answer_tip_01.jpg',
          '/static/img/seller-test/answer_tip_02.jpg',
        ],
        endShow : false,
      }
    },
    mounted() {
    },
    computed: {},
    created() {
      let self = this;
      api.checkSellerTest().then((res) => {
        if (res.status) {
          self.$router.go(-1);
        }
      })
    },
    methods: {
      changeTestState(state){
        let self = this;
        self.testState = state;
      },
      getAnswerFunc(answer){
        let self = this;
        for(let i=0, j=self.questionList[self.answerIndex].answer.length; i < j; i++){
          self.questionList[self.answerIndex].answer[i].state = 'unselected';
        }
        if(answer.state !== 'unselected'){
          answer.state = 'unselected';
        }else {
          if(answer.key === self.questionList[self.answerIndex].key){
            answer.state = 'selected';
            self.$Message.success({
              content: "回答正确",
              duration: 3,
            });
          }else {
            answer.state = 'error';
          }
        }
        self.questionKey = answer.key;
      },
      showTipFunc(){
        let self = this;
        self.showTip = true;
      },
      nextQuestionFunc(){
        let self = this;
        self.questionKey = '';
        if(self.answerIndex  < self.questionList.length-1 ){
          self.answerIndex += 1;
        }else {
          self.endShow = true;
          api.giveSellerVip().then(res => {})
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .begin-test{
    height: 730px;
    margin: auto;
    background: #ffb850 url("/static/img/seller-test/begin-test.jpg") center no-repeat;
    .begin-text{
      margin-top: 290px;
    }
    .begin-btn{
      display: inline-block;
      width: 240px;
      height: 77px;
      background-color: transparent;
      margin-right: 65px;
    }
    .buyer-vip{
      display: inline-block;
      width: 240px;
      height: 77px;
      background-color: transparent;
    }
  }
  .link-other{
    a{
      color: #850403;
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      border-radius: 50%;
      background-color: #ffdca8;
      margin: 33px 33px auto auto;
    }
  }
  .test-box{
    background: #fcf2d9 url("/static/img/seller-test/test_01.jpg") no-repeat center;
    height: 730px;
    .tip-box{
      vertical-align: -8px;
      margin-right: 20px;
    }
    .test-question{
      margin-top: 120px;
      a{
        display: inline-block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        margin-right: 30px;
        color: #ccc;
        border: 1px dashed #ccc;
      }
      a.active{
        color: #850403;
        border: 1px dashed #850403;
      }
    }
    .test-question-details{
      font-size: 22px;
      color: #fff;
      font-weight: bolder;
      margin-top: 55px;
    }
    .test-question-box{
      width: 770px;
      text-align: left;
      margin: 65px auto auto auto;
      p{
        background-color: #fff;
        height: 50px;
        line-height: 50px;
        padding-left: 90px;
        color: #666;
        font-size: 24px;
        cursor: pointer;
        &:hover .big-tips{
          display: block;
        }
        img.selected{
          vertical-align: -4px;
          margin-right: 30px;
        }
        .big-tips{
          display: none;
          position: absolute;
          right: 130px;
          top: -121px;
          width: 300px;
          height: 190px;
          z-index: 2;
          background: url("/static/img/seller-test/big-tips.png") no-repeat;
          em{
            font-style: normal;
            width: 256px;
            line-height: normal;
            padding-left: 128px;
            margin-top: 50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            box-orient: vertical;
            line-clamp: 5;
            overflow: hidden;
          }
          em.answer-desc{
            position:relative;
            height: 95px;
            overflow:hidden;
          }
        }
      }
      p.error{
        color: #e60012;
      }
    }
  }
  .end-box{
    height: 730px;
    background: #ffb74d url("/static/img/seller-test/end.jpg") no-repeat center;
    .go-task{
      display: inline-block;
      width: 240px;
      height: 77px;
      background-color: transparent;
    }
  }
  .answer-tip-box{
    width: 1000px;
    height: 730px;
    margin: auto;
    background-color: #fcf2d9;
  }

</style>




