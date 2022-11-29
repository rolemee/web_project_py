import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
let constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/index.vue'),
        meta: {
            title: '搜索'
        }
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
            breadcrumb: false
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
                    i18n: 'route.personal.setting',
                    cache: 'personalEditPassword'
                }
            },
            {
                path: 'edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    i18n: 'route.personal.editpassword'
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

import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import Search from './modules/search'

// 动态路由（异步路由、导航栏路由）
let asyncRoutes = [
    {
        meta: {
            title: '工作区',
            icon: 'sidebar-default'
        },
        children: [
            MultilevelMenuExample,
            BreadcrumbExample
        ]
    },
    {
        meta: {
            title: '搜一搜',
            icon: 'ep:search'
        },
        children: [
            Search
        ]
    }
]

export {
    constantRoutes,
    systemRoutes,
    asyncRoutes
}
