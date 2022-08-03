const Login = () => import('../../pages/Reception/Login.vue');
export default [{
    name: 'login',
    path: '/Login',
    component: Login,
    meta: {
        showNav: true,
        title: '登录',
    }
}, ]