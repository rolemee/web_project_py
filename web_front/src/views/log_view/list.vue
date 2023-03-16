<script setup name="LogViewList">
import usePagination from '@/util/usePagination.js'
import dayjs from 'dayjs'
import api from '@/api'
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination()
const startSearchTimeIndex = 0
const endSearchTimeIndex = 1

const data = ref({
    loading: false,
    // 搜索
    search: {
        searchParamString: '',
        searchTime: null
    },
    // 列表数据
    dataList: []
})

onMounted(() => {
    getLogList()
})

function getLogList() {
    data.value.loading = true
    let params = {
        offset: getParams().pageIndex - 1,
        limit: getParams().pageSize
    }
    data.value.search.searchParamString && (params.userId = data.value.search.searchParamString)
    if (null !== data.value.search.searchTime) {
        params.start_time = format(new Date(data.value.search.searchTime[startSearchTimeIndex]))
        params.end_time = format(new Date(new Date(data.value.search.searchTime[endSearchTimeIndex]).setDate(new Date(data.value.search.searchTime[endSearchTimeIndex]).getDate() + 1)))
    }
    api.get('/api/log', {
        params
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
        pagination.value.total = res.data.total_num[0].count
    }).catch(() => {
        data.value.dataList = []
        pagination.value.total = 0
    })
    data.value.loading = false
}

// 每页数量切换
function sizeChange(size) {
    onSizeChange(size).then(() => getLogList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
    onCurrentChange(page).then(() => getLogList())
}
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
</script>
<template>
    <div>
        <div>
            <page-header title="系统日志安全审核" />
            <page-main>
                <div>
                    <el-form :inline="true" :model="data.search" label-suffix="：">
                        <el-form-item label="日志日期">
                            <el-date-picker
                                v-model="data.search.searchTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            />
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input
                                v-model="data.search.searchParamString"
                                placeholder="请输入查询的用户名"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="currentChange()">
                                <template #icon>
                                    <el-icon>
                                        <svg-icon name="ep:search" />
                                    </el-icon>
                                </template>
                                检索
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
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
                <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
            </page-main>
        </div>
    </div>
</template>

<style scoped lang="scss">
// scss
</style>
