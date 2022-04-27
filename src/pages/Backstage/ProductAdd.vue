<template>
  <div id="add-product">
    <div class="addForm">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="商品类型：" prop="categoryId">
          <el-radio-group v-model="form.categoryId">
            <el-radio
              v-for="item in category"
              :key="item.pcid"
              v-model="form.categoryId"
              :label="item.categoryId"
              @change="typeRadio(form.categoryId)"
              >{{ item.categoryName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="brandId">
          <el-select
            v-model="form.brandId"
            placeholder="请选择"
            @change="sortSelect(form.brandId)"
          >
            <el-option
              v-for="item in brand"
              :key="item.pbid"
              :label="item.brandName"
              :value="item.brandId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品简介：" prop="subTitle">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" style="width: 1200px; height: 180px">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upload"
            list-type="picture-card"
            :file-list="fileList"
            :limit="1"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div
              class="el-upload__tip"
              slot="tip"
              style="margin-top: -5px; font-weight: bold"
            >
              只能上传jpg/png文件，限定一张
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示设置：">
          <el-checkbox label="轮播图" v-model="form.isCarousel"></el-checkbox>
          <el-checkbox
            label="每日推荐"
            v-model="form.isRecommend"
          ></el-checkbox>
          <el-form-item>
            <el-button
              type="primary"
              @click="getParams"
              v-show="paramsContext === false"
              >点击添加参数</el-button
            >
          </el-form-item>
        </el-form-item>
        <div class="paramsContext" v-show="paramsContext" v-loading="loading3">
          <el-form-item label="详情图片：" style="width: 1200px; height: 180px">
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="pUpload"
              list-type="picture-card"
              :file-list="imageList"
              :limit="5"
              multiple
            >
              <i slot="default" class="el-icon-plus"></i>
              <div
                class="el-upload__tip"
                slot="tip"
                style="margin-top: -5px; font-weight: bold"
              >
                只能上传jpg/png文件，限定五张
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品参数：" style="width: 800px">
            <div class="params">
              <ul class="params-th">
                <li>颜色</li>
                <li>版本</li>
                <li>价格</li>
                <li>库存</li>
              </ul>
              <ul
                class="params-tr"
                v-for="(item, index) in paramList"
                :key="index"
              >
                <li>{{ item.color }}</li>
                <li>{{ item.version }}</li>
                <li>{{ item.price }}</li>
                <li>{{ item.stock }}</li>
                <i @click="deleteParam(index)" class="el-icon-close dd"></i>
              </ul>
              <ul class="params-tr" v-show="paramShow">
                <li>
                  <el-input v-model="paramForm.pmColor"></el-input>
                </li>
                <li>
                  <el-input v-model="paramForm.pmVersion"></el-input>
                </li>
                <li>
                  <el-input v-model="paramForm.price"></el-input>
                </li>
                <li>
                  <el-input v-model="paramForm.stock"></el-input>
                </li>
              </ul>
              <el-button
                class="param-btn"
                type="primary"
                plain
                size="mini"
                @click="addParams"
                ><i class="el-icon-plus"></i
              ></el-button>
            </div>
          </el-form-item>
        </div>

        <el-form-item style="margin-top: -18px">
          <el-button class="p_submit" type="primary" @click="submitForm('form')"
            >提交</el-button
          >
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  ProductAdd,
  ProductCategory,
  ProductBrandGetByCate,
  ProductParamsAdd,
  ProductImageAdd,
} from "../../api/index";
import { MessageBox } from "element-ui";
import { getnowDate } from "../../utils/index";
const COS = require("cos-js-sdk-v5");
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz", // 腾讯云份识别ID自己扫码查询
  SecretKey: "C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e", // 身份秘钥
});
export default {
  inject: ["reload"],
  name: "ProductAdd",
  data() {
    return {
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
            max: 50,
            message: "长度在 2 到 50 个字符",
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
    };
  },
  created() {
    this.getTime();
    ProductCategory().then((res) => {
      this.category = res.data;
    });
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
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
            this.paramsContext = true;
            this.imageInfo.productId = res.data.pid;
            this.imageInfo.name = res.data.title;
          } else {
            this.$alert(`${res.message}`);
          }
        });
      } else {
        this.$alert("请上传图片！");
      }
      console.log(this.paramForm.productId);
    },
    // 删除参数项
    deleteParam(index) {
      this.paramList.splice(index, 1);
    },
    // 添加参数到数组
    addParams() {
      this.paramShow = true;
      if (
        this.paramForm.pmColor != "" &&
        this.paramForm.pmVersion != "" &&
        this.paramForm.price != "" &&
        this.paramForm.stock != ""
      ) {
        let pdata = JSON.parse(JSON.stringify(this.paramForm));
        this.paramList.push(pdata);
        this.paramShow = false;
        this.paramForm.pmColor = "";
        this.paramForm.pmVersion = "";
        this.paramForm.price = "";
        this.paramForm.stock = "";
        console.log(this.paramList);
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
      ProductBrandGetByCate(radio).then((res) => {
        console.log(res);
        this.brand = res.data[0].productBrand;
      });
    },
    sortSelect(value) {
      console.log(value);
    },
    // 提交添加表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.imageList.length != 0 && this.paramList.length != 0) {
            ProductImageAdd(this.imageList).then((res) => {});
            ProductParamsAdd(this.paramList).then((res) => {});
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
    //  上传图片
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
          this.form.mainImg = "http://" + data.Location;
        }
      );
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
          setTimeout(() => {
            this.loading3 = false;
          }, 1000);
        }
      );
    },
  },
};
</script>

<style scoped>
.addForm {
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
}
</style>