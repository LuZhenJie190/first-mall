<template>
  <div class="mobilephone">
    <div class="wrap">
      <bread-header class="bread">手机</bread-header>
      <div class="m-tabs">
        <div class="m-title">
          <h2>手机专区</h2>
          <el-divider></el-divider>
        </div>
        <tabs-list :products="phoneData" />
      </div>
    </div>
    <ds-footer />
  </div>
</template>

<script>
import DsFooter from "../../components/Reception/DsFooter.vue";
import TabsList from "../../components/Reception/TabsList.vue";
import BreadHeader from "../../components/Reception/BreadHeader.vue";
export default {
  components: { DsFooter, TabsList, BreadHeader },
  name: "MobilePhone",
  data() {
    return {
      phoneData: [
        {
          brand: "小米",
          productList: [
            { title: "小米12pro", price: 1235 },
            { title: "小米13pro", price: 1222 },
            { title: "小米14pro", price: 13335 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米13pro", price: 1222 },
            { title: "小米14pro", price: 13335 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米13pro", price: 1222 },
            { title: "小米14pro", price: 13335 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米13pro", price: 1222 },
            { title: "小米14pro", price: 13335 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
            { title: "小米15pro", price: 1215 },
          ],
        },
        {
          brand: "华为",
          productList: [
            { title: "华为12pro", price: 1235 },
            { title: "华为13pro", price: 1222 },
            { title: "华为14pro", price: 13335 },
            { title: "华为15pro", price: 1215 },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.bread {
  margin: 15px 0px;
}

.el-breadcrumb {
  padding-top: 50px;
}
.m-tabs {
  display: grid;
  grid-template-rows: 120px auto;
  /* background-color: #fff; */
  max-width: unset;
  /* padding: 15px; */
  align-items: center;
}
.m-title {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  position: relative;
}
</style>