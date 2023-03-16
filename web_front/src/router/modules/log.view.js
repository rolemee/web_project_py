const Layout = () => import('@/layout/index.vue')

export default {
    path: '/log_view',
    component: Layout,
    redirect: '/log_view/list',
    name: 'logView',
    meta: {
        title: '系统日志审核',
        icon: 'ep:setting'
    },
    children: [
        {
            path: 'list',
            name: 'logViewList',
            component: () => import('@/views/log_view/list.vue'),
            meta: {
                title: '系统日志审核',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/log_view'
            }
        }
    ]
}
