<template>
  <div class="carousel">
    <el-carousel
      :interval="4000"
      type="card"
      height="600px"
      class="carousel-main"
    >
      <el-carousel-item class="carousel-item" v-for="(item,index) in carouseldata " :key="index">
        <img class="carousel-img" :src="item.imgurl" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  props:['carouseldata'],
  data() {
    return {
      // imgUrl:[
      //     {id:'001',url:require("../assets/logo.png")},
      //     {id:'002',url:'../assets/logo.png'},
      //     {id:'003',url:require("../assets/logo.png")},
      //     {id:'004',url:'../assets/logo.png'},
      // ]
    };
  },

};
</script>

<style>
.carousel {
 margin: 15px 0px;

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
.carousel-img{
    width: 100%;
    height: 100%;
}
.el-carousel__button{
    width: 8px;
    height: 8px;
    border-radius: 100%;
}
</style>