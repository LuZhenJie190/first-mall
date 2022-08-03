import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
import store from './store/index'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// swiper
import "swiper/css/swiper.css";
// 引入element-ui组件库
import "./utils/element-ui.js"

// 地区选择器
import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css'; // v2 or higher
Vue.use(VueAreaLinkage);

// 动画库
import animated from 'animate.css'
Vue.use(animated);

// 图表库
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

// 注册全局组件
import BackstageSearch from './components/Backstage/BackstageSearch.vue'
// 后台搜索组件
Vue.component(BackstageSearch.name, BackstageSearch);

new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')