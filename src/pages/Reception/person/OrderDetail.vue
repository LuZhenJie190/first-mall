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
            <p>{{ detailData.payWay | way() }}</p>
          </li>
          <li>
            <h4>支付的手机号：</h4>
            <p>{{ detailData.userPhone }}</p>
          </li>

        </ul>
      </div>
    </div>
    <div class="bottom">
      <ul class="left">
        <li>商品总价：</li>
        <li>运费：</li>
        <li>实付金额：</li>
      </ul>
      <ul class="right">
        <li>{{ detailData.orderPrice }}.00元</li>
        <li>0 元</li>
        <li><span>{{ detailData.orderPrice }}.00元</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data() {
    return {
      detailData: "",
      address: "",
    }
  },
  created() {
    this.detailData = this.$route.params.odata;
    this.address = `${this.detailData.province} ${this.detailData.city} ${this.detailData.area} ${this.detailData.userAddress}`
    console.log(this.detailData);
  },
  filters: {
    way(val) {
      if (val == 0) return "微信"
      if (val == 1) return "支付宝"
    }
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
</style>