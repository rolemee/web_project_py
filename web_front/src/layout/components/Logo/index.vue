<script setup name="Logo">

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()

defineProps({
    showLogo: {
        type: Boolean,
        default: true
    },
    showTitle: {
        type: Boolean,
        default: true
    }
})

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref('')

const to = computed(() => {
    let rtn = {}
    if (settingsStore.dashboard.enable && settingsStore.menu.menuMode !== 'userHead') {
        rtn.name = 'dashboard'
    } else {
        rtn.name = 'homePage'
    }
    return rtn
})
</script>

<template>
    <router-link :to="to" class="title" :class="{'is-link': settingsStore.dashboard.enable}" :title="title">
        <img v-if="showLogo" :src="logo" class="logo">
        <span v-if="showTitle" class="user-Interface">{{ title }}</span>
    </router-link>
</template>

<style lang="scss" scoped>
.title {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: inherit;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--g-sidebar-logo-height);
    text-align: center;
    overflow: hidden;
    text-decoration: none;
    &.is-link {
        cursor: pointer;
    }
    .logo {
        width: 30px;
        height: 30px;
        & + span {
            margin-left: 10px;
        }
    }
    span {
        display: block;
        font-weight: bold;
        color: #fff;
        @include text-overflow;
    }
    .user-Interface {
        font-family: "Times New Roman", Times, serif;
        color: #409EFF;
        margin-right: 20px;
    }
}
</style>
