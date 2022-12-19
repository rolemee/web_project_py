<script setup name="FindPage">
import api from '@/api'

const data = ref({
    backColor: ['red', '#ff4502', '#FF8102', '#E7AF6F', '#C4C4C4'],
    hotProblems: [],
    noAnswerProblems: [],
    newProblems: [],
    loading: false
})

const imgUrl = new URL('../../assets/images/find-now-background.jpg', import.meta.url).href

function setBackColor(item) {
    return { 'background-color': data.value.backColor[item] }
}

const router = useRouter()
// 查看近期热门问题
function getMoreProblem() {
    console.log('/')
    router.push({
        name: 'moduleInterface',
        params: {
            type: 'hot-issues'
        }
    })
}
// 去回答更多未回答问题
function getMoreNoAnswer() {
    router.push({
        name: 'moduleInterface',
        params: {
            type: 'answer-issues'
        }
    })
    console.log('.')
}
// 查看更多最新问题
function getMoreNewProblem() {
    router.push({
        name: 'moduleInterface',
        params: {
            type: 'new-issues'
        }
    })
    console.log(';')
}
// 跳转到具体问题
function enterDetailPage(qid) {
    router.push({
        name: 'detailProblem',
        params: {
            id: qid
        }
    })
}
// 跳转到回答界面
function enterAnswerPage(qid) {
    router.push({
        name: 'answerQuestion',
        params: {
            problemId: qid
        }
    })
}
onMounted(() => {
    data.value.loading = true
    getHot().then(() => data.value.loading = false)
    getNoAnswer()
    getNew()
})
// 获取热门问题
function getHot() {
    return new Promise(resolve => {
        api.get('api/getquiz', {
            params: {
                sort: 'popular',
                limit: 5
            }
        }).then(res => {
            let i = 0
            let length = res.data.quiz_list.length
            res.data.quiz_list.forEach(item => {
                api.get('api/popularanswer', {
                    params: {
                        qid: item.qid
                    }
                }).then(answer => {
                    ++i
                    data.value.hotProblems.push({
                        title: item.title,
                        qid: item.qid,
                        agreeNum: answer.data.quiz_list[0].like,
                        ansNum: item.ans_num
                    })
                    if (i === length) {
                        // data.value.hotProblems.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        resolve()
                    }
                }).catch(() => {
                    ++i
                    if (i === length) {
                        // data.value.hotProblems.sort((a, b) => { return b.agreeNum - a.agreeNum })
                        resolve()
                    }
                })
            })
        })
    })

}
// 获取未回答的问题
function getNoAnswer() {
    return new Promise(resolve => {
        api.get('api/getquiz', {
            params: {
                sort: 'noanswer',
                limit: 5
            }
        }).then(res => {
            res.data.quiz_list.forEach(item => {
                data.value.noAnswerProblems.push({
                    title: item.title,
                    sendTime: item.time.replace('T', ' ').split('.')[0],
                    keyWords: item.keyWords[0] === '' ? [] : item.keyWords,
                    username: item.username,
                    qid: item.qid
                })
            })
            resolve()
        })
    })
}
// 获取最近的问题
function getNew() {
    return new Promise(resolve => {
        api.get('api/getquiz', {
            params: {
                sort: 'haveanswer',
                limit: 5
            }
        }).then(res => {
            res.data.quiz_list.forEach(item => {
                data.value.newProblems.push({
                    time: item.time.split('T')[0].split('-')[1] + '-' + item.time.split('T')[0].split('-')[2],
                    title: item.title,
                    answerNum: item.ans_num,
                    keyWords: item.keyWords[0] === '' ? [] : item.keyWords,
                    qid: item.qid
                })
            })
            resolve()
        })
    })
}
</script>

