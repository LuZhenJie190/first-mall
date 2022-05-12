<template>
  <div id="index">
    <div class="wrap">
      <Carousel :carouselData="carouselData" class="carousel" />
      <Classification />
      <Recommend :recommendData="recommendData">
        <h1>推荐购</h1>
      </Recommend>
      <div class="product-sort">
        <ProductShow :products="phoneData">
          <template slot="pTitle">
            <h1>手机</h1>
          </template>
          <template slot="getMore">
            <router-link to="/MobilePhone" class="get-more">查看更多 <i class="el-icon-right"></i></router-link>
          </template>
        </ProductShow>

        <ProductShow :products="notebookData">
          <template slot="pTitle">
            <h1>笔记本</h1>
          </template>
          <template slot="getMore">
            <router-link to="/Notebook" class="get-more">查看更多 <i class="el-icon-right"></i></router-link>
          </template>
        </ProductShow>

        <ProductShow :products="tvData">
          <template slot="pTitle">
            <h1>电视</h1>
          </template>
          <template slot="getMore">
            <router-link to="/Television" class="get-more">查看更多 <i class="el-icon-right"></i></router-link>
          </template>
        </ProductShow>

        <ProductShow :products="braceletData">
          <template slot="pTitle">
            <h1>智能穿戴</h1>
          </template>
          <template slot="getMore">
            <router-link to="/Bracelet" class="get-more">查看更多 <i class="el-icon-right"></i></router-link>
          </template>
        </ProductShow>
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
import Carousel from "../../components/Reception/Carousel.vue";
import Classification from "../../components/Reception/Classification.vue";
import ProductShow from "../../components/Reception/ProductShow.vue";
import Recommend from "../../components/Reception/Recommend.vue";
import DsFooter from "../../components/Reception/DsFooter.vue";
import { ProductgetAll, ProductCategory } from "../../api/index";
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
      phoneData: [],
      notebookData: [],
      tvData: [],
      braceletData: [],
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
      carouselData: [],
      recommendData: [],
      pp: [],
    };
  },
  created() {
    ProductgetAll(1, 1000).then((res) => {
      console.log("index", res);
      res.data.list.forEach((element) => {

        if (element.isCarousel) {

          this.carouselData.push(element);
          console.log("element", this.carouselData);
        }
        if (element.isRecommend) {
          this.recommendData.push(element);
        }
      });
    });
    this.getSomeData();
  },
  methods: {
    getSomeData() {
      ProductCategory().then(res => {
        console.log("pc", res);
        let array = [];
        let array1001 = [];
        let array1002 = [];
        let array1003 = [];
        let array1004 = [];

        let phoneList = [];
        let nbList = [];
        let tvList = [];
        let wbList = [];

        res.data.forEach(e => { array.push(e.productBrand); })

        phoneList = array[0];
        nbList = array[1];
        tvList = array[2];
        wbList = array[3];

        phoneList.forEach(e => { e.product.forEach(ee => { array1001.push(ee); }) })
        nbList.forEach(e => { e.product.forEach(ee => { array1002.push(ee); }) })
        tvList.forEach(e => { e.product.forEach(ee => { array1004.push(ee); }) })
        wbList.forEach(e => { e.product.forEach(ee => { array1003.push(ee); }) })

        array1001.reverse();
        array1002.reverse();
        array1003.reverse();
        array1004.reverse();

        this.phoneData = array1001.filter(e => { if (e.categoryId == 1001) return e })
        this.notebookData = array1002.filter(e => { if (e.categoryId == 1002) return e })
        this.tvData = array1003.filter(e => { if (e.categoryId == 1003) return e })
        this.braceletData = array1004.filter(e => { if (e.categoryId == 1004) return e })

      })
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 24px;
  color: #757575;
}

.wrap {
  /* max-width: 1200px;
  margin: 0 auto; */
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
</style>