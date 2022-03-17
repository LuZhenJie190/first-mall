import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import {
  Button,
  Menu,
  MenuItem,
  Submenu,
  Input,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Card,
  Backtop,
  Steps,
  Step,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Container,
  Header,
  Aside,
  Main,
  Col,
  MenuItemGroup,
  Table,
  TableColumn,
  Pagination,
  Switch,
  RadioGroup,
  RadioButton,
  Radio,
  Upload,
  Dialog,
  Select,
  Option,
  Image,

} from 'element-ui';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueRouter),
  Vue.use(Button),
  Vue.use(Menu),
  Vue.use(Submenu),
  Vue.use(MenuItem),
  Vue.use(Input),
  Vue.use(Form),
  Vue.use(FormItem),
  Vue.use(Carousel),
  Vue.use(CarouselItem),
  Vue.use(Backtop),
  Vue.use(Steps),
  Vue.use(Step),
  Vue.use(DatePicker),
  Vue.use(Breadcrumb),
  Vue.use(BreadcrumbItem),
  Vue.use(Tabs),
  Vue.use(TabPane),
  Vue.use(Container),
  Vue.use(Header),
  Vue.use(Aside),
  Vue.use(Main),
  Vue.use(Col),
  Vue.use(MenuItemGroup),
  Vue.use(Table),
  Vue.use(TableColumn),
  Vue.use(Pagination),
  Vue.use(Switch),
  Vue.use(RadioGroup),
  Vue.use(RadioButton),
  Vue.use(Radio),
  Vue.use(Upload),
  Vue.use(Dialog),
  Vue.use(Select),
  Vue.use(Option),
  Vue.use(Image),
  Vue.use(Card),



  new Vue({
    
    render: h => h(App),
    
    router,
    
  }).$mount('#app')