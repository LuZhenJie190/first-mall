<template>
  <div class="product-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="categoryInfo.categoryName" :name="categoryInfo.pcid">
        <div style="margin-left: 5px">品牌</div>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"><i class="el-icon-plus"></i>
        </el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "ProductCollapse",
  props: ["categoryList1"],
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: true,
      inputValue: '',
    }
  },
  created() {
    console.log(this.categoryList1);
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
};

</script>

<style>
.collapse .el-tag {
  margin: 5px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.collapse {
  margin: 10px;
  width: 20%;
  box-shadow: 0px 0px 10px 1px #eee;
}

.collapse .el-collapse-item__header {
  background: #409EFF;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-left: 10px;
  color: #fff;
}

.collapse .el-collapse-item__content {
  padding: 10px;
}
</style>