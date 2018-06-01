<template>
    <div class="image-upload">
      <div class="image-upload-title f-b">活动截图上传</div>
      <div class="image-upload-area">
        <!--货比三家 start-->
        <div class="shop-compare clear">
          <p class="upload-type-title">货比3家（宝贝1）<span>搜索过程中随意点击其他店铺的宝贝进行浏览，并上传浏览截图</span></p>
          <div class="upload-area left" v-for="(item,index) in shopOneImageList" :key="index">
            <upload key="otherShopImageList" class="upload"
                    :on-success="uploadSuccess"
                    :default-file-list="item.screenshotsList"
                    :on-remove="removeImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :index="index"
                    type="drag"
                    :itemInfo="item">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">{{item.title}}</div>
            <div class="review-image cursor-p" @click="previewImage(item.tipsPicture)">查看示例图</div>
          </div>
        </div>
        <div class="shop-compare clear">
          <p class="upload-type-title">货比3家（宝贝2）<span>搜索过程中随意点击其他店铺的宝贝进行浏览，并上传浏览截图</span></p>
          <div class="upload-area left" v-for="(item,index) in shopTwoImageList" :key="index">
            <upload key="otherShopImageList" class="upload"
                    :on-success="uploadSuccess"
                    :default-file-list="item.screenshotsList"
                    :on-remove="removeImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :itemInfo="item">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">{{item.title}}</div>
            <div class="review-image cursor-p" @click="previewImage(item.tipsPicture)">查看示例图</div>
          </div>
        </div>
        <div class="shop-compare clear">
          <p class="upload-type-title">货比3家（宝贝3）<span>搜索过程中随意点击其他店铺的宝贝进行浏览，并上传浏览截图</span></p>
          <div class="upload-area left" v-for="(item,index) in shopThreeImageList" :key="index">
            <upload key="otherShopImageList" class="upload"
                    :on-success="uploadSuccess"
                    :default-file-list="item.screenshotsList"
                    :on-remove="removeImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :itemInfo="item">
              <div class="camera">
                <Icon type="camera " size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">{{item.title}}</div>
            <div class="review-image cursor-p" @click="previewImage(item.tipsPicture)">查看示例图</div>
          </div>
        </div>
        <!--货比三家 end-->
        <!--主宝贝截图 start-->
        <div class="main-baby-screenshots clear">
          <p class="upload-type-title">主宝贝浏览截图 <span>搜索到目标宝贝，按要求截图并上传</span></p>
          <div class="upload-area left" v-for="(item,index) in mainBabyImageList" :key="index">
            <upload key="mainBabyImageList" class="upload"
                    :on-success="uploadSuccess"
                    :default-file-list="item.screenshotsList"
                    :on-remove="removeImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :itemInfo="item">
              <div class="camera">
                <Icon type="camera" size="20"></Icon>
              </div>
            </upload>
            <div class="pt-10 pb-5">{{item.title}}</div>
            <div class="review-image cursor-p" @click="previewImage(item.tipsPicture)">查看示例图</div>
          </div>
        </div>
        <!--主宝贝截图 end-->
        <!--主宝贝答题 start-->
        <div class="main-baby-answer clear">
          <p class="upload-type-title">主宝贝浏览答题<span>在目标宝贝的详情页找到如下文案，并提供坐在位置截图</span> <span class="review-image">查看示例图</span></p>
          <div class="upload-area left">
            <upload key="mainBabyAnswerList" class="upload"
                    :on-success="uploadSuccess"
                    :default-file-list="mainBabyAnswerList"
                    :on-remove="removeImage"
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
        <!--主宝贝答题 end-->
      </div>
      <!--查看示例图弹窗-->
      <div v-if="visible" style="z-index: 3000" class="text">
        <Modal title="图片查看器" v-model="visible">
          <img :src="demoPictureSrc" v-if="visible" style="width: 100%">
        </Modal>
      </div>
    </div>
</template>

