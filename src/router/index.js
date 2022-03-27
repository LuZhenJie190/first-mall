import VueRouter from 'vue-router'
import Index from '../pages/Reception/Index.vue'
import Login from '../pages/Reception/Login.vue'
import Register from '../pages/Reception/Register.vue'
import MobilePhone from '../pages/Reception/MobilePhone.vue'
import Television from '../pages/Reception/Television.vue'
import Notebook from '../pages/Reception/Notebook.vue'
import Bracelet from '../pages/Reception/Bracelet.vue'
import BackendSystem from '../pages/Backstage/BackendSystem.vue'
import UserList from '../pages/Backstage/UserList.vue'
import UserRoot from '../pages/Backstage/UserRoot.vue'
import ProductList from '../pages/Backstage/ProductList.vue'
import OrderManagement from '../pages/Backstage/OrderManagement.vue'
import UserAdd from '../pages/Backstage/UserAdd.vue'
import ProductAdd from '../pages/Backstage/ProductAdd.vue'
import Home from '../pages/Backstage/Home.vue'
import ProductCategory from '../pages/Backstage/ProductCategory.vue'




export default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/Index'
        },
        {
            name:'login',
            path:'/Login',
            component:Login,
            meta:{
                showNav:true
            }
        },
        {
            name:'register',
            path:'/Register',
            component:Register,
            meta:{
                showNav:true
            }
        },
        {
            name:'index',
            path:'/Index',
            component:Index,
        },
        {
            name:'bracelet',
            path:'/Bracelet',
            component:Bracelet
        },
        {
            name:'mobilePhone',
            path:'/MobilePhone',
            component:MobilePhone
        },
        {
            name:'television',
            path:'/Television',
            component:Television
        },
        {
            name:'notebook',
            path:'/Notebook',
            component:Notebook
        },
        {
            name:'backendSystem',
            path:'/BackendSystem',
            component:BackendSystem,
            meta:{
                showNav:true
            },
            children:[
                {
                    name:'home',
                    path:'Home',
                    component:Home,
                    meta:{
                        showNav:true
                    },
                },

                {
                    name:'userlist',
                    path:'UserList',
                    component:UserList,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'userroot',
                    path:'UserRoot',
                    component:UserRoot,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'productlist',
                    path:'ProductList',
                    component:ProductList,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'productcategory',
                    path:'ProductCategory',
                    component:ProductCategory,
                    meta:{
                        showNav:true
                    },
                },
                {
                    path:'ProductList',
                    component:ProductList,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'useradd',
                    path:'UserAdd',
                    component:UserAdd,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'ordermanagement',
                    path:'OrderManagement',
                    component:OrderManagement,
                    meta:{
                        showNav:true
                    },
                },
                {
                    name:'productadd',
                    path:'ProductAdd',
                    component:ProductAdd,
                    meta:{
                        showNav:true
                    },
                },
            ]
        },
    ]
})