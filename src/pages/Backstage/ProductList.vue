<template>
  <div class="product-list" v-loading="loading">
    <!-- 搜索和批量删除按钮 -->
    <BackstageSearch @searchInput="searchInput" @brand="searchBrand" :inputValue="ivalue"
      :multipleSelection="multipleSelection" :flag="flag">
    </BackstageSearch>
    <!-- 表格 -->
    <el-table :data="tableData" stripe border ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="pid" label="商品ID" width="100" sortable />
      <el-table-column prop="categoryId" label="品类" width="100" sortable :formatter="formatCate" />
      <el-table-column prop="brandId" label="品牌" width="100" sortable :formatter="formatBrand" />
      <el-table-column prop="mainImg" label="主图" width="105">
        <template slot-scope="scope">
          <img :src="scope.row.mainImg" alt="" style="width: 60px; height: 55px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="180" />
      <el-table-column prop="subTitle" label="简介" width="200" />
      <el-table-column prop="createTime" label="轮播图" width="120" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isCarousel" :active-value="1" :inactive-value="0"
            @change="carouselChange(scope.$index, scope.row)" :disabled="scope.row.carousel.carouselImg == null" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="每日推荐" width="120" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isRecommend" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="228" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.$index)">详情</el-button>
          <el-button type="success" size="mini" @click="update(scope.$index)">修改</el-button>
          <el-button size="mini" type="danger" @click="removeProduct(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="product-page">
      <Paging @pNum="pNum" :pageInfo="pageInfo" />
    </div>

    <!-- 修改弹框 -->
    <el-dialog title="修改商品" :visible.sync="dialogTableVisible">
      <el-tabs tab-position="left" style="height: 200px" v-model="tabsIndex">
        <el-tab-pane label="基本信息" name="0">
          <el-form label-width="100px" v-model="form">
            <el-form-item label="商品类型：">
              <el-tag>{{ form.categoryId | cateName }}</el-tag>
            </el-form-item>
            <el-form-item label="商品品牌：">
              <el-tag type="success">{{ form.brandId | cateName }}</el-tag>
            </el-form-item>
            <el-form-item label="商品名称：">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="商品简介：">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2 }" v-model="form.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="创建时间：">
              <el-input v-model="form.createTime"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="1">
          <el-image :src="form.mainImg"></el-image>
          <el-upload class="upload-demo" action="#" :http-request="upload" :file-list="fileList" list-type="picture"
            :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">
              &nbsp; &nbsp; &nbsp; &nbsp;只能上传jpg/png文件<i>(限制一张，如已选择图片，请务必删除后重新选择)</i>
            </span>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="轮播图" name="2">
          <el-image :src="form.carouselImg"></el-image>
          <el-upload class="upload-demo" action="#" :http-request="Cupload" :file-list="fileList" list-type="picture"
            :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">
              &nbsp; &nbsp; &nbsp; &nbsp;只能上传jpg/png文件<i>(限制一张，如已选择图片，请务必删除后重新选择)</i>
            </span>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="p-update-btn" @click="updateInfo">确定修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  ProductgetAll,
  ProductGetInfoById,
  ProductRemove,
  ProductUpdate,
  ProductCategory,
  ProductBrandGetByCate,
  ProductGetTitle,
  ProductBrand,
  ProductGetByBrand,
  ProductGetInfoByTitle
} from "../../api/index.js";

const COS = require("cos-js-sdk-v5");
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  // 腾讯云份识别ID自己扫码查询
  SecretId: "AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz",
  // 身份秘钥
  SecretKey: "C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e",
});

