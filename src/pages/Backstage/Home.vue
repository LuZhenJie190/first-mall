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
      <div ref="ech" class="ech1"></div>
      <div ref="ech2" class="ech1"></div>
    </div>
  </div>
</template>

<script>
import {
  UsergetAll,
  ProductgetAll,
  OrderGetAll
} from "../../api/index";
//全部引入
const echarts = require("echarts");
export default {
  name: "Home",
  data() {
    return {
      pageN: 1,
      pageS: 1000,
      usersTotal: "",
      pTotal: "",
      oTotal: "",
      product: {
        phone: "",
        notebook: "",
        tv: "",
        watch: "",
      },
      cards: [
        {
          id: "0",
          url: require("../../assets/user.png"),
          title: "users",
          num: this.usersTotal,
        },
        {
          id: "1",
          url: require("../../assets/product.png"),
          title: "products",
          num: this.pTotal,
        },
        {
          id: "2",
          url: require("../../assets/order.png"),
          title: "orders",
          num: this.oTotal,
        },
      ],
    };
  },
  mounted() {
    this.initCharts();
  },
  created() {
    this.getUser();
    this.getOrder();
    this.getProduct();
  },

  methods: {
    getUser() {
      UsergetAll(this.pageN, this.pageS).then(res => {
        this.usersTotal = res.data.total
      })
    },
    getProduct() {
      ProductgetAll(this.pageN, this.pageS).then(res => {
        this.pTotal = res.data.total;
        this.cards[1].num = this.pTotal
        let phone = res.data.list.filter(e => { if (e.categoryId == 1001) return e; })
        let nb = res.data.list.filter(e => { if (e.categoryId == 1002) return e; })
        let tv = res.data.list.filter(e => { if (e.categoryId == 1003) return e; })
        let watch = res.data.list.filter(e => { if (e.categoryId == 1004) return e; })
        this.product.phone = phone.length;
        this.product.notebook = nb.length;
        this.product.tv = tv.length;
        this.product.watch = watch.length;
      })
    },
    getOrder() {
      OrderGetAll(this.pageN, this.pageS).then(res => {
        console.log(res);
        this.oTotal = res.data.total;
        this.cards[2].num = this.oTotal
      })
    },
    initCharts() {
      this.chart = echarts.init(this.$refs.ech);
      this.chart1 = echarts.init(this.$refs.ech2);
      this.setOptions();
    },
    setOptions() {
      UsergetAll(this.pageN, this.pageS).then((res) => {
        this.usersTotal = res.data.total;
        this.cards[0].num = res.data.total;
        // console.log(this.pTotal);
        this.chart.setOption({
          itemStyle: {
            color: '#002FA7',
            opacity: "0.9",
            barBorderRadius: 3
          },
          title: {
            text: "数据统计",
          },
          tooltip: {},
          xAxis: {
            data: ["用户", "商品", "订单"],
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "bar",
              data: [this.usersTotal, this.pTotal, this.oTotal],
            },
          ],
        });
        this.chart1.setOption({
          series: [
            {
              type: "pie",
              data: [
                {
                  value: this.product.phone,
                  name: "手机",
                },
                {
                  value: this.product.notebook,
                  name: "笔记本",
                },
                {
                  value: this.product.tv,
                  name: "电视",
                },

                {
                  value: this.product.watch,
                  name: "手环",
                },
              ],
            },
          ],
        });
      });
    },
  },
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