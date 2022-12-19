const Layout = () => import('@/layout/index.vue')

export default {
    path: '/useSearch',
    component: Layout,
    name: 'useSearch',
    meta: {
        title: '搜索',
        icon: 'ep:search'
    },
    children: [
        {
            path: 'index',
            name: 'searchIndex',
            component: () => import('@/views/search/index.vue'),
            meta: {
                title: '搜索',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/search',
                copyright: false,
                cache: false
            }
        },
        {
            path: 'more/:type/:keyword',
            name: 'resultsInterface',
            component: () => import('@/views/module_interface/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/search',
                cache: true,
                noCache: ['searchIndex']
            }
        }
    ]
}
