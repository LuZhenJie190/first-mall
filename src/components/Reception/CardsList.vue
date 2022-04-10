<template>
  <div id="cards-list">
      <li class="card">
          <div class="images">
              <img src="../../assets/bg1.png"/>
          </div>
         
         <h4>小米12PRO 白色 12G+128G</h4>
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
    width: 210px;
     height: 280px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: flex-start;
    cursor: pointer;
    background: #fff;
    overflow: hidden;
    transition: .3s ;
}
.card h4{
    height: 50px;
    position: relative;
    top: 10px;
  
    
}
.card:hover{
    box-shadow: 0px 10px 10px  #ccc;
    transition: .5s ;
    transform: translateY(-10px);
    transition-timing-function: cubic-bezier(0.2,0.5,0.5,1);

}
.images{
    width:100%;
    height: 230px;
    overflow: hidden;
}
.images img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>