export default {
  name: "ProductList",
  inject: ["reload"],
  data() {
    return {
      flag: "2",
      tabsIndex: "0",
      ivalue: "请输入商品名称",
      search: "",
      pageInfo: {
        pageNum: 1,
        pageSize: 8,
        pageTotal: 0,
        pageShow: true,
      },
      tableData: [],
      brandList: [],
      categoryList: [],
      labelPosition: "right",
      oldImg: "",
      oldCImg: "",
      // 上传图片的缩略图展示列表
      fileList: [],
      // 表单信息
      form: {
        pid: "",
        categoryId: "",
        brandId: "",
        title: "",
        subTitle: "",
        mainImg: "",
        createTime: "",
        updateTime: "",
        isCarousel: "",
        isRecommend: "",
        carouselImg: "",
      },

      multipleSelection: [],
      dialogData: [],
      carousel: true,
      recommend: false,
      loading: true,
      dialogTableVisible: false,
      cateNames: [],
    };
  },

  created() {
    this.getProductList();
    // 获取分类
    ProductCategory().then((res) => {
      this.categoryList = res.data;
    });
  },
  filters: {
    cateName(val) {
      if (val == 1001) return "手机";
      if (val == 1002) return "笔记本";
      if (val == 1003) return "电视";
      if (val == 1004) return "智能穿戴";
      if (val == 101) return "小米";
      if (val == 102) return "华为";
      if (val == 103) return "VIVO";
      if (val == 104) return "OPPO";
      if (val == 201) return "xxx";
      if (val == 202) return "aaa";
      if (val == 301) return "ccc";
      if (val == 401) return "sss";
    },
  },
  methods: {
    // 获取商品列表
    getProductList() {
      ProductgetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then(
        (res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.pageInfo.pageTotal = res.data.total;
          this.loading = false;
        }
      );
    },
    // 点击分类重新获取品牌
    typeRadio(radio) {
      this.form.brandId = "";
      ProductBrandGetByCate(radio).then((res) => {
        this.brandList = res.data[0].productBrand;
      });
    },
    sortSelect(brand) { },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection);
    },
    // 获取数据并展示
    pNum(val) {
      if (val == undefined) {
        val = 1;
      } else {
        val == val;
      }
      ProductgetAll(val, this.pageInfo.pageSize).then((res) => {
        this.tableData = res.data.list;
      });
    },

    // 商品详情
    detail(pid) {
      let i = pid;
      let index = this.tableData[i].pid;
      this.$router.push({
        path: "/BackendSystem/ProductDetail",
        query: {
          pid: index,
        },
      });
    },
    // 删除商品
    removeProduct(pid) {
      let index = pid;
      let listIndex = this.tableData[index].pid;
      this.$confirm("此操作将永久删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          ProductRemove(listIndex).then((res) => {
            // 重新获取数据
            this.getProductList();
          });
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => { });
    },

    // 修改按钮
    update(pid) {
      // 显示dialog
      this.dialogTableVisible = true;
      this.fileList = [];
      // 根据ID获取数据
      let pData = this.tableData[pid];
      console.log(pData);
      this.form.categoryId = pData.categoryId;
      this.form.brandId = pData.brandId;
      this.form.pid = pData.pid;
      this.form.mainImg = pData.mainImg;
      this.form.carouselImg = pData.carousel.carouselImg;
      this.form.title = pData.title;
      this.form.subTitle = pData.subTitle;
      this.form.createTime = pData.createTime;
      this.form.isCarousel = pData.isCarousel;
      this.form.isRecommend = pData.isRecommend;
    },
    // 确定修改信息，提交表单
    updateInfo() {
      if (this.form.title == "" || this.form.createTime == "") {
        this.$alert("不能为空");
      } else {
        // 重置图片列表
        this.fileList = [];
        // 重置选项
        this.tabsIndex = "0";
        this.form.mainImg = this.oldImg;
        this.form.carouselImg = this.oldCImg;
        ProductUpdate(this.form);
        this.$message({
          message: "修改成功",
          type: "success",
        });
        // 重新获取数据
        this.getProductList();
        // 模态框显示
        this.dialogTableVisible = false;
      }
    },

    // 分类格式化
    formatCate(row, column) {
      if (row.categoryId == 1001) return "手机";
      if (row.categoryId == 1002) return "笔记本";
      if (row.categoryId == 1003) return "电视";
      if (row.categoryId == 1004) return "手环";
    },

    // 品牌格式化
    formatBrand(row, column) {
      if (row.brandId == 101) return "小米";
      if (row.brandId == 102) return "华为";
      if (row.brandId == 103) return "VIVO";
      if (row.brandId == 104) return "OPPO";
      if (row.brandId == 201) return "xxx";
      if (row.brandId == 202) return "aaa";
      if (row.brandId == 301) return "ccc";
      if (row.brandId == 401) return "sss";
    },

    // 设置轮播图
    carouselChange(val, data) {
      if (data.carousel.carouselImg === null) {
        this.$alert("请先到修改中添加轮播图")
      } else {
        ProductUpdate(this.tableData[val]).then((res) => {
          if (res.code == 200) {
            this.getProductList();
          }
        });
      }

    },
    // 设置推荐
    recommendChange(val) {
      console.log(val);
    },

    //  上传图片到腾讯云对象储存
    upload(res) {
      if (!res.file) {
        return;
      }
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject(
        {
          Bucket: "leo-1310014300" /* 存储桶 */,
          Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
          Key: res.file.name /* 文件名 */,
          StorageClass: "STANDARD", // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100;
          },
        },
        (error, data) => {
          this.oldImg = "http://" + data.Location;
        }
      );
    },

    Cupload(res) {
      if (!res.file) {
        return;
      }
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject(
        {
          Bucket: "leo-1310014300" /* 存储桶 */,
          Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
          Key: res.file.name /* 文件名 */,
          StorageClass: "STANDARD", // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100;
          },
        },
        (error, data) => {
          this.oldCImg = "http://" + data.Location;

        }
      );
    },
    // 搜索商品
    searchInput(val) {
      this.loading = true;
      this.search = val;
      console.log(val);
      if (this.search != "") {
        ProductGetInfoByTitle(this.search).then((res) => {
          this.tableData = res.data.list;
          this.pageInfo.pageTotal = res.data.total;
          this.loading = false;
        });
      } else {
        this.getProductList();
      }
    },
    // 筛选商品
    searchBrand(val) {
      if (val != "") {
        ProductGetByBrand(val).then((res) => {
          // 不是空就获取数据
          if (res != "") {
            this.tableData = res[0].product;
            this.loading = true;
            this.pageInfo.pageShow = false;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          } else {
            this.tableData = [];
            this.pageInfo.pageShow = false;
          }
        });
      } else {
        // 重新获取数据
        this.getProductList();
        this.pageInfo.pageShow = true;
      }
    },
  },
};
</script>

