<template>
  <div>
    <p class="mt-20">
      <ButtonGroup shape="circle">
        <iButton :ref="faqSel.ref" v-for="(faqSel,index) in faqSelList" :type="faqSel.type" @click="selQuestion(faqSel,index)">
          {{faqSel.text}}
        </iButton>
      </ButtonGroup>
    </p>
    <div>
      <div v-show="selFaq == 'common'" class="faq-que-ans animated fadeIn ">
        <Collapse class="mt-20" v-model="selectedFaq">
          <Panel name="1">
            1、商家活动支持哪几种搜索/下单渠道？
            <p slot="content">
            目前支持淘宝自然搜索，手淘自然搜索，淘口令，直接下单。
           </p>
          </Panel>
          <Panel name="2">
            2、商家发布任务支持哪几种支付方式？
              <p slot="content">
            目前支持支付宝方式
         </p>
          </Panel>
          <Panel name="3">
            3、商家发布的活动需要审核么？审核一般需要多久？
             <p slot="content">
            商家提交的活动是需要经过客服人工审核的，当日18：00之前的任务于当日审核，18：00之后的任务次日审核。 如需紧急上线请联系在线客服。
        </p>
          </Panel>
          <Panel name="4">
            4、审核上线的活动可以中途修改、撤销或者暂停么？
             <p slot="content">
            活动提交审核前，商家应自行检查活动信息是否正确，活动审核上线中途不能撤销或者申请活动暂停。
           </p>
          </Panel>
          <Panel name="5">
            5、商家如何发货？


            <div slot="content">
              <p> 秀客下单后，商家请先核实秀客下单的订单状态以及实付款金额是否有误， 如确认无误之后请根据试客提供的订单号，在自己店铺根据平时合作快递直接操作发货即可。</p>

            </div>
          </Panel>
          <Panel name="6">
            6、秀客下单后要在多久之内操作发货？


            <div slot="content">
              <p> 秀客下单后，商家需在72小时之内给秀客操作发货。平台认为商家操作了成功审核订单号即表示在自己的店铺成功发货。</p>
            </div>
          </Panel>
          <Panel name="7">
            7、商家如何给秀客返款？

            <div slot="content">
              <p> 目前秀吧平台只支持保证金返款。</p>
            </div>
          </Panel>
          <Panel name="8">
            8、秀客需在多长的时间内在平台提交买家秀？

            <div slot="content">
              <p>秀客需要在商家发货后12天内提交买家秀，提交后商家需要在72小时内进行审核评价。</p>
            </div>
          </Panel>
          <Panel name="9">
            9、秀客的买家秀通过后多久可以返款？

            <div slot="content">
              <p>
                秀客发表买家秀，商家确认通过后，通过即可返款。
            </p>
            </div>
          </Panel>
          <Panel name="10">
            10、试用宝贝邮费怎么算？

            <div slot="content">
            <p>
              商家发布活动时可选择宝贝是否包邮，如果宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！
           </p>
          </div>
          </Panel>
          <Panel name="11">
            11、什么条件下可以申请活动结算？

            <div slot="content">
              <p>进行中的活动需满足以下两点可申请结算：</p>
              <p>1、审批份数大于或等于规定试用名额</p>
              <p>2、没有正在参与活动的试客（所有审核的试客都已完成或终止试用）</p>
              <p>已结束的活动需满足以下两点可申请结算：</p>
              <p>1、审批份数大于或等于规定试用名额</p>
              <p>1.1如申请人数大于试用品发放份数，商家审批完相应份数的试用名额</p>
              <p>1.2如申请人数小于试用品发放份数，商家审批申请人数60%以上的试用名额</p>
              <p>2、没有正在参与活动的试客（所有审核的试客都已完成或终止试用）</p>
            </div>
          </Panel>
        </Collapse>


      </div>
      <div v-show="selFaq == 'special'" class="faq-special-explain animated fadeIn ml-5">
        <p>商家完整流程：1、注册账号 > 2、发布活动宝贝并存入担保金/推广费 > 3、审批秀客 > 4、审核订单号并发货 > 5、审核试用报告并返款 > 6、活动结算</p>
        <ul class="faq-special-ctt">
          <li>
            <p class="fs-14 f-b cl000">1、注册账号</p>
            <ul class="faq-special-explain-txt">
              <li>
                第一步：在秀客365首页或顶部点击“免费注册”，进入注册页面。


              </li>
              <li>
                第二步：选择“商家注册”。



              </li>
              <li>
                第三步：填写注册信息并提交即可成功注册。



              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">2、发布活动宝贝并存入担保金/推广费</p>
            <ul class="faq-special-explain-txt">
              <li>
                第一步：在个人中心左侧目录选择“发布试用活动”

              </li>
              <li>
                第二步：填好试用活动信息后，点击“下一步”。

              </li>
              <li>
                第三步：核对活动担保金(及推广费)支付金额，点击“确认支付”。

              </li>
              <li>
                第四步：输入账户的支付密码，点击“确认”。 (注：支付密码初始设置为888888。)

              </li>
              <li>
                第五步：提交成功后工作人员会在3个工作日内审核您发布的活动，审核成功后直接发布成功。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000"> 3、审批秀客</p>
            <ul class="faq-special-explain-txt">
              <li>
                第一步：在“秀品活动管理”列表中，点击活动列表右侧的“审批秀客”，进入所有报名秀客列表中。
              </li>
              <li>
                第二步：在报名秀客列表中，选择您要通过试用资格的秀客，点击“通过”。
                您通过的秀客会进入到已通过的列表中，流程状态显示“已通过待下单”，接下来获得试用资格的秀客就可以到您指定的平台页面(如淘宝)去下单了。。
              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000"> 4、审核订单号并发货</p>
            <ul class="faq-special-explain-txt">
              <li>
                商家须在秀客提交订单号后的3天之内去核对订单号，商家逾期不审核系统将自动审核通过。

              </li>
              <li>
                第一步：进入试用活动管理中心，在活动列表中点击“审批秀客”(或“报名/已通过”)，进入所有秀客报名列表，查看秀员参与试用的状态。

              </li>
              <li>
                第二步：点击“审核订单号”查看该订单号，用此订单号与您指定的下单平台中的“交易记录”核对，核对订单号与实付金额都正确，点击“通过”。

              </li>
              <li>
                注：若在您的店铺交易记录中查不到这个订单号，则需要秀客修改,此时请点击“不通过”，让秀客重新修改订单号。

              </li>
              <li>
                第三步：“通过”订单号后，请及时在平台完成发货，以免影响秀客提交试用报告。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">5、审核试用报告并返款</p>
            <ul class="faq-special-explain-txt">
              <li>
                商家须在秀客提交试用报告后的3天之内完成审核，商家逾期不审核系统将自动审核通过，并将保证金返还给试客。

              </li>
              <li>
                第一步：进入试用活动管理中心，在活动列表中点击“审批秀客”(或“报名/已通过”)，进入所有秀客报名列表，查看秀员参与试用的状态。

              </li>
              <li>
                第二步：点击“审核报行”查看该试用报告，若报告合格，点击“通过”。

              </li>
              <li>
                注：若在您的店铺交易记录中查不到这个订单号，则需要秀客修改,此时请点击“不通过”，让秀客重新修改订单号。

              </li>
              <li>
                第三步：输入支付密码进行返款。

              </li>
            </ul>
          </li>
          <li>
            <p class="fs-14 f-b cl000">6、活动结算</p>
            <ul class="faq-special-explain-txt">
              <li>
                商家须在秀客提交试用报告后的3天之内完成审核，商家逾期不审核系统将自动审核通过，并将保证金返还给试客。

              </li>
              <li>
                活动达到结算条件后可对活动进行结算。

              </li>
              <li>
                第一步：进入试用活动管理中心，查看待申请结算的活动

              </li>
              <li>
                注：若在您的店铺交易记录中查不到这个订单号，则需要秀客修改,此时请点击“不通过”，让秀客重新修改订单号。

              </li>
              <li>
                第二步：点击申请结算，若无费用返还，可立即结算成功，否则需等待后台审核，我们会在24内完成审核，活动剩余费用成功返还，结算成功。

              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Icon from 'iview/src/components/icon'
  import Collapse from 'iview/src/components/collapse'
  import api from '@/config/apiConfig'
  export default {
    name: '',
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
            text: '商家常见问题',
            type: 'primary',
            selFaq: 'common',
            ref: 'common'
          },
          {
            text: '商家活动完整流程',
            type: 'ghost',
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
        if(page){
          let child = self.$refs;
          child[page][0].$el.click()
        }
        if(qusNum){
          self.selectedFaq = qusNum
        }
      })
    },
    created() {

    },
    computed: {
      getUserRole() {
        return this.$store.state.userInfo.role
      },
      userAccount: function () {
        return this.$store.getters.getUserAccountInfo || {};
      },
      userList: function () {
        return this.$store.getters.getPersonalInfo || {};
      },
      userBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      isEditPwdAlready: function () {
        return this.$store.getters.getIsEditPwdAlready;
      }
    },
    methods: {
      selQuestion(faqSel, index){
        let self = this;
        if (faqSel.type == 'primary') {
          return
        } else {
          for (let i = 0, j = self.faqSelList.length; i < j; i++) {
            if (i == index) {
              continue;
            } else {
              self.faqSelList[i].type = 'ghost';
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

  .faq-que-ans {
    width: 900px;
  }

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
</style>
