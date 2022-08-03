<template>
    <div class="model">
        <div class="bg"></div>
        <div class="form">
            <i class="close el-icon-close" @click="closeModel"></i>
            <div class="address">

                <el-form label-width="90px" :model="form" status-icon :rules="rules" ref="form">
                    <el-form-item label="收货人:" prop="userName">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="userPhone">
                        <el-input v-model="form.userPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="选择地址:" prop="selected">
                        <area-cascader :level="1" type="text" v-model="form.selected" :data="data"
                            :placeholder="address" style="line-height: 20px"></area-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="uAddress">
                        <span>
                            <el-input placeholder="街道/小区" v-model="form.uAddress">
                            </el-input>
                        </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="addressUpdate('form')" v-if="form.uaId != null">确认
                        </el-button>
                        <el-button type="danger" @click="insert('form')" v-if="form.uaId == null">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { AddressInsert, AddressUpdate } from "../../api/user";
import {
    phoneValidation,
} from "../../utils/index";
import { pca, pcaa } from "area-data"; // v5 or higher
export default {
    name: "AddressModel",
    props: ["addressData"],
    data() {
        // 自定义验证规则
        // 手机号
        var validatePhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error("手机号不能为空"));
            }
            if (!phoneValidation(value)) {
                callback(new Error("手机号不合法"));
            } else {
                callback();
            }
        };
        var validateAddress = (rule, value, callback) => {
            if (value.length == 0) {
                callback(new Error("请选择地址"));
            } else {
                callback();
            }
        }
        return {
            modelShow: false,
            address: `${this.addressData.uProvince}/${this.addressData.uCity}/${this.addressData.uArea}`,

            form: {
                uaId: this.addressData.uaId,
                userId: this.addressData.userId,
                userName: this.addressData.userName,
                userPhone: this.addressData.userPhone,
                uAddress: this.addressData.uAddress,
                uProvince: this.addressData.uProvince,
                uCity: this.addressData.uCity,
                uArea: this.addressData.uArea,
                selected: [],
            },
            rules: {
                userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                selected: [{ validator: validateAddress, trigger: "change" }],
                uAddress: [{ required: true, message: "请输入地址", trigger: "blur" }],
                userPhone: [{ validator: validatePhone, trigger: "blur" }],
            },
        }

    },
    created() {
        this.address == "//" ? this.address = "请选择" : ""
    },
    computed: {
        data() {
            return pcaa;
        },
    },
    watch: {
        form: {
            deep: true,

            handler(newValue, oldValue) {
                this.form.uProvince = newValue.selected[0];
                this.form.uCity = newValue.selected[1];
                this.form.uArea = newValue.selected[2];


            },
        },
    },
    methods: {
        closeModel() {
            this.$emit("mShow", this.modelShow)
        },
        addressUpdate(formName) {
            this.form.selected.push("440000", "440100", "440103");
            console.log(this.form);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    AddressUpdate(this.form).then((res) => {
                        console.log(res);
                        if (res.code == 200) {
                            this.closeModel();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        insert(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    AddressInsert(this.form).then(res => {
                        if (res.code == 200) {
                            this.closeModel();
                        }
                    })
                }
            });
        },
    }
}
</script>

<style scoped>
/* 模态框 */
.bg {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
}

.form {
    background-color: #fff;
    width: 600px;
    height: 400px;
    z-index: 1001;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -300px;
    overflow: hidden;
    padding: 20px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: scale(1.8, 1.8);
    cursor: pointer;
}

.close:hover {
    color: red;
}

.model /deep/ .el-form {
    width: 60%;
    height: 150px;
    margin: auto;
    padding-top: 30px;
}

.model /deep/ .cascader-menu-list .cascader-menu-option.selected {
    color: #be0f2d;
}

.model /deep/ .el-input__inner:focus {
    border: 1px solid #be0f2d;
}

.model /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: "";
}

.my-address ul {
    padding-top: 10px;
    margin-left: -90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.my-address li {
    line-height: 40px;
    padding: 0 15px;
    margin-bottom: 5px;
    border: 1px solid #eee;
    cursor: pointer;
}

.my-address li:hover {
    border: 1px solid #be0f2d;
    transition: 0.2s;
}

/* 模态框 */
</style>