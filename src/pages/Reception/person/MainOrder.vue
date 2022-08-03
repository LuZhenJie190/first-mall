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
        <input type="text" placeholder="请输入手机号" v-model="search" />
        <button @click="searchOrder"><i class="el-icon-search"></i></button>
      </div>
    </div>
    <el-empty :image-size="200" v-if="orderList.length == 0"></el-empty>
    <div class="tab-content" v-if="orderList.length != 0">
      <div class="all animate__animated animate__fadeIn" v-show="currentIndex == 0">
        <order-item :orderList="orderList" @openModel="openModel"></order-item>
      </div>
      <div class="not-pay animate__animated animate__fadeIn" v-show="currentIndex == 1">
        <order-item :orderList="isPay" @openModel="openModel"></order-item>
      </div>

      <div class="is-pay animate__animated animate__fadeIn" v-show="currentIndex == 2">
        <order-item :orderList="noPay" @openModel="openModel"></order-item>
      </div>
    </div>

    <div class="model" v-show="modelShow">
      <div class="bg"></div>
      <div class="form">
        <h1>支付方式</h1>
        <i class="close el-icon-close" @click="closeModel"></i>
        <div class="pay-box">
          <ul>
            <li v-for="(item, index) in payList" :key="index" @click="pay(index)"
              :class="{ 'pay-active': current1 == index }">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </li>
          </ul>
          <button class="btn-pay1" @click="orderPay">确定</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { OrderGetParams, OrderGetParamsByPhone, OrderUpdate } from "../../../api/order";
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
      modelShow: false,
      payList: [
        { img: require("../../../assets/wx.png"), title: "微信" },
        { img: require("../../../assets/zfb.png"), title: "支付宝" },
      ],
      current1: -1,
      payType: "",
      orderData: ""
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

    orderPay() {
      if (this.payType == null) {
        this.$message({ type: "warning", message: "请选择支付方式" })
      } else {
        this.orderData.payWay = this.payType;
        this.orderData.payStatus = 1;
        OrderUpdate(this.orderData).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({ type: "success", message: "支付成功" })
            this.modelShow = false;
          }
        })
      }

    },
    payment() {
      this.modelShow = true
    },
    closeModel() {
      this.modelShow = false
    },
    pay(index) {
      this.current1 = index;
      this.payType = index
      console.log(this.payType);
    },
    openModel(val, data) {
      this.modelShow = val;
      this.orderData = data;
      console.log(this.orderData);
    }
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

.bg {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}

.form {
  background-color: #fff;
  width: 400px;
  height: 220px;
  z-index: 1001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  padding: 20px;
}

.form h1 {
  font-weight: 500;
  font-size: 20px;
  color: #757575;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: scale(1.8, 1.8);
  cursor: pointer;
}

.close:hover {
  color: red;
}

.pay-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pay-box ul {
  display: flex;
  width: 100%;
  padding: 30px 0;
  justify-content: space-around;
}

.pay-box li {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: 150px;
  line-height: 80px;
  justify-content: center;
  cursor: pointer;
}

.pay-box img {
  width: 40px;
  height: 40px;
  padding-right: 10px;
}

.btn-pay1 {
  border: none;
  outline: none;
  width: 150px;
  line-height: 40px;
  background: #be0f2d;
  color: #fff;
  cursor: pointer;
}

.pay-active {
  border: 1px solid #be0f2d !important;
}
</style>