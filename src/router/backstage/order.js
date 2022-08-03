const OrderManagement = () => import('../../pages/Backstage/OrderManagement.vue');

export default [{
    name: 'ordermanagement',
    path: 'OrderManagement',
    component: OrderManagement,
    meta: {
        showNav: true,
        title: "订单管理",
        isAuth: true
    },
}, ]