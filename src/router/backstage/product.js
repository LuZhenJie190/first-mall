const ProductList = () => import('../../pages/Backstage/ProductList.vue');
const ProductAdd = () => import('../../pages/Backstage/ProductAdd.vue');
const ProductDetail = () => import('../../pages/Backstage/ProductDetail.vue');
export default [{
        name: 'productlist',
        path: 'ProductList',
        component: ProductList,
        meta: {
            showNav: true,
            title: '商品管理',
            isAuth: true
        },
    },
    {
        name: 'productadd',
        path: 'ProductAdd',
        component: ProductAdd,
        meta: {
            showNav: true,
            title: "商品添加",
            isAuth: true
        },
    },
    {
        name: 'productdetail',
        path: 'ProductDetail',
        component: ProductDetail,
        meta: {
            showNav: true,
            title: "商品详情",
            isAuth: true
        },
    }
]