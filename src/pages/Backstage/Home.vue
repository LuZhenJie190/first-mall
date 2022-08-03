<template>
  <div>
    <div class="h-cards">
      <el-card shadow="always" v-for="item in cards" :key="item.id">
        <div class="h-cards-left">
          <div class="h-bg">
            <img :src="item.url" alt="" />
          </div>
        </div>
        <div class="h-cards-right">
          <h1>Total {{ item.title }}</h1>
          <p>{{ item.num }}</p>
        </div>
      </el-card>
    </div>
    <div class="echarts">
      <div ref="ech1" class="ech1"></div>
      <div ref="ech2" class="ech1"></div>
    </div>
  </div>
</template>

<script>
import {
  UsergetAll
} from "../../api/user";
import {

  ProductgetAll

} from "../../api/product";
import {
  OrderGetAll
} from "../../api/order";
//全部引入
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          id: "0",
          url: require("../../assets/user.png"),
          title: "users",
          num: 0,
        },
        {
          id: "1",
          url: require("../../assets/product.png"),
          title: "products",
          num: 0,
        },
        {
          id: "2",
          url: require("../../assets/order.png"),
          title: "orders",
          num: 0,
        },
      ],
    };
  },
  mounted() {
    this.barChart();
    this.Notice();


  },
  methods: {
    Notice() {
      this.$alert('购物车管理、订单管理模块尚未开发完毕', '公告', {
        confirmButtonText: '确定',
      });
    },
    barChart() {
      Promise.all([UsergetAll(), ProductgetAll({ pageNum: 1, pageSize: 100 }), OrderGetAll()]).then(res => {
        let arr = res.map(item => item.data.total);
        this.cards[0].num = arr[0];
        this.cards[1].num = arr[1];
        this.cards[2].num = arr[2];
        // 柱图
        const barOption = {
          title: {
            text: '统计'
          },
          tooltip: {},
          legend: {
            data: ['总数量']
          },
          xAxis: {
            data: ['用户', '商品', '订单']
          },
          yAxis: {},
          color: ["#005AB5"],
          series: [
            {
              name: '数量',
              type: 'bar',
              data: arr
            }
          ]
        };
        const barChart = echarts.init(this.$refs.ech1);
        barChart.setOption(barOption);

        // 饼图
        let phone = res[1].data.list.filter(e => e.categoryId == 1001)
        let nb = res[1].data.list.filter(e => e.categoryId == 1002)
        let tv = res[1].data.list.filter(e => e.categoryId == 1003)
        let watch = res[1].data.list.filter(e => e.categoryId == 1004)
        const pArr = [{ value: phone.length, name: '手机' }, { value: nb.length, name: '笔记本' }, { value: tv.length, name: '电视' }, { value: watch.length, name: '智能穿戴' },]
        const pieOption = {
          series: [
            {
              type: 'pie',
              data: pArr
            }
          ]
        }
        const pieChart = echarts.init(this.$refs.ech2);
        pieChart.setOption(pieOption);
      })



    }
  }
  // created() {
  //   this.getUser();
  //   this.getOrder();
  //   this.getProduct();
  // },

  // methods: {
  //   getUser() {
  //     UsergetAll(this.pageN, this.pageS).then(res => {
  //       this.usersTotal = res.data.total
  //     })
  //   },
  //   getProduct() {
  //     ProductgetAll(this.pageN, this.pageS).then(res => {
  //       this.pTotal = res.data.total;
  //       this.cards[1].num = this.pTotal
  //       let phone = res.data.list.filter(e => { if (e.categoryId == 1001) return e; })
  //       let nb = res.data.list.filter(e => { if (e.categoryId == 1002) return e; })
  //       let tv = res.data.list.filter(e => { if (e.categoryId == 1003) return e; })
  //       let watch = res.data.list.filter(e => { if (e.categoryId == 1004) return e; })
  //       this.product.phone = phone.length;
  //       this.product.notebook = nb.length;
  //       this.product.tv = tv.length;
  //       this.product.watch = watch.length;
  //     })
  //   },
  //   getOrder() {
  //     OrderGetAll(this.pageN, this.pageS).then(res => {
  //       console.log(res);
  //       this.oTotal = res.data.total;
  //       this.cards[2].num = this.oTotal
  //     })
  //   },
  //   initCharts() {
  //     this.chart = echarts.init(this.$refs.ech);
  //     this.chart1 = echarts.init(this.$refs.ech2);
  //     this.setOptions();
  //   },
  //   setOptions() {
  //     UsergetAll().then((res) => {
  //       console.log(res);
  //       this.usersTotal = res.data.total;
  //       this.cards[0].num = res.data.total;
  //       // console.log(this.pTotal);
  //       this.chart.setOption({
  //         itemStyle: {
  //           color: '#002FA7',
  //           opacity: "0.9",
  //           barBorderRadius: 3
  //         },
  //         title: {
  //           text: "数据统计",
  //         },
  //         tooltip: {},
  //         xAxis: {
  //           data: ["用户", "商品", "订单"],
  //         },
  //         yAxis: {},
  //         series: [
  //           {
  //             name: "数量",
  //             type: "bar",
  //             data: [this.usersTotal, this.pTotal, this.oTotal],
  //           },
  //         ],
  //       });
  //       this.chart1.setOption({
  //         series: [
  //           {
  //             type: "pie",
  //             data: [
  //               {
  //                 value: this.product.phone,
  //                 name: "手机",
  //               },
  //               {
  //                 value: this.product.notebook,
  //                 name: "笔记本",
  //               },
  //               {
  //                 value: this.product.tv,
  //                 name: "电视",
  //               },

  //               {
  //                 value: this.product.watch,
  //                 name: "手环",
  //               },
  //             ],
  //           },
  //         ],
  //       });
  //     });
  //   },
  // },
};
</script>

<style>
.ech1 {
  width: 500px;
  height: 410px;
  position: relative;
  top: 50px;
}

.h-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.h-cards .el-card__body {
  width: 250px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.h-cards img {
  width: 60px;
  height: 60px;
  margin: 5px;
}

.h-cards-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.h-cards-right h1 {
  position: relative;
  top: -10px;
  margin: 5px;
}

.h-cards-right p {
  font-size: 24px;
  font-weight: 600;
  color: #757575;
}

.echarts {
  display: flex;
  justify-content: space-around;
}
</style>