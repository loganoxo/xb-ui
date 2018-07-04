<template>
    <div class="chapaiming-landing">
      <top/>
      <div class="chapaiming-area">
        <div class="content">
          <div class="search-title">淘宝信誉/小号查询</div>
          <div class="search-box">
            <div class="search-area">
              <span class="search-name">旺旺账号：</span>
              <input type="text" placeholder="请输入旺旺账号" class="search-input">
              <!--<i-button class="search-btn">查小号/查信誉</i-button>-->
              <span class="search-btn" @click="toRegister">查小号/查信誉</span>
            </div>
          </div>
          <div class="explain-box">
            <div class="explain-area">
              <p class="explain-title">淘宝信用/中差评查询使用说明：</p>
              <p class="explain-point">一、使用方法：</p>
              <p class="explain-content">请在输入框内输入淘宝帐号，并点击查询，等待结果</p>
              <p class="explain-point">二、注意事项：</p>
              <p class="explain-content">1，注册时间<span class="point">小于30天</span>的，被认定为小号/新号，有可能是骗子，应当谨慎交易，免得赚几块钱换来一个中差评。</p>
              <p class="explain-content">2，该工具可以查询<span class="point">买家中差评数量</span>以及<span class="point">中差评</span>信息，如果该用户的比例超过一定的比例，则有可能是中差评师，要十分注意了。</p>
              <p class="explain-content">3，经常刷的小号，当信用点数<span class="point">超过20点</span>（常购物的买家大号除外），有可能这个号被淘宝列入黑名单，他再拍的东西有可能会被认为虚假交易，<span class="point">再刷会有降权风险</span>。</p>
              <p class="explain-content">4，若同一时间查询人数过多，请耐心等待结果。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Top from '@/components/Top.vue'
  import {Button} from 'iview'
  export default {
    name: "chapaiming-landing",
    components: {
      Top:Top,
      iButton:Button
    },
    methods: {
      toRegister() {
        this.$router.push({path: '/register/seller-register'});
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/css/mixin";
  .chapaiming-area {
    background: #F1F1F1;
    .content {
      width:1200px;
      margin:0 auto;
      overflow: hidden;
      .search-title {
        width:160px;
        height:38px;
        line-height: 38px;
        color:#fff;
        background: #29a7e1;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        margin-top: 60px;
        border-radius: 5px 5px 0 0 ;
      }
      .search-box {
        height:150px;
        border-top:1px solid #29a7e1;
        border-left:1px solid #ddd;
        border-bottom:1px solid #ddd;
        border-right:1px solid #ddd;
        background: #fff;
      }
      .search-area {
        text-align: center;
        margin-top:60px;
        .search-name {
          font-size: 18px;
          font-weight: 700;
          color:#6c6c6c
        }
        .search-input {
          width:600px;
          height:30px;
          line-height: 30px;
          border:1px solid #ddd;
          padding-left:10px;
        }
        .search-btn {
          display: inline-block;
          font-size: 13px;
          text-align: center;
          color:#fff;
          border-radius: 2px;
          background: #29a7e1;
          cursor: pointer;
          padding:6px 30px;
        }
      }
      .explain-box {
        width: 1200px;
        padding:20px;
        background: #fff;
        margin-top:30px;
        .explain-area {
          border:1px dashed #ddd;
          padding:20px;
          margin:auto;
        }
        .explain-title {
          font-size: 26px;
          font-weight: 700;
          color:#29a7e1;
          padding:10px;
        }
        .explain-point {
          font-size: 16px;
          font-weight: 700;
          color:#999;
        }
        .explain-content {
          font-size: 14px;
          line-height: 40px;
          color:#999;
        }
      }
    }
  }
</style>
