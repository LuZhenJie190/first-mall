<template>
  <div>
    <div class="order-items" v-for="(o1, index) in orderList" :key="index">
      <div class="top">
        <div class="top-left">
          <h2>{{ o1.payStatus | status() }}</h2>
          <div class="context">
            <p>{{ o1.orderTime }}</p>
            <p>{{ o1.userName }}</p>
            <p>订单号：{{ o1.orderId }}</p>
            <p v-if="o1.payStatus != 0">
              在线支付（{{ o1.payWay | payway() }}快捷支付）
            </p>
            <p v-if="o1.payStatus != 1">未支付</p>
          </div>
        </div>
        <div class="top-right">
          <p v-show="o1.payStatus != 1">需付金额：</p>
          <p v-show="o1.payStatus != 0">实付金额：</p>

          <h2>{{ o1.orderPrice }}.00</h2>
          <p>元</p>
        </div>
      </div>
      <div class="bottom">
        <div class="products">
          <div class="product" v-for="(o2, index) in o1.orderParams" :key="index" @click="goProduct(o2.pid)">
            <img :src="o2.productImg" alt="" />
            <div class="p-title">
              <p>{{ o2.productTitle }}</p>
              <span></span>
              <p>{{ o2.productPrice }}元</p>
              <p>× {{ o2.productNumber }}</p>

            </div>
          </div>
        </div>
        <div class="operation">
          <button class="btn-order" v-if="o1.payStatus != 1" @click="pay(o1)">立即支付</button>
          <button class="btn-order" @click="goOrderDetail(o1)">订单详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductDetail } from "../../api/product"
export default {
  name: "OrderItem",
  props: ["orderList"],
  data() {
    return {
      modelShow: true,
    };
  },
  filters: {
    status(val) {
      if (val == 0) return "未支付";
      if (val == 1) return "已支付";
    },
    payway(val) {
      if (val == 0) return "微信";
      if (val == 1) return "支付宝";
    },
  },
  methods: {
    goOrderDetail(odata) {
      this.$router.push({
        name: "orderdetail",
        params: {
          odata: odata
        }
      })
    },
    pay(data) {
      this.$emit("openModel", this.modelShow, data);

    },
    goProduct(pid) {
      ProductDetail(pid).then((res) => {
        console.log(res);
        this.$router.push({
          name: "productinfo",
          params: { details: res.data[0] }
        })
      })
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

.order-items {
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 120px auto;
}

.top {
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 20px;
}

.top-left {
  display: grid;
  grid-template-rows: 30px 1fr;
  row-gap: 5px;
  align-items: center;
}

.top-left h2 {
  color: #757575;
}

.top-left p {
  padding: 5px 10px;
  border-right: 1px solid #ccc;
  height: 15px;
  line-height: 15px;
  margin-left: -5px;
}

.top-left p:last-child {
  border-right: none;
}

.top-right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  border: 1px solid #ccc;
  border-top: none;
  position: relative;
}

.products {
  display: flex;
  flex-direction: column;
}

.product {
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.product img {
  width: 80px;
  height: 80px;
}

.p-title {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 5px;
}

.p-title span {
  display: flex;
}

.p-title span p {
  margin-right: 5px;
}

.operation {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.btn-order {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #757575;
  width: 150px;
  height: 40px;
  align-self: flex-end;
  justify-self: flex-end;
  cursor: pointer;
  margin-top: 10px;
}
</style>