<style scoped>
.product-list /deep/ .el-table thead {
  color: gray;
}

.product-list {
  padding: 20px;
}

.product-list /deep/ .el-table--border::after,
.product-list /deep/ .el-table--group::after,
.product-list /deep/ .el-table::before {
  z-index: 0;
}

.product-list /deep/.el-form {
  position: relative;
  top: 30px;
  right: 50px;
  width: 70%;
  height: 351px;
  margin: auto;
}

.product-list /deep/.el-icon-circle-close:hover {
  color: #f56c6c;
}

.product-list /deep/.el-tabs__nav-scroll {}

.product-list /deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 0px;
}

.product-list /deep/.el-tabs {
  height: 80% !important;
  position: relative;
}

.product-list /deep/.el-image {
  position: relative;
  top: 0px;
  left: 50px;
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.product-list /deep/.el-form {
  margin-top: -30px;
}

.product-list /deep/.upload-demo {
  padding: 40px 50px 0px 50px;
}

.p-update-btn {
  width: 180px;
  position: relative;
  left: 250px;
  top: 20px;
}

.product-page {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.product-list /deep/ .el-dialog {
  margin-top: 5vh !important;
  height: 500px;
  width: 50%;
  border-radius: 5px;
}

.product-list /deep/ .upload-demo {
  width: 500px;
  height: 145px;
  padding: 20px 0px 0px 30px;
}
</style>