<template>
    <div v-loading="data.loading">
        <div class="find-main-box">
            <div class="find-main">
                <div class="title-box">
                    <el-icon class="icon-box">
                        <svg-icon class="icon" name="problem" />
                    </el-icon>
                    <span class="title">热门问题</span>
                </div>
                <div class="content-box">
                    <el-card class="card-box">
                        <template #header>
                            <span class="card-head">热门排名</span>
                        </template>
                        <template v-for="(item, index) in data.hotProblems" :key="index">
                            <div class="card-body">
                                <div class="content">
                                    <button class="rank" :style="setBackColor(index)">{{ index + 1 }}</button>
                                    <span class="title" @click="enterDetailPage(item.qid)">{{ item.title }}</span>
                                    <div class="add-info">
                                        <el-row :gutter="1">
                                            <el-col :sm="4" :md="3" :lg="3" :xl="2"><span>{{ item.agreeNum }}点赞</span></el-col>
                                            <el-col :sm="4" :md="3" :lg="3" :xl="2"><span>{{ item.ansNum }}评论</span></el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-card>
                </div>
                <div class="fit-box">
                    <el-button round size="large" class="fit-button" @click="getMoreProblem">查看更多热门问题 ></el-button>
                </div>
            </div>
        </div>
        <div class="find-main-box">
            <div class="find-main">
                <div class="title-box">
                    <el-icon class="icon-box">
                        <svg-icon class="icon" name="ep:document-copy" />
                    </el-icon>
                    <span class="title">近期讨论</span>
                </div>
                <div class="content-box">
                    <el-card class="card-box">
                        <template #header>
                            <div style="height: 300px; overflow: hidden">
                                <div style="width: 100%;height: 100%;border-top-left-radius: 8px;border-top-right-radius: 8px;overflow: hidden">
                                    <el-image :src="imgUrl" fit="cover" />
                                </div>
                            </div>
                            <div style="margin-top: 10px">
                                <span class="card-head">近期讨论</span>
                            </div>
                        </template>
                        <template v-for="(item, index) in data.newProblems" :key="index">
                            <div class="card-body">
                                <div class="content">
                                    <button class="rank" style="width: auto;background-color: rgba(144,147,153,0.67);">
                                        {{ item.time }}
                                    </button>
                                    <span class="title" @click="enterDetailPage(item.qid)">{{ item.title }}</span>
                                    <div v-if="item.keyWords.length > 0" class="add-info">
                                        <el-row :gutter="1">
                                            <el-col :sm="4" :md="3" :lg="3" :xl="2"><span>标签：</span></el-col>
                                            <template v-for="(ite, i) in item.keyWords" :key="i">
                                                <el-col :sm="4" :md="3" :lg="3" :xl="2"><span>{{ ite }}</span></el-col>
                                            </template>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-card>
                </div>
                <div class="fit-box">
                    <el-button round size="large" class="fit-button" @click="getMoreNewProblem">查看更多讨论 ></el-button>
                </div>
            </div>
        </div>
        <div class="find-main-box">
            <div class="find-main">
                <div class="title-box">
                    <el-icon class="icon-box">
                        <svg-icon class="icon" name="ep:compass" />
                    </el-icon>
                    <span class="title">等你回答</span>
                </div>
                <div class="content-box">
                    <el-card class="card-box">
                        <template #header>
                            <span class="card-head">等你回答</span>
                        </template>
                        <div class="card-body">
                            <div class="content">
                                <el-timeline style="padding: 0">
                                    <template v-for="(item, index) in data.noAnswerProblems" :key="index">
                                        <el-timeline-item :timestamp="item.sendTime" placement="top" class="timeline-box" @click="enterAnswerPage(item.qid)">
                                            <el-row>
                                                <li class="timeline-title">{{ item.title }}</li>
                                                <div v-if="item.keyWords.length > 0">
                                                    <template v-for="(it, i) in item.keyWords" :key="i">
                                                        <el-button plain style="width:auto;height:20px;margin-left:10px;">
                                                            {{ it }}
                                                        </el-button>
                                                    </template>
                                                </div>
                                            </el-row>
                                            <p>
                                                <svg-icon class="icon" width="20px" height="20px" name="crayon" />
                                                {{ item.username }}
                                            </p>
                                        </el-timeline-item>
                                    </template>
                                </el-timeline>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="fit-box">
                    <el-button round size="large" class="fit-button" @click="getMoreNoAnswer">去回答更多问题 ></el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
//scss
.timeline-box:hover {
    .timeline-title {
        color: #409EFF;
    }
    :deep(.el-timeline-item__node){
        background-color: #409EFF;
    }
}

.find-main-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .find-main {
        margin-left: 20%;
        margin-top: 20px;
        width: 70%;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        .title-box {
            display: flex;
            align-items: center;
            font-size: 25px;
            font-weight: bold;
            .icon-box {
                width: 40px;
                height: 40px;
                .icon {
                    color: #409EFF;
                    width: inherit;
                    height: inherit;
                }
            }
            .title {
                text-indent: 15px;
            }
        }
        .content-box {
            margin-top: 20px;
            width: inherit;
            .card-head {
                font-size: 20px;
                font-weight: bold;
            }
            .card-body {
                .content {
                    user-select: none;
                    .rank {
                        width: 15px;
                        height: 15px;
                        text-align: center;
                        padding: 0;
                        margin-right: 5px;
                        border: none;
                        border-radius: 3px;
                        color: white;
                        Pointer-events: none;
                    }
                    .title {
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .add-info {
                        margin-top: 5px;
                        margin-left: 20px;
                        font-size: 10px;
                        color: #909399;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .fit-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: inherit;
            margin-top: 20px;
            .fit-button {
                color: #909399;
            }
        }
    }
}
</style>
