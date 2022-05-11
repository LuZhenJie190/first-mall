<template>
    <div class="classification">
        <ul class="tabs">
            <li class="tabs-li" v-for="(item, index) in imgUrl" :key="index">
                <img :src="item.url">
                <a href="">{{ item.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Classification",

    data() {
        return {
            imgUrl: [
                { url: require('../../assets/phone.png'), title: '手机' },
                { url: require('../../assets/netobook.png'), title: '笔记本' },
                { url: require('../../assets/tv.png'), title: '电视' },
                { url: require('../../assets/watch.png'), title: '手环' },
            ],
            showDetails: false

        }
    },
    methods: {

    },
};
</script>

<style scoped>
.classification {
    width: 1200px;
    margin: 0 auto;
}

.tabs {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 30px 0px;
}

.tabs-li img {
    width: 70px;
    height: 70px;
}

.tabs-li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tabs-details {
    width: 1200px;
    height: 200px;
    border-radius: 3px;
    background: #ccc;
    opacity: 0.8;
    position: absolute;
    bottom: 120px;
    z-index: 8;
}
</style>