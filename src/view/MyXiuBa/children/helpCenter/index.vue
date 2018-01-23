<template>
  <div class="personal-box" :class="[!isLogin ? 'ml-12p' : '']">
    <div class="personal-sel-top">
      <router-link v-if="$store.state.userInfo.role === myInfoSelect.role || myInfoSelect.role === null" :to="myInfoSelect.link" :key="myInfoSelect.link" v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect == myInfoSelect.isSelect}">
        {{myInfoSelect.text}}
      </router-link>
    </div>
    <div class="personal-sel-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import Upload from '@/components/upload'
  import {setStorage, getStorage} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import Modal from 'iview/src/components/modal'
  import Alert from 'iview/src/components/alert'
  import SmsCountdown from '@/components/SmsCountdown'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  export default {
    name: 'TaskReleaseProcess',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Upload: Upload,
      Modal: Modal,
      Alert: Alert,
      SmsCountdown: SmsCountdown,
    },

    data() {
      return {
        userData: {},
        myInfoSelects: [
          {
            text: '常见问题',
            isSelect: 'faq',
            link: '/user/help-center/faq',
            role: null
          },
          {
            text: '商家中心',
            isSelect: 'faqSeller',
            link: '/user/help-center/faq-seller',
            role: 1
          },
          {
            text: '拿手中心',
            link: '/user/help-center/faq-showker',
            isSelect: 'faqShowker',
            role: 0
          },
        ],
        infoSelect: '',
      }
    },
    beforeMount() {

    },
    mounted() {

    },
    created() {
      let self = this;
      self.infoSelect = self.$route.name;
    },
    computed: {
      isLogin(){
        return this.$store.state.login
      },
    },
    methods: {

    },
    watch: {
      $route(to){
        this.infoSelect = to.name;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .personal-box {
    .personal-sel-top {
      border-bottom: 1px solid $mainColor;
      margin: auto;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
    .personal-sel-box {
      .verified-box{
        width: 830px;
        margin: 30px auto auto auto;
        .verified-form{
          margin-top: 20px;
          width: 400px;
          float: left;
          .verified-btn{
            background-color: $mainColor;
            color: #fff;
          }
        }
        .verified-cue{
          p{
            height: 36px;
            line-height: 36px;
            margin-bottom: 21px;
            margin-left: 30px;
            a{
              margin-right: 30px;
            }
          }
        }
        .error-result-text{
          margin-left: 116px;
          clear: both;
          font-size: 14px;
        }
        .verified-result{
          p:first-child{
            font-size: 30pt;
            margin: auto;
            width: 500px;
            color: #666;
          }
          p:last-child{
            font-size: 14px;
            margin: 60px auto;
            width: 600px;
            color: #999;
          }
        }
      }
    }
  }

</style>
