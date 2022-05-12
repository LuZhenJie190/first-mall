<template>
  <div class="user-list">
    <!-- 搜索 -->
    <BackstageSearch @searchInput="searchInput" :inputValue="uvalue" :multipleSelection="multipleSelection" :flag="flag"
      class="search" />
    <el-table :data="tableData" border stripe ref="multipleTable" height="485"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="uId" label="ID" width="80" fixed="left" />
      <el-table-column prop="userIdentity" sortable label="身份" width="120" :formatter="identity" />
      <el-table-column prop="userName" label="用户名" width="150" />
      <el-table-column prop="userPwd" label="密码" width="160" />
      <el-table-column prop="userSex" label="性别" width="100" :formatter="sex" />
      <el-table-column prop="userEmail" label="邮箱" width="180" />
      <el-table-column prop="userPhone" label="手机号" width="170" />
      <el-table-column prop="uCreateTime" label="注册时间" width="180" />
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="update(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click.native="removeList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <Paging @pNum="pNum" :pageInfo="pageInfo" />
    </div>

    <!-- 修改模态框 -->
    <div class="model-update" v-show="modelShow">
      <div class="model-bg"></div>
      <div class="model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
        <div class="form">
          <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="用户名：" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="userPwd">
              <el-input v-model="form.userPwd"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="userSex">
              <el-select v-model="form.userSex" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" prop="userPhone">
              <el-input v-model="form.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="userEmail">
              <el-input v-model="form.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="注册时间：">
              <el-input v-model="form.uCreateTime"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UsergetAll,
  UserRemove,
  UsergetById,
  UserUpdate,
  UsergetByName,
} from "../../api/index";
export default {
  inject: ["reload"],
  name: "UserList",
  data() {
    return {
      flag: "1",
      uvalue: "请输入用户名",
      search: "",
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 8,
        pageTotal: 0,
        pageShow: true,
      },

      ppp: [],
      modelShow: false,
      options: [
        { value: 1, label: "男" },
        { value: 0, label: "女" },
      ],
      labelPosition: "right",
      form: {
        uId: "",
        userName: "",
        userPwd: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userIdentity: "0",
        uCreateTime: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "3 到 8 个字符", trigger: "blur" },
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "不少于6位数字或字母", trigger: "blur" },
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }],
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
    };
  },
  created() {
    this.getUserList();
    this.pNum();

    //  this.userData();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      UsergetAll(this.pageInfo.pageNum, this.pageInfo.pageSize).then((res) => {
        this.tableData = res.data.list;
        this.pageInfo.pageTotal = res.data.total;
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取数据展示
    pNum(val) {
      if (val == undefined) {
        val = 1;
      } else {
        val == val;
      }
      UsergetAll(val, this.pageInfo.pageSize).then((res) => {
        this.tableData = res.data.list;

      });
    },

    //重命名
    identity(row, column) {
      if (row.userIdentity == 0) return "普通用户"
      if (row.userIdentity == 1) return "管理员"

    },
    sex(row, column) {
      if (row.userSex == 0) return "女"
      if (row.userSex == 1) return "男"

    },


    //删除行
    removeList(data) {
      // 拿到表格行的下标，把它赋值给数组的下标，实现根据对象的id删除
      const index = data.uId;
      // console.log(tableIndex);
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
        this.reload();
        this.getUserList();
      });
    },
    // 拿到数据并放到输入框里面
    update(data) {
      this.modelShow = true;
      this.form.uId = data.uId;
      this.form.userName = data.userName;
      this.form.userPwd = data.userPwd;
      this.form.userSex = data.userSex;
      this.form.userPhone = data.userPhone;
      this.form.userEmail = data.userEmail;
      this.form.userIdentity = data.userIdentity;
      this.form.uCreateTime = data.uCreateTime;

    },
    // 模态框隐藏
    mShow() {
      this.modelShow = false;
    },
    // 点击修改更新数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserUpdate(this.form).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              //关闭模态框
              this.modelShow = false;
              //刷新数据
              // this.reload();
              this.getUserList();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 接收子组件的数据
    searchInput(val) {
      this.search = val;
      if (this.search != "") {
        UsergetByName(this.search).then((res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.pageInfo.pageTotal = res.data.total;
          // this.pageInfo.pageShow = false;
        });
      } else {
        // this.reload();
        this.getUserList();
        // this.pageInfo.pageShow = true;
      }
    },
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
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