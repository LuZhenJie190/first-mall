<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadHeader",
};
</script>

<style scoped>
.bread /deep/ .el-breadcrumb__inner.is-link {
  color: #000;
}

.bread /deep/ .el-breadcrumb__inner.is-link:hover {
  color: #be0f2d;
}
</style>