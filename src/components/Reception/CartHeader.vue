<template>
  <div class="cart-header">
    <div class="top">
      <div class="container" style="height: 100px">
        <div class="left">
          <h1 @click="goShopping">数码购</h1>
          <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <a>{{ name }}</a
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="down-menu">
              <el-dropdown-item command="a" class="ditem"
                ><a @click="goPersonal">个人中心</a></el-dropdown-item
              >
              <el-dropdown-item command="b" class="ditem"
                ><a>退出登录</a></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <a class="order" @click="goOrder">我的订单</a>
        </div>
      </div>
      <el-divider class="line"></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartHeader",
  data() {
    return {
      name: localStorage.getItem("uname"),
    };
  },
  methods: {
    handleCommand(command) {
      console.log(command);
    },
    goShopping() {
      this.$router.push({
        path: "/Index",
      });
    },
    goOrder() {
      this.$router.push({
        path: "/PersonalMenu/MainOrder",
      });
    },
    goPersonal() {
      this.$router.push({
        path: "/PersonalMenu/PersonalIndex",
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
.top {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
}
.left {
  float: left;
  display: grid;
  grid-template-columns: 100px auto;
}
.left h1 {
  color: #be0f2d;
  font-size: 30px;
  font-weight: 500;
}
.left p,
.order {
  margin-top: 7px;
  color: #757575;
}
.right {
  float: right;
}
.ditem {
  cursor: pointer;
}
.ditem:hover {
  color: #000;
  background-color: #eee;
  transition: 0.5s;
}
.down-menu {
  margin-top: -20px !important;
}
.order {
  border-left: 1px solid #757575;
  padding-left: 15px;
  margin-left: 15px;
}
.line {
  margin: 0;
  background-color: #be0f2d;
  height: 2px;
}
</style>