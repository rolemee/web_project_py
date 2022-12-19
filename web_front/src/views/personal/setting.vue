<route>
{
    meta: {
        title: "个人设置",
        cache: "personal-edit.password"
    }
}
</route>

<script setup name="PersonalSetting">
import api from '@/api'

const router = useRouter()

const form = ref({
    headimg: '',
    name: ''
})
function onKeep() {
    api.post('/api/edituserid', {
        newuserid: form.value.name
    }).then(() => {
        ElMessage.success('修改信息成功! 请重新登录')
        userStore.logout().then(() => {
            router.push({
                name: 'login',
                query: {
                    redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
                }
            })
        })
    })
}
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import axios from 'axios'
// import { storage } from '@vitejs/plugin-vue'
const userStore = useUserStore()

const data = ref({
    myQueries: [],
    myAnswers: [],
    myConcerns: [],
    myAnswerShow: false, // 我的回答是否展示
    myQueryShow: false, // 我的提问是否展示
    myConcernsShow: false, // 我的收藏是否展示
    upload: {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + userStore.token
        },
        data: {
            type: 'avatar'
        },
        url: import.meta.env.VITE_APP_API_BASEURL
    },
    avatar: userStore.userAvatar ? userStore.userAvatar : ''
})

function handleSuccess(res) {
    data.value.avatar = res
    // storage.local.set('userAvatar', res)
    userStore.userAvatar = res
    data.value.avatar = userStore.userAvatar
    ElMessage.success('头像上传成功')
}
// 修改密码
function editPassword() {
    router.push({
        name: 'personalEditPassword'
    })
}
// 修改邮箱
function editEmail() {
    router.push({
        name: 'personalEditEmail'
    })
}
// 跳转到具体页面
function myQuery(qid) {
    console.log(qid)
    router.push({
        name: 'detailProblem',
        params: {
            id: qid
        }
    })
}
// 获取我的回答
function getMyAnswer() {
    data.value.myAnswers = []
    data.value.myAnswerShow = true
    api.get('/api/getuserinfo', {
        params: {
            sort: 'answer'
        }
    }).then(res => {
        // console.log(res.data.quiz_list.length)
        if (res.data.quiz_list.length !== 0) {
            res.data.quiz_list.forEach(item => {
                api.get('api/quizinfo', {
                    params: {
                        qid: item.qid
                    }
                }).then(re => {
                    data.value.myAnswers.push({
                        title: re.data.quiz_list[0].title,
                        qid: item.qid,
                        aid: item.id,
                        username: item.username,
                        ansNum: re.data.quiz_list[0].ans_num,
                        agreeNum: item.like,
                        sendTime: item.time.split('T')[0],
                        detailShow: false,
                        detailInfo: item.content.replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n'),
                        briefDetail: item.content.substring(0, 100).replace(eval('/' + '\\\\' + '/g'), '\\').replace(/(。|！|？)/g, '$1\n') + '....'
                    })
                    data.value.myAnswerShow = false
                }).catch(() => data.value.myAnswerShow = false)
            })
        } else {
            data.value.myAnswerShow = false
        }
    }).catch(() => data.value.myAnswerShow = false)
}
// 删除我的回答
function answerDel(aid) {
    api.post('/api/delanswer', {
        aid: aid
    }).then(res => {
        ElMessage.success(res.message)
        getMyAnswer()
    })
}
// 获取我的提问
function getMyQuery() {
    data.value.myQueries = []
    data.value.myQueryShow = true
    api.get('/api/getuserinfo', {
        params: {
            sort: 'quiz'
        }
    }).then(res => {
        res.data.quiz_list.forEach(item => {
            data.value.myQueries.push({
                qid: item.qid,
                title: item.title,
                keywords: item.keyWords.join('-'),
                ansNum: item.ans_num,
                sendTime: item.time.replace('T', ' ').split('.')[0]
            })
        })
        data.value.myQueryShow = false
    }).catch(() => data.value.myQueryShow = false)
}
// 删除我的提问
function proDel(qid) {
    api.post('/api/delquiz', {
        qid: qid
    }).then(res => {
        ElMessage.success(res.message)
        getMyQuery()
    })
}
// 获取我关注的问题
function getMyConcerns() {
    data.value.myConcerns = []
    data.value.myConcernsShow = true
    api.get('/api/getuserinfo', {
        params: {
            sort: 'starquiz'
        }
    }).then(res => {
        res.data.quiz_list.forEach(item => {
            data.value.myConcerns.push({
                qid: item.qid,
                title: item.title,
                keywords: item.keyWords.join('-'),
                ansNum: item.ans_num,
                sendTime: item.time.replace('T', ' ').split('.')[0]
            })
        })
        data.value.myConcernsShow = false
    }).catch(() => data.value.myConcernsShow = false)
}
// 删除关注
function starDel(qid) {
    api.get('/api/removestar', {
        params: {
            qid: qid
        }
    }).then(res => {
        ElMessage.success(res.message)
        getMyConcerns()
    })
}
onMounted(() => {
    if (userStore.isLogin) {
        api.get('/api/selfinfo').then(res => {
            form.value.name = res.data.info.userId
        })
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
})
function tabClick(tbs) {
    // console.log(tbs.props.name)
    if (userStore.isLogin) {
        if (tbs.props.name === 'myAnswer') {
            getMyAnswer()
        }
        if (tbs.props.name === 'myQuery') {
            getMyQuery()
        }
        if (tbs.props.name === 'myConcerns') {
            getMyConcerns()
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }

}
function onRequest(params) {
    if (userStore.isLogin) {
        let imageData = new FormData()
        imageData.append('file', params.file)
        axios({
            baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
            url: '/api/uploadfile?type=avatar',
            method: 'post',
            headers: data.value.upload.headers,
            data: imageData
        }).then(res => {
            if (res.status === 200) {
                if (res.data.code === 200) {
                    let imageUrl = import.meta.env.VITE_APP_API_BASEURL + res.data.data.imageurl.replace('/', '')
                    params.onSuccess(imageUrl)
                } else {
                    if (res.data.message === '未检测到token') {
                        ElMessage.error('登录信息已过期, 请重新登录')
                    } else
                        ElMessage.error(res.data.message)
                }
            }
        }).catch(err => {
            console.log(err)
        })
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}
</script>

<template>
    <div>
        <page-main>
            <el-tabs tab-position="left" style="height: 600px;" @tab-click="tabClick">
                <el-tab-pane label="基本设置" class="basic">
                    <h2>基本设置</h2>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form ref="formRef" :model="form" label-width="120px" label-suffix="：">
                                <el-form-item label="名 称">
                                    <el-input v-model="form.name" placeholder="请输入你的名称" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onKeep">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <image-upload
                                v-model:url="data.avatar"
                                :action="data.upload.url"
                                name="file"
                                :headers="data.upload.headers"
                                :data="data.upload.data"
                                notip
                                class="headimg-upload"
                                @on-success="handleSuccess"
                                @on-request="onRequest"
                            />
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="我的回答" name="myAnswer">
                    <div v-loading="data.myAnswerShow">
                        <el-scrollbar height="600px">
                            <template v-for="(item, index) in data.myAnswers" :key="index">
                                <div class="answer-box">
                                    <div class="content-box">
                                        <div style="display: flex;justify-content: space-between;align-items: center">
                                            <div class="title" @click="myQuery(item.qid)">
                                                {{ item.title }}
                                            </div>
                                            <div v-if="item.detailShow" class="icon-box" @click="item.detailShow = !item.detailShow">
                                                <el-icon class="icon">
                                                    <svg-icon name="ep:caret-top" />
                                                </el-icon>
                                                <span style="font-size: 15px">收起</span>
                                            </div>
                                        </div>
                                        <div class="content" @click="item.detailShow = true">
                                            <div v-if="!item.detailShow" class="detail">
                                                {{ item.briefDetail }}
                                            </div>
                                            <detail-page
                                                v-if="item.detailShow"
                                                :user-name="item.userName"
                                                :agree-number="item.agreeNumber"
                                                :detail-info="item.detailInfo"
                                                :send-time="item.sendTime"
                                                :show-avatar="false"
                                                user-name-size="15px"
                                            />
                                            <div v-else class="tail">
                                                <span>阅读全文</span>
                                                <el-icon>
                                                    <svg-icon name="ep:arrow-down" />
                                                </el-icon>
                                            </div>
                                        </div>
                                        <div class="foot-box">
                                            <span>
                                                {{ item.ansNum }}回答 · {{ item.agreeNum }}点赞 · {{ item.sendTime }}
                                            </span>
                                            <el-button type="danger" size="small" style="margin-left: 10px" text @click="answerDel(item.aid)">删除</el-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的提问" name="myQuery">
                    <div v-loading="data.myQueryShow">
                        <el-scrollbar height="600px">
                            <template v-for="(item, index) in data.myQueries" :key="index">
                                <div class="answer-box">
                                    <div class="content-box">
                                        <div class="title" @click="myQuery(item.qid)">
                                            {{ item.title }}
                                        </div>
                                        <div class="foot-box">
                                            <span>
                                                {{ item.ansNum }}回答 · {{ item.sendTime }} · 关键字: {{ item.keywords }}
                                            </span>
                                            <el-button type="danger" size="small" style="margin-left: 10px" text @click="proDel(item.qid)">删除</el-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我关注的问题" name="myConcerns">
                    <div v-loading="data.myConcernsShow">
                        <el-scrollbar height="600px">
                            <template v-for="(item, index) in data.myConcerns" :key="index">
                                <div class="answer-box">
                                    <div class="content-box">
                                        <div class="title" @click="myQuery(item.qid)">
                                            {{ item.title }}
                                        </div>
                                        <div class="foot-box">
                                            <span>
                                                {{ item.ansNum }}回答 · {{ item.sendTime }} · 关键字: {{ item.keywords }}
                                            </span>
                                            <el-button type="danger" size="small" style="margin-left: 10px" text @click="starDel(item.qid)">删除</el-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="安全设置" class="security">
                    <h2>安全设置</h2>
                    <div class="setting-list">
                        <div class="item">
                            <div class="content">
                                <div class="title">账户密码</div>
                            </div>
                            <div class="action">
                                <el-button text @click="editPassword">修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">修改邮箱</div>
                            </div>
                            <div class="action">
                                <el-button text @click="editEmail">绑定</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
    .el-tabs__header .el-tabs__nav {
        .el-tabs__active-bar {
            z-index: 0;
            width: 100%;
            background-color: var(--el-color-primary-light-9);
            border-right: 2px solid var(--el-color-primary);
            transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
        }
        .el-tabs__item {
            text-align: left;
            padding-right: 100px;
        }
    }
    .el-tab-pane {
        padding: 0 20px 0 30px;
    }
}
h2 {
    margin: 0;
    margin-bottom: 30px;
    font-weight: normal;
}
.basic {
    :deep(.headimg-upload) {
        text-align: center;
        .el-upload-dragger {
            border-radius: 50%;
        }
    }
}
.security {
    .setting-list {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--el-border-color-lighter);
            transition: var(--el-transition-border);
            .content {
                .title {
                    margin-bottom: 5px;
                    color: var(--el-text-color-primary);
                    transition: var(--el-transition-color);
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
.answer-box {
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
    .content-box {
        padding: 5px 20px 20px 20px;
        border-bottom: #f0f2f7 1px solid;
        font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
        .title {
            font-size: 15px;
            font-weight: bold;
            color: #121212;
        }
        .foot-box {
            margin-top: 10px;
            font-size: 15px;
            color: #909399;
        }
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
