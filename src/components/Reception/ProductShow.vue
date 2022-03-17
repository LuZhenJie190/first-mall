<template>
  <div id="productshow">
    <div class="title">
      <h1>手机</h1>
      <a>查看更多 <i class="el-icon-right"></i></a>
    </div>
    <div class="product-context">
       <div class="product-left">
         <img src="../../assets/bg1.png" alt="">
      </div>
       <div class="product-right">
          <cards-list/>
          <cards-list/>
          <cards-list/>
          <cards-list/>
          <cards-list/>
          <cards-list/>
          <cards-list/>
          <cards-list/>
       </div>
    </div>
     
  </div>
</template>

<script>
import CardsList from "./CardsList.vue";
export default {
  components: { CardsList },
  name: "ProductShow",
  props: ["sorts"],
  data() {
    return {
     
    };
  },
};
</script>

<style scoped>
#productshow{
  margin-top: 50px;
}
.product-context{
  width: 100%;
  height: 500px;
  background: #fff;
  display: flex;
}
.product-left{
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-left img{
  width: 340px;
  height: 480px;
}
.product-right{
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.title{
  display: flex;
  justify-content: space-between;
}
.title h1{
  margin-bottom: 10px;
}
.title a{
  position: relative;
  bottom: -25px;
}
</style>