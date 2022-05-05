<template>
  <div class="login">
    <div class="login-context">
      <!-- 表单 -->
      <login-form>
        <template slot="title">
          <div class="btn-register" @click="linkToLogin">
            <a>前往登录<i class="el-icon-right"></i></a>
          </div>
        </template>
        <template slot="form">
          <div
            :class="{
              'login-right': true,
              'animate__animated animate__bounceOutLeft': anShow,
            }"
          >
            <h1 class="r-title1">用户注册</h1>
            <div class="r-form">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户名:" prop="userName">
                  <el-input
                    type="text"
                    v-model="ruleForm.userName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pwd">
                  <el-input
                    type="password"
                    v-model="ruleForm.pwd"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="userPwd">
                  <el-input
                    type="password"
                    v-model="ruleForm.userPwd"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="userPhone">
                  <el-input v-model.number="ruleForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="userEmail">
                  <el-input type="text" v-model="ruleForm.userEmail"></el-input>
                </el-form-item>

                <el-form-item>
                  <div class="rebtn">
                    <el-button type="danger" @click="submitForm('ruleForm')"
                      >提交</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </template>
      </login-form>
    </div>
  </div>
</template>

<script>
import LoginForm from "../../components/LoginForm.vue";
import {
  phoneValidation,
  emailValidation,
  getnowDate,
} from "../../utils/index";
import { UserRegsiter } from "../../api/index";
export default {
  components: { LoginForm },
  name: "Register",

  data() {
    // 自定义验证规则
    // 手机号
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      }
      if (!phoneValidation(value)) {
        callback(new Error("手机号不合法"));
      } else {
        callback();
      }
    };

    // 邮箱
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      }
      if (!emailValidation(value)) {
        callback(new Error("邮箱格式不合法"));
      } else {
        callback();
      }
    };

    // 确认密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.userPwd !== "") {
          this.$refs.ruleForm.validateField("userPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        pwd: "",
        userPwd: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userIdentity: "",
        uCreateTime: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        userPwd: [{ validator: validatePass2, trigger: "blur" }],
        userPhone: [{ validator: validatePhone, trigger: "blur" }],
        userEmail: [{ validator: validateEmail, trigger: "blur" }],
      },
      active: 0,
      input: "",
      value1: "",
      anShow: false,
    };
  },
  methods: {
    linkToLogin() {
      this.anShow = true;
      setTimeout(() => {
        this.$router.push({
          path: "/Login",
        });
      }, 500);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.uCreateTime = getnowDate();
          UserRegsiter(this.ruleForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$alert(`${res.message},请前往登录`, {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push({ path: "/Login" });
                },
              });
            } else {
              this.$alert(`${res.message}`);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    linkToIndex() {
      this.$router.push({
        path: "/Index",
      });
    },
  },
};
</script>

<style scoped>
.login /deep/ .addform .sex,
.login /deep/ .addform .ctime,
.login /deep/ .addform .reset {
  display: none;
}
.login
  /deep/
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "";
}
.login /deep/ .el-input__inner:focus {
  border: 1px solid #be0f2d;
}

.login {
  background: #fff;
}
.login-context {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/login_bg.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginfrom {
  width: 900px;
  height: 550px;
  background: #fff;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column: 10px;
  overflow: hidden;
  position: relative;
}
.login-left {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.login-bg {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login_image.jpg");
  background-position: -732px -360px;
  background-repeat: no-repeat;
  object-fit: cover;
  transition: 0.5s;
}
.btn-register:hover {
  opacity: 1;
  transition: 0.5s;
}
.btn-register:hover + .login-bg {
  transition: 0.5s;
  filter: blur(5px);
}
.btn-register {
  border: none;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 200px;
  padding: 20px;
  opacity: 0.7;
  transition: 0.5s;
  z-index: 20;
  cursor: pointer;
  position: absolute;
}
.btn-register a {
  font-weight: 600;
  font-size: 25px;
  color: #000;
}
.btn-register i {
  background: #be0f2d;
  border-radius: 100%;
  color: #fff;
  margin-top: 30px;
  transform: scale(2, 2) rotate(180deg);
}
.focus {
  width: 105%;
  height: 100%;
  position: absolute;
  background-color: rgba(238, 238, 238, 0.705);
  /* filter: blur(1px); */
  z-index: 10;
}
.login-right {
  display: grid;
  grid-template-rows: 100px auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.login-form {
  width: 400px;
  position: relative;
}
.loginbtn {
  width: 200px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 20px;
}
.login-type ul {
  height: 80px;
  display: flex;
  justify-content: space-evenly;
}
.login-type li {
  width: 50px;
  height: 50px;
}
.login-type li img {
  width: 40px;
  height: 40px;
}
.t-login {
  align-self: flex-end;
}
.forgetpwd {
  position: absolute;
  bottom: 80px;
  right: 0;
  font-size: small;
  color: #000;
}
.linkToregister {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px;
}
.login-footer {
  position: relative;
  bottom: 0;
}
.logo {
  height: 100px;
  letter-spacing: 1px;
  color: #be0f2d;
}
#register {
  height: 100vh;
}
.r-splitline {
  width: 100%;
  box-shadow: 0px 5px 10px #ccc;
  background: #fff;
}
.r-header {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}
.r-header img {
  width: 250px;
  height: 90px;
}

.r-form {
  align-self: flex-start;
  width: 400px;
}
.r-title1 {
}
.r-tologin {
  position: absolute;
  right: 0;
  top: 60px;
}
.rebtn {
  margin-left: -100px;
}
.rebtn .el-button {
  width: 100px;
  margin-left: 20px;
}
.el-form {
}
</style>