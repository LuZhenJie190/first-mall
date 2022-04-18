<template>
  <div class="bracelet">
    <div class="wrap">
      <bread-header class="bread">手环</bread-header>
      <div class="m-tabs">
        <div class="m-title">
          <h2>手环专区</h2>
          <el-divider></el-divider>
        </div>
        <tabs-list
          :phoneSorts="phoneSorts"
          :commodities1="commodities1"
          :commodities2="commodities2"
          :commodities3="commodities3"
          :commodities4="commodities4"
        />
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
  name: "Bracelet",
  data() {
    return {
      phoneSorts: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
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
  max-width: unset;
  align-items: center;
}
.m-title {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  position: relative;
}
</style>