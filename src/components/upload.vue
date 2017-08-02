<template>
  <div class="clear">
    <div class="demo-upload-list left" v-for="(image,index) in imageList">
      <template>
        <img :src="image">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(image)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </template>
    </div>
    <div class="left" :class="[prefixCls]">
      <div
        :class="classes"
        @click="handleClick"
        @drop.prevent="onDrop"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false">
        <input
          ref="input"
          type="file"
          :class="[prefixCls + '-input']"
          @change="handleChange"
          :multiple="multiple"
          :accept="accept">
        <slot></slot>
      </div>
    </div>
    <div class="left mt-20 ml-20">
      <span style="color: #19be6b;" v-if="uploadSuccess">
        <i class="ivu-icon ivu-icon-ios-checkmark"></i>
        恭喜您图片上传成功！
      </span>
      <span style="color:red;" v-if="uploadError">
        <i class="ivu-icon ivu-icon-ios-close"></i>
        图片上传失败，请删除图片重新上传！
      </span>
    </div>
    <Modal title="查看图片" v-model="visible">
      <img :src="modelImgSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  import UploadList from 'iview/src/components/upload/upload-list.vue';
  import Icon from 'iview/src/components/icon'
  import Modal from 'iview/src/components/modal'
  import {oneOf} from 'iview/src/utils/assist';
  import Emitter from 'iview/src/mixins/emitter';
  import {aliUrl, bucket} from '@/config/env'
  import {TimeToDate, aliUploadImg} from '@/config/utils'

  const prefixCls = 'ivu-upload';

  export default {
    name: 'Upload',
    components: {UploadList, Icon, Modal},
    mixins: [Emitter],
    props: {
      headers: {
        type: Object,
        default() {
          return {};
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object
      },
      name: {
        type: String,
        default: 'file'
      },
      withCredentials: {
        type: Boolean,
        default: false
      },
      showUploadList: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        validator(value) {
          return oneOf(value, ['select', 'drag']);
        },
        default: 'select'
      },
      format: {
        type: Array,
        default() {
          return [];
        }
      },
      accept: {
        type: String
      },
      maxSize: {
        type: Number
      },
      beforeUpload: Function,
      onSuccess: {
        type: Function,
        default() {
          return {};
        }
      },
      onError: {
        type: Function,
        default() {
          return {};
        }
      },
      onRemove: {
        type: Function,
        default() {
          return {};
        }
      },
      onPreview: {
        type: Function,
        default() {
          return {};
        }
      },
      onExceededSize: {
        type: Function,
        default() {
          return {};
        }
      },
      onFormatError: {
        type: Function,
        default() {
          return {};
        }
      },
      defaultFileList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        prefixCls: prefixCls,
        dragOver: false,
        visible: false,
        modelImgSrc: null,
        uploadSuccess: false,
        uploadError: false,
        fileList: [],
        imageList: [],
        tempIndex: 1
      };
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-select`]: this.type === 'select',
            [`${prefixCls}-drag`]: this.type === 'drag',
            [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
          }
        ];
      },

    },
    methods: {
      handleView(image) {
        this.modelImgSrc = image;
        this.visible = true;
      },
      handleRemove(index) {
        this.imageList.splice(index, 1);
      },
      handleClick() {
        this.$refs.input.click();
      },
      handleChange(e) {
        const files = e.target.files;

        if (!files) {
          return;
        }
        this.uploadFiles(files);
        let reader = new FileReader();
        let img = e.target.files[0];
        reader.readAsDataURL(img);
        let _this = this;
        reader.onload = function () {
          _this.imageList.push(reader.result)
        };
        this.$refs.input.value = null;
      },
      onDrop(e) {
        this.dragOver = false;
        this.uploadFiles(e.dataTransfer.files);
      },
      uploadFiles(files) {
        let postFiles = Array.prototype.slice.call(files);
        if (!this.multiple) postFiles = postFiles.slice(0, 1);

        if (postFiles.length === 0) return;

        postFiles.forEach(file => {
          this.upload(file);
        });
      },
      upload(file) {
        if (!this.beforeUpload) {
          return this.post(file);
        }

        const before = this.beforeUpload(file);
        if (before && before.then) {
          before.then(processedFile => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              this.post(processedFile);
            } else {
              this.post(file);
            }
          }, () => {
            // this.$emit('cancel', file);
          });
        } else if (before !== false) {
          this.post(file);
        } else {
          // this.$emit('cancel', file);
        }
      },
      post(file) {
        // check format
        if (this.format.length) {
          const _file_format = file.name.split('.').pop().toLocaleLowerCase();
          const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
          if (!checked) {
            this.onFormatError(file, this.fileList);
            return false;
          }
        }

        // check maxSize
        if (this.maxSize) {
          if (file.size > this.maxSize * 1024) {
            this.onExceededSize(file, this.fileList);
            return false;
          }
        }

        this.handleStart(file);

        let _this = this;
        let key = _this.name + '/' + TimeToDate() + '/' + Math.random().toString(36).substr(2);
        aliUploadImg(key,file).then(res =>{
          if(res){
            console.log(res);
            _this.uploadSuccess = true;
            _this.handleSuccess(res, file);
          }
        }).catch(err =>{
          _this.uploadError = true;
          _this.handleError(err, file);
        })
      },
      handleStart(file) {
        file.uid = Date.now() + this.tempIndex++;
        const _file = {
          status: 'uploading',
          name: file.name,
          size: file.size,
          percentage: 0,
          uid: file.uid,
          showProgress: true
        };

        this.fileList.push(_file);
      },
      getFile(file) {
        const fileList = this.fileList;
        let target;
        fileList.every(item => {
          target = file.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },
      handleSuccess(res, file) {
        const _file = this.getFile(file);

        if (_file) {
          _file.status = 'finished';
          _file.response = res;

          this.dispatch('FormItem', 'on-form-change', _file);
          this.onSuccess(res, _file, this.fileList);

          setTimeout(() => {
            _file.showProgress = false;
          }, 1000);
        }
      },
      handleError(err, response, file) {
        const _file = this.getFile(file);
        const fileList = this.fileList;

        _file.status = 'fail';

        fileList.splice(fileList.indexOf(_file), 1);

        this.onError(err, response, file);
      },
      handlePreview(file) {
        if (file.status === 'finished') {
          this.onPreview(file);
        }
      },
      clearFiles() {
        this.fileList = [];
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import 'src/css/common';

  .demo-upload-list {
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
    &:hover .demo-upload-list-cover {
      display: block;
    }
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
