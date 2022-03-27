<template>
  <div class="product-category">
    <el-table
    :data="tableData"
    style="width: 90%">
    <el-table-column
      label="商品类型"
      sortable
      prop="categoryName">
    </el-table-column>
    <el-table-column
      label="商品品牌"
      sortable
      prop="brandName">
    </el-table-column>
      <el-table-column
      label="商品图标"
      prop="brandImg">
      <template slot-scope="scope">
        <img :src="scope.row.brandImg" alt="" style="width: 60px;height: 55px">
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="product-page">
     <paging @pNum="pNum" :pageInfo="pageInfo"/>
  </div>
 
</div>
</template>

<script>
import {ProductCategory, ProductBrand,ProductCategoryGetBrand} from '../../api/index'
import Paging from '../../components/Backstage/Paging.vue';
export default {
  components: { Paging },
    name:"ProductCategory",
     data() {
      return {
        categoryList:[],
        brandList:[],
         tableData: [],
        search: '',
        pageInfo:{
          pageNum:1,
          pageSize:5,
          pageTotal:0,
          pageShow: true,
      },
      }
    },
    created(){
      // ProductCategory().then((res)=>{
      //   this.tableData = res;
      //   this.tableData.push(res.productBrand)
      //   console.log(this.tableData);
      // });

      // ProductCategoryGetBrand(categoryId).then((res)=>{
      //   console.log(res);
      // })
              ProductBrand(this.pageInfo.pageNum,this.pageInfo.pageSize).then((res)=>{
        // console.log(res);
        this.tableData = res.list;
        this.pageInfo.pageTotal = res.total;
        console.log(this.tableData);
      });
      this.pNum();
    },
    
    methods: {
      pNum(val){
        if (val == undefined) {
            val=1;
        }else{
            val == val;
        }
         ProductBrand(val,this.pageInfo.pageSize).then((res)=>{
        // console.log(res);
        this.tableData = res.list;
        console.log(this.tableData);
      });
      },
         handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleChange(val) {
        console.log(val);
      },
       handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
}
</script>

<style scoped>
.product-category{
    width: 90%;
    margin: 10px auto;
    display: flex;
}
.collapse{
  display: flex;
  flex-direction: column;
   box-shadow:0px 0px 10px 1px #eee;
   margin: 10px;
}
.collapse-header{
  width: 250px;
 line-height: 40px;
    background: #409EFF;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #fff;
    text-align: center;
}
.collapse-context{
  width: 250px;
  background: #fff;
   border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    flex-direction: column;
}
.collapse-context p{
  margin: 10px 0px 10px 10px;
  font-size: 14px;
}
.tags{
  display: flex;
  flex-wrap: wrap;
  width: inherit;
  padding: 0px 0px 10px 5px;
}
 .collapse .el-tag {
    margin: 5px;
  }
 .button-new-tag {
    margin: 5px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  } 
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
     margin: 5px;
  }
  .product-page {
  position: absolute;
  top: 650px;
  left: 700px;
}
</style>