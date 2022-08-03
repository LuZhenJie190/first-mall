<template>
  <div class="user-list">
    <!-- 弹框 -->
    <el-dialog :title="dialogType === 'add' ? '添加用户' : '编辑信息'" :visible.sync="dialogShow" width="30%">
      <common-form ref="formData" style="padding:0px 30px" :formData="formData" :formLabel="formLabel" :rules="rules"
        :inline="false">
        <el-button @click="handleCancel('formData')">取 消</el-button>
        <el-button v-if="dialogType === 'add'" type="primary" @click="submitUser('formData')">确 定</el-button>
        <el-button v-if="dialogType === 'edit'" type="primary" @click="submitUpdate('formData')">确 定</el-button>
      </common-form>
    </el-dialog>
    <!-- 搜索 -->
    <common-form :formData="formSearchData" :inline="true" :formLabel="formSearchLabel">
      <el-button type="primary" @click="searchInput">搜索</el-button>
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button class="btn-dels" type="danger" @click="batchesDel" :disabled="multipleSelection.length === 0">批量删除
      </el-button>
    </common-form>
    <!-- 表格 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @changePage='getUserList'
      @handleSelectionChange="handleSelectionChange">
      <el-table-column label="操作" align="center" width="auto">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>
  </div>
</template>

<script>
import {
  UsergetAll,
  UserRemove,
  UserDatchDelete,
  UserUpdate,
  UsergetByName,
  UserRegsiter
} from "../../api/user";
import CommonTable from '../../components/Backstage/CommonTable.vue';
import CommonForm from '../../components/Backstage/CommonForm.vue';
import { getnowDate } from "../../utils/index";
export default {
  components: { CommonTable, CommonForm },
  inject: ["reload"],
  name: "UserList",
  data() {
    return {
      dialogType: 'add',
      dialogShow: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "3 到 8 个字符", trigger: "blur" },
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "不少于6位数字或字母", trigger: "blur" },
        ],
        userSex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的手机号",
            trigger: "blur",
          },
        ],
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 20, message: "不少于6位", trigger: "blur" },
        ],
      },
      multipleSelection: [],
      tableData: [],
      tableLabel: [
        { label: 'ID', prop: 'uId', width: 80, sortable: true },
        { label: '身份', prop: 'userIdentityLabel', width: 100 },
        { label: '用户名', prop: 'userName', width: 150 },
        { label: '密码', prop: 'userPwd', width: 160 },
        { label: '性别', prop: 'userSexLabel', width: 80 },
        { label: '邮箱', prop: 'userEmail', width: 180 },
        { label: '手机号', prop: 'userPhone', width: 130 },
        { label: '注册时间', prop: 'uCreateTime', width: 170, sortable: true },
      ],
      pagination: {
        total: 0,
        page: 1,
        size: 10,
        loading: true,
      },

      formSearchData: {
        search: ''
      },
      formSearchLabel: [
        { label: '', type: 'input', model: 'search', tip: '用户名' }
      ],
      formLabel: [
        { label: '用户名:', model: 'userName', type: 'input' },
        { label: '密码:', model: 'userPwd', type: 'password' },
        {
          label: '性别:', model: 'userSex', type: 'select',
          opts: [
            { label: '男', value: 1 },
            { label: '女', value: 0 },
          ]
        },
        { label: '手机号:', model: 'userPhone', type: 'input' },
        { label: '邮箱:', model: 'userEmail', type: 'input' },
        { label: '注册时间:', model: 'uCreateTime', type: 'input', disabled: true }
      ],
      formData: {
        userName: "",
        userPwd: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userIdentity: "0",
        uCreateTime: "",
      },

    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    sortMethod(a, b) {
      return a - b;
    },
    // 获取用户列表
    getUserList() {
      this.pagination.loading = true;
      UsergetAll({ pageNum: this.pagination.page, pageSize: this.pagination.size }).then((res) => {
        this.tableData = this.nameFilter(res);
        this.pagination.total = res.data.total;
        this.pagination.loading = false;
      });
    },

    // 多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //删除行
    removeUser(data) {
      // 拿到表格行的下标，把它赋值给数组的下标，实现根据对象的id删除
      const index = data.uId;
      if (index !== 1) {
        this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 删除操作
          UserRemove(index);
          this.$message({
            message: "删除成功",
            type: "success",
          });
          // 刷新页面
          this.getUserList();

        });
      } else {
        this.$alert('此用户不能删除')
      }


    },
    // 批量删除
    batchesDel() {
      const arrId = [];
      this.multipleSelection.forEach(item => {
        arrId.push(item.uId);
      })
      arrId.forEach(item => {
        if (item === 1) {
          arrId.splice(item, 1);
        }
      })

      this.$confirm(`此操作将永久删除${arrId.length}名用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除操作
        UserDatchDelete(arrId).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
        });
        // 刷新页面
        this.getUserList();
      });
    },
    // 修改数据
    update(data) {
      this.dialogType = 'edit';
      this.formData = data;
      this.dialogShow = true;
    },
    // 添加用户
    addUser() {
      this.dialogType = 'add';
      this.getTime();
      this.formData = {
        userName: "",
        userPwd: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userIdentity: "0",
        uCreateTime: "",
      };
      this.dialogShow = true;
    },
    // 提交添加用户
    submitUser(formData) {
      this.$refs[formData].$children[0].validate((valid) => {
        if (valid) {
          UserRegsiter(this.formData).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.dialogShow = false;
              this.getUserList();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 关闭模态框并重置
    handleCancel(formData) {
      this.dialogShow = false;
      this.$refs[formData].$children[0].resetFields();
      this.getUserList();
    },

    // 点击修改更新数据
    submitUpdate(formName) {
      this.$refs[formName].$children[0].validate((valid) => {
        if (valid) {
          UserUpdate(this.formData).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogShow = false;
              //刷新数据
              this.getUserList();
            }
          });
        } else {
          return false;
        }
      });
    },

    // 名称搜索
    searchInput() {
      if (this.formSearchData.search) {
        UsergetByName(this.formSearchData.search).then((res) => {
          this.tableData = this.nameFilter(res);
          this.pagination.total = res.data.total;
        });
      } else {
        this.getUserList();
      }
    },

    // 命名格式化
    nameFilter(res) {
      const result = res.data.list.map(item => {
        item.userIdentityLabel = item.userIdentity === 0 ? '普通用户' : '管理员';
        item.userSexLabel = item.userSex === 0 ? '女' : '男';
        return item;
      });
      return result;
    },

    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.formData.uCreateTime = getnowDate();
      }, 100);
    },
  },
};
</script>

<style scoped>
.user-list {
  height: 100%;
}


.btn-prev,
.btn-next {
  background: #ccc !important;
  color: #000 !important;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.model-bg {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
}

.model-context {
  width: 40%;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  left: 500px;
  z-index: 5;
}

.model-context .form {
  position: relative;
  top: 45px;
  right: 50px;
  width: 60%;
  margin: auto;
}

.model-context i {
  transform: scale(2, 2);
  position: absolute;
  right: 15px;
  top: 15px;
  color: gray;
  cursor: pointer;
}

.model-context i:hover {
  color: #f56c6c;
}

.add {
  margin-left: 70px;
}

.search /deep/ .screen {
  display: none;

}
</style>