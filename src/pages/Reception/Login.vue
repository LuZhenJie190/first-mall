<template>
  <div class="login">
    <div class="login-context">
      <!-- 表单 -->
      <login-form>
        <template slot="title">
          <div class="btn-register" @click="linkToRegister">
            <a>立即注册<i class="el-icon-right"></i></a>
          </div>
        </template>
        <template slot="form">
          <div
            :class="{
              'login-right': true,
              'animate__animated animate__bounceOutRight': anShow,
            }"
          >
            <h1 class="t-login">帐号登录</h1>
            <el-form
              :model="form"
              label-width="80px"
              class="login-form"
              :rules="rules"
              ref="form"
              @keyup.enter.native="login('form')"
            >
              <el-form-item label="用户名：" prop="name">
                <input
                  class="inp"
                  type="text"
                  v-model="form.userPhone"
                  placeholder="请输入手机号"
                />
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <input
                  class="inp"
                  type="password"
                  v-model="form.userPwd"
                  placeholder="请输入密码"
                  ref="password"
                />
                <!-- <i class="el-icon-view icon-pw" @click="pwdChange"></i> -->
              </el-form-item>
              <a class="forgetpwd" href="">忘记密码</a>
              <el-form-item>
                <el-button type="danger" class="loginbtn" @click="login('form')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
            <el-divider>其他登录方式</el-divider>
            <div class="login-type">
              <ul>
                <li v-for="(item, index) in type" :key="index">
                  <img :src="item.img" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </template>
      </login-form>
    </div>
  </div>
</template>

<script>
import { UserLogin } from "../../api/index";
import LoginForm from "../../components/LoginForm.vue";
export default {
  components: { LoginForm },
  name: "Login",
  data() {
    return {
      // 表单
      form: {
        userPhone: "",
        userPwd: "",
      },
      // 表单规则
      rules: {
        name: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度为 6 -20 个字符", trigger: "blur" },
        ],
      },
      // 其他登录
      type: [
        { img: require("../../assets/wx.png") },
        { img: require("../../assets/zfb.png") },
        { img: require("../../assets/QQ.png") },
      ],
      anShow: false,
    };
  },
  methods: {
    linkToRegister() {
      this.anShow = true;
      setTimeout(() => {
        this.$router.push({
          path: "/Register",
        });
      }, 500);
    },
    linkToIndex() {
      this.$router.push({
        path: "/Index",
      });
    },
    pwdChange() {
      this.$refs.password.type = this.inputType;
      console.log(this.$refs.password.type);
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        //   alert("submit!");
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
      });
      UserLogin(this.form).then((res) => {
        console.log(res);
        if (res.code == 200) {
          localStorage.setItem("uname", res.data.userName);
          localStorage.setItem("uid", res.data.uId);

          if (res.data.userIdentity == 1) {
            this.$router.push({ path: "/BackendSystem/home" });
          } else {
            this.$router.push({ path: "/index" });
          }
        }
      });
      // console.log(this.name);
      // console.log(this.password);
    },
    // logout() {
    //   console.log("aa");
    //   localStorage.clear();
    // },
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
  transform: scale(2, 2);
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
  grid-template-rows: 100px 300px 1px auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.login-form {
  width: 400px;
  position: relative;
}
.login-form /deep/ .el-input__inner:focus {
  border: 1px solid #be0f2d;
}
.login-form
  /deep/
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "";
}
.inp {
  position: relative;
  border: 1px solid #dcdfe6;
  outline: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 4px;
}
.inp::placeholder {
  color: #ccc;
}
.inp:focus {
  border: 1px solid #be0f2d;
  transition: 0.5s;
}
.icon-pw {
  position: absolute;
  top: 12px;
  right: 10px;
  transform: scale(1.3, 1.3);
  color: #757575;
  cursor: pointer;
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
</style>