<script setup>
const props = defineProps({
    userName: {
        type: String,
        default: '田木太太'
    },
    agreeNumber: {
        type: [String, Number],
        default: '4373'
    },
    detailInfo: {
        type: String,
        default: 'detailInfo'
    },
    sendTime: {
        type: String,
        default: '2019-12-12 11:54'
    },
    userNameSize: {
        type: String,
        default: '15px'
    },
    showAvatar: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div>
        <div class="detail-box">
            <div v-if="props.showAvatar" class="user" :style="{'font-size': props.userNameSize}">
                <div class="avatar">
                    <el-icon style="width: inherit;height: inherit">
                        <svg-icon style="width: 100%;height: 100%" name="user-avatar" />
                    </el-icon>
                </div>
                {{ props.userName }}
            </div>
            <div v-if="props.agreeNumber !== 0" class="agree-box">
                <span>{{ props.agreeNumber }} 赞同了该回答</span>
            </div>
            <div class="content">
                <span>{{ props.detailInfo }}</span>
            </div>
            <div class="expand-info-box">
                <span>发布于 {{ props.sendTime }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.detail-box {
    .user {
        font-weight: bold;
        display: flex;
        align-items: center;
        margin: 10px 0;
        .avatar {
            width: 25px;
            height: 25px;
            margin-right: 8px;
        }
    }
    .agree-box {
        font-size: 14px;
        color: #8590a6;
        padding: 8px 0;
    }
    .content {
        font-size: 15px;
        color: #121212;
        line-height: 1.6;
        white-space: pre-line;
        &:hover {
            cursor: default;
        }
    }
    .expand-info-box {
        padding: 8px 0;
        color: #8590a6;
        font-size: 14px;
    }
}
</style>
