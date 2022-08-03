import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import login from "./reception/login";
import product from './reception/product';
import personal from './reception/personal';

import backIndex from './backstage/index'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/',
            redirect: '/Index'
        },
        ...login,
        ...product,
        ...personal,
        ...backIndex
    ]
})

//l路由守卫
router.beforeEach((to, from, next) => {
    // 如果未登录，拦截并跳到登录
    const uid = localStorage.getItem('uid')
    if (to.meta.auth) {
        if (uid) {
            next()
        } else {
            next('/Login')
        }
    } else {
        next();
    }
    // 后台登录拦截
    Vue.nextTick(() => { //解决无法获取最新rName
        if (to.meta.isAuth) {
            const rName = localStorage.getItem('rootName');
            if (!rName) {
                next("/BackLogin")
            } else {
                next();
            }
        }
    })
});
router.afterEach((to, from) => {
    document.title = to.meta.title || "数码购商城";
})

export default router