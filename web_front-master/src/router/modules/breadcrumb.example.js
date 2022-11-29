const Layout = () => import('@/layout/index.vue')

export default {
    path: '/information',
    component: Layout,
    redirect: '/information/list1',
    name: 'breadcrumbExample',
    meta: {
        title: '资料审核',
        icon: 'sidebar-breadcrumb'
    },
    children: [
        {
            path: 'list1',
            name: 'breadcrumbExampleList1',
            component: () => import('@/views/breadcrumb_example/list1.vue'),
            meta: {
                title: '待审核资料'
            }
        },
        {
            path: 'detail1',
            name: 'breadcrumbExampleDetail1',
            component: () => import('@/views/breadcrumb_example/detail1.vue'),
            meta: {
                title: '详情',
                sidebar: false,
                activeMenu: '/breadcrumb_example/list1'
            }
        },
        {
            path: 'list2',
            name: 'breadcrumbExampleList2',
            redirect: '/breadcrumb_example/list2',
            meta: {
                title: '审核后资料'
            }
        }
    ]
}
