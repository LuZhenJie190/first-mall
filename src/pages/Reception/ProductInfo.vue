<template>
  <div class="info">
    <div class="wrap">
      <div class="info-left">
        <!-- v-for="item in productData.productImage" :key="item.imgid" -->
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in carouselList" :key="item.imgid">
              <img :src="item.url">
            </div>

          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination" v-if="carouselList.length != 1"></div>

          <!-- 如果需要导航按钮 -->
          <div v-if="carouselList.length != 1">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>

        </div>
      </div>
      <div class="info-right">
        <div class="top">
          <h1>
            {{ productData.title }} {{ params2.pmVersion }}
            {{ params1.pmColor }}
          </h1>
          <p class="sub-title">
            {{ productData.subTitle }}
          </p>
          <p class="price" v-if="total == ''">
            {{ productData.productParams[0].price || 2999 }} 元
          </p>
          <p class="price" v-if="total != ''">{{ total }} 元</p>
        </div>
        <div class="conter">
          <div class="colors">
            <h2>选择颜色</h2>
            <ul>
              <li v-show="listShow">加载中</li>
              <li v-for="(item, index) in colorList" :key="index" @click="colorIndex(index)" v-show="!listShow"
                :class="{ active: current == index }" ref="color">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="versions">
            <h2>选择版本</h2>
            <ul>
              <li v-show="listShow">加载中</li>
              <li v-for="(item, index) in versionList" :key="index" @click="versionIndex(index)" v-show="!listShow"
                :class="{ active: current1 == index }" ref="version">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="number">
            <h2>数量</h2>
            <el-input-number v-model="cartInfo.productNumber" @change="numberChange" :min="1" :max="10">
            </el-input-number>
          </div>
        </div>
        <div class="bottom">
          <div class="total">
            <span>{{ productData.title }} {{ params2.pmVersion }}
              {{ params1.pmColor }}</span>
            <span>{{ total }}元</span>
            <h1>总计：<span style="margin:0px 5px">{{ allTotal }}</span>元</h1>
          </div>
          <button class="cart" @click="addToCart">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"; // 注意引入的是Swiper
import { ProductGetPrice, ProductDetail, ProductGetCV } from "../../api/product";
import { CartInsert } from "../../api/cart";

export default {
  name: "ProductInfo",
  data() {
    return {
      productData: null,
      productNumber: "",
      show: true,
      current: -1,
      current1: -1,
      p: "",
      params1: {
        productId: "",
        pmColor: "",
      },
      params2: {
        productId: "",
        pmVersion: "",
      },
      cvparams: {
        productId: "",
        pmColor: "",
        pmVersion: "",
      },
      total: "",
      colorList: [],
      versionList: [],
      cartInfo: {
        userId: localStorage.getItem("uid"),
        pid: "",
        productTitle: "",
        productImg: "",
        productNumber: "1",
        productPrice: "",
        isChecked: "0",
        total: "",
      },
      carouselList: [],
      listShow: true,
      c1: '',
      v1: '',
    };
  },
  watch: {
    carouselList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper', {

            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
              crossFade: true,
            }
          })
        })
      },
    },
    selected: {
      handler(newValue, oldValue) {
        let str = newValue.join(" ");
        this.addressBefore = str;
      },
    },
    params1: {
      deep: true,
      handler(newValue, oldValue) {
        ProductGetCV(this.params1).then((res) => {
          this.cvparams.pmColor = this.params1.pmColor;
          let versions = res.data.map((e) => {
            return e.pmVersion;
          });
          this.versionList = [...new Set(versions)];

        });
      },
    },
    params2: {
      deep: true,
      handler(newValue, oldValue) {
        ProductGetCV(this.params2).then((res) => {
          this.cvparams.pmVersion = this.params2.pmVersion;
          let colors = res.data.map((e) => {
            return e.pmColor;
          });
          this.colorList = [...new Set(colors)];
        });
      },
    },
    cvparams: {
      deep: true,
      handler(newValue, oldValue) {
        this.cvparams.productId = this.params1.productId;
        if (this.cvparams.pmColor != "" && this.cvparams.pmVersion != "") {
          // console.log(this.cvparams);

          ProductGetPrice(this.cvparams).then((res) => {
            // console.log(res);
            this.total = res.data.price;
          });
        }
      },
    },
  },
  computed: {
    allTotal() {
      let sum = 0;
      let result = this.total * this.cartInfo.productNumber;
      sum += result;
      return sum;
    },
  },
  created() {
    this.getDetail();
    this.getCarousel();
  },
  // beforeDestroy() {
  //   localStorage.removeItem("info");
  // },
  methods: {
    getCV() {
      ProductGetCV(this.params1)
        .then((res) => {
          let c = res.data.map((e) => {
            return e.pmColor;
          });
          let v = res.data.map((e) => {
            return e.pmVersion;
          });
          this.colorList = [...new Set(c)];
          this.versionList = [...new Set(v)];
          this.listShow = false;
        })
    },
    getCarousel() {
      ProductDetail(this.productData.pid).then(res => {
        //console.log(res);
        this.carouselList = res.data[0].productImage;
      })
    },
    addToCart() {
      this.cartInfo.pid = this.productData.pid;
      this.cartInfo.productTitle = `${this.productData.title} ${this.params2.pmVersion} ${this.params1.pmColor}`;
      this.cartInfo.productImg = this.productData.mainImg;
      this.cartInfo.productPrice = this.total;
      this.cartInfo.total = this.allTotal;

      if (this.cartInfo.total == "") {
        this.$alert("请选择颜色和版本");
      } else if (this.cartInfo.userId == null) {
        this.$router.push({
          path: "/Login"
        })
      } else {
        CartInsert(this.cartInfo).then((res) => {
          if (res.code == 200) {
            this.$alert("加入成功", {
              callback: () => {
                this.$router.push({
                  name: "shoppingCart",
                  params: {
                    product: this.productData,
                  },
                });
              },
            });
          }
        });
      }
    },
    getDetail() {
      // console.log(this.$route.params.details);
      if (this.$route.params.details != undefined) {
        localStorage.setItem(
          "info",
          JSON.stringify(this.$route.params.details)
        );
      }
      let info = JSON.parse(localStorage.getItem("info"));
      this.productData = info;
      this.params1.productId = this.productData.pid;
      this.params2.productId = this.productData.pid;
      this.getCV();
    },
    colorIndex(val) {
      // console.log(this.$refs.color[val].innerText);
      this.current = val;
      this.params1.pmColor = this.$refs.color[val].innerText;
      // console.log(this.params1.pmColor);
    },
    versionIndex(val) {
      // console.log(val);
      // console.log(this.$refs.version[val].innerText);
      this.current1 = val;
      this.params2.pmVersion = this.$refs.version[val].innerText;
    },
    numberChange(val) {
      this.cartInfo.productNumber = val;
    },
  },
};
</script>

