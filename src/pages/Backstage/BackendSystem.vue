<template>
  <div class="backend-system">
    <el-container>
      <el-header>
        <div class="sys-header">
          <h1>数码购后台管理系统</h1>
          <span class="now-time">北京时间 : {{ nowTime }}</span>
          <span class="quit">
            <p>您好，管理员名称</p>
            <el-button type="primary" plain size="mini" @click="backTo">退出</el-button>
          </span>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :router="true">
            <el-menu-item index="/BackendSystem/Home">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/BackendSystem/UserList">
                  <i class="el-icon-s-fold"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="/BackendSystem/UserRoot">
                <i class="el-icon-setting"></i>
                  <span slot="title">用户权限</span></el-menu-item>
                <el-menu-item index="/BackendSystem/UserAdd">
                <i class="el-icon-plus"></i>
                  <span slot="title">添加用户</span></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span slot="title">商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/BackendSystem/ProductList">
                <i class="el-icon-notebook-2"></i>
                  <span slot="title">商品列表</span></el-menu-item>
                <el-menu-item index="/BackendSystem/ProductAdd" >
                <i class="el-icon-sell"></i>
                <span slot="title">商品发布</span></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/BackendSystem/OrderManagement">
              <i class="el-icon-tickets"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getnowDate } from "../../utils/index";
export default {
  name: "BackendSystem",
  data() {
    return {
      vrouter: true,
      isCollapse: false,
      nowTime: 0,
    };
  },
  created() {
    this.getTime();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.nowTime = getnowDate();
      }, 100);
    },
    backTo(){
      this.$router.push({
        path:"/Index"
      })
    }
  },
};
</script>

<style scoped>
html {
  height: 100vh;
  background: #f5f5f5;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.now-time {
  width: 250px;
  line-height: 60px;
}
.el-header {
  margin: 5px 10px 0px 10px;
  background: #fff;
  border-radius: 10px;
}
.sys-header {
  display: flex;
  justify-content: space-between;
}
.sys-header h1 {
  padding: 15px 0px 10px 0px;
}
.quit {
  display: flex;
  align-items: center;
}
.quit p {
  margin-right: 15px;
}

.el-aside {
  width: 250px !important;
  height: 88vh;
  margin: 10px;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
}
.el-main {
  background: #fff;
  margin: 10px 10px 10px 0px;
  padding: 50px 10px 10px 10px;
  border-radius: 10px;
}
.el-menu {
  border: none;
}
</style>