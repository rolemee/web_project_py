<script setup>

const props = defineProps({
    userId: {
        type: [String, Number],
        default: ''
        // required: true
    },
    userAvatar: { // 用户头像
        type: String,
        default: ''
    },
    problemId: {
        type: [String, Number],
        default: '',
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    briefDetail: { // 简略信息
        type: String,
        default: ''
    },
    detailInfo: { // 详细回答
        type: String,
        default: ''
    },
    userName: { // 回答用户名
        type: String,
        default: ''
    },
    agreeNumber: { // 点赞数
        type: [String, Number],
        default: ''
    },
    hasAgree: {
        type: Boolean,
        default: false
    },
    hasStar: {
        type: Boolean,
        default: false
    },
    commentNumber: { // 评论数
        type: [String, Number],
        default: '4373'
    },
    sendTime: { // 回答发布时间
        type: String,
        default: '2019-12-12 11:54'
    },
    footerShow: { // 下拉按钮是否显示
        type: Boolean,
        default: true
    },
    collaspeShow: { // 是否显示展示更多
        type: Boolean,
        default: false
    },
    answerNumber: { // 回复数
        type: [Number, String],
        default: ''
    }
})

const $emit = defineEmits(['onAgree', 'unAgree', 'onCollection', 'enterNewPage', 'goDetail'])

const isUnfold = ref(true)
const detailShow = ref(false)
const commentShow = ref(false)
const replyBoxShow = ref([])
const data = ref({
    comment: [
        {
            name: '趣味运动会', // 发表评论的用户名
            content: '我觉得这和她原生家庭的家境好以及氛围好是密不可分的。比如家里父母社会地位本身就高，那么面对公司领导，根本不会发怵，反而很有底气。',
            agreeNum: 3
        }
    ],
    commentNumber: 0, // 评论数目
    publishComment: '', // 发表评论
    replyText: []// 回复别人信息
})

// 点击阅读全文
function showMore() {
    detailShow.value = true
}

// 点击标题进入详情
function enterNewPage() {
    // console.log('进入详情')
    $emit('enterNewPage', props.problemId)
}
// 点击进入问题的详情页
function goDetail() {
    $emit('goDetail', props.problemId)
}
// 评论查看
function showComment() {
    commentShow.value = !commentShow.value
}
// 评论
function onComment() {
    console.log('评论')
}
// 评论逆序
function reverseOrder() {
    isUnfold.value = !isUnfold.value
    console.log('逆序')
}
// 点赞
function onPraise(val) {
    val.path[0].style.fill = val.path[0].style.fill === 'red' ? '#909399' : 'red'
    // 点赞后端交互
}
// 回复
function onReply() {
    console.log('回复')
}
//
function onShare() {
    window.clipboardData.setData('Text', 'a')
}

</script>

<template>
    <div class="content-box">
        <div class="title" @click="enterNewPage">
            {{ props.title }}
        </div>
        <div class="content" @click="showMore">
            <div v-if="!detailShow" class="detail">
                <div v-if="!props.briefDetail">目前还未有回答...</div>
                <div v-else>
                    {{ props.userName }}： {{ props.briefDetail }}
                </div>
            </div>
            <detail-page
                v-if="detailShow"
                :user-name="props.userName"
                :agree-number="props.agreeNumber"
                :detail-info="props.detailInfo"
                :send-time="props.sendTime"
                user-name-size="15px"
            />
            <div v-if="!detailShow && props.detailInfo" class="tail">
                <span>阅读全文</span>
                <el-icon>
                    <svg-icon name="ep:arrow-down" />
                </el-icon>
            </div>
        </div>
        <div v-if="props.footerShow" class="footer">
            <el-button type="primary" plain :style="props.hasAgree ? 'background-color: #409eff;color: #ecf5ff' : ''" @click="$emit('onAgree', props.problemId)">
                <div style="font-size: 20px;">🖒</div>
                赞同
                <span style="letter-spacing:1px;margin-left: 10px">
                    {{ props.agreeNumber !== 0 ? props.agreeNumber : '' }}
                </span>
            </el-button>
            <el-button type="primary" plain style="padding: 5px" @click="$emit('unAgree', props.problemId)">
                <div style="font-size: 10px">o(TヘTo)</div>
            </el-button>
            <div v-if="commentShow" class="icon-box" @click="showComment">
                <el-icon class="icon">
                    <svg-icon name="ep:chat-round" />
                </el-icon>
                <span style="font-size: 15px;">
                    {{ !commentShow ? props.commentNumber+"条评论" : '收起评论' }}
                </span>
            </div>
            <div v-if="props.answerNumber" class="icon-box" @click="goDetail">
                <el-icon class="icon">
                    <svg-icon name="ep:chat-round" />
                </el-icon>
                <span style="font-size: 15px;">
                    {{ props.answerNumber+"条回复" }}
                </span>
            </div>
            <div class="icon-box" @click="onShare">
                <el-icon class="icon">
                    <svg-icon name="ep:promotion" />
                </el-icon>
                <span style="font-size: 15px">分享</span>
            </div>
            <div class="icon-box" @click="$emit('onCollection', props.problemId)">
                <el-icon class="icon" :style="props.hasStar ? 'color: red' : ''">
                    <svg-icon name="ep:star-filled" />
                </el-icon>
                <span style="font-size: 15px">收藏</span>
            </div>
            <div v-if="detailShow" class="icon-box" @click="detailShow = !detailShow">
                <el-icon class="icon">
                    <svg-icon name="ep:caret-top" />
                </el-icon>
                <span style="font-size: 15px">收起</span>
            </div>
        </div>
        <template v-if="commentShow">
            <div style="display: flex;margin-top: 10px;">
                <div style="padding: 0 10px 0 0">
                    <el-avatar size="default" fit="cover" :src="props.userAvatar" />
                </div>
                <el-input v-model="data.publishComment" clearable maxlength="100" placeholder="发表你的看法" class="comment-input"/>
                <el-button
                    v-if="data.publishComment !== '' && typeof data.publishComment !== 'undefined'"
                    type="primary"
                    size="large"
                    plain
                    style="margin-left: 10px"
                    @click="onComment"
                >
                    发表
                </el-button>
            </div>
            <div class="comment-box">
                <div class="comment-header">
                    <span>{{ data.commentNumber }} 条评论</span>
                    <div @click="reverseOrder">
                        <el-icon class="icon">
                            <el-tooltip
                                effect="dark"
                                :content="isUnfold ? '逆序' : '正序'"
                                placement="bottom"
                            >
                                <svg-icon :name="isUnfold ? 'ep:caret-top' : 'ep:caret-bottom'" />
                            </el-tooltip>
                        </el-icon>
                    </div>
                </div>
                <div v-for="(item,index) in data.comment" :key="index" class="comment">
                    <div class="user">
                        <el-icon style="width: inherit;height: inherit">
                            <svg-icon style="width: 100%;height: 100%" name="user-avatar" />
                        </el-icon>
                    </div>
                    <div class="detail-box">
                        <div style="display: flex;justify-content: space-between;align-items: center">
                            <div class="detail-head">
                                <div class="userName">{{ item.name }}</div>
                                <div class="time"> 2019-12-12 11:54</div>
                            </div>
                            <div class="detail-head-icon">
                                <div class="detail-icon-box" @click="replyBoxShow[index] = !replyBoxShow[index]">
                                    <el-icon style="font-size: large;color: #909399">
                                        <svg-icon name="ep:chat-line-round" />
                                    </el-icon>
                                    <span style="letter-spacing: 1px">回复</span>
                                </div>
                                <div class="detail-icon-box" @click="onPraise">
                                    <svg class="icon" style="margin-left: 5px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" />
                                    </svg>
                                    <span>{{ item.agreeNum }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="detail">
                            <span>{{ item.content }}</span>
                        </div>
                        <div v-if="replyBoxShow[index]" style="display: flex" class="replay-box">
                            <el-input v-model="data.replyText[index]" :placeholder="'回复 '+item.name" clearable/>
                            <el-button
                                v-if="data.replyText[index] !== '' && typeof data.replyText[index] !== 'undefined'"
                                type="primary"
                                plain
                                style="margin-left: 10px"
                                @click="onReply"
                            >
                                发布
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <collaspe-page v-if="props.collaspeShow" />
</template>
<style scoped lang="scss">
//scss
.content-box {
    padding: 5px 20px 20px 20px;
    border-bottom: #f0f2f7 1px solid;
    font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    .title {
        font-size: 18px;
        font-weight: bold;
        color: #121212;
        &:hover {
            cursor: pointer;
            color: rgba(18, 18, 18, 0.72);
        }
    }
    .content {
        margin-top: 5px;
        font-size: medium;
        transition: color 0.25s ease;
        .tail {
            margin-top: 5px;
            font-size: 15px;
            color:  #337ecc;
            display: flex;
            align-items: center;
            &:hover {
                color: #409EFF;
                .detail {
                    color:  #b1b3b8;
                }
            }
        }
        &:hover {
            cursor: pointer;
            .detail {
                color:  #b1b3b8;
            }
        }
    }
    .footer {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .icon-box {
            display: flex;
            align-items: center;
            margin-left: 20px;
            user-select: none;
            .icon {
                font-size: 20px;
                color: #8590a6;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
    .comment-input {
        :deep(.el-input__wrapper) {
            border-radius: 8px;
            height: 40px;
        }
    }
    .comment-box {
        margin-top: 15px;
        border: 1px solid rgb(235, 235, 235);
        padding: 10px;
        .comment-header {
            font-weight: bold;
            color: rgb(68, 68, 68);
            border-bottom: #f0f2f7 1px solid;
            padding: 8px;
            display: flex;
            justify-content: space-between;
            .icon {
                color: rgba(0, 0, 0, 0.46);
                border-bottom: none;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .comment {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .user {
                width: 30px;
                height: 30px;
            }
            .detail-box {
                padding: 5px;
                .detail-head {
                    display: flex;
                    align-items: flex-end;
                    .userName {
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .time {
                        margin-left: 5px;
                        font-size: 14px;
                        color: #909399;
                    }
                }
                .detail-head-icon {
                    display: flex;
                    color: #909399;
                    letter-spacing: 2px;
                    font-size: 13px;
                    user-select: none;
                    .detail-icon-box {
                        display: flex;
                        align-items: flex-end;
                        margin-left: 10px;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    .icon {
                        width: 20px;
                        height: 20px;
                        fill: #909399;
                    }
                }
                .detail {
                    font-size: 15px;
                    line-height: 21px;
                    white-space: pre-line;
                    margin-top: 8px;
                }
            }
        }
    }
}
</style>
