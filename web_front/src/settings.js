let globalSettings = {
    app: {
        // 颜色方案，可选值为 light、dark
        colorScheme: 'light',
        // Element 组件默认尺寸，支持：large、default、small
        elementSize: 'default',
        // 是否将 iconify 图标集中的 Element Plus 图标下载到本地，以便在离线环境下使用
        iconifyOfflineUse: false,
        enablePermission: false,
        // 是否开启载入进度条
        enableProgress: true,
        // 是否开启动态标题
        enableDynamicTitle: true,
        /**
         * 路由数据来源
         * frontend 前端
         * backend 后端
         * filesystem 文件系统
         */
        routeBaseOn: 'frontend'
    },
    // 控制台
    dashboard: {
        // 是否开启
        enable: true,
        // 控制台名称
        title: '首页'
    },
    // 布局
    layout: {
        // 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
        enableMobileAdaptation: true
    },
    // 导航栏
    menu: {
        baseOn: 'frontend',
        /**
         * 导航栏模式
         * head 顶部模式
         * userHead 用户界面
         * single 侧边栏模式（无主导航）
         */
        menuMode: 'userHead',
        // 切换主导航同时跳转页面
        switchMainMenuAndPageJump: true,
        // 次导航只保持一个子项的展开
        subMenuUniqueOpened: true,
        // 次导航是否收起
        subMenuCollapse: true
    },
    // 顶栏
    topbar: {
        // 是否固定
        fixed: true,
        // 是否开启侧边栏展开收起按钮
        enableSidebarCollapse: false,
        // 是否开启面包屑导航
        enableBreadcrumb: false,
        // 是否开启导航搜索
        enableNavSearch: false,
        // 是否开启全屏
        enableFullscreen: true,
        // 是否开启页面刷新
        enablePageReload: true,
        // 是否开启颜色主题
        enableColorScheme: false
    },
    // 底部版权
    copyright: {
        // 是否开启，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
        enable: true,
        // 版权信息配置，格式为：Copyright © [dates] <company> <beian>
        dates: '2022/11/28-2022/12/28',
        company: '问答小屋',
        website: '',
        beian: ''
    }
}

export default globalSettings
