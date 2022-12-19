<route>
{
    meta: {
        title: "搜索",
        constant: true,
        layout: false
    }
}
</route>

<script setup>
import $ from 'jquery'
import { onBeforeRouteLeave } from 'vue-router'
import api from '@/api'

import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()

const router = useRouter()
const data = ref({
    searchData: '', // 搜索框输入的内容
    searchResults: [], // 搜索返回的智能匹配
    resultsVisible: false,
    showOption: false,
    keyword: [],
    time: '',
    num: 10,
    searchTime: ''
})

onMounted(() => {
    getTime()
    let date = new Date()
    let hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    time.value = hour + ':' + minutes
    getType()
    $('#search-bar .search').focus()
    if (!settingsStore.topStatus) {
        settingsStore.toggleTopCollapse()
        // console.log(settingsStore.topStatus)
    }
})
onBeforeRouteLeave(() => {
    clearInterval(setTime.value)
    if (settingsStore.topStatus) {
        settingsStore.toggleTopCollapse()
    }
})
let time = ref()
const setTime = ref()
// 获取时间
function getTime() {
    setTime.value = setInterval(() =>  {
        let date = new Date()
        let hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
        let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
        time.value = hour + ':' + minutes
    }, 60000)
}
// 设置动画
function getType() {
    $('#search-bar .search').focus(() => {
        $('#search-bar').css({
            'background-color': 'rgba(255,255,255,1)'
        }).unbind('mouseenter').unbind('mouseleave')
        $('#search-bar .search').css({
            'width': '500px',
            'color': 'rgba(149, 153, 156, 0.91)'
        }).removeAttr('placeholder')
        $('#search-bar .search-icon-box').css({
            opacity: 1
        })
        $('.cover').css({
            'backdrop-filter': 'blur(13px)'
        })
    }).click(e => e.stopPropagation()).blur(() => {
        data.value.searchDate = ''
    })
    $(document).click(() => {
        data.value.resultsVisible = false
        data.value.searchResults = []
        $('#search-bar').css({
            'background-color': 'rgba(255,255,255,0.25)'
        }).hover(() => {
            $('#search-bar .search').css({
                'width': '500px',
                'color': 'rgba(149, 153, 156, 0.91)',
                'background-color': 'rgba(242,244,245,0.93)'
            })
        }, () => {
            $('#search-bar .search').css({
                'width': '200px',
                'color': 'inherit',
                'background-color': 'transparent'
            })
        })

        $('#search-bar .search').css({
            'width': '200px',
            'color': 'inherit',
            'background-color': 'transparent'
        }).attr('placeholder', '搜索')
        $('#search-bar .search-icon-box').css({
            opacity: 0
        })
        $('.cover').css({
            'backdrop-filter': 'blur(0)'
        })
    })
    $('#search-bar .search-icon-box .search-icon').hover(() => {
        $('.search-icon-box .search-icon path').attr({
            'fill': '#409EFF'
        })
    }, () => {
        $('.search-icon-box .search-icon path').attr({
            'fill': 'rgba(0, 0, 0, 0.75)'
        })
    })
}
// 搜索下拉框
function onChange(val) {
    // console.log('?' + val.target.value)
    api.get('/api/search', {
        params: {
            q: val.target.value,
            limit: 8
        }
    }).then(res => {
        let cacheData = []
        data.value.searchTime = res.data.search_time
        res.data.quiz_list.forEach(item => {
            cacheData.push({
                qid: item.qid,
                title: item.title
            })
        })
        if (cacheData.length > 0) {
            data.value.searchResults = JSON.parse(JSON.stringify(cacheData))
            data.value.resultsVisible = true
        } else {
            data.value.searchResults = [{ title: '暂时没有搜索结果.....' }]
            data.value.resultsVisible = true
        }
    }).catch(() => {
        data.value.searchResults = [{ title: '暂时没有搜索结果.....' }]
        data.value.resultsVisible = true
    })
}
// 搜索
function onSearch() {
    router.push({
        name: 'resultsInterface',
        params: {
            type: 'search-issues',
            keyword: data.value.searchData
        }
    })
}
// 选中
function onCheck(val) {
    router.push({
        name: 'detailProblem',
        params: {
            id: val.qid
        }
    })
}

