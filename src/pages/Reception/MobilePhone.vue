<template>
  <div class="mobilephone">
    <div class="wrap">
      <bread-header class="bread">手机</bread-header>
      <div class="m-tabs">
        <div class="m-title">
          <h2>手机专区</h2>
          <el-divider></el-divider>
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
.bread{
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
.m-title{
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  position: relative;
 
}

.m-tabs /deep/ .el-tabs__nav-wrap::after{
  position: static;
}
.m-tabs /deep/.el-tabs__item.is-active {
  color: #be0f2d;
}
.m-tabs /deep/.el-tabs__item:hover {
  color: #be0f2d;
}
.m-tabs /deep/.el-tabs__active-bar.is-top {
  background: #be0f2d;
}
.m-tabs /deep/.el-tabs__item:hover{
  color: #be0f2d ;
}
.m-tabs /deep/.el-tabs__nav-scroll{
  background-color: #fff !important;
  border-radius: 5px;
  padding: 15px;
  margin-top: -25px;
}
.m-tabs /deep/.el-tabs__content {
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 15px;
}
</style>