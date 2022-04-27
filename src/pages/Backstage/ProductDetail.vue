<template>
  <div class="detail">
    <el-page-header @back="goBack" content="商品列表" />
    <el-table
      :data="tableData"
      style="width: 80%; margin: auto; margin-top: 20px"
      v-loading="loading"
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
          <el-button
            type="primary"
            size="mini"
            @click="updateParams(scope.$index)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="removeProduct(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加弹框 -->
    <el-dialog
      title="添加参数"
      :visible.sync="dialogTableVisible"
      style="width: 1000px; margin: auto"
    >
      <el-form label-width="70px" style="width: 400px; margin: auto">
        <el-form-item label="颜色：">
          <el-input v-model="form.pmColor"></el-input>
        </el-form-item>
        <el-form-item label="版本：">
          <el-input v-model="form.pmVersion"></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存：">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 80px" @click="addParams"
            >点击添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog
      title="修改参数"
      :visible.sync="dialogTableVisible1"
      style="width: 1000px; margin: auto"
    >
      <el-form label-width="70px" style="width: 400px; margin: auto">
        <el-form-item label="颜色：">
          <el-input v-model="form.pmColor"></el-input>
        </el-form-item>
        <el-form-item label="版本：">
          <el-input v-model="form.pmVersion"></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存：">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 80px" @click="update"
            >点击修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  ProductDetail,
  ProductParamsDelete,
  ProductParamsAdd,
  ProductParamsUpdate,
} from "../../api/index.js";
export default {
  name: "ProductDetail",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      loading: true,
      form: {
        productId: this.$route.query.pid,
        pmColor: "",
        pmVersion: "",
        price: "",
        stock: "",
      },
      pList: [],
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取数据
    getDetail() {
      ProductDetail(this.$route.query.pid).then((res) => {
        // console.log(res);
        this.tableData = res.data[0].productParams;
        this.loading = false;
      });
    },
    // 返回商品列表
    goBack() {
      this.$router.push({
        path: "/BackendSystem/ProductList",
      });
    },
    // 添加参数
    insert() {
      this.dialogTableVisible = true;
    },
    // 确定添加
    addParams() {
      this.pList.push(this.form);
      ProductParamsAdd(this.pList).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogTableVisible = false;
          this.reload();
        }
      });
    },
    // 删除
    removeProduct(val) {
      let index = this.tableData[val].pmId;
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          ProductParamsDelete(index).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
          // 重新获取数据
          this.getDetail();
          this.reload();
        })
        .catch(() => {});
    },
    // 修改
    updateParams(val) {
      this.dialogTableVisible1 = true;
      this.form.pmId = this.tableData[val].pmId;
      this.form.pmColor = this.tableData[val].pmColor;
      this.form.pmVersion = this.tableData[val].pmVersion;
      this.form.price = this.tableData[val].price;
      this.form.stock = this.tableData[val].stock;
    },
    update() {
      if (
        this.form.pmColor != "" &&
        this.form.pmVersion != "" &&
        this.form.price != "" &&
        this.form.stock != ""
      ) {
        ProductParamsUpdate(this.form).then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.dialogTableVisible1 = false;
            this.getDetail();
          }
        });
      } else {
        this.$message.error("不能为空");
      }
    },
  },
};
</script>

<style scoped>
.detail {
  padding: 10px;
}
</style>