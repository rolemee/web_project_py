<script setup>

const props = defineProps({
    max: {
        type: [Number, String],
        default: 20
    },
    min: {
        type: [Number, String],
        default: 0
    },
    searchData: {
        type: String,
        default: ''
    }
})
const $myEmit = defineEmits(['onSearch'])
const searchData = ref(props.searchData)
function onSearch() {
    $myEmit('onSearch', searchData.value)
}
// onMounted(() => console.log(props.searchData))
</script>
<template>
    <div class="search-box">
        <el-input
            v-model="searchData"
            type="text"
            placeholder="请输入搜索内容"
            clearable
            :maxlength="props.max"
            :minlength="props.min"
            class="search"
            @keyup.enter="onSearch"
        >
            <template #prefix>
                <el-icon class="search-icon" @click="onSearch">
                    <svg-icon name="ep:search" />
                </el-icon>
            </template>
        </el-input>
        <el-button round type="primary" suffix-icon="ep:search" class="search-button" @click="onSearch">
            <span>搜索</span>
        </el-button>
    </div>
</template>

<style lang="scss" scoped>
.search-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .search {
        :deep(.el-input__wrapper) {
            border-radius: 20px;
            width: 350px;
        }
        .search-icon {
            font-size: large;
            &:hover {
                color: #409EFF;
                cursor: pointer;
            }
        }
    }
    .search-button {
        margin-left: 10px;
    }
}
</style>
