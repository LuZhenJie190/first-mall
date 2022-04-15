<template>
  <div class="cart">
    <div class="top">
      <div class="container" style="  height: 100px;">
        <div class="left">
          <h1>数码购</h1>
          <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <a>下拉菜单下拉菜单</a
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="down-menu">
              <el-dropdown-item command="a" class="ditem"
                ><a @click="goPersonal">个人中心</a></el-dropdown-item
              >
              <el-dropdown-item command="b" class="ditem"
                ><a>退出登录</a></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <a class="order">我的订单</a>
        </div>
      </div>
      <el-divider class="line"></el-divider>
    </div>
    <div class="content">
      <div class="container" v-show="tableData.length > 0 ">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column width="110">
            <template>
              <img src="../../assets/bg1.png" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="400">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="单价" width="120">
            <template>
              <p>12000元</p>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="数量" width="250">
            <template>
              <counter></counter>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="小计"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a @click="handleDelete(scope.$index, scope.row)"
                ><i class="el-icon-close"></i
              ></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-empty
        class="empty"
        description="您的购物车还是空的！"
       v-show="tableData.length == 0"
      >
        <button class="btn-pay" style="height: 60px" @click="goShopping">马上去购物</button>
      </el-empty>
    </div>
    <div class="bottom" v-show="tableData.length > 0 ">
      <div class="b-container">
        <div class="b-left">
          <a style="color:#be0f2d" @click="goShopping">继续购物</a> 
          <p>已选择<i class="num">0</i>件</p>
        </div>
        <div class="b-right">
          <p>合计：<i class="num" style="font-size: 30px">0</i>元</p>
          <button class="btn-pay">去结算</button>
        </div>
      </div>
    </div>
    <ds-footer></ds-footer>
  </div>
</template>

<script>
import Counter from "../../components/Reception/Counter.vue";
import DsFooter from "../../components/Reception/DsFooter.vue";
export default {
  name: "ShoppingCart",
  components: {
    Counter,
    DsFooter,
  },
  data() {
    return {
      tableData: [
{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
       ],
      multipleSelection: [],
      emptyChange: false,
    };
  },
  methods: {
    handleCommand(command) {
      console.log(command);
    },
    goPersonal() {
      this.$router.push({
        path: "/PersonalCenter",
      });
    },
    goCart() {
      this.$router.push({
        path: "/ShoppingCart",
      });
    },
    goShopping(){
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
.top {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 50;
}
.left {
  float: left;
  display: grid;
  grid-template-columns: 100px auto;
}
.left h1 {
  color: #be0f2d;
  font-size: 30px;
  font-weight: 500;
}
.left p,
.order {
  margin-top: 7px;
  color: #757575;
}
.right {
  float: right;
}
.ditem {
  cursor: pointer;
}
.ditem:hover {
  color: #000;
  background-color: #eee;
  transition: 0.5s;
}
.down-menu {
  margin-top: -20px !important;
}
.order {
  border-left: 1px solid #757575;
  padding-left: 15px;
  margin-left: 15px;
}
.line {
  margin: 0;
  background-color: #be0f2d;
  height: 2px;
}
.content {
  margin-top: 100px;
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
.content i:hover{
  color: #be0f2d;
}
.bottom {
  height: 50px;
  background-color: #f5f5f5;
}
.b-container {
  background-color: #fff;
  width: 1180px;
  height: 50px;
  margin: auto;
  padding: 10px;
}
.bottom .num {
  color: #be0f2d;
  font-size: 16px;
  font-style: normal;
  padding: 0 5px;
}
.b-left,
.b-right {
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
}
.btn-pay {
  border: none;
  background-color: #be0f2d;
  color: white;
  height: 100%;
  padding: 0 80px;
  letter-spacing: 3px;
  margin-left: 10px;
  cursor: pointer;
}
</style>