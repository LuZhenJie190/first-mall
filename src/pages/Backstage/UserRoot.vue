<template>
  <div class="user-root">
    <BackstageSearch
      :inputValue="inputValue"
      @searchInput="searchInput"
      class="search"
    />
    <el-table :data="tableData" border height="433">
      <el-table-column prop="uId" label="ID" width="150"> </el-table-column>
      <el-table-column prop="userName" label="用户名" width="200">
      </el-table-column>
      <el-table-column prop="userPwd" label="密码" width="200">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="235">
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="258">
      </el-table-column>
      <el-table-column label="权限" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.userIdentity"
            :active-value="1"
            :inactive-value="0"
            active-text="管理员"
            inactive-text="普通用户"
            @change="rootChange(scope.$index)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="root-pagination">
      <Paging @pNum="pNum" :pageInfo="pageInfo" />
    </div>
  </div>
</template>

<script>
import { UsergetAll, UsergetByName, UserUpdate } from "../../api/index";

export default {
  name: "UserRoot",
  inject: ["reload"],
  data() {
    return {
      inputValue: "请输入用户名",
      tableData: [],
      labelPosition: "right",
      pageInfo: {
        pageNum: 1,
        pageSize: 8,
        pageTotal: 0,
        pageShow: true,
      },
    };
  },
  created() {
    UsergetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then((res) => {
      this.tableData = res.list;
      this.pageInfo.pageTotal = res.total;
    });
    this.pNum();
  },
  methods: {
    // 获取数据
    pNum(val) {
      if (val == undefined) {
        val = 1;
      } else {
        val == val;
      }
      UsergetAll(val, this.pageInfo.pageSize).then((res) => {
        this.tableData = res.list;
      });
    },
    // 根据id改变权限
    rootChange(rid) {
      let index = rid;
      let {
        uId,
        userName,
        userPwd,
        userSex,
        userPhone,
        userEmail,
        userIdentity,
        uCreateTime,
      } = this.tableData[index];
      UserUpdate(
        uId,
        userName,
        userPwd,
        userSex,
        userPhone,
        userEmail,
        userIdentity,
        uCreateTime
      ).then((res) => {});
    },

    //搜索用户名
    searchInput(val) {
      if (val != "") {
        UsergetByName(val).then((res) => {
          this.tableData = res;
          this.pageInfo.pageShow = false;
        });
      } else {
        this.reload();
        this.pageInfo.pageShow = true;
      }
    },
  },
};
</script>

<style scoped>
.user-root {
  padding: 20px;
}
.root-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.search /deep/ .list-delete {
  display: none !important;
}
</style>