<template>
  <div>
    <div class="container">
      <div class="mt-10">
        <div class="trial-right left">
          <div >
            <p class="fs-16 trial-account">我的主页</p>
            <p class="trial-tag">

            </p>
            <div  class="graphic-info-report">

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Alert from 'iview/src/components/alert'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  import Carousel from 'iview/src/components/carousel'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'MyTrialReport',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      TimeDown: TimeDown,
      Alert: Alert,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
    },
    data () {
      return {
        value3: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover'
        }
      }
    },
    created(){
    },
    computed: {
    },
    methods: {
      pageChange(){

      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .trial-left{
    >div{
      border-radius: 3px;
      padding: 5px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      margin-right: 20px;
      p{
        line-height: 25px;
      }
    }
  }
  .trial-right{
    background-color: #fff;
    width: 1008px;
    .trial-account{
      line-height: 50px;
      height: 50px;
    }
    .trial-tag{
      border: 1px solid #EEEEEE;
      border-left: none;
      border-right: none;
      line-height: 50px;
      height: 50px;
    }
    .trial-account-details{
      background-color: #f8f8f8;
      padding: 15px 15px;
      border: 1px solid #eee;
      overflow: hidden;
      .task-info{
        p{
          line-height: 30px;
          font-size: 14px;
        }
      }
      .task-list-img-box{
        .task-list-img{
          a{
            display: inline-block;
            margin-right: 50px;
          }
        }
      }

    }
  }
  .graphic-info-report{
    width: 1000px;
    ul{
      li{
        display: table;
        padding: 30px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        div{
          display: table-cell;
          vertical-align: middle;
        }
        >div:first-child{
          width: 15%;
          text-align: center;
        }
        >div:last-child{
          width: 85%;
          p{
            line-height: 30px;
            font-size: 14px;
            &:first-child{
              color: #999;
            }
            &:last-child{
              margin-top: 10px;
              a{
                border: 1px solid #ddd;
                display: inline-block;
                margin-right: 10px;
                padding: 5px;
                border-radius: 5px;
                img{
                  vertical-align: middle;
                  width: 38px;
                }
              }
            }
          }
        }
      }
    }
  }


</style>
