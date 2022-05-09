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
          <template slot="pImage">
            <img src="../../assets/login_bg.jpg" />
          </template>
        </ProductShow>
        <ProductShow :products="notebookData">
          <template slot="pTitle">
            <h1>笔记本</h1>
          </template>
          <template slot="pImage">
            <img src="../../assets/login_bg.jpg" />
          </template>
        </ProductShow>
        <ProductShow :products="tvData">
          <template slot="pTitle">
            <h1>电视</h1>
          </template>
          <template slot="pImage">
            <img src="../../assets/login_bg.jpg" />
          </template>
        </ProductShow>
        <ProductShow :products="braceletData">
          <template slot="pTitle">
            <h1>手环</h1>
          </template>
          <template slot="pImage">
            <img src="../../assets/login_bg.jpg" /> </template>
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
import axios from "axios";
import Carousel from "../../components/Reception/Carousel.vue";
import Classification from "../../components/Reception/Classification.vue";
import ProductShow from "../../components/Reception/ProductShow.vue";
import Recommend from "../../components/Reception/Recommend.vue";
import DsFooter from "../../components/Reception/DsFooter.vue";
import { ProductgetAll, ProductGetByCate, ProductCategory } from "../../api/index";
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
        let array1 = [];
        let array2 = [];

        res.data.forEach(e => {
          array1 = e.productBrand;
        })

        array1.forEach(e => {
          // console.log(e.product);
          e.product.forEach(ee => {
            array2.push(ee)
          })
        })

        this.phoneData = array2.filter(e => {
          if (e.categoryId == 1001) {
            return e;
          }
        })
        console.log("css", this.phoneData);





      })
      // for (let index = 1001; index < 1005; index++) {
      //   ProductGetByCate(index).then((res) => {
      //     console.log("pc", res);
      //     // index == 1001 ? (this.phoneData = res.data) : [];
      //     // index == 1002 ? (this.notebookData = res.data) : [];
      //     // index == 1003 ? (this.tvData = res.data) : [];
      //     // index == 1004 ? (this.braceletData = res.data) : [];
      //   });
      // }
    },
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
</style>