<template>
  <div id="index">
    <Carousel :carouselData="carouselData" class="carousel" />
    <div class="wrap">
      <Classification />
      <Recommend :recommendData="recommendData">
        <h1>推荐购</h1>
      </Recommend>
      <div class="product-sort" v-for="item in showData" :key="item.path">
        <ProductShow :products="item.prop">
          <template slot="pTitle">
            <h1>{{ item.title }}</h1>
          </template>
          <template slot="getMore">
            <router-link :to="item.path" class="get-more">查看更多 <i class="el-icon-right"></i></router-link>
          </template>
        </ProductShow>
      </div>
    </div>

  </div>
</template>

<script>
import Carousel from "../../components/Reception/Carousel.vue";
import Classification from "../../components/Reception/Classification.vue";
import ProductShow from "../../components/Reception/ProductShow.vue";
import Recommend from "../../components/Reception/Recommend.vue";
import { ProductgetAll, ProductCategory } from "../../api/product";
export default {
  name: "Index",
  components: {
    Carousel,
    Classification,
    ProductShow,
    Recommend,
  },
  data() {
    return {
      phoneData: [],
      notebookData: [],
      tvData: [],
      braceletData: [],
      carouselData: [],
      recommendData: [],
      showData: [
        { prop: [], title: '手机', path: '/MobilePhone' },
        { prop: [], title: '笔记本', path: '/Notebook' },
        { prop: [], title: '电视', path: '/Television' },
        { prop: [], title: '智能穿戴', path: '/Bracelet' },
      ],
      count: {
        pageNum: 1,
        pageSize: 100
      }
    };
  },
  created() {
    ProductgetAll({ pageNum: this.count.pageNum, pageSize: this.count.pageSize }).then((res) => {
      // console.log("index", res);
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
      ProductCategory().then(({ data: res }) => {
        let arr1 = [];
        arr1.push(...res)
        const brand = [...(arr1.map(item => item.productBrand))];
        let arr2 = [];
        brand.forEach(item => {
          arr2.push(...item)
        });
        let arr3 = [];
        arr2.forEach(item => {
          arr3.push(...item.product)
        })
        this.showData[0].prop = this.phoneData = (arr3.filter(item => item.categoryId === 1001)).reverse();
        this.showData[1].prop = this.notebookData = (arr3.filter(item => item.categoryId === 1002)).reverse();
        this.showData[2].prop = this.tvData = (arr3.filter(item => item.categoryId === 1003)).reverse();
        this.showData[3].prop = this.braceletData = (arr3.filter(item => item.categoryId === 1004)).reverse();
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

#index {
  padding-top: 70px;
}
</style>