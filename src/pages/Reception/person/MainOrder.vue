<template>
  <div class="main-order">
    <h1 class="title">我的订单</h1>
    <div class="tab-list">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in tabList"
            :key="item.id"
            @mousedown="change(index)"
          >
            <a :class="{ active: currentIndex == index }">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <input type="text" placeholder="请输入商品名称/订单号" />
        <button><i class="el-icon-search"></i></button>
      </div>
    </div>
    <div class="tab-content">
      <div
        class="all animate__animated animate__fadeIn"
        v-show="currentIndex == 0"
      >
        <div class="order-items">
          <div class="top">
            <div class="top-left">
              <h2>已支付</h2>
              <div class="context">
                <p>2019年05月28日 21:13</p>
                <p>卢圳杰</p>
                <p>订单号：5190528594016472</p>
                <p>在线支付（支付宝快捷支付）</p>
              </div>
            </div>
            <div class="top-right">
              <p>实付金额：</p>
              <h2>2018.00</h2>
              <p>元</p>
            </div>
          </div>
          <div class="bottom">
            <div class="product">
              <img src="../../../assets/logo.png" alt="" />
              <div class="p-title">
                <p>Redmi K20 Pro 8GB+128GB 冰川蓝</p>
                <span
                  ><p>2799元</p>
                  <p>× 1</p></span
                >
              </div>
            </div>
            <button class="btn-order">订单详情</button>
          </div>
        </div>
      </div>
      <div
        class="not-pay animate__animated animate__fadeIn"
        v-show="currentIndex == 1"
      >
        <div class="order-items">
          <div class="top">
            <div class="top-left">
              <h2>未支付</h2>
              <div class="context">
                <p>2019年05月28日 21:13</p>
                <p>卢圳杰</p>
                <p>订单号：5190528594016472</p>
                <p>在线支付（支付宝快捷支付）</p>
              </div>
            </div>
            <div class="top-right">
              <p>实付金额：</p>
              <h2>2018.00</h2>
              <p>元</p>
            </div>
          </div>
          <div class="bottom">
            <div class="product">
              <img src="../../../assets/logo.png" alt="" />
              <div class="p-title">
                <p>Redmi K20 Pro 8GB+128GB 冰川蓝</p>
                <span
                  ><p>2799元</p>
                  <p>× 1</p></span
                >
              </div>
            </div>
            <button class="btn-order">订单详情</button>
          </div>
        </div>
      </div>

      <div
        class="is-pay animate__animated animate__fadeIn"
        v-show="currentIndex == 2"
      >
        <div class="order-items">
          <div class="top">
            <div class="top-left">
              <h2>已支付</h2>
              <div class="context">
                <p>2019年05月28日 21:13</p>
                <p>卢圳杰</p>
                <p>订单号：5190528594016472</p>
                <p>在线支付（支付宝快捷支付）</p>
              </div>
            </div>
            <div class="top-right">
              <p>实付金额：</p>
              <h2>2018.00</h2>
              <p>元</p>
            </div>
          </div>
          <div class="bottom">
            <div class="product">
              <img src="../../../assets/logo.png" alt="" />
              <div class="p-title">
                <p>Redmi K20 Pro 8GB+128GB 冰川蓝</p>
                <span
                  ><p>2799元</p>
                  <p>× 1</p></span
                >
              </div>
            </div>
            <button class="btn-order">订单详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainOrder",
  data() {
    return {
      tabList: [
        { id: 0, title: "全部订单" },
        { id: 1, title: "已支付" },
        { id: 2, title: "未支付" },
      ],
      currentIndex: 0,
    };
  },
  methods: {
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
}
.product {
  display: grid;
  grid-template-columns: 100px 1fr;
  justify-content: center;
  align-items: center;
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
.btn-order {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #757575;
  width: 150px;
  height: 40px;
  align-self: flex-end;
  justify-self: flex-end;
  cursor: pointer;
}
</style>