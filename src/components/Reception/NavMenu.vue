<template>
  <div id="navmenu">
    <div class="wrap">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <img class="icon-logo" src="../../assets/logo2.png" alt="" />
      <!-- <div class="line"></div> -->
      <div class="search-input" v-show="inputShow" @mouseleave="inputHide">
        <el-input type="text" placeholder="请输入关键字" v-model="searchMsg" />
        <img src="../../assets/search.png" />
      </div>
      <el-menu-item index="1">
        <router-link to="/Index" active-class="active">首页</router-link                                                           >
        </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/MobilePhone" active-class="active">手机</router-link>
        </el-menu-item>
      <el-menu-item index="3"><router-link to="/Notebook" active-class="active">笔记本</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/Television" active-class="active">电视</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/Bracelet" active-class="active">手环</router-link></el-menu-item>
      <!-- <el-menu-item index="6"><router-link to="/MobilePhone">手机</router-link></el-menu-item> -->
      <div class="right">
        <span class="search" @mouseenter="search">
          <a>搜索</a>
          <img src="../../assets/search.png" />
        </span>
        <span class="scar">
          <img src="../../assets/shoppingcar.png" />
        </span>
        <span class="login" @click="linkToLogin">
          <a>登录</a>
          <img class="icon-login" src="../../assets/login.png" />
        </span>
      </div>
    </el-menu>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchMsg: "",
      inputShow: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
      this.inputShow = true;
    },
    inputHide() {
      this.inputShow = false;
    },
    linkToLogin(){
      this.$router.push({
        path:'/Login'
      })
    }
  },
};
</script>

<style scoped>
.active{
  color:red !important; 
}
#navmenu {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
}
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.icon-logo {
  float: left;
  width: 150px;
  height: 50px;
  margin-right: 20px;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
  display: flex;
  align-items: center;
  position: relative;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid red;
}
.right {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: 0;
}
.search,
.login {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.search img,
.scar img,
.login img {
  margin-left: 5px;
  width: 20px;
  height: 20px;
}
.search-input {
  position: absolute;
  right: 160px;
  z-index: 10;
}
.el-input__inner {
  width: 300px;
}
.el-input__inner:focus {
  border-color: red;
}
.search-input img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
}
.el-menu-item{
 padding: 0px 10px 0px 10px;
}
.el-menu-item a{
  padding: 12px;
}
</style>