<template>
  <div>
    <div class="navmenu">
      <div class="wrap">
        <h1 class="logo" @click="goIndex">数码购</h1>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!-- <img class="icon-logo" src="../../assets/logo2.png" alt="" /> -->
          <el-menu-item index="1">
            <router-link to="/Index" active-class="active">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/MobilePhone" active-class="active">手机</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/Notebook" active-class="active">笔记本</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/Television" active-class="active">电视</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="/Bracelet" active-class="active">智能穿戴</router-link>
          </el-menu-item>

          <!-- <el-menu-item index="6"><router-link to="/MobilePhone">手机</router-link></el-menu-item> -->
        </el-menu>
        <div class="search-input">
          <input type="text" v-model="searchMsg" placeholder="请输入商品名称" />
          <i class="el-icon-search"></i>
          <button @click="goSearch">搜索</button>
        </div>

        <div class="right">
          <span class="scar">
            <i class="el-icon-shopping-cart-2"></i>
            <a @click="goCart">购物车</a>
          </span>
          <div class="login" @click="linkToLogin" v-show="uname == null">
            <i class="el-icon-user"></i>
            <a>登录</a>
          </div>
          <el-dropdown @command="handleCommand" v-show="uname != null">
            <span class="el-dropdown-link">
              <a>{{ uname }}</a><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" class="ditem"><a>个人中心</a></el-dropdown-item>
              <el-dropdown-item command="b" class="ditem"><a>退出登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <transition enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="navmenu" ref="nav" v-show="fixedShow">
        <div class="wrap">
          <h1 class="logo" @click="goIndex">数码购</h1>
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">

            <el-menu-item index="1">
              <router-link to="/Index" active-class="active">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/MobilePhone" active-class="active">手机</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/Notebook" active-class="active">笔记本</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/Television" active-class="active">电视</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link to="/Bracelet" active-class="active">智能穿戴</router-link>
            </el-menu-item>


          </el-menu>
          <div class="search-input">
            <input type="text" v-model="searchMsg" placeholder="请输入商品名称" />
            <i class="el-icon-search"></i>
            <button @click="goSearch">搜索</button>
          </div>

          <div class="right">
            <span class="scar">
              <i class="el-icon-shopping-cart-2"></i>
              <a @click="goCart">购物车</a>
            </span>
            <div class="login" @click="linkToLogin" v-show="uname == null">
              <i class="el-icon-user"></i>
              <a>登录</a>
            </div>
            <el-dropdown @command="handleCommand" v-show="uname != null">
              <span class="el-dropdown-link">
                <a>{{ uname }}</a><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" class="ditem"><a>个人中心</a></el-dropdown-item>
                <el-dropdown-item command="b" class="ditem"><a>退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script scoped>
export default {
  name: "NavMenu",
  props: ["scrollDistance"],
  inject: ["reload"],
  data() {
    return {
      activeIndex: "0",
      searchMsg: "",
      inputShow: false,
      navShow: true,
      fixedShow: false,
      userMenu: true,
      uname: localStorage.getItem("uname"),
    };
  },
  mounted() {
    // console.log(this.uname);
  },
  watch: {
    scrollDistance(val) {
      if (val >= 80 && this.$route.path != "/PersonalMenu/PersonalIndex"
        && this.$route.path != "/PersonalMenu/MainOrder"
        && this.$route.path != "/PersonalMenu/MainInfo"
        && this.$route.path != "/OrderDetail") {
        this.fixedShow = true;
        this.$refs.nav.style.position = "fixed";
        this.$refs.nav.style.top = "0px";
      } else {
        this.fixedShow = false;
      }
    },
    $route: {
      deep: true,
      handler(newValue, oldValue) {
        this.uname = localStorage.getItem("uname");
      }

    },
  },
  methods: {
    goSearch() {
      this.$router.push({
        name: "productsearch",
        params: { msg: this.searchMsg }
      })
      this.searchMsg = ""
    },

    goIndex() {
      this.$router.push({ path: "/Index" });
    },
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
      if (command == "a") {
        this.$router.push({
          path: "/PersonalMenu/PersonalIndex",
        });
      } else if (command == "b") {
        localStorage.clear();
        if (this.$route.path == "/Index") {
          this.$router.go();
        } else {
          this.$router.push({
            path: "/Index",
          });
        }

      }
    },
    // goPersonal() {
    //   this.$router.push({
    //     path: "/PersonalMenu/PersonalIndex",
    //   });
    // },
    goCart() {
      this.$router.push({
        path: "/ShoppingCart",
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: #be0f2d !important;
  border-bottom: 3px solid #be0f2d;
  transition: 0.3s;
}

.navmenu {
  width: 100%;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
  box-shadow: 0px 0px 10px #ccc;
  position: relative;
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
  color: #757575;
}

.el-menu.el-menu--horizontal a:hover {
  color: #be0f2d;
  transition: 0.3s;
}

.logo {
  justify-self: start;
  font-weight: 600;
  letter-spacing: 1px;
  color: #be0f2d;
  cursor: pointer;
}

.el-menu.el-menu--horizontal {
  border-bottom: transparent;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: transparent;
  background: transparent;
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
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: transparent;
  outline: none;
  padding: 0 10px 0 30px;
  box-sizing: border-box;
  position: relative;
}

.search-input input:focus {
  background-color: #fff;
}

.search-input button {
  border: none;
  height: 35px;
  width: 50px;
  font-size: 12px;
  letter-spacing: 2px;
  background-color: #be0f2d;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}

.search-input :focus {
  border-color: #be0f2d !important;
  transition: 0.5s;
}

.el-input-group__append {
  background-color: #fff !important;
}

.navmenu /deep/ .el-menu {
  background-color: transparent;
}

.navmenu /deep/ .el-menu-item:hover {
  background-color: transparent;
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