<template>
  <div class="main-info">
    <h1 class="title">用户信息</h1>
    <el-form class="user-form" label-width="100px">
      <el-form-item label="头像：">
        <img class="user-photo" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </el-form-item>

      <el-form-item label="用户名：">
        <p v-show="!update">{{ userData.userName }}</p>
        <el-input v-show="update" v-model="form.userName"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <p v-show="!update">{{ userData.userSex | sex() }}</p>
        <el-radio-group v-model="form.userSex" v-show="update">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机号：">
        <p>{{ userData.userPhone }}</p>
      </el-form-item>

      <el-form-item label="邮箱：">
        <p v-show="!update">{{ userData.userEmail }}</p>
        <el-input v-show="update" v-model="form.userEmail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="user-update" @click="userUpdate" v-show="!update">
          编辑资料
        </el-button>
        <el-button class="user-update" @click="isUpdate" v-show="update">
          确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UsergetById, UserUpdate } from "../../../api/user";
export default {
  name: "MainInfo",
  data() {
    return {
      userData: "",
      update: false,
      form: {
        uId: localStorage.getItem("uid"),
        userName: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userPwd: "",
        userIdentity: "",
        uCreateTime: "",
      },
    };
  },
  filters: {
    sex(val) {
      if (val == 0) return "女";
      if (val == 1) return "男";
    },
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      UsergetById(this.form.uId).then((res) => {
        res.data.list.forEach((element) => {
          this.userData = element;
        });
      });
    },
    userUpdate() {
      this.update = true;
      this.form.userName = this.userData.userName;
      this.form.userSex = this.userData.userSex;
      this.form.userPhone = this.userData.userPhone;
      this.form.userEmail = this.userData.userEmail;
      this.form.Pwd = this.userData.userPwd;
      this.form.userIdentity = this.userData.userIdentity;
      this.form.uCreateTime = this.userData.uCreateTime;
    },
    isUpdate() {
      UserUpdate(this.form).then((res) => {
        if (res.code == 200) {
          this.$alert("修改成功");
          this.getUserData();
          localStorage.setItem("uname", this.form.userName);
        }
      });
      this.update = false;
    },
  },
};
</script>

<style scoped>
.main-info {
  width: 100%;
}

.title {
  font-size: 30px;
  font-weight: 500;
  color: #757575;
}

.user-form {
  width: 350px;
  padding-top: 50px;
}

.user-photo {
  width: 100px;
  height: 100px;
  margin-left: 100px;
}

.main-info /deep/ .el-input__inner:focus {
  border: 1px solid #be0f2d;
}

.main-info /deep/ .el-radio__input.is-checked .el-radio__inner {
  background: #be0f2d;
  border-color: #be0f2d;
}

.main-info /deep/ .el-radio__inner:hover {
  border-color: #be0f2d !important;
}

.main-info /deep/ .el-radio__input.is-checked+.el-radio__label {
  color: #be0f2d !important;
}

.user-update {
  background-color: #be0f2d;
  color: white;
  width: 200px;
  border: none;
  outline: none;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
}
</style>