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
        }
    ]
}
