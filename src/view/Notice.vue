<template>
  <div class="pt-20 pb-20">
    <div class="container">
      <h2 class="main-color text-ct">{{userGetAnnouncement.title}}</h2>
      <div class="mt-10 cl999 public-time text-ct">发布时间：{{userGetAnnouncement.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
      <div class="pt-10 pb-10 fs-14 text-indent" v-html="userGetAnnouncement.content"></div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'

  export default {
    name: 'Notice',
    data() {
      return {
        userGetAnnouncement:{}
      }
    },
    created() {
      this.getUserGetAnnouncement();
    },
    computed: {},
    methods: {
      getUserGetAnnouncement(){
        let self = this;
        api.getUserGetAnnouncement({
          type:'all'
        }).then( res => {
          if (res && res.length>0){
            self.userGetAnnouncement = res[0];
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .public-time{
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
</style>
