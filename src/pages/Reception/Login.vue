<template>
  <div id="login">
    <div class="wrap">
      <div class="logo">
        <img src="../../assets/logo2.png"  @click="linkToIndex"/>
        <h1 class="title">欢迎登录</h1>
      </div>
    </div>
    <p class="splitline"></p>
    <div class="login-context">
    <img src="../../assets/bg1.png" class="loginbg" />
    <div class="loginfrom">
      <h1 class="t-login">账户登录</h1>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <a class="forgetpwd" href="">忘记密码</a>
  <el-form-item>
    <el-button type="danger" class="loginbtn" @click="login">登录</el-button>
  </el-form-item>
      </el-form>
      <a  class=" linkToregister" @click="linkToRegister">还没有账户？立即注册
        <i class="el-icon-right"></i>
      </a>
    </div>
    <ds-footer/>
      </div>
  </div>
</template>

<script>
import DsFooter from '../../components/Reception/DsFooter.vue';
export default {
  components: { DsFooter },
  name: "Login",
 data() {
   return {
       form: {
          name: '',
          password:'',
        }
   }
 },
  methods: {
    linkToRegister(){
      this.$router.push({
        path:'/Register'
      })
    },
    linkToIndex(){
       this.$router.push({
        path:'/Index'
      })
    },
    login(){
      if (this.form.name=='admin' && this.form.password=='123') {
        this.$router.push({
          path:'/BackendSystem/Home'
        })
      }
      // console.log(this.name);
      // console.log(this.password);

    }
  },
};
</script>

<style scoped>
#login{
  background: #fff;
}
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.splitline {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #eee;
}
.logo {
  display: flex;
  align-items: center;
}
.logo img {
  width: 250px;
  height: 90px;
}
.login-context{
  background: #eee;
}
.title {
  position: relative;
  top: 10px;
  left: 20px;
}
.demo-ruleForm {
 position: relative;
 top: 80px;
 right: 25px;
}
.loginbg {
  width: 100%;
  height: 500px;
  vertical-align: middle;
}
.loginfrom{
  width: 400px;
  height: 350px;
  background: #fff;
  position: absolute;
  top: 125px;
  right: 150px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form{
  width: 320px;
  margin-left: -30px;
}
.loginbtn{
  width: 120px;
  position: relative;
  left: 50px;
  top: -10px;
}
.t-login{
  margin: 30px;
}
.forgetpwd{
  position: relative;
  top: -15px;
  right: -270px;
  font-size: small;
}
.linkToregister{
  position: relative;
  right: -100px;
  top: 15px;
  font-size:medium;
}
</style>