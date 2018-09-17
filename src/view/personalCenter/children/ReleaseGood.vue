<template>
  <div class="pd-tb-20">
    <p class="page-title">什么是白拿拿商城？</p>
    <p class="pl-40 mt-20 font16">
      商城是采用<span class="orange">先试后买</span>模式的<span class="orange">淘外卖货</span>平台，
      买家按照商家设定<span class="orange">缴纳保证金</span>后，拥有<span class="orange">14天免费试用权限</span>，
      试用期间若满意则<span class="orange">支付商品尾款</span>（<span class="orange">商品成交价=保证金+商品尾款</span>），若不满意则买家退货完成后，退还买家保证金。
    </p>
    <p class="page-title mt-20">商品流程</p>
    <img src="~assets/img/good-release/good-release.png" alt="" class="mt-20 mb-20">
    <Form :model="validate" :rules="ruleValidate"  ref="form" label-position="left">
      <div class="title pl-20 border-ddd">申请商品信息</div>
      <div class="pd-tb-20 pl-20 pr-20 border-ddd">
        <FormItem label="淘宝链接：" :label-width="100" prop="itemUrl">
          <Input placeholder="请输入淘宝宝贝链接" autofocus v-model="validate.itemUrl"  class="width-300" />
        </FormItem>
        <FormItem label="商品试用保证金：" prop="itemFirstPrice" :label-width="120">
          <Input placeholder="请输入试用保证金" v-model.number="validate.itemFirstPrice" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-20 describe">（试用保证金接近商品成本价）</span>
        </FormItem>
        <FormItem label="7天内确认满意收货尾款：" prop="itemDay1Price" class="pl-40" :label-width="160">
          <Input placeholder="请输入尾款" v-model.model="validate.itemDay1Price" class="width-100" />
          <span class="pl-10">元</span>
          <span class="ml-40">商品成交总价：</span>
          <Input  disabled class="width-100 ml-20" v-model.number="weekPriceNumber" />
          <span class="pl-10">元</span>
          <span class="ml-20 describe">（商品成交总价=试用保证金+尾款）</span>
        </FormItem>
        <FormItem label="14天内确认满意收货尾款：" prop="itemDay2Price" class="pl-40" :label-width="160">
          <Input placeholder="请输入尾款" class="width-100" v-model.number="validate.itemDay2Price" />
          <span class="pl-10">元</span>
          <span class="ml-40">商品成交总价：</span>
          <Input disabled class="width-100 ml-20" v-model.number="monthPriceNumber" />
          <span class="pl-10">元</span>
          <span class="ml-20 describe">（商品成交总价=试用保证金+尾款）</span>
        </FormItem>
        <FormItem label="是否包邮：" prop="pinkage" :label-width="100">
          <Radio v-model="validate.pinkage">商品包邮，无需修改运费</Radio>
          <span>（商城仅支持包邮）</span>
        </FormItem>
      </div>
      <div class="title pl-20 border-ddd mt-20">商品展示信息</div>
      <div class="pd-tb-20 pl-20 pr-20 border-ddd">
        <FormItem label="商品标题：" prop="taskName" :label-width="100">
          <Input placeholder="请输入商品标题" class="width-300" v-model="validate.taskName" :maxlength="60" />
          <span class="ml-10">名称实例<Icon type="md-help-circle" class="color-theme font16" /></span>
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
        <FormItem label="商品主图：" class="label-pt" prop="taskMainImage" :label-width="100">
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

        <FormItem label="商品份数：" prop="taskCount" :label-width="100">
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
        <FormItem label="商品简介：" prop="taskDetail" :label-width="100">
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
  import { aliUploadImg, getStorage, setStorage, randomString } from "@/config/utils";
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
          itemFirstPrice: null,
          itemDay1Price: null,
          itemDay2Price: null,
          pinkage: true,
          taskName: '',
          itemType: null,
          taskMainImage: '',
          taskCount: null,
          taskDetail: ''
        },
        ruleValidate: {
          itemUrl: [
            { required: true, type: 'url', message: '请正确输入商品的链接', trigger: 'blur' }
          ],
          itemFirstPrice: [
            { required: true, trigger: 'blur', validator: myValidate  }
          ],
          itemDay1Price: [
            { required: false, trigger: 'blur', validator: myValidate }
          ],
          itemDay2Price: [
            { required: false, trigger: 'blur', validator: myValidate }
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
        return Number(this.validate.itemFirstPrice) || 0;
      },
      weekPaymentNumber() {
        return Number(this.validate.itemDay1Price) || 0;
      },
      weekPriceNumber() {
        return this.priceNumber + this.weekPaymentNumber;
      },
      monthPaymentNumber() {
        return Number(this.validate.itemDay2Price) || 0;
      },
      monthPriceNumber() {
        return this.priceNumber + this.monthPaymentNumber;
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
            this.$Message.error("请正确填写完整，带 * 为必选项");
          }
        })
      },
      submit() {
        const data = Object.assign(this.validate, {
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
        aliUploadImg(key, file).then(res => {
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
      this.getItemCatalog();
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

</style>
