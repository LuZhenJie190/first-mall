<template>
  <div class="recommend">
    <slot></slot>
    <br />
    <vue-seamless-scroll :data="recommendData1" :class-option="classOption" style="max-width:1180px;overflow:hidden">
      <ul class="recommend-list">
        <li v-for="(item, index) in recommendData" :key="index" @click="goDetail(item.pid)">
          <div class="recommend-detail">
            <img :src="item.mainImg" alt="" srcset="" />
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import { ProductDetail } from "../../api/product"
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "Recommend",
  components: {
    vueSeamlessScroll,
  },
  props: ["recommendData"],
  data() {
    return {
      recommendData1: [],
      classOption: {
        limitMoveNum: 2,
        direction: 3,
      },
    };
  },
  watch: {
    recommendData: {
      deep: true,
      handler(newVal, oldVal) {
        this.recommendData1 = this.recommendData;
      },
    },
  },
  methods: {
    goDetail(index) {
      ProductDetail(index).then(res => {
        if (res.code == 200) {
          this.$router.push({
            name: "productinfo",
            params: {
              details: res.data[0],
            },
          });
        }
      })
    }
  }
};
</script>

<style scoped>
.recommend-carousel .el-carousel__arrow--left {
  position: absolute;
  top: 120px;
  left: 0px;
  border-radius: 0;
  width: 20px;
  height: 80px;
}

.recommend-carousel .el-carousel__arrow--right {
  position: absolute;
  top: 120px;
  right: 0px;
  border-radius: 0;
  width: 20px;
  height: 80px;
}

.recommend {
  width: 1200px;
  margin: 30px auto;
  height: 300px;
  overflow: hidden;
}

.recommend-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.recommend-list li {
  margin: 10px 5px;
}

.recommend-detail {
  width: 190px;
  height: 260px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.recommend-detail img {
  width: 160px;
  height: 180px;
  padding-top: 10px;
  cursor: pointer;
}

.recommend-detail p {
  padding-top: 10px;
}
</style>