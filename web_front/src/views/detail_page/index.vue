<script setup name="DetailPage">
import api from '@/api'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const route = useRoute(), router = useRouter()

const commentShow = ref(false)
const isUnfold = ref(false)
const replyBoxShow = ref([]) // 回复显示
const data = ref({
    userId: 1, // 用户id
    qid: route.params.id,
    changeHead: false,
    agreeNum: 123,
    userAvatar: '',
    commentNumber: 100,
    publishComment: '', // 发表的评论
    replyText: [], // 回复的评论
    showMore: true,
    // 问题内容
    title: '',
    content: {
        imagSrc: '', // 图片信息
        text: '', // 标题
        username: '', // 用户名
        time: ''// 时间
    },
    contentShow: false,
    keyWords: [],
    ansNum: '',
    hasStar: false,
    // 回答内容
    answerContent: [],
    comment: false,
    loading: false
})

onMounted(() => {
    // getScroll()
    window.addEventListener('scroll', handleScroll)
    getList()
})
onBeforeUnmount(() => {
    data.value.answerContent = []
    window.removeEventListener('scroll', handleScroll)
})

function getList() {
    data.value.loading = true
    api.get('api/quizinfo', {
        params: {
            qid: data.value.qid,
            userId: userStore.account ? userStore.account : ''
        }
    }).then(res => {
        let re = new RegExp('<.+?>', 'g')
        if (re.test(res.data.quiz_list[0].content)) {
            let url =   res.data.quiz_list[0].content.match(re)
            // console.log(url[0])
            let pattern = new RegExp('x22http', 'g')
            for (let i = 0; i < url.length; i++) {
                if (pattern.test(url[i])) {
                    data.value.content.imagSrc = url[i].split(/\s+/)[1].split('=')[1].replace(/\\x22/g, '').replace(/\\/g, '')
                    break
                }

                // console.log("url"+data.value.content.imagSrc)
            }
            res.data.quiz_list[0].content = res.data.quiz_list[0].content.replace(re, '')
        }
        data.value.title = res.data.quiz_list[0].title
        data.value.content.username = res.data.quiz_list[0].username
        // console.log(data.value.content.username)
        data.value.content.time = res.data.quiz_list[0].time.replace('T', ' ').split('.')[0]
        data.value.content.text = res.data.quiz_list[0].content
        data.value.keyWords = res.data.quiz_list[0].keyWords[0] === '' ? [] : res.data.quiz_list[0].keyWords
        data.value.ansNum = res.data.quiz_list[0].ans_num
        data.value.hasStar = res.data.quiz_list[0].is_star
        if (data.value.ansNum <= 10) {
            data.value.showMore = false
        }
    })
    api.get('api/search_answer', {
        params: {
            qid: data.value.qid,
            userId: userStore.account ? userStore.account : ''
        }
    }).then(res => {
        res.data.answer_list.forEach(item => {
            let cache = item.content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。+|(！+)|？+)/g, '$1\n').replace('&nbsp', ' ')
            data.value.answerContent.push({
                aid: item.id,
                username: item.username,
                agreeNum: item.like,
                hasAgree: item.is_like,
                sendTime: item.time.replace('T', ' ').split('.')[0],
                detailInfo: cache,
                briefDetail: item.content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n').replace('&nbsp', ' ') + '....',
                detailShow: cache.split('\n').length <= 30
            })
        })
        data.value.answerContent.sort((a, b) => { return b.agreeNum - a.agreeNum })
        data.value.loading = false
    })
}

function handleScroll() {
    if (data.value.content.imagSrc)
        data.value.changeHead = window.pageYOffset > 300
    else if (data.value.content.text)
        data.value.changeHead = window.pageYOffset > 130
    else
        data.value.changeHead = window.pageYOffset  > 10
}

