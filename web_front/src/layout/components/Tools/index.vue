<script setup name="Tools">

const reload = inject('reload')
const router = useRouter()

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

function userCommand(command) {
    switch (command) {
        case 'dashboard':
            router.push({
                name: 'dashboard'
            })
            break
        case 'setting':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'logout':
            userStore.logout().then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
        case 'myQuestion':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'myAnswer':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'search':
            router.push({
                name: 'searchIndex'
            })
            break
    }
}

</script>

<template>
    <div class="tools">
        <div class="buttons">
            <span v-if="settingsStore.topbar.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <el-icon>
                    <svg-icon name="ep:search" />
                </el-icon>
            </span>
            <span v-if="settingsStore.mode === 'pc' && settingsStore.topbar.enableFullscreen" class="item" @click="toggle">
                <el-icon>
                    <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
                </el-icon>
            </span>
            <span v-if="settingsStore.topbar.enablePageReload" class="item" @click="reload()">
                <el-icon>
                    <svg-icon name="ep:refresh-right" />
                </el-icon>
            </span>
        </div>
        <el-dropdown class="user-container" size="default" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="small" :src="userStore.userAvatar">
                    <el-icon>
                        <svg-icon name="ep:user-filled" />
                    </el-icon>
                </el-avatar>
                {{ userStore.account }}
                <el-icon>
                    <svg-icon name="ep:caret-bottom" />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu v-if="!userStore.isLogin" class="user-dropdown">
                    <el-dropdown-item v-if="settingsStore.dashboard.enable" command="dashboard">引导页</el-dropdown-item>
                    <el-dropdown-item command="search">搜一搜</el-dropdown-item>
                    <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">去登录</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="userStore.token" class="user-dropdown">
                    <el-dropdown-item command="myQuestion">我的提问</el-dropdown-item>
                    <el-dropdown-item command="myAnswer">我的回答</el-dropdown-item>
                    <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .buttons {
        margin-right: 20px;
        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 34px;
            cursor: pointer;
            vertical-align: middle;
            .el-icon {
                color: var(--el-text-color-primary);
                transition: var(--el-transition-color);
            }
        }
    }
}
:deep(.user-container) {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
</style>
