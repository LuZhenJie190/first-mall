const Index = () => import('../../pages/Reception/Index.vue');
const MobilePhone = () => import('../../pages/Reception/MobilePhone.vue');
const Television = () => import('../../pages/Reception/Television.vue');
const Notebook = () => import('../../pages/Reception/Notebook.vue');
const Bracelet = () => import('../../pages/Reception/Bracelet.vue');
const ProductInfo = () => import('../../pages/Reception/ProductInfo.vue');
const CheckOrder = () => import('../../pages/Reception/CheckOrder.vue');
const ProductSearch = () => import('../../pages/Reception/ProductSearch.vue');

export default [{
        name: 'index',
        path: '/Index',
        component: Index,
        meta: {
            keepAlive: true,
            title: '首页',
            footerShow: true,

        }
    },
    {
        name: 'bracelet',
        path: '/Bracelet',
        component: Bracelet,
        meta: {
            title: '智能穿戴专区',
            footerShow: true,

        }
    },
    {
        name: 'mobilePhone',
        path: '/MobilePhone',
        component: MobilePhone,
        meta: {
            title: '手机专区',
            footerShow: true,

        }
    },
    {
        name: 'television',
        path: '/Television',
        component: Television,
        meta: {
            title: '电视专区',
            footerShow: true,

        }
    },
    {
        name: 'notebook',
        path: '/Notebook',
        component: Notebook,
        meta: {
            title: '笔记本专区',
            footerShow: true,

        }
    },
    {
        name: 'productinfo',
        path: '/ProductInfo',
        component: ProductInfo,
        meta: {
            title: '商品信息',
            footerShow: false,

        }
    },
    {
        name: 'productsearch',
        path: '/ProductSearch',
        component: ProductSearch,
        meta: {
            title: '搜索',
            showNav: false,
            footerShow: true,

        }
    },
    {
        name: 'checkorder',
        path: '/CheckOrder',
        component: CheckOrder,
        meta: {
            showNav: true,
            title: '确认订单',
            footerShow: false,
            auth: true,
        }
    },
]