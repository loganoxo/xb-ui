<template>
  <div>
    <div class="mt-20">
      <ButtonGroup shape="circle">
        <iButton :ref="faqSel.ref" v-for="(faqSel,index) in faqSelList" :type="faqSel.type" :key="index" @click="selQuestion(faqSel,index)">
          {{faqSel.text}}
        </iButton>
      </ButtonGroup>
    </div>
    <div v-show="selFaq === 'common'" class="faq-que-ans animated fadeIn ">
        <a ref="anchor" href="javascript:void(0)" ></a>
        <Collapse class="mt-20" v-model="selectedFaq">
          <Panel name="1">
            1、拿手下单规则：
            <div slot="content">
              <p>1.1、拿手参与下单活动时，须严格按试用详情中的步骤流程进行操作，不允许利用其他方式下单购买，经核查属实，拿手帐号按一类违规处理；</p>
              <p>1.2、拿手下单时，应核对活动商家店铺的旺旺号、以及产品的标题、价格。未核实信息导致下单错误的，将取消本次活动的试用资格，所产生的损失由拿手自行承担； </p>
              <p>1.3、拿手搜索不到对应产品时，应停止操作，以免下单错误，及时向平台客服反应；</p>
              <p>1.4、拿手下单时发现活动产品与店铺产品不一致时（包括价格、标题、属性及活动页面主图），应停止操作，及时向平台客服反应；</p>
              <p>1.5、因商家修改产品价格、标题、属性以及活动页面主图而造成拿手下单错误的，及时向平台客服反应； </p>
            </div>
          </Panel>
          <Panel name="2">
            2、获得免费试用资格后需在多久内下单？
              <p slot="content">
            获得试用资格的拿手，需在24小时内完成下单并将订单号和金额反馈至平台，超时视为自动放弃任务，系统将自动取消任务资格。
            </p>
          </Panel>
          <Panel name="3">
            3、下单需要垫付么
            <p slot="content">
            是的，拿手去到商家店铺购买商品时，需先行垫付，到商品确认收货评价后商家返还垫付资金。
          </p>
          </Panel>
          <Panel name="4">
            4、可以使用花呗、淘金币、信用卡等返利方式下单领取吗？
            <p slot="content">
            不可以。下单领取时禁止使用花呗、信用卡和淘宝客等返利方式付款，如使用后，
            对商家不必要的金钱损失， 白拿拿试用平台视情节严重，对拿手进行对应的处罚，情节严重会进行封号处理。
           </p>
          </Panel>
          <Panel name="5">
            5、商家如何发货？


            <div slot="content">
              <p> 拿手下单后，商家会根据默认合作快递发货。</p>
            </div>
          </Panel>
          <Panel name="6">
            6、下单后什么时候发货？


            <div slot="content">
              <p>下单后，商家会在72小时之内操作发货。</p>
            </div>
          </Panel>
          <Panel name="7">
            7、商家如何返款？


            <div slot="content">
              <p> 目前平台只保证金返款。商家核实试用报告无误后操作（确认返款），存入的保证金将于操作后打入拿手的平台账户。</p>
            </div>
          </Panel>
          <Panel name="8">
            8、商家什么时候返款？


            <div slot="content">
              <p> 在平台提交买家秀后，商家会在24小时内操作返款。</p>
            </div>
          </Panel>
          <Panel name="9">
            9、根据关键词找不到宝贝怎么办？


            <div slot="content">
              <p class="descript"> 温馨提示：</p>
              <p class="mt-10">1、所有审核通过的任务都是审核客服通过商家提供条件筛选找到之后，才审核通过的，基本上都在前十页就可以找到的，请仔细搜索；</p>
              <p>2、若通过下列方法还是无法找到，请<span style="color: #0000FF">清空浏览器缓存</span>或者<span style="color: #0000FF">退出登录淘宝号、更换谷歌、火狐浏览器</span> 尝试一下。</p>
              <p class="descript mt-10">下面教大家如何快捷找到商家发布的对应宝贝：</p>
              <p class="mt-10">第一步：根据搜索词和筛选条件进行搜索，核对商品价格、掌柜旺旺的前一个字符以及商品图片；</p>
              <p>第二步：复制提示掌柜旺旺的的字符：</p>
              <p>第三步：到搜索结果页面，用键盘同时按键 【<span class="descript">Ctrl+F</span>】 在页面搜提示的字符，一般很容易就找到了哦~</p>
              <p class="mt-10"><span style="color: #0000FF">注意：</span>是在页面的右上角弹出框搜索，不是在淘宝的搜索框搜索，切勿在淘宝搜索框直接搜索店铺店铺名字，属严重违规行为！一经发现，直接封号~</p>
              <p class="descript mt-10">如果还是找不到宝贝，请不要随意下单，请及时通过QQ或者微信的方式联系平台客服。</p>
            </div>
          </Panel>
        </Collapse>
      </div>
    <div v-show="selFaq === 'special'" class="faq-special-explain animated fadeIn ml-5">
        <p>拿手完整流程：1、注册账号 > 2、申请活动 > 3、通过审批 > 4、下单领取 > 5、提交单号 > 6、提交试用报告 > 7、领取试用担保金</p>
        <ul class="faq-special-ctt">
          <li>
            <p class="fs-14 f-b cl000">1、注册账号</p>
            <ul class="faq-special-explain-txt">
              <li>
                第一步：在拿手白拿拿首页或顶部点击“免费注册”，进入注册页面。

              </li>
              <li>
                第二步：选择“拿手注册”。

              </li>
              <li>
                第三步：填写注册信息并提交即可成功注册。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">2、申请活动</p>
            <ul class="faq-special-explain-txt">
              <li>
                第一步：在首页或宝贝列表页面点击您感兴趣的宝贝，进入活动页面，点击“申请活动”按钮。

              </li>
              <li>
                第二步：选择你将要前去淘宝购物的旺旺号，然后提交申请。（若未绑定旺旺号，需要先绑定）

              </li>
              <li>
                第三步：申请提交成功。接下来，请您耐心等待商家审批。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000"> 3、通过审批</p>
            <ul class="faq-special-explain-txt">
              <li>
                报名成功后，您可以留意“我的活动”，进入查看您参与的活动。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000"> 4、下单领取</p>
            <ul class="faq-special-explain-txt">
              <li>
                商家须在拿手提交订单号后的3天之内去核对订单号，商家逾期不审核系统将自动审核通过。



              </li>
              <li>
                获得活动资格后，拿手应在24小时内去下单并填写订单号，逾期系统将自动取消拿手的本次活动资格。


              <li>
                第二步：点击“审核订单号”查看该订单号，用此订单号与您指定的下单平台中的“交易记录”核对，核对订单号与实付金额都正确，点击“通过”。

              </li>
              <li>
                下单领取步骤：

              </li>
              <li>
                第一步：获得活动资格后，在“我的活动>已通过”的活动中点击“去下单”

              </li>
              <li>
                第二步：按照商家指定的步骤查找相关宝贝。

              </li>
              <li>
                第三步：找到宝贝后，按正常网购流程拍下商品，并付款。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">5、提交单号</p>
            <ul class="faq-special-explain-txt">
              <li>
                注：请您在下单领取后立即返回白拿拿填写订单号。

              </li>
              <li>
                第一步：按正常网购流程拍下商品并付款之后，在购买记录中(淘宝或拍拍)复制此次交易的订单编号。

              </li>
              <li>
                第二步：返回白拿拿，在“我的活动>已通过”的试用参与活动中点击“填订单号”。。

              </li>
              <li>
                第三步：在弹出的提示框中，粘贴订单编号，并填写实付金额，点击“确定提交”，然后等待商家审核订单号。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">6、提交买家秀</p>
            <ul class="faq-special-explain-txt">
              <li>
                拿手收到宝贝后，就可以拍下照片并制作买家秀了。在下单并填写订单号之后，须在12天内提交试用报告，否则系统将自动取消拿手的本次试用资格。

              </li>
              <li>
                活动达到结算条件后可对活动进行结算。

              </li>
              <li>
                提示：如果因物流或其它因素不能按时提交买家秀，您可以物流截图为凭证，向平台客服反馈。

              </li>
              <li>
                注：若在您的店铺交易记录中查不到这个订单号，则需要拿手修改,此时请点击“不通过”，让拿手重新修改订单号。

              </li>
              <li>
                第一步：在“我的活动>已通过”的活动中点击“制作买家秀”。

              </li>
              <li>
                第二步：在新打开的制作买家秀页面中写下您本次的买家秀，并附上真实原创的宝贝照片，完善内容之后点击“提交买家秀”按钮。

              </li>
              <li>
                提示：买家秀提交后，不能再修改(商家审核不通过除外)，请您确认已经完善内容了之后再提交。

              </li>
              <li>
                第三步：买家秀提交成功后，商家会在24小时内审核，状态显示为“买家秀待确认”。

              </li>
              <li>
                注：1、如果商家在24小时内未审核，系统会自动通过买家秀，并给您返还宝贝担保金。

              </li>
              <li>
                2、点击“提交买家秀”后，在商家审核通过之前，只有您和当前活动的商家能看到，报告审核通过后才公开显示。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">7、领取担保金</p>
            <ul class="faq-special-explain-txt">
              <li>
                拿手的买家我由商家审核通过后，活动的宝贝担保金自动返还到拿手的平台账户中。可对平台账户进行提现：

              </li>
              <li>
                活动达到结算条件后可对活动进行结算。

              </li>
              <li>
                提示：如果因物流或其它因素不能按时提交买家秀，您可以物流截图为凭证，向平台客服反馈。

              </li>
              <li>
                注：若在您的店铺交易记录中查不到这个订单号，则需要拿手修改,此时请点击“不通过”，让拿手重新修改订单号。

              </li>
              <li>
                第一步：点击资金管理；

              </li>
              <li>
                第二步：可在“交易记录”中查看到返回的试用保证金

              </li>
              <li>
                第三步：点击“提现”，输入需要提现的金额和支付密码，点“提交”；（需要先实名认证及绑定提现银行卡）

              </li>
              <li>
                第五步：两个工作日后，登录您提现的银行卡，可查看到该笔提现款项。

              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import {Button, Icon, Collapse} from 'iview'
  import api from '@/config/apiConfig'
  export default {
    name: 'faq-showker',
    components: {
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Collapse: Collapse,
      Panel: Collapse.Panel,
    },
    data() {
      return {
        selectedFaq: '',
        faqSelList: [
          {
            text: '拿手常见问题',
            type: 'primary',
            selFaq: 'common',
            ref: 'common'
          },
          {
            text: '拿手完整流程',
            type: 'default',
            selFaq: 'special',
            ref: 'special'
          }
        ],
        selFaq: 'common'
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        let self = this;
        let page = self.$route.query.page;
        let qusNum = self.$route.query.qusNum;
        let child = self.$refs;
        if(page){
          let child = self.$refs;
          child[page][0].$el.click()
        }
        if(qusNum){
          self.selectedFaq = qusNum;
          self.questionId = 'q' + qusNum;
          child.anchor.onclick = function () {
            document.getElementById(self.questionId).scrollIntoView();
          };
          setTimeout(function () {
            child.anchor.click();
          },300)
        }
      })
    },
    created() {
    },
    computed: {},
    methods: {

      goAnchor(questionId) {
        document.getElementById(questionId).scrollIntoView();
      },
      selQuestion(faqSel, index){
        let self = this;
        if(faqSel.type !== 'primary'){
          for(let i = 0, j = self.faqSelList.length; i < j; i++){
            if(i !== index){
              self.faqSelList[i].type = 'default';
              break;
            }
          }
          self.faqSelList[index].type = 'primary';
          self.selFaq = faqSel.selFaq
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .faq-special-explain {
    > p {
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 14px;
      color: #000;
    }
    .faq-special-ctt {
      > li {
        padding-left: 20px;
        margin-top: 30px;
        p {
          padding: 10px 0;
        }
      }
    }
    .faq-special-explain-txt {
      li {
        line-height: 28px;
        padding-left: 20px;
        font-size: 14px;
      }
    }
  }
  .faq-que-ans p{
    line-height: 24px;
  }
  .descript{
    color: #FF004F;
  }
</style>
