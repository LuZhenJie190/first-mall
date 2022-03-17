<template>
  <div id="add-product">
    <div class="addForm">
      <el-form label-width="100px" v-model="form" >
        <el-form-item label="商品类型：" >
          <el-radio v-model="form.type" label="0" @change="typeRadio(form.type)"
            >手机</el-radio
          >
          <el-radio v-model="form.type" label="1" @change="typeRadio(form.type)"
            >笔记本</el-radio
          >
          <el-radio v-model="form.type" label="2" @change="typeRadio(form.type)"
            >电视</el-radio
          >
          <el-radio v-model="form.type" label="3" @change="typeRadio(form.type)">
            手环</el-radio
          >
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select
            v-model="form.sort"
            placeholder="请选择"
            @change="sortSelect(form.sort)"
          >
            <el-option
              v-for="item in options"
              :key="item.sort"
              :label="item.label"
              :value="item.sort"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model="form.core"></el-input>
        </el-form-item>
        <el-form-item label="商品图片：">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upload"
            list-type="picture"
            :file-list=" fileList"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">
                &nbsp; &nbsp; &nbsp; &nbsp;只能上传jpg/png文件
            </span>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品参数：">
          <div class="product-info">
            <el-form label-width="100px" :inline="true">
              <el-form-item label="价格(￥)：">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item label="版本：">
                <el-input v-model="form.version"></el-input>
              </el-form-item>
              <el-form-item label="宽度(mm)：">
                <el-input v-model="form.width"></el-input>
              </el-form-item>
              <el-form-item label="高度(mm)：">
                <el-input v-model="form.height"></el-input>
              </el-form-item>
              <el-form-item label="重量(g)：">
                <el-input v-model="form.weight"></el-input>
              </el-form-item>

              <el-form-item label="颜色：">
                <el-input v-model="form.color"></el-input>
              </el-form-item>
              <el-form-item label="供应商：">
                <el-input v-model="form.supplier"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
      </el-form>
      <el-button class="p_submit" type="primary" @click="productSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {ProductAdd} from "../../api/index";
import { MessageBox } from 'element-ui';
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz', // 腾讯云份识别ID自己扫码查询
  SecretKey: 'C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e' // 身份秘钥
})
export default {
  name: "ProductAdd",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList:[],
      form: {
        type:"",
        sort: '',
        name: "",
        core: "",
        price:"",
        version:"",
        width:"",
        height:"",
        weight:"",
        color:"",
        supplier:"",
        imgurl:"",
      },
      options: [
        { label: "华为", sort: 0 },
        { label: "小米", sort: 1 },
        { label: "vivo", sort: 2 },
        { label: "oppo", sort: 3 },
      ],
      
    };
  },
  methods: {
    typeRadio(radio) {
      console.log(radio);
    },
    sortSelect(value) {
      console.log(value);
    },
    // 提交表单
    productSubmit(){
      let {imgurl,name,price,core,color,version,weight,width,height,supplier,type,sort}=this.form;
      if (imgurl==""||name==""||price==""||core==""||color==""||version==""
      ||weight==""||width==""||height==""||supplier==""||type==""||sort==null) {
        MessageBox.alert("不能为空")
      }else{
         ProductAdd(imgurl,core,name,price,color,version,weight,width,height,supplier,type,sort);
         MessageBox.alert("添加成功")
         setTimeout(() => {
            this.form.type = null;
            this.form.sort = null;
            this.form.imgurl = null;
            this.fileList=[];
            this.form.name = null;
            this.form.core = null;
            this.form.price = null;
            this.form.version = null;
            this.form.width = null;
            this.form.height = null;
            this.form.weight = null;
            this.form.color = null;
            this.form.supplier = null;
         }, 500);
       
      }
     },
    //  上传图片
      upload(res) {
        if (!res.file) {
          return
        }
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject({
        Bucket: 'leo-1310014300', /* 存储桶 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: res.file.name, /* 文件名 */
        StorageClass: 'STANDARD', // 上传模式, 标准模式
        Body: res.file, // 上传文件对象
        onProgress: (progressData) => {
          this.percentage = progressData.percent * 100
        }
      }, (error,data) => {
          this.form.imgurl="http://"+data.Location
       })
    },
  }
     
  
};
</script>

<style scoped>
.addForm {
  width: 40%;
  margin: -35px 100px auto;
}

.product-info {
  width: 800px;
  margin-left: 30px;
}
.product-info .el-form .el-form-item {
  margin-bottom: 10px;
}
.addForm .el-form-item {
  margin-bottom: 10px;
}
.p_submit {
  width: 150px;
  margin-left: 200px;
}
.el-upload-list--picture .el-upload-list__item:focus{
  border-color: #409EFF;
}
</style>