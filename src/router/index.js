import VueRouter from 'vue-router'
import Index from '../pages/Reception/Index.vue'
import Login from '../pages/Reception/Login.vue'
import Register from '../pages/Reception/Register.vue'
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


import BackendSystem from '../pages/Backstage/BackendSystem.vue'
import UserList from '../pages/Backstage/UserList.vue'
import UserRoot from '../pages/Backstage/UserRoot.vue'
import ProductList from '../pages/Backstage/ProductList.vue'
import OrderManagement from '../pages/Backstage/OrderManagement.vue'
import UserAdd from '../pages/Backstage/UserAdd.vue'
import ProductAdd from '../pages/Backstage/ProductAdd.vue'
import Home from '../pages/Backstage/Home.vue'
import ProductCategory from '../pages/Backstage/ProductCategory.vue'
import ProductSet from '../pages/Backstage/ProductSet.vue'
import ProductDetail from '../pages/Backstage/ProductDetail.vue'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    routes: [{
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
            name: 'register',
            path: '/Register',
            component: Register,
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
                    name: 'productcategory',
                    path: 'ProductCategory',
                    component: ProductCategory,
                    meta: {
                        showNav: true
                    },
                },
                {
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
                    name: 'productadd',
                    path: 'ProductAdd',
                    component: ProductAdd,
                    meta: {
                        showNav: true
                    },
                },
                {
                    name: 'productset',
                    path: 'ProductSet',
                    component: ProductSet,
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
})