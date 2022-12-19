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

import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const data = ref({
    searchDate: '', // 搜索框输入的内容
    searchResults: ['aaaa','ffff','gggg'], // 搜索返回的智能匹配
    resultsVisible: false,
    showOption: false
})

onMounted(() => {
    getTime()
    let date = new Date()
    let hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
    let minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
    time.value = hour + ':' + minutes
    getType()
    $('#search-bar .search').focus()
})
onBeforeRouteLeave(() => {
    clearInterval(setTime.value)
})
let time = ref()
const setTime = ref()
// 获取时间
function getTime() {
    setTime.value = setInterval(() =>  {
        let date = new Date()
        let hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
        let minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
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
// 搜索
function onChange(val) {
    console.log('?' + val.target.value)
    // 下拉框事件
    data.value.resultsVisible = true
}
// 选中
function onCheck(val) {
    console.log(val.target.innerText)
    console.log('?')
}
// 失去焦点
function onBlur() {
    data.value.resultsVisible = false
    data.value.searchResults = []
}

// 提示
const router = useRouter()
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

import { ref } from 'vue'

const value1 = ref('')
const input = ref('10')

const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]
</script>

<template>
    <div>
        <div id="search-box">
            <div class="cover" />
            <div class="search-content">
                <div class="time">{{ time }}</div>
                <div id="search-bar">
                    <input v-model="data.searchDate" class="search" placeholder="搜索" type="text" @input="onChange" @blur="onBlur">
                    <div class="search-icon-box">
                        <svg class="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1062" width="200" height="200">
                            <path fill="rgba(0, 0, 0, 0.75)" d="M896 914.285714a17.188571 17.188571 0 0 1-12.8-5.485714l-204.8-204.8a17.92 17.92 0 1 1 25.6-25.6l204.8 204.8a17.554286 17.554286 0 0 1 0 25.6 17.188571 17.188571 0 0 1-12.8 5.485714z"></path>
                            <path fill="rgba(0, 0, 0, 0.75)" d="M457.142857 804.571429a347.428571 347.428571 0 1 1 347.428572-347.428572 347.794286 347.794286 0 0 1-347.428572 347.428572z m0-658.285715a310.857143 310.857143 0 1 0 310.857143 310.857143A311.222857 311.222857 0 0 0 457.142857 146.285714z"></path>
                        </svg>
                    </div>
                </div>
                <div v-if="data.resultsVisible" class="drop-down-box">
                    <div style="width: 500px;overflow: hidden;border-radius: 15px;">
                        <template v-for="(item, index) in data.searchResults" :key="index">
                            <div class="drop-content" @click="onCheck">{{ item }}</div>
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
                <svg-icon v-if="!userStore.isLogin" name="ep:user-filled" @click="goLogin" />
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
                <div>搜索结果：</div>
                <el-input v-model="input1" placeholder="Please input" style="display:inline;">
                    <template #prepend>包含全部关键词</template>
                </el-input>
                <el-input v-model="input2" placeholder="Please input" style="display:inline;">
                    <template #prepend>包含完整关键词</template>
                </el-input>
                <el-input v-model="input3" placeholder="Please input" style="display:inline;">
                    <template #prepend>包含任意关键词</template>
                </el-input>
                <el-input v-model="input4" placeholder="Please input" style="display:inline;">
                    <template #prepend>没有包含关键词</template>
                </el-input>
                <div class="block">
                    起止时间：
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        unlink-panels
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :shortcuts="shortcuts"
                        :size="large"
                    />
                </div>
                <div>
                    一次搜索条数：
                    <el-input v-model="input" placeholder="Please input" style="display:inline;" />
                    <el-button style="float:right;margin-right:15px;display:inline;" type="primary">搜索</el-button>
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
    margin-top: 20%;
    .el-dialog__header {
        border-bottom: #909399 0.5px Dashed;
    }
}
</style>

<style lang="scss" scoped>
//scss
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
                    background-color: rgba(232, 229, 229, 0.42);
                    text-indent: 20px;
                }
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

<style scoped>
 .block {
    padding: 10px 0;
    /*text-align: center;*/
    /*border-right: solid 1px var(--el-border-color);*/
    flex: 1;
}

.block:last-child {
    border-right: none;
}
</style>
