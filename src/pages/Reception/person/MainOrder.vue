<template>
  <div class="main-order">
    <h1 class="title">我的订单</h1>
    <div class="tab-list">
      <div class="left">
        <ul>
          <li v-for="(item, index) in tabList" :key="item.id" @mousedown="change(index)">
            <a :class="{ active: currentIndex == index }">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <input type="text" placeholder="请输入商品名称/订单号" v-model="search" />
        <button @click="searchOrder"><i class="el-icon-search"></i></button>
      </div>
    </div>
    <el-empty :image-size="200" v-if="orderList.length == 0"></el-empty>
    <div class="tab-content" v-if="orderList.length != 0">
      <div class="all animate__animated animate__fadeIn" v-show="currentIndex == 0">
        <order-item :orderList="orderList"></order-item>
      </div>
      <div class="not-pay animate__animated animate__fadeIn" v-show="currentIndex == 1">
        <order-item :orderList="isPay"></order-item>
      </div>

      <div class="is-pay animate__animated animate__fadeIn" v-show="currentIndex == 2">
        <order-item :orderList="noPay"></order-item>
      </div>
    </div>
  </div>
</template>

<script>
import { OrderGetParams, OrderGetParamsByPhone } from "../../../api/index";
import OrderItem from "../../../components/Reception/OrderItem.vue";
export default {
  name: "MainOrder",
  components: { OrderItem },
  data() {
    return {
      tabList: [
        { id: 0, title: "全部订单" },
        { id: 1, title: "已支付" },
        { id: 2, title: "待支付" },
      ],
      currentIndex: 0,
      orderList: [],
      isPay: [],
      noPay: [],
      search: "",
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      OrderGetParams(localStorage.getItem("uid")).then((res) => {
        res.data.forEach((element) => {
          element.payStatus == 1 ? this.isPay.push(element) : [];
          element.payStatus == 0 ? this.noPay.push(element) : [];
        });
        this.orderList = res.data;
        this.orderList.reverse();
      });
    },
    searchOrder() {
      if (this.search == "") {
        this.getOrder();
      }
      OrderGetParamsByPhone(this.search).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.isPay = res.data.filter(e => {
            if (e.payStatus == 1) {
              return e;
            }
          });
          this.noPay = res.data.filter(e => {
            if (e.payStatus == 0) {
              return e;
            }
          });
        }
        console.log(this.isPay, this.noPay);
        this.orderList = res.data;
      })
    },
    change(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.context {
  display: flex;
  width: 500px;
  flex-wrap: wrap;
}

.active {
  color: #be0f2d !important;
  transition: 0.3s;
}

.title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  color: #757575;
}

.tab-list {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left ul {
  display: flex;
}

.left li {
  border-right: 1px solid #eee;
  padding-right: 15px;
  height: 15px;
  display: flex;
  align-items: center;
}

.left li:not(:first-child) {
  padding-left: 15px;
}

.left li a {
  font-size: 16px;
  color: #757575;
}

.right input {
  border: 1px solid #ccc;
  outline: none;
  width: 250px;
  height: 42px;
  box-sizing: border-box;
  border-right: none;
  padding: 5px 10px;
  font-size: 12px;
}

.right button {
  border: 1px solid #ccc;
  background-color: transparent;
  width: 42px;
  height: 42px;
  cursor: pointer;
}
</style>