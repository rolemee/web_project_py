<route>
{
    name: 'dashboard',
    meta: {
        title: "控制台"
    }
}
</route>
<script setup name="dashboard">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { onBeforeRouteLeave } from 'vue-router'
import dayjs from 'dayjs'
import api from '@/api'
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const router = useRouter()

const logShow = ref()
const data = ref({
    loading: false,
    // 列表数据
    dataList: []
})
function tohome() {
    if (userStore.permissions[0] === 0)
        router.push({
            name: 'homePageList'
        })
}
onMounted(async() => {
    if (!settingsStore.topStatus) {
        settingsStore.toggleTopCollapse()
    }
    logShow.value = (await userStore.getPermissions())[0] !== 0
    if (logShow.value) {
        getLogList()
        settingsStore.toggleTopCollapse()
    }
})
onBeforeRouteLeave(() => {
    if (settingsStore.topStatus) {
        settingsStore.toggleTopCollapse()
    }
})
// 顶部操作
function showTop() {
    settingsStore.toggleTopCollapse()
}
// 获取日志
function getLogList() {
    data.value.loading = true
    api.get('/api/log', {
        params: {
            offset: 0,
            limit: 10,
            userId: userStore.account
        }
    }).then(res => {
        data.value.dataList = []
        console.log(res.data.quiz_list)
        res.data.quiz_list.forEach((item, index) => {
            let cache = {
                'id': index + 1,
                'logDate': item.log_date.replace('T', ' ').split('.')[0],
                'logName': item.userId,
                'logInfo': item.operation
            }
            data.value.dataList.push(cache)
        })
    }).catch(() => {
        data.value.dataList = []
    })
    data.value.loading = false
}
</script>
<template>
    <div>
        <div v-if="!logShow" class="backgroundImg">
            <div style="display: flex;justify-content: center;width: 100%">
                <el-icon v-if="settingsStore.topStatus" class="top-icon-box" @click="showTop">
                    <svg-icon name="ep:arrow-down" class="top-icon" />
                </el-icon>
                <el-icon v-else class="top-icon-box" @click="showTop">
                    <svg-icon name="ep:arrow-up" class="top-icon" />
                </el-icon>
            </div>
            <button class="button" @click="tohome">
                <span class="enter"> Enter  →</span>
            </button>
        </div>
        <div v-else style="margin: 10px 20px">
            <el-table ref="table" v-loading="data.loading" class="list-table" :data="data.dataList" border stripe highlight-current-row>
                <el-table-column prop="id" label="日志编号" width="150" align="center" />
                <el-table-column
                    prop="logDate"
                    label="日志日期"
                    width="200"
                    align="center"
                />
                <el-table-column
                    prop="logInfo"
                    label="日志信息"
                    align="center"
                />
                <el-table-column
                    prop="logName"
                    label="用户名"
                    width="200"
                    align="center"
                    sortable
                />
            </el-table>
        </div>
        <Copyright class="copyright" :style="{color: logShow ? 'var(--el-text-color-secondary)': ''}" />
    </div>
</template>

<style lang="scss" scoped>
.top-icon-box {
    position: absolute;
    top: 10px;
    font-size: 50px;
    text-align: center;
    color: rgb(255, 255, 255, 0.5);
    .top-icon:hover {
        cursor: pointer;
    }
}
.backgroundImg {
    position: absolute;
    z-index: 0;
    background-image: url("@/assets/images/dashBack.png");
    background-size: cover;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    .button{
        position: absolute;
        top: 10%;
        left: 10%;
        width: 200px;
        height: 60px;
        border-radius: 100px;
        background: linear-gradient(270deg, #E54A46 1%, #E54A46 5%, #D64846 14%, #AD4245 33%, #6C3843 60%, #122B41 94%, #052941 98%);
    }
    .enter{
        font-size: 28px;
        font-weight: bold;
        line-height: 50px;
        letter-spacing: 0;
        color: #F8F1F1;
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    color: rgba(255, 255, 255, 0.71);
}
</style>
