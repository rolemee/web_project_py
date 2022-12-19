<script setup name="Header" xmlns="http://www.w3.org/1999/html">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()

const switchMenu = inject('switchMenu')

</script>

<template>
    <transition name="header">
        <header v-if="!settingsStore.topStatus && settingsStore.mode === 'pc' && settingsStore.menu.menuMode === 'userHead'" style="box-shadow: var(--el-box-shadow-light)">
            <div class="header-container">
                <div class="main" style="height: auto;margin-left: 8%">
                    <Logo style="border-right: #2a64a6 1px Dashed;" :show-logo="false" />
                    <!-- 用户顶部模式 -->
                    <div class="nav" style="font-size: 18px;font-family: '微软雅黑','宋体',serif;margin: 20px">
                        <template v-for="(item, index) in menuStore.allMenus">
                            <div v-if="item.children && item.children.length !== 0" :key="index" class="item" :class="{'active': index === menuStore.actived}" @click="switchMenu(index)">
                                <span v-if="item.meta.title">{{ item.meta.title }}</span>
                                <div :style="index === menuStore.actived ? 'border-bottom:  #409EFF 2px solid;': ''" style="width: 100%;margin-top: 5px" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <Tools />
        </header>
    </transition>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: var(--g-header-height);
    color: var(--g-header-color);
    background-color: var(--g-header-bg);
    transition: background-color 0.3s, var(--el-transition-color);
    .header-container {
        width: var(--g-header-width);
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .main {
            display: flex;
            align-items: center;
            height: 100%;
        }
    }
    @media screen and (max-width: var(--g-header-width)) {
        .header-container {
            width: 100%;
        }
    }
    :deep(.title) {
        position: relative;
        width: inherit;
        height: inherit;
        padding: inherit;
        background-color: inherit;
        .logo {
            width: 50px;
            height: 50px;
        }
        span {
            font-size: 24px;
            letter-spacing: 1px;
            color: var(--g-header-color);
        }
    }
    .nav {
        display: flex;
        height: 100%;
        margin-left: 50px;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 5px;
            width: 80px;
            cursor: pointer;
            color: var(--g-header-menu-color);
            background-color: var(--g-header-bg);
            transition: background-color 0.3s, var(--el-transition-color);
            &:hover {
                color: var(--g-header-menu-hover-color);
                background-color: var(--g-header-menu-hover-bg);
            }
            &.active {
                color: var(--g-header-menu-active-color);
                background-color: var(--g-header-menu-active-bg);
            }
            .el-icon {
                font-size: 24px;
                vertical-align: middle;
            }
            span {
                text-align: center;
                vertical-align: middle;
                word-break: break-all;
                @include text-overflow(1, false);
            }
        }
    }
    :deep(.tools) {
        padding: 0;
        .buttons .item .el-icon {
            color: var(--g-header-color);
        }
        .user-container {
            font-size: 16px;
            color: var(--g-header-color);
        }
    }
}
// 头部动画
.header-enter-active,
.header-leave-active {
    transition: transform 0.3s;
}
.header-enter-from,
.header-leave-to {
    transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
