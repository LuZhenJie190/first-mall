<template>
  <div>
 <div class="header-top">
   <div class="list-search">
    <el-input :placeholder="inputValue" v-model="search" clearable>
    <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
  </el-input>
   </div>
       
    </div>
  </div>
</template>

<script>
export default {
    name:'HeaderTop',
    props:["inputValue"],
    data() {
        return {
             search:'',
        }
    },
   mounted() {
    
   }, 
   methods: {
     searchInfo(){
       this.$emit('searchInput',this.search)
     }
   },
}
</script>

<style>
.el-input-group__append{
  background: #409EFF;
  color: #fff;
  border: 1px solid #DCDFE6;
  border-left: none;
}
.header-top{
  width: 90%;
  height: 50px;
  margin: auto;
  display: flex;
}

</style>