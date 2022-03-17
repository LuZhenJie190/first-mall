<template>
  <div id="useradd">
    <h1>添加用户</h1>
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="用户名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：">
        <el-input v-model="form.retime"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="add" type="primary" @click="addInfo">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { UserInfoAdd } from "../../api/index.js";
import { getnowDate } from "../../utils/index";
export default {
  name: "UserAdd",
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        pwd: "",
        email: "",
        phone: "",
        retime: "",
      },
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.form.retime=getnowDate();
      }, 100);
    },
    // 提交添加表单
    addInfo() {
      let { name, pwd, phone, email, retime } = this.form;
      if (name == "" || pwd == "" || phone == "" || email == "") {
        MessageBox.alert("请输入内容，各项不能为空");
      }
      UserInfoAdd(name, pwd, phone, email, retime).then((res) => {
        console.log(res);
        if (res == "success") {
          alert("添加成功");
          this.form.name = "";
          this.form.pwd = "";
          this.form.phone = "";
          this.form.email = "";
        } else {
          alert("添加失败");
        }
      });
    },
  },
  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.timer);
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
.add {
  width: 150px;
  position: relative;
  left: 65px;
}
</style>