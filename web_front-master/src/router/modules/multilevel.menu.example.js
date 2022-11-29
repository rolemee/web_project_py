const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_manage',
    component: Layout,
    redirect: '/user_manage/index',
    name: 'multilevelMenuExample',
    meta: {
        title: '用户管理',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'comment_uer',
            name: 'multilevelMenuExample1',
            component: () => import('@/views/multilevel_menu_example/page.vue'),
            meta: {
                title: '普通用户'
            }
        },
        {
            path: 'employee_user',
            name: 'multilevelMenuExample2',
            redirect: '/multilevel_menu_example/level2/page',
            meta: {
                title: '职工用户'
            }
        }
    ]
}
