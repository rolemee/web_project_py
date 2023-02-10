import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
let constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:all(.*)*',
        name: 'notFound',
        component: () => import('@/views/[...all].vue'),
        meta: {
            title: '找不到页面'
        }
    }
]

// 系统路由
let systemRoutes = [
    {
        path: '/dashboard',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: () => {
                return useSettingsStore().dashboard.title
            },
            breadcrumb: false,
            copyright: false
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/index.vue'),
                meta: {
                    title: () => {
                        return useSettingsStore().dashboard.title
                    },
                    breadcrumb: false
                }
            }
        ]
    },
    {
        path: '/personal',
        component: () => import('@/layout/index.vue'),
        redirect: '/personal/setting',
        meta: {
            title: '个人中心',
            breadcrumb: false
        },
        children: [
            {
                path: 'setting',
                name: 'personalSetting',
                component: () => import('@/views/personal/setting.vue'),
                meta: {
                    title: '个人设置',
                    cache: ['personalEditPassword', 'personalEditEmail']
                }
            },
            {
                path: 'edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    cache: true,
                    noCache: ['personalSetting']
                }
            },
            {
                path: 'edit/email',
                name: 'personalEditEmail',
                component: () => import('@/views/personal/edit.email.vue'),
                meta: {
                    title: '修改邮箱',
                    cache: true,
                    noCache: ['personalSetting']
                }
            }
        ]
    },
    {
        path: '/reload',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '重新加载',
            breadcrumb: false
        },
        children: [
            {
                path: '',
                name: 'reload',
                component: () => import('@/views/reload.vue'),
                meta: {
                    title: '重新加载',
                    breadcrumb: false
                }
            }
        ]
    }
]

import Search from './modules/search'
import FindPage from '@/router/modules/find.page'
import HomePage from './modules/home.page'
import LogView from '@/router/modules/log.view'

// 动态路由（异步路由、导航栏路由）
let asyncRoutes = [
    {
        meta: {
            title: '首页',
            icon: 'sidebar-default',
            auth: [0, 1]
        },
        children: [
            HomePage
        ]
    },
    {
        meta: {
            title: '搜一搜',
            icon: 'ep:search',
            auth: [0, 1]
        },
        children: [
            Search
        ]
    },
    {
        meta: {
            title: '发现',
            icon: 'eye-open',
            auth: [0, 1]
        },
        children: [
            FindPage
        ]
    },
    {
        meta: {
            title: '日志',
            icon: 'ep:setting',
            auth: [1]
        },
        children: [
            LogView
        ]
    }
]

export {
    constantRoutes,
    systemRoutes,
    asyncRoutes
}
