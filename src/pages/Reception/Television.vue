<template>
  <div id="television">
    <div class="wrap">
     <bread-header :breadName='breadName3'/>
      <div class="m-tabs">
        <div class="m-title">
          <h1>电视专区</h1>
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
import BreadHeader from '../../components/Reception/BreadHeader.vue';
export default {
  components: { DsFooter, TabsList, BreadHeader,},
  name: "Television",
  data() {
    return {
        breadName3:'电视',
         phoneSorts: [
        { name: "001" },
        { name: "002" },
        { name: "003" },
        { name: "004" },
        { name: "005" },
      ],
      commodities1: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "001",
          date: "2121-01-21",
          }
      ],
            commodities2: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "002",
          date: "2121-01-21",
          }
      ],
            commodities3: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "003",
          date: "2121-01-21",
          }
      ],
            commodities4: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "004",
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