// 提示
function goLogin() {
    ElMessageBox.confirm('请先登录', '未登录', {
        confirmButtonText: '去登录',
        cancelButtonText: '取消',
        type: 'info'
    }).then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: '/'
            }
        })
    }).catch(() => {})
}
// 显示高级显示的弹窗
function optionChoice() {
    data.value.showOption = true
}
const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        }
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        }
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        }
    }
]
onMounted(() => { console.log(userStore.isLogin) })

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
// 高级搜索
function highSearch() {
    let keywords = data.value.keyword.join(' ')
    // console.log(data.value.time)
    let startTime, endTime
    if (data.value.time) {
        startTime = format(data.value.time[0])
        endTime = format(data.value.time[1])
    }
    if (keywords) {
        let keyword
        if (keywords) {
            keyword = keywords + '|K'
        }
        if (data.value.time) {
            keyword += 'T' + startTime + 'E' + endTime
        }
        if (data.value.num) {
            keyword += '-l' +  data.value.num
        }
        // console.log(keyword)
        router.push({
            name: 'resultsInterface',
            params: {
                type: 'search-high',
                keyword: keyword
            }
        })
    } else {
        ElMessage.warning('请输入关键字')
    }

}
// 顶部操作
function showTop() {
    console.log(settingsStore.topStatus)
    settingsStore.toggleTopCollapse()
}
</script>

<template>
    <div>
        <div id="search-box">
            <div class="cover" />
            <div style="display: flex;justify-content: center;width: 100%">
                <el-icon v-if="settingsStore.topStatus" class="top-icon-box" @click="showTop">
                    <svg-icon name="ep:arrow-down" class="top-icon" />
                </el-icon>
                <el-icon v-else @click="showTop" class="top-icon-box">
                    <svg-icon name="ep:arrow-up" class="top-icon" />
                </el-icon>
            </div>
            <div class="search-content">
                <div class="time">{{ time }}</div>
                <div id="search-bar">
                    <input v-model="data.searchData" class="search" placeholder="搜索" type="text" @input="onChange" @keyup.enter="onSearch">
                    <div class="search-icon-box" @click="onSearch">
                        <svg class="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                            <path fill="rgba(0, 0, 0, 0.75)" d="M896 914.285714a17.188571 17.188571 0 0 1-12.8-5.485714l-204.8-204.8a17.92 17.92 0 1 1 25.6-25.6l204.8 204.8a17.554286 17.554286 0 0 1 0 25.6 17.188571 17.188571 0 0 1-12.8 5.485714z"></path>
                            <path fill="rgba(0, 0, 0, 0.75)" d="M457.142857 804.571429a347.428571 347.428571 0 1 1 347.428572-347.428572 347.794286 347.794286 0 0 1-347.428572 347.428572z m0-658.285715a310.857143 310.857143 0 1 0 310.857143 310.857143A311.222857 311.222857 0 0 0 457.142857 146.285714z"></path>
                        </svg>
                    </div>
                </div>
                <div v-if="data.resultsVisible" class="drop-down-box">
                    <div style="width: 500px;overflow: hidden;border-radius: 15px;">
                        <div style="display: flex;text-indent: 200px;font-size: small;color: black">
                            <span>搜索耗时：{{ data.searchTime }}</span>
                        </div>
                        <template v-for="(item, index) in data.searchResults" :key="index">
                            <div class="drop-content" @click="onCheck(item)">{{ item.title }}</div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="more-search">
                <el-popover placement="bottom" trigger="hover" width="20" popper-class="cover">
                    <template #reference>
                        <svg-icon name="ep:expand" :style="{'margin-right': userStore.isLogin ? '5px' : '0'}" @click="optionChoice" />
                    </template>
                    <span>高级搜索设置</span>
                </el-popover>
                <svg-icon v-if="!userStore.isLogin" name="ep:user" @click="goLogin" />
            </div>
        </div>
        <Copyright class="copyright" />
        <el-dialog
            v-model="data.showOption"
            draggable title="高级搜索"
            width="700px"
            append-to-body
            destroy-on-close
            custom-class="myDialog"
        >
            <div style="margin-bottom: 10px">搜索结果：</div>
            <div style="display: flex;justify-content: space-between;text-align: center">
                <el-input v-model="data.keyword[0]" placeholder="关键词">
                    <template #prepend>包含全部关键词</template>
                </el-input>
                <el-input v-model="data.keyword[1]" placeholder="关键词" style="margin-left: 10px">
                    <template #prepend>包含完整关键词</template>
                </el-input>
            </div>
            <div style="display: flex;justify-content: space-between;text-align: center;margin-top: 10px">
                <el-input v-model="data.keyword[2]" placeholder="关键词">
                    <template #prepend>包含全部关键词</template>
                </el-input>
                <el-input v-model="data.keyword[3]" placeholder="关键词" style="margin-left: 10px">
                    <template #prepend>包含完整关键词</template>
                </el-input>
            </div>
            <div class="block">
                起止时间：
                <el-date-picker
                    v-model="data.time"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :shortcuts="shortcuts"
                />
            </div>
            <div class="num-box">
                <span>一次搜索条数：</span>
                <el-input
                    v-model="data.num"
                    type="number"
                    max="999"
                    clearable
                    placeholder="数字"
                    class="choiceNum"
                    @input="() => {if (data.num.length > 3) data.num = data.num.slice (0,3)}"
                />
            </div>
            <div style="display: flex;justify-content: flex-end">
                <el-button type="primary" @click="highSearch">搜索</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss">
