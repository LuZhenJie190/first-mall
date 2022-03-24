<template>
  <div id="app">
     <nav-menu v-if="!$route.meta.showNav"/>
     <router-view v-if="isRouterAlive"/>
      <div class="back">
        <el-button v-show="backTop" @click="goback"><i class="el-icon-top"></i></el-button>
      <!-- <h1 v-show="backTop" @click="goback">回到顶部</h1> -->
    </div>
    </div>
</template>


<script>
import NavMenu from './components/Reception/NavMenu.vue';
import Index from './pages/Reception/Index.vue';

export default {
  components: { Index, NavMenu },
  name: "App",
  provide(){
    return{
      reload:this.reload
    }
  },
    data() {
    return {
      backTop: false,
      isRouterAlive:true
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
        document.documentElement.scrollTop =document.body.scrollTop=top-=60;
        // 到顶了就销毁定时器
        if (top <= 0) clearInterval(timer);
      }, 10);
    },
    scrollToTop() {
        // 距离顶部
      var s =window.pageYOffset;
      if (s >= 670){
          this.backTop=true
      }else{
          this.backTop=false
      }
    },

    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  },

};
</script>

<style>
#app{
  background: #f5f5f5;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
  cursor: pointer;
}
.back {
  position: fixed;
  bottom: 100px;
  right: 10px;
}
.back .el-button{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back i{
  transform: scale(2,2);
}
</style>
