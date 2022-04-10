<template>
  <div class="login">
    <div class="login-context">
      <div class="loginfrom">
        <div class="login-left">
          <img src="../../assets/bg1.png" alt="" />
        </div>
        <div class="login-right">
          <h1 class="t-login">帐号登录</h1>
          <!-- <div class="login-form">

          </div> -->
          <el-form ref="form" 
          :model="form" 
          label-width="80px"
          class="login-form">
            <el-form-item label="用户名：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="form.password"></el-input>
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
                <img :src="item.img" alt="">
              </li>
            </ul>
          </div>
          <a class="linkToregister" @click="linkToRegister"
            >还没有账户？立即注册
            <i class="el-icon-right"></i>
          </a>
        </div>
      </div>
    </div>
    <ds-footer class="login-footer" />
  </div>
</template>

<script>
import DsFooter from "../../components/Reception/DsFooter.vue";
export default {
  components: { DsFooter },
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      type:[
        {img:require('../../assets/wx.png')},
        {img:require('../../assets/zfb.png')},
        {img:require('../../assets/QQ.png')},

      ]
    };
  },
  methods: {
    linkToRegister() {
      this.$router.push({
        path: "/Register",
      });
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
.demo-ruleForm {
  position: relative;
  top: 80px;
  right: 25px;
}
/* .bg-login{
  width: 100%;
  height: 100vh;
  object-fit: cover;
} */
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
.login-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.login-type li{
  width: 50px;
  height: 50px;
}
.login-type li img{
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