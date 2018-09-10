<template>
    <div>
      <div class="fans-header">
        <h1 class="question pd-tb-20">
          什么是微信加粉？
        </h1>
        <div class="task-describe border">
          商家用<span class="color-theme bold">货品（尾货、赠品、试用商品等）/现金</span>来吸引白拿拿上的淘宝买家添加商家微信号，成为商家粉丝的一种新的任务类型。
        </div>
      </div>
      <div class="fans-header">
        <h1 class="question pd-tb-20">
          微信加粉任务流程
        </h1>
        <img src="~assets/img/task-fans/task-fans-top.png" alt="加粉流程" class="block img-top">
      </div>
      <div class="fans-container mt-20 border">
        <div class="fans-title pl-10">
          微信加粉任务发布
        </div>
        <div class="pd-30">
          <div class="fm-item mb-20">
            <span class="mr-10 required">需求粉丝数：</span>
            <Input v-model.number="fansNumber" class="width-150" autofocus placeholder="请输入您需要的粉丝数"/>
            <span class="item-right ml-8">个</span>
          </div>
          <div class="fm-item mb-20">
            <span class="mr-10">上传商家微信二维码：</span>
            <Upload
              ref="codeUpload"
              :show-upload-list="false"
              :default-file-list="codeDefaultList"
              :on-success="codeHandleSuccess"
              :on-remove="removeCodeImage"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              type="drag"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </div>
          <div class="fm-item mb-10">
            粉丝筛选条件：
          </div>
          <div class="pd-lr-30">
            <div class="requirement border pd-tb-20 pl-20 pr-20" >
              <div class="require-item mb-20">
                <span>性别：</span>
                <RadioGroup v-model="sex">
                  <Radio label="any">不限</Radio>
                  <Radio label="man">男</Radio>
                  <Radio label="woman">女</Radio>
                </RadioGroup>
              </div>
              <div class="require-item mb-20">
                <span>地域：</span>
                <Checkbox label="all" v-model="anyArea">不限</Checkbox>
                <CheckboxGroup v-model="area" class="inline-block">
                  <Checkbox label="area1">江浙沪</Checkbox>
                  <Checkbox label="area2">京津冀</Checkbox>
                  <Checkbox label="area3">珠三角</Checkbox>
                  <Checkbox label="area4">东三省</Checkbox>
                  <Checkbox label="area5">中西部地区</Checkbox>
                </CheckboxGroup>
                <div class="color-theme">（可多选）</div>
              </div>
              <div class="require-item">
                <span>淘气值范围：</span>
                <Input v-model="tqzStart" class="inline-block width-80" />
                <span class="ml-5 mr-5">━━</span>
                <Input v-model="tqzEnd" class="inline-block width-80" />
                <span class="ml-35">年龄范围：</span>
                <Input v-model="ageStart" class="inline-block width-80" />
                <span class="ml-5 mr-5">━━</span>
                <Input v-model="ageEnd" class="inline-block width-80" />
              </div>
            </div>
          </div>
          <div class="check-type">
            <span class="font14">兑换方式：</span>
            <Button :type="checkType?'primary':'default'" class="ml-15 check-btn radius-left" @click="checkType = true">现金兑换</Button>
            <Button :type="!checkType?'primary':'default'" class="check-btn" @click="checkType = false">以货兑换</Button>
          </div>
          <div class="pd-lr-30" v-show="checkType">
            <div class="requirement border">
              <div class="check-container pd-tb-20 pl-20 pr-20">
                <div class="mt-20 mb-20">
                  任务内容：
                  <span class="color-theme" v-text="fansNum"></span>
                  个粉丝，粉丝单价
                  <span class="color-theme">20元/个</span>
                </div>
                <div class="mt-20 mb-20">
                  <span class="mr-10">购买粉丝费用：</span>
                  <Input v-model.number="money" class="width-150 bg-main color-theme" style="color: #f9284f" disabled/>
                  <span class="item-right ml-8">元</span>
                </div>
              </div>
            </div>

          </div>
          <div class="pd-lr-30" v-show="!checkType">
            <div class="requirement border">
              <div class="check-container pd-tb-20 pl-20 pr-20">
                <div class="mt-20 mb-20">
                  <span class="mr-10">需求粉丝数：</span>
                  <Input v-model.number="money" class="width-150 bg-main color-theme" disabled/>
                  <span class="item-right ml-8">元</span>
                  <span class="font12 ml-28">每个粉丝需缴纳20元押金，粉丝确认收货后退还商家</span>
                </div>
                <div class="mt-20 mb-20">
                  <span class="mr-10">兑换商品名称：</span>
                  <Input v-model="goodName" class="width-150" />
                  <span class="mr-10 ml-20">商品原价：</span>
                  <Input v-model.number="goodPrice" class="width-100" />
                </div>
                <div class="mt-20 mb-20 vertical-center">
                  <span class="mr-10">商品图片：</span>
                  <Upload
                    ref="goodUpload"
                    :show-upload-list="false"
                    :default-file-list="goodDefaultList"
                    :on-success="goodHandleSuccess"
                    :on-remove="removeGoodImage"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    type="drag"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                </div>
                <div class="mt-20 mb-20">
                  <span class="mr-10">商品简介：</span>
                  <quill-editor ref="myTextEditorFree"
                                class="inline-block editor"
                                v-model="describe"
                                :options="editorOption"
                                >
                  </quill-editor>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-20">
            <p v-show="checkType" class="required pl-20 text-ct">
              购买粉丝费用<span class="color-theme">{{ money }}</span>元，缴纳保障金<span class="color-theme">0</span>元，总计需要支付金额<span class="color-theme">{{ money }}</span>元
            </p>
            <p v-show="!checkType" class="required pl-20 text-ct">
              购买粉丝费用<span class="color-theme">0</span>元，缴纳保障金<span class="color-theme">{{ money }}</span>元，总计需要支付金额<span class="color-theme">{{ money }}</span>元
            </p>
            <div class="text-ct mt-20 mb-20">
              <Button size="large" type="primary" class="width-120" @click="submit">立即发布</Button>
              <Button type="warning" class="ml-15" @click="connectService">联系客服</Button>
            </div>
            <div class="text-ct color-theme mt-30" v-if="paySuccess">任务已发布成功，请联系客服确认订单信息，本次活动为预售活动，预计本月中旬上线。</div>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="pay" v-show="showCode">
          <div class="pay-code">
            <div class="pay-top pl-20 clear">
              支付宝扫码付款
              <Icon type="md-close-circle" class="closeCode cursor-p right mr-20" @click="closeCode" />
            </div>
            <div class="pay-container text-ct">
              <img src="~assets/img/task-fans/code.png" class="block pay-code-img">
              <img src="~assets/img/task-fans/pay-msg.png" class="block" alt="">
              <div class="text-ct mt-30">
                <Button type="primary" size="large" class="width-120" @click="pay(true)">支付成功</Button>
                <Button type="default" size="large" class="ml-20 width-120 failed" @click="pay(false)">支付失败</Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import { Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Button, Icon } from 'iview';
  import Upload from '@/components/Upload';
  import { quillEditor } from 'vue-quill-editor';
  import { aliCallbackImgUrl } from '@/config/env';
  export default {
    name: "WxTaskFans",
    data() {
      return {
        paySuccess: false,
        showCode: false,
        codeImg: '',
        goodImg: '',
        codeDefaultList: [],
        goodDefaultList: [],
        fansNumber: '',
        area: ['all'],
        sex: 'any',
        anyArea: true,
        tqzStart: '',
        tqzEnd: '',
        ageStart: '',
        ageEnd: '',
        checkType: true,
        goodName: '',
        goodPrice: '',
        describe: '',
        editorOption: {
          placeholder: "请输入宝贝相关介绍",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['image']
            ]
          }
        },
      }
    },
    computed: {
      fansNum() {
        return Math.floor(Math.abs(Number(this.fansNumber)));
      },
      money() {
        const n = Math.floor(Math.abs(Number(this.fansNumber)));
        return n * 20 ? n * 20 : 0;
      },
    },
    methods: {
      codeHandleSuccess(res) {
        this.codeImg = aliCallbackImgUrl + res.name;
        this.codeDefaultList.push({src: aliCallbackImgUrl + res.name})
      },
      goodHandleSuccess(res) {
        this.goodImg = aliCallbackImgUrl + res.name;
      },
      removeCodeImage() {
        this.codeImg = null;
      },
      removeGoodImage() {
        this.goodImg = null;
      },
      handleFormatError(file) {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: '图片 ' + file.name + ' 太大，不能超过 1M'
        });
      },
      submit() {
        if(this.money) {
          this.showCode = true;
        } else {
          this.$Message.error('请正确填写需求粉丝数');
        }
      },
      pay(flag) {
        this.paySuccess = flag;
        this.closeCode();
      },
      closeCode() {
        this.showCode = false;
      },
      connectService() {
        let wOpen = window.open();
        wOpen.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=171142825&site=qq&menu=yes';
      }
    },
    components: {
      Input,
      Upload,
      Radio,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
      Button,
      quillEditor,
      Icon
    },
    watch: {
      anyArea() {
        if(this.anyArea) {
          this.area = [];
        }
      },
      area() {
        if(this.area.length > 1) {
          this.anyArea = false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .bold {
    font-weight: bold;
  }
  .border {
    border: solid 1px #ddd;
  }
  .bg-main {
    background: #fff4f2 !important;
  }
  .color-theme {
    color: #f9284f !important;
  }
  .text-orange {
    color: #fd6b22 !important;
  }
  .font12 {
    font-size: 12px;
  }
  .font14 {
    font-size: 14px;
  }
  .vertical-center {
    display: flex;
    align-items: center;
  }
  .pd-lr-30 {
    padding: 0 30px;
  }
  .question {
    color: #fd6b22;
    font-size: 20px;
    font-weight: bold;
  }
  .img-top {
    width: 100%;
  }
  .task-describe {
    border-radius: 12px;
    background: #fff5e2;
    font-size: 16px;
    padding: 20px 30px;
  }
  .fans-container {
    color: #666;
    font-size: 14px;
    width: 100%;
  }
  .fans-title {
    background: #f8f8f8;
    border-bottom: solid 1px #ddd;
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
  }
  .pd-30 {
    padding: 30px;
  }
  .fm-item {
    display: flex;
    align-items: center;
  }
  .check-btn {
    border-radius: 0;
  }
  .check-btn:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .radius-left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .check-btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .check-type {
    display: flex;
    align-items: center;
    margin: 30px 0;
    font-size: 0;
  }
  .check-type-title {
    border-bottom: solid 1px #ddd;
    background: #fef6e3;
    line-height: 40px;
  }
  .editor {
    width: 760px;
    height: 180px;
    margin-bottom: 40px;
    vertical-align: top;
  }
  .pay {
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
  .pay-code {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 560px;
    border-radius: 6px;
    overflow: hidden;
  }
  .pay-top {
    background: #f5f5f5;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  .closeCode {
    font-size: 30px;
    padding-top: 5px;
  }
  .pay-container {
    background: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    height: 520px;
    padding: 40px;
  }
  .pay-container img {
    margin: 20px auto;
  }
  .pay-code-img {
    width: 240px;
    height: 240px;
  }
  .failed {
    background: grey;
    color: #fff;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
