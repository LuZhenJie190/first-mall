<template>
  <div class="login">
    <div class="login-context">
      <!-- 表单 -->
      <login-form>
        <template slot="title">
          <div class="btn-register" @click="linkToLogin">
            <a
              >前往登录<i class="el-icon-right"></i
            ></a>
          </div>
        </template>
        <template slot="form">
          <div :class="{ 'login-right' : true, 'animate__animated animate__bounceOutLeft' : anShow}">
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
                <el-form-item label="用户名:" prop="pass">
                  <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pass">
                  <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input
                    type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="age">
                  <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="age">
                  <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>

                <el-form-item>
                  <div class="rebtn">
                    <el-button type="primary" @click="submitForm('ruleForm')"
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
export default {
  components: { LoginForm },
  name: "Register",

  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
      active: 0,
      input: "",
      value1: "",
      anShow:false,
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    linkToLogin() {
      this.anShow = true;
      setTimeout(() => {
         
         this.$router.push({
        path: "/Login",
      });
      }, 500);
     
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
.rebtn .el-button{
  width: 100px;
  margin-left: 20px;
}
.el-form {
  
}
</style>