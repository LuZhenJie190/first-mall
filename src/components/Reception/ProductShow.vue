<template>
  <div class="productshow">
    <div class="title">
      <slot> </slot>
      <a>查看更多 <i class="el-icon-right"></i></a>
    </div>
    <div class="product-context">
      <div class="product-left">
        <img src="../../assets/bg1.png" alt="" />
      </div>
      <div class="product-right">
        <cards-list class="card" v-for="(p1, index) in products" :key="index">
          <template slot="image">
            <img class="images cardimg" src="../../assets/bg1.png" />
          </template>
          <template slot="title">
            <h3>{{ p1.title }}</h3>
          </template>
          <template slot="price">
            <h4 class="price">{{ p1.price }} 元</h4>
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
    return {};
  },
  mounted() {
    console.log(this.products);
  },
};
</script>

<style scoped>
.card {
  padding: 0;
  row-gap: 0px;
}
.card h3 {
  margin-bottom: 8px;
}
.cardimg {
  padding-top: 20px;
}
.productshow {
  margin-top: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
  justify-content: center;
  align-items: center;
}
.product-context {
  display: grid;
  grid-template-columns: 3fr 7fr;
  column-gap: 10px;
}
.product-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-right {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 10px;
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