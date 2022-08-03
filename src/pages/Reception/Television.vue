<template>
  <div class="tv">
    <div class="wrap">
      <bread-header class="bread">电视</bread-header>
      <div class="m-tabs">
        <div class="m-title">
          <h2>电视专区</h2>
          <el-divider></el-divider>
        </div>
        <tabs-list :products="tvData" />
      </div>
    </div>
  </div>
</template>

<script>
import TabsList from "../../components/Reception/TabsList.vue";
import BreadHeader from "../../components/Reception/BreadHeader.vue";
import { ProductGetByCate } from "../../api/product";
export default {
  components: { TabsList, BreadHeader },
  name: "Television",
  data() {
    return {
      tvData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      ProductGetByCate(1003).then((res) => {
        this.tvData = res.data[0].productBrand;
      });
    },
  },
};

</script>

<style scoped>
.tv {
  padding-top: 80px;
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