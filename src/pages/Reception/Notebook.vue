<template>
  <div class="notebook">
    <div class="wrap">
      <bread-header class="bread">笔记本</bread-header>
      <div class="m-tabs">
        <div class="m-title">
          <h2>笔记本专区</h2>
          <el-divider></el-divider>
        </div>
        <tabs-list :products="noteData" />
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
  name: "Notebook",
  data() {
    return {
      noteData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      ProductGetByCate(1002).then((res) => {
        this.noteData = res.data[0].productBrand;
      });
    },
  },
};
</script>

<style scoped>
.notebook {
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