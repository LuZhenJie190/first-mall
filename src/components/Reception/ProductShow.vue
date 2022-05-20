<template>
  <div class="productshow">
    <div class="title">
      <slot name="pTitle"></slot>
      <slot name="getMore"></slot>
    </div>
    <div class="product-context">
      <div class="product-right">
        <cards-list class="card" v-for="(p1, index) in recommendData.slice(0, 8)" :key="index"
          @click.native="goDetail(p1)">
          <template slot="image">
            <img class="images cardimg" :src="p1.mainImg" />
          </template>
          <template slot="title">
            <h3>{{ p1.title }}</h3>
          </template>
          <template slot="subtitle">
            <p class="subt">{{ p1.subTitle }}</p>
          </template>
          <template slot="price">
            <h4 class="price">{{ p1.productParams[0].price }} 元</h4>
          </template>
        </cards-list>
      </div>
    </div>
  </div>
</template>

<script>
import CardsList from "./Card.vue";
export default {
  components: { CardsList },
  name: "ProductShow",
  props: ["sorts", "products"],
  data() {
    return {
      recommendData: [],
    };
  },
  created() {

  },
  watch: {
    // 监听props的数据，解决无法读取到父组件数据的问题
    products: {
      deep: true,
      handler(newVal, oldVal) {
        this.recommendData = this.products

      },
    },
  },
  methods: {
    goDetail(data) {
      // console.log(data);
      this.$router.push({
        name: "productinfo",
        params: {
          details: data,
        },
      });
    }
  },
};
</script>

<style scoped>
.get-more {
  color: #424242;
}

.get-more:hover {
  color: #be0f2d;
  transition: .3s;
}

.card {
  padding: 0;
  row-gap: 0px;
  width: 100%;
  height: 350px;
}

.card h3 {
  margin-top: -10px;
  margin-bottom: 8px;
}

.cardimg {
  padding-top: 20px;
  width: 200px;
  height: 200px;
}

.card .subt {
  padding: 0 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.productshow {
  margin-top: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product-right {
  display: grid;
  width: 1200px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 15px;
  row-gap: 15px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.title h1 {
  margin-bottom: 10px;
}

.title a {
  line-height: 40px;
}
</style>