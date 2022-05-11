<template>
  <div class="order">
    <backstage-search class="search" @searchInput="searchInput" :flag="flag" :multipleSelection="multipleSelection"
      :inputValue="inputValue">
    </backstage-search>
    <el-table :data="tableData" stripe border style="width:100%; margin: auto"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="orderId" label="订单编号" width="150" fixed="left">
      </el-table-column>
      <el-table-column label="商品图片" width="120">
        <template slot-scope="scope">
          <img class="pimg" :src="scope.row.orderParams[0].productImg" />
        </template>
      </el-table-column>
      <el-table-column prop="orderParams[0].productTitle" label="商品名称" width="200">
      </el-table-column>
      <el-table-column prop="orderParams[0].productNumber" label="数量" width="100">
      </el-table-column>
      <el-table-column prop="userName" label="客户姓名" width="150">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号码" width="150">
      </el-table-column>
      <el-table-column label="收货地址" width="200">
        <template slot-scope="scope">
          <p>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.userAddress }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="orderPrice" label="订单价格" width="150">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180px">
      </el-table-column>
      <el-table-column prop="ostatus" label="支付状态" width="150" :formatter="payStatus">
      </el-table-column>
      <el-table-column prop="payWay" label="支付方式" width="150" :formatter="payType">
      </el-table-column>
    </el-table>

    <!-- 修改模态框 -->
    <!-- <div class="o-model-update" v-show="modelShow">
      <div class="o-model-bg"></div>
      <div class="o-model-context">
        <i class="el-icon-circle-close" @click="mShow"></i>
        <el-tabs :tab-position="abPosition" style="height: 200px">
          <el-tab-pane label="订单信息">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
              <el-form-item label="订单编号：">
                <el-input v-model="form.osn" disabled></el-input>
              </el-form-item>
              <el-form-item label="订单价格：">
                <el-input v-model="form.oprice"></el-input>
              </el-form-item>
              <el-form-item label="下单时间：">
                <el-input v-model="form.otime"></el-input>
              </el-form-item>
              <el-form-item label="支付类型：">
                <el-radio v-model="form.otype" :label="0">微信</el-radio>
                <el-radio v-model="form.otype" :label="1">支付宝</el-radio>
              </el-form-item>
              <el-form-item label="支付状态：">
                <el-radio v-model="form.ostatus" :label="0">未支付</el-radio>
                <el-radio v-model="form.ostatus" :label="1">已支付</el-radio>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品信息">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
              <el-form-item label="商品编码：">
                <el-input v-model="form.pcore" disabled></el-input>
              </el-form-item>
              <el-form-item label="商品名称：">
                <el-input v-model="form.pname"></el-input>
              </el-form-item>
              <el-form-item label="商品数量：">
                <el-input v-model="form.pnumber"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="客户信息">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
              <el-form-item label="客户姓名：">
                <el-input v-model="form.ouname"></el-input>
              </el-form-item>
              <el-form-item label="客户手机号：">
                <el-input v-model="form.ophone"></el-input>
              </el-form-item>
              <el-form-item label="收货地址：">
                <el-input v-model="form.oaddress"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-button class="o-add" type="primary" @click="updateInfo()">点击修改</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  OrderGetAll,
  OrderFindByPhone,
  OrderGetParamsByPhone,
  OrderGetParamsByName
} from "../../api/index";
import BackstageSearch from '../../components/Backstage/BackstageSearch.vue';
export default {
  name: "OrderManagement",
  components: { BackstageSearch },
  data() {
    return {
      abPosition: "left",
      labelPosition: "left",
      searchTip: "请输入手机号",
      search: "",
      tableData: [],
      inputValue: "请输入手机号/姓名",
      multipleSelection: "",
      flag: 3,
    };
  },
  created() {
    this.getOrderList();
  },

  methods: {
    // 获取数据
    getOrderList() {
      OrderGetAll(1, 1000).then((res) => {
        this.tableData = res.data.list;
      });
    },
    // 手机号码搜索,接收子组件传过来的数据
    searchInput(val) {
      this.search = val;
      if (this.search != "") {
        OrderFindByPhone(val).then((res) => {
          console.log(res);
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
        OrderGetParamsByPhone(val).then(res => {
          console.log(res);
          this.tableData = res.data;
        })
      } else {
        OrderGetParamsByName(val).then(res => {
          this.tableData = res.data;
        })
      }

    }
  },
};
</script>

<style scoped>
.order {
  padding: 10px;
}

.o-model-bg {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.o-model-context {
  width: 40%;
  height: 450px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 120px;
  left: 500px;
  z-index: 5;
}

.o-model-context .el-form {
  position: relative;
  top: 60px;
  right: 50px;
  width: 65%;
  margin: auto;
}

.o-model-context i {
  transform: scale(2, 2);
  position: absolute;
  right: 15px;
  top: 15px;
  color: gray;
  cursor: pointer;
  z-index: 10;
}

.o-model-context i:hover {
  color: #f56c6c;
  transition: ease-out 0.5s;
  transform: scale(2, 2) rotate(90deg);
}

.o-add {
  position: relative;
  top: -15px;
  left: 320px;
}

.o-model-context .el-tabs--left {
  height: 90% !important;
  margin-left: 20px;
}

.o-model-context .el-tabs__content {
  height: 90%;
}

.o-model-context .el-tabs--left .el-tabs__nav-scroll {
  margin-top: 50px;
}

.o-model-context .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 0;
}

.o-model-context .el-tabs--left .el-tabs__active-bar.is-left {
  height: 30px !important;
  top: 5px;
}

.pimg {
  width: 80px;
  height: 80px;
}

.search /deep/ .screen {
  display: none;
}
</style>