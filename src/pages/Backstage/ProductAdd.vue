<template>
  <div id="add-product">
    <div class="addForm">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>

      <common-form v-show="active === 0" :formData="form" :formLabel="formLabel" :inline="false" labelWidth="100px"
        @typeRadio="typeRadio" :rules="rules">
        <!-- 主图区 -->
        <el-form-item label="主图：">
          <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :http-request="upload" :file-list="mainUpload.fileList" :limit="1">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过一张</div>
            <span>点击添加</span>
          </el-upload>
          <el-dialog :visible.sync="mainUpload.dialogVisible">
            <img width="80%" :src="mainUpload.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <!-- 轮播图区 -->
        <el-form-item label="轮播图：" style="margin-top:10px">
          <el-upload action="" list-type="picture-card" :on-preview="handleCarouselPictureCardPreview"
            :on-remove="handleCarouselRemove" :http-request="Cupload" :file-list="carouselUpload.fileList" :limit="1">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过一张</div>
            <span>点击添加</span>
          </el-upload>
          <el-dialog :visible.sync="carouselUpload.dialogVisible">
            <img width="80%" :src="carouselUpload.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <!-- 设置区 -->
        <el-form-item label="展示设置：">
          <el-checkbox label="轮播图" v-model="form.isCarousel"></el-checkbox>
          <el-checkbox label="每日推荐" v-model="form.isRecommend"></el-checkbox>
          <el-form-item>
          </el-form-item>
        </el-form-item>
      </common-form>

      <common-form v-show="active === 1" ref="form" :formData="form" :inline="false" labelWidth="100px">
        <el-form-item label="销售参数：">
          <div class="writeParam">
            <el-input style="width:130px;margin:10px 2px" v-for="item in FormParamLabel" :key="item.label"
              :type="item.type" :placeholder="'请输入' + item.label" v-model="paramForm[item.prop]" clearable>
            </el-input>
            <el-button type="primary" @click="addParams">确定</el-button>
          </div>
          <!-- 嵌套表格 -->
          <el-table :data="tableData" border>
            <el-table-column v-for="item in FormParamLabel" :key="item.label" :prop="item.prop" :label="item.label">
              <template slot-scope="scope">
                <span>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button type="default" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="参数图片：">
          <el-upload class="upload-demo" action="#" :http-request="pUpload" list-type="picture-card"
            :file-list="imageList" :limit="5" multiple>
            <i slot="default" class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip" style="margin-top: -5px; font-weight: bold">
              只能上传jpg/png文件，限定五张
            </div>
          </el-upload>
        </el-form-item>
      </common-form>

      <div style="text-align: center" v-show="active === 2">
        <h1 style="line-height:60px;font-size:28px">提交成功</h1>
      </div>
    </div>
    <span style="display:flex">
      <el-button type="primary" style="margin-left:47%" @click="next('form')">{{ active === 2 ? '完成'
          : '下一步'
      }}
      </el-button>
      <el-button v-if="active === 1" type="primary" @click="prev('form')">上一步
      </el-button>
    </span>


  </div>
</template>

<script>
import {
  ProductAdd,
  ProductParamsAdd,
  ProductImageAdd,
  ProductGetCate,
  CateGetBrand
} from "../../api/product";
import { getnowDate } from "../../utils/index";
import CommonForm from "../../components/Backstage/CommonForm.vue";

