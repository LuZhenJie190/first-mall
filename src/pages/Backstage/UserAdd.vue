<template>
  <div id="useradd">
    <h1>添加用户</h1>
    <add-form :btnsubmit="btnsubmit" :uCreateTime="uCreateTime"/>
  </div>
</template>

<script>
import { getnowDate } from "../../utils/index";
import AddForm from '../../components/Backstage/AddForm.vue'
export default {
  name: "UserAdd",
  components:{AddForm},
  data() {
    return {
      btnsubmit:"点击添加",
      uCreateTime:"",
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
        this.uCreateTime=getnowDate();
      }, 100);
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