<template>
  <div>
    <el-table :data="tableData" border  style="width: 80%; margin: auto">
      <el-table-column prop="userId" label="ID" width="199"> </el-table-column>
      <el-table-column prop="userName" label="用户名" width="200">
      </el-table-column>
        <el-table-column prop="userPwd" label="密码" width="200">
      </el-table-column>
       <el-table-column prop="userPhone" label="手机号" width="200"> </el-table-column>
      <el-table-column label="权限" width="200">
          <template slot-scope="scope">
                    <el-switch
          v-model="scope.row.userRoot"
          :active-value="1"
          :inactive-value="0"
          active-text="管理员"
          inactive-text="普通用户"
          @change="rootChange(scope.$index)">
        </el-switch>  
          </template>
      </el-table-column>
    </el-table>
        <el-pagination
      background
      layout="prev, pager, next ,total"
      :total="total"
      :current-page="curPage"
      :page-count="pageNum"
      :page-size="PageSize"
      @current-change="paper">
    </el-pagination>
  </div>
</template>

<script>
import {UserInfoListFindAll,UserInfoUpdate} from '../../api/index'
export default {
  name: "UserRoot",
  data() {
    return {
      tableData: [],
      total: 0,
      curPage: 1,
      pageNum: 1,
      PageSize: 5,
      labelPosition: "right",
      v1:'user',
      v2:'admin'
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取数据
    getUserList(){
      UserInfoListFindAll(this.pageNum, this.PageSize).then((res)=>{
        // console.log(res);
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    // 把当前显示页数赋值给pageNum
    paper(curPage) {
      this.pageNum = curPage;
      UserInfoListFindAll(this.pageNum, this.PageSize).then((res) => {
        this.tableData = res.list;
      });
    },
    // 根据id改变权限
    rootChange(rid){
      let index=rid;
      let {userId,userName,userPwd,userPhone,userEmail,userRoot}=this.tableData[index];
      UserInfoUpdate(userId,userName,userPwd,userPhone,userEmail,userRoot)
    }
  },
};
</script>

<style scoped>
.el-pagination{
  position: absolute;
  top:450px ;
  left: 700px;
}
</style>