const COS = require("cos-js-sdk-v5");
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz", // 腾讯云份识别ID自己扫码查询
  SecretKey: "C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e", // 身份秘钥
});
export default {
  components: { CommonForm },
  inject: ["reload"],
  name: "ProductAdd",
  data() {
    return {
      FormParamLabel: [
        { prop: 'pmColor', label: '颜色', type: 'input' },
        { prop: 'pmVersion', label: '规格', type: 'input' },
        { prop: 'price', label: '价格', type: 'number' },
        { prop: 'stock', label: '数量', type: 'number' },

      ],
      changeTable: true,
      tableData: [],
      category: [],
      brand: [],
      fileList: [],
      imageList: [],
      form: {
        categoryId: "",
        brandId: "",
        title: "",
        subTitle: "",
        mainImg: "",
        createTime: "",
        updateTime: "",
        isCarousel: false,
        isRecommend: false,
        carouselImg: ""
      },
      formLabel: [
        { label: "商品类型：", type: "radio", model: "categoryId", radios: [] },
        { label: "商品品牌：", type: "select", model: "brandId", opts: [] },
        { label: "商品名称：", type: "input", model: "title" },
        { label: "商品简介：", type: "textarea", model: "subTitle" },
      ],

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
      pageNum: 1,
      pageSize: 100,
      rules: {
        categoryId: [
          { required: true, message: "请选择品类", trigger: "change" },
        ],
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        title: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        subTitle: [
          { required: true, message: "简介不能为空", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        count: [{ required: true, message: "数量不能为空", trigger: "blur" }],
        color: [{ required: true, message: "颜色不能为空", trigger: "blur" }],
        versions: [
          { required: true, message: "版本不能为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      paramList: [],
      paramForm: {
        productId: "",
        price: "",
        stock: "",
        pmColor: "",
        pmVersion: "",
      },
      paramShow: false,
      checkList: [],
      boxItem0: 0,
      boxItem1: 1,
      paramsContext: false,
      imageInfo: {
        name: "",
        productId: "",
      },
      loading3: false,
      active: 0,
    };
  },
  created() {
    // 获取当前时间
    this.getTime();
    // 获取分类
    ProductGetCate().then((res) => {
      // console.log(res);
      this.formLabel[0].radios = this.category = res.data;
      this.formLabel[0].radios.forEach(item => {
        item.label = item.categoryName
        item.value = item.categoryId
      })
    });

  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    edit(val) {

    },
    del(val) {
      this.tableData.splice(val, 1);
    },

    async next(formName) {
      // 当第二面时
      if (this.active == 1) {
        if (this.form.mainImg != "") {
          this.form.isCarousel === true ? (this.form.isCarousel = 1) : (this.form.isCarousel = 0);
          this.form.isRecommend === true ? (this.form.isRecommend = 1) : (this.form.isRecommend = 0);
          // 当参数和图片不为空时，才调用接口
          if (this.imageList.length != 0 && this.tableData.length != 0) {
            const result = await ProductAdd(this.form);
            if (result.code == 200) {
              this.tableData.forEach(item => {
                item.productId = result.data.pid
              })
              this.imageList.forEach(item => {
                item.productId = result.data.pid
                item.name = result.data.title;
              })
              ProductImageAdd(this.imageList);
              ProductParamsAdd(this.tableData);
              this.$alert("添加成功");
            } else {
              this.$alert(`${result.message}`)
              this.active = 0;
            }
          } else {
            this.$alert("请添加参数和图片");
            this.active = 0;
          }
        } else {
          this.$alert("请添加主图")
          this.active = -1;
        }
      }
      // this.$refs[formName].$children[0].validate((valid) => {
      //   if (valid) {
      //     if (this.imageList.length != 0 && this.paramList.length != 0) {
      //       ProductImageAdd(this.imageList);
      //       ProductParamsAdd(this.paramList);
      //       this.$alert("添加成功");
      //       // 重置表单
      //       this.reload();
      //     } else {
      //       // this.active = 0;
      //       this.$alert("请添加图片和参数");
      //     }
      //   } else {
      //     return false;
      //   }
      // });
      if (this.active++ === 2) this.active = 0;
    },
    prev() {
      if (this.active >= -1) {
        this.active--;
      } else {
        this.active = -1;
      }

    },
    handleCarouselRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handleCarouselPictureCardPreview(file) {
      this.carouselUpload.dialogImageUrl = file.url;
      this.carouselUpload.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.carouselUpload.dialogImageUrl = file.url;
      this.carouselUpload.dialogVisible = true;
    },
    // 点击添加参数
    getParams() {
      if (this.form.mainImg != "") {
        this.form.isCarousel === true
          ? (this.form.isCarousel = 1)
          : (this.form.isCarousel = 0);
        this.form.isRecommend === true
          ? (this.form.isRecommend = 1)
          : (this.form.isRecommend = 0);

        ProductAdd(this.form).then((res) => {
          if (res.code == 200) {
            this.paramForm.productId = res.data.pid;
            // this.paramsContext = true;
            this.imageInfo.productId = res.data.pid;
            this.imageInfo.name = res.data.title;
          } else {
            this.$alert(`${res.message}`);
          }
        });
      } else {
        this.$alert("请上传图片！");
      }
    },
    // 删除参数项
    deleteParam(index) {
      this.paramList.splice(index, 1);
    },
    // 添加参数到数组
    addParams() {
      // this.paramShow = true;
      if (
        this.paramForm.pmColor != "" &&
        this.paramForm.pmVersion != "" &&
        this.paramForm.price != "" &&
        this.paramForm.stock != ""
      ) {
        // let pdata = JSON.parse(JSON.stringify(this.paramForm));
        this.tableData.push(this.paramForm);
        // // this.paramShow = false;
        // this.paramForm.pmColor = "";
        // this.paramForm.pmVersion = "";
        // this.paramForm.price = "";
        // this.paramForm.stock = "";
        console.log(this.tableData);
      }
    },
    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.form.createTime = getnowDate();
      }, 500);
    },
    // 商品类型
    typeRadio(radio) {
      // 根据分类获取品牌
      CateGetBrand(radio).then((res) => {
        res.data.forEach((e) => {
          e.categoryId === radio ? this.formLabel[1].opts = e.productBrand : [];
          this.formLabel[1].opts.forEach(item => {
            item.label = item.brandName
            item.value = item.brandId
          })
        })

      });
    },
    // 提交添加表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.imageList.length != 0 && this.paramList.length != 0) {
            ProductImageAdd(this.imageList);
            ProductParamsAdd(this.paramList);
            this.$alert("添加成功");
            // 重置表单
            this.reload();
          } else {
            this.$alert("请添加图片和参数");
          }
        } else {
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.reload();
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
        this.form.mainImg = "http://" + data.Location;

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

        this.form.carouselImg = "http://" + data.Location;

      });
    },
    pUpload(res) {
      this.loading3 = true;
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
          this.imageList.push({
            name: this.imageInfo.name,
            productId: this.imageInfo.productId,
            url: "http://" + data.Location,
          });
          console.log(this.imageList)
        }
      );
    },

  },
};
</script>

