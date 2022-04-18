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
        <el-form-item label="商品图片：" style="width: 1200px; height: 180px">
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
        <el-form-item label="商品参数：" style="width: 800px">
          <div class="product-info">
            <el-form-item label="价格(￥)：" prop="price">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="数量：" prop="count">
              <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="版本：" prop="versions">
              <el-input v-model="form.versions"></el-input>
            </el-form-item>
            <el-form-item label="颜色：" prop="color">
              <el-input v-model="form.color"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
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
  ProductBrand,
  ProductCategoryGetByBrand,
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
      //pid,categoryId,brandId, title, subTitle, mainImg, price, count, createTime, updateTime, color, versions
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
    };
  },
  created() {
    this.getTime();
    ProductCategory().then((res) => {
      this.category = res;
    });
    ProductBrand(this.pageNum, this.pageSize).then((res) => {
      console.log(res);
      this.brand = res.list;
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getTime() {
      this.timer = setInterval(() => {
        this.form.createTime = getnowDate();
      }, 500);
    },
    typeRadio(radio) {
      ProductCategoryGetByBrand(radio).then((res) => {
        this.brand = res[0].productBrand;
        console.log(this.brand);
      });
    },
    sortSelect(value) {
      console.log(value);
    },
    // // 提交表单
    // productSubmit(){
    //   let {categoryId,brandId, title, subTitle, mainImg, price, count, createTime, updateTime, color, versions}=this.form;
    //      ProductAdd(categoryId,brandId, title, subTitle, mainImg, price, count, createTime, updateTime, color, versions).then((res)=>{
    //        console.log(res);
    //      });
    //      MessageBox.alert("添加成功")
    //  },
    // 提交添加表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {
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
          if (mainImg != "") {
            ProductAdd(
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
              if (res.success) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.reload();
              }
            });
          } else {
            this.$alert("请上传图片！");
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
  },
};
</script>

<style scoped>
.addForm {
  width: 40%;
  margin: 0px 100px 0px 50px;
}

.product-info {
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.addForm .el-form-item {
  margin-bottom: 20px;
}
.p_submit {
  width: 100px;
  margin-left: 30px;
}
.el-upload-list--picture .el-upload-list__item:focus {
  border-color: #409eff;
}
</style>