<script setup>

const props = defineProps({
    describe: {
        type: String,
        default: '展开全部'
    },
    collaspe: {
        type: Boolean,
        default: true
    }
})

const $emit = defineEmits(['unCollaspe'])
const collaspeData = ref(props.collaspe)
function unCollaspe() {
    $emit('unCollaspe', '', collaspe => {
        collaspeData.value = collaspe
    })
}
</script>

<template>
    <div class="collapse-main">
        <slot />
        <div v-if="collaspeData" class="collaspe" @click="unCollaspe">
            <div style="display: flex;justify-content: center;">
                <span style="font-size: 15px">{{ props.describe }}</span>
                <el-icon style="font-size: 24px;" class="icon">
                    <svg-icon name="ep:arrow-down" />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
//scss
.collapse-main {
    position: relative;
    width: 100%;
    height: 20px;
    padding: 20px;
    background-color: var(--g-app-bg);
    overflow: hidden;
    .collaspe {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 20px;
        font-family:   "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: #7a8f9a;
        text-shadow: 0 0 1px rgba(232, 220, 220, 0.5);
        backdrop-filter: blur(13px);
        background: linear-gradient(-180deg,rgba(255,255,255,.8) 0,#fff 63%);
        transition: background 0.3s, var(--el-transition-color);
        cursor: pointer;
        &:hover {
            color: var(--el-text-color-primary);
            .icon {
                color: #409EFF;
            }
        }
        .icon {
            color: #c6e2ff;
        }
    }

}
</style>
