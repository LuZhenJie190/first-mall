<template>
  <div class="backend-system">
    <el-container>
      <el-header>
        <backstage-top />
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu default-active="1" class="el-menu-vertical-demo" :router="true" :unique-opened="true"
            :collapse="isCollapse">
            <el-menu-item v-for="item in noChild" :key="item.path" :index="item.path" @click="getRoute(item)">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu :index="String(index + 1)" v-for="(item, index) in hasChild" :key="index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="item.path" v-for="item in item.children" :key="item.path" @click="getRoute(item)">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <div class="is-collapse">
            <el-button @click="changeCollapse" size="mini" :type="isCollapse ? 'default' : 'default'">{{ isCollapse ?
                "展开" : "收起"
            }}</el-button>
          </div>
        </el-aside>
        <el-main>
          <div class="tags" style="margin: 5px 0px 10px 0px">
            <el-tag v-for="(tag, index) in tagList" :key="tag.name" :closable="index !== 0" :disable-transitions="false"
              @close="handleClose(tag, index)" style="margin-right: 10px;cursor: pointer;"
              :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="goPage(tag, index)" size="mini">
              {{ tag.title }}
            </el-tag>
          </div>

          <keep-alive>
            <router-view />
          </keep-alive>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BackstageTop from "../../components/Backstage/BackstageTop.vue";
export default {
  components: { BackstageTop },
  name: "BackendSystem",
  data() {
    return {
      vrouter: true,
      isCollapse: false,
      mainMenu: [
        { title: "首页", icon: "el-icon-house", name: "home", path: "/BackendSystem/Home" },

        {
          title: "用户管理", icon: "el-icon-user", children: [
            { title: "用户列表", icon: "el-icon-s-fold", name: "userlist", path: "/BackendSystem/UserList" },
            { title: "用户权限", icon: "el-icon-setting", name: "userroot", path: "/BackendSystem/UserRoot" },
          ]
        },


        {
          title: "商品管理", icon: "el-icon-shopping-bag-2", children: [
            { title: "商品列表", icon: "el-icon-notebook-2", name: "productlist", path: "/BackendSystem/ProductList" },
            { title: "商品发布", icon: "el-icon-sell", name: "productadd", path: "/BackendSystem/ProductAdd" },
          ]
        },


        { title: "订单管理", icon: "el-icon-tickets", name: "ordermanagement", path: "/BackendSystem/OrderManagement" },
        { title: "购物车管理", icon: "el-icon-shopping-cart-1", name: "cartmanagement", path: "/BackendSystem/CartManagement" },


      ],
      tagList: [{ title: "首页", icon: "el-icon-house", name: "home", path: "/BackendSystem/Home" },],
      arr: [{ title: "首页", icon: "el-icon-house", name: "home", path: "/BackendSystem/Home" },]
    };
  },
  computed: {
    hasChild() {
      return this.mainMenu.filter(item => item.children);
    },
    noChild() {
      return this.mainMenu.filter(item => !item.children);
    }
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getRoute(data) {
      if (data.name === 'home') {
        return;
      }
      this.arr.push(data);
      this.tagList = [...(new Set(this.arr))]
    },
    handleClose(tag, index) {
      this.tagList.splice(this.tagList.indexOf(tag), 1);
      // 判断是否最后一位，如果是就往前移一位，不是就无需移动
      const length = this.tagList.length;
      if (index === length) {
        this.$router.push({
          name: this.tagList[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tagList[index].name
        })
      }
    },
    goPage(val, index) {
      this.$router.push({
        name: val.name
      })
    }
  }
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
  /* width: 230px !important; */
  height: 90vh;
  margin: 5px 5px 0px 5px;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  position: relative;
}

.el-main {
  background: #fff;
  margin: 5px 5px 0px 0px;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  height: 90vh;
  overflow: hidden;
}

.el-menu {
  border: none;
}

.is-collapse {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>