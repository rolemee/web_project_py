<script setup name="PutQuestion">

import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import useUserStore from '@/store/modules/user'
import api from '@/api'
const userStore = useUserStore()

const router = useRouter()

const data = ref({
    labelData: '',
    title: '',
    ext: ['jpg', 'png', 'jpeg', 'tif'],
    content: '',
    images: ''
})
const tipShow = ref(true)
// 标签提示
function onInputLabel() {
    if (tipShow.value) {
        ElMessageBox.confirm(
            '标签输入的格式为<span style="color:red;font-size: large">每个标签之间以空格分离</span><div style="color: #909399">合适标签可以提高回答的专业率<br>让你的问题被更多人看到</div>',
            '提示',
            {
                type: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                dangerouslyUseHTMLString: true
            }
        ).catch(() => { tipShow.value = false })
        tipShow.value = false
    }
}
// 内容
function editorContent(txt) {
    console.log('/' + txt)
    let msg
    txt = txt.replace(new RegExp('<p>', 'g'), '').replace(new RegExp('</p>', 'g'), '')
    let imRe = new RegExp('img')
    if (imRe.test(txt)) {
        txt = txt.replace(new RegExp('image/', 'g'), `${import.meta.env.VITE_APP_API_BASEURL}image/`)
        let r = new RegExp('/', 'g')
        msg = txt.replace(r, '\\\\/').replace(/"/g, '\\\\x22')
    } else {
        let re = new RegExp('<.+?>', 'g')
        msg = txt.replace(re, '')
    }
    data.value.content = msg
    console.log(data.value.content)
}
// 上传图片
function beforeUpload(file) {
    return new Promise((resolve, reject) => {
        // console.log(file())
        // console.log(file().split('.'))
        const fileName = file().split('.')
        const fileExt = fileName[fileName.length - 1]
        const isTypeOk = data.value.ext.indexOf(fileExt) !== -1
        if (!isTypeOk) {
            ElMessage.error(`图片上传只支持${ data.value.ext.join('/') }格式`)
            reject()
        } else  resolve()
    })
}
// 图片上传
function uploadImage(info, callback) {
    if (userStore.isLogin) {
        beforeUpload(info.filename).then(() => {
            let imageData = new FormData()
            imageData.append('file', info.blob(), info.filename())
            axios({
                baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
                url: '/api/uploadfile',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + userStore.token
                },
                data: imageData
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code === 200) {
                        let imageUrl = import.meta.env.VITE_APP_API_BASEURL + res.data.data.imageurl.replace('/', '')
                        callback({
                            imageUrl: imageUrl,
                            status: 200
                        })
                    } else {
                        if (res.data.message === '未检测到token') {
                            ElMessage.error('登录信息已过期, 请重新登录')
                        } else
                            ElMessage.error(res.data.message)
                    }
                }
            }).catch(err => {
                console.log(err)
                callback({
                    status: 404
                })
            })
        })
    } else {
        ElMessage.error('当前未登录!!请先登录')
        callback({
            status: 404
        })
    }

}
// 提问
function onRequest() {
    if (userStore.isLogin) {
        if (data.value.title && data.value.labelData) {
            let re = new RegExp(' ', 'g')
            data.value.labelData = data.value.labelData.trim().replace(re, ',')
            api.post('/api/postquiz', {
                title: data.value.title,
                content: data.value.content ? data.value.content : ' ',
                keywords: data.value.labelData
            }).then(res => {
                ElMessage.success('提问提交成功')
                router.push({
                    name: 'detailProblem',
                    params: {
                        id: res.data.qid
                    }
                })
            })
        } else {
            if (data.value.title) {
                ElMessage.success('提问时关键字不能为空,输入关键字可以得到更精准的回答哦')
            } else {
                ElMessage.success('提问时标题不能为空')
            }
        }
    } else {
        ElMessage.error('当前未登录!!请先登录')
    }
}
</script>

<template>
    <div>
        <page-main>
            <div class="title">
                描述您的问题
            </div>
            <div>
                <i style="color: red;font-size: 15px;margin-right: 5px">*</i>
                <span style="font-weight:bold;font-size: 16px;">问题描述</span>
                <span style="font-size: 12px;color: #8a8f97">（必填）</span>
                <el-input v-model="data.title" clearable class="input-title" placeholder="一句话描述你的问题" />
            </div>
            <div style="margin-left: 10px;">
                <span style="font-weight:bold;font-size: 14px;color: #8a8f97">问题补充说明:</span>
                <Editor style="margin: 10px;" @update:model-value="editorContent" @upload-image="uploadImage" />
            </div>
            <div style="margin-left: 10px;">
                <i style="color: red;font-size: 15px;margin-right: 5px">*</i>
                <span style="font-weight:bold;font-size: 16px;">问题标签</span>
                <el-input v-model="data.labelData" clearable class="input-title" placeholder="输入标签 每个标签以空格隔开" @focus="onInputLabel"/>
            </div>
            <div class="foot-button">
                <el-button type="primary" plain @click="onRequest">提交</el-button>
            </div>
        </page-main>
    </div>
</template>

<style scoped lang="scss">
//scss
.title {
    font-weight: bold;
    font-size:20px;
    text-align:center;
}
.input-title {
    padding: 20px;
}
.foot-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
}
</style>
