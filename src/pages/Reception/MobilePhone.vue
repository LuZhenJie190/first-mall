<template>
  <div id="mobilephone">
    <div class="wrap">
      <bread-header :breadName="breadName1" />
      <div class="m-tabs">
        <div class="m-title">
          <h1>手机专区</h1>
        </div>
        <tabs-list 
        :phoneSorts="phoneSorts" 
        :commodities1='commodities1'
        :commodities2='commodities2'
        :commodities3='commodities3'
        :commodities4='commodities4' />
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
      breadName1: "手机",
      phoneSorts: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
      ],
      commodities1: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "1",
          date: "2121-01-21",
          }
      ],
            commodities2: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "2",
          date: "2121-01-21",
          }
      ],
            commodities3: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "3",
          date: "2121-01-21",
          }
      ],
            commodities4: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "4",
          date: "2121-01-21",
          }
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
</style>