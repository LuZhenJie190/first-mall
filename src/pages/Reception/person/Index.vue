<template>
  <div>
    <div class="top">
      <div class="top-left">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="via" />
        <div class="username">
          <h1>{{ userName }}</h1>
          <p>你好</p>
          <a style="color: #e6a23c">修改个人信息</a>
        </div>
      </div>
      <div class="top-right">
        <div class="spanTitle">
          <p>账户安全：</p>
          <p>绑定手机：</p>
          <p>绑定邮箱：</p>
        </div>
        <div class="spanContent">
          <p style="color: #67c23a">较高</p>
          <p>{{ userData.userPhone }}</p>
          <p>{{ userData.userEmail }}</p>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="bottom">
      <div class="address">
        <h2>收货地址</h2>
        <div class="items">
          <div class="item" v-for="(item, index) in addressList" :key="item.uaId" v-show="addressList.leght != 0">
            <h3>{{ item.userName }}</h3>
            <p>{{ item.userPhone }}</p>
            <p>{{ item.uProvince }} {{ item.uCity }} {{ item.uArea }}</p>
            <p>{{ item.uAddress }}</p>
            <a class="update" @click="updateAddress(item)">修改</a>
            <i class="el-icon-close remove" @click="removeAddress(item.uaId)"></i>
          </div>
          <div class="item" @click="openModel">
            <div class="context">
              <i class="el-icon-circle-plus"></i>
              <p>添加新地址</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <address-model v-if="modelShow" @mShow="closeModel" :addressData="addressData">
    </address-model>
  </div>
</template>

<script>
import {
  UsergetById,
  AddressById,
  AddressInsert,
  AddressUpdate,
  AddressDelete,
} from "../../../api/index";
import AddressModel from '../../../components/Reception/AddressModel.vue';
import BreadHeader from "../../../components/Reception/BreadHeader.vue";
export default {
  components: { BreadHeader, AddressModel },
  name: "Index",
  data() {
    return {
      userName: localStorage.getItem("uname"),
      addressList: [],
      userData: [],
      current: -1,
      modelShow: false,
      addressData: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      addForm: {
        userId: localStorage.getItem("uid"),
        userName: "",
        userPhone: "",
        uAddress: "",
        uProvince: "",
        uCity: "",
        uArea: "",
        selected: [],
      },
    };
  },
  created() {
    UsergetById(localStorage.getItem("uid")).then((res) => {
      res.data.list.forEach((element) => {
        this.userData = element;
      });
    });
    this.getAddress();
  },
  methods: {
    getAddressList() {
      AddressById(this.addForm.userId).then((res) => {
        this.addressList = res.data;
      });
    },
    getAddress() {
      AddressById(localStorage.getItem("uid")).then(res => {
        this.addressList = res.data;
      })
    },
    updateAddress(val) {
      console.log(val);
      this.addressData = val;
      this.modelShow = true;
    },
    removeAddress(id) {
      console.log(id);
      AddressDelete(id).then((res) => {
        if ((res.code = 200)) {
          this.getAddressList();
        }
      });
    },
    openModel() {
      this.modelShow = true;
      this.addressData = this.addForm;

    },
    closeModel(val) {
      this.modelShow = val;
      this.getAddressList();
    },
  },
};
</script>

<style scoped>
/* dizhi */
.address h2 {
  padding: 10px 0;
}

.update {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #be0f2d;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.item {
  width: 240px;
  height: 160px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  padding: 20px;
}

.item .remove {
  transform: scale(1.3, 1.3);
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ccc;
}

.item .remove:hover {
  color: #be0f2d;
}

.item h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
}

.item p {
  color: #757575;
  margin-bottom: 5px;
}

.item:hover {
  border: 1px solid gray;
  transition: 0.5s;
}

.item:hover .context {
  color: gray;
  transition: 0.5s;
}

.context {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  color: #ccc;
  cursor: pointer;
}

.context i {
  transform: scale(2, 2);
  margin: 8px;
}

/* dizhi */
.center {
  height: 90vh;
}

.wrap {
  width: 1200px;
  margin: auto;
  position: relative;
  top: 20px;
}

.container {
  display: grid;
  grid-template-columns: 234px 1fr;
  column-gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.conter-left {
  width: 235px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.conter-left h2 {
  padding: 30px 0 20px 0;
}

.el-menu-vertical-demo {
  background-color: #fff;
  border: none;
  margin-left: -10px;
}

.menu-item {
  color: gray;
  height: 30px;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: transparent;
  color: #000;
}

.conter-right {
  background-color: #fff;
  padding: 40px;
}

.top {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.top-left,
.top-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.via {
  width: 150px;
  height: 150px;
}

.username {
  justify-self: flex-start;
}

.username h1 {
  margin-bottom: 5px;
}

.username p {
  margin-bottom: 12px;
}

.username a {
  font-size: 12px;
}

.spanTitle {
  justify-self: flex-end;
}

.spanContent {
  justify-self: flex-start;
}

.spanTitle p,
.spanContent p {
  line-height: 30px;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
}

.order-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100px;
  align-items: center;
  justify-items: center;
}

.order-list i {
  background: #be0f2d;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  transform: scale(3, 3);
}

.order-title {
  padding-left: 10px;
}

.order-list h3 {
  margin-bottom: 10px;
}
</style>