// 搜索
function onSearch(searchData) {
    router.push({
        name: 'resultsInterface',
        params: {
            type: 'search-issues',
            keyword: searchData
        }
    })
}
// 标签搜索
function tagSearch(tag) {
    // console.log(tag)
    router.push({
        name: 'resultsInterface',
        params: {
            type: 'search-keywords',
            keyword: tag
        }
    })
}
// 回答
function handleWrite() {
    // console.log('写回答')
    if (data.value.userId !== '') {
        router.push({
            name: 'answerQuestion',
            params: {
                problemId: data.value.qid
            }
        })
    }
}
// 收藏问题
function handleStart() {
    if (userStore.isLogin) {
        if (data.value.hasStar) {
            api.get('/api/removestar', {
                params: {
                    qid: data.value.qid
                }
            }).then(res => {
                data.value.hasStar = !data.value.hasStar
                ElMessage.success(res.message)
            })
        } else {
            api.get('/api/star', {
                params: {
                    qid: data.value.qid
                }
            }).then(res => {
                data.value.hasStar = !data.value.hasStar
                ElMessage.success(res.message)
            })
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}
// 提问
function putQuestion() {
    if (data.value.userId !== '') {
        router.push({
            name: 'putQuestion'
        })
    }
}
// 赞同
function onAgree(aid, index) {
    if (userStore.isLogin) {
        if (data.value.answerContent[index].hasAgree) {
            api.get('api/removelike', {
                params: {
                    aid: aid
                }
            }).then(res => {
                --data.value.answerContent[index].agreeNum
                data.value.answerContent[index].hasAgree = !data.value.answerContent[index].hasAgree
                ElMessage.success(res.message)
            })
        } else {
            api.get('api/like', {
                params: {
                    aid: aid
                }
            }).then(res => {
                ++data.value.answerContent[index].agreeNum
                data.value.answerContent[index].hasAgree = !data.value.answerContent[index].hasAgree
                ElMessage.success(res.message)
            })
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}
// 更多回答
function getMoreList() {
    api.get('api/search_answer', {
        params: {
            qid: data.value.qid,
            limit: 10,
            offset: data.value.answerContent.length,
            userId: userStore.account ? userStore.account : ''
        }
    }).then(res => {
        res.data.answer_list.forEach(item => {
            let cache = item.content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。+|(！+)|？+)/g, '$1\n').replace('&nbsp', ' ')
            data.value.answerContent.push({
                aid: item.id,
                username: item.username,
                agreeNum: item.like,
                hasAgree: item.is_like,
                sendTime: item.time.replace('T', ' ').split('.')[0],
                detailInfo: cache,
                briefDetail: item.content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n').replace('&nbsp', ' ') + '....',
                detailShow: cache.split('\n').length <= 30
            })
        })
        if (data.value.answerContent.length === data.value.ansNum)  data.value.showMore = false
        data.value.loading = false
    })
}
</script>
<template>
    <div v-loading="data.loading">
        <div class="page-head" :style="!data.changeHead ? '' : 'position: fixed'">
            <header-search v-if="!data.changeHead" @on-search="onSearch" />
            <div v-if="data.changeHead" class="title-box" style="padding-left: 0">
                <div class="title">{{ data.title }}</div>
            </div>
            <div v-if="data.changeHead" class="button-box">
                <el-button type="primary" @click="handleWrite">
                    <el-icon style="margin-right: 5px">
                        <svg-icon name="ep:edit-pen" />
                    </el-icon>
                    写回答
                </el-button>
                <el-button info-filled @click="putQuestion">
                    <el-icon style="margin-right: 5px">
                        <svg-icon name="ep:info-filled" />
                    </el-icon>
                    提出问题
                </el-button>
            </div>
        </div>
        <div>
            <el-card shadow="never">
                <div class="label-box">
                    <div class="label">
                        <template v-for="(item, index) in data.keyWords" :key="index">
                            <el-button round @click="tagSearch(item)">{{ item }}</el-button>
                        </template>
                    </div>
                </div>
                <div class="title-box">
                    <div class="title">{{ data.title }}</div>
                </div>
                <div class="content-box">
                    <el-image v-if="data.content.imagSrc" style="width: 300px;height: 200px;margin-bottom: 10px" :src="data.content.imagSrc" fit="cover" :preview-src-list="[data.content.imagSrc]" />
                    <div v-if="data.content.text" :style="data.contentShow ? 'height: auto': ''" class="content">
                        <span ref="t" style="white-space: normal;width: 100%;word-break: break-all">{{ data.content.text }}</span>
                        <div v-if="!data.contentShow && data.content.text.length > 100" class="icon-box" @click="data.contentShow = true">
                            <el-icon class="icon">
                                <svg-icon name="ep:caret-bottom" />
                            </el-icon>
                            <span style="font-size: 15px">展开</span>
                        </div>
                    </div>
                    <div class="content-foot">
                        <span>{{ data.content.username }} · 发布于{{ data.content.time }}</span>
                    </div>
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="handleWrite">
                        <el-icon style="margin-right: 5px">
                            <svg-icon name="ep:edit-pen" />
                        </el-icon>
                        写回答
                    </el-button>
                    <el-button @click="handleStart">
                        <el-icon v-if="data.hasStar" style="color: #409EFF;font-size: large;margin-right: 5px">
                            <svg-icon name="ep:circle-check" />
                        </el-icon>
                        {{ data.hasStar ? '已收藏': '收藏问题' }}
                    </el-button>
                    <div v-if="data.contentShow" class="icon-box" @click="data.contentShow = !data.contentShow">
                        <el-icon class="icon">
                            <svg-icon name="ep:caret-top" />
                        </el-icon>
                        <span style="font-size: 15px">收起</span>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="total-box">
            <div class="total-num">
                <span>总共有{{ data.ansNum }}个回答</span>
            </div>
        </div>
        <template v-for="(item, index) in data.answerContent" :key="index">
            <div v-if="item.detailInfo" class="detail-box">
                <div class="detail">
                    <div v-if="!item.detailShow" class="briefDetail">
                        {{ item.username }}： {{ item.briefDetail }}
                    </div>
                    <detail-page
                        v-if="item.detailShow"
                        :user-name="item.username"
                        :agree-number="item.agreeNum"
                        :detail-info="item.detailInfo"
                        :send-time="item.sendTime"
                        user-name-size="18px"
                        class="content"
                    />
                    <div v-else class="tail" @click="item.detailShow = true">
                        <span>阅读全文</span>
                        <el-icon>
                            <svg-icon name="ep:arrow-down" />
                        </el-icon>
                    </div>
                    <div class="footer">
                        <el-button type="primary" plain :style="item.hasAgree ? 'background-color: #409eff;color: #ecf5ff' : ''" @click="onAgree(item.aid, index)">
                            <div style="font-size: 20px;">🖒</div>
                            赞同
                            <span style="letter-spacing:1px;margin-left: 10px">
                                {{ item.agreeNum !== 0 ? item.agreeNum : '' }}
                            </span>
                        </el-button>
                        <el-button type="primary" plain style="padding: 5px">
                            <div style="font-size: 10px">o(TヘTo)</div>
                        </el-button>
                        <div v-if="data.comment" class="icon-box">
                            <el-icon class="icon">
                                <svg-icon name="ep:chat-round" />
                            </el-icon>
                            <span style="font-size: 15px;">
                                {{ !commentShow ? data.commentNumber+"条评论" : '收起评论' }}
                            </span>
                        </div>
                        <div class="icon-box">
                            <el-icon class="icon">
                                <svg-icon name="ep:promotion" />
                            </el-icon>
                            <span style="font-size: 15px">分享</span>
                        </div>
                        <div v-if="item.detailShow" class="icon-box" @click="item.detailShow = !item.detailShow">
                            <el-icon class="icon">
                                <svg-icon name="ep:caret-top" />
                            </el-icon>
                            <span style="font-size: 15px">收起</span>
                        </div>
                    </div>
                    <template v-if="commentShow">
                        <div style="display: flex;margin-top: 10px;">
                            <div style="padding: 0 10px 0 0">
                                <el-avatar size="default" fit="cover" :src="data.userAvatar" />
                            </div>
                            <el-input v-model="data.publishComment" clearable maxlength="100" placeholder="发表你的看法" class="comment-input" />
                            <el-button
                                v-if="data.publishComment !== '' && typeof data.publishComment !== 'undefined'"
                                type="primary"
                                size="large"
                                plain
                                style="margin-left: 10px"
                            >
                                发表
                            </el-button>
                        </div>
                        <div class="comment-box">
                            <div class="comment-header">
                                <span>{{ data.commentNumber }} 条评论</span>
                                <div>
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
                            <div class="comment">
                                <div class="user">
                                    <el-icon style="width: inherit;height: inherit">
                                        <svg-icon style="width: 100%;height: 100%" name="user-avatar" />
                                    </el-icon>
                                </div>
                                <div class="comment-detail-box">
                                    <div style="display: flex;justify-content: space-between;align-items: center">
                                        <div class="comment-detail-head">
                                            <div class="userName">趣味运动会</div>
                                            <div class="time"> 2019-12-12 11:54</div>
                                        </div>
                                        <div class="comment-detail-head-icon">
                                            <div class="comment-detail-icon-box" @click="replyBoxShow[0] = !replyBoxShow[0]">
                                                <el-icon style="font-size: large;color: #909399">
                                                    <svg-icon name="ep:chat-line-round" />
                                                </el-icon>
                                                <span style="letter-spacing: 1px">回复</span>
                                            </div>
                                            <div class="comment-detail-icon-box">
                                                <svg class="icon" style="margin-left: 5px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" />
                                                </svg>
                                                <span>3</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment-detail">
                                        <span>我觉得这和她原生家庭的家境好以及氛围好是密不可分的。比如家里父母社会地位本身就高，那么面对公司领导，根本不会发怵，反而很有底气。</span>
                                    </div>
                                    <div v-if="replyBoxShow[0]" style="display: flex" class="replay-box">
                                        <el-input v-model="data.replyText[0]" placeholder="回复 趣味运动会" clearable />
                                        <el-button
                                            v-if="data.replyText[0] !== '' && typeof data.replyText[0] !== 'undefined'"
                                            type="primary"
                                            plain
                                            style="margin-left: 10px"
                                        >
                                            发布
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <div class="total-box" style="padding-top: 0">
            <collaspe-page v-if="data.showMore" style="width: 70%" @click="getMoreList()" />
        </div>
    </div>
</template>

<style scoped lang="scss">
//scss
.total-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 0 20px;
    .total-num {
        width: 70%;
        padding: 5px;
        background-color: var(--g-app-bg);
        text-align: center;
    }
}
.page-head {
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    background-color: var(--g-app-bg);
    padding: 16px 20px;
    transition: position 1s  ease;
}
.label-box {
    display: flex;
    padding-left: 18%;
    .label {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.title-box {
    display: flex;
    padding-left: 18%;
    margin-top: 10px;
    margin-bottom: 10px;
    .title {
        font-size: 22px;
        font-weight: bold;
    }
}
.content-box {
    display: flex;
    padding-left: 18%;
    flex-direction: column;
    .content {
        position: relative;
        font-size: 15px;
        width: 50%;
        height: 40px;
        overflow: hidden
    }
    .content-foot {
        font-size: 15px;
        color: #909399;
    }
    .icon-box {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20px;
        display: flex;
        padding-left: 40px;
        background: linear-gradient(-180deg,rgba(255,255,255,.8) 0,#fff 63%);
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
.button-box {
    display: flex;
    padding-left: 18%;
    margin-top: 10px;
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
.detail-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 0 20px;
    .detail {
        padding: 5px 20px 20px 20px;
        width: 70%;
        background-color: var(--g-app-bg);
        font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        .content {
            border-bottom: #f0f2f7 1px solid;
        }
        .tail {
            margin-top: 5px;
            font-size: 15px;
            color:  #337ecc;
            display: flex;
            align-items: center;
            &:hover {
                color: #409EFF;
                .briefDetail {
                    color:  #b1b3b8;
                }
            }
        }
        &:hover {
            cursor: pointer;
            .briefDetail {
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
            .comment-detail-box {
                padding: 5px;
                .comment-detail-head {
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
                .comment-detail-head-icon {
                    display: flex;
                    color: #909399;
                    letter-spacing: 2px;
                    font-size: 13px;
                    user-select: none;
                    .comment-detail-icon-box {
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
                .comment-detail {
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
