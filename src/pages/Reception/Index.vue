<template>
  <div id="index">
    <div class="wrap">
      <Carousel :carouseldata="carouseldata" class="carousel" />
      <Classification />
      <Recommend><h1>推荐购</h1></Recommend>
      <div class="product-sort">
        <ProductShow :products="phoneData"><h1>手机</h1></ProductShow>
        <ProductShow :products="notebookData"><h1>笔记本</h1></ProductShow>
        <ProductShow><h1>电视</h1></ProductShow>
        <ProductShow><h1>手环</h1></ProductShow>
      </div>
    </div>
    <div class="index-footer">
      <ul class="footer-list">
        <li class="footer-list-item" v-for="item in footer" :key="item.id">
          <img :src="item.imgurl" alt="" />
          <span>{{ item.title }}</span>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <DsFooter />
  </div>
</template>

<script>
import axios from "axios";
import Carousel from "../../components/Reception/Carousel.vue";
import Classification from "../../components/Reception/Classification.vue";
import ProductShow from "../../components/Reception/ProductShow.vue";
import Recommend from "../../components/Reception/Recommend.vue";
import DsFooter from "../../components/Reception/DsFooter.vue";

export default {
  name: "Index",
  components: {
    Carousel,
    Classification,
    ProductShow,
    Recommend,
    DsFooter,
  },
  data() {
    return {
      sorts: [
        { id: "01", title: "手机", url: require("../../assets/bg1.png") },
        { id: "02", title: "笔记本" },
        { id: "03", title: "电视" },
        { id: "04", title: "手环" },
      ],
      carouseldata: [
        { id: "01", imgurl: require("../../assets/bg1.png") },
        { id: "02", imgurl: require("../../assets/bg1.png") },
        { id: "03", imgurl: require("../../assets/bg1.png") },
        { id: "04", imgurl: require("../../assets/bg1.png") },
      ],
      phoneData: [
        { title: "小米12pro", price: 1235 },
        { title: "小米13pro", price: 1222 },
        { title: "小米14pro", price: 13335 },
        { title: "小米15pro", price: 1215 },
        { title: "小米15pro", price: 1215 },
        { title: "小米15pro", price: 1215 },
        { title: "小米13pro", price: 1222 },
        { title: "小米14pro", price: 13335 },
      ],
      notebookData: [
        { title: "小米笔记本", price: 1235 },
        { title: "红米笔记本", price: 1222 },
        { title: "华为笔记本", price: 13335 },
        { title: "联想笔记本", price: 1215 },
        { title: "小米15pro", price: 1215 },
        { title: "小米15pro", price: 1215 },
        { title: "小米13pro", price: 1222 },
        { title: "小米14pro", price: 13335 },
      ],
      footer: [
        {
          id: "01",
          imgurl: require("../../assets/7w.png"),
          title: "7天无理由",
        },
        {
          id: "02",
          imgurl: require("../../assets/15t.png"),
          title: "15天包退还",
        },
        {
          id: "03",
          imgurl: require("../../assets/baoyou.png"),
          title: "满199包邮",
        },
        {
          id: "04",
          imgurl: require("../../assets/weixiu.png"),
          title: "维修服务",
        },
      ],
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:8089/springmvc_ssm_191_war_exploded/advertising/advertising/list?type=0"
      )
      .then((res) => {
        console.log(res);
        this.carouseldata = res.data;
      });
  },
};
</script>

<style scoped>
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.index-footer {
  width: 100%;
  height: 100px;
  background: #fff;
  position: relative;
  bottom: -30px;
  border-bottom: 1px solid #eee;
}
.footer-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px 0px 0px 80px;
  height: 100px;
}
.footer-list-item img {
  width: 50px;
  height: 50px;
}
.footer-list-item span {
  margin-left: 50px;
}
.footer-list-item {
  display: flex;
  align-items: center;
  width: 250px;
  height: 30px;
  border-right: 1px solid #ccc;
}
.footer-list li:last-child {
  border-right: none;
}
.carousel {
  width: 1500px;
  margin-left: -150px;
}
</style>