<script>
  import {Icon, Modal} from 'iview'
  import Upload from '@/components/Upload'
  import {aliCallbackImgUrl} from '@/config/env'
  import api from  '@/config/apiConfig'
  export default {
    name: "activity-screenshots-upload",
    components:{
      Icon:Icon,
      Upload:Upload,
      Modal:Modal
    },
    data() {
      return {
        visible:false,
        shopOneImageList:[],
        shopTwoImageList:[],
        shopThreeImageList:[],
        mainBabyImageList:[],
        mainBabyAnswerList:[],
        demoPictureSrc:''
      }
    },
    props:{
      orderInfo:{
        type:Object,
        default() {
          return {}
        },
        required:true
      }
    },
    computed:{

    },
    created() {
      // console.log(this.orderInfo);
      // this.handleData();
      this.handleDataTest();
    },
    mounted() {

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
      // 上传成功后的回调
      uploadSuccess(res,info) {
        let _this = this;
        info.src = aliCallbackImgUrl + res.name;
        _this.submitVasAnswer(info);
      },
      // 删除已上传的图片
      removeImage() {

      },

      // 处理后台返回的数据
      // handleData() {
      //   const _this = this;
      //   let tempData = _this.orderInfo;
      //   let mainBabyList = [];
      //   let babyOneList = [];
      //   let babyTwoList = [];
      //   let babyThreeList = [];
      //   let mainIndex = -1;
      //   let similarOneIndex = -1;
      //   let similarTwoIndex = -1;
      //   let similarThreeIndex = -1;
      //   tempData.showkerTaskVasSettings.forEach( item => {
      //     let screenshotsList = item.answerScreenshot ? [{src:item.answerScreenshot}] : [];
      //     let obj = {
      //       src:'',
      //       screenshotsList:screenshotsList,
      //       title:'',
      //       id:item.id,
      //       itemIndex:item.itemIndex
      //     };
      //     if (item.itemType === "main_item"){
      //       mainIndex ++;
      //       obj.title = tempData.mainVasSettings[mainIndex].name;
      //       obj.required = item.required;
      //       obj.tipsPicture = tempData.mainVasSettings[mainIndex].tipsPicture;
      //       mainBabyList.push(obj)
      //     }else {
      //       if (item.itemIndex === 0){
      //         similarOneIndex ++;
      //         obj.title = tempData.similarVasSettings[0][similarOneIndex].name;
      //         obj.required = item.required;
      //         obj.tipsPicture = tempData.similarVasSettings[0][similarOneIndex].tipsPicture;
      //         babyOneList.push(obj)
      //       }else if (item.itemIndex === 1){
      //         similarTwoIndex ++;
      //         obj.title = tempData.similarVasSettings[1][similarTwoIndex].name;
      //         obj.required = item.required;
      //         obj.tipsPicture = tempData.similarVasSettings[1][similarTwoIndex].tipsPicture;
      //         babyTwoList.push(obj)
      //       }else {
      //         similarThreeIndex ++;
      //         obj.title = tempData.similarVasSettings[2][similarThreeIndex].name;
      //         obj.required = item.required;
      //         obj.tipsPicture = tempData.similarVasSettings[2][similarThreeIndex].tipsPicture;
      //         babyThreeList.push(obj)
      //       }
      //     }
      //   });
      //   _this.mainBabyImageList = mainBabyList;
      //   _this.shopOneImageList = babyOneList;
      //   _this.shopTwoImageList = babyTwoList;
      //   _this.shopThreeImageList = babyThreeList;
      //   console.log(_this.mainBabyImageList);
      // },
      // 测试
      handleDataTest() {
        const _this = this;
        let tempData = _this.orderInfo;
        let handleList = tempData.showkerTaskVasSettings.map(item => {
          let tempObj = {};
          tempData.mainVasSettings.map(main => {
            if (item.vasConfigId === main.id) {
              tempObj.id = item.id;
              tempObj.title = main.name;
              tempObj.tipsPicture = main.tipsPicture;
              tempObj.itemType = item.itemType;
              tempObj.itemIndex = item.itemIndex;
              tempObj.required = item.required;
              tempObj.screenshotsList = item.answerScreenshot ? [{src:item.answerScreenshot}] : [];
            }
          });
          tempData.similarVasSettings.map(similarOut => {
            similarOut.map(similarIn => {
              if (item.vasConfigId === similarIn.id) {
                tempObj.id = item.id;
                tempObj.title = similarIn.name;
                tempObj.tipsPicture = similarIn.tipsPicture;
                tempObj.itemType = item.itemType;
                tempObj.itemIndex = item.itemIndex;
                tempObj.required = item.required;
                tempObj.screenshotsList = item.answerScreenshot ? [{src:item.answerScreenshot}] : [];
              }
            })
          });
          return tempObj;
        });
        console.log(handleList);
        _this.shopOneImageList = handleList.filter(item => {
          return item.itemIndex === 0;
        });
        _this.shopTwoImageList = handleList.filter(item => {
          return item.itemIndex === 1;
        });
        _this.shopThreeImageList = handleList.filter(item => {
          return item.itemIndex === 2;
        });
        _this.mainBabyImageList = handleList.filter(item => {
          return item.itemType === 'main_item';
        });
      },
      // 提交增值服务答案（截图）
      submitVasAnswer(info) {
        const _this = this;
        api.submitVasAnswer({
          showkerTaskVasSettingsId:info.id,
          answerScreenshot:info.src,
          answer:''
        }).then(res => {
          if (res.status) {
            _this.$Message.success('上传成功');
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      // 查看示例图
      previewImage(img) {
        this.demoPictureSrc = img;
        this.visible = true;
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
