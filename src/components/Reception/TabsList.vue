<template>
  <div class="tabs-list">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="p1.brand"
        v-for="(p1, index) in products"
        :key="index"
      >
        <div class="m-body">
          <ul class="m-list">
            <li v-for="(p2, index) in p1.productList" :key="index">
              <cards-list>
                <template slot="image">
                  <img class="images" src="../../assets/bg1.png" />
                </template>
                <template slot="title">
                  <h3>{{ p2.title }}</h3>
                </template>
                <template slot="subtitle">
                  <p>123</p>
                </template>
                <template slot="price">
                  <h4 class="price">{{ p2.price }} 元</h4>
                </template>
              </cards-list>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardsList from "./Card.vue";
export default {
  name: "TabsList",
  components: { CardsList },
  props: ["products"],
  mounted() {
    console.log(this.products);
  },
  data() {
    return {
      activeName: 0,
    };
  },
};
</script>

<style scoped>
.tabs-list /deep/ .el-tabs__nav-wrap::after {
  position: static;
}
.tabs-list /deep/.el-tabs__item.is-active {
  color: #be0f2d;
}
.tabs-list /deep/.el-tabs__item:hover {
  color: #be0f2d;
}
.tabs-list /deep/.el-tabs__active-bar.is-top {
  background: #be0f2d;
}
.tabs-list /deep/.el-tabs__item:hover {
  color: #be0f2d;
}
.tabs-list /deep/.el-tabs__nav-scroll {
  background-color: #fff !important;
  border-radius: 5px;
  padding: 15px;
  margin-top: -25px;
}
.tabs-list /deep/.el-tabs__content {
  margin-top: 30px;
  overflow: unset;
}
.tabs-list {
  margin-top: -20px;
}
.m-title {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.el-breadcrumb {
  padding-top: 50px;
}
.m-tabs {
  background: #fff;
  margin-top: 30px;
}
.el-tabs {
  margin-top: 10px;
}
.el-tabs__nav-wrap::after {
  background: #fff;
}
.el-tabs__header {
  padding: 0px 0px 0px 25px;
}
.el-tabs__nav-scroll {
  background-color: #fff !important;
}
.m-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  column-gap: 10px;
}
.m-list li {
  width: 100%;
  margin-bottom: 15px;
}
</style>