.el-popover.cover {
    border: none;
    color: #F5F7FA;
    background-color: rgba(0,0,0, 0.4);
    backdrop-filter: blur(5px);
    width: auto;
    min-width: 0;
    padding: 8px;
    text-align: center;
    .el-popper__arrow::before {
        background-color: rgba(0,0,0, 0.3);
    }
}
.myDialog {
    border-radius: 10px;
    margin-top: 150px;
    .el-dialog__header {
        border-bottom: #909399 0.5px Dashed;
    }
}
</style>

<style lang="scss" scoped>
//scss
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
#search-box {
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/background.jpg");
    background-size: cover;
    background-position: center center;
    font-family: "Microsoft Yahei Light","Microsoft Yahei","PingFang SC","Helvetica Neue",Helvetica,Tahoma,Arial,sans-serif;
    .cover {
        z-index: -1;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(rgba(0,0,0,0) 0, rgba(0, 0, 0, 0.4) 100%);
        transition: backdrop-filter 0.5s  ease;
    }
    .more-search {
        z-index: 6;
        position: absolute;
        top: 2%;
        right: 4%;
        display: flex;
        justify-content: space-between;
        color: rgb(255, 255, 255, 0.5);
        font-size: 25px;
    }
    .search-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 200px;
        height: auto;
        position: absolute;
        left: 43%;
        top: 15%;
        .time {
            color: azure;
            font-size: 45px;
            margin-bottom: 20px;
        }
        #search-bar {
            border-radius: 25px;
            border: none;
            outline: none;
            background-color: rgba(255,255,255,0.25);
            box-shadow: 0 0 10px rgba(0,0,0, 0.25);
            backdrop-filter: blur(5px);
            color: white;
            .search {
                width: 200px;
                padding: 10px;
                border-radius: 25px;
                font-size: 15px;
                color: inherit;
                text-align: center;
                border: none;
                outline: none;
                background-color: transparent;
                transition: width 0.5s ease,background-color 0.55s , color 0.35s ;
                &::placeholder {
                    color: inherit;
                }
            }
            &:hover .search {
                width: 500px;
                color: rgba(149, 153, 156, 0.91);
                background-color: rgba(219, 229, 237, 0.86);
            }
            .search-icon-box {
                opacity: 0;
                width: 25px;
                height: 25px;
                position: absolute;
                top: 20%;
                right: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                backdrop-filter: blur(5px);
                box-shadow: 0 0 5px rgba(255,255,255,0.8);
                cursor: pointer;
                transition: background-color 0.25s initial;
                .search-icon {
                    width: 25px;
                    height: 25px;
                }
            }
        }
        .drop-down-box {
            margin-top: 10px;
            background-color: rgba(232, 229, 229, 0.26);
            backdrop-filter: blur(13px);
            color: rgba(255,255,255,.8);
            border: none;
            border-radius: 15px;
            .drop-content {
                width: 500px;
                text-indent: 12px;
                padding: 8px;
                font-size: small;
                overflow: hidden;
                transition: text-indent 0.25s ease;
                &:hover {
                    cursor: pointer;
                    background-color: rgba(232, 229, 229, 0.42);
                    text-indent: 20px;
                }
            }
        }
    }
}
.block {
    padding: 10px 0;
}
.num-box {
    display:flex;
    align-items: center;
    .choiceNum {
        width: 100px;
        :deep(.el-input__wrapper) {
            :deep(.el-input__inner) {
                text-align: center;
            }
        }
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
