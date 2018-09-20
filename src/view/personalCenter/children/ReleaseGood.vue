<template>
  <div class="pd-tb-20">
    <p class="page-title mt-10">商城卖货流程</p>
    <img src="~assets/img/good-release/good-release.png" alt="" class="mt-20 mb-20">
    <div class="page-desc radius6 line22 mb-20 border-ddd fs-16">
      <div class="pd-tb-20 bg-tp fs-16">
        <p class="text-ct">白拿拿商城是采用<span class="color-theme">先试后买的卖货平台,（绕开淘宝，直接卖货）</span></p>
        <p class="text-ct">商家提供商品给买家试用，买家试用<span class="color-theme">满意即购买收下商品，不满意无损退货</span>的卖货方式。</p>
      </div>
      <div class="pd-tb-20 pl-20 bg-content">
        <p class="orange fs-16 bold mb-10">商家发布商品须知：</p>
        <div class="pl-20">
          <p>1、提供的商品<span class="color-theme">需支持买家14天免费试用</span>，试用期间<span class="color-theme">支持产品无损退货</span>;</p>
          <p class="pl-5">（食品类通过<span class="color-theme">商品+小样</span>的形式试用，买家试吃小样后确定是否购买，食品类商品拆封后无产品问题不可退货）;</p>
          <p>2、商城商品<span class="color-theme">试用后购买价格不得高于商品的淘宝售价</span>，否则商品无法通过审核上线卖货;</p>
          <p>3、为激励买家尽快确认购买,<span class="color-theme">试用7天内购买价格<i><</i>试用7~14天购买价格</span>;</p>
          <p>4、为吸引买家试用，设置的保证金不宜高于商品价格，建议<span class="color-theme">保证金设置成略高于商品成本+物流成本</span>。</p>
        </div>
      </div>
    </div>
    <Form :model="validate" :rules="ruleValidate"  ref="form" label-position="left">
      <div class="title pl-20 border-ddd">申请商品信息</div>
      <div class="pd-tb-20 pl-20 pr-20 border-ddd">
        <FormItem label="商品淘宝链接：" :label-width="110" prop="itemUrl">
          <Input placeholder="请输入淘宝宝贝链接"  v-model="validate.itemUrl"  class="width-300" />
          <span class="pl-10 describe">（淘宝链接作为商城审核商品使用）</span>
        </FormItem>
        <FormItem label="商品淘宝售价：" prop="originalPrice" :label-width="110">
          <Input placeholder="请输入商品原价" v-model.number="validate.originalPrice" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-10 describe">（淘宝售价作为商品审核的重点，白拿拿商城上的<span class="color-theme">商品价格不得高于宝贝在淘宝的售价</span>）</span>
        </FormItem>
        <FormItem label="买家试用本商品的保证金：" prop="itemFirstPrice" :label-width="170">
          <Input placeholder="请输入试用保证金" v-model.number="validate.itemFirstPrice" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-10 describe">（建议<span class="color-theme">略高于商品成本+物流成本</span>，若买家未退货且未缴尾款时，保证金用于<span class="color-theme">补偿商家</span>）</span>
        </FormItem>
        <FormItem label="试用7天内购买的商品价格：" prop="weekPrice" class="pl-40" :label-width="175">
          <Input class="width-100" placeholder="7天购买价格" v-model.number="validate.weekPrice" />
          <span class="pl-10">元</span>
          <span class="ml-20">买家确认购买商品补缴尾款：</span>
          <Input disabled placeholder="请输入尾款" v-model.model="weekPaymentNumber" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-10 color-theme">（尾款=试用7天商品价格-保证金）</span>
        </FormItem>
        <FormItem label="试用7-14天内购买的商品价格：" prop="monthPrice" class="pl-40" :label-width="195">
          <Input class="width-100" placeholder="7-14天购买价格" v-model.number="validate.monthPrice" />
          <span class="pl-10">元</span>
          <span class="ml-20">买家确认购买商品补缴尾款：</span>
          <Input disabled placeholder="请输入尾款" class="width-100" v-model.number="monthPaymentNumber" />
          <span class="pl-10">元</span>
          <span class="ml-10 color-theme">（尾款=试用7~14天商品价格-保证金）</span>
        </FormItem>
        <FormItem label="是否包邮：" prop="pinkage" :label-width="90">
          <Radio v-model="validate.pinkage">商品包邮，无需修改运费</Radio>
          <span class="describe">（商家发货仅支持包邮形式，部分偏远地区的邮费问题请咨询客服处理）</span>
        </FormItem>
      </div>
      <div class="title pl-20 border-ddd mt-20">商品展示信息</div>
      <div class="pd-tb-20 pl-20 pr-20 border-ddd">
        <FormItem label="商品标题：" prop="taskName" :label-width="90">
          <Input placeholder="请输入商品标题" class="width-300" v-model="validate.taskName" :maxlength="60" />
          <span class="ml-10 describe">名称实例<Icon type="md-help-circle" class="color-theme font16" /></span>
          <span class="ml-10 describe">
            （突出商品特点，勿填无关内容，最多支持60个字符，当前已输入<span class="color-theme bold">{{validate.taskName.length}}</span> / 60个字符）
          </span>
        </FormItem>
        <!--<FormItem label="商品类型：" prop="itemType">-->
        <!--<Select v-model="validate.itemType" style="width:200px">-->
        <!--<template v-for="parentItem in itemCatalogList">-->
        <!--<OptionGroup v-if="parentItem.level === 1" :label="parentItem.name" :key="parentItem.id">-->
        <!--<template v-for="item in itemCatalogList">-->
        <!--<Option-->
        <!--v-if="item.level === 2 && item.parentItemCatalog && item.parentItemCatalog.id === parentItem.id"-->
        <!--:value="item.id">{{ item.name }}-->
        <!--</Option>-->
        <!--</template>-->
        <!--</OptionGroup>-->
        <!--</template>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <FormItem label="商品主图：" class="label-pt" prop="taskMainImage" :label-width="90">
          <Input v-model="validate.taskMainImage" class="hidden" />
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
          <p class="describe line16">上传的商品主图将在平台上展示，支持jpg、jpeg、gif、png、bmp格式，最佳尺寸<span class="color-theme">400*400</span>（像素），不超过<span class="color-theme">1M</span></p>
          <p class="color-theme line16">主图要求：白底背景，主图必须清晰，必须是所送的商品，且不能出现图片拼接、水印、logo及其它文字</p>
        </FormItem>

        <FormItem label="商品份数：" prop="taskCount" :label-width="90">
          <Input placeholder="请输入商品份数" v-model.number="validate.taskCount" class="width-120"/>
          <!--<span>份，需缴纳物流保险金</span>-->
          <!--<Input disabled class="width-120" v-model.number="insuranceMoneyNumber"/>-->
          <!--<span>元，保险金<span class="color-theme">50</span>元/份，用于因产品问题导致的退货物流补偿买家，余额退还到商家账户。</span>-->
        </FormItem>
        <!--<FormItem label="保险金的使用规则：" prop="insuranceRule">-->
        <!--<CheckboxGroup v-model="validate.insuranceRule">-->
        <!--<Checkbox label="Eat">产品问题，退货物流费用</Checkbox>-->
        <!--<Checkbox label="Sleep" class="ml-40">7天内无理由退货，退货物流费用</Checkbox>-->
        <!--</CheckboxGroup>-->
        <!--</FormItem>-->
        <FormItem label="商品简介：" prop="taskDetail" :label-width="90">
          <quill-editor ref="myTextEditorPresent"
            class="inline-block editor"
            v-model="validate.taskDetail"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          >
          </quill-editor>
          <input v-show="false" id="presentGet" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImgPresentGet">
        </FormItem>
      </div>
    </Form>
    <div class="text-ct submit border-ddd mt-20">
      <Button class="width-300 submit-btn" size="large" type="primary" :loading="loading" @click="handleSubmit">提交</Button>
    </div>
    <!--示例图查看-->
    <Modal title="示例图片查看" v-model="isShowGoodImageModel">
      <img src="/static/img/demo/taskRelease/task-main-image.jpg" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import { Form, FormItem, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Icon, Select, OptionGroup, Option, Modal, Button } from 'iview';
  import Upload from '@/components/Upload';
  import { quillEditor } from 'vue-quill-editor';
  import { aliCallbackImgUrl } from '@/config/env';
  import api from '@/config/apiConfig';
  import { getStorage, setStorage, randomString } from "@/config/utils";
  import aliUploadConfig from '@/config/aliUploadConfig'
  export default {
    name: "ReleaseGood",
    data() {
      const myValidate = (rule, value, callback) => {
        const [key, msg] = [rule.field, ''];
        if (key == 'taskCount') {
          if (Number(value) < 1) {
            callback('商品份数最小为1');
            return null;
          }
        }
        if ((!Number(value) || Number(value) < 0) && rule.required) {
          callback('该选项必须为不能小于0的数字');
          return null;
        }
        callback();
      }
      return {
        loading: false,
        isShowGoodImageModel: false,
        goodDefaultList: [],
        itemCatalogList: [],
        validate: {
          itemUrl: '',
          originalPrice: null,
          itemFirstPrice: null,
          itemDay1Price: null,
          itemDay2Price: null,
          pinkage: true,
          taskName: '',
          itemType: null,
          taskMainImage: '',
          taskCount: null,
          taskDetail: '',
          weekPrice: null,
          monthPrice: null,
        },

        ruleValidate: {
          itemUrl: [
            { required: true, type: 'url', message: '请正确输入商品的链接', trigger: 'blur' }
          ],
          originalPrice: [
            { required: true, trigger: 'blur', validator: myValidate  }
          ],
          itemFirstPrice: [
            { required: true, trigger: 'blur', validator: myValidate  }
          ],
          weekPrice: [
            { required: true, trigger: 'blur', validator: myValidate }
          ],
          monthPrice: [
            { required: true, trigger: 'blur', validator: myValidate }
          ],
          pinkage: [
            { required: true, type: 'boolean', message: '请选择是否包邮', trigger: 'change' }
          ],
          taskName: [
            { required: true, type: 'string', message: '请输入商品标题', trigger: 'blur' }
          ],
          // itemType: [
          //   { required: true, type: 'number', message: '请选择商品类型', trigger: 'change' }
          // ],
          taskMainImage: [
            { required: true, type: 'string', message: '请上传商品主图', trigger: 'change' }
          ],
          taskCount: [
            { required: true,  trigger: 'blur', validator: myValidate }
          ],
          taskDetail: [
            { required: true, type: 'string', message: '请填写商品简介', trigger: 'blur' }
          ]
        },
        addImgRangePresentGet: null,
        editorOption: {
          placeholder: "请输入商品相关介绍",
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
        timeout: null
      }
    },
    computed: {
      priceNumber() {
        const num =  Number(this.validate.itemFirstPrice) || 0;
        return Number(num.toFixed(2));
      },
      originalPriceNumber() {
        return Number(this.validate.originalPrice) || 0;
      },
      weekPriceNumber() {
        return Number(this.validate.weekPrice) || 0;
      },
      monthPriceNumber() {
        return Number(this.validate.monthPrice) || 0;
      },
      weekPaymentNumber() {
        return Number((this.weekPriceNumber - this.priceNumber).toFixed(2));
      },
      monthPaymentNumber() {
        return Number((this.monthPriceNumber - this.priceNumber).toFixed(2)) ;
      },
      activityNum() {
        return Math.floor(Number(this.validate.taskCount));
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
      OptionGroup,
      Option,
      Modal,
      Button,
      QuillEditor: quillEditor
    },
    methods: {
      getItemCatalog() {
        const _this = this;
        const itemCatalog = getStorage('itemCatalog');
        if (!itemCatalog) {
          api.itemCatalog().then(res => {
            if (res.status) {
              _this.itemCatalogList = res.data;
              setStorage('itemCatalog', _this.itemCatalogList);
            } else {
              _this.$Message.error(res.msg);
            }
          })
        } else {
          _this.itemCatalogList = itemCatalog;
        }
      },
      goodHandleSuccess(res) {
        this.validate.taskMainImage = aliCallbackImgUrl + res.name;
      },
      removeGoodImage() {
        this.validate.taskMainImage = null;
      },
      showGoodImage() {
        this.isShowGoodImageModel = true;
      },
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submit();
          } else {
            this.$Message.warning("请正确填写完整，带 * 为必选项");
          }
        })
      },
      submit() {
        if (this.priceNumber > this.weekPriceNumber || this.priceNumber > this.monthPriceNumber) {
          this.$Message.warning('试用后购买价格不能小于保证金');
          return false;
        }
        if (this.monthPriceNumber < this.weekPriceNumber) {
          this.$Message.warning('7-14购买商品价格，不能小于7天购买商品价格');
          return false;
        }
        // if (this.originalPriceNumber < this.monthPriceNumber || this.originalPrice < this.weekPriceNumber) {
        //   this.$Message.warning('购买商品价格应小于商品淘宝售价');
        //   return false;
        // }
        const data = Object.assign({}, this.validate);
        Object.assign(data, {
          originalPrice: this.originalPriceNumber * 100,
          itemFirstPrice: this.priceNumber * 100,
          itemDay1Price: this.weekPaymentNumber * 100,
          itemDay2Price: this.monthPaymentNumber * 100,
          taskCount: this.activityNum
        });
        this.loading = true;
        api.saveTryBeforeBuy(data).then(res => {
          if (res.status) {
            this.loading = false;
            this.$router.push('/user/good-management');
          } else {
            this.$Message.error(res.msg);
            this.loading = false;
          }
        });
        this.timeout = setTimeout(() => {
          this.loading = false;
        }, 15000)
      },
      uploadImgPresentGet(e) {
        const _this = this;
        const file = e.target.files[0];
        const key = `task/${randomString()}`;
        aliUploadConfig.aliUploadImg(key, file).then(res => {
          if (res) {
            let value = aliCallbackImgUrl + res.name + '!orgi75';
            _this.addImgRangePresentGet = _this.$refs.myTextEditorPresent.quill.getSelection();
            _this.$refs.myTextEditorPresent.quill.insertEmbed(_this.addImgRangePresentGet !== null ? _this.addImgRangePresentGet.index : 0, 'image', value, Quill.sources.USER);
            document.getElementById('presentGet').value = '';
            _this.$Message.success('商品简介图片上传成功！');
          }
        }).catch(err => {
          console.error(err);
          document.getElementById('presentGet').value = '';
          _this.$Message.warning('商品简介图片上传失败，请重试！');
        })
      },
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
    },
    created() {
      // this.getItemCatalog();
      api.saveSellerAccesslog().then(res => {
        if (!res.status) {
          this.$Message.error(res.msg);
        }
      });
      this.$store.commit({
        type: 'SET_ACTIVITY_CATEGORY',
        info: 'release-good'
      });
      this.$store.commit({
        type: 'TASK_CATEGORY_LIST',
        info: 'release-good'
      });
    },
    mounted() {
      const _this = this;
      const imgHandlerPresentGet = async function (image) {
        _this.addImgRangePresentGet = _this.$refs.myTextEditorPresent.quill.getSelection();
        if (image) {
          let fileInput = document.getElementById('presentGet');
          fileInput.click()
        }
      };
      _this.$refs.myTextEditorPresent.quill.getModule("toolbar").addHandler("image", imgHandlerPresentGet);
    },
    beforeDestroy() {
      clearTimeout(this.timeout);
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
    color: #91A2BD;
  }
  .font16 {
    font-size: 16px;
  }
  .hidden {
    display: none;
  }
  .line16 {
    line-height: 18px;
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
  .page-title {
    color: #fd6b22;
    font-size: 20px;
    font-weight: bold;
  }
  .orange {
    color: #fd6b22;
  }
  .submit {
    background: #f5f5f5;
    padding: 25px 0;
  }
  .submit-btn {
    box-shadow: 0 2px 8px #666;
  }
  .line22 {
    line-height: 26px;
  }
  .bg-tp {
    background: #f7e7cb;
  }
  .bg-content {
    background: #fff5e3;
  }
  .radius6 {
    border-radius: 6px;
    overflow: hidden;
  }
</style>
