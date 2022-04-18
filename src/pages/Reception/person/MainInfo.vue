<template>
  <div class="main-info">
    <h1 class="title">用户信息</h1>
    <el-form class="user-form" label-width="100px">
      <el-form-item label="头像：">
        <img class="user-photo" src="../../../assets/login_bg.jpg" />
      </el-form-item>

      <el-form-item label="用户名：">
        <p v-show="!update">用户名</p>
        <el-input v-show="update"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <p v-show="!update">性别</p>
        <el-radio-group v-model="form.resource" v-show="update">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机号：">
        <p>1231231321</p>
      </el-form-item>

      <el-form-item label="邮箱：">
        <p v-show="!update">邮箱</p>
        <el-input v-show="update"></el-input>
      </el-form-item>

      <el-form-item>
        <button class="user-update" @click="userUpdate" v-show="!update">
          编辑资料
        </button>
        <button class="user-update" @click="isUpdate" v-show="update">
          确认修改
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "MainInfo",
  data() {
    return {
      update: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    userUpdate() {
      this.update = true;
    },
    isUpdate() {
      this.update = false;
    },
  },
};
</script>

<style scoped>
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
.main-info /deep/ .el-radio__input.is-checked + .el-radio__label {
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