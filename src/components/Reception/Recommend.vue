<template>
  <div id="recommend">
    <h1>推荐购</h1>
    <br>
      <el-carousel class="recommend-carousel" indicator-position="none" :autoplay="false">
    <el-carousel-item v-for="item in 2" :key="item" class="recommend-carousel-item">
          <ul class="recommend-list">
      <li v-for="(item, index) in cardsDatas" :key="index">
        <div class="recommend-detail">
          <img :src="item.activity_posters" alt="" srcset="">
          <p>{{item.activity_title}}</p>
        </div>
      </li>
    </ul>
    </el-carousel-item>
  </el-carousel>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Recommend",
  data() {
    return {
      cardsDatas: [
        {},{},{},{},{},{}
      ],
    };
  },
    mounted() {
    // axios.get('http://localhost:8089/springmvc_ssm_191_war_exploded/activity/activity/actList?pageNum=1&pageSize=6').then((res)=>{
    //   this.cardsDatas=res.data
    // })
  },
};
</script>

<style >
.recommend-carousel .el-carousel__arrow--left{
    position: absolute;
  top: 120px;
 left:0px;
 border-radius: 0;
 width: 20px;
 height: 80px;
}
.recommend-carousel .el-carousel__arrow--right{
  position: absolute;
  top: 120px;
 right: 0px;
 border-radius: 0;
 width: 20px;
 height: 80px;

}
#recommend {
   width: 100%;
  height: 300px;
  margin-top: 30px;
}
.recommend-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
/* .recommend-list li:hover{
  box-shadow: 0px 0px 10px #ccc;
  transition: 0.5s;
} */
.recommend-detail {
  width: 190px;
  height: 260px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recommend-detail img{
  width: 98%;
   height: 220px;
   cursor: pointer;
}
</style>