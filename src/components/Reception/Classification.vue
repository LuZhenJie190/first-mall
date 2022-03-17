<template>
  <div id="classification" >
      <div class="tabs-details" v-show="showDetails">
         <cards-list/>
      </div>
      <ul class="tabs" @mouseover="isShow" @mouseout="noShow">
          <li class="tabs-li" v-for="(item,index) in imgUrl" :key="index">
              <img :src="item.url">
              <a href="">{{item.title}}</a>
          </li>
      </ul>
  </div>
</template>

<script>
import CardsList from '../../components/Reception/CardsList.vue';
export default {
  name: "Classification",
components:{ CardsList},
    data() {
      return {
          imgUrl:[
              {url:require('../../assets/phone.png'),title:'手机'},
              {url:require('../../assets/netobook.png'),title:'笔记本'},
              {url:require('../../assets/tv.png'),title:'电视'},
              {url:require('../../assets/watch.png'),title:'手环'},
          ],
          showDetails:false
      
      }
  },
  methods: {
    
     isShow(){
         this.showDetails=true
     },
     noShow(){
          this.showDetails=false
     }
  },
};
</script>

<style scoped>
.tabs{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.tabs-li img{
    width: 70px;
    height:70px;
}
.tabs-li{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tabs-details{
  width: 1200px;
    height: 200px;
    border-radius: 3px;
    background: #ccc;
    opacity: 0.8;
    position: absolute;
    bottom: 120px;
    z-index: 8;
}
</style>