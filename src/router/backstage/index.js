import user from './user';
import order from './order';
import product from './product';
import cart from './cart';

const BackendSystem = () => import('../../pages/Backstage/BackendSystem.vue');
const BackLogin = () => import('../../pages/Backstage/BackLogin.vue');
const Home = () => import('../../pages/Backstage/Home.vue');

export default [{
        name: 'backlogin',
        path: '/BackLogin',
        component: BackLogin,
        meta: {
            showNav: true,
            title: '后台登录',
        },
    },
    {
        name: 'backendSystem',
        path: '/BackendSystem',
        component: BackendSystem,
        meta: {
            showNav: true,
            isAuth: true
        },
        children: [{
                name: 'home',
                path: 'Home',
                component: Home,
                meta: {
                    showNav: true,
                    title: '系统首页',
                    isAuth: true
                },
            },
            ...user,
            ...product,
            ...order,
            ...cart
        ]
    },

]