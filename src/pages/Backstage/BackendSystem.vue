<template>
  <div class="backend-system">
    <el-container>
      <el-header>
          <backstage-top/>
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
import BackstageTop from '../../components/Backstage/BackstageTop.vue';
export default {
  components: { BackstageTop },
  name: "BackendSystem",
  data() {
    return {
      vrouter: true,
      isCollapse: false,
    };
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

.el-header {
  margin: 5px 5px 0px 5px;
  background: #fff;
  border-radius: 5px;
}


.el-aside {
  width: 230px !important;
  height: 90vh;
  margin: 5px 5px 0px 5px;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
}
.el-main {
  background: #fff;
  margin: 5px 5px 0px 0px;
  padding: 20px 10px 10px 10px;
  border-radius: 5px;
  height: 90vh;
  overflow: auto;
}
.el-menu {
  border: none;
}
</style>