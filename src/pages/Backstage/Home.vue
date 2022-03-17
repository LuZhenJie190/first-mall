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
  UserInfoListFindAll,
  ProductInfoFindAll,
  OrderFindAll,
} from "../../api/index";
//全部引入
const echarts = require("echarts");
export default {
  name: "Home",
  data() {
    return {
      cc: [],
      pageN: 1,
      pageS: 1000,
      allData: [],
      usersTotal: "",
      pTotal: "",
      oTotal: "",
      product: {
        phone: "",
        notebook: "",
        tv: "",
        watch: "",
      },
      pnum: "",
      cards: [
        {
          id: "0",
          url: require("../../assets/user.png"),
          title: "users",
          num: "",
        },
        {
          id: "1",
          url: require("../../assets/product.png"),
          title: "products",
          num: "",
        },
        {
          id: "2",
          url: require("../../assets/order.png"),
          title: "orders",
          num: "",
        },
      ],
    };
  },
  mounted() {
    ProductInfoFindAll(this.pageN, this.pageS).then((res) => {
      this.allData = res.list;
      this.pnum = this.allData.map((obj) => {
        return obj.ptype;
      });
      let str = this.pnum.join("");
      // console.log(str);
      // 手机，笔记本，电视，手环  各个总数
      this.product.phone = str.split("0").length - 1;
      this.product.notebook = str.split("1").length - 1;
      this.product.tv = str.split("2").length - 1;
      this.product.watch = str.split("3").length - 1;

      this.pTotal = res.total;
      this.cards[1].num = res.total;
    });
    OrderFindAll(this.pageN, this.pageS).then((res) => {
      // console.log(res);
      this.oTotal = res.total;
      this.cards[2].num = res.total;
    });
    this.initCharts();
  },

  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.ech);
      this.chart1 = echarts.init(this.$refs.ech2);

      this.setOptions();
    },
    setOptions() {
      UserInfoListFindAll(this.pageN, this.pageS).then((res) => {
        this.usersTotal = res.total;
        this.cards[0].num = res.total;
        // console.log(this.pTotal);
        this.chart.setOption({
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
.echarts {
  display: flex;
  justify-content: space-around;
}
</style>