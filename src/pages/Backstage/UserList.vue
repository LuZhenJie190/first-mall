<template>
  <div>
    <header-top @searchInput="searchInput" :inputValue="uvalue" />
    <el-table :data="tableData" border stripe style="width: 90%; margin: auto">
      <el-table-column prop="userId" label="ID" width="100"> </el-table-column>
      <el-table-column prop="userName" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="userPwd" label="密码" width="160">
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="190">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="170">
      </el-table-column>
      <el-table-column prop="userRedate" label="注册时间" width="204">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.$index)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native="removeList(scope.$index)"
            >删除</el-button
          >
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
      @current-change="paper"
      v-show="pageShow"
    >
    </el-pagination>
    <!-- 修改模态框 -->
    <div class="model-update" v-show="modelShow">
      <div class="model-bg"></div>
      <div class="model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="form"
        >
          <el-form-item label="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add" type="primary" @click="updateInfo()"
              >点击修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/Backstage/HeaderTop.vue";
import {
  UserInfoListFindAll,
  UserRemove,
  UserInfoFindById,
  UserInfoUpdate,
} from "../../api/index";
import { MessageBox } from "element-ui";
export default {
  components: { HeaderTop },
  name: "UserList",
  data() {
    return {
      uvalue: "请输入手机号",
      search: "",
      tableData: [],
      total: 0,
      curPage: 1,
      pageNum: 1,
      PageSize: 5,
      labelPosition: "right",
      pageShow: true,
      form: {
        id: "",
        name: "",
        pwd: "",
        email: "",
        phone: "",
        retime: "",
        root: "",
      },
      modelShow: false,
    };
  },
  created() {
    this.getUserInfoList();
  },
  methods: {
    // 获取数据展示
    getUserInfoList() {
      UserInfoListFindAll(this.pageNum, this.PageSize).then((res) => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    // 把当前显示页数赋值给pageNum
    paper(curPage) {
      this.pageNum = curPage;
      this.getUserInfoList();
    },
    removeList(uid) {
      // 拿到表格行的下标，把它赋值给数组的下标，实现根据对象的id删除
      const index = uid;
      const tableIndex = this.tableData[index].userId;
      MessageBox.confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          UserRemove(tableIndex);
          MessageBox.alert("删除成功");
          // 重新获取数据
          setTimeout(() => {
            this.getUserInfoList();
          }, 500);
        })
        .catch(() => {
          MessageBox.alert("已取消操作");
        });
    },
    // 拿到数据并放到输入框里面
    update(uid) {
      this.modelShow = true;
      var index = uid;
      var tableIndex = this.tableData[index].userId;
      UserInfoFindById(tableIndex).then((res) => {
        console.log(res);
        this.form.id = res[0].userId;
        this.form.name = res[0].userName;
        this.form.pwd = res[0].userPwd;
        this.form.phone = res[0].userPhone;
        this.form.email = res[0].userEmail;
      });
    },
    // 模态框隐藏
    mShow() {
      this.modelShow = false;
    },
    // 点击修改更新数据
    updateInfo() {
      let { id, name, pwd, phone, email, root } = this.form;
      // 判读有空的就返回
      if (name == "" || pwd == "" || phone == "" || email == "") {
        MessageBox.alert("不能为空");
      } else {
        // 更新数据
        UserInfoUpdate(id, name, pwd, phone, email, root);
        MessageBox.alert("修改成功");
        this.modelShow = false;
        //刷新数据
        this.timer = setInterval(() => {
          this.getUserInfoList();
        }, 200);
      }
    },
    // 接收子组件的数据
    searchInput(val) {
      this.search = val;
      if (this.search != "") {
        UserInfoFindById(this.search).then((res) => {
          this.tableData = res;
          this.pageShow = false;
        });
      } else {
        this.getUserInfoList();
        this.pageShow = true;
      }
    },
  },
};
</script>

<style scoped>
.btn-prev,
.btn-next {
  background: #ccc !important;
  color: #000 !important;
}

.el-pagination {
  position: absolute;
  top: 520px;
  left: 700px;
}
.model-bg {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
}
.model-context {
  width: 40%;
  height: 450px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 120px;
  left: 500px;
}
.model-context .el-form {
  position: relative;
  top: 60px;
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
  color: #409eff;
}
.add {
  margin-left: 70px;
}
</style>