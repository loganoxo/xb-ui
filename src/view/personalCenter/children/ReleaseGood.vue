<template>
  <div>
    <Form :model="validate" :rules="ruleValidate" :label-width="160" ref="form">
      <div class="title pl-20">申请商品信息</div>
      <div class="pd-tb-20 pl-20 pr-20">
        <FormItem label="淘宝链接：">
          <Input placeholder="请输入宝贝链接" v-model="validate.link"  class="width-300" />
          <span class="pl-60">非必填，填写之后审核通过率更高</span>
        </FormItem>
        <FormItem label="宝贝试用价格：" prop="price" >
          <Input placeholder="请输入试用价格" v-model.number="validate.price" class="width-100" />
          <span class="pl-10">元</span>
        </FormItem>
        <FormItem label="7天内确认满意收货尾款：">
          <Input placeholder="请输入尾款" v-model.number="validate.weekPayment" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-40">宝贝成交总价：</span>
          <Input  disabled class="width-100 ml-20" v-model.number="weekPriceNumber" />
          <span class="pl-10">元</span>
        </FormItem>
        <FormItem label="14天内确认满意收货尾款：">
          <Input placeholder="请输入尾款" class="width-100" v-model.number="validate.monthPayment" />
          <span class="pl-10">元</span>
          <span class="ml-40">宝贝成交总价：</span>
          <Input disabled class="width-100 ml-20" v-model.number="monthPriceNumber" />
          <span class="pl-10">元</span>
        </FormItem>
        <FormItem label="是否包邮：" prop="isFreePostage">
          <Radio v-model="validate.isFreePostage">宝贝包邮，无需修改运费</Radio>
          <span class="ml-60">商城仅支持包邮</span>
        </FormItem>
      </div>
      <div class="title pl-20">商品展示信息</div>
      <div class="pd-tb-20 pl-20 pr-20">
        <FormItem label="宝贝标题：" prop="title">
          <Input placeholder="请输入宝贝标题" class="width-300" v-model="validate.title" />
          <span class="ml-10">名称实例<Icon type="md-help-circle" /></span>
          <span class="ml-10 describe">
            （突出宝贝特点，勿填无关内容，最多支持60个字符，当前已输入<span class="color-theme bold">{{validate.title.length}}</span> / 60个字符）
          </span>
        </FormItem>
        <FormItem label="宝贝类型：" prop="goodType">
          <Select v-model="validate.goodType" class="width-200">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="宝贝主图：" class="label-pt" prop="goodImg">
          <Input v-model="validate.goodImg" class="hidden" />
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
          <span class="show-image cursor-p" @click="showGoodImage">【查看示例图】</span>
          <p class="describe">上传的宝贝主图将在平台上展示，支持jpg、jpeg、gif、png、bmp格式，最佳尺寸400*400（像素），不超过1M</p>
          <p class="color-theme">主图要求：白底背景，主图必须清晰，必须是所送的商品，且不能出现图片拼接、水印、logo及其它文字</p>
        </FormItem>

        <FormItem label="活动份数：" prop="activityNumber">
          <Input placeholder="请输入活动份数" v-model.number="validate.activityNumber" class="width-120"/>
          <span>份，需缴纳物流保险金</span>
          <Input disabled class="width-120" v-model.number="insuranceMoneyNumber"/>
          <span>元，保险金<span class="color-theme">50</span>元/份，用于因产品问题导致的退货物流补偿买家，余额退还到商家账户。</span>
        </FormItem>
        <FormItem label="保险金的使用规则：" prop="insuranceRule">
          <CheckboxGroup v-model="validate.insuranceRule">
            <Checkbox label="Eat">产品问题，退货物流费用</Checkbox>
            <Checkbox label="Sleep" class="ml-40">7天内无理由退货，退货物流费用</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="商品简介：" prop="describe">
          <quill-editor ref="myTextEditorFree"
            class="inline-block editor"
            v-model="validate.describe"
            :options="editorOption"
          >
          </quill-editor>
        </FormItem>
      </div>
    </Form>
    <div class="text-ct">
      <Button class="width-300 mt-20" size="large" type="primary" @click="handleSubmit">提交</Button>
    </div>
    <!--示例图查看-->
    <Modal title="示例图片查看" v-model="isShowGoodImageModel">
      <img src="/static/img/demo/taskRelease/task-main-image.jpg" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import { Form, FormItem, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Icon, Select, Option, Modal, Button } from 'iview';
  import Upload from '@/components/Upload';
  import { quillEditor } from 'vue-quill-editor';
  import { aliCallbackImgUrl } from '@/config/env';
  export default {
    name: "ReleaseGood",
    data() {
      return {
        isShowGoodImageModel: false,
        goodDefaultList: [],
        validate: {
          link: '',
          price: null,
          weekPayment: null,
          weekPrice: null,
          monthPrice: null,
          monthPayment: null,
          isFreePostage: true,
          title: '',
          goodType: 'beijing',
          goodImg: '',
          activityNumber: null,
          insuranceMoney: null,
          insuranceRule: [],
          describe: ''
        },
        ruleValidate: {
          price: [
            { required: true, type: 'number', message: '试用价格必须大于0', trigger: 'blur' }
          ],
          weekPayment: [
            { required: false, type: 'number', message: '尾款必须为数字', trigger: 'blur' }
          ],
          monthPayment: [
            { required: false, type: 'number', message: '尾款必须为数字', trigger: 'blur' }
          ],
          isFreePostage: [
            { required: true, type: 'boolean', message: '请选择是否包邮', trigger: 'change' }
          ],
          title: [
            { required: true, type: 'string', message: '请输入宝贝标题', trigger: 'blur' }
          ],
          goodType: [
            { required: true, type: 'string', message: '请选择宝贝类型', trigger: 'change' }
          ],
          goodImg: [
            { required: true, type: 'string', message: '请上传宝贝主图', trigger: 'change' }
          ],
          activityNumber: [
            { required: true, type: 'number', message: '宝贝份数必须大于0', trigger: 'change' }
          ],
          insuranceRule: [
            { required: true, type: 'array', message: '保险金的试用规则不能为空', trigger: 'change' }
          ],
          describe: [
            { required: true, type: 'string', message: '请填写商品简介', trigger: 'change' }
          ]
        },
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
      priceNumber() {
        return Number(this.validate.price);
      },
      weekPaymentNumber() {
        return Number(this.validate.weekPayment);
      },
      weekPriceNumber() {
        return this.priceNumber + this.weekPaymentNumber;
      },
      monthPaymentNumber() {
        return Number(this.validate.monthPayment);
      },
      monthPriceNumber() {
        return this.priceNumber + this.monthPaymentNumber;
      },
      activityNum() {
        return Math.floor(Number(this.validate.activityNumber));
      },
      insuranceMoneyNumber() {
        return this.activityNum * 50;
      }
    },
    components: {
      Form,
      FormItem,
      Input,
      RadioGroup,
      Radio,
      CheckboxGroup,
      Checkbox,
      Upload,
      Icon,
      Select,
      Option,
      Modal,
      Button,
      QuillEditor: quillEditor
    },
    methods: {
      goodHandleSuccess(res) {
        this.validate.goodImg = aliCallbackImgUrl + res.name;
      },
      removeGoodImage() {
        this.validate.goodImg = null;
      },
      showGoodImage() {
        this.isShowGoodImageModel = true;
      },
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submit();
          } else {
            this.$Message.error("请填写完整，带 '*' 为必选项!");
          }
        })
      },
      submit() {
        const data = Object.assign(this.validate, {
          price: this.priceNumber,
          weekPayment: this.weekPaymentNumber,
          weekPrice: this.weekPriceNumber,
          monthPayment: this.monthPaymentNumber,
          monthPrice: this.monthPriceNumber,
          activityNumber: this.activityNum,
          insuranceMoney: this.insuranceMoneyNumber
        });
        console.log(data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .title {
    background: #f7f7f7;
    line-height: 40px;
  }
  .bold {
    font-weight: bold;
  }
  .color-theme {
    color: #f9284f !important;
  }
  .describe {
    color: #a7a4c6;
  }
  .hidden {
    display: none;
  }
  .editor {
    width: 760px;
    height: 180px;
    margin-bottom: 50px;
    vertical-align: top;
  }
  .label-pt {
    .ivu-form-item-label {
      position: relative !important;
      top: 15px !important;
    }
  }
  .show-image {
    color: #2c91f2;
    position: relative;
    top: -25px;
    left: 10px;
  }

</style>
