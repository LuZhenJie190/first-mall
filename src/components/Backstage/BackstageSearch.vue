<template>
  <div>
    <div class="backstage-search">
      <!-- 搜索 -->
      <div class="list-search">
        <el-input :placeholder="inputValue" v-model="search" clearable>
          <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
        </el-input>
      </div>
      <!-- 筛选 -->
      <div class="screen">
        <!-- 分类 -->
        <p>筛选:</p>
        <el-select v-model="cateValue" placeholder="请选择类型" @change="cateChange(cateValue)" clearable>
          <el-option v-for="item in cateOptions" :key="item.categoryId" :label="item.categoryName"
            :value="item.categoryId">
          </el-option>
          <!-- 品牌 -->
        </el-select>
        <el-select v-model="brandValue" placeholder="请选择品牌" @change="brandChange(brandValue)" clearable>
          <el-option v-for="item in brandOptions" :key="item.brandId" :label="item.brandName" :value="item.brandId">
          </el-option>
        </el-select>
      </div>
      <!-- 批量删除 -->
      <div class="list-delete">
        <el-button type="danger" @click="datchDelete">批量删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UserDatchDelete,
  ProductDatchDelete,
  ProductCategory,
  ProductBrandGetByCate,
  OrderBatchDelete
} from "../../api/index";
export default {
  inject: ["reload"],
  name: "BackstageSearch",
  props: ["inputValue", "multipleSelection", "flag"],
  data() {
    return {
      search: "",
      uidList: [],
      pidList: [],
      oidList: [],
      cateOptions: [],
      brandOptions: [],
      cateValue: "",
      brandValue: "",
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    searchInfo() {
      this.$emit("searchInput", this.search);
    },
    datchDelete() {
      this.multipleSelection.forEach((element) => {
        let uuId = element.uId;
        let ppId = element.pid;
        let ooId = element.orderId;
        this.uidList.push(uuId);
        this.pidList.push(ppId);
        this.oidList.push(ooId);

      });
      this.$confirm("是否删除选中?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          if (this.flag == 1) {
            UserDatchDelete(this.uidList).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: `成功删除${this.uidList.length}位用户`,
                  type: "success",
                });
              }
            });
          }
          if (this.flag == 2) {
            ProductDatchDelete(this.pidList).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: `成功删除${this.pidList.length}位用户`,
                  type: "success",
                });
              }
            });
          }
          if (this.flag == 3) {
            ProductDatchDelete(this.oidList).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: `成功删除${this.pidList.length}件订单`,
                  type: "success",
                });
              }
            });
          }

          // 重新获取数据
          this.reload();
        })
        .catch(() => { });
    },
    // 获取分类
    getCategory() {
      ProductCategory().then((res) => {
        this.cateOptions = res.data;
      });
    },
    // 获取品牌
    cateChange(val) {
      ProductBrandGetByCate(val).then((res) => {
        this.brandOptions = res.data[0].productBrand;
      });
    },
    brandChange(val) {
      this.$emit("brand", val);
    },
  },
};
</script>

<style>
.list-search .el-input-group__append {
  background: #409eff;
  color: #fff;
  border: 1px solid #dcdfe6;
  border-left: none;
}

.backstage-search {
  width: 100%;
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.screen {
  margin-left: -150px;
  width: 600px;
  display: flex;
  align-items: center;
  margin-top: -10px;
}

.screen p,
.screen .el-select {
  margin-right: 5px;
}
</style>