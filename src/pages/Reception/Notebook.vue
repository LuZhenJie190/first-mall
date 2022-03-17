<template>
  <div id="mobilephone">
    <div class="wrap">
     <bread-header :breadName='breadName2'/>
      <div class="m-tabs">
        <div class="m-title">
          <h1>笔记本专区</h1>
        </div>
        <tabs-list 
         :phoneSorts="phoneSorts" 
        :commodities1='commodities1'
        :commodities2='commodities2'
        :commodities3='commodities3'
        :commodities4='commodities4'/>
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
  name: "MobilePhone",
  data() {
    return {
        breadName2:'笔记本',
        phoneSorts: [
        { name: "01" },
        { name: "02" },
        { name: "03" },
        { name: "04" },
        { name: "05" },
      ],
      commodities1: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "01",
          date: "2121-01-21",
          }
      ],
            commodities2: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "02",
          date: "2121-01-21",
          }
      ],
            commodities3: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "03",
          date: "2121-01-21",
          }
      ],
            commodities4: [
          {
            imgurl: require("../../assets/bg1.png"),
          title: "04",
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