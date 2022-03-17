<template>
  <div id="cards-list">
      <li class="card">
         <img src="../../assets/bg1.png"/>
         <p>123</p>
      </li>
  </div>
</template>

<script>
export default {
    name:'CardsList',
    // props:['details'],
  
  created() {
      
  },
}

</script>

<style scoped>
#cards-list{
    display: flex;
}
.card{
    width: 200px;
     height: 240px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    background: #fff;
}
.card:hover{
    box-shadow: 0px 10px 10px  gray;
    transition: 1s ;
    transition-timing-function: cubic-bezier(0.2,0.5,0.5,1);
}
.card img{
    width: 180px;
    height: 200px;
}
</style>