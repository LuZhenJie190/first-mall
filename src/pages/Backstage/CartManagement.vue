<template>
  <div class="cart">
    <div class="order">
      <backstage-search class="search" @searchInput="searchInput" :flag="flag" :multipleSelection="multipleSelection"
        :inputValue="inputValue">
      </backstage-search>
      <el-table :data="tableData" stripe style="margin-top:20px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userId" label="用户ID" width="150" fixed="left">
        </el-table-column>
        <el-table-column prop="pid" label="商品ID" width="150">
        </el-table-column>
        <el-table-column label="商品图片" width="150">
          <template slot-scope="scope">
            <img class="pimg" :src="scope.row.productImg" />
          </template>
        </el-table-column>
        <el-table-column prop="productTitle" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="productNumber" label="数量" width="150">
        </el-table-column>
        <el-table-column prop="productPrice" label="商品价格" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { CartById, CartGetALL } from "../../api/cart";
import { OrderFindByPhone } from "../../api/order"
import BackstageSearch from '../../components/Backstage/BackstageSearch.vue';
export default {
  name: "CartManagement",
  components: { BackstageSearch },
  data() {
    return {
      abPosition: "left",
      labelPosition: "left",
      searchTip: "请输入手机号",
      search: "",
      tableData: [],
      inputValue: "请输入用户ID",
      multipleSelection: "",
      flag: 4,
    };
  },
  created() {
    this.getOrderList();
  },

  methods: {
    // 获取数据
    getOrderList() {
      CartGetALL().then((res) => {
        this.tableData = res.data;
      });
    },
    // 手机号码搜索,接收子组件传过来的数据
    searchInput(val) {
      this.search = val;
      if (this.search != "") {
        OrderFindByPhone(val).then((res) => {
          this.tableData = res;
          this.pageShow = false;
        });
      } else {
        this.getOrderList();
        this.pageShow = true;
      }
    },

    // 格式化命名
    payStatus(row, column) {
      if (row.payStatus == 0) return "未支付"
      if (row.payStatus == 1) return "已支付"
    },
    payType(row, column) {
      if (row.payWay == 0) return "微信"
      if (row.payWay == 1) return "支付宝"
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //搜索
    searchInput(val) {
      if (!isNaN(val)) {
        CartById(val).then(res => {
          console.log(res);
          this.tableData = res.data;
        })
      } else {
        this.$message({
          type: "warning",
          message: "输入不合法"
        })
      }

    }
  },
};
</script>

<style scoped>
.cart {
  padding: 10px;
}

.pimg {
  width: 80px;
  height: 80px;
}

.search /deep/ .screen {
  display: none;
}
</style>