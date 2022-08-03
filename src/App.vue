<template>
  <div id="app">
    <nav-menu v-if="!$route.meta.showNav" :scrollDistance="scrollDistance" />
    <keep-alive :include="['Index', 'ProductSearch']">
      <router-view />
    </keep-alive>
    <ds-footer v-show="$route.meta.footerShow"></ds-footer>
    <div class="back">
      <el-button type="danger" plain v-show="backTop" @click="goback"><i class="el-icon-top"></i></el-button>
    </div>
  </div>
</template>


<script>
import NavMenu from "./components/Reception/NavMenu.vue";
import DsFooter from "./components/Reception/DsFooter.vue";

export default {
  components: { NavMenu, DsFooter },
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      backTop: false,
      isRouterAlive: true,
      scrollDistance: 0,
    };
  },
  mounted() {
    //   绑定滚动事件
    window.addEventListener("scroll", this.scrollToTop, true);
  },
  methods: {
    //返回顶部
    goback() {
      // 获取滚动了多少
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      //   设置定时器 滚动效果
      let timer = setInterval(() => {
        //   一次向上滚动60
        document.documentElement.scrollTop =
          document.body.scrollTop =
          top -=
          60;
        // 到顶了就销毁定时器
        if (top <= 0) clearInterval(timer);
      }, 10);
    },
    scrollToTop() {
      // 距离顶部
      this.scrollDistance = window.pageYOffset;
      if (this.scrollDistance >= 670) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },

    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
#app {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}

.wrap {
  max-width: 1180px;
  margin: 0 auto;
}

* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.back {
  position: fixed;
  bottom: 100px;
  right: 10px;
}

.back .el-button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back i {
  transform: scale(2, 2);
}
</style>
