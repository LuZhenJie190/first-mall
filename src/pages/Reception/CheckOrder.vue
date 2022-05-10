<template>
  <div class="check-order">
    <cart-header></cart-header>
    <!-- <el-skeleton :loading="loading" :rows="6" animated /> -->
    <div class="wrap">
      <div class="address">
        <h2>收货地址</h2>
        <div class="items">
          <div class="item" v-for="(item, index) in addressList" :key="item.uaId" v-show="addressList.leght != 0"
            @click="addressChange(index, item)" :class="{ active: current == index }">
            <h3>{{ item.userName }}</h3>
            <p>{{ item.userPhone }}</p>
            <p>{{ item.uProvince }} {{ item.uCity }} {{ item.uArea }}</p>
            <p>{{ item.uAddress }}</p>
            <a class="update" @click="updateAddress(item)">修改</a>
            <i class="el-icon-close remove" @click="removeAddress(item.uaId)"></i>
          </div>
          <div class="item" @click="openModel">
            <div class="context">
              <i class="el-icon-circle-plus"></i>
              <p>添加新地址</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-list">
        <h2>商品</h2>
        <ul>
          <li v-for="(item, index) in productList" :key="index">
            <img :src="item.productImg" alt="" srcset="" />
            <div class="title">
              <span>{{ item.productTitle }}</span>
            </div>

            <div class="price">
              <span>{{ item.productPrice }}元 × {{ item.productNumber }}</span>
              <span style="color: #be0f2d">{{ item.total }}元</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="distribution">
        <h2>配送方式</h2>
        <p>包邮</p>
      </div>
      <div class="pay-type">
        <h2>支付方式</h2>
        <ul>
          <li v-for="(item, index) in payList" :key="index" @click="pay(index)" :class="{ active: current1 == index }">
            <img :src="item.img" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <div class="total-info">
        <h2>发票</h2>
        <div class="right">
          <ul class="key">
            <li>商品件数：</li>
            <li>商品总价：</li>
            <li>运费：</li>
            <li style="margin-top: 20px">应付总额：</li>
          </ul>
          <ul class="value">
            <li>{{ allNumber }} 件</li>
            <li>{{ allTotal }} 元</li>
            <li>0 元</li>
            <li style="margin-top: 20px; display: flex">
              <h1>{{ allTotal }}</h1>
              元
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <div class="btns">
          <button class="btn-cart" @click="goCart">返回购物车</button>
          <button class="btn-pay" @click="payment">支付</button>
        </div>
      </div>
    </div>
    <!-- 修改模态框 -->
    <transition enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <address-model v-if="modelShow" @mShow="closeModel" :addressData="addressData">
      </address-model>
    </transition>
  </div>
</template>

<script>

