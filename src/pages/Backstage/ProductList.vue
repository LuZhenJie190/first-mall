<template>
  <div class="product-list">
    <!-- 搜索和批量删除按钮 -->
    <BackstageSearch
      @searchInput="searchInput"
      :inputValue="ivalue"
      :multipleSelection="multipleSelection"
      :flag="flag"
    >
    </BackstageSearch>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      border
      ref="multipleTable"
      height="490"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="pid" label="商品ID" width="100" fixed="left" />
      <el-table-column prop="categoryId" label="品类" width="100" />
      <el-table-column prop="brandId" label="品牌" width="100" />
      <el-table-column prop="title" label="名称" width="150" />
      <el-table-column prop="mainImg" label="主图" width="105">
        <template slot-scope="scope">
          <img
            :src="scope.row.mainImg"
            alt=""
            style="width: 60px; height: 55px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格(￥)" width="160" />
      <el-table-column prop="count" label="数量" width="160" />
      <el-table-column prop="color" label="颜色" width="160" />
      <el-table-column prop="versions" label="版本" width="160" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="159" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.$index)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeProduct(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="product-page">
      <Paging @pNum="pNum" :pageInfo="pageInfo" />
    </div>

    <!-- 修改弹框 -->
    <div class="p-model-update" v-show="modelShow">
      <div class="p-model-bg"></div>
      <div class="p-model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
        <el-tabs tab-position="left" style="height: 200px" v-model="tabsIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form label-width="100px" v-model="form">
              <el-form-item label="商品类型：" style="width: 300px">
                <el-radio
                  v-for="cateid in categoryList"
                  :key="cateid.categoryId"
                  v-model="form.categoryId"
                  :label="String(cateid.categoryId)"
                  @change="typeRadio(form.categoryId)"
                  >{{ cateid.categoryName }}</el-radio
                >
              </el-form-item>
              <el-form-item label="商品品牌：">
                <el-select
                  v-model="form.brandId"
                  placeholder="请选择"
                  @change="sortSelect(form.brandId)"
                >
                  <el-option
                    v-for="item in brandList"
                    :key="item.pbid"
                    :label="item.brandName"
                    :value="item.brandId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名称：">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="商品简介：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 2 }"
                  v-model="form.subTitle"
                ></el-input>
              </el-form-item>
              <el-form-item label="创建时间：">
                <el-input v-model="form.createTime"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="1">
            <el-image :src="form.mainImg"></el-image>
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="upload"
              :file-list="fileList"
              list-type="picture"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <span slot="tip" class="el-upload__tip">
                &nbsp; &nbsp; &nbsp; &nbsp;只能上传jpg/png文件
              </span>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="详情参数" name="2">
            <el-form label-width="100px" :inline="true">
              <el-form-item label="价格(￥)：">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item label="颜色：">
                <el-input v-model="form.color"></el-input>
              </el-form-item>
              <el-form-item label="版本：">
                <el-input v-model="form.versions"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="p-update-btn" @click="updateInfo"
          >确定修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  ProductgetAll,
  ProductgetById,
  ProductRemove,
  ProductUpdate,
  ProductCategory,
  ProductBrand,
  ProductGetTitle,
  ProductCategoryGetByBrand,
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
      ivalue: "请输入商品编码",
      search: "",
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        pageTotal: 0,
        pageShow: true,
      },
      tableData: [],
      brandList: [],
      categoryList: [],
      labelPosition: "right",
      modelShow: false,
      oldImg: "",
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
        price: "",
        count: "",
        createTime: "",
        updateTime: "",
        color: "",
        versions: "",
      },
      multipleSelection: [],
    };
  },

  created() {
    // 获取商品信息
    ProductgetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then((res) => {
      this.tableData = res.list;
      this.pageInfo.pageTotal = res.total;
      this.nameFilter();
    });
    // 获取分类
    ProductCategory().then((res) => {
      this.categoryList = res;
    });
  },
  methods: {
    // 点击分类重新获取品牌
    typeRadio(radio) {
      ProductCategoryGetByBrand(radio).then((res) => {
        this.brandList = res[0].productBrand;
      });
    },
    sortSelect(brand) {
      // console.log(brand);
    },
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
        this.tableData = res.list;
        this.nameFilter();
      });
    },
    // 重命名
    nameFilter() {
      //分类名
      ProductCategory().then((res) => {
        res.forEach((e) => {
          this.tableData.forEach((el) => {
            if (el.categoryId == e.categoryId) el.categoryId = e.categoryName;
          });
        });
      });
      //品牌名
      ProductBrand(1, 1000).then((res) => {
        res.list.forEach((e) => {
          console.log("e", e);
          this.tableData.forEach((ele) => {
            console.log("ele", ele);
            if (ele.brandId == e.brandId) ele.brandId = e.brandName;
          });
        });
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
          ProductRemove(listIndex);
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.reload();
          // 重新获取数据
          this.timer = setTimeout(() => {
            this.getProductList();
          }, 500);
        })
        .catch(() => {});
    },
    // 修改按钮
    update(pid) {
      let index = pid;
      // 获取当前的id
      let listIndex = this.tableData[index].pid;
      // 根据ID获取数据
      ProductgetById(listIndex).then((res) => {
        this.form.categoryId = res.categoryId;
        this.form.brandId = res.brandId;
        this.form.pid = res.pid;
        this.form.mainImg = res.mainImg;
        this.form.title = res.title;
        this.form.subTitle = res.subTitle;
        this.form.price = res.price;
        this.form.versions = res.versions;
        this.form.color = res.color;
        this.form.count = res.count;
        this.form.createTime = res.createTime;

        // 根据第一次加载的分类获取品牌
        ProductCategoryGetByBrand(this.form.categoryId).then((res) => {
          this.brandList = res[0].productBrand;
          // 命名格式化
          this.brandList.forEach((e) => {
            if (this.form.brandId == e.brandId) {
              this.form.brandId = e.brandName;
            }
          });
        });
      });
      // 模态框显示
      this.modelShow = true;
    },
    // 确定修改信息，提交表单
    updateInfo() {
      let {
        pid,
        categoryId,
        brandId,
        title,
        subTitle,
        mainImg,
        price,
        count,
        createTime,
        updateTime,
        color,
        versions,
      } = this.form;
      if (
        title == "" ||
        mainImg == "" ||
        price == "" ||
        count == "" ||
        color == "" ||
        versions == "" ||
        createTime == ""
      ) {
        this.$alert("不能为空");
      } else {
        // this.$alert("修改成功");
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fileList = [];
        this.tabsIndex = "0";
        ProductUpdate(
          pid,
          categoryId,
          brandId,
          title,
          subTitle,
          mainImg,
          price,
          count,
          createTime,
          updateTime,
          color,
          versions
        ).then((res) => {
          console.log(res);
        });
        ProductgetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then(
          (res) => {
            this.tableData = res.list;
            this.nameFilter();
          }
        );
        this.reload();
        this.modelShow = false;
      }
    },
    // 关闭模态框
    mShow() {
      this.modelShow = false;
      this.fileList = [];
      this.tabsIndex = "0";
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
    // 搜索商品编号
    searchInput(val) {
      console.log(val);
      this.search = val;
      if (this.search != "") {
        ProductGetTitle(this.search).then((res) => {
          this.tableData = res;
          this.nameFilter();
          this.pageInfo.pageShow = false;
        });
      } else {
        ProductgetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then(
          (res) => {
            this.tableData = res.list;
            this.nameFilter();
          }
        );
        this.pageInfo.pageShow = true;
      }
    },
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}
.product-list /deep/ .el-table--border::after,
.product-list /deep/ .el-table--group::after,
.product-list /deep/ .el-table::before {
  z-index: 0;
}
.p-model-bg {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
.p-model-context {
  width: 40%;
  height: 460px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  left: 500px;
  z-index: 5;
}
.product-list /deep/.el-form {
  position: relative;
  top: 50px;
  right: 50px;
  width: 70%;
  height: 500px;
  margin: auto;
}
.product-list /deep/.el-icon-circle-close {
  transform: scale(2, 2);
  position: absolute;
  right: 15px;
  top: 15px;
  color: gray;
  cursor: pointer;
  z-index: 10;
}
.product-list /deep/.el-icon-circle-close:hover {
  color: #f56c6c;
}
.product-list /deep/.el-tabs__nav-scroll {
  margin-top: 20px;
}
.product-list /deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 0px;
}
.product-list /deep/.el-tabs {
  height: 80% !important;
  margin-top: 20px;
}

.product-list /deep/.el-image {
  position: relative;
  top: 25px;
  left: 50px;
  width: 250px;
  height: 250px;
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
  left: 230px;
  top: 10px;
}
.product-page {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>