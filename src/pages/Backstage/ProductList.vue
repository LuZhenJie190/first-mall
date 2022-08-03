<template>
  <div class="product-list">
    <!-- 搜索和批量删除按钮 -->
    <BackstageSearch @searchInput="searchInput" @brand="searchBrand" :inputValue="ivalue" @datchDelete="datchDelete"
      :screenShow="screenShow">
    </BackstageSearch>
    <!-- 表格 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination"
      @handleSelectionChange="handleSelectionChange" :tableLabelImg="tableLabelImg" @changePage="getProductList">
      <el-table-column label="操作" width="auto" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="detail(scope.row)">参数</el-button>
          <el-button size="mini" @click="editProduct(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>

    <el-dialog title="编辑信息" :visible.sync="dialogTableVisible">
      <common-form :formData="form" :formLabel="formLabel" :inline="true" :labelWidth="labelWidth">
        <!-- 主图区 -->
        <el-form-item label="主图：">
          <div class="uploadImg" style="width:500px;display: flex">
            <el-image style="width:150px;height: 150px;" :src="form.mainImg">
              <div slot="error" class="image-slot">
                <span>暂无图片</span>
              </div>
            </el-image>
            <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove" :on-progress="handleProgress" :http-request="upload"
              :file-list="mainUpload.fileList" :limit="1">
              <span>点击修改</span>
            </el-upload>
            <el-dialog :visible.sync="mainUpload.dialogVisible">
              <img width="80%" :src="mainUpload.dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <!-- 轮播图区 -->
        <el-form-item label="轮播图：" style="margin-top:10px">
          <div class="uploadImg" style="width:100%;display: flex">
            <el-image style="width:300px;height: 150px;" :src="carouselUpload.carouselImage">
              <div slot="error" class="image-slot">
                <span>暂无图片</span>
              </div>
            </el-image>
            <el-upload action="" list-type="picture-card" :on-preview="handleCarouselPictureCardPreview"
              :on-remove="handleCarouselRemove" :http-request="Cupload" :file-list="carouselUpload.fileList" :limit="1">
              <span>点击修改</span>
            </el-upload>
            <el-dialog :visible.sync="carouselUpload.dialogVisible">
              <img width="80%" :src="carouselUpload.dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
      </common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateCancel">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ProductgetAll,
  ProductRemove,
  ProductUpdate,
  ProductCategory,
  ProductBrandGetByCate,
  ProductGetByBrand,
  ProductGetInfoByTitle,
  ProductDatchDelete
} from "../../api/product";
import CommonForm from '../../components/Backstage/CommonForm.vue';
// import Paging from "../../components/Backstage/Paging.vue";
import CommonTable from '../../components/Backstage/CommonTable.vue';
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
  components: { CommonTable, CommonForm },
  data() {
    return {
      mainUpload: {
        fileList: [],
        dialogVisible: false,
        dialogImageUrl: '',
        newImg: ""
      },
      carouselUpload: {
        fileList: [],
        dialogVisible: false,
        dialogImageUrl: '',
        carouselImage: '',
        newImg: ""
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
        loading: false
      },
      formSearchData: {},
      formSearch: [],
      tableLabel: [
        { label: "ID", prop: "pid", width: 80, sortable: true },
        { label: "品类", prop: "cateLabel", width: 70 },
        { label: "品牌", prop: "brandLabel", width: 70 },
        { label: "名称", prop: "title", width: 150 },
        { label: "简介", prop: "subTitle", width: 'auto' },
        { label: "创建时间", prop: "createTime", width: 170 },
        { label: "轮播图", prop: "carouselLabel", width: 70 },
        { label: "推荐", prop: "recommendLabel", width: 60 },

      ],
      tableLabelImg: [
        { label: "主图", prop: "mainImg", width: 105 },
      ],
      flag: "2",
      tabsIndex: "0",
      ivalue: "请输入商品名称",
      search: "",
      tableData: [],
      brandList: [],
      categoryList: [],
      oldImg: "",
      oldCImg: "",
      labelWidth: "120px",
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
      formLabel: [
        { label: '类型：', type: 'tag', model: "cateLabel", tagType: "success" },
        { label: '品牌：', type: 'tag', model: "brandLabel" },
        { label: '名称：', type: 'input', model: "title" },
        { label: '简介：', type: 'textarea', model: "subTitle" },
        { label: '创建时间：', type: 'input', model: "createTime" },
        { label: '轮播图：', type: 'switch', model: "isCarousel" },
        { label: '推荐', type: 'switch', model: "isRecommend" },
      ],
      multipleSelection: [],
      dialogTableVisible: false,
      screenShow: true
    };
  },
  created() {
    this.getProductList();
    // 获取分类
    ProductCategory().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    // 批量删除
    datchDelete() {
      if (this.multipleSelection.length) {
        const result = this.multipleSelection.map(item => {
          return item.pid;
        })
        this.$confirm("是否删除选中?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          ProductDatchDelete(result).then(res => {
            if (res.code == 200) {
              this.$message({
                message: `成功删除${result.length}件商品`,
                type: "success",
              });
              this.getProductList();
            }
          })
        })
      } else {
        this.$alert("至少勾选一项")
      }
    },

    handleCarouselRemove(file, fileList) { },

    handleCarouselPictureCardPreview(file) {
      this.carouselUpload.dialogImageUrl = file.url;
      this.carouselUpload.dialogVisible = true;
    },

    handleRemove(file, fileList) { },

    handlePictureCardPreview(file) {
      this.carouselUpload.dialogImageUrl = file.url;
      this.carouselUpload.dialogVisible = true;
    },
    handleProgress(event, file, fileList) {
      console.log(file);
    },
    // 命名格式化
    nameFilter1(resArr) {
      const result = resArr.map(item => {
        item.isCarousel === 0 ? item.carouselLabel = '×' : item.carouselLabel = '√';
        item.isRecommend === 0 ? item.recommendLabel = '×' : item.recommendLabel = '√';

        if (item.categoryId === 1001) {
          item.cateLabel = "手机"
        } else if (item.categoryId === 1002) {
          item.cateLabel = "笔记本"
        } else if (item.categoryId === 1003) {
          item.cateLabel = "电视"
        } else if (item.categoryId === 1004) {
          item.cateLabel = "手环"
        }

        if (item.brandId == 101) {
          item.brandLabel = "小米"
        } else if (item.brandId == 102) {
          item.brandLabel = "华为"
        } else if (item.brandId == 102 || item.brandId == 402) {
          item.brandLabel = "华为"
        } else if (item.brandId == 103) {
          item.brandLabel = "VIVO"
        } else if (item.brandId == 104) {
          item.brandLabel = "OPPO"
        } else if (item.brandId == 201) {
          item.brandLabel = "xxx"
        } else if (item.brandId == 202) {
          item.brandLabel = "aaa"
        } else if (item.brandId == 301) {
          item.brandLabel = "ccc"
        } else if (item.brandId == 302) {
          item.brandLabel = "创维"
        } else if (item.brandId == 401) {
          item.brandLabel = "sss"
        }
        return item;
      });
      return result;
    },

    // 获取商品列表
    getProductList() {
      this.pagination.loading = true;
      ProductgetAll({ pageNum: this.pagination.page, pageSize: this.pagination.size }).then((res) => {
        this.tableData = this.nameFilter1(res.data.list);
        this.pagination.total = res.data.total;
        this.pagination.loading = false;
      });
    },

    // 点击分类重新获取品牌
    typeRadio(radio) {
      this.form.brandId = "";
      ProductBrandGetByCate(radio).then((res) => {
        this.brandList = res.data[0].productBrand;
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
      else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 商品详情
    detail(row) {
      this.$router.push({
        path: "/BackendSystem/ProductDetail",
        query: {
          pid: row.pid,
        },
      });
    },

    // 删除商品
    removeProduct(row) {
      this.$confirm("此操作将永久删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          ProductRemove(row.pid).then((res) => {
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
    editProduct(row) {
      console.log(row);
      // 显示dialog
      this.dialogTableVisible = true;
      this.fileList = [];
      this.carouselUpload.carouselImage = row.carousel.carouselImg;
      const result = this.nameFilter1([row]);
      this.form = { ...result }[0];
      this.form.isCarousel === 0 ? this.form.isCarousel = false : this.form.isCarousel = true;
      this.form.isRecommend === 0 ? this.form.isRecommend = false : this.form.isRecommend = true;

    },

    // 确定修改信息，提交表单
    updateInfo() {
      if (this.form.title == "" || this.form.createTime == "") {
        this.$alert("不能为空");
      }
      else {
        // 重置图片列表
        this.mainUpload.fileList = [];
        this.carouselUpload.fileList = [];
        this.form.isCarousel === false ? this.form.isCarousel = 0 : this.form.isCarousel = 1;
        this.form.isRecommend === false ? this.form.isRecommend = 0 : this.form.isRecommend = 1;
        this.form.mainImg = this.mainUpload.newImg;
        this.form.carouselImg = this.carouselUpload.newImg;
        console.log(this.form);
        ProductUpdate(this.form).then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 重新获取数据
            this.getProductList();
            this.updateCancel();
          }

        });
      }

    },

    // 取消修改
    updateCancel() {
      this.dialogTableVisible = false;
      this.getProductList();
    },

    // // 分类格式化
    // formatCate(row, column) {
    //   if (row.categoryId == 1001)
    //     return "手机";
    //   if (row.categoryId == 1002)
    //     return "笔记本";
    //   if (row.categoryId == 1003)
    //     return "电视";
    //   if (row.categoryId == 1004)
    //     return "手环";
    // },
    // // 品牌格式化
    // formatBrand(row, column) {
    //   if (row.brandId == 101)
    //     return "小米";
    //   if (row.brandId == 102)
    //     return "华为";
    //   if (row.brandId == 103)
    //     return "VIVO";
    //   if (row.brandId == 104)
    //     return "OPPO";
    //   if (row.brandId == 201)
    //     return "xxx";
    //   if (row.brandId == 202)
    //     return "aaa";
    //   if (row.brandId == 301)
    //     return "ccc";
    //   if (row.brandId == 401)
    //     return "sss";
    // },
    // 设置轮播图
    carouselChange(val, data) {
      if (data.carousel.carouselImg === null) {
        this.$alert("请先到修改中添加轮播图");
      }
      else {
        ProductUpdate(this.tableData[val]).then((res) => {
          if (res.code == 200) {
            this.getProductList();
          }
        });
      }
    },

    // 设置推荐
    recommendChange(val) {
      ProductUpdate(this.tableData[val]).then((res) => {
        if (res.code == 200) {
          this.getProductList();
        }
      });
    },
    //  上传图片到腾讯云对象储存
    upload(res) {
      if (!res.file) {
        return;
      }
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject({
        Bucket: "leo-1310014300" /* 存储桶 */,
        Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
        Key: res.file.name /* 文件名 */,
        StorageClass: "STANDARD",
        Body: res.file,
        onProgress: (progressData) => {
          this.percentage = progressData.percent * 100;
        },
      }, (error, data) => {
        this.mainUpload.newImg = "http://" + data.Location;
      });
    },
    Cupload(res) {
      if (!res.file) {
        return;
      }
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject({
        Bucket: "leo-1310014300" /* 存储桶 */,
        Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
        Key: res.file.name /* 文件名 */,
        StorageClass: "STANDARD",
        Body: res.file,
        onProgress: (progressData) => {
          this.percentage = progressData.percent * 100;
        },
      }, (error, data) => {
        this.carouselUpload.newImg = "http://" + data.Location;
      });
    },
    // 搜索商品
    searchInput(val) {
      this.loading = true;
      this.search = val;
      if (this.search) {
        ProductGetInfoByTitle(this.search).then((res) => {
          this.tableData = res.data;
          this.nameFilter1(this.tableData)
          this.pagination.total = res.data.length;
          this.screenShow = false;
          this.loading = false;
        });
      }
      else {
        this.getProductList();
        this.screenShow = true;
      }
    },

    // 筛选商品
    searchBrand(val) {
      if (val) {
        ProductGetByBrand(val).then((res) => {
          // 不是空就获取数据
          if (res) {
            this.loading = true;
            this.tableData = res[0].product;
            this.pagination.total = this.tableData.length;
            this.nameFilter1(this.tableData);

            this.loading = false;
          }
        });
      }
      else {
        // 重新获取数据
        this.getProductList();

      }
    },
  },
};
</script>

<style scoped>
.product-list {
  height: 100%;
}

.el-image {
  padding-right: 10px;
}

.product-list /deep/ .el-dialog {
  margin-top: 2vh !important;
}
</style>