<template>
  <div class="carousel">
    <el-carousel class="carousel-main">
      <el-carousel-item class="carousel-item" v-for="(item, index) in carouselData.slice(0, 4)" :key="index">
        <img class="carousel-img" :src="item.carousel.carouselImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: ["carouselData"],
  data() {
    return {
    };
  },
  created() {
    console.log(this.carouselData);
  },
};
</script>

<style scoped>
.carousel {
  height: 100vh;
  width: 99.8vw;
  position: relative;
  top: -10px;
  left: -180px;
}

.carousel /deep/ .el-carousel__container {
  height: 100vh;
}

.carousel /deep/ .el-carousel__button {
  width: 20px;
  height: 5px;
  border-radius: 0px;
  background-color: gray;
}

.carousel /deep/ .el-carousel__arrow {
  border-radius: 0px;
  height: 80px;
}

.carousel /deep/ .el-carousel__arrow--left {
  left: 10px;
}

.carousel /deep/ .el-carousel__arrow--right {
  right: 0px;
}

.carousel-main {
  width: 100%;
  height: 100vh;
  margin-top: -60px;
  padding: 0;
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
  width: 100vw;
  height: 100vh;
  position: absolute;
  /* left: -20%; */
  border-radius: 3px;
}

.carousel-item:nth-child(2n + 1) {
  background-color: #d3dce6;
  width: 100vw;
  height: 100vh;
  position: absolute;
  /* left: -20%; */
  border-radius: 3px;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>