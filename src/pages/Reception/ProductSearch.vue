<template>
    <div class="p-search">
        <div class="search_wrap">
            <bread-header>
                <slot>搜索</slot>
            </bread-header>
            <div class="search-input">
                <el-input placeholder="请输入商品名称" v-model="input2" class="s-input" @keyup.native.enter="searchList">
                    <template slot="append"><i class="el-icon-search" @click="searchList"></i></template>
                </el-input>
            </div>
            <div class="context">
                <h2>搜索结果：</h2>
                <ul class="m-list" v-show="contextStatus">

                    <li v-for="(p2, index) in searchData" :key="p2.pid" @click="goDetail(index)">
                        <card>
                            <template slot="image">
                                <img class="images" :src="p2.mainImg" />
                            </template>
                            <template slot="title">
                                <h3>{{ p2.title }}</h3>
                            </template>
                            <template slot="subtitle">
                                <p>{{ p2.subTitle }}</p>
                            </template>
                            <template slot="price">
                                <h4 class="price">{{ p2.productParams[0].price }} 元</h4>
                            </template>
                        </card>
                    </li>
                </ul>
                <el-empty description="暂无数据" v-show="!contextStatus"></el-empty>
            </div>
        </div>
    </div>
</template>

<script>
import BreadHeader from '../../components/Reception/BreadHeader.vue'
import Card from '../../components/Reception/Card.vue'
import { ProductGetInfoByTitle } from "../../api/product"
export default {
    components: { BreadHeader, Card },
    name: "ProductSearch",
    data() {
        return {
            input2: this.$route.params.msg,
            phoneData: [],
            searchData: [],
            contextStatus: true,
        }
    },
    created() {
        this.searchList();
    },
    methods: {
        searchList() {
            ProductGetInfoByTitle(this.input2).then((res) => {
                this.searchData = res.data
                console.log(this.searchData);
                if (this.searchData.length < 1) {
                    this.contextStatus = false;
                } else {
                    this.contextStatus = true;
                }
            })
        },
        goDetail(index) {
            this.$router.push({
                name: "productinfo",
                params: {
                    details: this.searchData[index],
                },
            });
        },
    }
}
</script>

<style scoped>
.p-search {
    min-height: 75vh;
}

.search_wrap {
    width: 1180px;
    margin: auto;
    padding-top: 90px;
}

.search-input {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.search-input i {
    padding: 10px 25px;
}

.s-input {
    width: 500px;
}

.p-search /deep/ .el-input__inner:focus {
    border-color: #be0f2d;
    border: 1px solid #be0f2d;
}

.p-search /deep/ .el-input-group__append {
    background-color: #be0f2d;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
}

.context h2 {
    font-weight: 500;
    padding: 50px 0px 20px 0px;
}

.m-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    column-gap: 10px;
    /* margin-top: 30px; */
}

.m-list li {
    width: 100%;
    margin-bottom: 15px;
}
</style>