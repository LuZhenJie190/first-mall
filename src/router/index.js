import VueRouter from 'vue-router'
import Index from '../pages/Reception/Index.vue'
import Login from '../pages/Reception/Login.vue'
import MobilePhone from '../pages/Reception/MobilePhone.vue'
import Television from '../pages/Reception/Television.vue'
import Notebook from '../pages/Reception/Notebook.vue'
import Bracelet from '../pages/Reception/Bracelet.vue'
import ShoppingCart from '../pages/Reception/ShoppingCart.vue'
import PersonalMenu from '../pages/Reception/person/PersonalMenu.vue'
import PersonalIndex from '../pages/Reception/person/Index.vue'
import MainInfo from '../pages/Reception/person/MainInfo.vue'
import MainOrder from '../pages/Reception/person/MainOrder.vue'
import ProductInfo from "../pages/Reception/ProductInfo.vue"
import CheckOrder from "../pages/Reception/CheckOrder.vue"
import OrderDetail from "../pages/Reception/person/OrderDetail.vue"
import ProductSearch from "../pages/Reception/ProductSearch.vue"



import BackendSystem from '../pages/Backstage/BackendSystem.vue'
import BackLogin from '../pages/Backstage/BackLogin.vue'
import UserList from '../pages/Backstage/UserList.vue'
import UserRoot from '../pages/Backstage/UserRoot.vue'
import ProductList from '../pages/Backstage/ProductList.vue'
import OrderManagement from '../pages/Backstage/OrderManagement.vue'
import UserAdd from '../pages/Backstage/UserAdd.vue'
import ProductAdd from '../pages/Backstage/ProductAdd.vue'
import Home from '../pages/Backstage/Home.vue'
import ProductDetail from '../pages/Backstage/ProductDetail.vue'
import CartManagement from '../pages/Backstage/CartManagement.vue'



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
        path: '/',
        redirect: '/Index'
    },
    {
        name: 'login',
        path: '/Login',
        component: Login,
        meta: {
            showNav: true
        }
    },
    {
        name: 'index',
        path: '/Index',
        component: Index,
    },
    {
        name: 'bracelet',
        path: '/Bracelet',
        component: Bracelet
    },
    {
        name: 'mobilePhone',
        path: '/MobilePhone',
        component: MobilePhone
    },
    {
        name: 'television',
        path: '/Television',
        component: Television
    },
    {
        name: 'notebook',
        path: '/Notebook',
        component: Notebook
    },
    {
        name: 'productinfo',
        path: '/ProductInfo',
        component: ProductInfo
    },
    {
        name: 'productsearch',
        path: '/ProductSearch',
        component: ProductSearch
    },

    // 个人中心
    {
        name: 'personalmenu',
        path: '/PersonalMenu',
        component: PersonalMenu,
        children: [{
                name: 'personalindex',
                path: 'PersonalIndex',
                component: PersonalIndex
            },
            {
                name: 'maininfo',
                path: 'MainInfo',
                component: MainInfo
            },
            {
                name: 'mainorder',
                path: 'MainOrder',
                component: MainOrder
            },
            {
                name: 'orderdetail',
                path: '/OrderDetail',
                component: OrderDetail,

            },
        ]


    },
    {
        name: 'shoppingCart',
        path: '/ShoppingCart',
        component: ShoppingCart,
        meta: {
            showNav: true
        }
    },
    {
        name: 'checkorder',
        path: '/CheckOrder',
        component: CheckOrder,
        meta: {
            showNav: true
        }
    },
    {
        name: 'backlogin',
        path: '/BackLogin',
        component: BackLogin,
        meta: {
            showNav: true
        }
    },
    {
        name: 'backendSystem',
        path: '/BackendSystem',
        component: BackendSystem,
        meta: {
            showNav: true
        },
        children: [{
                name: 'home',
                path: 'Home',
                component: Home,
                meta: {
                    showNav: true
                },
            },

            {
                name: 'userlist',
                path: 'UserList',
                component: UserList,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'userroot',
                path: 'UserRoot',
                component: UserRoot,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'productlist',
                path: 'ProductList',
                component: ProductList,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'useradd',
                path: 'UserAdd',
                component: UserAdd,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'ordermanagement',
                path: 'OrderManagement',
                component: OrderManagement,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'cartmanagement',
                path: 'CartManagement',
                component: CartManagement,
                meta: {
                    showNav: true
                },
            },
            {
                name: 'productadd',
                path: 'ProductAdd',
                component: ProductAdd,
                meta: {
                    showNav: true
                },
            },

            {
                name: 'productdetail',
                path: 'ProductDetail',
                component: ProductDetail,
                meta: {
                    showNav: true
                },
            },

        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//导航守卫
router.beforeEach((to, from, next) => {
    // 如果未登录，拦截并跳到登录
    if (to.path === '/ShoppingCart') {
        if (localStorage.getItem('uid')) {
            next()
        } else {
            next('/Login')
        }
    }
    next()
})

export default router