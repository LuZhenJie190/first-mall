<template>
  <div>
    <backstage-search @searchInput="searchInput" :inputValue="ivalue" />
    <el-table :data="tableData" 
    stripe 
    border 
    style="width: 95%; margin: auto"
    ref="multipleTable"
    height="490"
     @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="pid" label="商品ID" width="100" fixed="left">
      </el-table-column>
      <el-table-column prop="categoryId" label="品类" width="100" >
      </el-table-column>
      <el-table-column prop="brandId" label="品牌" width="100" >
      </el-table-column>
      <el-table-column prop="title" label="名称" width="150">
      </el-table-column>
      <el-table-column  prop="mainImg" label="主图" width="105">
        <template slot-scope="scope">
          <img :src="scope.row.mainImg" alt="" style="width: 60px;height: 55px">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格(￥)" width="160">
      </el-table-column>
      <el-table-column prop="count" label="数量" width="160">
      </el-table-column>
      <el-table-column prop="color" label="颜色" width="160">
      </el-table-column>
            <el-table-column prop="versions" label="版本" width="160">
      </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="160">
      </el-table-column>
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
      <paging @pNum="pNum" :pageInfo="pageInfo"/>
    </div>
    
    <!-- 修改弹框 -->
    <div class="p-model-update" v-show="modelShow">
      <div class="p-model-bg"></div>
      <div class="p-model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
        <el-tabs tab-position="left" style="height: 200px" v-model="tabsIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form label-width="100px" v-model="form">
              <el-form-item label="商品类型：">
                <el-radio
                  v-model="form.type"
                  :label="0"
                  @change="typeRadio(form.type)"
                  >手机</el-radio
                >
                <el-radio
                  v-model="form.type"
                  :label="1"
                  @change="typeRadio(form.type)"
                  >笔记本</el-radio
                >
                <el-radio
                  v-model="form.type"
                  :label="2"
                  @change="typeRadio(form.type)"
                  >电视</el-radio
                >
                <el-radio
                  v-model="form.type"
                  :label="3"
                  @change="typeRadio(form.type)"
                >
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="1">
            <el-image :src="form.imgurl"></el-image>
            <!-- ------------------------------------------------ -->
             <!-- :http-request="upload" -->
            <el-upload
              class="upload-demo"
              action="#"
             :http-request="upload"
              :file-list="fileList"
             list-type="picture"
              :limit="1"       
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
  ProductUpdate
} from "../../api/index.js";
import Paging from '../../components/Backstage/Paging.vue';
import BackstageSearch from '../../components/Backstage/BackstageSearch.vue';

