<template>
  <div class="clear">
    <div class="demo-upload-list left" v-for="(item ,index) in fileList">
      <template v-if="item.status === 'finished'">
        <img :src="item.src + '!thum54'">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.src)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <iProgress v-if="item.showProgress" :percent="item.percentage" hide-info></iProgress>
      </template>
    </div>
    <div ref="upload"  class="left" :class="[prefixCls]" v-show="showUpload">
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
      <slot name="tip"></slot>
      <upload-list
        v-if="showUploadList"
        :files="fileList"
        @on-file-remove="handleRemove"
        @on-file-preview="handlePreview"></upload-list>
    </div>
    <Modal title="图片查看器" v-model="visible">
      <img :src="uploadSrc + '!orgi75'" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  import UploadList from 'iview/src/components/upload/upload-list.vue';
  import Icon from 'iview/src/components/icon'
  import Modal from 'iview/src/components/modal'
  import Progress from 'iview/src/components/progress'
  import {oneOf} from 'iview/src/utils/assist';
  import Emitter from 'iview/src/mixins/emitter';
  import {aliUrl, bucket, aliCallbackImgUrl} from '@/config/env'
  import {aliUploadImg, randomString} from '@/config/utils'

  const prefixCls = 'ivu-upload';

  export default {
    name: 'Upload',
    mixins: [Emitter],
    components: {
      UploadList: UploadList,
      Icon: Icon,
      Modal: Modal,
      iProgress: Progress
    },
    props: {
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
      uploadLength: {
        type: Number,
        default: 1
      },
      beforeUpload: Function,
      onProgress: {
        type: Function,
        default() {
          return {};
        }
      },
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
        fileList: [],
        visible: false,
        uploadSrc: null,
        showUpload: true,
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
    created() {
      if (this.defaultFileList.length > 0) {
        let list = this.defaultFileList;
        this.fileList = list.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          return item;
        });
      }
    },
    methods: {
      handleView(name) {
        this.uploadSrc = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
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
          });
        } else if (before !== false) {
          this.post(file);
        } else {
        }
      },
      post(file) {
        if (this.format.length) {
          const _file_format = file.name.split('.').pop().toLocaleLowerCase();
          const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
          if (!checked) {
            this.onFormatError(file, this.fileList);
            return false;
          }
        }

        if (this.maxSize) {
          if (file.size > this.maxSize * 1024) {
            this.onExceededSize(file, this.fileList);
            return false;
          }
        }

        this.handleStart(file);
        let formData = new FormData();
        formData.append(this.name, file);
        let _this = this;
        _this.handleProgress(file);
        let key = _this.name + '/' + randomString();
        aliUploadImg(key, file).then(res => {
          if (res) {
            _this.handleSuccess(res, file);
          }
        }).catch(err => {
          console.log(err);
          _this.handleError(err, file);
        })
      },
      handleStart(file) {
//        file.uid = Date.now() + this.tempIndex;
        const _file = {
          status: 'uploading',
          name: file.name,
          size: file.size,
          percentage: 0,
//          uid: file.uid,
          showProgress: true
        };

        this.fileList.push(_file);
      },
      getFile(file) {
        const fileList = this.fileList;
        let target;
        fileList.every(item => {
          target = file.name === item.name ? item : null;
          return !target;
        });
        return target;
      },
      handleProgress(file) {
        const _file = this.getFile(file);
        let interval = setInterval(function () {
          _file.percentage += 20;
          if (_file.percentage === 100) {
            clearInterval(interval)
          }
        }, 30)
      },
      handleSuccess(res, file) {
        const _file = this.getFile(file);
        if (_file) {
          _file.status = 'finished';
          _file.src = aliCallbackImgUrl + res.name;

//          this.dispatch('FormItem', 'on-form-change', _file);
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
      handleRemove(file) {
        const fileList = this.fileList;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
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
    watch: {
      fileList: {
        deep: true,
        handler(newValue, oldValue) {
          this.showUpload = newValue.length < this.uploadLength;
        },
      },
      defaultFileList: {
        handler() {
          if (this.defaultFileList.length > 0) {
            let list = this.defaultFileList;
            this.fileList = list.map(item => {
              item.status = 'finished';
              item.percentage = 100;
              return item;
            });
          }
        },
      }
    }
  };
</script>
<style lang="scss" scoped>
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
