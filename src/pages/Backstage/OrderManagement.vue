<template>
  <div>
    <header-top :inputValue="searchTip" @searchInput="searchInput"/>
    <el-table :data="tableData" stripe style="width: 90%; margin: auto">
      <el-table-column prop="osn" label="订单编号" width="150" fixed="left">
      </el-table-column>
      <el-table-column prop="opname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="ouname" label="客户姓名" width="150">
      </el-table-column>
      <el-table-column prop="ophone" label="手机号码" width="150">
      </el-table-column>
      <el-table-column prop="oaddress" label="收货地址" width="200">
      </el-table-column>
      <el-table-column prop="oprice" label="订单价格" width="150">
      </el-table-column>
      <el-table-column prop="oTime" label="下单时间" width="250px">
      </el-table-column>

      <el-table-column prop="ostatus" label="支付状态" width="150">
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
           <el-button size="mini" @click="orderUpdateBtn(scope.$index)">修改</el-button>
        <el-button size="mini" type="danger" @click="orderRemoveBtn(scope.$index)">删除</el-button>
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
    <!-- 修改模态框 -->
        <div class="o-model-update" v-show="modelShow">
      <div class="o-model-bg"></div>
      <div class="o-model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
         <el-tabs :tab-position="abPosition" style="height: 200px;">
    <el-tab-pane label="订单信息">
         <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="form"
        >
          <el-form-item label="订单编号：">
            <el-input v-model="form.osn" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单价格：">
            <el-input v-model="form.oprice"></el-input>
          </el-form-item>
          <el-form-item label="下单时间：">
            <el-input v-model="form.otime"></el-input>
          </el-form-item>
          <el-form-item label="支付类型：">
            <!-- <el-input v-model="form.otype"></el-input> -->
            <el-radio v-model="form.otype" :label="0">微信</el-radio>
            <el-radio v-model="form.otype" :label="1">支付宝</el-radio>
          </el-form-item>
          <el-form-item label="支付状态：">
            <!-- <el-input v-model="form.ostatus"></el-input> -->
             <el-radio v-model="form.ostatus" :label="0">未支付</el-radio>
            <el-radio v-model="form.ostatus" :label="1">已支付</el-radio>
          </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品信息">
      <el-form 
      :label-position="labelPosition"
      label-width="100px"
      :model="form">
      <el-form-item label="商品编码：" >
        <el-input v-model="form.pcore" disabled></el-input>
      </el-form-item>
        <el-form-item label="商品名称：">
        <el-input v-model="form.pname"></el-input>
      </el-form-item>
        <el-form-item label="商品数量：">
        <el-input v-model="form.pnumber"></el-input>
      </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="客户信息">
         <el-form 
      :label-position="labelPosition"
      label-width="100px"
      :model="form">
      <el-form-item label="客户姓名：">
        <el-input v-model="form.ouname"></el-input>
      </el-form-item>
        <el-form-item label="客户手机号：">
        <el-input v-model="form.ophone"></el-input>
      </el-form-item>
        <el-form-item label="收货地址：">
        <el-input v-model="form.oaddress"></el-input>
      </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
   <el-button class="o-add" type="primary" @click="updateInfo()"
              >点击修改</el-button
            >
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import {
  OrderFindAll,
  OrderFindById,
  OrderFindByPhone,
  OrderUpdate,
  OrderRemove,
} from "../../api/index";
import HeaderTop from '../../components/Backstage/HeaderTop.vue';
export default {
  components: { HeaderTop },
  name: "OrderManagement",
  data() {
    return {
      abPosition: 'left',
      labelPosition:"left",
      modelShow: false,
      searchTip:"请输入手机号",
      search:"",
      pageShow:true,
      pagination: {
        pageNum: 1,
        pageSize: 5,
        curPage: 0,
        total: 0,
      },
      form: {
        oid:"",
        osn: "",
        oprice: "",
        otime: "",
        otype: 0,
        ostatus:0,
        pcore:"",
        pname:"",
        pnumber:"",
        ouname:"",
        ophone:"",
        oaddress:"",
      },
      tableData: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 获取数据
    getOrderList(){
      let {pageNum,pageSize}=this.pagination;
      OrderFindAll(pageNum,pageSize).then((res)=>{
        // console.log(res);
        this.tableData=res.list;
        this.pagination.total=res.total;
           this.tableData.filter(e=>{
          e.ostatus==0 ? e.ostatus="未支付":e.ostatus="已支付";
           e.opaytype==0 ? e.opaytype="微信":e.opaytype="支付宝";
        })
      });
    },
    // 分页实现
    paperChange(curPage) {
      this.pagination.pageNum = curPage;
      this.getProductList();
    },
    mShow(){
      this.modelShow=false;
    },
    // 点击修改按钮获取数据
    orderUpdateBtn(oid){
      this.modelShow=true;
      let index=oid;
      let orderIndex=this.tableData[index].oid;
      OrderFindById(orderIndex).then((res)=>{
        // let {osn,oprice,otime,opaytype,ostatus,pcore,pname,pnumber,ouname,ophone,oaddress}=this.form;
        this.form.oid=res[0].oid;
        this.form.osn=res[0].osn;
        this.form.oprice=res[0].oprice;
        this.form.otime=res[0].oTime;
        this.form.otype=res[0].opaytype;
        this.form.ostatus=res[0].ostatus;
        this.form.pcore=res[0].opcore;
        this.form.pname=res[0].opname;
        this.form.pnumber=res[0].opnumber;
        this.form.ouname=res[0].ouname;
        this.form.ophone=res[0].ophone;
        this.form.oaddress=res[0].oaddress;
      })
    },
   // 确认修改更新数据
   updateInfo(){
     let {oid,osn,oprice,otime,otype,ostatus,pcore,pname,pnumber,ouname,ophone,oaddress}=this.form;
     if (osn==""||oprice==""||otime==""||otype==null||ostatus==null||pcore==""||pname==""||pnumber==""
     ||ouname==""||ophone==""||oaddress=="") {
       MessageBox.alert("不能为空");
     }else{
        OrderUpdate(oid,osn,pcore,pname,pnumber,oprice,otime,ouname,ophone,oaddress,otype,ostatus);
        MessageBox.alert("修改成功");
        setTimeout(() => {
          this.getOrderList();
        }, 300);
        this.modelShow=false;
     }
    
   },
    // 删除按钮
    orderRemoveBtn(oid){
        let index=oid;
      let orderIndex=this.tableData[index].oid;
        MessageBox.confirm("此操作将永久删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          OrderRemove(orderIndex);
          MessageBox.alert("删除成功");
          // 重新获取数据
          this.timer = setTimeout(() => {
            this.getOrderList();
          }, 500);
     
        })
        .catch(() => {});
    },
// 手机号码搜索,接收子组件传过来的数据
    searchInput(val){
      this.search=val;
      if (this.search!="") {
         OrderFindByPhone(val).then((res)=>{
        console.log(res);
        this.tableData=res;
        this.pageShow=false;
      })
      }else{
          this.getOrderList();
        this.pageShow=true
    }
    }
  }
};
</script>

<style>
.o-model-bg {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
.o-model-context {
  width: 40%;
  height: 450px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 120px;
  left: 500px;
  z-index: 5;
}
.o-model-context .el-form {
  position: relative;
  top: 60px;
  right: 50px;
  width: 65%;
  margin: auto;
}
.o-model-context i {
  transform: scale(2, 2);
  position: absolute;
  right: 15px;
  top: 15px;
  color: gray;
  cursor: pointer;
  z-index: 10;
}
.o-model-context i:hover {
  color: #F56C6C;
  transition:ease-out 0.5s;
  transform:scale(2,2) rotate(90deg);
}
.o-add {
  position: relative;
  top: -15px;
  left: 320px;
}
.o-model-context .el-tabs--left{
  height: 90% !important;
  margin-left: 20px;
}
.o-model-context .el-tabs__content{
  height: 90%;
}
.o-model-context .el-tabs--left .el-tabs__nav-scroll{
  margin-top: 50px;
}
.o-model-context .el-tabs--left .el-tabs__nav-wrap.is-left::after{
  height: 0;
}
.o-model-context .el-tabs--left .el-tabs__active-bar.is-left{
  height: 30px !important;
  top: 5px;
}

</style>