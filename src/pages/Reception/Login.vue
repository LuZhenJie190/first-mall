<template>
  <div class="login">
    <div class="login-context">
      <!-- 表单 -->
      <login-form>
        <template slot="title">
          <div class="btn-register" @click="linkToRegister">
          <a
            >立即注册<i class="el-icon-right"></i
          ></a>
        </div>
        </template>
        <template slot="form">
          <div :class="{ 'login-right' : true, 'animate__animated animate__bounceOutRight' : anShow}">
            <h1 class="t-login">帐号登录</h1>
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              class="login-form"
            >
              <el-form-item label="用户名：">
                <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
              </el-form-item>
              <a class="forgetpwd" href="">忘记密码</a>
              <el-form-item>
                <el-button type="danger" class="loginbtn" @click="login"
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
import LoginForm from "../../components/LoginForm.vue";
export default {
  components: { LoginForm },
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
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
      this.anShow = true
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
    login() {
      if (this.form.name == "admin" && this.form.password == "123") {
        this.$router.push({
          path: "/BackendSystem/Home",
        });
      }
      // console.log(this.name);
      // console.log(this.password);
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