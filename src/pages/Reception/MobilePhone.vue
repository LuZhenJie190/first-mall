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
import { ProductGetByCate } from "../../api/index.js";
export default {
  components: { DsFooter, TabsList, BreadHeader },
  name: "MobilePhone",
  data() {
    return {
      phoneData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      ProductGetByCate(1001).then((res) => {
        this.phoneData = res.data[0].productBrand;
      });
    },
  },
};
</script>

<style scoped>
.mobilephone {
  background-color: #f5f5f5;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.bread {
  padding: 15px 0px;
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