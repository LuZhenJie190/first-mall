const UserList = () => import('../../pages/Backstage/UserList.vue');
const UserRoot = () => import('../../pages/Backstage/UserRoot.vue');

export default [

    {
        name: 'userlist',
        path: 'UserList',
        component: UserList,
        meta: {
            showNav: true,
            title: '用户管理',
            isAuth: true
        },
    },
    {
        name: 'userroot',
        path: 'UserRoot',
        component: UserRoot,
        meta: {
            showNav: true,
            title: '用户权限',
            isAuth: true
        },
    },
]