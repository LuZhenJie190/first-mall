<template>
  <div class="counter">
    <el-input-number
      v-model="num"
      @change="handleChange"
      :min="1"
      :max="10"
      size="small"
      label="描述文字"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: ["number"],
  data() {
    return {
      num: 1,
    };
  },
  created() {
    console.log(this.number);
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style>
/* .el-input-number:hover{
  border: 1px solid red !important;
} */
/* .el-input-number__decrease:hover{
  border: 1px solid red !important;
} */
</style>