<template>
  <div id="tabs-list">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="phoneSorts[0].name">
        <div class="m-body">
          <ul class="m-list">
            <cards-list :details="commodities1" />
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="phoneSorts[1].name">
        <div class="m-body">
          <ul class="m-list">
            <cards-list :details="commodities2" />
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="phoneSorts[2].name">
        <div class="m-body">
          <ul class="m-list">
            <cards-list :details="commodities3" />
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="phoneSorts[3].name">
        <div class="m-body">
          <ul class="m-list">
            <cards-list :details="commodities4" />
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardsList from "../Reception/CardsList.vue";
export default {
  name: "TabsList",
  components: { CardsList },
  props:['phoneSorts','commodities1','commodities2','commodities3','commodities4'],
  mounted() {
  
    console.log(this.commodities1);
  },
  data() {
    return {
      activeName: 0,
    };
  },
};
</script>

<style scoped>
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
.el-tabs__item.is-active {
  color: red;
}
.el-tabs__item:hover {
  color: red;
}
.el-tabs__active-bar.is-top {
  background: red;
}
.el-tabs__header {
  padding: 0px 0px 0px 25px;
}
.el-tabs__content {
  background: #f5f5f5;
}
.m-body {
  margin-top: 30px;
}
.m-list {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.m-list li {
  width: 280px;
  float: left;
  margin: 10px;
  background: #fff;
}
</style>