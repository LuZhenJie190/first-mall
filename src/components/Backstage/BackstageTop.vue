<template>
  <div class="backstage-top">
    <div class="sys-header">
      <h1>数码购后台管理系统</h1>
      <span class="now-time">北京时间 : {{ nowTime }}</span>
      <span class="quit">
        <p>管理员：{{ name }}</p>
        <el-button type="primary" plain size="mini" @click="backTo">退出</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { getnowDate } from "../../utils/index";
export default {
  name: "BackstageTop",
  data() {
    return {
      nowTime: "",
      name: localStorage.getItem("rootName"),
    };
  },
  created() {
    this.getTime();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 获取当前时间
    getTime() {
      this.timer = setInterval(() => {
        this.nowTime = getnowDate();
      }, 100);
    },
    backTo() {
      this.$router.replace({
        path: "/BackLogin",
      });
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
.sys-header {
  display: flex;
  justify-content: space-between;
}

.sys-header h1 {
  padding: 15px 0px 10px 0px;
}

.now-time {
  width: 250px;
  line-height: 60px;
}

.quit {
  display: flex;
  align-items: center;
}

.quit p {
  margin-right: 15px;
}
</style>