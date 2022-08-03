<template>
    <div id="dsfooter">

        <ul class="footer-list">
            <li class="footer-list-item" v-for="item in footer" :key="item.id">
                <img :src="item.imgurl" alt="" />
                <span>{{ item.title }}</span>
                <div class="line"></div>
            </li>
        </ul>

        <p>©2021~2022 数码购 版权所有</p>
    </div>
</template>

<script>
export default {
    name: 'DsFooter',
    data() {
        return {
            footer: [
                {
                    id: "01",
                    imgurl: require("../../assets/7w.png"),
                    title: "7天无理由",
                },
                {
                    id: "02",
                    imgurl: require("../../assets/15t.png"),
                    title: "15天包退还",
                },
                {
                    id: "03",
                    imgurl: require("../../assets/baoyou.png"),
                    title: "满199包邮",
                },
                {
                    id: "04",
                    imgurl: require("../../assets/weixiu.png"),
                    title: "维修服务",
                },
            ],
        }
    },

}
</script>

<style scoped>
#dsfooter {
    width: 100%;
    background: #fff;
    position: relative;
    bottom: 0;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.footer-list {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #ccc;
}

.footer-list-item img {
    width: 50px;
    height: 50px;
}

.footer-list-item span {
    margin-left: 50px;
}

.footer-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 30px;
    border-right: 1px solid #ccc;
}

.footer-list li:last-child {
    border-right: none;
}

p {
    margin: 10px;
}
</style>