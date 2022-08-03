<template>
    <el-form class="f" :model="formData" :label-width="labelWidth ? labelWidth : '80px'" :rules="rules"
        :inline="inline">
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label" :prop="item.model">
            <el-input v-if="item.type === 'input'" :placeholder="'请输入' + (item.label ? item.label : item.tip)"
                v-model="formData[item.model]" :disabled="item.disabled ? item.disabled : false" clearable>
            </el-input>
            <el-input v-if="item.type === 'password'" :placeholder="'请输入' + item.label" v-model="formData[item.model]"
                show-password>
            </el-input>
            <el-input v-if="item.type === 'textarea'" :type="item.type" :rows="2" placeholder="请输入内容"
                v-model="formData[item.model]" clearable style="width:500px">
            </el-input>
            <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="formData[item.model]">
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]"></el-switch>
            <el-tag v-if="item.type === 'tag'" :type="item.tagType">{{ formData[item.model] }}</el-tag>

            <el-radio-group v-if="item.type === 'radio'" v-model="formData[item.model]">
                <el-radio @change="typeRadio(item.value)" v-for="item in item.radios" :key="item.value"
                    :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <div class="uploadImg" v-if="item.type === 'upload'" style="width:500px">
                <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-progress="handleProgress" :http-request="upload"
                    :file-list="item.fileList" :limit="item.limit">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="item.dialogVisible">
                    <img width="80%" :src="item.dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-form-item>

        <slot></slot>

    </el-form>
</template>

<script>
export default {
    name: "CommonForm",
    props: {
        formData: Object,
        formLabel: Array,
        rules: Object,
        inline: Boolean,
        labelWidth: String
    },
    methods: {
        handlePictureCardPreview(file) {
            this.$emit("handlePictureCardPreview", file)
        },
        handleRemove(file, fileList) {
            this.$emit("handleRemove", file, fileList)
        },
        upload(res) {
            this.$emit("upload", res)
        },
        handleProgress(event, file, fileList) {
            this.$emit("handleProgress", event, file, fileList)
        },
        typeRadio(val) {
            this.$emit("typeRadio", val)
        }
    }
}
</script>

<style scoped>
/* .f /deep/.el-form-item {
    margin-bottom: 20px;
} */
</style>