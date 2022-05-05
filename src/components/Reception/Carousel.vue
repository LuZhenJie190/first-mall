<template>
  <div class="carousel">
    <el-carousel
      :interval="4000"
      type="card"
      height="600px"
      class="carousel-main"
    >
      <el-carousel-item
        class="carousel-item"
        v-for="(item, index) in carouselData.slice(0, 4)"
        :key="index"
      >
        <img class="carousel-img" :src="item.mainImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { ProductgetAll } from "../../api/index";
export default {
  name: "Carousel",
  props: ["carouselData"],
  data() {
    return {};
  },
  created() {
    // console.log(this.carouselData);
  },
};
</script>

<style scoped>
.carousel {
  margin: 15px 0px;
}
.carousel /deep/ .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.carousel-main h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.carousel-item:nth-child(2n) {
  background-color: #99a9bf;
  width: 90%;
  position: absolute;
  left: -20%;
  border-radius: 3px;
}

.carousel-item:nth-child(2n + 1) {
  background-color: #d3dce6;
  width: 90%;
  position: absolute;
  left: -20%;
  border-radius: 3px;
}
.carousel-img {
  width: 100%;
  height: 100%;
}
.el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>