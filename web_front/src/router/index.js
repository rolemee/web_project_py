import { createRouter, createWebHashHistory } from 'vue-router'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useUserStore from '@/store/modules/user'
import useMenuStore from '@/store/modules/menu'
import useRouteStore from '@/store/modules/route'

import '@/assets/styles/nprogress.scss'
import { useNProgress } from '@vueuse/integrations/useNProgress'
const { isLoading } = useNProgress()

// 路由相关数据
import { constantRoutes, asyncRoutes  } from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    const routeStore = useRouteStore()
    settingsStore.app.enableProgress && (isLoading.value = true)
    if (routeStore.isGenerate) {
        // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
        settingsStore.menu.menuMode !== 'single' && menuStore.setActived(to.path)
        if (to.name) {
            if (to.matched.length !== 0) {
                // 如果已登录状态下，进入登录页会强制跳转到引导页
                if (to.name === 'login' && userStore.isLogin) {
                    next({
                        name: 'dashboard',
                        replace: true
                    })
                } else if (!settingsStore.dashboard.enable && to.name === 'dashboard') {
                    // 如果未开启控制台页面，则默认进入侧边栏导航第一个模块
                    if (menuStore.sidebarMenus.length > 0) {
                        next({
                            path: menuStore.sidebarMenusFirstDeepestPath,
                            replace: true
                        })
                    } else {
                        next()
                    }
                } else {
                    next()
                }
            } else {
                // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                next({
                    path: '/404'
                })
            }
        } else {
            next()
        }
    } else {
        await routeStore.generateRoutesAtFront(asyncRoutes)
        let removeRoutes = []
        routeStore.flatRoutes.forEach(route => {
            if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
                removeRoutes.push(router.addRoute(route))
            }
        })
        routeStore.flatSystemRoutes.forEach(route => {
            removeRoutes.push(router.addRoute(route))
        })
        // 记录的 accessRoutes 路由数据，在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
        routeStore.setCurrentRemoveRoutes(removeRoutes)
        next({
            path: to.fullPath,
            query: to.query,
            replace: true
        })
    }
})

router.afterEach((to, from) => {
    const settingsStore = useSettingsStore()
    const keepAliveStore = useKeepAliveStore()
    settingsStore.app.enableProgress && (isLoading.value = false)
    // 设置页面 title
    to.meta.title && settingsStore.setTitle(typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
    if (to.meta.cache) {
        let componentName = to.matched[to.matched.length - 1].components.default.name
        // console.log(to.matched[to.matched.length - 1])
        if (componentName) {
            keepAliveStore.add(componentName)
        } else {
            console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
        }
    }
    // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
    if (from.meta.cache) {
        let componentName = from.matched[from.matched.length - 1].components.default.name
        // 通过 meta.cache 判断针对哪些页面进行缓存
        // console.log(typeof from.meta.cache)
        switch (typeof from.meta.cache) {
            case 'string':
                if (from.meta.cache !== to.name) {
                    keepAliveStore.remove(componentName)
                }
                break
            case 'object':
                if (!from.meta.cache.includes(to.name)) {
                    keepAliveStore.remove(componentName)
                }
                break
        }
        // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
        switch (typeof from.meta.noCache) {
            case 'string':
                if (from.meta.noCache === to.name) {
                    keepAliveStore.remove(componentName)
                }
                break
            case 'object':
                if (from.meta.noCache.includes(to.name)) {
                    keepAliveStore.remove(componentName)
                }
                break
        }
        // 如果进入的是 reload 页面，则也将离开页面的缓存清空
        if (to.name === 'reload') {
            keepAliveStore.remove(componentName)
        }
    }
})

export default router
