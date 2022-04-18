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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary">修改</el-button>
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
      ],
    };
  },
};
</script>

<style scoped>
.carousel-set {
  padding: 20px 30px 0px 30px;
}
.pimg {
  width: 80px;
  height: 100px;
}
</style>