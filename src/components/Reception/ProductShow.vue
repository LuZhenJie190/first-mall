<template>
  <div class="productshow">
    <div class="title">
      <slot name="pTitle"></slot>
      <slot name="getMore"></slot>
    </div>
    <div class="product-context">
      <div class="product-right">
        <card class="card" v-for="(p1, index) in products.slice(0, 8)" :key="index" @click.native="goDetail(p1)">
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
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: { Card },
  name: "ProductShow",
  props: ['products'],
  data() {
    return {
      recommendData: [],
    };
  },
  methods: {
    goDetail(data) {
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
  width: 100%;
  min-width: 280px;
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
  padding: 30px 0;
  width: 100%;
  overflow: hidden;
}

.product-right {
  width: 100%;
  min-width: 1180px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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