<template>
    <div class="image-upload">
      <div class="image-upload-title f-b">活动截图上传</div>
      <div class="image-upload-area">
        <div class="shop-compare clear" v-for="(item,index) in shopCompareList">
          <p class="upload-type-title">货比3家（宝贝{{index}}）<span>搜索过程中随意点击其他店铺的宝贝进行浏览，并上传浏览截图</span></p>
          <div class="upload-area left">
            <upload key="appDefaultList" class="upload"
                    :on-success="appBabyImgSuccess"
                    :default-file-list="appDefaultList"
                    :on-remove="removeAppImage"
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
            <upload key="appDefaultList" class="upload"
                    :on-success="appBabyImgSuccess"
                    :default-file-list="appDefaultList"
                    :on-remove="removeAppImage"
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
            <upload key="appDefaultList" class="upload"
                    :on-success="appBabyImgSuccess"
                    :default-file-list="appDefaultList"
                    :on-remove="removeAppImage"
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
            <!--<div class="pt-10 pb-5">评价浏览</div>-->
            <!--<div class="review-image">查看示例图</div>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {Icon} from 'iview'
  import Upload from '@/components/Upload'
  export default {
    name: "activity-screenshots-upload",
    components:{
      Icon:Icon,
      Upload:Upload,
    },
    data() {
      return {
        shopCompareList:[{},{},{}],
        // browseAnswer: [
        //   {
        //     issue: null,
        //     image: null
        //   }
        // ],
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
