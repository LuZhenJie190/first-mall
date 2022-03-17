<template>
  <div id="register">
      <div class="r-splitline">
    <div class="r-header">
      <img src="../../assets/logo2.png"  @click="linkToIndex"/>
      <h1 class="r-title">欢迎注册</h1>
      <a class="r-tologin" @click="linkToLogin">已有账号？去登陆></a>
    </div>
    </div>
    <div class="r-form">
        <h1 class="r-title1">用户注册</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
   
   
  <el-form-item>
      <div class="rebtn">
           <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
   
  </el-form-item>
</el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Register",
//   data() {
//       return {
//             active: 0,
//             input:'',
            
//       }
//   },
 data() {
     
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        active: 0,
        input:'',
        value1:''
      };
      
    },
  methods: {
       next() {
        if (this.active++ > 2) this.active = 0;
      },
      linkToLogin(){
          this.$router.push({
              path:'/Login'
          })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
          linkToIndex(){
       this.$router.push({
        path:'/Index'
      })
    }
    }
  
};
</script>

<style scoped>
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
.r-title {
  position: relative;
  top: 10px;
  left: 20px;
}
.r-form{
    position: relative;
    top: 30px;
    width: 400px;
    margin: auto;
}
.r-title1{
    position: relative;
    left: 30%;
    top: 20px;
}
.r-tologin{
    position: absolute;
    right: 0;
    top: 60px;
}
.rebtn{
    margin-left: 60px;
}
.el-form{
  position: relative;
  top: 50px;
  left: -50px;
}
</style>