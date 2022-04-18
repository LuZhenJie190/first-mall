<template>
  <div class="personal-menu">
    <div class="wrap">
      <bread-header>个人中心</bread-header>
      <div class="container">
        <aside class="conter-left" :class="{ 'left-fixed': isFixed }">
          <h2 @click="goIndex">个人中心</h2>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <!-- <el-menu-item index="/PersonalMenu/PersonalIndex" class="menu-item">
            </el-menu-item> -->
            <el-menu-item index="/PersonalMenu/MainInfo" class="menu-item">
              <span slot="title">修改信息</span>
            </el-menu-item>
            <el-menu-item index="/PersonalMenu/MainOrder" class="menu-item">
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="/ShoppingCart" class="menu-item">
              <span slot="title">我的购物车</span>
            </el-menu-item>
          </el-menu>
        </aside>
        <div class="conter-right">
          <router-view class="animate__animated animate__fadeIn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadHeader from "../../../components/Reception/BreadHeader.vue";
import throttle from "lodash/throttle";
export default {
  components: { BreadHeader },
  name: "Index",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      orderType: [
        {
          icon: "el-icon-wallet",
          title: "待支付订单",
          count: 0,
          link: "查看待支付订单 >",
        },
        {
          icon: "el-icon-wallet",
          title: "待支付订单",
          count: 0,
          link: "查看待支付订单 >",
        },
        {
          icon: "el-icon-wallet",
          title: "待支付订单",
          count: 0,
          link: "查看待支付订单 >",
        },
        {
          icon: "el-icon-wallet",
          title: "待支付订单",
          count: 0,
          link: "查看待支付订单 >",
        },
      ],
      isFixed: false,
    };
  },
  mounted() {
    // 获取滚动距离
    window.addEventListener("scroll", this.windowScroll);
  },
  methods: {
    goIndex() {
      this.$router.push({ path: "/PersonalMenu/PersonalIndex" });
    },
    // 节流：屏幕滚动
    windowScroll: throttle(function () {
      let scroll1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scroll1 > 121) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }, 50),
  },
};
</script>

<style scoped>
.personal-menu {
  height: 100%;
}
.wrap {
  width: 1200px;
  margin: auto;
  padding: 20px 0;
}
.container {
  margin-top: 20px;
  overflow: hidden;
}
.conter-left {
  float: left;
  width: 15vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
.left-fixed {
  position: fixed;
  top: 0px;
}
.conter-left h2 {
  padding: 30px 0 20px 0;
  cursor: pointer;
}
.el-menu-vertical-demo {
  background-color: #fff;
  border: none;
  margin-left: -10px;
}
.menu-item {
  color: gray;
  height: 30px;
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: transparent;
  color: #000;
}
.conter-right {
  float: right;
  width: 61.5vw;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}
</style>