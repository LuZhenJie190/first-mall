const CartManagement = () => import('../../pages/Backstage/CartManagement.vue');
export default [{
    name: 'cartmanagement',
    path: 'CartManagement',
    component: CartManagement,
    meta: {
        showNav: true,
        isAuth: true,
        title: "购物车管理"
    },
}, ]