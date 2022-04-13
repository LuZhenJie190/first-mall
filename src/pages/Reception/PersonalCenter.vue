<template>
  <div class="center">
    <div class="wrap">
    <bread-header>个人中心</bread-header>  
    <div class="container"> 
      <aside class="conter-left">
        <h2>个人中心</h2>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" class="menu-item">
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="2" class="menu-item">
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="3" class="menu-item">
            <span slot="title">我的购物车</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <div class="conter-right">
        <div class="top">
          <div class="top-left">
            <img src="../../assets/zfb.png" class="via" />
            <div class="username">
              <h1>名称</h1>
              <p>下午好</p>
              <a style="color:#E6A23C">修改个人信息</a>
            </div>
          </div>
          <div class="top-right">
            <div class="spanTitle">
              <p>账户安全：</p>
              <p>绑定手机：</p>
              <p>绑定邮箱：</p>
            </div>
            <div class="spanContent">
              <p style="color:#67C23A">较高</p>
              <p>13533752163</p>
              <p>1019068290@qq.com</p>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="bottom">
          <div class="order-list" v-for="(item, index) in orderType" :key="index">
            <i :class="item.icon"></i>
            <div class="order-title">
              <h3>{{item.title}} : {{item.count}}</h3>
              <a style="color:gray">{{item.link}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import BreadHeader from '../../components/Reception/BreadHeader.vue';
export default {
  components: { BreadHeader },
  name: "PersonalCenter",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

        orderType:[
          {icon:'el-icon-wallet', title:'待支付订单', count:0, link:'查看待支付订单 >'},
          {icon:'el-icon-wallet', title:'待支付订单', count:0, link:'查看待支付订单 >'},
          {icon:'el-icon-wallet', title:'待支付订单', count:0, link:'查看待支付订单 >'},
          {icon:'el-icon-wallet', title:'待支付订单', count:0, link:'查看待支付订单 >'}
        ]
    };
  },
};
</script>

<style scoped>
.center {
  height: 90vh;
}
.wrap{
   width: 1200px;
  margin: auto;
    position: relative;
  top:20px;
}
.container {
  display: grid;
  grid-template-columns: 234px 1fr;
  column-gap: 15px;
  justify-content: center;
  margin-top: 20px;
}
.conter-left {
  width: 235px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
.conter-left h2 {
  padding: 30px 0 20px 0;
}
.el-menu-vertical-demo {
  background-color: #fff;
  border: none;
  margin-left: -10px;
}
.menu-item {
  color: gray;
  height:30px;
  margin-top: 5px;
  display: flex;
  align-items: center;

}
.el-menu-item:focus, .el-menu-item:hover{
  background-color: transparent;
  color: #000;
}
.conter-right {
  background-color: #fff;
  padding: 40px;
}
.top {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.top-left,
.top-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}
.via {
  width: 150px;
  height: 150px;
 
}
.username{
  justify-self: flex-start;
}
.username h1{
  margin-bottom: 5px;
}
.username p{
  margin-bottom: 12px;
}
.username a{
  font-size: 12px;
}
.spanTitle{
  justify-self: flex-end;
}
.spanContent{
  justify-self: flex-start;
}
.spanTitle p,
.spanContent p{
  line-height: 30px;
}
.bottom{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 50px;
  grid-template-rows: repeat(2, 1fr);
  justify-items: flex-start;
  align-items: center;
}
.order-list{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100px;
  align-items: center;
  justify-items: center;
}
.order-list i{
  background: #be0f2d;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  transform: scale(3, 3);
}
.order-title{
  padding-left: 10px;
}
.order-list h3{
  margin-bottom: 10px;
}
</style>