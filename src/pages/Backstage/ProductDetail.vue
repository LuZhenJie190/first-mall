<template>
  <div class="detail">
    <el-page-header @back="goBack" content="商品列表" />
    <el-table
      :data="tableData"
      style="width: 80%; margin: auto; margin-top: 20px"
    >
      <el-table-column label="颜色" width="150" sortable prop="pmColor">
      </el-table-column>
      <el-table-column label="版本" width="200">
        <template slot-scope="scope">
          <el-tag size="medium" type="success">
            {{ scope.row.pmVersion }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        property="price"
        width="150"
        label="价格"
      ></el-table-column>
      <el-table-column
        property="stock"
        width="150"
        label="库存"
      ></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="insert"
            >添加 <i class="el-icon-plus"></i
          ></el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeProduct(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹框 -->
    <el-dialog
      title="添加参数"
      :visible.sync="dialogTableVisible"
      style="width: 1000px; margin: auto"
    >
      <el-form label-width="70px" style="width: 400px; margin: auto">
        <el-form-item label="颜色：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="版本：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="库存：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 80px"
            >点击添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ProductDetail } from "../../api/index.js";
export default {
  name: "ProductDetail",
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
    };
  },
  created() {
    ProductDetail(this.$route.query.pid).then((res) => {
      console.log(res);
      this.tableData = res.data[0].productParams;
    });
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/BackendSystem/ProductList",
      });
    },
    insert() {
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style scoped>
.detail {
  padding: 10px;
}
</style>