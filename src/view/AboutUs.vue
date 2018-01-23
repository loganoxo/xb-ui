<template>
  <div class="about-us">
    <role-top></role-top>
    <div class="container pos-rel title" style="min-width: 1200px" >
      <h1 >Contect</h1>
      <p class="mt-40">我们真诚期待您的宝贵意见，并给予您最好的支持和服务！</p>
      <div class="mt-20 clear">
        <img width="50%" src="~assets/img/about-us/address.png" alt="" class="left">
        <div class="left pl-60 my-address">
          <p class="fs-18"><strong>杭州拿手科技有限公司</strong></p>
          <p class="mt-20">浙江省杭州市江干区笕丁路168号大世界五金城32幢401室295</p>
          <p class="mt-20">联系方式：0571-26894144</p>
          <iButton type="success" class="mt-20 button" @click="register">立即注册</iButton>
        </div>
      </div>
    </div>
    <div class="container content" style="min-width: 1200px">
      <h2>关于我们</h2>
      <p class="mt-20">杭州拿手科技有限公司坐落于中国电子商务之都-杭州，自公司之初，就专注于电商领域，致力于为广大卖家提供专业、高效的软件和数据服务，
        帮助卖家更好的管理和运营自己的店铺。经过多年的行业积累和技术沉淀，公司已经成为了整体服务对象超过100万，员工逾200人的电商服务企业。</p>
      <p class="mt-15">白拿拿是杭州拿手科技有限公司旗下运营的网站，其着重于帮助卖家提高权重以及促进转化，通过精准化的人群标签以及从点击浏览，到收藏加购，再到下单转化，
        最终加上买家秀的一站式全链路过程，帮助卖家迅速提高排名，促进转化率的提升。迄今为止，白拿拿已经获得了数万卖家的信任和喜爱，成为了卖家在日常店铺中必不可少的高效工具。</p>
    </div>
  </div>
</template>
<script>

  import RoleTop from '@/components/RoleTop.vue'
  import Button from 'iview/src/components/button'
  export default {
    name: 'AboutUs',
    components: {
      RoleTop: RoleTop,
      iButton : Button
    },
    data() {
      //表单验证

      return {}
    },
    created() {

    },
    methods: {
      register(){
        this.$router.push({name:'SelRole'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .about-us{
    text-align: left;
    .title{
      padding: 40px 20px;
      border-bottom: 1px solid #eee;
      h1{
        position: absolute;
        left: 20px;
      }
      .my-address{
        padding-top: 50px;
      }
      .button{
        width: 220px;
        background-color: #FF6600;
        border: none;
        height: 40px;
        font-size: 18px;
      }
    }
    .content{
      padding: 20px;
      p{
        line-height: 26px;
        text-indent: 2em;
      }
    }
  }

</style>

