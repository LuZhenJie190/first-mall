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
        <cards-list />
        <cards-list />
        <cards-list />
        <cards-list />
        <cards-list />
        <cards-list />
        <cards-list />
        <cards-list />
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
    return {};
  },
};
</script>

<style scoped>
.productshow {
  margin-top: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 550px;
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