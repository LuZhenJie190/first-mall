<template>
  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next ,total"
      :total="this.pageInfo.pageTotal"
      :current-page="curPage"
      :page-count="pNum"
      :page-size="this.pageInfo.pageSize"
      @current-change="paper"
      v-show="this.pageInfo.pageShow"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: ["pageInfo"],
  data() {
    return {
      tableData: [],
      curPage: 1,
      total: 0,
      pNum: 1,
    };
  },
  created() {
    this.pNum = this.pageInfo.pageNum;
  },
  methods: {
    // 把当前显示页数赋值给pageNum
    paper(curPage) {
      console.log(curPage);
      this.pNum = curPage;
      this.$emit("pNum", this.pNum);
    },
  },
};
</script>

<style scoped>
</style>