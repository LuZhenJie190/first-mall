<template>
    <div class="login">
        <div class="bg"></div>
        <div class="l-form">
            <h1 class="title">数码购后台管理系统</h1>
            <el-form label-width="80px" :model="form" status-icon ref="form" @keyup.enter.native="login('form')">
                <el-form-item label="帐号：" prop="userPhone">
                    <input type="text" :class="{ warn: nameShow }" v-model="form.userPhone" placeholder="请输入手机号" />
                </el-form-item>
                <p v-if="nameShow" class="tip">用户名不存在</p>
                <el-form-item label="密码：" prop="userPwd">
                    <input type="password" :class="{ warn: pwdShow }" v-model="form.userPwd" placeholder="请输入密码" />
                </el-form-item>
                <p v-if="pwdShow" class="tip">密码错误</p>
                <el-form-item>
                    <el-button type="primary" class="loginbtn" @click="login('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { UserLogin } from "../../api/index";
export default {
    name: "BackLogin",
    data() {
        return {
            form: {
                userPhone: "",
                userPwd: "",
            },
            nameShow: false,
            pwdShow: false,
        };
    },
    methods: {
        login() {
            UserLogin(this.form).then((res) => {

                if (res.code == 200) {
                    if (res.data.userIdentity == 1) {
                        this.$router.replace({
                            path: "/BackendSystem/Home",
                        });
                        localStorage.setItem("rootName", res.data.userName);
                    } else {
                        this.$alert("权限不足")
                    }

                }
                res.code == 201 ? this.$alert("帐号和密码不能为空") : "";
                res.code == 202 ? (this.nameShow = true) : (this.nameShow = false);
                res.code == null ? (this.pwdShow = true) : (this.pwdShow = false);
            });
        },
    },
};
</script>

<style scoped>
.bg {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/login_image.jpg");
    filter: blur(10px);
    background-position: center;
    object-fit: cover;
}

.l-form {
    width: 30vw;
    min-width: 400px;
    height: 350px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0px 0px 10px #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.l-form .el-form {
    min-width: 350px;
    position: relative;
    left: -20px;
}

.l-form input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}

.l-form input::placeholder {
    color: #ccc;
}

.l-form input:focus {
    border: 1px solid #409eff;
}

.title {
    font-weight: 500;
    font-size: 24px;
    line-height: 100px;
}

.loginbtn {
    width: 150px;
    transform: translateX(30%);
}

.tip {
    color: red;
    position: absolute;
    transform: translate(80px, -20px);
    font-size: 12px;
}

.login /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: "";
}

.warn {
    border: 1px solid red !important;
}
</style>