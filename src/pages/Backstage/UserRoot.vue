<template>
  <div class="user-root">
    <div class="root-search">
       <el-input placeholder="请输入用户名" v-model="search" clearable>
    <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
       </el-input>
    </div>
    <el-table 
    :data="tableData" 
    border  
    style="width: 90%; margin: auto"
    height="433">
      <el-table-column prop="uId" label="ID" width="150"> </el-table-column>
      <el-table-column prop="userName" label="用户名" width="200">
      </el-table-column>
        <el-table-column prop="userPwd" label="密码" width="200">
      </el-table-column>
       <el-table-column prop="userPhone" label="手机号" width="200"> </el-table-column>
       <el-table-column prop="userEmail" label="邮箱" width="205"> </el-table-column>
      <el-table-column label="权限" width="200">
          <template slot-scope="scope">
                    <el-switch
          v-model="scope.row.userIdentity"
          :active-value="1"
          :inactive-value="0"
          active-text="管理员"
          inactive-text="普通用户"
          @change="rootChange(scope.$index)">
        </el-switch>  
          </template>
      </el-table-column>
    </el-table>
    <div class="root-pagination">
        <paging @pNum="pNum" :pageInfo="pageInfo" />
    </div>
  </div>
</template>

<script>
import {  
  UsergetAll,
  UserRemove,
  UsergetByName,
  UserUpdate} from '../../api/index'
import Paging from '../../components/Backstage/Paging.vue';

export default {
  components: { Paging },
  
  name: "UserRoot",
  inject:["reload"],
  data() {
    return {
      search:"",
      tableData: [],
      labelPosition: "right",
      pageInfo:{
        pageNum:1,
        pageSize:8,
        pageTotal:0,
        pageShow: true,
      },
    };
  },
  created() {
    UsergetAll(this.pageInfo.pageNum,this.pageInfo.pageSize).then((res)=>{
      this.tableData=res.list
      this.pageInfo.pageTotal=res.total
    });
    this.pNum();
  },
  methods: {
    // 获取数据
    pNum(val){
        if (val == undefined) {
            val=1;
        }else{
            val == val;
        }
        UsergetAll(val,this.pageInfo.pageSize).then((res)=>{
        this.tableData = res.list
    });
    },
    // 根据id改变权限
    rootChange(rid){
      let index=rid;
      let {uId ,userName, userPwd, userSex, userPhone, userEmail,userIdentity, uCreateTime}=this.tableData[index];
      UserUpdate(uId ,userName, userPwd, userSex, userPhone, userEmail,userIdentity, uCreateTime).then((res)=>{
      })
    },

    //搜索用户名
    searchInfo(){
      if (this.search != "") {
         UsergetByName(this.search).then((res)=>{
        this.tableData=res;
        this.pageInfo.pageShow=false;
      });
      }else{
        this.reload();
        this.pageInfo.pageShow=true;  
      }
     
    },
  },
};
</script>

<style>

.root-pagination{
  position: absolute;
  top:600px ;
  left: 700px;
}
.root-search{
  width: 90%;
  margin: 0px auto 10px;
}
.root-search .el-input{
  width: 300px;
}
.root-search .el-input-group__append{
  background: #409EFF !important;
  color: #fff;
  border: 1px solid #DCDFE6;
  border-left: none;
}
</style>