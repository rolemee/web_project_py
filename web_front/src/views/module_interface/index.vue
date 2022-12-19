<script setup name="ModuleInterface">
import api from '@/api'
import useUserStore from '@/store/modules/user'
import {ElMessage} from "element-plus";
const userStore = useUserStore()
const route = useRoute(), router = useRouter()

const data = ref({
    changeHead: false,
    userId: userStore.account,
    sort: {
        'default': ['默认排序', '最近发布']
    },
    sortCheck: {
        'default': ''
    },
    sortOpen: false,
    type: route.params.type,
    sortType: '',
    agreeNumber: 123,
    problems: [],
    loading: false,
    searchData: route.params.type === 'search-high' ? '' : route.params.keyword,
    searchKeywords: route.params.keyword,
    showMoreLoading: false,
    sortShow: true,
    showMore: true,
    highSearch: { // 高级搜索
        keywords: '',
        startTime: '',
        endTime: ''
    },
    totalNum: 0 // 搜索到的总条数
})

onMounted(() => {
    data.value.sortCheck.default = '默认排序'
    data.value.sortCheck.time = '不限时间'
    data.value.loading = true
    data.value.problems = []
    if (data.value.type === 'answer-issues') {
        data.value.sortShow = false
        getNoAnswer()
    }
    if (data.value.type === 'hot-issues') {
        data.value.sort =  {
            'default': ['默认排序', '最近发布']
        }
        getList('popular')
        data.value.sortType = 'popular'
    }
    if (data.value.type === 'new-issues') {
        data.value.sort =  {
            'default': ['默认排序', '最多回答']
        }
        getList('haveanswer')
        data.value.sortType = 'haveanswer'
    }
    if (data.value.type === 'search-issues') {
        data.value.sortShow = false
        getSearch(data.value.searchData)
        data.value.sortType = 'search'
    }
    if (data.value.type === 'search-keywords') {
        data.value.sortShow = false
        getSearchKeywords(data.value.searchKeywords)
        data.value.sortType = 'searchKeywords'
    }
    if (data.value.type === 'search-high') {
        data.value.sortShow = false
        let keywords, num, startTime, endTime
        keywords = data.value.searchKeywords.split('|K')[0]
        if (eval('/' + 'T' + '/g').test(data.value.searchKeywords.split('|K')[1]) && eval('/' + 'E' + '/g').test(data.value.searchKeywords.split('|K')[1])) {
            let cacheTime = data.value.searchKeywords.split('T')[1]
            if (eval('/' + '-l' + '/g').test(data.value.searchKeywords.split('|K')[1]))
                cacheTime = cacheTime.split('-l')[0]
            startTime = cacheTime.split('E')[0]
            endTime = cacheTime.split('E')[1]
        }
        if (eval('/' + '-l' + '/g').test(data.value.searchKeywords.split('|K')[1])) {
            num = data.value.searchKeywords.split('-l')[1]
        }
        if (startTime) {
            if (num)
                getSearch(keywords, 0, num, startTime, endTime)
            else
                getSearch(keywords, 0, 10, startTime, endTime)
        } else {
            if (num)
                getSearch(keywords, 0, num)
            else
                getSearch(keywords)
        }
        data.value.highSearch.keywords = keywords
        data.value.highSearch.startTime = startTime
        data.value.highSearch.endTime = endTime
        data.value.sortType = 'searchHigh'
    }
    window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
    data.value.changeHead = window.pageYOffset  > 0
}
// 获取热门|有回答的问题
function getList(type, start_time = '1970-01-01', end_time = format(new Date())) {
    api.get('api/getquiz', {
        params: {
            sort: type,
            start_time: start_time,
            end_time: end_time,
            userId: data.value.userId
        }
    }).then(res => {
        // console.log(res.data)
        let i = 0
        let length = res.data.quiz_list.length
        if (length < 10) data.value.showMore = false
        if (length > 0) {
            res.data.quiz_list.forEach(item => {
                api.get('api/search_answer', {
                    params: {
                        aid: item.max_like_reply_id,
                        userId: data.value.userId
                    }
                }).then(answer => {
                    ++i
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
                        // data.value.problems.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        data.value.loading = false
                    }
                }).catch(() => {
                    ++i
                    if (i === length) {
                        // data.value.problems.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        data.value.loading = false
                    }
                })
            })
        } else data.value.loading = false

    }).catch(() => data.value.loading = false)
}
// 获取没有回答的问题
function getNoAnswer() {
    api.get('api/getquiz', {
        params: {
            sort: 'noanswer'
        }
    }).then(res => {
        res.data.quiz_list.forEach(item => {
            data.value.problems.push({
                title: item.title,
                sendTime: item.time.replace('T', ' ').split('.')[0],
                keyWords: item.keyWords[0] === '' ? [] : item.keyWords,
                username: item.username,
                qid: item.qid
            })
        })
        data.value.loading = false
    })
}
// 搜索
function getSearch(q, offset = 0, limit = 10, start_time = '1970-01-01', end_time = format(new Date())) {
    api.get('api/search', {
        params: {
            q: q,
            start_time: start_time,
            end_time: end_time,
            offset: offset,
            limit: limit,
            userId: data.value.userId
        }
    }).then(res => {
        // console.log(res.data)
        let i = 0
        let length = res.data.quiz_list.length
        data.value.totalNum = res.data.total_num
        if (length > 0) {
            res.data.quiz_list.forEach(item => {
                ++i
                if (item.max_like_reply_id !== 0) {
                    api.get('api/search_answer', {
                        params: {
                            aid: item.max_like_reply_id,
                            userId: data.value.userId
                        }
                    }).then(answer => {
                        data.value.problems.push({
                            title: item.title,
                            qid: item.qid,
                            aid: item.max_like_reply_id,
                            username: answer.data.answer_list[0].username,
                            agreeNum: answer.data.answer_list[0].like,
                            hasAgree: answer.data.answer_list[0].is_like,
                            hasStar: item.is_star,
                            sendTime: answer.data.answer_list[0].time.replace('T', ' ').split('.')[0],
                            detailInfo: answer.data.answer_list[0].content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n'),
                            briefDetail: answer.data.answer_list[0].content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n') + '....'
                        })

                    })
                } else {
                    data.value.problems.push({
                        title: item.title,
                        qid: item.qid,
                        aid: item.max_like_reply_id,
                        hasStar: item.is_star,
                    })
                }
                if (i === length) {
                    if (data.value.totalNum === data.value.problems.length) data.value.showMore = false
                    data.value.loading = false
                    data.value.showMoreLoading = false
                }
            })
        } else {
            data.value.loading = false
            data.value.showMoreLoading = false
            data.value.showMore = false
        }
    }).catch(() => {
        data.value.loading = false
        data.value.showMoreLoading = false
        data.value.showMore = false
    })
}
// 关键字搜索
function getSearchKeywords(keywords, limit = 10, offset = 0) {
    api.get('/api/searchkeywords', {
        params: {
            keywords: keywords,
            limit: limit,
            offset: offset,
            userId: data.value.userId
        }
    }).then(res => {
        let length = res.data.quiz_list.length
        if (length < limit) data.value.showMore = false
        data.value.totalNum = res.data.total_num
        let i = 0
        if (length > 0) {
            res.data.quiz_list.forEach(item => {
                ++i
                if (item.max_like_reply_id !== 0) {
                    api.get('api/search_answer', {
                        params: {
                            aid: item.max_like_reply_id,
                            userId: data.value.userId
                        }
                    }).then(answer => {
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
                    })
                } else {
                    data.value.problems.push({
                        title: item.title,
                        qid: item.qid,
                        aid: item.max_like_reply_id,
                        hasStar: item.is_star
                    })
                }
                if (i === length) {
                    data.value.loading = false
                    data.value.showMoreLoading = false
                }
            })
        } else {
            data.value.showMore = false
            data.value.loading = false
            data.value.showMoreLoading = false
            data.value.showMore = false
        }
    }).catch(() => {
        data.value.loading = false
        data.value.showMoreLoading = false
        data.value.showMore = false
    })
}
// 返回列表页
function goBack() {
    if (data.value.type !== 'search-issues' && data.value.type !== 'search-high')
        router.push({ name: 'findPageList' })
    else
        router.push({ name: 'searchIndex' })
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
// 排序选择
function format(time) {
    let month
    if (time.getMonth() + 1 < 10)
        month = '0' + (time.getMonth() + 1)
    else month = time.getMonth() + 1
    let day
    if (time.getDate() < 10)
        day = '0' + time.getDate()
    else day = time.getDate()
    return time.getFullYear() + '-' + month + '-' + day
}
function sortChange(sort, type) {
    if (data.value.type !== 'search-issues' && data.value.type !== 'search-keywords' && data.value.type !== 'search-high' && data.value.type !== 'answer-issues') {
        data.value.sortCheck[type] = sort
        data.value.problems = []
        if (data.value.sortCheck.default === '最近发布' && data.value.type === 'hot-issues') {
            data.value.loading = true
            let time = format(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
            // console.log(time.getFullYear())
            getList('haveanswer', time)
        }
        if (data.value.sortCheck.default === '默认排序') {
            data.value.loading = true
            getList(data.value.sortType)
        }
        if (data.value.sortCheck.default === '最多回答' && data.value.type === 'new-issues') {
            data.value.loading = true
            getList(data.value.sortType + 'sort')
        }
    }
}

// 写回答
function handleWrite(qid) {
    console.log('write')
    router.push({
        name: 'answerQuestion',
        params: {
            problemId: qid
        }
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
// 显示更多
function showMore(val, callback) {
    data.value.showMoreLoading = true
    if (data.value.type === 'search-keywords') {
        getSearchKeywords(data.value.searchKeywords, 10, data.value.problems.length)
    } else if (data.value.type === 'search-issues') {
        getSearch(data.value.searchData, data.value.problems.length, 10)
    } else if (data.value.type === 'search-high') {
        if (data.value.startTime) {
            getSearch(data.value.highSearch.keywords, data.value.problems.length, 10, data.value.startTime, data.value.endTime)
        } else {
            getSearch(data.value.highSearch.keywords, data.value.problems.length, 10)
        }

    } else {
        api.get('api/getquiz', {
            params: {
                sort: data.sortType,
                offset: data.value.problems.length,
                limit: 10,
                userId: data.value.userId
            }
        }).then(res => {
            let i = 0
            let length = res.data.quiz_list.length
            let cache = []
            if (data.value.sortType !== 'noanswer') {
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
                res.data.quiz_list.forEach(item => {
                    cache.push({
                        title: item.title,
                        sendTime: item.time.replace('T', ' ').split('.')[0],
                        keyWords: item.keyWords[0] === '' ? [] : item.keyWords,
                        username: item.username,
                        qid: item.qid
                    })
                })
                data.value.problems.concat(cache)
                data.value.showMoreLoading = false
                data.value.showMore = false
            }
        }).catch(() => {
            data.value.showMoreLoading = false
        })
    }
    callback(true)
}
</script>
<template>
    <div>
        <div class="page-header" :style="!data.changeHead ? '' : 'position: fixed;z-index: 2'">
            <div class="header-icon-box">
                <el-button :style="{opacity: data.type !== 'search-keywords' ? 1 : 0 }" size="default" text round @click="goBack">
                    <template #icon>
                        <el-icon>
                            <svg-icon name="ep:arrow-left" />
                        </el-icon>
                    </template>
                    返回
                </el-button>
                <header-search :search-data="data.searchData" @on-search="onSearch" />
                <div :style="{opacity: data.sortShow ? 1 : 0 }" class="header-icon" @click="data.sortOpen = !data.sortOpen">
                    <el-icon>
                        <svg-icon name="ep:filter" />
                    </el-icon>
                    <span>筛选</span>
                </div>
            </div>
            <div v-if="data.sortOpen" class="filter-box">
                <div>
                    <template v-for="(item, index) in data.sort" :key="index">
                        <div class="filter-content">
                            <template v-for="(it, i) in item" :key="i">
                                <el-button
                                    :type="data.sortCheck[index] === it ? 'primary' : 'default'"
                                    plain
                                    text
                                    :style="data.sortCheck[index] === it ? 'background-color: #E6F0FD; color: #056DE8': ''"
                                    @click="sortChange(it,index)"
                                >
                                    <span>{{ it }}</span>
                                </el-button>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <!--        <search-bar show-more unfold />-->
        <div v-loading="data.loading" style="display: flex;justify-content: center;" :style="!data.changeHead ? '': 'padding-top: 60px'">
            <page-main style="width: 60%">
                <div v-if="data.problems.length === 0" style="text-align: center;width: 100%">抱歉还没该结果テ_デ</div>
                <template v-for="(item, index) in data.problems" :key="index">
                    <div v-if="data.type === 'answer-issues'" class="answer-box">
                        <div class="content-box">
                            <div class="user">
                                <div class="avatar">
                                    <el-icon style="width: inherit;height: inherit">
                                        <svg-icon style="width: 100%;height: 100%" name="user-avatar" />
                                    </el-icon>
                                </div>
                                {{ item.username }}
                                <span class="extend">
                                    的提问 ·
                                    <span>{{ item.sendTime }}</span>
                                    ·  期待你的回答
                                </span>
                            </div>
                            <div class="title">
                                {{ item.title }}
                            </div>
                            <div class="foot-box">
                                <div v-for="(ite, i) in item.keyWords" :key="i">
                                    <span v-if="i !== item.keyWords.length -1 ">{{ ite }} ·&nbsp;</span>
                                    <span v-else> {{ ite }}</span>
                                </div>
                            </div>
                        </div>
                        <el-button type="primary" @click="handleWrite(item.qid)">
                            <el-icon style="margin-right: 5px">
                                <svg-icon name="ep:edit-pen" />
                            </el-icon>
                            写回答
                        </el-button>
                    </div>
                    <div v-else class="view-box">
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
                            @go-detail="enterNewPage(item.qid)"
                            @on-collection="onCollection(item.qid,index)"
                        />
                    </div>
                </template>
                <collaspe-page v-if="data.problems.length !== 0 && data.showMore" v-loading="data.showMoreLoading" @un-collaspe="showMore" />
            </page-main>
        </div>
    </div>
</template>
<style scoped lang="scss">
//scss
.page-header {
    width: 100%;
    transition: position 1s  ease-in;
    background-color: var(--g-app-bg);
    .header-icon-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        color: #909399;
        border-bottom: #f0f2f7 1px solid;
        .header-icon {
            display: flex;
            align-items: center;
            &:hover {
                cursor: pointer;
                color: #409EFF;
            }
        }
    }
    .filter-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px 0;
        .filter-content {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
    }
}
.answer-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content-box {
        padding: 5px 20px 20px 20px;
        border-bottom: #f0f2f7 1px solid;
        font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
        .user {
            font-size: 14px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .avatar {
                width: 25px;
                height: 25px;
                margin-right: 8px;
            }
            .extend {
                color: #909399;
                margin-left: 5px;
            }
        }
        .title {
            font-size: 15px;
            color: #121212;
        }
        .foot-box {
            margin-top: 10px;
            font-size: 15px;
            color: #909399;
            display: flex;
            align-items: center;
        }
    }
}
</style>
