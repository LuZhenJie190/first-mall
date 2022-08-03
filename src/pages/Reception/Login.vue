<template>
  <div class="login">
    <div class="login-context">
      <!-- 表单 -->
      <login-form>
        <template slot="title">
          <div class="btn-register">
            <a @click="linkToRegister" v-if="anShow">立即注册<i class="el-icon-right"></i></a>
            <a @click="linkToLogin" v-if="anShow1">立即登录<i class="el-icon-back"></i></a>
          </div>
        </template>
        <template slot="form">
          <!-- 注册 -->
          <div class="re-form" :style="reSty">
            <h1 class="r-title">用户注册</h1>
            <div class="r-form">
              <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名:" prop="userName">
                  <el-input type="text" v-model="registerForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pwd">
                  <el-input type="password" v-model="registerForm.pwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="userPwd">
                  <el-input type="password" v-model="registerForm.userPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="userPhone">
                  <el-input v-model.number="registerForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="userEmail">
                  <el-input type="text" v-model="registerForm.userEmail"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="rebtn">
                    <el-button type="danger" @click="submitForm('registerForm')">提交</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 登录 -->
          <div class="lg-form">
            <h1 class="t-login">帐号登录</h1>
            <el-form :model="form" label-width="80px" class="login-form" status-icon :rules="rules" ref="form"
              @keyup.enter.native="login('form')">
              <el-form-item label="用户名：" prop="userPhone">
                <input class="inp" type="text" v-model="form.userPhone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="密码：" prop="userPwd">
                <input class="inp" type="password" v-model="form.userPwd" placeholder="请输入密码" ref="password" />
              </el-form-item>
              <div class="checked">
                <el-checkbox v-model="checked">已阅读并同意帐号 用户协议 和 隐私政策</el-checkbox>
              </div>
              <el-form-item>
                <el-button type="danger" class="loginbtn" :disabled="checked == false" @click="login('form')">登录
                </el-button>
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
import {
  phoneValidation,
  emailValidation,
  getnowDate,
} from "../../utils/index";
import { UserLogin, UserRegsiter } from "../../api/user";
import LoginForm from "../../components/Reception/LoginForm.vue";
import Index from './Index.vue';
export default {
  components: { LoginForm, Index },
  name: "Login",
  inject: ["reload"],
  data() {
    // 自定义验证规则
    // 手机号
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
        console.log(value);
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
        if (this.registerForm.userPwd !== "") {
          this.$refs.registerForm.validateField("userPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checked: false,
      // 表单
      form: {
        userPhone: "",
        userPwd: "",
      },
      // 表单规则
      rules: {
        userPhone: [{ validator: validatePhone, trigger: "blur" }],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" },],
      },
      registerRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        userPwd: [{ validator: validatePass2, trigger: "blur" }],
        userPhone: [{ validator: validatePhone, trigger: "blur" }],
        userEmail: [{ validator: validateEmail, trigger: "blur" }],
      },
      registerForm: {
        userName: "",
        pwd: "",
        userPwd: "",
        userSex: 0,
        userPhone: "",
        userEmail: "",
        userIdentity: 0,
        uCreateTime: "",
      },
      // 其他登录
      type: [
        { img: require("../../assets/wx.png") },
        { img: require("../../assets/zfb.png") },
        { img: require("../../assets/QQ.png") },
      ],
      anShow: true,
      anShow1: false,
      // 切换样式
      reSty: {
        marginLeft: `-600px`,
        transition: `ease-out 0.3s`
      }
    };
  },
  methods: {
    linkToRegister() {
      this.anShow = false
      this.anShow1 = true;
      this.reSty.marginLeft = `0px`
    },
    linkToLogin() {
      this.anShow1 = false
      this.anShow = true
      this.reSty.marginLeft = `-600px`
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
        if (valid) {
          UserLogin(this.form).then((res) => {
            if (res.code == 200) {
              localStorage.setItem("uname", res.data.userName);
              localStorage.setItem("uid", res.data.uId);
              this.$router.back();
            } else if (res.code == 202) {
              this.$alert(`${res.message}`)
            }
            else if (res.code == null) {
              this.$alert("密码错误");
            }
          });
        }
      });

    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerForm.uCreateTime = getnowDate();
          UserRegsiter(this.registerForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$alert(`${res.message}`, {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.go(0);
                },
              });
            } else {
              this.$alert(`${res.message}`);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },


  },
};
</script>

<style scoped>
.lg-form,
.re-form {
  width: 600px;
  overflow: hidden;
}

.lg-form {
  display: flex;
  flex-direction: column;
  align-items: center;
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


.login-form /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
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
  margin-top: 10px;
  margin-left: 20px;
  /* background-color: #be0f2d;
  color: #fff; */
}


.login-type ul {
  width: 500px;
  line-height: 100px;
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
  line-height: 120px;
  font-size: 28px;
  font-weight: 500;
  color: #333333;

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

.checked {
  position: relative;
  left: 80px;
  top: -10px;

}

.checked /deep/ .el-input__inner:focus {
  border: 1px solid #be0f2d;
}

.checked /deep/ .el-checkbox__label {
  color: #ccc;
}

.checked /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #be0f2d;
}

.checked /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #be0f2d;
  background-color: #be0f2d;
}

.checked /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #be0f2d;
}

.checked /deep/ .el-checkbox__inner:hover {
  border: 1px solid #be0f2d;
}





.r-header {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}





.r-title {
  line-height: 120px;
  font-size: 28px;
  font-weight: 500;
  color: #333333;
}

.rebtn .el-button {
  width: 100px;
  margin-left: 20px;
}

.re-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.r-form {
  height: 100%;
  width: 400px;
  transform: translateX(-40px);
}

.re-form /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: "";
}
</style>