const COS = require("cos-js-sdk-v5");
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz", // 腾讯云份识别ID自己扫码查询
  SecretKey: "C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e", // 身份秘钥
});
export default {
  components: { Paging,BackstageSearch },
  name: "ProductList",
  inject:["reload"],
  data() {
    return {
      tabsIndex:"0",
      ivalue: "请输入商品编码",
      search: "",
      pageInfo:{
        pageNum:1,
        pageSize:5,
        pageTotal:0,
        pageShow: true,
      },
      tableData: [],
      labelPosition: "right",
      modelShow: false,
      oldImg:"",
      // 上传图片的缩略图展示列表
      fileList:[],
      // 表单信息
      form: {
        type: "0",
        sort: "",
        core: "",
        name: "",
        price: "",
        version: "",
        width: "",
        height: "",
        weight: "",
        color: "",
        supplier: "",
        imgurl: "",
      },
      // 下拉框分类选择
      options: [
        { label: "华为", value: 0 },
        { label: "小米", value: 1 },
        { label: "vivo", value: 2 },
        { label: "oppo", value: 3 },
      ],
      multipleSelection: [],
    };
  },
  created() {
    ProductgetAll(this.pageInfo.pageNum,this.pageInfo.pageSize).then((res)=>{
      this.tableData = res.list;
      this.pageInfo.pageTotal = res.total
    })
  },
  methods: {
     toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    // 获取数据并展示
    pNum(val) {
       if (val == undefined) {
            val=1;
        }else{
            val == val;
        }
      ProductgetAll(val,this.pageInfo.pageSize).then((res)=>{
        this.tableData = res.list;
    })
      
    },
    // 重命名
    nameFilter() {
      this.tableData.forEach((e) => {
        console.log(e.ptype);
        if (e.ptype == 0) e.ptype = "手机";
        if (e.ptype == 1) e.ptype = "笔记本";
        if (e.ptype == 2) e.ptype = "电视";
        if (e.ptype == 3) e.ptype = "手环";
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
         this.$alert("删除成功");
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
      let listIndex = this.tableData[index].pid;
      ProductFindById(listIndex).then((res) => {
        console.log(res);
        this.form.type = res[0].ptype;
        this.form.sort = res[0].psort;
        this.options.value = res[0].psort;
        this.form.pid = res[0].pid;
        this.form.imgurl = res[0].pphoto;
        this.form.name = res[0].pname;
        this.form.core = res[0].pcore;
        this.form.price = res[0].pprice;
        this.form.version = res[0].pversion;
        this.form.width = res[0].pwidth;
        this.form.height = res[0].pheight;
        this.form.weight = res[0].pweight;
        this.form.color = res[0].pcolor;
        this.form.supplier = res[0].psupplier;
      });
      this.modelShow = true;
    },
    // 确定修改信息，提交表单
    updateInfo() {
      let {
        pid,
        imgurl,
        name,
        price,
        core,
        color,
        version,
        weight,
        width,
        height,
        supplier,
        type,
        sort,
      } = this.form;
      if (
        imgurl == "" ||
        name == "" ||
        price == "" ||
        core == "" ||
        color == "" ||
        version == "" ||
        weight == "" ||
        width == "" ||
        height == "" ||
        supplier == "" ||
        type == null ||
        sort == null
      ) {
        this.$alert("不能为空");
      } else {
        this.$alert("修改成功");
        this.fileList=[];
        this.tabsIndex="0";
        ProductUpdateById(
          pid,
          this.oldImg,
          core,
          name,
          price,
          color,
          version,
          weight,
          width,
          height,
          supplier,
          type,
          sort
        );
        setTimeout(() => {
          this.getProductList();
        }, 300);
        this.modelShow = false;
      }
    },
    // 关闭模态框
    mShow() {
      this.modelShow = false;
      this.fileList=[]
      this.tabsIndex="0"
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
      this.search = val;
      if (this.search != "") {
        ProductFindByCore(this.search).then((res) => {
          this.tableData = res;
          this.pageShow = false;
        });
      } else {
        this.getProductList();
        this.pageShow = true;
      }
    },
  },
};
</script>

<style>
.el-table--border::after,
.el-table--group::after,
.el-table::before {
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
}
.p-model-context {
  width: 40%;
  height: 580px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  left: 500px;
}
.p-model-context .el-form {
  position: relative;
  top: 60px;
  right: 50px;
  width: 70%;
  height: 500px;
  margin: auto;
}
.p-model-context .el-icon-circle-close {
  transform: scale(2, 2);
  position: absolute;
  right: 15px;
  top: 15px;
  color: gray;
  cursor: pointer;
}
.p-model-context .el-icon-circle-close:hover{
  color:#F56C6C;
}
.p-model-context .el-tabs__nav-scroll {
  margin-top: 20px;
}
.p-model-context .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 0px;
}

.p-model-context .el-tabs {
  height: 80% !important;
  margin-top: 40px;
}

.p-model-context .el-image {
  position: relative;
  top: 25px;
  left: 50px;
  width: 250px;
  height: 250px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.p-model-context .el-form {
  margin-top: -40px;
}
.p-model-context .upload-demo {
  padding: 40px 50px 0px 50px;
}
.p-update-btn {
  width: 180px;
  position: relative;
  left: 230px;
  top: 0px;
}
.product-page {
  position: absolute;
  top: 650px;
  left: 700px;
}

</style>