const ShoppingCart = () => import('../../pages/Reception/ShoppingCart.vue');
const PersonalMenu = () => import('../../pages/Reception/person/PersonalMenu.vue');
const PersonalIndex = () => import('../../pages/Reception/person/Index.vue');
const MainInfo = () => import('../../pages/Reception/person/MainInfo.vue');
const OrderDetail = () => import('../../pages/Reception/person/OrderDetail.vue');
const MainOrder = () => import('../../pages/Reception/person/MainOrder.vue');

export default [
    // 个人中心
    {
        name: 'personalmenu',
        path: '/PersonalMenu',
        component: PersonalMenu,
        meta: {
            auth: true,
        },
        children: [{
                name: 'personalindex',
                path: 'PersonalIndex',
                component: PersonalIndex,
                meta: {
                    title: '个人中心',
                    auth: true,
                },
            },
            {
                name: 'maininfo',
                path: 'MainInfo',
                component: MainInfo,
                meta: {
                    title: '个人信息',
                    auth: true,
                },
            },
            {
                name: 'mainorder',
                path: 'MainOrder',
                component: MainOrder,
                meta: {
                    title: '个人订单',
                    auth: true,
                },
            },
            {
                name: 'orderdetail',
                path: '/OrderDetail',
                component: OrderDetail,
                meta: {
                    title: '订单详情',
                    auth: true,
                },

            },
        ]
    },
    {
        name: 'shoppingCart',
        path: '/ShoppingCart',
        component: ShoppingCart,
        meta: {
            showNav: true,
            title: '购物车',
            footerShow: false,
            auth: true,
        }
    },
]