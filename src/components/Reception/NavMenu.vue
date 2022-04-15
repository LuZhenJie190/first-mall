<template>
  <div
    :class="{
      navmenu: navShow,
      'nav-change': fixedShow,
      'animate__animated animate__fadeInDown': fixedShow,
    }"
  >
    <div class="wrap">
      <h1 class="logo">数码购</h1>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <!-- <img class="icon-logo" src="../../assets/logo2.png" alt="" /> -->
        <el-menu-item index="1">
          <router-link to="/Index"  active-class="active">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2" >
          <router-link  to="/MobilePhone" active-class="active"
            >手机</router-link
          >
        </el-menu-item>
        <el-menu-item index="3"
          ><router-link to="/Notebook" active-class="active"
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
        <input type="text" v-model="searchMsg" />
        <i class="el-icon-search"></i>
        <button>搜索</button>
        <!-- <el-input type="text" placeholder="请输入关键字" v-model="searchMsg">
        </el-input>
        <img @click="mainSearch" src="../../assets/search.png" /> -->
      </div>

      <div class="right">
        <span class="scar">
          <i class="el-icon-shopping-cart-2"></i>
          <a @click="goCart">购物车</a>
        </span>
        <div class="login" @click="linkToLogin">
          <i class="el-icon-user"></i>
          <a>登录</a>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <a>下拉菜单下拉菜单</a
            ><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" class="ditem"
              ><a @click="goPersonal">个人中心</a></el-dropdown-item
            >
            <el-dropdown-item command="b" class="ditem"
              ><a>退出登录</a></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div class="container"></div> -->
        <!-- <div class="user-menu">
          <ul>
            <li><a href="#">个人中心</a></li>
            <li><a href="#">退出登录</a></li>
          </ul>
        </div> -->
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
      activeIndex: '0',
      searchMsg: "",
      inputShow: false,
      navShow: true,
      fixedShow: false,
      userMenu: true,
      a:'',
    };
  },
  watch: {
    scrollDistance(val) {
      if (val >= 670) {
        this.fixedShow = true;
      } else {
        this.fixedShow = false;
      }
    },
  },
// created() {
//   this.activeIndex = '1'
//   this.a = this.$router.options.routes.forEach(element => {
//     console.log(element);
//     if (element.path =='/PersonalCenter') {
//       this.activeIndex = '0'
//     }
//   });
 
// },
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
    handleCommand(command) {
      console.log(command);
    },
    goPersonal() {
      this.$router.push({
        path: "/PersonalCenter",
      });
            this.activeIndex = '0';  
    },
    goCart(){
       this.$router.push({
        path: "/ShoppingCart",
      });
    }
  },
};
</script>

<style scoped>
.active {
  color: #be0f2d !important;
  border-bottom:3px solid #be0f2d;
  transition: .3s;
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
.el-menu.el-menu--horizontal a,
.right a {
  font-weight: 600;
  color: gray;
}
.el-menu.el-menu--horizontal a:hover {
  color: #be0f2d;
  transition: .3s;
}
.logo {
  justify-self: start;
  font-weight: 600;
  letter-spacing: 1px;
  color: #be0f2d;
}

.el-menu.el-menu--horizontal {
  border-bottom: transparent;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: transparent;
}
.right {
  display: grid;
  grid-template-columns: 100px 100px;
  justify-content: end;
  align-items: center;
  height: 100%;
}
.scar,
.login {
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-self: center;
  align-items: center;
  cursor: pointer;
}
.login{
  display: none;
}
.scar i,
.login i {
  transform: scale(1.4);
  margin-right: 5px;
}
.el-dropdown {
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: underline;
  /* display: none; */
}
.ditem {
  cursor: pointer;
}
.ditem:hover {
  color: #000;
  background-color: #eee;
  transition: 0.5s;
}

.search-input {
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: center;
  align-items: center;
}
.search-input i {
  transform: scale(1.2, 1.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 8px;
  color: #ccc;
}
.search-input input {
  border: 1px solid #ccc;
  border-right: none;
  height: 35px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  outline: none;
  padding: 0 10px 0 30px;
  box-sizing: border-box;
  position: relative;
}
.search-input button {
  border: none;
  height: 35px;
  width: 50px;
  font-size: 12px;
  letter-spacing: 2px;
  background-color: #be0f2d;
  color: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}
.search-input :focus {
  border-color: #be0f2d !important;
  transition: 0.5s;
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