import CartHeader from "../../components/Reception/CartHeader.vue";
import { getnowDate } from "../../utils/index.js";
import {
  AddressById,
  AddressInsert,
  AddressUpdate,
  AddressDelete,
  OrderParamsInsertBatch,
  OrderInsert,
  CartDatchDelete
} from "../../api/index";
import AddressModel from "../../components/Reception/AddressModel.vue";
export default {
  components: { CartHeader, AddressModel },
  name: "CheckOrder",
  data() {

    return {
      addressData: "",
      productList: [],
      addressList: [],
      modelShow: false,
      modelShow1: false,
      address: "",
      current: -1,
      current1: -1,

      addForm: {
        userId: localStorage.getItem("uid"),
        userName: "",
        userPhone: "",
        uAddress: "",
        uProvince: "",
        uCity: "",
        uArea: "",
        selected: [],
      },
      payList: [
        { img: require("../../assets/wx.png"), title: "微信" },
        { img: require("../../assets/zfb.png"), title: "支付宝" },
      ],
      orderInfo: {
        orderId: "",
        userId: localStorage.getItem("uid"),
        payWay: "",
        payStatus: 0,
        orderTime: "",
        userName: "",
        userPhone: "",
        userAddress: "",
        province: "",
        city: "",
        area: "",
        orderPrice: "",
      },
      cids: ""
    };
  },
  created() {
    this.orderInfo.orderId = this.idRandom;
    this.productList = this.$route.params.cart;
    this.productList.forEach((e) => {
      e["orderId"] = this.orderInfo.orderId;
      this.cids += e.cid + ",";
    });
    this.getAddressList();
    // 随机生成订单号

    // this.orderParams.orderId =  this.orderInfo.orderId;
  },

  computed: {
    // 随机数
    idRandom() {
      let result = Math.floor(Math.random() * 1000000000);
      return result;
    },
    data() {
      return pcaa;
    },
    //   总价
    allTotal: function () {
      let sum = 0;
      this.productList.forEach((e) => {
        sum += e.total;
      });
      return sum;
    },
    allNumber() {
      let result = 0;
      this.productList.forEach((e) => {
        result += e.productNumber;
      });
      return result;
    },
  },
  methods: {
    addressAdd(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm);
          AddressInsert(this.addForm).then(res => {
            console.log(res);
            this.modelShow1 = false;
          })
        } else {

          return false;
        }
      });



    },
    payment() {
      if (this.orderInfo.userAddress == "") {
        this.$alert("请选择地址");
      } else if (this.orderInfo.payWay == null) {
        console.log(this.orderInfo);
        this.$alert("请选择支付方式");
      } else {
        this.orderInfo.orderTime = getnowDate();
        this.orderInfo.orderPrice = this.allTotal;
        // 删除购物车
        CartDatchDelete(this.cids)
        // 添加订单商品参数
        OrderParamsInsertBatch(this.productList)
        this.$confirm("确定支付吗", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.orderInfo.payStatus = 1;
            OrderInsert(this.orderInfo).then((res) => {
              if ((res.code = 200)) {
                this.$message({
                  type: "success",
                  message: "支付成功!",
                });
                setTimeout(() => {
                  this.$router.replace({ path: "/PersonalMenu/MainOrder" });
                }, 500);
              }
            });
          })
          .catch(() => {
            this.orderInfo.payWay = null;
            OrderInsert(this.orderInfo).then((res) => {
              console.log(res);
              this.$router.replace({ path: "/PersonalMenu/MainOrder" });
            });
          });
      }
    },
    addressChange(index, val) {
      this.current = index;
      this.orderInfo.userName = val.userName;
      this.orderInfo.userPhone = val.userPhone;
      this.orderInfo.province = val.uProvince;
      this.orderInfo.city = val.uCity;
      this.orderInfo.area = val.uArea;
      this.orderInfo.userAddress = val.uAddress;
      console.log(val);
    },
    pay(index) {
      console.log(index);
      this.current1 = index;
      this.orderInfo.payWay = index;
    },
    getAddressList() {
      AddressById(this.productList[0].userId).then((res) => {
        this.addressList = res.data;
      });
    },
    openModel() {
      this.modelShow = true;
      this.addressData = this.addForm;

    },
    closeModel(val) {
      this.modelShow = val;
      this.getAddressList();
    },
    addressSelect(val) {
      this.current2 = val;
    },
    removeAddress(id) {
      AddressDelete(id).then((res) => {
        if ((res.code = 200)) {
          this.getAddressList();
        }
      });
    },
    addressUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddressUpdate(this.form).then((res) => {
            if ((res.code = 200)) {
              this.getAddressList();
              this.modelShow = false;
            }
          });
        } else {
          return false;
        }
      });


    },
    updateAddress(val) {
      this.addressData = val;
      this.modelShow = true;
      console.log(this.from);
    },
    goCart() {
      this.$router.push({ path: "/ShoppingCart" });
    },
  },
};
</script>

<style scoped>
.active {
  border: 1px solid #be0f2d !important;
  transition: 0.2s;
}


.check-order {}

.wrap {
  width: 1200px;
  background-color: #fff;
  position: relative;
  top: 30px;
  margin: auto;
  padding: 20px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.item {
  width: 240px;
  height: 160px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  padding: 20px;
}

.item .remove {
  transform: scale(1.3, 1.3);
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ccc;
}

.item .remove:hover {
  color: #be0f2d;
}

.item h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
}

.item p {
  color: #757575;
  margin-bottom: 5px;
}

.update {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #be0f2d;
}

.context {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  color: #ccc;
  cursor: pointer;
}

.context i {
  transform: scale(2, 2);
  margin: 8px;
}

.item:hover {
  border: 1px solid gray;
  transition: 0.5s;
}

.item:hover .context {
  color: gray;
  transition: 0.5s;
}

.product-list,
.address,
.distribution,
.total-info,
.pay-type {
  border-bottom: 1px solid #ccc;
}

.product-list h2,
.address h2,
.distribution h2,
.total-info h2,
.pay-type h2 {
  margin: 20px 0;
  font-weight: 500;
}

.pay-type ul {
  display: flex;
  margin-bottom: 20px;
}

.pay-type li {
  display: flex;
  width: 120px;
  margin-right: 50px;
  border: 1px solid #ccc;
  justify-content: center;
  padding: 5px 10px;
  cursor: pointer;
}

.pay-type img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.pay-type p {
  font-size: 18px;
}

.product-list li {
  display: grid;
  grid-template-columns: 80px 2fr 1fr;
  align-items: center;
  margin-bottom: 10px;
}

.product-list li img {
  width: 50px;
  height: 50px;
}

.price {
  display: flex;
}

.price span {
  display: block;
  width: 200px;
}

.distribution {
  display: flex;
  align-items: center;
}

.distribution p {
  margin-left: 150px;
  color: #be0f2d;
}

.total-info {
  height: 160px;
}

.right {
  float: right;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}

.right li {
  text-align: right;
  margin-bottom: 5px;
}

.value li {
  color: #be0f2d;
}

.value li h1 {
  line-height: 15px;
  margin-right: 5px;
  font-weight: normal;
  font-size: 30px;
}

.bottom {
  height: 50px;
}

.btns {
  margin-top: 15px;
  float: right;
}

.btn-cart,
.btn-pay {
  border: none;
  outline: none;
  width: 150px;
  line-height: 40px;
  background: #be0f2d;
  margin-left: 40px;
  color: #fff;
  cursor: pointer;
}

.btn-cart {
  background: #fff;
  color: gray;
  border: 1px solid #ccc;
}
</style>
