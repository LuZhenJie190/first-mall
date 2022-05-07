<template>
  <div class="cart">
    <cart-header></cart-header>
    <div class="content">
      <div class="container" v-show="tableData.length > 0">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column width="110">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="400">
            <template slot-scope="scope">{{ scope.row.productTitle }}</template>
          </el-table-column>
          <el-table-column prop="productPrice" label="单价" width="120">
          </el-table-column>
          <el-table-column label="数量" width="250">
            <template slot-scope="scope">
              <div @mousedown="hIndex(scope.$index, scope.row)">
                <el-input-number v-model="scope.row.productNumber" @change="handleChange" :min="1" :max="10">
                </el-input-number>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="120">
            <template slot-scope="scope">
              <p>{{ scope.row.total }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-close"></i></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-empty class="empty" description="您的购物车还是空的！" v-show="tableData.length == 0">
        <button class="btn-pay" style="height: 60px" @click="goShopping">
          马上去购物
        </button>
      </el-empty>
    </div>
    <div class="bottom" v-show="tableData.length > 0">
      <div class="b-container">
        <div class="b-left">
          <a style="color: #be0f2d" @click="goShopping">继续购物</a>
          <p>
            已选择<i class="num">{{ multipleSelection.length }}</i>件
          </p>
        </div>
        <div class="b-right">
          <p>
            合计：<i class="num" style="font-size: 30px">{{ allTotal }}</i>元
          </p>
          <button class="btn-pay" @click="goPay">去结算</button>
        </div>
      </div>
    </div>
    <ds-footer></ds-footer>
  </div>
</template>

<script>
// import Counter from "../../components/Reception/Counter.vue";
import DsFooter from "../../components/Reception/DsFooter.vue";
import { CartById } from "../../api/index";
import CartHeader from "../../components/Reception/CartHeader.vue";
export default {
  name: "ShoppingCart",
  components: {
    DsFooter,
    CartHeader,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      emptyChange: false,
      number: "",
      rowData: "",
      total: "",
    };
  },
  watch: {
    number: {
      handler(newVal, oldVal) {
        // 价格初始值
        this.rowData.total = this.total;
        // 乘数量
        let result = this.rowData.total * newVal;
        this.rowData.total = result;
      },
    },
  },
  computed: {
    // 总价格
    allTotal() {
      let sum = 0;
      this.multipleSelection.forEach((e) => {
        sum += e.total;
      });
      return sum;
    },
  },
  created() {
    this.getCartData();
  },
  methods: {
    goPay() {
      if (this.multipleSelection != "") {
        this.$router.push({
          name: "checkorder",
          params: {
            cart: this.multipleSelection,
          },
        });
      } else {
        this.$alert("请选择商品");
      }
    },
    handleChange(value) {
      this.number = value;
    },
    hIndex(index, row) {
      this.rowData = row;
      if (this.number < 2) {
        this.total = row.total;
      }
    },
    getCartData() {
      CartById(localStorage.getItem("uid")).then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    goCart() {
      this.$router.push({
        path: "/ShoppingCart",
      });
    },
    goShopping() {
      this.$router.push({
        path: "/Index",
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
.empty {
  min-height: 420px;
}

.container {
  max-width: 1200px;
  margin: auto;
}

.content {
  min-height: 370px;
  padding: 38px 0;
}

.content .el-table {
  padding: 15px;
}

.content .has-gutter {
  height: 70px !important;
}

.content .el-table__row {
  height: 120px;
  font-size: 16px;
}

.content img {
  width: 80px;
  height: 100px;
}

.content i:hover {
  color: #be0f2d;
}

.bottom {
  height: 50px;
  background-color: #f5f5f5;
  position: sticky;
  bottom: 20px;
  z-index: 999;

}

.b-container {
  background-color: #fff;
  width: 1180px;
  height: 50px;
  margin: auto;
  padding: 10px;
  box-shadow: 0px -5px 5px #f5f5f5;
}

.bottom .num {
  color: #be0f2d;
  font-size: 16px;
  font-style: normal;
  padding: 0 5px;
}

.b-left {
  display: grid;
  grid-template-columns: 100px auto;
  height: 100%;
  align-items: center;
}

.b-left {
  float: left;
}

.b-right {
  float: right;
  display: flex;
}

.b-right p {
  line-height: 50px;
  margin-right: 20px;
}

.btn-pay {
  border: none;
  background-color: #be0f2d;
  color: white;
  height: 50px;
  padding: 0px 80px;
  letter-spacing: 3px;
  margin-left: 10px;
  cursor: pointer;
}
</style>