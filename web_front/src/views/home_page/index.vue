<script setup name="HomePage">
import useUserStore from '@/store/modules/user'
import api from '@/api'
import {ElMessage} from "element-plus";
const userStore = useUserStore()

const data = ref({
    problemNum: '',
    userId: userStore.account || '',
    problems: [], // 具体内容
    loading: false,
    showMoreLoading: false,
    showMore: true
})

const router = useRouter()

onMounted(() => {
    data.value.problems = []
    getList()
    api.get('/api/total').then(res => {
        data.value.problemNum = res.data.sum
    })
})
function getList() {
    data.value.loading = true
    api.get('api/getquiz', {
        params: {
            sort: 'popular',
            userId: data.value.userId
        }
    }).then(res => {
        let i = 0
        let length = res.data.quiz_list.length
        res.data.quiz_list.forEach(item => {
            api.get('api/search_answer', {
                params: {
                    aid: item.max_like_reply_id,
                    userId: data.value.userId
                }
            }).then(answer => {
                ++i
                // console.log(answer.data.answer_list[0])
                data.value.problems.push({
                    title: item.title,
                    qid: item.qid,
                    aid: item.max_like_reply_id,
                    username: answer.data.answer_list[0].username,
                    agreeNum: answer.data.answer_list[0].like,
                    hasAgree: answer.data.answer_list[0].is_like,
                    hasStar: item.is_star,
                    answerNum: item.ans_num,
                    sendTime: answer.data.answer_list[0].time.replace('T', ' ').split('.')[0],
                    detailInfo: answer.data.answer_list[0].content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n'),
                    briefDetail: answer.data.answer_list[0].content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n') + '....'
                })
                if (i === length) {
                    // data.value.problems.sort((a, b) => { return b.answerNum - a.answerNum })
                    data.value.loading = false
                }
            }).catch(() => {
                ++i
                if (i === length) {
                    // data.value.problems.sort((a, b) => { return b.answerNum - a.answerNum })
                    data.value.loading = false
                }
            })
        })
    }).catch(() => {
        data.value.loading = false
    })
}
// 进入问题详情页
function enterNewPage(qid) {
    router.push({
        name: 'detailProblem',
        params: {
            id: qid
        }
    })
}
// 点赞
function onAgree(aid, index) {
    // console.log(aid, index)
    if (userStore.isLogin) {
        if (data.value.problems[index].hasAgree) {
            api.get('api/removelike', {
                params: {
                    aid: aid
                }
            }).then(res => {
                --data.value.problems[index].agreeNum
                data.value.problems[index].hasAgree = !data.value.problems[index].hasAgree
                ElMessage.success(res.message)
            })
        } else {
            api.get('api/like', {
                params: {
                    aid: aid
                }
            }).then(res => {
                ++data.value.problems[index].agreeNum
                data.value.problems[index].hasAgree = !data.value.problems[index].hasAgree
                ElMessage.success(res.message)
            })
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}
// 收藏
function onCollection(qid, index) {
    if (userStore.isLogin) {
        if (data.value.problems[index].hasStar) {
            api.get('api/removestar', {
                params: {
                    qid: qid
                }
            }).then(res => {
                data.value.problems[index].hasStar = !data.value.problems[index].hasStar
                ElMessage.success(res.message)
            })
        } else {
            api.get('api/star', {
                params: {
                    qid: qid
                }
            }).then(res => {
                data.value.problems[index].hasStar = !data.value.problems[index].hasStar
                ElMessage.success(res.message)
            })
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}

// 我要提问
function goPutProblem() {
    router.push({
        name: 'putQuestion',
        params: {
            userId: 0
        }
    })
}
// 我要回答
function goGetProblem() {
    router.push({
        name: 'moduleInterface',
        params: {
            type: 'answer-issues'
        }
    })
}
// 显示更多
function showMore(val, callback) {
    data.value.showMoreLoading = true
    api.get('api/getquiz', {
        params: {
            sort: 'popular',
            offset: data.value.problems.length,
            limit: 10,
            userId: data.value.userId
        }
    }).then(res => {
        let i = 0
        let length = res.data.quiz_list.length
        let cache = []
        if (length > 0) {
            res.data.quiz_list.forEach(item => {
                api.get('api/search_answer', {
                    params: {
                        aid: item.max_like_reply_id,
                        userId: data.value.userId
                    }
                }).then(answer => {
                    ++i
                    cache.push({
                        title: item.title,
                        qid: item.qid,
                        aid: item.max_like_reply_id,
                        username: answer.data.answer_list[0].username,
                        agreeNum: answer.data.answer_list[0].like,
                        hasAgree: answer.data.answer_list[0].is_like,
                        hasStar: item.is_star,
                        answerNum: item.ans_num,
                        sendTime: answer.data.answer_list[0].time.replace('T', ' ').split('.')[0],
                        detailInfo: answer.data.answer_list[0].content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n'),
                        briefDetail: answer.data.answer_list[0].content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n') + '....'
                    })
                    if (i === length) {
                        // cache.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        data.value.problems = data.value.problems.concat(cache)
                        data.value.showMoreLoading = false
                    }
                }).catch(() => {
                    ++i
                    if (i === length) {
                        // cache.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        data.value.problems = data.value.problems.concat(cache)
                        data.value.showMoreLoading = false
                    }
                })
            })
        } else {
            data.value.showMoreLoading = false
            data.value.showMore = false
        }

    }).catch(() => data.value.showMoreLoading = false)
    callback(true)
}
</script>

<template>
    <div v-loading="data.loading">
        <div class="content-title">推荐问题</div>
        <div style="display:flex;align-items: flex-start;">
            <page-main style="width: 60%;margin-top: 0;margin-left:8% ">
                <template v-for="(item, index) in data.problems" :key="index">
                    <simple-module
                        :problem-id="item.qid"
                        :title="item.title"
                        :brief-detail="item.briefDetail"
                        :detail-info="item.detailInfo"
                        :user-name="item.username"
                        :agree-number="item.agreeNum"
                        :has-agree="item.hasAgree"
                        :has-star="item.hasStar"
                        :send-time="item.sendTime"
                        :answer-number="item.answerNum"
                        @enter-new-page="enterNewPage(item.qid)"
                        @on-agree="onAgree(item.aid, index)"
                        @on-collection="onCollection(item.qid, index)"
                        @go-detail="enterNewPage(item.qid)"
                    />
                </template>
                <collaspe-page v-if="data.showMore" v-loading="data.showMoreLoading" @un-collaspe="showMore" />
            </page-main>
            <div class="box">
                <div class="topbox">
                    <div class="title">问答小屋</div>
                    <div class="line"></div>
                    <div class="photo" />
                    <div class="tip-txt">
                        解决<p class="num">{{ data.problemNum }}</p>个问题
                    </div>
                </div>
                <div class="bottombox">
                    <div class="flex-column" @click="goPutProblem">
                        <el-icon class="icon">
                            <svg-icon name="ep:info-filled" />
                        </el-icon>
                        <span>我要提问</span>
                    </div>
                    <div class="flex-column" @click="goGetProblem">
                        <el-icon class="icon">
                            <svg-icon name="ep:edit" />
                        </el-icon>
                        <span>我来回答</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
//scss
.content-title {
    width: 60%;
    margin: 20px 20px 0 8%;
    padding: 10px;
    background-color: var(--g-app-bg);
    font-size: 15px;
    text-indent: 20px;
    color: #909399;
    border-bottom: #f0f2f7 1px solid;
}
.box{
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-left: 20px;
    .title{
        font-size: 20px;
        padding-top: 10px;
        margin-left: 25px;
        font-weight: bolder;
    }
    .topbox{
        width: 100%;
        overflow: hidden;
        background-color: rgb(235, 246, 253);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        user-select: none;
        .tip-txt{
            display: flex;
            align-items: center;
            justify-content: center;
            .num{
                margin-top: 2px;
                font-size: 36px;
                color: coral;
                margin-bottom: 2px;
            }
        }
        .line{
            width: 100%;
            border-top: #cccccc 2px solid;
            margin: 10px 0 10px 0;
        }
        .photo{
            width: 100%;
            height: 250px;
            background: url("@/assets/images/bk.jpg") no-repeat;
            background-size: cover;
        }
    }
    .bottombox{
        display: flex;
        background-color: white;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px;
        .flex-column{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            .icon {
                font-size: 25px;
            }
            &:hover {
                color: #409EFF;
                opacity: 0.6;
                cursor: pointer;
            }
        }
    }
}

</style>
