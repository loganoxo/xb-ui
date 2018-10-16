<template>
  <div class="pd-tb-20">
    <p class="page-title">我的商品管理</p>
    <img src="~assets/img/good-release/good-list.png" alt="" class="mt-20 mb-20">
    <div class="mb-20 clear">
      <Page :total="total" :current="pageIndex" :page-size="pageSize" @on-change="currentChange" class="right inline-block" />
      <Button type="primary" @click="$router.push('/user/release-good')">发布新的商品</Button>
    </div>
    <div class="list">
      <Table :loading="loading" stripe :columns="columns" :data="data" no-data-text="当前仍未发布商品，赶紧发布商品卖货吧！"></Table>
    </div>
  </div>
</template>

<script>
  import { Table, Page, Button } from 'iview';
  import api from '@/config/apiConfig';
  export default {
    name: "GoodManagement",
    components: {
      Table,
      Page,
      Button
    },
    data() {
      function renderHandler(h, params) {
        let [eles, price, payment1, payment2] = [[], params.row.itemFirstPrice/100, params.row.itemDay1Price/100, params.row.itemDay2Price/100];
        eles.push(h('p', {}, `评测保证金： ${price}元`));
        eles.push(h('p', {}, `评测保证金${price}+试7天尾款${payment1}=${price + payment1}`));
        eles.push(h('p', {}, `评测保证金${price}+试14天尾款${payment2}=${price + payment2}`));
        return eles;
      }
      function stateFilter(status) {
        let [text, color] = ['', '#515a6e'];
        switch (status) {
          case 'waiting_commit': text = '等待提交';break;
          case 'waiting_pay': text = '待付款';break;
          case 'waiting_audit': text = '待审核';break;
          case 'waiting_modify': text = '待修改';break;
          case 'under_way': text = '进行中';color = "green";break;
          case 'finished': text = '已结束';color = '#f9284f';break;
          case 'closed': text = '已关闭';color = '#f9284f';break;
          case 'deleted': text = '已删除';color = '#f9284f';break;
          default: text = '审核未通过';color = '#f9284f';break;
        }
        return {
          text,
          color
        }
      }
      function renderUrl(h, params) {
        let [itemUrl, id] = [params.row.itemUrl, null];
        let index = itemUrl.indexOf('?') + 1;
        if (index > 0) {
          let datas = itemUrl.substring(index);
          datas = datas.split('&');
          for (let i = 0; i<datas.length; i++) {
            if (datas[i].split('=')[0] == 'id') {
              id = datas[i].substring(datas[i].indexOf('=') + 1);
              break;
            }
          }
        }
        if (!id) {
          return {
            props: {},
            text: '--'
          }
        } else {
          return {
            props: {
              domProps: {
                href: itemUrl,
                target: '_blank'
              }
            },
            text: id
          }
        }
      }

      return {
        columns: [
          {
            title: '商品编号',
            key: 'number',
            sortable: true,
            width: 280,
            align: 'center'
          },
          {
            title: '宝贝ID',
            key: 'id',
            width: 160,
            align: 'center',
            sortable: true,
            render: (h, params) => {
              let result = renderUrl(h, params);
              return h('a', result.props, result.text);
            }
          },
          {
            title: '商品状态',
            key: 'taskStatus',
            align: 'center',
            width: 140,
            sortable: true,
            render: (h, params) => {
              let data = stateFilter(params.row.taskStatus);
              return h('span', {
                style: {
                  color: data.color
                }
              }, data.text)
            }
          },
          {
            title: '商品价格',
            key: 'itemFirstPrice',
            align: 'center',
            render: (h, params) => {
              return h('div',{
                style: {
                  padding: '8px 0'
                }
              }, renderHandler(h, params));
            }
          },
          {
            title: '库存',
            key: 'taskCount',
            align: 'center',
            width: 140,
            sortable: true
          }
        ],
        data: [

        ],
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        loading: false
      }
    },
    methods: {
      currentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getGoodList();
      },
      getGoodList() {
        this.loading = true;
        api.getGoodList({
          pageIndex: this.pageIndex
        }).then(res => {
          this.loading = false;
          if (res.status) {
            this.total = res.data.totalElements;
            this.data = res.data.content;
          } else {
            this.$Message.error(res.msg);
          }
        })
      }
    },
    created() {
      this.getGoodList();
    }
  }
</script>

<style scoped lang="scss">
  .page-title {
    color: #fd6b22;
    font-size: 20px;
    font-weight: bold;
  }
  .red {
    color: #f9284f;
  }
  .list {
    border-top: solid 4px #f9284f;
  }
  .bg {
    background: #feeaec !important;
  }
</style>
