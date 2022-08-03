<template>
  <div class="user-root">
    <common-form :formData="formData" :formLabel="formLabel" :inline="true">
      <el-button type="primary" @click="searchInput">搜索</el-button>
    </common-form>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination"
      @changePage="getUserRootList">
      <el-table-column label="权限操作" width="auto" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.userIdentity" :active-value="1" :inactive-value="0" active-text="管理员"
            inactive-text="普通用户" @change="rootChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </common-table>
  </div>
</template>

<script>
import { UsergetAll, UsergetByName, UserUpdate } from "../../api/user";
import CommonTable from '../../components/Backstage/CommonTable.vue';
import CommonForm from '../../components/Backstage/CommonForm.vue';

export default {
  components: { CommonForm, CommonTable },
  name: "UserRoot",
  inject: ["reload"],
  data() {
    return {

      switchModel: true,
      formData: {
        search: ""
      },
      formLabel: [
        { label: '', type: 'input', model: 'search', tip: '用户名' }
      ],
      tableLabel: [
        { label: 'ID', prop: 'uId', width: '80', sortable: true },
        { label: '身份', prop: 'userIdentityLabel', width: 100 },
        { label: '用户名', prop: 'userName', width: 150 },
        { label: '密码', prop: 'userPwd', width: 130 },
        { label: '性别', prop: 'userSexLabel', width: 50 },
        { label: '邮箱', prop: 'userEmail', width: 180 },
        { label: '手机号', prop: 'userPhone', width: 140 },
        { label: '注册时间', prop: 'uCreateTime', width: 180, sortable: true },
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 10,
        loading: false,
      },
      inputValue: "请输入用户名",
      tableData: [],
      labelPosition: "right",
    };
  },
  created() {
    this.getUserRootList();
  },
  methods: {
    // 命名格式化
    nameFilter(res) {
      const result = res.data.list.map(item => {
        item.userIdentityLabel = item.userIdentity === 0 ? '普通用户' : '管理员';
        item.userSexLabel = item.userSex === 0 ? '女' : '男';
        return item;
      });
      return result;
    },
    // 获取用户权限列表
    getUserRootList() {
      this.pagination.loading = true;
      UsergetAll({ pageNum: this.pagination.page, pageSize: this.pagination.size }).then((res) => {
        this.tableData = this.nameFilter(res);
        this.pagination.total = res.data.total;
        this.pagination.loading = false;
        console.log(this.tableData);
      });
    },
    // 根据id改变权限
    rootChange(val) {
      UserUpdate(val).then(res => {
        if (res.code === "200") {
          this.$message({
            showClose: true,
            type: "success",
            message: '修改成功'
          })
          this.getUserRootList();
        }
      })
    },

    //搜索用户名
    searchInput() {
      if (this.formData.search !== "") {
        UsergetByName(this.formData.search).then((res) => {
          this.tableData = this.nameFilter(res);
          this.pagination.total = res.data.total;
        });
      } else {
        this.getUserRootList();
      }
    },
  },
};
</script>

<style scoped>
.user-root {
  height: 100%;
}

.root-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.search /deep/ .list-delete {
  display: none !important;
}

.search /deep/ .screen {
  display: none;
}
</style>