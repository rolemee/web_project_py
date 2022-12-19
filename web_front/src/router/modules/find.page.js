const Layout = () => import('@/layout/index.vue')

export default {
    path: '/find_page',
    component: Layout,
    redirect: '/find_page/list',
    name: 'findPage',
    meta: {
        title: '发现'
    },
    children: [
        {
            path: 'list',
            name: 'findPageList',
            component: () => import('@/views/find_page/index.vue'),
            meta: {
                title: '发现',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/find_page',
                cache: ['moduleInterface', 'detailProblem', 'answerQuestion']
            }
        },
        {
            path: 'more/:type',
            name: 'moduleInterface',
            component: () => import('@/views/module_interface/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/find_page',
                cache: true,
                noCache: ['findPageList']
            }
        },
        {
            path: 'answerQuestion/:problemId',
            name: 'answerQuestion',
            component: () => import('@/views/answer_problem/index.vue'),
            meta: {
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/find_page'
            }
        }
    ]
}
