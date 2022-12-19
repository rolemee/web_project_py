const Layout = () => import('@/layout/index.vue')

export default {
    path: '/home_page',
    component: Layout,
    redirect: '/home_page/list',
    name: 'homePage',
    meta: {
        title: '首页'
    },
    children: [
        {
            path: 'list',
            name: 'homePageList',
            component: () => import('@/views/home_page/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/home_page'
            }
        },
        {
            path: 'detail/:id',
            name: 'detailProblem',
            component: () => import('@/views/detail_page/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/home_page',
                cache: false
            }
        },
        {
            path: 'putQuestion/',
            name: 'putQuestion',
            component: () => import('@/views/put_problem/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/home_page'
            }
        }
    ]
}
