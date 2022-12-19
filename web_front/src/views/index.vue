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
import { onBeforeRouteLeave } from 'vue-router'
const settingsStore = useSettingsStore()
const router = useRouter()

function tohome() {
    router.push({
        name: 'homePageList'
    })
}
onMounted(() => {
    if (!settingsStore.topStatus) {
        settingsStore.toggleTopCollapse()
        // console.log(settingsStore.topStatus)
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
</script>
<template>
    <div>
        <div class="backgroundImg">
            <div style="display: flex;justify-content: center;width: 100%">
                <el-icon v-if="settingsStore.topStatus" class="top-icon-box" @click="showTop">
                    <svg-icon name="ep:arrow-down" class="top-icon" />
                </el-icon>
                <el-icon v-else @click="showTop" class="top-icon-box">
                    <svg-icon name="ep:arrow-up" class="top-icon" />
                </el-icon>
            </div>
            <button class="button" @click="tohome">
                <span class="enter"> Enter  →</span>
            </button>
        </div>
        <Copyright class="copyright" />
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
