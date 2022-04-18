<template>
  <div class="product-set">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="图片" width="180">
        <template>
          <img class="pimg" src="../../assets/bg1.png" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="300">
      </el-table-column>
      <el-table-column prop="address" label="商品ID"> </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="">
          <BackstageSearch class="search" />
        </template>
        <template slot-scope="scope">
          <div class="set" style="display: flex">
            <div class="carousel">
              <p>轮播图</p>
              <el-switch
                v-model="scope.row.carousel"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="carousel">
              <p>每日推荐</p>
              <el-switch
                v-model="scope.row.recommend"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ProductSet",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "上海市普陀区金沙江路 1518 弄",
          address: "上海市普陀区金沙江路 1518 弄",
          carousel: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      carousel: false,
      recommend: false,
    };
  },
};
</script>

<style scoped>
.product-set {
  padding: 0px 20px;
}
.pimg {
  width: 60px;
  height: 60px;
}
.carousel {
  display: flex;
  margin-right: 50px;
}
.carousel p {
  margin-right: 5px;
}
.search /deep/ .list-delete {
  display: none;
}
</style>