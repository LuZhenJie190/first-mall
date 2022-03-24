<template>
    <div class="paging">
         <el-pagination
      background
      layout="prev, pager, next ,total"
      :total="total"
      :current-page="curPage"
      :page-count="pageNum"
      :page-size="pageSize"
      @current-change="paper"
      v-show="pageShow"
    >
    </el-pagination>
    </div>
</template>

<script>
import {
  UsergetAll,
} from "../../api/index";
export default {
    name:"Paging",
    props:["pageShow"],
    data() {
        return {
            tableData:[],
            rootData:[],
            total: 0,
            curPage: 1,
            pageNum: 1,
            pageSize: 8,
            // pageShow: true,
        }
    },
    created() {
        this.getUserListData();
        this.getUseRootData();

    },
    methods:{
            getUserListData(){
                UsergetAll(this.pageNum,this.pageSize).then((res)=>{
                    
                    this.tableData=res.list;
                    this.total=res.total;
                    this.tableData.filter(e=>{

                    if (e.userIdentity == 0 ){
                        e.userIdentity="普通用户"
                    }else{
                        e.userIdentity="管理员"
                    }
                    if (e.userSex == 0 ){
                        e.userSex="女"
                    }else{
                        e.userSex="男"
                    }
                })   
                this.$emit('pageInfo',this.tableData);
                });
            },
            getUseRootData(){
                UsergetAll(this.pageNum,this.pageSize).then((res)=>{                    
                    this.tableData=res.list;
                    this.total=res.total;
                    this.$emit('pageRoot',this.tableData);
                });
            },
            // 把当前显示页数赋值给pageNum
            paper(curPage) {
            this.pageNum = curPage;
            this.getUserListData();
            this.getUseRootData();
            },
    }
}
</script>

<style scoped>

</style>