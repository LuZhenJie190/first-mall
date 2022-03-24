<template>
  <div>
    <header-top @searchInput="searchInput" :inputValue="ivalue" />
    <el-table :data="tableData" stripe border style="width: 90%; margin: auto">
      <el-table-column prop="ptype" label="商品类型" width="160">
      </el-table-column>
      <el-table-column prop="pcore" label="商品编码" width="160">
      </el-table-column>
      <el-table-column prop="pname" label="商品名称" width="165">
      </el-table-column>
      <el-table-column prop="pprice" label="商品价格(￥)" width="160">
      </el-table-column>
      <el-table-column prop="pweight" label="商品重量(g)" width="160">
      </el-table-column>
      <el-table-column prop="psupplier" label="商品供应商" width="160">
      </el-table-column>
      <el-table-column label="操作" width="159">
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
    <el-pagination
      class="pagination"
      v-show="pageShow"
      background
      layout="prev, pager, next,total"
      :total="pagination.total"
      :current-page="pagination.curPage"
      :page-count="pagination.pageNum"
      :page-size="pagination.pageSize"
      @current-change="paperChange"
    >
    </el-pagination>
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
  ProductInfoFindAll,
  ProductRemove,
  ProductFindById,
  ProductUpdateById,
  ProductFindByCore,
} from "../../api/index.js";
import { MessageBox } from "element-ui";
import HeaderTop from "../../components/Backstage/BackstageTop.vue";

const COS = require("cos-js-sdk-v5");
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKID50f4D5g1i8H9l6AxUllUx93g28xVmnXz", // 腾讯云份识别ID自己扫码查询
  SecretKey: "C8nBI8i13oJXUAajbCVYKp2zf5E8KJ6e", // 身份秘钥
});
export default {
  components: { HeaderTop },
  name: "ProductList",
  data() {
    return {
      tabsIndex:"0",
      ivalue: "请输入商品编码",
      search: "",
      pageShow: true,
      tableData: [],
      pagination:{
          pageNum: 1,
          pageSize: 5,
          curPage: 0,
          total: 0,
      },
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
      // value: "",
      // radio: 0,
    };
  },
  created() {
    // 获取数据并展示
    this.getProductList();
  },
  methods: {
    // 获取数据并展示
    getProductList() {
      let {pageNum,pageSize}=this.pagination;
      ProductInfoFindAll(pageNum,pageSize).then((res) => {
        this.tableData = res.list;
       this.pagination.total = res.total;
        this.nameFilter();
      });
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
    // 分页实现
    paperChange(curPage) {
      this.pagination.pageNum = curPage;
      this.getProductList();
    },
    // 删除商品
    removeProduct(pid) {
      let index = pid;
      let listIndex = this.tableData[index].pid;
      MessageBox.confirm("此操作将永久删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          ProductRemove(listIndex);
          MessageBox.alert("删除成功");
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
        MessageBox.alert("不能为空");
      } else {
        MessageBox.alert("修改成功");
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
.pagination {
  position: absolute;
  top: 520px;
  left: 700px;
}

</style>