<route>
{
    name: 'dashboard',
    meta: {
        title: "控制台"
    }
}
</route>

<template>
    <div>
        <page-header title="欢迎使用 Fantastic-admin（基础版）">
            <template #content>
                <div>
                    <div style="margin-bottom: 5px;">这是一款<b class="text-emphasis">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护</div>
                    <div>注：在作者就职的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行</div>
                </div>
            </template>
        </page-header>
            <page-main>
            <div>
                等你来回答
                <a style="float:right;" href="" target="_blank" class="btn-home-more">更多
                    <svg-icon class="icon" width="13px" height="13px" name="unfold" /></a>
            </div>
            <el-divider />
                    <el-timeline>
                        <el-timeline-item >
                            <el-row class="mb-4" >
                               <li >Update Github template</li>
                               <el-button plain style="width:38px;height:20px;margin-left:10px;">Plain</el-button>
                                <el-button plain style="width:38px;height:20px">Plain</el-button>
                            </el-row>
                            <p><svg-icon class="icon" width="20px" height="20px" name="crayon" />Tom committed 2022/12/1 20:46</p>
                        </el-timeline-item>
                        <el-timeline-item >
                            <el-row class="mb-4" >
                                <li >Update Github template</li>
                                <el-button plain style="width:38px;height:20px;margin-left:10px;">Plain</el-button>
                                <el-button plain style="width:38px;height:20px">Plain</el-button>
                            </el-row>
                            <p><svg-icon class="icon" width="20px" height="20px" name="crayon" />Tom committed 2022/12/1 20:46</p>
                        </el-timeline-item>
                        <el-timeline-item >
                            <el-row class="mb-4" >
                                <li >Update Github template</li>
                                <el-button plain style="width:38px;height:20px;margin-left:10px;">Plain</el-button>
                                <el-button plain style="width:38px;height:20px">Plain</el-button>
                            </el-row>
                            <p><svg-icon class="icon" width="20px" height="20px" name="crayon" />Tom committed 2022/12/1 20:46</p>
                        </el-timeline-item>
                    </el-timeline>
            </page-main>

        <page-main>
            <div style="font-weight: bold;font-size:20px;text-align:center;">
                描述您的问题
                <p></p>
            </div>
            <div >
                <span style="font-weight:bold;font-size: 16px;">问题描述</span>
                <span style="font-size: 12px;color: #8a8f97">（必填）</span>
                <svg-icon style="font-weight: bold;font-size:20px;margin-left:-10px;" class="icon" width="13px" height="13px" name="asterisk" />
                <span><el-button style="float:right;margin-top:-5px;" text @click="open">如何提问</el-button></span>
                <p></p>
            </div>
            <Editor>
            </Editor>
            <page-main>
                <el-button style="float:right;height: 40px;width: 100px;font-size:20px;" type="primary">提交</el-button>
                <el-checkbox style="float:right;height:40px;width: 100px" v-model="checked1" label="匿名" size="large"/>
            </page-main>
        </page-main>

        <page-main>
            <Editor >
            </Editor>
            <page-main>
                <el-button style="float:right;height: 40px;width: 100px;font-size:20px;" type="primary">提交回答</el-button>
                <el-checkbox style="float:right;height:40px;width: 100px" v-model="checked1" label="匿名" size="large"/>
            </page-main>
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
    text-emphasis-style: "❤";
}
</style>
<style>
li {
    font-size: 1em;
    background-color: #ffffff;
    /*text-align: center;*/
}
li:hover{
    background: #ffffff;
    color: blue;
    font-weight: bold;
}
</style>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = () => {
    ElMessageBox.alert('This is a message', '如何提问', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
            // ElMessage({
            //     type: 'info',
            //     message: `action: ${action}`,
            // })
        },
    })
}
</script>
