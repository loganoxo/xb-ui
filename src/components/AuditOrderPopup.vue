<template>
  <div class="check-order-model">
    <div class="check-order-con">
      <i class="right" @click="closeModel">&times;</i>
      <div class="screenshot" v-if="mainBabyRawData.length > 0 || mainAnswerRewData.length > 0 || similarBabyRawData.length > 0">
        <div class="f-b fs-14 main-color mt-10">
          请查看拿手提交的截图信息
          <span class="f-b fs-12 cl666">（未按要求的截图可选择重新提交）</span>
        </div>
        <div class="f-b fs-14 main-color mt-10">
          <!--未按要求操作的截图可向客服<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=3505605204" target="_blank" class="blue">大白（QQ：3505605204）</a>反馈，核实后我们将在结算时退还对应截图的费用！-->
          未按要求操作的截图可向客服<a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAxOTQwNF80ODQ2MjlfODAwMDE5NDA0XzJf" target="_blank" class="blue">庄周（QQ：800019404）</a>反馈，核实后我们将在结算时退还对应截图的费用！
        </div>
        <div class="screen-shots-area">
          <!--主宝贝截图-->
          <div class="main-baby-image" v-if="mainBabyImageList.length > 0">
            <p class="main-baby-image-title fs-12 f-b cl666">查看拿手提交的主宝贝浏览截图</p>
            <div class="image-area" v-for="(item,index) in mainBabyImageList" :key="index">
              <img :src="item.screenshotsList[0].src" alt="" width="54" height="54" @click="previewImage(item.screenshotsList[0].src)">
              <p>{{item.title}}</p>
              <div>
                <checkbox v-model="item.isSelect">
                  <span class="resubmit-text">重新提交</span>
                </checkbox>
              </div>
            </div>
          </div>
          <!--浏览答题截图-->
          <div class="main-baby-answer" v-if="mainBabyAnswerList.length > 0">
            <p class="main-baby-answer-title fs-12 f-b cl666">查看拿手提交的主宝贝浏览截图</p>
            <div class="image-area" v-for="(item,index) in mainBabyAnswerList" :key="index">
              <img :src="item.screenshotsList[0].src" alt="" width="54" height="54" @click="previewImage(item.screenshotsList[0].src)">
              <p>{{item.title}}</p>
            </div>
          </div>
          <!--货比三家-->
          <div class="shop-compare" v-if="babyOneImageList.length > 0 || babyTwoImageList.length > 0 || babyThreeImageList.length > 0">
            <p class="similar-baby-title fs-12 f-b cl666 mt-20">查看拿手提交的货比3家浏览截图</p>
            <div class="image-area" v-for="(item,index) in babyOneImageList" :key="index">
              <img :src="item.screenshotsList[0].src" alt="" width="54" height="54"  @click="previewImage(item.screenshotsList[0].src)">
              <p>{{item.title}}</p>
              <div>
                <checkbox v-model="item.isSelect">
                  <span class="resubmit-text">重新提交</span>
                </checkbox>
              </div>
            </div>
          </div>
          <div class="shop-compare">
            <div class="image-area" v-for="(item,index) in babyTwoImageList" :key="index">
              <img :src="item.screenshotsList[0].src" alt="" width="54" height="54" @click="previewImage(item.screenshotsList[0].src)">
              <p>{{item.title}}</p>
              <div>
                <checkbox v-model="item.isSelect">
                  <span class="resubmit-text">重新提交</span>
                </checkbox>
              </div>
            </div>
          </div>
          <div class="shop-compare">
            <div class="image-area" v-for="(item,index) in babyThreeImageList" :key="index">
              <img :src="item.screenshotsList[0].src" alt="" width="54" height="54" @click="previewImage(item.screenshotsList[0].src)">
              <p>{{item.title}}</p>
              <div>
                <checkbox v-model="item.isSelect">
                  <span class="resubmit-text">重新提交</span>
                </checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-b fs-14 main-color mt-10">
        <!--<span v-if="needBrowseCollectAddCart || needIssue">2.</span>-->
        请仔细核对订单号与交易金额
      </div>
      <div class="order-info-con text-lf mt-10">
        <p>
          <span class="f-b">订单号：</span>
          <span class="main-color">{{orderInfo.orderNum}}</span>
        </p>
        <p class="mt-10">
          <span><span class="f-b">拿手实付金额：</span><span class="main-color">{{orderInfo.orderPrice || 0}}</span>元<span>（当前每单活动担保金<span>{{orderInfo.perMarginNeed}}</span>元）</span></span>
        </p>
      </div>
      <p class="cl-red mt-10 text-lf" v-if="orderInfo.orderPrice < orderInfo.perMarginNeed">
        <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
        注意：拿手实付金额与活动担保金金额不一致，请仔细审核！
      </p>
      <p class="cl-red mt-10 text-lf" v-else>
        <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
        注意：为了防止不良拿手冒领担保金，请您仔细审核交易订单信息，确认不误再作提交！
      </p>
      <div class="mt-22 text-lf">
        <Radio-group v-model="orderReviewStatus">
          <Radio class="mr-30" label="passAudit">
            <span class="fs-14">通过</span>
          </Radio>
          <Radio label="failAudit">
            <span class="fs-14">不通过</span>
          </Radio>
        </Radio-group>
        <div class="no-pass-reason text-ct inline-block fs-14" v-show="orderReviewStatus === 'failAudit'">
          <i-select v-model="orderNoPassReason" style="width:200px" placeholder="请选择不通过原因">
            <!--<i-option value="收藏加购截图不合格">收藏加购截图不合格</i-option>-->
            <i-option value="截图不合格">截图不合格</i-option>
            <i-option value="订单信息有误">订单信息有误</i-option>
            <i-option value="实付金额有误">实付金额有误</i-option>
            <i-option value="下单旺旺和平台绑定旺旺不一致">下单旺旺和平台绑定旺旺不一致</i-option>
            <i-option value="自定义">自定义</i-option>
          </i-select>
        </div>
        <div class="mt-20 text-lf" v-show="orderNoPassReason === '自定义'">
          <iInput placeholder="自定义内容,字数不超过50个字" v-model="orderNoPassReasonDiy"></iInput>
        </div>
        <p  class="cl-red mt-10 text-lf" v-show="orderNoPassReasonDiy && orderNoPassReasonDiy.length > 50" >
          <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
          注意：自定义字数不能超过50个字
        </p>
      </div>
      <div class="true-btn" v-show="orderReviewStatus === 'failAudit'" @click="orderNumberAudit">确认提交</div>
      <div class="true-btn" v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed >= getOderPrice"
           @click="orderNumberAudit">确认提交
      </div>
      <pay-model v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed < getOderPrice"
                :orderMoney="needReplenishMoney" :isShowUpgradeVIP="true" :isBalance="isBalance"
                @confirmPayment="confirmPayment" :payButtonText="payButtonText"
                :rechargeButtonText="rechargeButtonText" style="margin-top: 120px;width: 652px;margin-left: -326px;"
                :style="{top:needBrowseCollectAddCart ? 45+'%' : 20 +'%'}">
        <div slot="isBalance" class="title-tip">
                <span class="size-color3">
                <icon color="#FF2424" size="18" type="md-alert"></icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
          class="main-color">{{(needReplenishMoney / 100).toFixed(2)}}</strong>元
        </div>
        <div slot="noBalance" class="title-tip">
                <span class="size-color3">
                <icon color="#FF2424" size="18" type="md-alert"></icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
          class="main-color">{{needReplenishMoneyText}}</strong>元,请充值！
        </div>
      </pay-model>
      <!--图片预览弹窗-->
      <Modal v-model="previewImg" :transfer="false">
        <div class="text-ct">
          <img :src="previewImgUrl" width="500" height="500">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import PayModel from '@/components/PayModel'
  import api from '@/config/apiConfig'
  import {Icon, Radio, Select, Option, Input, Checkbox, Modal} from 'iview'
  export default {
    name: "audit-order-popup",
    components:{
      PayModel:PayModel,
      Icon:Icon,
      Radio:Radio,
      RadioGroup:Radio.Group,
      iSelect: Select,
      iOption:Option,
      iInput:Input,
      Checkbox:Checkbox,
      Modal:Modal
    },
    props:{
      orderInfo:{
        type:Object,
        default:{}
      },
      needIssue:{
        type:Boolean,
        default:false
      },
      operateTaskId:{
        type:Number,
        default:0
      },
      operateIndex:{
        type:Number,
        default:0
      },
      passesShowkerTask:{
        type:Function,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        needBrowseCollectAddCart: false,
        orderNoPassReason: null,
        orderNoPassReasonDiy: null,
        payButtonText: '确认支付并通过',
        rechargeButtonText: '前去充值',
        orderReviewStatus: 'passAudit',

        mainBabyImageList:[],
        mainBabyAnswerList:[],
        babyOneImageList:[],
        babyTwoImageList:[],
        babyThreeImageList:[],
        mainBabyRawData:[],
        mainAnswerRewData:[],
        similarBabyRawData:[],
        taskTotalElements:0,
        auditResult:false,
        resubmitList:[],
        previewImg:false,
        previewImgUrl:'',

      }
    },
    computed:{
      getOderPrice() {
        let _this = this;
        if (_this.orderInfo.discountPrice && _this.orderInfo.discountPrice > 0) {
          return _this.orderInfo.orderPrice - _this.orderInfo.discountPrice
        } else if (_this.orderInfo.discountRate && _this.orderInfo.discountRate > 0) {
          return _this.orderInfo.orderPrice * (1 - _this.orderInfo.discountRate)
        } else {
          return _this.orderInfo.orderPrice
        }
      },
      isBalance() {
        return this.needReplenishMoney <= this.getUserBalance
      },
      needReplenishMoney() {
        return (this.getOderPrice - this.orderInfo.perMarginNeed) * 100
      },
      needReplenishMoneyText() {
        return `${(this.needReplenishMoney / 100).toFixed(2)} + ${(((Math.ceil(this.needReplenishMoney / 0.994)) - this.needReplenishMoney) / 100).toFixed(2)}`
      },
    },
    created() {
      this.handleScreenShot();
    },
    methods:{
      closeModel() {
        this.$emit('closeAuditModel');
      },
      orderNumberAudit() {
        let _this = this;
        _this.handleResubmit(_this.mainBabyImageList);
        _this.handleResubmit(_this.babyOneImageList);
        _this.handleResubmit(_this.babyTwoImageList);
        _this.handleResubmit(_this.babyThreeImageList);
        if (_this.resubmitList.length > 0) {
          _this.orderReviewStatus = 'failAudit';
        }
        if(_this.orderReviewStatus === 'failAudit'){
          if (!_this.orderNoPassReason) {
            _this.$Message.error("亲，请填写不通过的理由！");
            return;
          }else {
            if(_this.orderNoPassReason === '自定义'){
              if(!_this.orderNoPassReasonDiy){
                _this.$Message.error("亲，请填写不通过自定义原因！");
                return;
              }else {
                if(_this.orderNoPassReasonDiy.length > 50){
                  _this.$Message.error("亲，自定义原因字数不超过50个字！");
                  return;
                }else {
                  _this.orderNoPassReason = _this.orderNoPassReasonDiy;
                }
              }
            }else {
              _this.orderNoPassReasonDiy = '';
            }
          }
        }
        if (_this.orderReviewStatus === 'passAudit' && _this.orderNoPassReason) {
          _this.orderNoPassReason = null;
        }
        api.orderNumberAudit({
          id: _this.orderInfo.id,
          status: _this.orderReviewStatus === 'passAudit' ? 'true' : 'false',
          msg: _this.orderNoPassReason,
          needResubmitScreenshots:JSON.stringify(_this.resubmitList)
        }).then(res => {
          if (res.status) {
            _this.$Message.success('订单号审核成功！');
            _this.$store.dispatch('getPersonalTrialCount');
            _this.$store.dispatch('getUserInformation');
            this.$emit('closeAuditModel');
            _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
          } else {
            _this.$Message.error(res.msg);
            this.$emit('closeAuditModel');
          }
        })
      },
      // handleViewIssue(value, key) {
      //   let _this = this;
      //   _this.isShowCheckScreenshotModel = true;
      //   _this.checkScreenshotSrc = value;
      //   _this.checkScreenshotModleTitle = '浏览答题截图：（' + key + '）';
      // },
      confirmPayment(pwd) {
        let _this = this;
        api.depositSupplement({
          payPassword: pwd,
          taskId: _this.orderInfo.id
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            this.$emit('closeAuditModel');
            _this.$Message.success('支付成功！');
            _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      handleScreenShot() {
        const _this = this;
        let tempData = _this.orderInfo;
        let mainBabyList = [];
        let babyOneList = [];
        let babyTwoList = [];
        let babyThreeList = [];
        let mainIndex = -1;
        let similarOneIndex = -1;
        let similarTwoIndex = -1;
        let similarThreeIndex = -1;
        _this.mainBabyRawData = tempData.mainVasSettings;
        _this.mainAnswerRewData = tempData.issueAnswerScreenshot;
        _this.similarBabyRawData = tempData.similarVasSettings;
        tempData.showkerTaskVasSettings.forEach( item => {
          let screenshotsList = item.answerScreenshot ? [{src:item.answerScreenshot}] : [];
          let obj = {
            src:'',
            screenshotsList:screenshotsList,
            title:'',
            id:item.id,
            itemIndex:item.itemIndex,
            isSelect:false
          };
          if (item.itemType === "main_item"){
            mainIndex ++;
            obj.title = tempData.mainVasSettings[mainIndex].name;
            obj.required = item.required;
            obj.tipsPicture = tempData.mainVasSettings[mainIndex].tipsPicture;
            mainBabyList.push(obj)
          }else {
            if (item.itemIndex === 0){
              similarOneIndex ++;
              obj.title = tempData.similarVasSettings[0][similarOneIndex].name;
              obj.required = item.required;
              obj.tipsPicture = tempData.similarVasSettings[0][similarOneIndex].tipsPicture;
              babyOneList.push(obj)
            }else if (item.itemIndex === 1){
              similarTwoIndex ++;
              obj.title = tempData.similarVasSettings[1][similarTwoIndex].name;
              obj.required = item.required;
              obj.tipsPicture = tempData.similarVasSettings[1][similarTwoIndex].tipsPicture;
              babyTwoList.push(obj)
            }else {
              similarThreeIndex ++;
              obj.title = tempData.similarVasSettings[2][similarThreeIndex].name;
              obj.required = item.required;
              obj.tipsPicture = tempData.similarVasSettings[2][similarThreeIndex].tipsPicture;
              babyThreeList.push(obj)
            }
          }
        });
        _this.mainBabyImageList = mainBabyList;
        _this.babyOneImageList = babyOneList;
        _this.babyTwoImageList = babyTwoList;
        _this.babyThreeImageList = babyThreeList;
        // 处理浏览答题截图数据
        _this.mainBabyAnswerList = tempData.issueAnswerScreenshot.map(item => {
          let tempObj = {};
          tempObj.title = item.issueText.issue;
          tempObj.screenshotsList = item.screenshotSrc ? [{src:item.screenshotSrc}] : [];
          return tempObj;
        })
      },
      // 乐奇
      // handleDataTest() {
      //   console.time('upload-for-lq');
      //   const _this = this;
      //   // 主宝贝
      //   let mainVasSettingsMap = {};
      //   let similarVasSettingsMapList = [];
      //   _this.orderInfo.mainVasSettings.map(key => {
      //     mainVasSettingsMap[key.id] = key;
      //   });
      //   _this.orderInfo.similarVasSettings.map(listKey => {
      //     let similarVasSettingsMap = {};
      //     listKey.map(key => {
      //       similarVasSettingsMap[key.id] = key;
      //     });
      //     similarVasSettingsMapList.push(similarVasSettingsMap);
      //   });
      //   // 货比三家
      //   let mainShowkerTaskVasSettings = [];
      //   let similarShowkerTaskVasSettings = [];
      //   _this.orderInfo.showkerTaskVasSettings.map(key => {
      //     if (key.required) {
      //       key.screenshotsList = key.answerScreenshot ? [{src: key.answerScreenshot}] : [];
      //       if (key.itemType === 'main_item') {
      //         key.title = mainVasSettingsMap[key.vasConfigId].name;
      //         key.pcTipsPicture = mainVasSettingsMap[key.vasConfigId].pcTipsPicture;
      //         mainShowkerTaskVasSettings.push(key);
      //       } else {
      //         let similarShowkerTaskVasSettingsTemp = similarShowkerTaskVasSettings[key.itemIndex];
      //         if (!similarShowkerTaskVasSettingsTemp || similarShowkerTaskVasSettingsTemp.length === 0) {
      //           similarShowkerTaskVasSettingsTemp = [];
      //           similarShowkerTaskVasSettings[key.itemIndex] = [];
      //         }
      //         key.title = similarVasSettingsMapList[key.itemIndex][key.vasConfigId].name;
      //         key.pcTipsPicture = similarVasSettingsMapList[key.itemIndex][key.vasConfigId].pcTipsPicture;
      //         similarShowkerTaskVasSettingsTemp.push(key);
      //         similarShowkerTaskVasSettings[key.itemIndex] = similarShowkerTaskVasSettingsTemp;
      //       }
      //     }
      //   });
      //   // 处理浏览答题
      //   _this.orderInfo.issueAnswerList.forEach((item,index) => {
      //     item.index = index;
      //     item.src = '';
      //     item.screenShotList = item.screenShotList.length > 0 ? [{src:item.screenShotList[0]}] : [];
      //   });
      //   _this.mainBabyImageList = mainShowkerTaskVasSettings;
      //   _this.similarImageList = similarShowkerTaskVasSettings;
      //   _this.mainBabyAnswerList = _this.orderInfo.issueAnswerList;
      //   console.timeEnd('upload-for-lq');
      // },

      // 处理重新提交
      handleResubmit(array) {
        const _this = this;
        array.forEach(item => {
          if (item.isSelect) {
            _this.resubmitList.push(item.id);
          }
        });
      },
      // 预览图片
      previewImage(url) {
        this.previewImg = true;
        this.previewImgUrl = url;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .check-order-model {
    @include fullScreenModel;
    z-index: 100;
  }

  .check-order-con {
    position: absolute;
    width: 700px;
    max-height:85%;
    background-color: #fff;
    border-radius: 5px;
    left: 50%;
    margin-left: -300px;
    top: 2%;
    padding: 0 18px 26px 18px;
    overflow: auto;
    > i {
      font-size: 24px;
      cursor: pointer;
    }
    > p:nth-child(2) {
      span {
        font-size: 16px;
      }
    }
    > p:nth-child(3) {
      font-size: 14px;
    }
  }

  .true-btn {
    @include wh(120px, 32px);
    line-height: 32px;
    background-color: $mainColor;
    color: #fff;
    text-align: center;
    margin: 24px auto 0 auto;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    @include transition;
    &:hover {
      background-color: darken($mainColor, 10%);
    }
  }

  .carousel {
    width: 800px;
    height: 800px;
  }

  .order-info-screenshot {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    &:hover .order-info-screenshot-cover {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .order-info-screenshot-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .order-info-screenshot-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .certainly-hit-tip {
    position: absolute;
    background-color: #f9284f;
    color: #fff;
    line-height: 14px;
    height: 14px;
    width: 54px;
    text-align: center;
    left: 0;
    bottom: -4px;
    font-size: 12px !important;
  }

  .new-man-tip {
    width: 50px;
  }

  .account-info {
    width: 140px;
  }

  .parting-line {
    border-left: 1px dashed #999;
    height: 60px;
    margin-top: 28px;
    margin-left: 14px;
  }

  .order-info-con {
    border: 1px dashed #999;
    border-radius: 5px;
    padding: 10px;
  }
  .screen-shots-area {
    padding:10px 15px;
    .image-area{
      width:80px;
      text-align: center;
      margin-top:20px;
      margin-right:10px;
      display: inline-block;
    }
    .resubmit-text{
     color:#2b85e4
    }


  }

</style>