<style scoped>
#add-product {
  height: 600px;
  overflow: auto;
}

.addForm {
  width: 720px;
  margin: auto;
}

/* .addForm {
  width: 40%;
  margin: 0px 100px 0px 50px;
}

.product-info {
  width: 1000px;
  display: flex;
  overflow: hidden;
}

.addForm .el-form-item {
  margin-bottom: 20px;
}

.p_submit {
  width: 100px;
  margin-top: 50px;
  margin-left: 30px;
}

.el-upload-list--picture .el-upload-list__item:focus {
  border-color: #409eff;
}

.params {
  width: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.params-th {
  display: flex;
}

.params-th li {
  border: 1px solid #eee;
  padding: 0 60px;
  color: gray;
  font-weight: 600;
  box-sizing: border-box;
}

.params-tr {
  display: flex;
}

.params-tr li {
  border: 1px solid #eee;
  box-sizing: border-box;
  width: 600px;
  text-align: center;
}

.params-tr /deep/ input {
  border: none;
}

.param-btn {
  width: 100px;
}

.dd {
  position: absolute;
  right: 70px;
  line-height: 40px;
  transform: scale(1.2, 1.2);
  color: #ccc;
  cursor: pointer;
}

.paramsContext {
  padding-top: 30px;
  width: 75vw;
} */
</style>