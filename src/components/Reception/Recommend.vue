<template>
  <div class="recommend">
    <slot></slot>
    <br />
    <vue-seamless-scroll
      :data="recommendData1"
      :class-option="classOption"
      class="warp"
    >
      <ul class="recommend-list">
        <li v-for="(item, index) in recommendData" :key="index">
          <div class="recommend-detail">
            <img :src="item.mainImg" alt="" srcset="" />
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "Recommend",
  components: {
    vueSeamlessScroll,
  },
  props: ["recommendData"],
  data() {
    return {
      recommendData1: [],
      classOption: {
        limitMoveNum: 2,
        direction: 3,
      },
    };
  },
  watch: {
    recommendData: {
      deep: true,
      handler(newVal, oldVal) {
        this.recommendData1 = this.recommendData;
      },
    },
  },
};
</script>

<style scoped>
.recommend-carousel .el-carousel__arrow--left {
  position: absolute;
  top: 120px;
  left: 0px;
  border-radius: 0;
  width: 20px;
  height: 80px;
}
.recommend-carousel .el-carousel__arrow--right {
  position: absolute;
  top: 120px;
  right: 0px;
  border-radius: 0;
  width: 20px;
  height: 80px;
}
.recommend {
  width: 100%;
  height: 300px;
  margin-top: 30px;
  overflow: hidden;
}
.recommend-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.recommend-detail {
  width: 190px;
  height: 260px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recommend-detail img {
  width: 98%;
  height: 220px;
  cursor: pointer;
}
</style>