<template>
  <div>
 <div class="backstage-search">
   <div class="list-search">
    <el-input :placeholder="inputValue" v-model="search" clearable>
    <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
  </el-input>
   </div>
    <div class="list-delete">
      <el-button type="danger" @click="datchDelete">批量删除</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import {UserDatchDelete} from '../../api/index'
export default {
  inject:["reload"],
    name:'BackstageSearch',
    props:["inputValue","multipleSelection"],
    data() {
        return {
             search:'',
             uidList:[],
        }
    },
   methods: {
     searchInfo(){
       this.$emit('searchInput',this.search)
     },
     datchDelete(){
       this.multipleSelection.forEach(element => {
          let uuId = element.uId;
          this.uidList.push(uuId);
       });
         MessageBox.confirm("是否删除选中用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          UserDatchDelete(this.uidList).then((res)=>{
            if (res.code == 0) {
              MessageBox.alert(`成功删除${this.uidList.length}位用户`);
            }
          });
          // 重新获取数据
          this.reload();
        })
        .catch(() => {
          MessageBox.alert("已取消操作");
        });
     }
   },

}
</script>

<style>
.list-search .el-input-group__append{
  background: #409EFF;
  color: #fff;
  border: 1px solid #DCDFE6;
  border-left: none;
}
.backstage-search{
  width: 95%;
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

</style>