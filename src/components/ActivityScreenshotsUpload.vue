<template>
    <div class="image-upload">
      <div class="image-upload-title f-b">活动截图上传</div>
      <div class="image-upload-area">
        <div class="shop-compare clear" v-for="(item,index) in shopCompareList" :key="index">
          <p class="upload-type-title">货比3家（宝贝{{index}}）<span>搜索过程中随意点击其他店铺的宝贝进行浏览，并上传浏览截图</span></p>
          <div class="upload-area left" v-for="(item,index) in tempList" :key="index">
            <upload key="otherShopImageList" class="upload"
                    :on-success="otherShopImgSuccess"
                    :default-file-list="screenshotsData.otherShopImageList"
                    :on-remove="removeOtherShopImg"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">宝贝浏览见底</div>
            <div class="review-image">查看示例图</div>
          </div>
        </div>
        <div class="main-baby-screenshots clear">
          <p class="upload-type-title">主宝贝浏览截图 <span>搜索到目标宝贝，按要求截图并上传</span></p>
          <div class="upload-area left">
            <upload key="mainBabyImageList" class="upload"
                    :on-success="mainBabyImgSuccess"
                    :default-file-list="screenshotsData.mainBabyImageList"
                    :on-remove="removeMainBabyImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">评价浏览</div>
            <div class="review-image">查看示例图</div>
          </div>
        </div>
        <div class="main-baby-answer clear">
          <p class="upload-type-title">主宝贝浏览答题<span>在目标宝贝的详情页找到如下文案，并提供坐在位置截图</span> <span class="review-image">查看示例图</span></p>
          <div class="upload-area left">
            <upload key="mainBabyAnswerList" class="upload"
                    :on-success="MainBabyAnswerSuccess"
                    :default-file-list="screenshotsData.mainBabyAnswerList"
                    :on-remove="removeMainBabyAnswer"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {Icon} from 'iview'
  import Upload from '@/components/Upload'
  import {aliCallbackImgUrl} from '@/config/env'
  export default {
    name: "activity-screenshots-upload",
    components:{
      Icon:Icon,
      Upload:Upload,
    },
    data() {
      return {
        shopCompareList:[{},{},{}],
        tempList:[{},{},{},{},{},{}],
        screenshotsData:{
          otherShopImageList:[],
          mainBabyImageList:[],
          mainBabyAnswerList:[]
        }
      }
    },
    props:{

    },
    computed:{

    },
    created() {

    },
    methods:{
      handleFormatError(file) {
        this.$Modal.warning({
          title:'文件格式不正确',
          content:`图片 ${file.name} 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。`
        })
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: `图片 ${file.name} 太大，不能超过 1M`
        })
      },
      otherShopImgSuccess(res) {
        let _this = this;
        _this.screenshotsData.otherShopImageList.push(aliCallbackImgUrl + res.name);
      },
      removeOtherShopImg(res) {
        let _this = this;
        let sliceIndex = _this.screenshotsData.otherShopImageList.findIndex( item => {
          return item === res.src;
        });
        _this.screenshotsData.otherShopImageList.splice(sliceIndex,1);
      },
      mainBabyImgSuccess(res) {
        let _this = this;
        _this.screenshotsData.mainBabyImageList.push(aliCallbackImgUrl + res.name);
      },
      removeMainBabyImage(res) {
        let _this = this;
        let sliceIndex = _this.screenshotsData.mainBabyImageList.findIndex( item => {
          return item === res.src;
        });
        _this.screenshotsData.mainBabyImageList.splice(sliceIndex,1);
      },
      MainBabyAnswerSuccess(res) {
        let _this = this;
        _this.screenshotsData.mainBabyAnswerList.push(aliCallbackImgUrl + res.name);
      },
      removeMainBabyAnswer(res) {
        let _this = this;
        let sliceIndex = _this.screenshotsData.mainBabyAnswerList.findIndex( item => {
          return item === res.src;
        });
        _this.screenshotsData.mainBabyAnswerList.splice(sliceIndex,1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .image-upload-title {
    padding:20px 0 10px 0;
    border-bottom:2px solid #F6F6F6;
  }
  .image-upload-area {
    .upload-type-title {
      color:#495060;
      padding:20px 0;
      span{
        margin-left:20px;
        color:#999;
      }
      .review-image{
        color:#2b85e4;
      }
    }
    .upload-area {
      width:100px;
      padding:0 10px;
      text-align: center;
      .upload {
        margin-left:10px;
      }
      .camera {
        width: 58px;
        height: 58px;
        line-height: 58px;
      }
    }
    .review-image{
      color:#2b85e4;
    }
  }


</style>
