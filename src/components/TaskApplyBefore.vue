<template xmlns="http://www.w3.org/1999/html">
      <div class="apply-before">
        <div class="choice-wangWang">
          <span class="serial-number">1</span>
          <h3 class="ml-20">选择活动旺旺号</h3>
          <div class="ml-20 mt-10">注意：请<span>务必使用选中的旺旺号完成浏览，收藏，加购</span>,否则资格审核将无法通过</div>
          <Radio-group v-model="selectedWw" class="ml-20 mt-10">
            <Radio label="first">33333333</Radio>
            <Radio label="second">22222222</Radio>
          </Radio-group>
        </div>
        <div class="activity-type mt-40" >
          <span class="serial-number">2</span>
          <h3 >通过商家指定的方式找到该宝贝</h3>
          <div class=" mt-10 search-type">PC搜索下单</div>
          <p>第一步：打开浏览器输入[www.taobao.com]</p>
          <p>第二步：输入关键词[3223]</p>
          <p>第三步：选择[人气]排序</p>
          <p>第四步：搜索指定价格[10-20],勾选[]</p>
          <p>第五步：在[3-4]页附近找到下图宝贝。(由于千人千面的影响，位置仅供参考)</p>
          <div class="mt-20 clear">
            <img class="pic left " src="~assets/img/task-details/task_details_03.png" alt="">
            <p class="left ml-20 mt-22">店铺名称：代理费就是<br/>价格：￥10</p>
          </div>
        </div>
        <div class="screen-shot mt-22 clear" >
          <span class="serial-number">3</span>
          <h3>宝贝浏览见底、收藏、加入购物车，并提交相关截图</h3>
          <div class="mt-22 left">宝贝截图上传：</div>
          <div class="clear left center mt-20 ">
           <div class="left ml-10 ">
             <Upload
               class="ml-5"
               ref="upload"
               :show-upload-list="false"
               :default-file-list="mainDefaultList"
               :on-remove="removeMainImage"
               :on-success="handleSuccess"
               :format="['jpg','jpeg','png','gif','bmp']"
               :max-size="300"
               name="task"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               type="drag">
               <div style="width: 58px;height:58px;line-height: 58px;">
                 <Icon type="camera" size="20"></Icon>
               </div>
             </Upload>
             <p class="mt-8">搜索条件查询</p>
             <p class="mt-8 cursor-p example" >查看示例图</p>
           </div>
           <div class="left ml-40">
             <Upload
               class="ml-5"
               ref="upload"
               :show-upload-list="false"
               :default-file-list="mainDefaultList"
               :on-remove="removeMainImage"
               :on-success="handleSuccess"
               :format="['jpg','jpeg','png','gif','bmp']"
               :max-size="300"
               name="task"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               type="drag">
               <div style="width: 58px;height:58px;line-height: 58px;">
                 <Icon type="camera" size="20"></Icon>
               </div>
             </Upload>
             <p class="mt-8">搜索条件查询</p>
             <p class="mt-8 cursor-p example">查看示例图</p>
           </div>
           <div class="left ml-40">
             <Upload
               class="ml-5"
               ref="upload"
               :show-upload-list="false"
               :default-file-list="mainDefaultList"
               :on-remove="removeMainImage"
               :on-success="handleSuccess"
               :format="['jpg','jpeg','png','gif','bmp']"
               :max-size="300"
               name="task"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               type="drag">
               <div style="width: 58px;height:58px;line-height: 58px;">
                 <Icon type="camera" size="20"></Icon>
               </div>
             </Upload>
             <p class="mt-8">搜索条件查询</p>
             <p class="mt-8 cursor-p example">查看示例图</p>
           </div>
           <div class="left ml-40">
             <Upload
               class="ml-5"
               ref="upload"
               :show-upload-list="false"
               :default-file-list="mainDefaultList"
               :on-remove="removeMainImage"
               :on-success="handleSuccess"
               :format="['jpg','jpeg','png','gif','bmp']"
               :max-size="300"
               name="task"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               type="drag">
               <div style="width: 58px;height:58px;line-height: 58px;">
                 <Icon type="camera" size="20"></Icon>
               </div>
             </Upload>
             <p class="mt-8">搜索条件查询</p>
             <p class="mt-8 cursor-p example">查看示例图</p>
           </div>
           <div class="left ml-40">
             <Upload
               class="ml-5"
               ref="upload"
               :show-upload-list="false"
               :default-file-list="mainDefaultList"
               :on-remove="removeMainImage"
               :on-success="handleSuccess"
               :format="['jpg','jpeg','png','gif','bmp']"
               :max-size="300"
               name="task"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               type="drag">
               <div style="width: 58px;height:58px;line-height: 58px;">
                 <Icon type="camera" size="20"></Icon>
               </div>
             </Upload>
             <p class="mt-8">搜索条件查询</p>
             <p class="mt-8 cursor-p example" >查看示例图</p>
           </div>
          </div>
        </div>
        <p class="descriptive">点击上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，不超过2M</p>
        <div class="text-ct mt-40">
          <iButton type="success" style="color: #fff;width: 150px;height: 30px;">提交申请</iButton>
          <iButton class="ml-20" style="width: 150px;height: 30px;">取消</iButton>
        </div>
      </div>
</template>
<script>
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import Radio from 'iview/src/components/radio'
  import Icon from 'iview/src/components/icon'
  import Upload from '@/components/upload'
  import {mapActions} from 'vuex'

  export default {
    name: 'TaskApplyBefore',
    components: {
      iButton: Button,
      ButtonGroup: Button.Group,
      Modal: Modal,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Upload: Upload,
      Icon: Icon,

    },
    data() {
      return {
        selectedWw:'first',
        pcDefaultList: [],
        mainDefaultList: [],
      }
    },
    computed: {
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      }
    },
    created() {

    },
    methods: {
      ...mapActions([
        'getUserInformation'
      ]),
      removeMainImage() {

      },
      handleSuccess(res) {

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
          content: '图片 ' + file.name + ' 太大，不能超过 300K'
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';
  .apply-before{
    .example{
      color: blue;
    }
    .choice-wangWang{
      padding: 10px;
      position: relative;
      .serial-number{
        position: absolute;
        top: 9px;
        left: 5px;
        display:inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #CCCCCC;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 16px;
      }
    }
    .activity-type{
      padding: 10px 30px;
      position: relative;
      .serial-number{
        position: absolute;
        top: 9px;
        left: 5px;
        display:inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #CCCCCC;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 16px;
      }
      .search-type{
        padding: 10px 0px ;
        border-bottom: 1px solid #F9F9F9;
      }
      p{
        padding: 10px 0px;
      }
      .pic{
        /*display: block;*/
        width: 100px;
        height: 100px;
      }
    }
    .screen-shot{
      padding: 10px 30px;
      position: relative;
      .serial-number{
        position: absolute;
        top: 9px;
        left: 5px;
        display:inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #CCCCCC;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 16px;
      }
      .center>div{
        text-align: center;
      }
    }
    .descriptive{
      margin-left: 125px;
      margin-top: 20px;
    }
  }
</style>

