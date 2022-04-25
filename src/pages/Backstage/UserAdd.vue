<template>
  <div id="useradd">
    <h1>添加用户</h1>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="用户名：" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="userPwd">
        <el-input v-model="form.userPwd"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="userSex">
        <el-select v-model="form.userSex" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码：" prop="userPhone">
        <el-input v-model="form.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="userEmail">
        <el-input v-model="form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：">
        <el-input v-model="form.uCreateTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">
          点击添加
        </el-button>
        <el-button @click="resetForm('form')"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getnowDate } from "../../utils/index";
import { UserRegsiter } from "../../api/index.js";

export default {
  name: "UserAdd",
  data() {
    return {
      options: [
        { value: 1, label: "男" },
        { value: 0, label: "女" },
      ],
      labelPosition: "right",
      form: {
        userName: "",
        userPwd: "",
        userSex: "",
        userPhone: "",
        userEmail: "",
        userIdentity: "0",
        uCreateTime: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 8, message: "1 到 8 个字符", trigger: "blur" },
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "不少于6位数字或字母", trigger: "blur" },
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的手机号",
            trigger: "blur",
          },
        ],
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 20, message: "不少于6位", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.getTime();
  },

  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.timer);
  },

  methods: {
    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.form.uCreateTime = getnowDate();
      }, 100);
    },
    // 提交添加表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserRegsiter(this.form).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "注册成功",
                type: "success",
              });
              // this.$refs[formName].resetFields();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
#useradd {
  width: 400px;
  margin: 0px 300px auto;
}
#useradd h1 {
  text-align: center;
  margin: 10px 10px 20px 60px;
  font-size: xx-large;
}
</style>