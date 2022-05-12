<template>
  <div class="order-detail">
    <div class="top">
      <h1>订单详情</h1>
      <h2>订单号：{{ detailData.orderId }}</h2>
    </div>
    <div class="products">
      <ul>
        <li v-for="item in detailData.orderParams" :key="item.opid">
          <img :src="item.productImg" />
          <span>{{ item.productTitle }}</span>
          <span class="price">
            <p>{{ item.productPrice }}元</p>
            <p> × {{ item.productNumber }}</p>
          </span>
        </li>
      </ul>
    </div>
    <div class="context">
      <div class="userInfo">
        <h3>收货信息</h3>
        <ul>
          <li>
            <h4>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h4>
            <p>{{ detailData.userName }}</p>
          </li>
          <li>
            <h4>联系电话：</h4>
            <p>{{ detailData.userPhone }}</p>
          </li>
          <li>
            <h4>收货地址：</h4>
            <p>{{ address }}</p>
          </li>
        </ul>

      </div>
      <div class="pay">
        <h3>支付方式</h3>
        <ul>
          <li>
            <h4>支付方式：</h4>
            <p v-if="detailData.payStatus != 0">{{ detailData.payWay | way() }}</p>
          </li>
          <li>
            <h4>支付的手机号：</h4>
            <p v-if="detailData.payStatus != 0">{{ detailData.userPhone }}</p>
          </li>

        </ul>
      </div>
    </div>
    <div class="bottom">
      <ul class="left">
        <li>商品总价：</li>
        <li>运费：</li>
        <li v-if="detailData.payStatus != 0">实付金额：</li>
        <li v-if="detailData.payStatus == 0">应付金额：</li>

      </ul>
      <ul class="right">
        <li>{{ detailData.orderPrice }}.00元</li>
        <li>0 元</li>
        <li><span>{{ detailData.orderPrice }}.00元</span></li>
      </ul>
      <button v-if="detailData.payStatus == 0" class="btn-pay" @click="payment">支付</button>
    </div>

    <div class="model" v-show="modelShow">
      <div class="bg"></div>
      <div class="form">
        <h1>支付方式</h1>
        <i class="close el-icon-close" @click="closeModel"></i>
        <div class="pay-box">
          <ul>
            <li v-for="(item, index) in payList" :key="index" @click="pay(index)"
              :class="{ active: current1 == index }">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </li>
          </ul>
          <button class="btn-pay1" @click="isPay">确定</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { OrderUpdate } from "../../../api/index"
import AddressModel from '../../../components/Reception/AddressModel.vue';
export default {
  name: "orderDetail",
  data() {
    return {
      detailData: "",
      address: "",
      centerDialogVisible: true,
      modelShow: false,
      payList: [
        { img: require("../../../assets/wx.png"), title: "微信" },
        { img: require("../../../assets/zfb.png"), title: "支付宝" },
      ],
      current1: -1,
      payType: "",
    }
  },
  created() {

    this.saveInfo();
  },
  filters: {
    way(val) {
      if (val == 0) return "微信"
      if (val == 1) return "支付宝"
    }
  },

  methods: {
    saveInfo() {
      if (this.$route.params.odata != undefined) {
        localStorage.setItem("orderDetail", JSON.stringify(this.$route.params.odata));
      }
      let result = JSON.parse(localStorage.getItem("orderDetail"));
      this.detailData = result;
      this.address = `${this.detailData.province} ${this.detailData.city} ${this.detailData.area} ${this.detailData.userAddress}`


    },
    isPay() {
      if (this.payType == "") {
        this.$message({ type: "warning", message: "请选择支付方式" })
      } else {
        this.detailData.payWay = this.payType;
        this.detailData.payStatus = 1;
        OrderUpdate(this.detailData).then(res => {
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
    },

  }
}
</script>

<style scoped>
.top h1 {
  font-weight: 500;
  font-size: 30px;
  color: #757575;
}

.top h2 {
  font-size: 18px;
  font-weight: 500;
  padding: 20px 0;
}

.products li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.products span {
  width: 200px;
}

.price {
  display: flex;
  margin-left: 200px;
  align-items: center;
}

.products img {
  width: 80px;
  height: 80px;
  margin-right: 60px;
}

.context h3 {
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 15px;
}

.context h4 {
  color: #757575;
}

.context li {
  display: flex;
  padding-bottom: 10px;
}

.userInfo,
.pay {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}

.bottom {
  float: right;
  display: grid;
  grid-template-columns: 1fr auto;
  text-align: right;
  margin-top: 20px;
}

.bottom li {
  padding: 5px 0;
}

.bottom .right {
  color: #be0f2d;
}

.bottom .left li:last-child {
  padding-top: 20px;
}

.bottom span {
  font-size: 30px;
}

.btn-pay {
  border: none;
  outline: none;
  width: 150px;
  line-height: 40px;
  background: #be0f2d;
  position: relative;
  right: -140px;
  top: 20px;
  color: #fff;
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

.active {
  border: 1px solid #be0f2d !important;
}
</style>