<style scoped>
.info {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}

.wrap {
  display: flex;
  padding-top: 100px;
}

.info-left {
  flex: 4.8;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.info-right {
  flex: 5.5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin-left: 50px;
}

.top {
  border-bottom: 1px solid #ccc;
}

.top h1 {
  font-weight: 500;

}

.sub-title {
  color: #757575;
  margin: 10px 0;
}

.price {
  font-size: 18px;
  color: #be0f2d;
  padding: 10px 0;
}

.address {
  background-color: #eee;
  line-height: 80px;
  padding: 0 20px;
}

.address a {
  color: #be0f2d;
}

.colors,
.versions,
.number {
  margin-top: 20px;
}

.colors h2,
.versions h2,
.number h2 {
  font-weight: 500;
  margin: 15px 0;
}

.colors ul,
.versions ul {
  display: flex;
  margin: 15px 0px;
}

.colors li,
.versions li {
  padding: 10px 50px;
  box-sizing: border-box;
  border: 1px solid #eee;
  margin-right: 10px;
  cursor: pointer;
}

.colors li:hover,
.versions li:hover {
  border: 1px solid #be0f2d;
  color: #be0f2d;
  transition: 0.3s;
}

.active {
  border: 1px solid #be0f2d !important;
  color: #be0f2d;
}

.bottom {
  margin-top: 20px;
}

.total {
  background-color: #eee;
  line-height: 40px;
  padding: 10px 30px;
  margin-bottom: 20px;
}

.total span :first-child {
  float: left;
}

.total :nth-child(2) {
  float: right;
}

.total h1 {
  font-weight: 500;
  color: #be0f2d;
  font-size: 24px;
}

.cart {
  border: none;
  outline: none;
  background: #be0f2d;
  color: #fff;
  padding: 15px 100px;
  cursor: pointer;
}

.swiper {
  width: 100%;
  position: relative;
}

.swiper-slide {
  width: 100% !important;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: #e3e3e3;
  font-size: 30px;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(120, 116, 116, 0.4);
  transition: .2s;
}

.swiper-button-prev {
  left: 0px;

}

.swiper-button-next {
  right: 0px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-position: center;
}

.info /deep/.swiper-pagination-bullet {
  background-color: gray !important;
  width: 20px;
  height: 3px;
  border-radius: 0px;
  transform: translateY(-20px);
}
</style>