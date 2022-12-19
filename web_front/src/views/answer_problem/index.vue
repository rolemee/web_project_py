<script setup name="AnswerProblem">

import api from '@/api'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

const route = useRoute(), router = useRouter()

const data = ref({
    qid: route.params.problemId, // 问题id
    title: '',
    loading: false,
    setting: {
        toolbar: 'undo redo | insertdatetime searchreplace | preview'
    },
    ext: ['jpg', 'png', 'jpeg', 'tif'],
    content: '',
    hasStar: false
})
onMounted(() => {
    data.value.loading = true
    api.get('api/quizinfo', {
        params: {
            qid: data.value.qid,
            userId: userStore.account ? userStore.account : ''
        }
    }).then(res => {
        data.value.title = res.data.quiz_list[0].title
        data.value.hasStar = res.data.quiz_list[0].is_star
        data.value.loading = false
    }).catch(() => { data.value.loading = false })
})

// 提问
function putQuestion() {
    if (data.value.userId !== '') {
        router.push({
            name: 'putQuestion'
        })
    }
}
// 内容
function editorContent(txt) {
    let re = new RegExp('<.+?>', 'g')
    data.value.content = txt.replace(re, '')
}

// 提交
function onAnswer() {
    if (userStore.isLogin) {
        api.post('/api/postanswer', {
            content: data.value.content,
            qid: data.value.qid
        }).then(() => {
            ElMessage.success('回答提交成功')
            router.push({
                name: 'detailProblem',
                params: {
                    id: data.value.qid
                }
            })
        })
    } else {
        ElMessage.error('当前未登录!!请先登录')
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
</script>

<template>
    <div v-loading="data.loading">
        <div class="page-head">
            <div class="title-box" style="padding-left: 0">
                <div class="title">{{ data.title }}</div>
            </div>
            <div class="button-box">
                <el-button type="primary" @click="handleStart">
                    <el-icon style="margin-right: 5px;font-size: large;" :style="data.hasStar? 'color:red' : ''">
                        <svg-icon name="ep:star-filled" />
                    </el-icon>
                    关注问题
                </el-button>
                <el-button @click="putQuestion">
                    <el-icon style="margin-right: 5px">
                        <svg-icon name="ep:info-filled" />
                    </el-icon>
                    提出问题
                </el-button>
            </div>
        </div>
        <page-main>
            <Editor :setting="data.setting" @update:model-value="editorContent" />
            <div class="foot-button">
                <el-button type="primary" plain @click="onAnswer">提交</el-button>
            </div>
        </page-main>
    </div>
</template>

<style scoped lang="scss">
//scss
.page-head {
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    background-color: var(--g-app-bg);
    padding: 16px 20px;
    transition: position 1s  ease;
}
.title-box {
    display: flex;
    padding-left: 18%;
    margin-top: 10px;
    .title {
        font-size: 22px;
        font-weight: bold;
    }
}
.button-box {
    display: flex;
    padding-left: 10%;
    margin-top: 10px;
}
.foot-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
}
</style>
