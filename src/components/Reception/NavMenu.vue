<template>

    <div :class="{ 
      navmenu: navShow, 
      'nav-change':fixedShow , 
      'animate__animated animate__fadeInDown':fixedShow,
      }" 
      >
    <div class="wrap">
      <h1 class="logo" >数码购</h1>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <!-- <img class="icon-logo" src="../../assets/logo2.png" alt="" /> -->
        <el-menu-item index="1">
          <router-link to="/Index" active-class="active">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/MobilePhone" active-class="active"
            >手机</router-link
          >
        </el-menu-item>
        <el-menu-item index="3"
          ><router-link to="/Notebook"  active-class="active"
            >笔记本</router-link
          ></el-menu-item
        >
        <el-menu-item index="4"
          ><router-link to="/Television" active-class="active"
            >电视</router-link
          ></el-menu-item
        >
        <el-menu-item index="5"
          ><router-link to="/Bracelet" active-class="active"
            >手环</router-link
          ></el-menu-item
        >

        <!-- <el-menu-item index="6"><router-link to="/MobilePhone">手机</router-link></el-menu-item> -->
      </el-menu>
      <div class="search-input">
        <el-input type="text" placeholder="请输入关键字" v-model="searchMsg">
        </el-input>
        <img @click="mainSearch" src="../../assets/search.png" />
      </div>

      <div class="right">
        <span class="scar">
          <a>购物车</a>
          <i class="el-icon-shopping-cart-2"></i>
        </span>
        <span class="login" @click="linkToLogin">
          <a>登录</a>
          <i class="el-icon-user"></i>
        </span>
      </div>
    </div>
  </div>


</template>

<script scoped>
export default {
  name: "NavMenu",
  props: ["scrollDistance"],
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchMsg: "",
      inputShow: false,
      navShow: true,
      fixedShow:false,
    };
  },
  watch: {
    scrollDistance(val) {
      if (val >= 670) {
        this.fixedShow = true
      } else {
       this.fixedShow = false
      }
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
      this.inputShow = true;
    },
    mainSearch() {
      console.log(this.searchMsg);
    },
    linkToLogin() {
      this.$router.push({
        path: "/Login",
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: #be0f2d !important;
}
.navmenu {
  width: 100%;
  background: #fff;
  z-index: 100;
   box-shadow: 0px 0px 10px #ccc;
}
.nav-change {
  position: fixed;
  top: 0; 
}
.wrap {
  padding: 0px 50px;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr;
  height: 70px;
  justify-content: center;
  align-items: center;
}
.logo {
  justify-self: start;
  font-weight: 600;
  letter-spacing: 1px;
  color: #be0f2d;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #be0f2d;
}
.right {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: center;
  align-items: center;
}
.scar,
.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: end;
  align-items: center;
  cursor: pointer;
}

.scar i,
.login i {
  transform: scale(1.4);
  margin-left: 8px;
}
.search-input {
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
}
.search-input :focus {
  border-color: #be0f2d !important;
}
.search-input .el-input {
  width: 350px;
}
.search-input img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  padding: 10px;
  cursor: pointer;
}
.el-input-group__append {
  background-color: #fff !important;
}
.el-menu-item {
  padding: 0px 10px 0px 10px;
}
.el-menu-item a {
  padding: 12px;
}
.el-menu.el-menu--horizontal {
  width: 450px;
  justify-self: center;
}
</style>